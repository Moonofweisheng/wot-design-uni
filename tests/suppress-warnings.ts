import { config } from '@vue/test-utils'

// 抑制 Vue 警告
const originalWarn = console.warn
console.warn = (...args: any[]) => {
  // 过滤掉关于内置 HTML 元素的警告
  if (args[0] && typeof args[0] === 'string' && args[0].includes('Do not use built-in or reserved HTML elements as component id')) {
    return
  }
  originalWarn(...args)
}

// 告诉 Vue 这些是自定义元素
config.global.config = {
  ...config.global.config,
  compilerOptions: {
    ...config.global.config?.compilerOptions,
    isCustomElement: (tag) => ['view', 'text', 'image', 'input', 'textarea', 'video'].includes(tag)
  }
}
