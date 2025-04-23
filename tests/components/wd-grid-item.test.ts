import { mount } from '@vue/test-utils'
import WdGridItem from '@/uni_modules/wot-design-uni/components/wd-grid-item/wd-grid-item.vue'
import { describe, test, expect } from 'vitest'

describe('WdGridItem', () => {
  // 测试基本渲染
  test('renders grid item with default props', () => {
    const wrapper = mount(WdGridItem)
    expect(wrapper.classes()).toContain('wd-grid-item')
  })

  // 测试文本内容
  test('renders with text content', () => {
    const text = '格子文本'
    const wrapper = mount(WdGridItem, {
      props: { text }
    })
    expect(wrapper.text()).toContain(text)
  })

  // 测试图标
  test('renders with icon', () => {
    const icon = 'setting'
    const wrapper = mount(WdGridItem, {
      props: { icon }
    })
    expect(wrapper.find('.wd-grid-item__icon').exists()).toBe(true)
  })

  // 测试徽标
  test('renders with badge', () => {
    const badge = '99+'
    const wrapper = mount(WdGridItem, {
      props: { badge }
    })
    expect(wrapper.find('.wd-badge').exists()).toBe(true)
    expect(wrapper.find('.wd-badge').text()).toBe(badge)
  })

  // 测试链接跳转
  test('renders with link', () => {
    const url = '/pages/index/index'
    const wrapper = mount(WdGridItem, {
      props: { url }
    })
    expect(wrapper.vm.url).toBe(url)
  })

  // 测试图标大小
  test('renders with custom icon size', () => {
    const iconSize = '24px'
    const wrapper = mount(WdGridItem, {
      props: { iconSize }
    })
    const icon = wrapper.find('.wd-grid-item__icon')
    expect(icon.attributes('style')).toContain(`font-size: ${iconSize}`)
  })

  // 测试图标颜色
  test('renders with custom icon color', () => {
    const iconColor = '#ff0000'
    const wrapper = mount(WdGridItem, {
      props: { iconColor }
    })
    const icon = wrapper.find('.wd-grid-item__icon')
    expect(icon.attributes('style')).toContain(`color: ${iconColor}`)
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdGridItem)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试自定义图标插槽
  test('renders custom icon slot', () => {
    const wrapper = mount(WdGridItem, {
      slots: {
        icon: '<div class="custom-icon">自定义图标</div>'
      }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  // 测试自定义文本插槽
  test('renders custom text slot', () => {
    const wrapper = mount(WdGridItem, {
      slots: {
        text: '<div class="custom-text">自定义文本</div>'
      }
    })
    expect(wrapper.find('.custom-text').exists()).toBe(true)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-grid-item'
    const wrapper = mount(WdGridItem, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'background: #f5f5f5;'
    const wrapper = mount(WdGridItem, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试禁用状态
  test('renders disabled state', () => {
    const wrapper = mount(WdGridItem, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })
})
