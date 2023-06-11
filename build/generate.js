/*
 * @Author: 庞昭昭
 * @Date: 2022-02-21 10:23:46
 * @LastEditTime: 2023-03-21 20:59:58
 * @LastEditors: weisheng
 * @Description: 创建文件夹并初始化
 * @FilePath: \fant-mini-plus\build\generate.js
 * 记得注释
 */
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const { execSync } = require('child_process')

inquirer
  .prompt([
    {
      type: 'list',
      name: 'operation',
      message: '请选择操作类型（默认值：✨ create）',
      choices: ['✨ create 创建', '🐛 modify 编辑', '🚀 remove 移除'],
      default: '✨ create 创建'
    },
    {
      type: 'list',
      name: 'type',
      message: '请选择组件类型（默认值：✨ basic 基础组件）',
      choices: ['✨ basic 基础组件', '🐛 form 表单组件', '🚀 action 反馈组件', '🔬 display 展示组件', '🧭 navigation 导航组件'],
      default: '✨ basic 基础组件'
    },
    {
      type: 'input',
      name: 'oldname',
      message: '请输入原组件名',
      default: '',
      when: function (answers) {
        // 当操作不是创建
        return answers['operation'] !== '✨ create 创建'
      },
      validate: function (val) {
        if (!val || !val.trim()) {
          return '请输入原组件名'
        } else {
          return true
        }
      }
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入组件名',
      default: '',
      validate: function (val) {
        if (!val || !val.trim()) {
          return '请输入组件名'
        } else {
          return true
        }
      }
    },
    {
      type: 'list',
      name: 'confirm',
      message: '确认操作吗？',
      choices: ['Y', 'N'],
      default: 'Y'
    }
  ])
  .then((answers) => {
    if (!answers['confirm'] || answers['confirm'].toLowerCase() != 'y') {
      console.log('🚨 操作取消')
      return
    }

    let name = ''
    if (answers['name']) {
      name = answers['name']
    }

    let oldname = ''
    if (answers['oldname']) {
      oldname = answers['oldname']
    }

    let type = ''
    if (answers['type']) {
      type = answers['type'].split(' ')[1]
    }

    // 文件夹父目录
    const parentPath = 'src/uni_modules/fant-mini-plus/components'
    // 文件夹目录
    const folderPath = `${parentPath}/${name}`

    // 操作
    switch (answers['operation']) {
      case '✨ create 创建':
        create(folderPath, type, name) // 新建
        break
      case '🐛 modify 编辑':
        modify(folderPath, type, name, oldname) // 编辑名称
        break
      case '🚀 remove 移除':
        remove(folderPath, type, name, oldname) // 删除
        break
      default:
        break
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })

// 创建
function create(url, type, name) {
  // 检查创建路径是否存在
  if (!fs.existsSync(url)) {
    // 不存在，创建文件夹
    fs.mkdirSync(url)
    // vue模板代码
    const vueTemplate = `<template>
        <view class="${name}"></view>
        </template>
    
        <script>
        export default {
          name: '${name}',
          props: {}
        }
        </script>
    
        <style lang="scss" scoped>
        .${name} {}
        </style>`
    // 创建vue组件
    fs.writeFile(`${url}/${name}.vue`, vueTemplate, (err) => {
      if (err) throw err
    })
    // 创建代码演示文档
    fs.writeFile(`${url}/INDEX.md`, '## 代码演示', (err) => {
      if (err) throw err
    })
    // 创建组件说明文档
    fs.writeFile(`${url}/README.md`, '', (err) => {
      if (err) throw err
    })
    // 更新doc文档
    updateDoc('create', type, name)
  } else {
    console.error('warning：文件夹已存在', url)
  }
}

// 编辑
function modify(url, type, name, oldname) {
  const oldName = oldname
  const newName = name
  // 判断给定的路径是否存在
  if (fs.existsSync(url)) {
    if (!newName) {
      console.log('error：请传入新名称')
      return
    }
    /**
     * 返回文件和子目录的数组
     */
    files = fs.readdirSync(url)
    files.forEach((file, index) => {
      // 规范化生成文件路径。
      const curPath = path.join(url, file)
      /**
       * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
       */
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        modify(curPath.replace(/\\/g, '/'))
      } else {
        // 获取文件内容
        const cur = fs.readFileSync(curPath, 'utf-8')
        // 替换文件名称
        fs.writeFileSync(curPath, cur.replace(new RegExp(oldName, 'g'), newName), (err) => {
          if (err) throw err
        })
        if (file.includes(oldName)) {
          // 修改文件名称
          fs.renameSync(`${url}/${file}`, `${url}/${file.replace(new RegExp(oldName, 'g'), newName)}`)
        }
      }
    })
    /**
     * 修改文件夹名称
     */
    const newUrlArr = url.split('/')
    newUrlArr.splice(newUrlArr.length - 1, 1, newName)
    const newUrl = newUrlArr.join('/')
    fs.renameSync(url, newUrl, (err) => {
      if (err) throw err
    })
    // 更新doc文档配置
    updateDoc(type, name)
  } else {
    console.error('error：给定的路径不存在，请给出正确的路径', folderPath)
  }
}

// 删除
function remove(url, type, name, oldname) {
  // 判断给定的路径是否存在
  if (fs.existsSync(url)) {
    /**
     * 返回文件和子目录的数组
     */
    files = fs.readdirSync(url)
    files.forEach((file, index) => {
      // 规范化生成文件路径。
      const curPath = path.join(url, file)
      /**
       * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
       */
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        remove(curPath)
      } else {
        // 函数删除文件
        fs.unlinkSync(curPath)
      }
    })
    /**
     * 清除文件夹
     */
    fs.rmdirSync(url)
    // 更新doc文档配置
    updateDoc(type, name, oldname)
  } else {
    console.error('error：给定的路径不存在，请给出正确的路径', folderPath)
  }
}

// 更新doc文档新config
function updateDoc(operation, type, name, oldname) {
  // 更新config配置
  // 获取组件list集合
  const cmpList = require(`../fant-doc/docs/.vuepress/cmp/${type}.js`)

  // 操作
  if (operation == 'create') {
    // 将新建文档插入到数组末尾
    if (!cmpList.children.includes(`/components/${name}`)) {
      // 检查是否已存在文档路径配置，避免重复加入
      cmpList.children.push(`/components/${name}`)
      // 重写cmpList文件
      fs.writeFileSync(`fant-doc/docs/.vuepress/cmp/${type}.js`, `module.exports = ${JSON.stringify(cmpList)}`, (err) => {
        if (err) throw err
      })
    }
  } else if (operation == 'modify') {
    const oldName = oldname
    const newName = name
    // 替换文档路径名称
    cmpList.children.splice(cmpList.children.indexOf(`/components/${oldName}`), 1, `/components/${newName}`)
    // 重写cmpList文件
    fs.writeFileSync(`fant-doc/docs/.vuepress/cmp/${type}.js`, `module.exports = ${JSON.stringify(cmpList)}`, (err) => {
      if (err) throw err
    })
  } else if (operation == 'remove') {
    // 获取删除文档路径配置下标
    const index = cmpList.children.indexOf(`/components/${name}`)
    if (index > -1) {
      // 检查是否已存在文档路径配置，存在时删除
      cmpList.children.splice(index, 1)
      // 重写cmpList文件
      fs.writeFileSync(`fant-doc/docs/.vuepress/cmp/${type}.js`, `module.exports = ${JSON.stringify(cmpList)}`, (err) => {
        if (err) throw err
      })
    }
  } else {
    console.log('无操作，未更新文档')
  }
}
