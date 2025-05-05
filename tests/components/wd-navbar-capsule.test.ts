import { mount } from '@vue/test-utils'
import WdNavbarCapsule from '@/uni_modules/wot-design-uni/components/wd-navbar-capsule/wd-navbar-capsule.vue'
import { describe, test, expect, vi } from 'vitest'

describe('WdNavbarCapsule', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdNavbarCapsule)
    expect(wrapper.classes()).toContain('wd-navbar-capsule')
    // 检查组件是否正确渲染
    expect(wrapper.html()).toContain('wd-navbar-capsule')
  })

  // 测试组件结构
  test('组件结构', () => {
    const wrapper = mount(WdNavbarCapsule)

    // 检查组件结构
    expect(wrapper.html()).toContain('wd-navbar-capsule')
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'my-capsule'
    const wrapper = mount(WdNavbarCapsule, {
      props: {
        customClass
      }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'background-color: red;'
    const wrapper = mount(WdNavbarCapsule, {
      props: {
        customStyle
      }
    })

    expect(wrapper.attributes('style')).toBe(customStyle)
  })
})
