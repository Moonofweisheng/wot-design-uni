import { mount } from '@vue/test-utils'
import WdButton from '@/uni_modules/wot-design-uni/components/wd-button/wd-button.vue'
import { describe, test, expect } from 'vitest'
import { ButtonSize, ButtonType } from '@/uni_modules/wot-design-uni/components/wd-button/types'

describe('WdButton', () => {
  // 测试基本渲染
  test('renders button with default props', () => {
    const wrapper = mount(WdButton)
    expect(wrapper.classes()).toContain('wd-button')
  })

  // 测试按钮类型
  test('renders different button types', () => {
    const types: ButtonType[] = ['primary', 'success', 'info', 'warning', 'error']
    types.forEach((type) => {
      const wrapper = mount(WdButton, {
        props: { type }
      })
      expect(wrapper.classes()).toContain(`is-${type}`)
    })
  })

  // 测试按钮尺寸
  test('renders different button sizes', () => {
    const sizes: ButtonSize[] = ['small', 'medium', 'large']
    sizes.forEach((size) => {
      const wrapper = mount(WdButton, {
        props: { size }
      })
      expect(wrapper.classes()).toContain(`is-${size}`)
    })
  })

  // 测试朴素按钮
  test('renders plain button', () => {
    const wrapper = mount(WdButton, {
      props: { plain: true }
    })
    expect(wrapper.classes()).toContain('is-plain')
  })

  // 测试圆角按钮
  test('renders round button', () => {
    const wrapper = mount(WdButton, {
      props: { round: true }
    })
    expect(wrapper.classes()).toContain('is-round')
  })

  // 测试块级按钮
  test('renders block button', () => {
    const wrapper = mount(WdButton, {
      props: { block: true }
    })
    expect(wrapper.classes()).toContain('is-block')
  })

  // 测试禁用状态
  test('disables button', () => {
    const wrapper = mount(WdButton, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 测试加载状态
  test('shows loading state', () => {
    const wrapper = mount(WdButton, {
      props: { loading: true }
    })
    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.find('.wd-button__loading').exists()).toBe(true)
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 测试图标按钮
  test('renders button with icon', () => {
    const wrapper = mount(WdButton, {
      props: { icon: 'add' }
    })
    expect(wrapper.find('.wd-button__icon').exists()).toBe(true)
  })

  // 测试插槽内容
  test('renders slot content', () => {
    const wrapper = mount(WdButton, {
      slots: {
        default: 'Button Text'
      }
    })
    expect(wrapper.find('.wd-button__text').text()).toBe('Button Text')
  })

  // 测试点击事件
  test('emits click event when not disabled or loading', async () => {
    const wrapper = mount(WdButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'color: red;'
    const wrapper = mount(WdButton, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toBe(customStyle)
  })
})
