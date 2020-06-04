const fs = require('fs')
// target fileName
const fileName = process.argv[2]
const util = require('util')
require('shelljs/global')
// write webpack entry
const glob = require('glob')
const data = {
    [fileName]: { index: `src/pages/${fileName}/index.js` }
}

glob('src/pages/*', (err, files) => {
    if (err) return console.error(`glob error is ${err}`)
    if (files.length && files.includes(`src/pages/${fileName}`)
    ) {
        fs.writeFile('config/entry.js', '/* eslint-disable */' + ` module.exports= ` + util.inspect(data), 'utf-8', function (err) {
            if (err) return console.log(err)
            console.log('write entry file successfully')
            // eslint-disable-next-line no-undef
            if (!exec(`npm run dev`)) return console.log('exec command fail')
        })
    } else {
        console.error(`this ${fileName} can't be found`)
    }
})
