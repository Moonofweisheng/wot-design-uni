import fs from 'fs'
import path from 'path'

type SyncConfig = {
  fromPath: string
  targets: {
    path: string
    createDir?: boolean
  }[]
}

/**
 * 同步 changelog 到目标路径
 * @param config - 同步配置
 */
const syncChangelog = (config: SyncConfig): void => {
  const { fromPath, targets } = config

  try {
    // 读取changelog
    const content = fs.readFileSync(fromPath, 'utf-8')

    // 同步到目标位置
    targets.forEach((target) => {
      const { path: targetPath, createDir } = target
      const targetDir = path.dirname(targetPath)

      // 确保目标目录存在
      if (createDir && !fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
      }

      // 写入文件
      fs.writeFileSync(targetPath, content)
    })

    console.log('Changelog 同步成功')
  } catch (error) {
    console.error('Changelog 同步失败:', error)
  }
}

// 执行同步
const cwd = process.cwd()

syncChangelog({
  fromPath: path.resolve(cwd, 'CHANGELOG.md'),
  targets: [
    {
      path: path.resolve(cwd, 'src/uni_modules/wot-design-uni/changelog.md')
    },
    {
      path: path.resolve(cwd, 'docs/guide/changelog.md')
    },
    {
      path: path.resolve(cwd, 'docs/en-US/guide/changelog.md'),
      createDir: true
    }
  ]
})
