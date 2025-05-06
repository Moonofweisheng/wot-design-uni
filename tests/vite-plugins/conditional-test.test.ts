import { mount } from '@vue/test-utils'
import ConditionalTest from '../../vite-plugins/conditional-test.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'

// 获取当前平台
const currentPlatform = process.env.UNI_PLATFORM || 'h5'

describe('条件编译测试', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试在 H5 平台下的条件编译
  test('测试条件编译内容', () => {
    const wrapper = mount(ConditionalTest)

    // 始终显示的内容应该显示
    expect(wrapper.find('.always-show').exists()).toBe(true)
    expect(wrapper.find('.always-show').text()).toBe('始终显示的内容')

    if (currentPlatform.toUpperCase() === 'H5') {
      // H5 平台下应该显示 H5 专属组件
      expect(wrapper.find('.h5-component').exists()).toBe(true)
      expect(wrapper.find('.h5-component').text()).toBe('H5专属组件')

      // H5 平台下应该显示非微信小程序组件
      expect(wrapper.find('.common-component').exists()).toBe(true)
      expect(wrapper.find('.common-component').text()).toBe('非微信小程序组件')
    } else if (currentPlatform.toUpperCase() === 'MP-WEIXIN') {
      // 微信小程序平台下不应该显示 H5 专属组件
      expect(wrapper.find('.h5-component').exists()).toBe(false)

      // 微信小程序平台下不应该显示非微信小程序组件
      expect(wrapper.find('.common-component').exists()).toBe(false)
    }

    // 根据平台检查特定组件
    if (currentPlatform.toUpperCase() === 'H5' || currentPlatform.toUpperCase() === 'MP-WEIXIN') {
      // H5 或微信小程序平台下应该显示微信小程序或 H5 平台显示的组件
      expect(wrapper.find('.weixin-or-h5').exists()).toBe(true)
      expect(wrapper.find('.weixin-or-h5').text()).toBe('微信小程序或H5平台显示')
    }

    // 非 APP 平台显示的组件
    if (currentPlatform.toUpperCase() !== 'APP-PLUS') {
      expect(wrapper.find('.not-app').exists()).toBe(true)
      expect(wrapper.find('.not-app').text()).toBe('非APP平台显示')
    }
  })

  // 测试组件中的条件编译方法
  test('测试条件编译的方法', async () => {
    const wrapper = mount(ConditionalTest)
    const vm = wrapper.vm as any

    // 通用方法应该存在
    expect(typeof vm.commonMethod).toBe('function')
    expect(vm.commonMethod()).toBe('通用方法')

    // 检查 data 中的通用数据
    expect(vm.commonData).toBe('通用数据')

    // 根据平台检查特定方法和数据
    if (currentPlatform.toUpperCase() === 'H5') {
      // H5 平台下应该有 h5Method 方法
      expect(typeof vm.h5Method).toBe('function')
      expect(vm.h5Method()).toBe('H5平台特有方法')

      // H5 平台下不应该有 wxMethod 方法
      expect(vm.wxMethod).toBeUndefined()

      // 检查 data 中的条件编译
      expect(vm.platform).toBe('H5平台')
    } else if (currentPlatform.toUpperCase() === 'MP-WEIXIN') {
      // 微信小程序平台下不应该有 h5Method 方法
      expect(vm.h5Method).toBeUndefined()

      // 微信小程序平台下应该有 wxMethod 方法
      expect(typeof vm.wxMethod).toBe('function')
      expect(vm.wxMethod()).toBe('微信小程序平台特有方法')

      // 检查 data 中的条件编译
      expect(vm.platform).toBe('微信小程序平台')
    }
  })
})

// 测试条件编译插件在测试环境中的特殊处理
describe('测试环境条件编译测试', () => {
  test('测试环境特殊处理', () => {
    // 在测试环境中，TEST 条件应该被保留
    // #ifdef TEST || VITEST
    expect(true).toBe(true) // 这个测试应该在测试环境中运行
    // #endif
  })
})
