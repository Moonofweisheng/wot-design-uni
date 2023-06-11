/*
 * @Author: weisheng
 * @Date: 2023-03-14 17:35:30
 * @LastEditTime: 2023-03-28 16:41:20
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\build\updateDownloadVersion.js
 * 记得注释
 */
const fs = require('fs')
const path = require('path')
const docPath = path.resolve(__dirname, '../fant-doc/docs/components')
// 传入参数
const args = process.argv.splice(2)
const oldVersion = args[0]
const newVersion = args[1]
console.log(oldVersion, 'oldVersion')
console.log(newVersion, 'newVersion')

if (oldVersion && newVersion) {
  let installation = fs.readFileSync(`${docPath}/installation.md`, 'utf-8')
  installation = installation.replace(new RegExp(`<span >fant-mini-plus@${oldVersion}</span>`, 'g'), `<span >fant-mini-plus@${newVersion}</span>`)
  installation = installation.replace(new RegExp('<span >fant-mini-plus</span>', 'g'), `<span >fant-mini-plus@${newVersion}</span>`)
  fs.writeFileSync(`${docPath}/installation.md`, installation)
} else {
  console.log('组件库压缩包本本更新失败...')
}
