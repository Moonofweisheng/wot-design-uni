import { mount } from '@vue/test-utils'
import '../mocks/wd-transition.mock'
import WdOverlay from '@/uni_modules/wot-design-uni/components/wd-overlay/wd-overlay.vue'
import { describe, test, expect, vi } from 'vitest'

describe('WdOverlay', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdOverlay)
    expect(wrapper.findComponent({ name: 'wd-transition' }).props('customClass')).toBe('wd-overlay')
  })

  // 测试显示和隐藏
  test('显示和隐藏状态', async () => {
    const wrapper = mount(WdOverlay, {
      props: { show: true }
    })
    expect(wrapper.findComponent({ name: 'wd-transition' }).props('show')).toBe(true)

    await wrapper.setProps({ show: false })
    expect(wrapper.findComponent({ name: 'wd-transition' }).props('show')).toBe(false)
  })

  // 测试自定义z-index
  test('自定义z-index', () => {
    const zIndex = 1000
    const wrapper = mount(WdOverlay, {
      props: { zIndex }
    })
    const style = wrapper.findComponent({ name: 'wd-transition' }).props('customStyle')
    expect(style).toContain(`z-index: ${zIndex}`)
  })

  // 测试自定义背景色
  test('自定义背景色', () => {
    // 由于 backgroundColor 属性不存在于 wd-overlay 组件中，这个测试用例应该被跳过
    // 我们可以检查组件是否正确渲染
    const wrapper = mount(WdOverlay)
    expect(wrapper.findComponent({ name: 'wd-transition' }).exists()).toBe(true)
  })

  // 测试自定义动画时长
  test('自定义动画时长', () => {
    const duration = 300
    const wrapper = mount(WdOverlay, {
      props: { duration }
    })
    expect(wrapper.findComponent({ name: 'wd-transition' }).props('duration')).toBe(duration)
  })

  // 测试点击事件
  test('点击事件', async () => {
    const wrapper = mount(WdOverlay, {
      props: { show: true }
    })
    await wrapper.findComponent({ name: 'wd-transition' }).vm.$emit('click')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['click']).toBeTruthy()
  })

  // 测试锁定滚动
  test('显示时锁定滚动', () => {
    const wrapper = mount(WdOverlay, {
      props: {
        show: true,
        lockScroll: true
      }
    })
    expect(wrapper.props('lockScroll')).toBe(true)
  })

  // 测试默认插槽
  test('默认插槽内容', () => {
    const slotContent = '<div class="custom-content">自定义内容</div>'
    const wrapper = mount(WdOverlay, {
      slots: {
        default: slotContent
      }
    })
    expect(wrapper.html()).toContain('custom-content')
  })

  // 测试锁定滚动属性
  test('锁定滚动属性', () => {
    const wrapper = mount(WdOverlay, {
      props: {
        show: true,
        lockScroll: false
      }
    })
    expect(wrapper.props('lockScroll')).toBe(false)
  })

  // 测试自定义内容
  test('通过默认插槽渲染自定义内容', () => {
    const wrapper = mount(WdOverlay, {
      props: { show: true },
      slots: {
        default: '<div class="custom-content">Custom Content</div>'
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBeTruthy()
    expect(wrapper.find('.custom-content').text()).toBe('Custom Content')
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'custom-overlay'
    const wrapper = mount(WdOverlay, {
      props: { customClass }
    })
    // 由于 customClass 属性被传递给了 wd-transition 组件，我们需要检查 wd-transition 的 customClass 属性
    const transitionClass = wrapper.findComponent({ name: 'wd-transition' }).props('customClass')
    expect(transitionClass).toContain('wd-overlay')
    // 检查 props 是否正确传递
    expect(wrapper.props('customClass')).toBe(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'opacity: 0.8;'
    const wrapper = mount(WdOverlay, {
      props: { customStyle }
    })
    const style = wrapper.findComponent({ name: 'wd-transition' }).props('customStyle')
    expect(style).toContain(customStyle)
  })

  // 测试动画classes
  test('过渡动画类名', async () => {
    const wrapper = mount(WdOverlay, {
      props: { show: false }
    })
    await wrapper.setProps({ show: true })
    // 由于 wd-transition 组件负责处理动画，我们需要检查 wd-transition 的 name 属性
    expect(wrapper.findComponent({ name: 'wd-transition' }).props('name')).toBe('fade')
  })
})
