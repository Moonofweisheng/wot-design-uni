import fs from 'fs'
import path from 'path'
import axios from 'axios'
import JSON5 from 'json5'

const appID = process.argv[process.argv.indexOf('--APP_ID') + 1]
const appSecret = process.argv[process.argv.indexOf('--APP_SECRET') + 1]

async function getAccessToken(): Promise<string> {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}`

  try {
    const response = await axios.get(url)
    return response.data.access_token
  } catch (error: any) {
    console.error(`获取 access_token 失败: ${error.response ? error.response.data : error.message}`)
    throw error
  }
}

const pagesJsonPath = path.join(__dirname, '../src/pages.json')
let pagesJson

try {
  const jsonData = fs.readFileSync(pagesJsonPath, 'utf8')
  pagesJson = JSON5.parse(jsonData)
} catch (error: any) {
  console.error(`读取或解析 pages.json 失败: ${error.message}`)
  process.exit(1)
}

const pages = pagesJson.pages.filter((page: { path: string }) => page.path.endsWith('Index'))

function camelToKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])/g, '-$1')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

function clearWxqrcodeDirectory(outputDir: string) {
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true })
    console.log(`已删除目录: ${outputDir}`)
  }
}

async function generateMiniProgramCode(accessToken: string, pagePath: string, retries = 3): Promise<void> {
  const url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${accessToken}`
  const data = {
    path: pagePath,
    width: 430
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(url, data, {
        responseType: 'arraybuffer'
      })

      const outputDir = path.join(__dirname, '../docs/public/wxqrcode')
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      const componentName = pagePath.split('/')[1]
      const formattedName = camelToKebabCase(componentName)

      const fileName = path.join(outputDir, `${formattedName}.png`)
      fs.writeFileSync(fileName, response.data)
      console.log(`小程序码已生成并保存为 ${fileName}`)
      return
    } catch (error: any) {
      console.error(`生成小程序码失败: ${error.response ? error.response.data : error.message}`)
      if (attempt < retries) {
        console.log(`重试 ${attempt}/${retries}...`)
      } else {
        console.error(`所有重试均失败，无法生成小程序码: ${pagePath}`)
      }
    }
  }
}

async function generateCodesForAllPages(accessToken: string) {
  for (const page of pages) {
    await generateMiniProgramCode(accessToken, page.path)
  }
}

async function genrateQRCodeImage() {
  const outputDir = path.join(__dirname, '../docs/public/wxqrcode')
  clearWxqrcodeDirectory(outputDir)

  try {
    const accessToken = await getAccessToken()
    await generateCodesForAllPages(accessToken)
  } catch (error: any) {
    console.error('程序执行失败:', error.message)
  }
}

genrateQRCodeImage()
