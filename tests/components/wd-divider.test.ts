import { mount } from '@vue/test-utils'
import WdDivider from '@/uni_modules/wot-design-uni/components/wd-divider/wd-divider.vue'
import { describe, test, expect } from 'vitest'
import { DividerPosition } from '@/uni_modules/wot-design-uni/components/wd-divider/types'

describe('WdDivider', () => {
  // 测试基本渲染
  test('renders divider with default props', () => {
    const wrapper = mount(WdDivider)
    expect(wrapper.classes()).toContain('wd-divider')
  })

  // 测试虚线样式
  test('renders dashed divider', () => {
    const wrapper = mount(WdDivider, {
      props: { dashed: true }
    })
    expect(wrapper.classes()).toContain('is-dashed')
  })

  // 测试细线样式
  test('renders hairline divider', () => {
    const wrapper = mount(WdDivider, {
      props: { hairline: true }
    })
    expect(wrapper.classes()).toContain('is-hairline')
  })

  // 测试垂直分割线
  test('renders vertical divider', () => {
    const wrapper = mount(WdDivider, {
      props: { vertical: true }
    })
    expect(wrapper.classes()).toContain('wd-divider--vertical')
  })

  // 测试默认插槽内容
  test('renders default slot content', () => {
    const content = '文本内容'
    const wrapper = mount(WdDivider, {
      slots: {
        default: content
      }
    })
    expect(wrapper.text()).toBe(content)
    expect(wrapper.classes()).toContain('wd-divider--center')
  })

  // 测试内容位置
  test('renders different content positions', () => {
    const positions: DividerPosition[] = ['left', 'right', 'center']
    positions.forEach((position) => {
      const wrapper = mount(WdDivider, {
        props: { contentPosition: position },
        slots: {
          default: '文本'
        }
      })
      expect(wrapper.classes()).toContain(`wd-divider--${position}`)
    })
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-divider'
    const wrapper = mount(WdDivider, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 16px 0;'
    const wrapper = mount(WdDivider, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  // 测试同时使用垂直模式和内容时的渲染
  test('renders vertical divider with content correctly', () => {
    const wrapper = mount(WdDivider, {
      props: { vertical: true },
      slots: {
        default: '文本'
      }
    })
    expect(wrapper.classes()).toContain('wd-divider--vertical')
    expect(wrapper.text()).toBe('文本')
  })
})
