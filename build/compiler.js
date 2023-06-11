/*
 * @Author: weisheng
 * @Date: 2023-03-21 20:58:19
 * @LastEditTime: 2023-03-21 20:58:31
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus-plus\build\compiler.js
 * 记得注释
 */
const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '../src/uni_modules/fant-mini-plus')
const libDir = path.resolve(__dirname, '../lib')

const copyFile = function (srcPath, tarPath, filter = []) {
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
              copyFile(filedir, tarFiledir, filter) // 递归
            }
          })
        }
      })
    } else {
      if (err) console.error(err)
    }
  })
}

copyFile(src, libDir, ['.md'])
