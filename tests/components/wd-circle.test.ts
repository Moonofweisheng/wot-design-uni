import { mount } from '@vue/test-utils'
import WdCircle from '@/uni_modules/wot-design-uni/components/wd-circle/wd-circle.vue'
import { describe, test, expect } from 'vitest'

describe('WdCircle', () => {
  // 测试基本渲染
  test('renders circle with default props', () => {
    const wrapper = mount(WdCircle)
    expect(wrapper.classes()).toContain('wd-circle')
  })

  // 测试进度值
  test('renders with different percentage', () => {
    const rate = 75
    const wrapper = mount(WdCircle, {
      props: { modelValue: rate }
    })
    expect(wrapper.vm.modelValue).toBe(rate)
  })

  // 测试自定义颜色
  test('renders with custom color', () => {
    const color = '#ff0000'
    const wrapper = mount(WdCircle, {
      props: { color }
    })
    expect(wrapper.vm.color).toBe(color)
  })

  // 测试大小设置
  test('renders with custom size', () => {
    const size = 200
    const wrapper = mount(WdCircle, {
      props: { size }
    })
    expect(wrapper.attributes('style')).toContain(`width: ${size}px`)
    expect(wrapper.attributes('style')).toContain(`height: ${size}px`)
  })

  // 测试线条宽度
  test('renders with custom line width', () => {
    const strokeWidth = 8
    const wrapper = mount(WdCircle, {
      props: { strokeWidth }
    })
    expect(wrapper.vm.strokeWidth).toBe(strokeWidth)
  })

  // 测试默认插槽内容
  test('renders default slot content', () => {
    const content = '75%'
    const wrapper = mount(WdCircle, {
      slots: {
        default: content
      }
    })
    expect(wrapper.text()).toBe(content)
  })

  // 测试渐变色
  test('renders with gradient colors', () => {
    const wrapper = mount(WdCircle, {
      props: {
        color: {
          '0%': '#3be6cb',
          '100%': '#3b7eeb'
        }
      }
    })
    expect(typeof wrapper.vm.color).toBe('object')
  })

  // 测试顺时针/逆时针方向
  test('renders with clockwise direction', () => {
    const wrapper = mount(WdCircle, {
      props: { clockwise: false }
    })
    expect(wrapper.vm.clockwise).toBe(false)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-circle'
    const wrapper = mount(WdCircle, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 20px;'
    const wrapper = mount(WdCircle, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
