/*
 * @Author: weisheng
 * @Date: 2025-03-24 13:52:28
 * @LastEditTime: 2025-03-24 14:05:48
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/tests/setup.js
 * 记得注释
 */
import { config } from '@vue/test-utils'
import { defineComponent } from 'vue'

// 创建通用的 uni 组件 mock
const createUniBehavior = () => {
  return defineComponent({
    template: '<div class="uni-mock"><slot /></div>',
    props: ['modelValue'],
    emits: ['update:modelValue', 'input', 'change']
  })
}

// 配置全局组件
config.global.components = {
  'uni-table': createUniBehavior(),
  'uni-tr': createUniBehavior(),
  'uni-td': createUniBehavior()
}

// 配置 Vue Test Utils
config.global.mocks = {
  $t: (key) => key
  // 添加其他全局属性
}

// Mock uni-app global API
global.uni = {
  uploadFile: jest.fn(),
  showToast: jest.fn(),
  showModal: jest.fn()
  // 添加其他需要的 uni API
}

// 添加 Vue 编译器配置
global.__VUE_OPTIONS_API__ = true
global.__VUE_PROD_DEVTOOLS__ = false

// Mock import.meta
global.import = {
  meta: {
    glob: () => ({})
  }
}

// Mock window
global.window = {
  // Add any window properties needed
}
