import { mount } from '@vue/test-utils'
import WdSwitch from '@/uni_modules/wot-design-uni/components/wd-switch/wd-switch.vue'
import { describe, test, expect } from 'vitest'

describe('WdSwitch', () => {
  // 测试基本渲染
  test('renders switch with default props', () => {
    const wrapper = mount(WdSwitch)
    expect(wrapper.classes()).toContain('wd-switch')
  })

  // 测试开关状态
  test('handles switch state', async () => {
    const wrapper = mount(WdSwitch, {
      props: {
        modelValue: false
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  // 测试禁用状态
  test('renders disabled state', async () => {
    const wrapper = mount(WdSwitch, {
      props: {
        disabled: true,
        modelValue: false
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 测试加载状态
  test('renders loading state', () => {
    const wrapper = mount(WdSwitch, {
      props: {
        loading: true
      }
    })
    expect(wrapper.classes()).toContain('is-loading')
  })

  // 测试自定义颜色
  test('renders with custom colors', () => {
    const activeColor = '#ff0000'
    const inactiveColor = '#cccccc'
    const wrapper = mount(WdSwitch, {
      props: {
        modelValue: true,
        activeColor,
        inactiveColor
      }
    })
    expect(wrapper.attributes('style')).toContain(`background-color: ${activeColor}`)
  })

  // 测试自定义值
  test('handles custom values', async () => {
    const wrapper = mount(WdSwitch, {
      props: {
        modelValue: '0',
        activeValue: '1',
        inactiveValue: '0'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
  })

  // 测试尺寸
  test('renders different sizes', () => {
    const sizes = ['large', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(WdSwitch, {
        props: { size }
      })
      expect(wrapper.classes()).toContain(`is-${size}`)
    })
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-switch'
    const wrapper = mount(WdSwitch, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 8px;'
    const wrapper = mount(WdSwitch, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdSwitch)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试change事件
  test('emits change event', async () => {
    const wrapper = mount(WdSwitch, {
      props: {
        modelValue: false
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  // 测试自定义文本
  test('renders custom text', () => {
    const activeText = '开'
    const inactiveText = '关'
    const wrapper = mount(WdSwitch, {
      props: {
        activeText,
        inactiveText
      }
    })
    expect(wrapper.text()).toContain(inactiveText)
  })

  // 测试异步控制
  test('handles async control', async () => {
    const wrapper = mount(WdSwitch, {
      props: {
        modelValue: false,
        beforeChange: () => new Promise((resolve) => setTimeout(resolve, 100))
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-loading')

    await new Promise((resolve) => setTimeout(resolve, 150))
    expect(wrapper.classes()).not.toContain('is-loading')
  })
})
