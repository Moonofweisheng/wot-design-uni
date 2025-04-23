import { mount } from '@vue/test-utils'
import WdSlider from '@/uni_modules/wot-design-uni/components/wd-slider/wd-slider.vue'
import { describe, test, expect } from 'vitest'

describe('WdSlider', () => {
  // 测试基本渲染
  test('renders slider with default props', () => {
    const wrapper = mount(WdSlider)
    expect(wrapper.classes()).toContain('wd-slider')
    expect(wrapper.find('.wd-slider__bar').exists()).toBeTruthy()
  })

  // 测试默认值
  test('renders with default value', () => {
    const modelValue = 50
    const wrapper = mount(WdSlider, {
      props: { modelValue }
    })
    expect(wrapper.find('.wd-slider__bar').attributes('style')).toContain('width: 50%')
  })

  // 测试禁用状态
  test('renders disabled state', async () => {
    const wrapper = mount(WdSlider, {
      props: {
        disabled: true,
        modelValue: 30
      }
    })
    expect(wrapper.classes()).toContain('wd-slider--disabled')
    await wrapper.find('.wd-slider__button').trigger('touchstart')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // 测试最大最小值
  test('handles min and max values', () => {
    const wrapper = mount(WdSlider, {
      props: {
        min: 20,
        max: 80,
        modelValue: 50
      }
    })
    // 50在20-80范围内占比50%
    expect(wrapper.find('.wd-slider__bar').attributes('style')).toContain('width: 50%')
  })

  // 测试步长
  test('handles step values', async () => {
    const wrapper = mount(WdSlider, {
      props: {
        step: 10,
        modelValue: 0
      }
    })

    // 模拟滑动到25%位置
    await wrapper.find('.wd-slider__button-wrapper').trigger('touchstart', {
      touches: [{ clientX: 0, clientY: 0 }]
    })
    await wrapper.trigger('touchmove', {
      touches: [{ clientX: 25, clientY: 0 }]
    })
    await wrapper.trigger('touchend')

    // 应该四舍五入到最近的步长值
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([20])
  })

  // 测试自定义样式
  test('renders with custom style', () => {
    const inactiveColor = '#ddd'
    const activeColor = '#f00'
    const wrapper = mount(WdSlider, {
      props: {
        modelValue: 50,
        inactiveColor,
        activeColor
      }
    })
    expect(wrapper.find('.wd-slider__bar').attributes('style')).toContain(`background-color: ${activeColor}`)
  })

  // 测试垂直模式
  test('renders in vertical mode', () => {
    const wrapper = mount(WdSlider, {
      props: {
        vertical: true,
        modelValue: 50
      }
    })
    expect(wrapper.classes()).toContain('is-vertical')
    expect(wrapper.find('.wd-slider__bar').attributes('style')).toContain('height: 50%')
  })

  // 测试范围选择
  test('handles range selection', async () => {
    const wrapper = mount(WdSlider, {
      props: {
        modelValue: [20, 60]
      }
    })
    expect(wrapper.findAll('.wd-slider__button').length).toBe(2)
    expect(wrapper.find('.wd-slider__bar').attributes('style')).toContain('width: 40%')
  })

  // 测试标签显示
  test('renders label', async () => {
    const wrapper = mount(WdSlider, {
      props: {
        modelValue: 50
      }
    })
    expect(wrapper.find('.wd-slider__label').exists()).toBeTruthy()
    expect(wrapper.find('.wd-slider__label').text()).toBe('50')
  })

  // 测试隐藏标签
  test('hides label', () => {
    const wrapper = mount(WdSlider, {
      props: {
        hideLabel: true,
        modelValue: 50
      }
    })
    expect(wrapper.find('.wd-slider__label').exists()).toBeFalsy()
  })

  // 测试事件
  test('emits events', async () => {
    const wrapper = mount(WdSlider, {
      props: {
        modelValue: 0
      }
    })
    await wrapper.find('.wd-slider__button-wrapper').trigger('touchstart')
    expect(wrapper.emitted('dragstart')).toBeTruthy()

    await wrapper.trigger('touchmove', {
      touches: [{ clientX: 50 }]
    })
    expect(wrapper.emitted('dragmove')).toBeTruthy()

    await wrapper.trigger('touchend')
    expect(wrapper.emitted('dragend')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-slider'
    const wrapper = mount(WdSlider, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试隐藏最大最小值
  test('hides min and max values', () => {
    const wrapper = mount(WdSlider, {
      props: {
        hideMinMax: true,
        modelValue: 50
      }
    })
    expect(wrapper.find('.wd-slider__label-min').exists()).toBeFalsy()
    expect(wrapper.find('.wd-slider__label-max').exists()).toBeFalsy()
  })

  // 测试自定义最小最大值类名
  test('applies custom min and max class', () => {
    const customMinClass = 'custom-min'
    const customMaxClass = 'custom-max'
    const wrapper = mount(WdSlider, {
      props: {
        customMinClass,
        customMaxClass,
        modelValue: 50
      }
    })
    expect(wrapper.find('.wd-slider__label-min').classes()).toContain(customMinClass)
    expect(wrapper.find('.wd-slider__label-max').classes()).toContain(customMaxClass)
  })
})
