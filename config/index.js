const tempEntry = require('../config/entry')
const fileNameKey = Object.keys(tempEntry)[0]
const enTryJs = tempEntry[fileNameKey]
const dirKey = Object.keys(enTryJs)[0]
const nodeEnv = process.env.BUILD_ENV || process.env.UPLOAD_ENV
const date = new Date()
const y = date.getFullYear()
const m = (date.getMonth() + 1).toString().padStart(2, '0')
const d = date.getDate().toString().padStart(2, '0')
const h = date.getHours().toString().padStart(2, '0')
const timestamp = `?${y}${m}${d}${h}`

module.exports = {
  fileNameKey: fileNameKey, // 文件夹名，如202005
  enTryJs: enTryJs, // 打包时入口js
  dirKey: dirKey, // // 打包时入口js的名字
  timestamp: timestamp, // 缓存控制
  publicPath: `/Wx/activity/${nodeEnv}/${fileNameKey}/${dirKey}/static`
}
