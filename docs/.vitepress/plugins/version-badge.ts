import type { Plugin } from 'vite'
import { readFileSync, existsSync, writeFileSync, readdirSync, statSync } from 'fs'
import { resolve, relative, sep } from 'path'

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

// 扫描所有文档目录，提取版本信息
function scanAllVersions(): Record<string, string> {
  const versionData: Record<string, string> = {}
  // docs root directory
  const docsDir = resolve(__dirname, '../../')
  
  if (!existsSync(docsDir)) {
    console.warn('Docs directory not found:', docsDir)
    return versionData
  }
  
  function traverse(currentDir: string) {
    try {
      const files = readdirSync(currentDir)
      
      files.forEach(file => {
        // Skip hidden files/dirs and specific folders
        if (file.startsWith('.') || file === 'public' || file === 'node_modules') return
        
        const fullPath = resolve(currentDir, file)
        const stat = statSync(fullPath)
        
        if (stat.isDirectory()) {
          traverse(fullPath)
        } else if (file.endsWith('.md')) {
          const version = extractVersionFromMarkdown(fullPath)
          
          if (version) {
            // Calculate relative path from docs root
            const relPath = relative(docsDir, fullPath)
            // Normalize path separators and add leading slash
            const normalizedPath = '/' + relPath.split(sep).join('/').replace(/\.md$/, '')
            
            versionData[normalizedPath] = version
            console.log(`✅ Found version info in ${normalizedPath}:`, version)
          }
        }
      })
    } catch (e) {
      console.warn(`Failed to scan directory ${currentDir}:`, e)
    }
  }

  traverse(docsDir)
  return versionData
}

// 生成版本数据文件
function generateVersionData(): string {
  const versionData = scanAllVersions()
  
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
