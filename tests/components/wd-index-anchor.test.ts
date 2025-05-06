import { mount } from '@vue/test-utils'
import WdIndexAnchor from '@/uni_modules/wot-design-uni/components/wd-index-anchor/wd-index-anchor.vue'
import { describe, test, expect, vi } from 'vitest'

describe('WdIndexAnchor', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdIndexAnchor, {
      props: {
        index: 'A'
      }
    })
    expect(wrapper.html()).toContain('wd-index-anchor')
    expect(wrapper.text()).toBe('A')
  })

  // 测试自定义索引
  test('显示自定义索引', () => {
    const index = 'B'
    const wrapper = mount(WdIndexAnchor, {
      props: {
        index
      }
    })
    expect(wrapper.text()).toBe(index)
  })

  // 测试数字索引
  test('显示数字索引', () => {
    const index = 1
    const wrapper = mount(WdIndexAnchor, {
      props: {
        index
      }
    })
    expect(wrapper.text()).toBe('1')
  })

  // 测试插槽内容
  test('渲染插槽内容', () => {
    const wrapper = mount(WdIndexAnchor, {
      props: {
        index: 'A'
      },
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toBe('自定义内容')
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'my-anchor'
    const wrapper = mount(WdIndexAnchor, {
      props: {
        index: 'A',
        customClass
      }
    })

    expect(wrapper.html()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'color: red;'
    const wrapper = mount(WdIndexAnchor, {
      props: {
        index: 'A',
        customStyle
      }
    })

    expect(wrapper.html()).toContain(customStyle)
  })
})
