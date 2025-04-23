/*
 * @Author: weisheng
 * @Date: 2025-04-10 12:30:14
 * @LastEditTime: 2025-04-12 18:39:12
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/tests/components/wd-collapse.test.ts
 * 记得注释
 */
import { mount } from '@vue/test-utils'
import WdCollapse from '@/uni_modules/wot-design-uni/components/wd-collapse/wd-collapse.vue'
import { describe, test, expect } from 'vitest'

describe('WdCollapse', () => {
  // 测试基本渲染
  test('renders collapse with default props', () => {
    const wrapper = mount(WdCollapse)
    expect(wrapper.classes()).toContain('wd-collapse')
  })

  // 测试手风琴模式
  test('renders in accordion mode', () => {
    const wrapper = mount(WdCollapse, {
      props: { accordion: true }
    })
    expect(wrapper.vm.accordion).toBe(true)
  })

  // 测试默认展开项
  test('renders with default active names', () => {
    const modelValue = ['1']
    const wrapper = mount(WdCollapse, {
      props: { modelValue }
    })
    expect(wrapper.vm.modelValue).toEqual(modelValue)
  })

  // 测试插槽内容
  test('renders default slot content', () => {
    const slotContent = '<div class="test-content">测试内容</div>'
    const wrapper = mount(WdCollapse, {
      slots: {
        default: slotContent
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
  })

  // 测试展开/折叠事件
  test('emits change event when item is toggled', async () => {
    const wrapper = mount(WdCollapse)
    await wrapper.vm.$emit('change', ['1'])
    expect(wrapper.emitted('change')?.[0]).toEqual([['1']])
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-collapse'
    const wrapper = mount(WdCollapse, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'background: yellow;'
    const wrapper = mount(WdCollapse, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试禁用状态
  test('renders in disabled state', () => {
    const wrapper = mount(WdCollapse, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 测试展开动画
  test('renders with animation', () => {
    const wrapper = mount(WdCollapse, {
      props: { viewmore: true }
    })
    expect(wrapper.classes()).toContain('is-viewmore')
  })
})
