'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const uatEnv = require('./uat.env')

module.exports = merge(uatEnv, prodEnv, {
  NODE_ENV: '"develop"',
  OSS_YBREN_CDN: '"http://py20191231.oss-cn-hangzhou.aliyuncs.com"', // 编译后的js、css
  API_DOMAIN: '"https://wxapitest.ybren.com"',
  BUCKET: '"py20191231"'
})
