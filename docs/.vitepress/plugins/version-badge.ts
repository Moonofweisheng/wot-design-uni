import type { Plugin } from 'vite'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import fs from 'fs'

// 从 Markdown 文件中提取版本信息
function extractVersionFromMarkdown(filePath: string): string | null {
  if (!existsSync(filePath)) return null
  
  try {
    const content = readFileSync(filePath, 'utf-8')
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
    
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      const versionMatch = frontmatter.match(/version:\s*(['"]?)([^'"\n]+)\1/)
      
      if (versionMatch) {
        return versionMatch[2].trim()
      }
    }
  } catch (e) {
    console.warn(`Failed to read file ${filePath}:`, e)
  }
  
  return null
}

// 扫描组件文档目录，提取版本信息
function scanComponentVersions(): Record<string, string> {
  const versionData: Record<string, string> = {}
  const componentDir = resolve(__dirname, '../../component')
  
  if (!existsSync(componentDir)) {
    console.warn('Component directory not found:', componentDir)
    return versionData
  }
  
  try {
    const files = fs.readdirSync(componentDir).filter((file: string) => file.endsWith('.md'))
    
    files.forEach((filename: string) => {
      const filePath = resolve(componentDir, filename)
      const version = extractVersionFromMarkdown(filePath)
      
      if (version) {
        const path = `/component/${filename.replace('.md', '')}`
        versionData[path] = version
        console.log(`✅ Found version info in ${filename}:`, version)
      }
    })
  } catch (e) {
    console.warn('Failed to scan component directory:', e)
  }
  
  return versionData
}

// 生成版本数据文件
function generateVersionData(): string {
  const versionData = scanComponentVersions()
  
  return `// 自动生成的版本数据
// 此文件由插件自动生成，请勿手动修改
// 如需修改版本信息，请在对应的 Markdown 文件 frontmatter 中修改

export const versionData = ${JSON.stringify(versionData, null, 2)}
`
}

export function VersionBadgePlugin(): Plugin {
  return {
    name: 'version-badge',
    configResolved() {
      // 在配置解析后生成版本数据
      try {
        const versionDataContent = generateVersionData()
        const outputPath = resolve(__dirname, '../config/version-data.ts')
        
        writeFileSync(outputPath, versionDataContent, 'utf-8')
        console.log('✅ Version data generated successfully')
      } catch (e) {
        console.error('❌ Failed to generate version data:', e)
      }
    }
  }
}