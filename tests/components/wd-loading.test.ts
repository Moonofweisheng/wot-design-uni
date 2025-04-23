import { mount } from '@vue/test-utils'
import WdLoading from '@/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue'
import { describe, test, expect } from 'vitest'
import type { LoadingType } from '@/uni_modules/wot-design-uni/components/wd-loading/types'

describe('WdLoading', () => {
  // 测试基本渲染
  test('renders loading with default props', () => {
    const wrapper = mount(WdLoading)
    expect(wrapper.classes()).toContain('wd-loading')
  })

  // 测试不同类型的loading
  test('renders different loading types', () => {
    const types: LoadingType[] = ['outline', 'ring']
    types.forEach((type) => {
      const wrapper = mount(WdLoading, {
        props: { type }
      })
      expect(wrapper.classes()).toContain(`wd-loading-${type}`)
    })
  })

  // 测试自定义颜色
  test('applies custom color', () => {
    const color = '#ff0000'
    const wrapper = mount(WdLoading, {
      props: { color }
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('fill')).toBe(color)
  })

  // 测试自定义大小
  test('applies custom size', () => {
    const size = '40px'
    const wrapper = mount(WdLoading, {
      props: { size }
    })
    expect(wrapper.attributes('style')).toContain(`width: ${size}`)
    expect(wrapper.attributes('style')).toContain(`height: ${size}`)
  })

  // 测试加载文案
  test('renders loading text', () => {
    const loadingText = '加载中...'
    const wrapper = mount(WdLoading, {
      props: { loadingText }
    })
    const textElement = wrapper.find('.wd-loading__text')
    expect(textElement.exists()).toBe(true)
    expect(textElement.text()).toBe(loadingText)
  })

  // 测试垂直排列
  test('renders vertical layout', () => {
    const wrapper = mount(WdLoading, {
      props: {
        vertical: true,
        loadingText: '加载中'
      }
    })
    expect(wrapper.classes()).toContain('is-vertical')
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-loading'
    const wrapper = mount(WdLoading, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 10px'
    const wrapper = mount(WdLoading, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
