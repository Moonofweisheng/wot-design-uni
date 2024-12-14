// 调用微信api生成每个页面的小程序码，使用axios发起请求

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const JSON5 = require('json5') // 引入 json5 库

const appID = process.argv[process.argv.indexOf('--APP_ID') + 1] // 在 --APP_ID 后面
const appSecret = process.argv[process.argv.indexOf('--APP_SECRET') + 1] // --APP_SECRET 后面

// 获取 access_token 的函数
async function getAccessToken() {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}`

  try {
    const response = await axios.get(url)
    return response.data.access_token
  } catch (error) {
    console.error(`获取 access_token 失败: ${error.response ? error.response.data : error.message}`)
    throw error // 抛出错误以便后续处理
  }
}

// 读取 pages.json 文件
const pagesJsonPath = path.join(__dirname, '../src/pages.json') // 计算 pages.json 的路径
let pagesJson

try {
  const jsonData = fs.readFileSync(pagesJsonPath, 'utf8')
  pagesJson = JSON5.parse(jsonData) // 使用 json5 解析带注释的 JSON
} catch (error) {
  console.error(`读取或解析 pages.json 失败: ${error.message}`)
  process.exit(1) // 退出程序
}

const pages = pagesJson.pages.filter((page) => page.path.endsWith('Index'))

// 将驼峰命名法转换为小写短横线连接的函数
function camelToKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // 在小写字母和大写字母之间插入短横线
    .replace(/([A-Z])/g, '-$1') // 在大写字母前插入短横线
    .replace(/--+/g, '-') // 替换多个短横线为一个短横线
    .replace(/^-|-$/g, '') // 去掉开头和结尾的短横线
    .toLowerCase() // 转换为小写
}

// 删除 wxqrcode 目录及其内容
function clearWxqrcodeDirectory(outputDir) {
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true }) // 递归删除目录及其内容
    console.log(`已删除目录: ${outputDir}`)
  }
}

// 生成小程序码的函数
async function generateMiniProgramCode(accessToken, pagePath, retries = 3) {
  const url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${accessToken}`
  const data = {
    path: pagePath,
    width: 430 // 小程序码的宽度，可以根据需要调整
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(url, data, {
        responseType: 'arraybuffer' // 以二进制形式接收图片数据
      })

      // 确保输出目录存在
      const outputDir = path.join(__dirname, '../docs/public/wxqrcode')
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true }) // 创建目录及其父目录
      }

      // 提取组件名并转换格式
      const componentName = pagePath.split('/')[1] // 假设路径格式为 pages/组件名/Index
      const formattedName = camelToKebabCase(componentName) // 转换为小写短横线连接

      // 将返回的图片数据保存为文件
      const fileName = path.join(outputDir, `${formattedName}.png`) // 生成文件名
      fs.writeFileSync(fileName, response.data)
      console.log(`小程序码已生成并保存为 ${fileName}`)
      return // 成功后退出函数
    } catch (error) {
      console.error(`生成小程序码失败: ${error.response ? error.response.data : error.message}`)
      if (attempt < retries) {
        console.log(`重试 ${attempt}/${retries}...`)
      } else {
        console.error(`所有重试均失败，无法生成小程序码: ${pagePath}`)
      }
    }
  }
}

// 遍历每个页面并生成小程序码
async function generateCodesForAllPages(accessToken) {
  for (const page of pages) {
    await generateMiniProgramCode(accessToken, page.path)
  }
}

// 生成二维码图片
async function genrateQRCodeImage() {
  const outputDir = path.join(__dirname, '../docs/public/wxqrcode')

  // 在开始生成小程序码之前清空 wxqrcode 目录
  clearWxqrcodeDirectory(outputDir)

  try {
    const accessToken = await getAccessToken()
    await generateCodesForAllPages(accessToken)
  } catch (error) {
    console.error('程序执行失败:', error.message)
  }
}

// 生成小程序二维码图片  pnpm qrcode -- --APP_ID xxx --APP_SECRET xxx
genrateQRCodeImage()
