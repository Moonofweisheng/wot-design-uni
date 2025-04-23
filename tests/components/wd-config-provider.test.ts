import { mount } from '@vue/test-utils'
import WdConfigProvider from '@/uni_modules/wot-design-uni/components/wd-config-provider/wd-config-provider.vue'
import { describe, test, expect } from 'vitest'
import type { ConfigProviderThemeVars } from '@/uni_modules/wot-design-uni'

describe('WdConfigProvider', () => {
  // 测试基本渲染
  test('renders config provider with default props', () => {
    const wrapper = mount(WdConfigProvider)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('wot-theme-light')
  })

  // 测试主题配置
  test('configures theme variables', () => {
    const themeVars: ConfigProviderThemeVars = {
      colorTheme: '#1989fa',
      colorDanger: '#ee0a24'
    }
    const wrapper = mount(WdConfigProvider, {
      props: { themeVars }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--wot-primary-color: #1989fa')
    expect(style).toContain('--wot-danger-color: #ee0a24')
  })

  // 测试主题模式设置
  test('configures theme mode', () => {
    const wrapper = mount(WdConfigProvider, {
      props: { theme: 'dark' }
    })
    expect(wrapper.classes()).toContain('wot-theme-dark')
  })

  // 测试暗黑模式
  test('applies dark theme class', () => {
    const wrapper = mount(WdConfigProvider, {
      props: { theme: 'dark' }
    })
    expect(wrapper.classes()).toContain('wot-theme-dark')
    expect(wrapper.classes()).not.toContain('wot-theme-light')
  })

  // 测试默认插槽渲染
  test('renders default slot', () => {
    const wrapper = mount(WdConfigProvider, {
      slots: {
        default: '<div class="test-content">测试内容</div>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('测试内容')
  })

  // 测试主题变量注入
  test('injects theme variables as CSS variables', () => {
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
    Object.entries(themeVars).forEach(([key, value]) => {
      expect(style).toContain(`--wot-${key}: ${value}`)
    })
  })

  // 测试动态更新主题
  test('updates theme variables dynamically', async () => {
    const wrapper = mount(WdConfigProvider, {
      props: {
        themeVars: {
          colorTheme: '#1989fa'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--wot-primary-color: #1989fa')

    await wrapper.setProps({
      themeVars: {
        colorTheme: '#2c68ff'
      }
    })

    expect(wrapper.attributes('style')).toContain('--wot-primary-color: #2c68ff')
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-provider'
    const wrapper = mount(WdConfigProvider, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'font-family: Arial;'
    const wrapper = mount(WdConfigProvider, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试主题继承
  test('inherits theme from parent provider', () => {
    const parentTheme: ConfigProviderThemeVars = {
      colorTheme: '#1989fa'
    }
    const childTheme: ConfigProviderThemeVars = {
      colorDanger: '#ee0a24'
    }

    const wrapper = mount(WdConfigProvider, {
      props: { themeVars: parentTheme },
      slots: {
        default: {
          template: `
            <wd-config-provider :theme-vars="{
      colorDanger: '#ee0a24'}">
              <div class="child">子级配置</div>
            </wd-config-provider>
          `
        }
      }
    })

    const parentStyle = wrapper.attributes('style')
    expect(parentStyle).toContain(`--wot-primary-color: ${parentTheme.colorTheme}`)

    const childProvider = wrapper.findComponent({ name: 'wd-config-provider' })
    const childStyle = childProvider.attributes('style')
    expect(childStyle).toContain(`--wot-danger-color: ${childTheme.colorDanger}`)
  })

  // 测试同时设置主题模式和主题变量
  test('applies both theme mode and theme variables', () => {
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
