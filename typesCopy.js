/*
 * @Author: weisheng
 * @Date: 2022-12-02 14:34:18
 * @LastEditTime: 2022-12-15 09:52:08
 * @LastEditors: weisheng
 * @Description: .d.ts移动到制品
 * @FilePath: \fant-mini-plus\typesCopy.js
 * 记得注释
 */
const fs = require('fs')
const path = require('path')
const srcRoot = path.join(__dirname, './src/uni_modules/fant-mini-plus/types')
const targetSrcRoot = path.join(__dirname, './src/uni_modules/fant-mini-plus')
const componentRoot = path.join(__dirname, './src/uni_modules/fant-mini-plus')
const componentNames = fs
  // 获取所有文件夹及文件
  .readdirSync(`${componentRoot}/components`, {
    withFileTypes: true
  })
  // 筛选出所有文件夹
  .filter((p) => {
    return p.isDirectory() && fs.existsSync(`${componentRoot}/components/${p.name}/index.ts`)
  })
  // 数据预处理
  .map((p) => {
    return {
      path: `components/${p.name}/index`,
      name: p.name
    }
  })
  .concat({
    path: 'index',
    name: 'index'
  })
const copy = () => {
  componentNames.forEach((component) => {
    const sourcePath = `${srcRoot}/${component.path.replace(/index/g, '')}/index.d.ts`.replace(/\/\//g, '/')
    const targetPath = `${targetSrcRoot}/${component.path.replace(/index/g, '')}/index.d.ts`.replace(/\/\//g, '/')
    if (fs.existsSync(sourcePath)) {
      try {
        fs.copyFileSync(sourcePath, targetPath)
      } catch (e) {
        console.log(e, '复制失败')
      }
    }
    const sourceTypesPath = `${srcRoot}/${component.path.replace(/index/g, '')}/types.d.ts`.replace(/\/\//g, '/')
    const targetTypesPath = `${targetSrcRoot}/${component.path.replace(/index/g, '')}/types.d.ts`.replace(/\/\//g, '/')
    if (fs.existsSync(sourceTypesPath)) {
      try {
        fs.copyFileSync(sourceTypesPath, targetTypesPath)
      } catch (e) {
        console.log(e, '复制失败')
      }
    }
  })
}

const deleteTarget = function (tarPath) {
  if (!fs.existsSync(tarPath)) {
    return
  }
  const files = fs.readdirSync(tarPath)
  files.forEach(function (filename) {
    const filedir = path.join(tarPath, filename)
    const stats = fs.statSync(filedir)
    const isFile = stats.isFile()
    if (isFile) {
      // 删除文件
      fs.rmSync(filedir)
    } else {
      deleteTarget(filedir) // 递归
    }
  })
  fs.rmdirSync(tarPath)
}

copy()
deleteTarget(srcRoot)
