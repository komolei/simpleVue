const fs = require('fs')
// 异步流程控制co模块
const co = require('co')
const path = require('path')
const oss = require('ali-oss')
const glob = require('glob')
const config = require('./index')
const uploadFlagList = []
// 编译文件输出目录
const root = path.resolve(__dirname, '../dist/' + config.fileNameKey + '/static')
const oldPath = glob.sync(path.resolve(__dirname, '../dist/' + config.fileNameKey + '/static') + '/*.html')
// html文件移动到目标文件夹路径
const newPath = path.resolve(__dirname, '../../activity/' + config.fileNameKey)
const env = process.env.UPLOAD_ENV === 'development' ? require('../config/dev.env') : require('../config/prod.env')

// 检查文件夹是否存在
function checkDirExist (folderpath) {
  const pathArr = folderpath.split('/')
  let _path = ''
  for (let i = 0; i < pathArr.length; i++) {
    if (pathArr[i]) {
      _path += `/${pathArr[i]}`
      if (!fs.existsSync(_path)) {
        fs.mkdirSync(_path)
      }
    }
  }
}

checkDirExist(newPath)

// html文件移动
oldPath.forEach(function (filePath) {
  let filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
  fs.copyFileSync(filePath, newPath + '/' + filename + '.html', function (err) {
    console.log(err)
  })
})

// 构建oss对象
const client = new oss({
  accessKeyId: 'LTAI4Fj99ovr3yrH6tV2MtfZ',
  accessKeySecret: 'ho2uGCoysDuOn1aEGxEDj8j4GZDi2j',
  bucket: env.BUCKET.replace(/^"|"$/g, ''),
  region: 'oss-cn-hangzhou'
})

// 文件上传
function upload () {
  const files = []

  // 递归取出所有文件夹下所有文件的路径
  function readDirSync (filePath) {
    const filePaths = fs.readdirSync(filePath)
    filePaths.forEach((item) => {
      const cur_path = `${filePath}/${item}`
      const info = fs.statSync(cur_path)
      if (info.isDirectory()) {
        readDirSync(cur_path)
      } else {
        if (/\.(js|css|map)$/.test(item) && process.env.UPLOAD_ENV === 'development') {
          files.push(cur_path)
        } else if (/\.(js|css)$/.test(item)) {
          files.push(cur_path)
        }
      }
    })
  }

  readDirSync(root)

  co(function* () {
    try {
      for (let index = 0; index < files.length; index += 1) {
        const fileObj = files[index]
        // 提交文件到oss，这里要注意，阿里云不需要创建新文件夹，只要有路径，没有文件夹会自动创建，【Wx/activity/static 表示上传文件的目录，注意前后不要加斜线】
        const result = yield client.put(config.publicPath + fileObj.replace(root, ''), fileObj)
        uploadFlagList.push(result)
        if (!result) {
          break
        }
      }
      const uploadFlag = uploadFlagList.find(item => item.res.statusCode !== 200)
      if (uploadFlag) {
        console.log('上传失败')
      } else {
        console.log('上传成功')
      }
    } catch (e) {
      console.log('上传失败,请查看日志: ', e)
    }
  })
}

upload()
