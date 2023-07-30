const fs = require('fs')
const path = require('path')

const SearchBox = path.join(__dirname, '../node_modules/vitepress/dist/client/theme-default/components/VPAlgoliaSearchBox.vue')

fs.readFile(SearchBox, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const reult = data.replace('const { pathname, hash } = new URL(absoluteUrl)', 'return absoluteUrl')
  fs.writeFile(SearchBox, reult, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
  })

  // 在这里进行代码替换操作
})
