/*
 * @Author: weisheng
 * @Date: 2022-02-24 15:37:04
 * @LastEditTime: 2023-03-21 20:57:36
 * @LastEditors: weisheng
 * @Description: 讲生成的changelog移动到文档和组件中
 * @FilePath: \fant-mini-plus-plus\build\changelog.js
 * 记得注释
 */
const fs = require('fs')
const path = require('path')
const fromPath = path.resolve(__dirname, '../CHANGELOG.md')
const toPath = path.resolve(__dirname, '../src/uni_modules/fant-mini-plus')
const docPath = path.resolve(__dirname, '../fant-doc/docs/components')

try {
  const file = fs.readFileSync(fromPath, 'utf-8')
  fs.writeFileSync(`${toPath}/changelog.md`, file)
  fs.writeFileSync(`${docPath}/changelog.md`, file)
} catch (error) {
  console.log('CHANGELOG 获取失败')
}
