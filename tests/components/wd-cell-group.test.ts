import { mount } from '@vue/test-utils'
import WdCellGroup from '@/uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.vue'
import { describe, test, expect } from 'vitest'

describe('WdCellGroup', () => {
  // 测试基本渲染
  test('renders cell group with default props', () => {
    const wrapper = mount(WdCellGroup)
    expect(wrapper.classes()).toContain('wd-cell-group')
  })

  // 测试标题
  test('renders with title', () => {
    const title = '分组标题'
    const wrapper = mount(WdCellGroup, {
      props: { title }
    })
    expect(wrapper.find('.wd-cell-group__title').text()).toBe(title)
  })

  // 测试值
  test('renders with value', () => {
    const value = '内容'
    const wrapper = mount(WdCellGroup, {
      props: { value }
    })
    expect(wrapper.find('.wd-cell-group__value').text()).toBe(value)
  })

  // 测试插槽内容
  test('renders default slot content', () => {
    const slotContent = '自定义内容'
    const wrapper = mount(WdCellGroup, {
      slots: {
        default: slotContent
      }
    })
    expect(wrapper.text()).toContain(slotContent)
  })

  // 测试自定义标题插槽
  test('renders custom title slot', () => {
    const wrapper = mount(WdCellGroup, {
      slots: {
        title: '<div class="custom-title">自定义标题</div>'
      }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  // 测试自定义值插槽
  test('renders custom value slot', () => {
    const wrapper = mount(WdCellGroup, {
      slots: {
        value: '<div class="custom-value">自定义值</div>'
      }
    })
    expect(wrapper.find('.custom-value').exists()).toBe(true)
  })

  // 测试边框
  test('renders with border', () => {
    const wrapper = mount(WdCellGroup, {
      props: { border: true }
    })
    expect(wrapper.classes()).toContain('is-border')
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-group'
    const wrapper = mount(WdCellGroup, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'background: yellow;'
    const wrapper = mount(WdCellGroup, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
