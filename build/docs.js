/*
 * @Author: weisheng
 * @Date: 2022-02-11 15:19:37
 * @LastEditTime: 2023-03-28 16:40:46
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\build\docs.js
 * 记得注释
 */
const fs = require('fs')
const path = require('path')

/**
 * 获取指定文件夹下的文件
 * @param {string} local 文件夹路径
 */
function getFile(local) {
  const localFiles = fs.readdirSync(local).filter((file) => {
    return path.extname(file).toLowerCase() === '' || path.extname(file).toLowerCase() === '.md'
  })
  const docfile = {
    introduction: '', // 简介
    instructions: '', // 使用说明
    api: ''
  } // 文档文件内容
  localFiles.forEach((localFile) => {
    // 拼接文件夹子项的路径
    const filePath = `${local}/${localFile}`
    // 获取子项文件信息
    const stat = fs.statSync(filePath)
    if (stat.isFile()) {
      if (localFile === 'API.md') {
        // 读取markdown
        const file = fs.readFileSync(filePath, 'utf-8')
        docfile.api = file.replace(new RegExp(file.split('\n\n', 2)[0], 'g'), '').replace(new RegExp(file.split('\n\n', 2)[1], 'g'), '')
        // fs.writeFileSync(`docs/components/${filePath.split('/').reverse()[1]}.md`, file)
      } else if (localFile === 'README.md') {
        // 读取markdown为数组
        docfile.introduction = fs.readFileSync(filePath, 'utf-8')
      } else if (localFile === 'INDEX.md') {
        // 读取markdown为数组
        docfile.instructions = fs.readFileSync(filePath, 'utf-8')
      }
    } else {
      getFile(filePath)
    }
  })
  if (docfile.api || docfile.instructions || docfile.introduction) {
    fs.writeFileSync(`fant-doc/docs/components/${local.split('/').reverse()[0]}.md`, docfile.introduction + docfile.instructions + docfile.api)
  }
}

// 合并文档
getFile('src/uni_modules/fant-mini-plus/components')
