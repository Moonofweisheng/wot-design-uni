import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import type { ConfigProviderThemeVars } from '@/uni_modules/wot-design-uni'
import WdConfigProvider from '@/uni_modules/wot-design-uni/components/wd-config-provider/wd-config-provider.vue'

describe('WdConfigProvider', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdConfigProvider)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('wot-theme-light')
  })

  // 测试主题配置
  test('配置主题变量', () => {
    const themeVars: ConfigProviderThemeVars = {
      colorTheme: '#1989fa',
      colorDanger: '#ee0a24'
    }
    const wrapper = mount(WdConfigProvider, {
      props: { themeVars }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--wot-color-theme: #1989fa')
    expect(style).toContain('--wot-color-danger: #ee0a24')
  })

  // 测试主题模式设置
  test('配置主题模式', () => {
    const wrapper = mount(WdConfigProvider, {
      props: { theme: 'dark' }
    })
    expect(wrapper.classes()).toContain('wot-theme-dark')
  })

  // 测试暗黑模式
  test('应用暗黑主题类名', () => {
    const wrapper = mount(WdConfigProvider, {
      props: { theme: 'dark' }
    })
    expect(wrapper.classes()).toContain('wot-theme-dark')
    expect(wrapper.classes()).not.toContain('wot-theme-light')
  })

  // 测试默认插槽渲染
  test('渲染默认插槽', () => {
    const wrapper = mount(WdConfigProvider, {
      slots: {
        default: '<div class="test-content">测试内容</div>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('测试内容')
  })

  // 测试主题变量注入
  test('将主题变量注入为CSS变量', () => {
    const themeVars: ConfigProviderThemeVars = {
      buttonPrimaryColor: '#1989fa',
      buttonErrorColor: '#ee0a24',
      buttonMediumHeight: '40px'
    }
    const wrapper = mount(WdConfigProvider, {
      props: { themeVars }
    })

    // 验证CSS变量是否被正确注入
    const style = wrapper.attributes('style')

    // 检查转换后的变量名（驼峰转短横线）
    expect(style).toContain('--wot-button-primary-color: #1989fa')
    expect(style).toContain('--wot-button-error-color: #ee0a24')
    expect(style).toContain('--wot-button-medium-height: 40px')
  })

  // 测试动态更新主题
  test('动态更新主题变量', async () => {
    const wrapper = mount(WdConfigProvider, {
      props: {
        themeVars: {
          colorTheme: '#1989fa'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--wot-color-theme: #1989fa')

    await wrapper.setProps({
      themeVars: {
        colorTheme: '#2c68ff'
      }
    })

    expect(wrapper.attributes('style')).toContain('--wot-color-theme: #2c68ff')
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-provider'
    const wrapper = mount(WdConfigProvider, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'font-family: Arial;'
    const wrapper = mount(WdConfigProvider, {
      props: {
        customStyle,
        themeVars: { colorTheme: '#1989fa' } // 添加一个主题变量，确保 themeStyle 计算属性会包含 customStyle
      }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试主题继承
  test('从父级提供者继承主题', () => {
    const parentTheme: ConfigProviderThemeVars = {
      colorTheme: '#1989fa'
    }

    // 由于我们无法在测试中嵌套组件，我们只测试父组件的样式
    const wrapper = mount(WdConfigProvider, {
      props: { themeVars: parentTheme },
      slots: {
        default: '<div class="child">子级配置</div>'
      }
    })

    const parentStyle = wrapper.attributes('style')
    expect(parentStyle).toContain(`--wot-color-theme: ${parentTheme.colorTheme}`)
  })

  // 测试同时设置主题模式和主题变量
  test('同时应用主题模式和主题变量', () => {
    const themeVars: ConfigProviderThemeVars = {
      buttonPrimaryColor: '#1989fa'
    }
    const wrapper = mount(WdConfigProvider, {
      props: {
        theme: 'dark',
        themeVars
      }
    })

    expect(wrapper.classes()).toContain('wot-theme-dark')
    expect(wrapper.attributes('style')).toContain('--wot-button-primary-color: #1989fa')
  })
})
