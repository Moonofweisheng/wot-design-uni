/**
 * @description 删除第二位版本号相同的文档,同时对传入的版本号格式化并返回
 * @author Gkxie
 * @date 2019-12-26
 */
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))
const rules = /\d+\.\d+\.\d+/

let {version = '0.0.0', dir = './'} = args

// 传入的version不正确，异常退出
if (!rules.test(version)) {
  console.log('the format of version must be `x.x.x` or `vx.x.x`.')
  process.exit(1)
}

// 版本号统一格式化为:x.x.x
const temp = version.match(rules)[0]

// 删除第二位版本号相同的文档
version = temp.split('.')
version.pop()
version = `${version.join('.')}.\\d+`
const root = path.resolve(dir)
fs.readdirSync(root).forEach(item => {
  if (new RegExp(version).test(item)) {
    exec(`rm -rf ${path.resolve(root, item)}`)
  }
})

// 返回格式化后的版本号
process.stdout.write(temp + '\n')