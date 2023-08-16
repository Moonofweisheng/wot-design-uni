/*
 * @Author: weisheng
 * @Date: 2022-11-01 17:12:57
 * @LastEditTime: 2023-08-16 17:01:25
 * @LastEditors: weisheng
 * @Description: 组件发版问答
 * @FilePath: \wot-design-uni\build\release.js
 * 记得注释
 */
const inquirer = require('inquirer')
// Node 核心模块
const { execSync } = require('child_process')
const { writeFileSync, readFileSync } = require('fs')
const path = require('path')
const src = path.resolve(__dirname, '../src/uni_modules/wot-design-uni')
const oldVersion = require('../package.json').version
inquirer
  .prompt([
    {
      type: 'list',
      name: 'version',
      message: '请选择发版类型（默认值：✨ minor）',
      choices: ['🐛 patch 小版本', '✨ minor 中版本', '🚀 major 大版本'],
      default: '✨ minor 中版本'
    },
    {
      type: 'list',
      name: 'release',
      message: '确认发布？',
      choices: ['Y', 'N'],
      default: 'Y'
    }
  ])
  .then((answers) => {
    if (!answers['release'] || answers['release'].toLowerCase() != 'y') {
      console.log('🚨 操作取消')
      return
    }
    // 项目版本更新
    switch (answers['version']) {
      case '🐛 patch 小版本':
        execSync('yarn release-patch')
        break
      case '✨ minor 中版本':
        execSync('yarn release-minor')
        break
      case '🚀 major 大版本':
        execSync('yarn release-major')
        break
      default:
        execSync('yarn release-minor')
        break
    }
    // 生成日志
    execSync('node build/changelog.js')
    // 更新版本
    const file = readFileSync(path.resolve(__dirname, '../package.json'))
    const packageJson = JSON.parse(file.toString())
    const version = packageJson.version
    console.log(`√ bumping version in package.json from ${oldVersion} to ${version}`)
    const package = require('../src/uni_modules/wot-design-uni/package.json')
    package.version = version
    writeFileSync(path.resolve(src, 'package.json'), JSON.stringify(package))
    // 生成制品
    execSync('yarn compiler')
    console.log('√ compiler complete')
    execSync('yarn lint')
    execSync('git add -A ')
    execSync(`git commit -am "build: compile ${version}"`)
    execSync(`git tag -a v${version} -am "chore(release): ${version}"`)
    console.log('√ committing changes')
    const branch = execSync('git branch --show-current').toString().replace(/\*/g, '').replace(/ /g, '')
    console.log('🎉 版本发布成功')
    const tip = 'Run `git push --follow-tags origin ' + branch + '` ' + 'to publish'
    console.log(tip.replace(/\n/g, ''))
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })
