import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import WdSlideVerify from '@/uni_modules/wot-design-uni/components/wd-slide-verify/wd-slide-verify.vue'

describe('wd-slide-verify', () => {
  test('基本渲染', () => {
    const wrapper = mount(WdSlideVerify)
    expect(wrapper.classes()).toContain('wd-slide-verify')
    expect(wrapper.find('.wd-slide-verify__text').exists()).toBe(true)
    expect(wrapper.find('.wd-slide-verify__track').exists()).toBe(true)
    expect(wrapper.find('.wd-slide-verify__button').exists()).toBe(true)
  })

  test('自定义属性', () => {
    const wrapper = mount(WdSlideVerify, {
      props: {
        width: 400,
        height: 50,
        text: 'Custom Text',
        successText: 'Success!',
        backgroundColor: '#000000',
        activeBackgroundColor: '#ffffff',
        icon: 'star',
        successIcon: 'success',
        iconSize: 30,
        successIconSize: 20
      }
    })

    const root = wrapper.find('.wd-slide-verify')
    expect(root.attributes('style')).toContain('width: 400px')
    expect(root.attributes('style')).toContain('height: 50px')
    expect(root.attributes('style')).toContain('background-color: rgb(0, 0, 0)')

    const track = wrapper.find('.wd-slide-verify__track')
    expect(track.attributes('style')).toContain('--wd-slide-verify-track-width: 400px')

    expect(wrapper.find('.wd-slide-verify__text').text()).toBe('Custom Text')

    // Check icon props (might need to check wd-icon component props or class)
    const icon = wrapper.findComponent({ name: 'wd-icon' })
    expect(icon.props('name')).toBe('star')
    expect(icon.props('size')).toBe(30)
  })

  test('插槽渲染', () => {
    const wrapper = mount(WdSlideVerify, {
      slots: {
        text: '<div class="custom-text">Slot Text</div>',
        'success-text': '<div class="custom-success-text">Success Slot</div>',
        icon: '<div class="custom-icon">Icon Slot</div>'
      }
    })

    expect(wrapper.find('.custom-text').text()).toBe('Slot Text')
    expect(wrapper.find('.custom-icon').text()).toBe('Icon Slot')
    // Success text is only visible when passed? No, it's in the track text but covered or visible.
    // The component structure shows success-text slot is inside .wd-slide-verify__track-text
    expect(wrapper.find('.custom-success-text').text()).toBe('Success Slot')
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdSlideVerify, {
      props: {
        disabled: true
      }
    })

    const button = wrapper.find('.wd-slide-verify__button')

    await button.trigger('touchstart', {
      touches: [{ clientX: 0, clientY: 0 }]
    })

    expect(wrapper.classes()).toContain('is-disabled')
    // Logic check: dragging state shouldn't change
    // We can't easily access internal state 'isDragging' without expose or vm inspection if not exposed
    // But we can check if style changed. Initial translate is 0.

    await button.trigger('touchmove', {
      touches: [{ clientX: 100, clientY: 0 }]
    })

    // If disabled, position should stay 0
    expect(button.attributes('style')).toContain('transform: translate(0px, 0)')
  })

  test('滑动验证成功', async () => {
    const wrapper = mount(WdSlideVerify, {
      props: {
        width: 300,
        height: 40,
        tolerance: 10
      }
    })

    const button = wrapper.find('.wd-slide-verify__button')

    // Start dragging
    await button.trigger('touchstart', {
      touches: [{ clientX: 0, clientY: 0 }]
    })

    // Move to the end (width - height = 300 - 40 = 260)
    await button.trigger('touchmove', {
      touches: [{ clientX: 260, clientY: 0 }]
    })

    // End dragging
    await button.trigger('touchend')

    // Should emit success
    expect(wrapper.emitted('success')).toBeTruthy()
    expect(wrapper.classes()).toContain('is-success')

    // Success icon should be shown (if we check internal state or re-render)
    // The template switches slot based on isPass
    // <slot v-if="isPass" name="success-icon">

    // Wait for Vue to update DOM
    await wrapper.vm.$nextTick()

    // Check if success icon is rendered (default check icon)
    const icons = wrapper.findAllComponents({ name: 'wd-icon' })
    // The last one should be the visible one or we check if the wrapper for success icon exists
    expect(wrapper.find('.wd-slide-verify__button-icon--success').exists()).toBe(true)
  })

  test('滑动验证失败', async () => {
    vi.useFakeTimers()
    const wrapper = mount(WdSlideVerify, {
      props: {
        width: 300,
        height: 40
      }
    })

    const button = wrapper.find('.wd-slide-verify__button')

    // Start dragging
    await button.trigger('touchstart', {
      touches: [{ clientX: 0, clientY: 0 }]
    })

    // Move halfway
    await button.trigger('touchmove', {
      touches: [{ clientX: 100, clientY: 0 }]
    })

    // End dragging
    await button.trigger('touchend')

    // Should emit fail
    expect(wrapper.emitted('fail')).toBeTruthy()
    expect(wrapper.classes()).not.toContain('is-success')

    // Should reset position after timer
    // Immediate check: isResetting should be true, position should be 0
    // The code sets currentPosition to 0 immediately on fail
    expect(button.attributes('style')).toContain('transform: translate(0px, 0)')

    vi.runAllTimers()
    vi.useRealTimers()
  })

  test('重置方法', async () => {
    const wrapper = mount(WdSlideVerify, {
      props: {
        width: 300,
        height: 40
      }
    })

    // Simulate success first
    const button = wrapper.find('.wd-slide-verify__button')
    await button.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    await button.trigger('touchmove', { touches: [{ clientX: 260, clientY: 0 }] })
    await button.trigger('touchend')

    expect(wrapper.classes()).toContain('is-success')

    // Call reset
    await wrapper.vm.reset()

    expect(wrapper.classes()).not.toContain('is-success')
    expect(button.attributes('style')).toContain('transform: translate(0px, 0)')
  })
})
