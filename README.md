# vue3.0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```  
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### yarn add postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano cssnano-preset-advanced postcss-import postcss-url -D

```text
    适配：首选vw, 其次rem
    babel: 浏览器兼容
    单个入口文件编译, 命名规则(文件夹、html、js、vue)
    js/css上传oss: 缓存控制
    css预处理选择sass：公用
    sourcemap: 生产环境禁用
    loader: 字体、icon/svg
    eslint: Airbnb
    ts
    axios: sign、token
    
    远期规划：自动部署、单元测试
```

### update
```
npm run ts [fileName] // 编译单个文件，不输入则进程退出 文件目录结构参考src/pages/example
```