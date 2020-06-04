// vue.config.js
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const config = require('./config/index')
const env = process.env.BUILD_ENV === 'develop' ? require('./config/dev.env') : (process.env.BUILD_ENV === 'release' ? require('./config/release.env') : require('./config/prod.env'))
const entryConfig = Object.keys(config.enTryJs).map(name => {
  return {
    [name]: {
      // page 的入口
      entry: config.enTryJs[name],
      // 模板来源
      template: config.enTryJs[name].replace(/\/\w*\.js$/, '/index.html'),
      // 在 dist/index.html 的输出
      filename: `${name}.html`,
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', name]
    }
  }
})
let Pages = {}
entryConfig.forEach(item => {
  Pages = {
    ...Pages,
    ...item
  }
})
module.exports = {
  publicPath: './',
  // publicPath: process.env.NODE_ENV === 'development' ? './' : env.OSS_YBREN_CDN.replace(/^"|"$/g, '') + config.publicPath,
  outputDir: `./dist/${config.fileNameKey}/static`, // 构建文件目录，默认dist
  filenameHashing: false,
  pages: Pages,
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.BUILD_ENV === 'development',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.baidu.com',
        ws: true,
        changeOrigin: true
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    optimization: process.env.NODE_ENV === 'production' ? {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          sourceMap: process.env.BUILD_ENV === 'development',
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      ]
    } : {},
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        'vue$': 'vue/dist/vue.common.js'
      }
    },
    output: {
      filename: `js/[name].js?` + config.timestamp,
      chunkFilename: `js/[name].js?` + config.timestamp
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': env
      })
    ]
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
    // config.optimization.splitChunks({
    //   cacheGroups: {}
    // })
  },
  css: {
    extract: {
      filename: `css/[name].css?` + config.timestamp,
      chunkFilename: `css/[name].css?` + config.timestamp
    }
  }
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/styles/variable.scss'),
      ]
    })
}
