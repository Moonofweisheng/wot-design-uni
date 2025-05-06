import { mount } from '@vue/test-utils'
import WdGap from '@/uni_modules/wot-design-uni/components/wd-gap/wd-gap.vue'
import { describe, test, expect } from 'vitest'

describe('WdGap', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdGap)
    expect(wrapper.classes()).toContain('wd-gap')
  })

  // 测试背景颜色
  test('背景颜色', () => {
    const bgColor = '#f5f5f5'
    const wrapper = mount(WdGap, {
      props: { bgColor }
    })
    expect(wrapper.attributes('style')).toContain('background: ')
  })

  // 测试上下间距
  test('上下间距', () => {
    const height = 20
    const wrapper = mount(WdGap, {
      props: { height }
    })
    expect(wrapper.attributes('style')).toContain(`height: ${height}px`)
  })

  // 测试底部安全区域
  test('底部安全区域', () => {
    const wrapper = mount(WdGap, {
      props: { safeAreaBottom: true }
    })
    expect(wrapper.classes()).toContain('wd-gap--safe')
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'custom-gap'
    const wrapper = mount(WdGap, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'margin: 10px 0;'
    const wrapper = mount(WdGap, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain('margin: 10px 0px')
  })

  // 测试组合属性
  test('组合属性', () => {
    const wrapper = mount(WdGap, {
      props: {
        height: 30,
        bgColor: '#eee',
        safeAreaBottom: true,
        customStyle: 'margin: 5px 0;'
      }
    })
    expect(wrapper.attributes('style')).toContain('height: 30px')
    expect(wrapper.attributes('style')).toContain('background: ')
    expect(wrapper.attributes('style')).toContain('margin: 5px 0px')
    expect(wrapper.classes()).toContain('wd-gap--safe')
  })
})
