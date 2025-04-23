import { mount } from '@vue/test-utils'
import WdSignature from '../../src/uni_modules/wot-design-uni/components/wd-signature/wd-signature.vue'
import { describe, expect, test, vi } from 'vitest'

describe('WdSignature', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSignature)
    expect(wrapper.classes()).toContain('wd-signature')
  })

  test('自定义画布尺寸', async () => {
    const wrapper = mount(WdSignature, {
      props: {
        width: 300,
        height: 200
      }
    })
    const canvas = wrapper.find('canvas')
    expect(canvas.attributes('width')).toBe('300')
    expect(canvas.attributes('height')).toBe('200')
  })

  test('自定义线条颜色', async () => {
    const wrapper = mount(WdSignature, {
      props: {
        penColor: '#ff0000'
      }
    })
    expect(wrapper.vm.penColor).toBe('#ff0000')
  })

  test('自定义线条宽度', async () => {
    const wrapper = mount(WdSignature, {
      props: {
        lineWidth: 3
      }
    })
    expect(wrapper.vm.lineWidth).toBe(3)
  })

  test('清除按钮', async () => {
    const wrapper = mount(WdSignature)
    await wrapper.find('.wd-signature__clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  test('保存按钮', async () => {
    const wrapper = mount(WdSignature)
    await wrapper.find('.wd-signature__save').trigger('click')
    expect(wrapper.emitted('save')).toBeTruthy()
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdSignature, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('自定义背景色', async () => {
    const wrapper = mount(WdSignature, {
      props: {
        backgroundColor: '#f5f5f5'
      }
    })
    expect(wrapper.vm.backgroundColor).toBe('#f5f5f5')
  })

  test('自定义按钮文案', async () => {
    const wrapper = mount(WdSignature, {
      props: {
        clearText: '重写',
        saveText: '完成'
      }
    })
    expect(wrapper.find('.wd-signature__clear').text()).toBe('重写')
    expect(wrapper.find('.wd-signature__save').text()).toBe('完成')
  })

  test('启用历史记录功能', async () => {
    const wrapper = mount(WdSignature, {
      props: {
        enableHistory: true
      }
    })
    const revokeBtn = wrapper.find('wd-button')
    const restoreBtn = wrapper.findAll('wd-button').at(1)
    expect(revokeBtn.exists()).toBeTruthy()
    expect(restoreBtn?.exists()).toBeTruthy()
  })

  test('笔锋效果', async () => {
    const wrapper = mount(WdSignature, {
      props: {
        pressure: true,
        minWidth: 1,
        maxWidth: 5,
        minSpeed: 1.5
      }
    })
    expect(wrapper.vm.pressure).toBe(true)
    expect(wrapper.vm.minWidth).toBe(1)
    expect(wrapper.vm.maxWidth).toBe(5)
    expect(wrapper.vm.minSpeed).toBe(1.5)
  })

  test('签名过程事件触发', async () => {
    const wrapper = mount(WdSignature)
    const canvas = wrapper.find('canvas')

    await canvas.trigger('touchstart', {
      touches: [{ x: 100, y: 100 }],
      preventDefault: vi.fn()
    })
    expect(wrapper.emitted('start')).toBeTruthy()

    await canvas.trigger('touchmove', {
      touches: [{ x: 120, y: 120 }],
      preventDefault: vi.fn()
    })
    expect(wrapper.emitted('signing')).toBeTruthy()

    await canvas.trigger('touchend', {
      preventDefault: vi.fn()
    })
    expect(wrapper.emitted('end')).toBeTruthy()
  })
})
