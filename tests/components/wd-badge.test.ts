import { mount } from '@vue/test-utils'
import WdBadge from '@/uni_modules/wot-design-uni/components/wd-badge/wd-badge.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import type { BadgeType } from '@/uni_modules/wot-design-uni/components/wd-badge/types'

describe('WdBadge', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染', async () => {
    const wrapper = mount(WdBadge)

    await nextTick()

    expect(wrapper.classes()).toContain('wd-badge')
    // 默认情况下不应该显示徽标内容
    expect(wrapper.find('.wd-badge__content').exists()).toBe(false)
  })

  // 测试不同类型的徽标
  test('不同类型的徽标', async () => {
    const types: BadgeType[] = ['primary', 'success', 'warning', 'danger', 'info']

    for (const type of types) {
      const wrapper = mount(WdBadge, {
        props: {
          type,
          modelValue: 5 // 需要设置值才能显示徽标
        }
      })

      await nextTick()

      expect(wrapper.find('.wd-badge__content').classes()).toContain(`wd-badge__content--${type}`)
    }
  })

  // 测试徽标值
  test('带值的徽标', async () => {
    const value = 5

    const wrapper = mount(WdBadge, {
      props: { modelValue: value }
    })

    await nextTick()

    expect(wrapper.find('.wd-badge__content').text()).toBe(value.toString())
  })

  // 测试最大值
  test('最大值徽标', async () => {
    const wrapper = mount(WdBadge, {
      props: {
        modelValue: 100,
        max: 99
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-badge__content').text()).toBe('99+')
  })

  // 测试圆点样式
  test('圆点徽标', async () => {
    const wrapper = mount(WdBadge, {
      props: {
        isDot: true,
        modelValue: 5 // 需要设置值才能显示徽标
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-badge__content').classes()).toContain('is-dot')
    // 圆点模式下不显示数字
    expect(wrapper.find('.wd-badge__content').text()).toBe('')
  })

  // 测试自定义背景颜色
  test('自定义背景颜色', async () => {
    const bgColor = '#f50'

    const wrapper = mount(WdBadge, {
      props: {
        bgColor,
        modelValue: 5 // 需要设置值才能显示徽标
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.wd-badge__content').attributes('style')).toContain('background-color:')
  })

  // 测试默认插槽
  test('默认插槽', async () => {
    const content = '徽标内容'

    const wrapper = mount(WdBadge, {
      slots: {
        default: content
      }
    })

    await nextTick()

    expect(wrapper.text()).toContain(content)
  })

  // 测试自定义位置 - top
  test('自定义顶部位置', async () => {
    const top = 10

    const wrapper = mount(WdBadge, {
      props: {
        modelValue: 5,
        top
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-badge__content').attributes('style')).toContain(`top: ${top}px`)
  })

  // 测试自定义位置 - right
  test('自定义右侧位置', async () => {
    const right = 20

    const wrapper = mount(WdBadge, {
      props: {
        modelValue: 5,
        right
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-badge__content').attributes('style')).toContain(`right: ${right}px`)
  })

  // 测试隐藏徽标
  test('隐藏徽标', async () => {
    const wrapper = mount(WdBadge, {
      props: {
        modelValue: 5,
        hidden: true
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-badge__content').exists()).toBe(false)
  })

  // 测试值为0时的显示
  test('值为0且showZero为false时隐藏徽标', async () => {
    const wrapper = mount(WdBadge, {
      props: {
        modelValue: 0,
        showZero: false
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-badge__content').exists()).toBe(false)
  })

  // 测试值为0且showZero为true时的显示
  test('值为0且showZero为true时显示徽标', async () => {
    const wrapper = mount(WdBadge, {
      props: {
        modelValue: 0,
        showZero: true
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-badge__content').exists()).toBe(true)
    expect(wrapper.find('.wd-badge__content').text()).toBe('0')
  })

  // 测试自定义类名
  test('自定义类名', async () => {
    const customClass = 'custom-badge'

    const wrapper = mount(WdBadge, {
      props: {
        modelValue: 5,
        customClass
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', async () => {
    const customStyle = 'margin: 8px;'

    const wrapper = mount(WdBadge, {
      props: {
        modelValue: 5,
        customStyle
      }
    })

    await nextTick()

    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  // 测试属性变化
  test('属性变化时更新', async () => {
    const wrapper = mount(WdBadge, {
      props: {
        modelValue: 5
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-badge__content').text()).toBe('5')

    // 更新属性
    await wrapper.setProps({
      modelValue: 10
    })

    expect(wrapper.find('.wd-badge__content').text()).toBe('10')
  })
})
