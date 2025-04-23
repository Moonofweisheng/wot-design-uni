import { mount } from '@vue/test-utils'
import WdRate from '@/uni_modules/wot-design-uni/components/wd-rate/wd-rate.vue'
import { describe, test, expect } from 'vitest'

describe('WdRate', () => {
  // 测试基本渲染
  test('renders rate with default props', () => {
    const wrapper = mount(WdRate)
    expect(wrapper.classes()).toContain('wd-rate')
    const stars = wrapper.findAll('.wd-rate__item')
    expect(stars.length).toBe(5)
  })

  // 测试自定义数量
  test('renders custom number of stars', () => {
    const count = 3
    const wrapper = mount(WdRate, {
      props: { count }
    })
    const stars = wrapper.findAll('.wd-rate__item')
    expect(stars.length).toBe(count)
  })

  // 测试默认值
  test('renders with default value', () => {
    const modelValue = 3
    const wrapper = mount(WdRate, {
      props: { modelValue }
    })
    const activeStars = wrapper.findAll('.is-active')
    expect(activeStars.length).toBe(modelValue)
  })

  // 测试点击选择
  test('handles click selection', async () => {
    const wrapper = mount(WdRate)
    const stars = wrapper.findAll('.wd-rate__item')
    await stars[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  // 测试禁用状态
  test('renders disabled state', async () => {
    const wrapper = mount(WdRate, {
      props: {
        disabled: true,
        modelValue: 3
      }
    })
    const stars = wrapper.findAll('.wd-rate__item')
    await stars[4].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 测试自定义颜色
  test('renders with custom colors', () => {
    const activeColor = '#ff0000'
    const voidColor = '#cccccc'
    const wrapper = mount(WdRate, {
      props: {
        modelValue: 3,
        activeColor,
        voidColor
      }
    })
    const activeStars = wrapper.findAll('.is-active')
    expect(activeStars[0].attributes('style')).toContain(`color: ${activeColor}`)
  })

  // 测试自定义图标
  test('renders custom icons', () => {
    const wrapper = mount(WdRate, {
      props: {
        icon: 'heart-filled',
        voidIcon: 'heart'
      }
    })
    expect(wrapper.find('.wd-icon-heart-filled').exists()).toBeTruthy()
    expect(wrapper.find('.wd-icon-heart').exists()).toBeTruthy()
  })

  // 测试允许半选
  test('handles half selection', async () => {
    const wrapper = mount(WdRate, {
      props: {
        allowHalf: true,
        modelValue: 0
      }
    })
    const stars = wrapper.findAll('.wd-rate__item')
    await stars[0].trigger('click', {
      offsetX: 8, // 假设星星宽度为 20，小于一半表示半选
      target: {
        offsetWidth: 20
      }
    })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0.5])
  })

  // 测试自定义尺寸
  test('renders with custom size', () => {
    const size = '24px'
    const wrapper = mount(WdRate, {
      props: { size }
    })
    expect(wrapper.find('.wd-rate__item').attributes('style')).toContain(`font-size: ${size}`)
  })

  // 测试间距
  test('renders with custom spacing', () => {
    const spacing = '10px'
    const wrapper = mount(WdRate, {
      props: { spacing }
    })
    expect(wrapper.find('.wd-rate__item').attributes('style')).toContain(`margin-right: ${spacing}`)
  })

  // 测试只读状态
  test('renders readonly state', () => {
    const wrapper = mount(WdRate, {
      props: {
        readonly: true,
        modelValue: 3
      }
    })
    expect(wrapper.classes()).toContain('is-readonly')
  })

  // 测试change事件
  test('emits change event', async () => {
    const wrapper = mount(WdRate)
    const stars = wrapper.findAll('.wd-rate__item')
    await stars[2].trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual([3])
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-rate'
    const wrapper = mount(WdRate, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 8px;'
    const wrapper = mount(WdRate, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
