import { mount } from '@vue/test-utils'
import WdTag from '@/uni_modules/wot-design-uni/components/wd-tag/wd-tag.vue'
import { describe, test, expect } from 'vitest'
import { TagType } from '@/uni_modules/wot-design-uni/components/wd-tag/types'

describe('WdTag', () => {
  // 测试基本渲染
  test('renders tag with default props', () => {
    const wrapper = mount(WdTag)
    expect(wrapper.classes()).toContain('wd-tag')
  })

  // 测试不同类型
  test('renders different types', () => {
    const types: TagType[] = ['default', 'primary', 'success', 'warning', 'danger']
    types.forEach((type) => {
      const wrapper = mount(WdTag, {
        props: { type }
      })
      expect(wrapper.classes()).toContain(`wd-tag--${type}`)
    })
  })

  // 测试不同尺寸
  test('renders different sizes', () => {
    const sizes = ['small', 'medium', 'large']
    sizes.forEach((size) => {
      const wrapper = mount(WdTag, {
        props: { size }
      })
      expect(wrapper.classes()).toContain(`wd-tag--${size}`)
    })
  })

  // 测试标记状态
  test('renders mark shape', () => {
    const wrapper = mount(WdTag, {
      props: { mark: true }
    })
    expect(wrapper.classes()).toContain('is-mark')
  })

  // 测试圆角状态
  test('renders round shape', () => {
    const wrapper = mount(WdTag, {
      props: { round: true }
    })
    expect(wrapper.classes()).toContain('is-round')
  })

  // 测试可关闭标签
  test('renders closeable tag', async () => {
    const wrapper = mount(WdTag, {
      props: { closeable: true }
    })
    expect(wrapper.find('.wd-tag__close').exists()).toBeTruthy()
    await wrapper.find('.wd-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  // 测试自定义颜色
  test('renders custom color', () => {
    const color = '#ff0000'
    const wrapper = mount(WdTag, {
      props: { color }
    })
    expect(wrapper.attributes('style')).toContain(`background-color: ${color}`)
  })

  // 测试自定义文字颜色
  test('renders custom text color', () => {
    const textColor = '#ffffff'
    const wrapper = mount(WdTag, {
      props: { textColor }
    })
    expect(wrapper.attributes('style')).toContain(`color: ${textColor}`)
  })

  // 测试插槽内容
  test('renders slot content', () => {
    const wrapper = mount(WdTag, {
      slots: {
        default: 'Tag Content'
      }
    })
    expect(wrapper.text()).toBe('Tag Content')
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdTag)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试禁用状态
  test('renders disabled state', async () => {
    const wrapper = mount(WdTag, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 测试动态颜色
  test('renders dynamic color', async () => {
    const wrapper = mount(WdTag, {
      props: {
        dynamic: true,
        dynamicColor: ['#ff0000', '#00ff00', '#0000ff']
      }
    })
    expect(wrapper.classes()).toContain('is-dynamic')
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-tag'
    const wrapper = mount(WdTag, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 8px;'
    const wrapper = mount(WdTag, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试图标
  test('renders with icon', () => {
    const wrapper = mount(WdTag, {
      props: { icon: 'check' }
    })
    expect(wrapper.find('.wd-icon-check').exists()).toBeTruthy()
  })

  // 测试可选中状态
  test('handles checkable state', async () => {
    const wrapper = mount(WdTag, {
      props: {
        checkable: true,
        checked: false
      }
    })
    expect(wrapper.classes()).not.toContain('is-checked')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:checked')?.[0]).toEqual([true])
  })
})
