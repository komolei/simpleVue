// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // 处理元素容器宽高比
    "postcss-aspect-ratio-mini": {},
    // 处理移动端1px的解决方案
    "postcss-write-svg": {
      utf8: false
    },
    // 使用css未来的特性
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750, // (Number) The width of the viewport.
      viewportHeight: 1334, // (Number) The height of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
      exclude: [/recordEvaluate/]
    },
    // 主要是给css的属性添加content的属性，配合viewport-units-buggyfill库给vw、vh、vmin、vmax做适配的操作
    "postcss-viewport-units": {},
    // 用来压缩和清理css代码
    "cssnano": {
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    }
  }
}
