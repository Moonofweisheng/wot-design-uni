import { mount } from '@vue/test-utils'
import WdText from '@/uni_modules/wot-design-uni/components/wd-text/wd-text.vue'
import { describe, test, expect } from 'vitest'
import { TextType } from '@/uni_modules/wot-design-uni/components/wd-text/types'

describe('WdText', () => {
  // 测试基本渲染
  test('renders text with default props', () => {
    const wrapper = mount(WdText)
    expect(wrapper.classes()).toContain('wd-text')
  })

  // 测试不同类型
  test('renders different types', () => {
    const types: TextType[] = ['default', 'primary', 'success', 'warning', 'error']
    types.forEach((type) => {
      const wrapper = mount(WdText, {
        props: { type }
      })
      expect(wrapper.classes()).toContain(`wd-text--${type}`)
    })
  })

  // 测试文本大小
  test('renders with custom size', () => {
    const size = '20px'
    const wrapper = mount(WdText, {
      props: { size }
    })
    expect(wrapper.attributes('style')).toContain(`font-size: ${size}`)
  })

  // 测试文本对齐
  test('renders with different alignments', () => {
    const textAlign = 'center'
    const wrapper = mount(WdText, {
      props: { textAlign }
    })
    expect(wrapper.attributes('style')).toContain(`text-align: ${textAlign}`)
  })

  // 测试字体粗细
  test('renders with different font weights', () => {
    const fontWeight = 'bold'
    const wrapper = mount(WdText, {
      props: { fontWeight }
    })
    expect(wrapper.attributes('style')).toContain(`font-weight: ${fontWeight}`)
  })

  // 测试下划线
  test('renders with underline', () => {
    const wrapper = mount(WdText, {
      props: { underline: true }
    })
    expect(wrapper.classes()).toContain('is-underline')
  })

  // 测试删除线
  test('renders with delete line', () => {
    const wrapper = mount(WdText, {
      props: { delete: true }
    })
    expect(wrapper.classes()).toContain('is-delete')
  })

  // 测试省略号
  test('renders with ellipsis', () => {
    const wrapper = mount(WdText, {
      props: { ellipsis: true }
    })
    expect(wrapper.classes()).toContain('is-ellipsis')
  })

  // 测试多行省略
  test('renders with multiple line ellipsis', () => {
    const wrapper = mount(WdText, {
      props: {
        ellipsis: true,
        ellipsisLine: 2
      }
    })
    expect(wrapper.classes()).toContain('is-ellipsis-line')
    expect(wrapper.attributes('style')).toContain('-webkit-line-clamp: 2')
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdText)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试前缀插槽
  test('renders prefix slot', () => {
    const wrapper = mount(WdText, {
      slots: {
        prefix: '前缀'
      }
    })
    expect(wrapper.text()).toContain('前缀')
  })

  // 测试后缀插槽
  test('renders suffix slot', () => {
    const wrapper = mount(WdText, {
      slots: {
        suffix: '后缀'
      }
    })
    expect(wrapper.text()).toContain('后缀')
  })

  // 测试自定义颜色
  test('renders with custom color', () => {
    const color = '#ff0000'
    const wrapper = mount(WdText, {
      props: { color }
    })
    expect(wrapper.attributes('style')).toContain(`color: ${color}`)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-text'
    const wrapper = mount(WdText, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 8px;'
    const wrapper = mount(WdText, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
