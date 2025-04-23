import { mount } from '@vue/test-utils'
import WdBadge from '@/uni_modules/wot-design-uni/components/wd-badge/wd-badge.vue'
import { describe, test, expect } from 'vitest'
import type { BadgeType } from '@/uni_modules/wot-design-uni/components/wd-badge/types'

describe('WdBadge', () => {
  // 测试基本渲染
  test('renders badge with default props', () => {
    const wrapper = mount(WdBadge)
    expect(wrapper.classes()).toContain('wd-badge')
  })

  // 测试不同类型的徽标
  test('renders different badge types', () => {
    const types: BadgeType[] = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(WdBadge, {
        props: { type }
      })
      expect(wrapper.classes()).toContain(`wd-badge--${type}`)
    })
  })

  // 测试徽标值
  test('renders badge with value', () => {
    const value = 5
    const wrapper = mount(WdBadge, {
      props: { value }
    })
    expect(wrapper.find('.wd-badge__content').text()).toBe(value.toString())
  })

  // 测试最大值
  test('renders badge with max value', () => {
    const wrapper = mount(WdBadge, {
      props: {
        value: 100,
        max: 99
      }
    })
    expect(wrapper.find('.wd-badge__content').text()).toBe('99+')
  })

  // 测试圆点样式
  test('renders dot badge', () => {
    const wrapper = mount(WdBadge, {
      props: { isDot: true }
    })
    expect(wrapper.classes()).toContain('is-dot')
  })

  // 测试自定义颜色
  test('renders custom colors', () => {
    const color = '#f50'
    const wrapper = mount(WdBadge, {
      props: { color }
    })
    expect(wrapper.find('.wd-badge__content').attributes('style')).toContain(`background: ${color}`)
  })

  // 测试默认插槽
  test('renders default slot', () => {
    const content = '徽标内容'
    const wrapper = mount(WdBadge, {
      slots: {
        default: content
      }
    })
    expect(wrapper.find('.wd-badge__wrapper').text()).toContain(content)
  })

  // 测试不同位置
  test('renders different positions', () => {
    const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left']
    positions.forEach((position) => {
      const wrapper = mount(WdBadge, {
        props: { position }
      })
      expect(wrapper.find('.wd-badge__content').classes()).toContain(`is-${position}`)
    })
  })

  // 测试自定义偏移量
  test('renders with offset', () => {
    const wrapper = mount(WdBadge, {
      props: {
        offset: [10, 20]
      }
    })
    const content = wrapper.find('.wd-badge__content')
    expect(content.attributes('style')).toContain('top: -10px')
    expect(content.attributes('style')).toContain('right: -20px')
  })

  // 测试隐藏徽标
  test('hides badge', () => {
    const wrapper = mount(WdBadge, {
      props: { hidden: true }
    })
    expect(wrapper.find('.wd-badge__content').exists()).toBe(false)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-badge'
    const wrapper = mount(WdBadge, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 8px;'
    const wrapper = mount(WdBadge, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
