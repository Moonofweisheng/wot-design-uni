import { mount } from '@vue/test-utils'
import WdNotify from '@/uni_modules/wot-design-uni/components/wd-notify/wd-notify.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { NotifyPosition, NotifyType } from '@/uni_modules/wot-design-uni/components/wd-notify/types'

describe('WdNotify', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 测试基本渲染
  test('renders notify with default props', () => {
    const wrapper = mount(WdNotify)
    expect(wrapper.classes()).toContain('wd-notify')
  })

  // 测试显示和隐藏
  test('handles visibility', async () => {
    const wrapper = mount(WdNotify, {
      props: {
        visible: false
      }
    })
    expect(wrapper.classes()).not.toContain('wd-notify-fade-enter-active')

    await wrapper.setProps({ visible: true })
    expect(wrapper.classes()).toContain('wd-notify-fade-enter-active')
  })

  // 测试不同类型
  test('renders different types', () => {
    const types: NotifyType[] = ['primary', 'success', 'warning', 'danger']
    types.forEach((type) => {
      const wrapper = mount(WdNotify, {
        props: { type }
      })
      expect(wrapper.classes()).toContain(`wd-notify--${type}`)
    })
  })

  // 测试自定义颜色
  test('renders custom color', () => {
    const color = '#ff0000'
    const wrapper = mount(WdNotify, {
      props: { color }
    })
    expect(wrapper.attributes('style')).toContain(`background-color: ${color}`)
  })

  // 测试自定义位置
  test('renders at different positions', () => {
    const positions: NotifyPosition[] = ['top', 'bottom']
    positions.forEach((position) => {
      const wrapper = mount(WdNotify, {
        props: { position }
      })
      expect(wrapper.classes()).toContain(`wd-notify--${position}`)
    })
  })

  // 测试自动关闭
  test('auto closes after duration', async () => {
    const duration = 2000
    const wrapper = mount(WdNotify, {
      props: {
        modelValue: true,
        duration
      }
    })

    vi.advanceTimersByTime(duration)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  // 测试禁用自动关闭
  test('disables auto close with duration 0', () => {
    const wrapper = mount(WdNotify, {
      props: {
        modelValue: true,
        duration: 0
      }
    })

    vi.advanceTimersByTime(3000)
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // 测试自定义内容
  test('renders custom content', () => {
    const message = '这是一条通知'
    const wrapper = mount(WdNotify, {
      props: { message }
    })
    expect(wrapper.text()).toContain(message)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-notify'
    const wrapper = mount(WdNotify, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试z-index
  test('applies custom z-index', () => {
    const zIndex = 2000
    const wrapper = mount(WdNotify, {
      props: { zIndex }
    })
    expect(wrapper.attributes('style')).toContain(`z-index: ${zIndex}`)
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdNotify, {
      props: { modelValue: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试关闭前的回调
  test('calls beforeClose hook', async () => {
    const beforeClose = vi.fn()
    const wrapper = mount(WdNotify, {
      props: {
        modelValue: true,
        duration: 1000,
        beforeClose
      }
    })

    vi.advanceTimersByTime(1000)
    expect(beforeClose).toHaveBeenCalled()
  })

  // 测试关闭后的回调
  test('calls onClose hook', async () => {
    const onClose = vi.fn()
    const wrapper = mount(WdNotify, {
      props: {
        modelValue: true,
        duration: 1000,
        onClose
      }
    })

    vi.advanceTimersByTime(1000)
    expect(onClose).toHaveBeenCalled()
  })

  // 测试滚动锁定
  test('locks scroll when specified', () => {
    const wrapper = mount(WdNotify, {
      props: {
        modelValue: true,
        lockScroll: true
      }
    })
    expect(document.body.style.overflow).toBe('hidden')
  })
})
