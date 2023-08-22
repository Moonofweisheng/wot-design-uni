/*
 * @Author: weisheng
 * @Date: 2023-03-21 20:58:19
 * @LastEditTime: 2023-08-22 13:00:05
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\build\compiler.js
 * 记得注释
 */
const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '../src/uni_modules/wot-design-uni')
const libDir = path.resolve(__dirname, '../lib')

const copyComponents = function (srcPath, tarPath, filter = []) {
  fs.mkdir(tarPath, (err) => {})
  fs.readdir(srcPath, function (err, files) {
    if (err === null) {
      files.forEach(function (filename) {
        const filedir = path.join(srcPath, filename)
        const filterFlag = filter.some((item) => {
          return path.extname(filename).toLowerCase() === item && filename !== 'changelog.md'
        })
        if (!filterFlag) {
          fs.stat(filedir, function (errs, stats) {
            const isFile = stats.isFile()
            if (isFile) {
              // 复制文件
              const destPath = path.join(tarPath, filename)
              fs.copyFile(filedir, destPath, (err) => {})
            } else {
              // 创建文件夹
              const tarFiledir = path.join(tarPath, filename)
              copyComponents(filedir, tarFiledir, filter) // 递归
            }
          })
        }
      })
    } else {
      if (err) console.error(err)
    }
  })
}

copyComponents(src, libDir, ['.md'])

const copyFile = function (srcPath, tarPath) {
  const isFile = fs.statSync(srcPath).isFile()
  if (isFile) {
    fs.copyFile(srcPath, tarPath, (err) => {})
  }
}

const readme = path.resolve(__dirname, '../README.md')
const license = path.resolve(__dirname, '../LICENSE')
copyFile(readme, path.join(libDir, 'README.md'))
copyFile(license, path.join(libDir, 'LICENSE'))
