import { Plugin } from 'vite';
import { camelCase } from '../../../src/uni_modules/wot-design-uni/components/common/util'
import path from 'path'
import i18n from '../locales/markdown-transform'

export function MarkdownTransform(): Plugin {
  return {
    name: 'md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return
      if (!id.includes('/component')) return
      if (id.includes('/use-')) return

      const GITHUB_URL = 'https://github.com/Moonofweisheng/wot-design-uni/tree/master'
      const componentId = path.basename(id, '.md')
      const componentName = `wd-${componentId}`
      const camelComponentId = camelCase(componentId)
      const demoUrl = `${GITHUB_URL}/src/subPages/${camelComponentId}`
      const componentUrl = `${GITHUB_URL}/src/uni_modules/wot-design-uni/components/${componentName}`
      
      // 根据文件路径判断当前语言
      const lang = id.includes('/en-US/') ? 'en-US' : 'zh-CN'
      const { sourceCode, document, component } = i18n[lang]

      return {
        code: `${code}\n## ${sourceCode}\n<ExternalLink href=${demoUrl}>${document}</ExternalLink> • <ExternalLink href=${componentUrl}>${component}</ExternalLink>`
      }
    },
  }
}

 