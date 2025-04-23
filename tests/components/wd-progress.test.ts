import { mount } from '@vue/test-utils'
import WdProgress from '@/uni_modules/wot-design-uni/components/wd-progress/wd-progress.vue'
import { describe, test, expect } from 'vitest'

describe('WdProgress', () => {
  // 测试基本渲染
  test('renders progress with default props', () => {
    const wrapper = mount(WdProgress)
    expect(wrapper.classes()).toContain('wd-progress')
  })

  // 测试进度值
  test('renders progress with different percentage', () => {
    const percentage = 50
    const wrapper = mount(WdProgress, {
      props: { percentage }
    })
    const inner = wrapper.find('.wd-progress__inner')
    expect(inner.attributes('style')).toContain(`width: ${percentage}%`)
  })

  // 测试状态颜色
  test('renders different status colors', () => {
    const status = 'success'
    const wrapper = mount(WdProgress, {
      props: { status }
    })
    expect(wrapper.classes()).toContain(`is-${status}`)
  })

  // 测试自定义颜色
  test('renders custom color', () => {
    const color = '#f50'
    const wrapper = mount(WdProgress, {
      props: { color }
    })
    const inner = wrapper.find('.wd-progress__inner')
    expect(inner.attributes('style')).toContain(`background: ${color}`)
  })

  // 测试隐藏进度文字
  test('hides text when hideText is true', () => {
    const wrapper = mount(WdProgress, {
      props: { hideText: true }
    })
    expect(wrapper.find('.wd-progress__text').exists()).toBe(false)
  })

  // 测试自定义进度文字内容
  test('renders custom progress text', () => {
    const wrapper = mount(WdProgress, {
      props: {
        percentage: 75,
        text: 'Loading...'
      }
    })
    expect(wrapper.find('.wd-progress__text').text()).toBe('Loading...')
  })

  // 测试进度条高度
  test('renders custom stroke width', () => {
    const strokeWidth = 10
    const wrapper = mount(WdProgress, {
      props: { strokeWidth }
    })
    const track = wrapper.find('.wd-progress__track')
    expect(track.attributes('style')).toContain(`height: ${strokeWidth}px`)
  })

  // 测试进度条圆角
  test('renders with border radius', () => {
    const borderRadius = 5
    const wrapper = mount(WdProgress, {
      props: { borderRadius }
    })
    const track = wrapper.find('.wd-progress__track')
    expect(track.attributes('style')).toContain(`border-radius: ${borderRadius}px`)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-progress'
    const wrapper = mount(WdProgress, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 16px 0;'
    const wrapper = mount(WdProgress, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试插槽内容
  test('renders content slot', () => {
    const slotContent = '自定义内容'
    const wrapper = mount(WdProgress, {
      slots: {
        content: slotContent
      }
    })
    expect(wrapper.text()).toContain(slotContent)
  })
})
