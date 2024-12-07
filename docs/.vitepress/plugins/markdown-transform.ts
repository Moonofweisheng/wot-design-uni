
import { Plugin } from 'vite';
import { camelCase } from '../../../src/uni_modules/wot-design-uni/components/common/util'
import path from 'path'
export function MarkdownTransform(): Plugin {
  return {
    name: 'md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return
      if (!id.includes('/component')) return
      const GITHUB_URL = 'https://github.com/Moonofweisheng/wot-design-uni/tree/master'
      const componentId = path.basename(id, '.md') 
      const componentName = `wd-${componentId}`
      const camelComponentId = camelCase(componentId) 
      const demoUrl = `${GITHUB_URL}/src/pages/${camelComponentId}`
      const componentUrl = `${GITHUB_URL}/src/uni_modules/wot-design-uni/components/${componentName}`
      return {
        code:`${code}\n## 源代码\n<ExternalLink href=${demoUrl}>文档</ExternalLink> • <ExternalLink href=${componentUrl}>组件</ExternalLink>`
      }
    },
  }
}

 