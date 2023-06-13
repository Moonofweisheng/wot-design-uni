/*
 * @Author: weisheng
 * @Date: 2023-06-10 23:33:04
 * @LastEditTime: 2023-06-13 11:47:02
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\build\test.js
 * 记得注释
 */
const fs = require('fs')
const path = require('path')
// 文件夹父目录

const src = path.resolve(__dirname, '../src/pages')

const make = (local) => {
  fs.readdir(local, function (err, files) {
    if (err === null) {
      files.forEach(function (filename) {
        const url = path.resolve(local, filename + '/' + +'Index.vue')
        // 检查创建路径是否存在
        if (!fs.existsSync(url)) {
          // vue模板代码
          const vueTemplate = `
        <template>
        </template>
        <script lang="ts" setup>
        </script>
        <style lang="scss" scoped>
        </style>`
          // 创建vue组件
          fs.writeFile(`${url}`, vueTemplate, (err) => {
            if (err) throw err
          })
        } else {
          console.error('warning：文件夹已存在', url)
        }
      })
    } else {
      if (err) console.error(err)
    }
  })
}

make(src)
