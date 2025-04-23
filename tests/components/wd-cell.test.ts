import { mount } from '@vue/test-utils'
import WdCell from '@/uni_modules/wot-design-uni/components/wd-cell/wd-cell.vue'
import { describe, test, expect } from 'vitest'

describe('WdCell', () => {
  // 测试基本渲染
  test('renders cell with default props', () => {
    const wrapper = mount(WdCell)
    expect(wrapper.classes()).toContain('wd-cell')
  })

  // 测试标题和值
  test('renders with title and value', () => {
    const title = '标题'
    const value = '内容'
    const wrapper = mount(WdCell, {
      props: { title, value }
    })
    expect(wrapper.find('.wd-cell__title').text()).toBe(title)
    expect(wrapper.find('.wd-cell__value').text()).toBe(value)
  })

  // 测试标签
  test('renders with label', () => {
    const label = '描述信息'
    const wrapper = mount(WdCell, {
      props: { label }
    })
    expect(wrapper.find('.wd-cell__label').text()).toBe(label)
  })

  // 测试图标
  test('renders with icon', () => {
    const icon = 'setting'
    const wrapper = mount(WdCell, {
      props: { icon }
    })
    expect(wrapper.find('.wd-cell__icon').exists()).toBe(true)
    expect(wrapper.classes()).toContain('is-icon')
  })

  // 测试可点击状态
  test('renders clickable state', async () => {
    const wrapper = mount(WdCell, {
      props: { isLink: true }
    })
    expect(wrapper.classes()).toContain('is-link')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试右箭头
  test('renders with right arrow', () => {
    const wrapper = mount(WdCell, {
      props: { isLink: true }
    })
    expect(wrapper.find('.wd-cell__arrow-right').exists()).toBe(true)
  })

  // 测试点击跳转
  test('handles click navigation', () => {
    const url = '/pages/index/index'
    const wrapper = mount(WdCell, {
      props: {
        isLink: true,
        url
      }
    })
    expect(wrapper.vm.url).toBe(url)
  })

  // 测试边框
  test('renders with border', () => {
    const wrapper = mount(WdCell, {
      props: { border: true }
    })
    expect(wrapper.classes()).toContain('is-bordered')
  })

  // 测试插槽
  test('renders slots', () => {
    const wrapper = mount(WdCell, {
      slots: {
        title: '<div class="custom-title">自定义标题</div>',
        icon: '<div class="custom-icon">自定义图标</div>',
        label: '<div class="custom-label">自定义标签</div>',
        value: '<div class="custom-value">自定义内容</div>'
      }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.custom-label').exists()).toBe(true)
    expect(wrapper.find('.custom-value').exists()).toBe(true)
  })

  // 测试对齐方式
  test('renders with different alignments', () => {
    const wrapper = mount(WdCell, {
      props: { alignItems: 'center' }
    })
    expect(wrapper.classes()).toContain('is-align-center')
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-cell'
    const wrapper = mount(WdCell, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'background: yellow;'
    const wrapper = mount(WdCell, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
