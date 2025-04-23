/*
 * @Author: weisheng
 * @Date: 2025-04-10 12:30:28
 * @LastEditTime: 2025-04-11 18:39:07
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/tests/components/wd-collapse-item.test.ts
 * 记得注释
 */
import { mount } from '@vue/test-utils'
import WdCollapseItem from '@/uni_modules/wot-design-uni/components/wd-collapse-item/wd-collapse-item.vue'
import { describe, test, expect } from 'vitest'

describe('WdCollapseItem', () => {
  // 测试基本渲染
  test('renders collapse item with default props', () => {
    const wrapper = mount(WdCollapseItem)
    expect(wrapper.classes()).toContain('wd-collapse-item')
  })

  // 测试标题
  test('renders with title', () => {
    const title = '标题'
    const wrapper = mount(WdCollapseItem, {
      props: { title, name: 'test' }
    })
    expect(wrapper.find('.wd-collapse-item__title').text()).toBe(title)
  })

  // 测试禁用状态
  test('renders in disabled state', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { disabled: true, name: 'test' }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 测试展开状态
  test('renders in expanded state', () => {
    const wrapper = mount(WdCollapseItem, {
      props: { isExpanded: true, name: 'test' }
    })
    expect(wrapper.classes()).toContain('is-expanded')
  })

  // 测试插槽内容
  test('renders default slot content', () => {
    const slotContent = '折叠面板内容'
    const wrapper = mount(WdCollapseItem, {
      slots: {
        default: slotContent
      }
    })
    expect(wrapper.text()).toContain(slotContent)
  })

  // 测试自定义标题插槽
  test('renders custom title slot', () => {
    const wrapper = mount(WdCollapseItem, {
      slots: {
        title: '<div class="custom-title">自定义标题</div>'
      }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  // 测试图标
  test('renders with icon', () => {
    const icon = 'setting'
    const wrapper = mount(WdCollapseItem, {
      props: { icon, name: 'test' }
    })
    expect(wrapper.find('.wd-collapse-item__icon').exists()).toBe(true)
  })

  // 测试点击事件
  test('emits click event when clicked', async () => {
    const wrapper = mount(WdCollapseItem)
    await wrapper.find('.wd-collapse-item__header').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-item'
    const wrapper = mount(WdCollapseItem, {
      props: { customClass, name: 'test' }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'background: yellow;'
    const wrapper = mount(WdCollapseItem, {
      props: { customStyle, name: 'test' }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
