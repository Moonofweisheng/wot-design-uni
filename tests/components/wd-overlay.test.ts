import { mount } from '@vue/test-utils'
import WdOverlay from '@/uni_modules/wot-design-uni/components/wd-overlay/wd-overlay.vue'
import { describe, test, expect } from 'vitest'

describe('WdOverlay', () => {
  // 测试基本渲染
  test('renders overlay with default props', () => {
    const wrapper = mount(WdOverlay)
    expect(wrapper.classes()).toContain('wd-overlay')
  })

  // 测试显示和隐藏
  test('renders visibility state', () => {
    const wrapper = mount(WdOverlay, {
      props: { show: true }
    })
    expect(wrapper.isVisible()).toBe(true)

    wrapper.setProps({ show: false })
    expect(wrapper.isVisible()).toBe(false)
  })

  // 测试自定义z-index
  test('renders custom z-index', () => {
    const zIndex = 1000
    const wrapper = mount(WdOverlay, {
      props: { zIndex }
    })
    expect(wrapper.attributes('style')).toContain(`z-index: ${zIndex}`)
  })

  // 测试自定义背景色
  test('renders custom background color', () => {
    const backgroundColor = 'rgba(0, 0, 0, 0.7)'
    const wrapper = mount(WdOverlay, {
      props: { backgroundColor }
    })
    expect(wrapper.attributes('style')).toContain(`background-color: ${backgroundColor}`)
  })

  // 测试自定义动画时长
  test('renders custom duration', () => {
    const duration = 300
    const wrapper = mount(WdOverlay, {
      props: { duration }
    })
    expect(wrapper.attributes('style')).toContain(`transition-duration: ${duration}ms`)
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdOverlay, {
      props: { show: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试锁定滚动
  test('locks scroll when shown', () => {
    const wrapper = mount(WdOverlay, {
      props: {
        show: true,
        lockScroll: true
      }
    })
    expect(wrapper.vm.lockScroll).toBe(true)
  })

  // 测试默认插槽
  test('renders default slot content', () => {
    const slotContent = '<div class="custom-content">自定义内容</div>'
    const wrapper = mount(WdOverlay, {
      slots: {
        default: slotContent
      }
    })
    expect(wrapper.html()).toContain('custom-content')
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-overlay'
    const wrapper = mount(WdOverlay, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'opacity: 0.8;'
    const wrapper = mount(WdOverlay, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试动画classes
  test('applies transition classes', async () => {
    const wrapper = mount(WdOverlay, {
      props: { show: false }
    })
    await wrapper.setProps({ show: true })
    expect(wrapper.classes()).toContain('wd-overlay-enter')
  })
})
