import { mount } from '@vue/test-utils'
import WdPopup from '../../src/uni_modules/wot-design-uni/components/wd-popup/wd-popup.vue'
import { describe, expect, test } from 'vitest'
import { PopupType } from '@/uni_modules/wot-design-uni/components/wd-popup/types'

describe('WdPopup', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdPopup)
    expect(wrapper.classes()).toContain('wd-popup')
  })

  test('显示状态', async () => {
    const wrapper = mount(WdPopup, {
      props: {
        modelValue: true
      }
    })
    expect(wrapper.isVisible()).toBeTruthy()
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.isVisible()).toBeFalsy()
  })

  test('弹出位置', async () => {
    const positions: PopupType[] = ['top', 'right', 'bottom', 'left', 'center']
    for (const position of positions) {
      const wrapper = mount(WdPopup, {
        props: {
          position,
          modelValue: true
        }
      })
      expect(wrapper.find(`.wd-popup--${position}`).exists()).toBeTruthy()
    }
  })

  test('关闭按钮', async () => {
    const wrapper = mount(WdPopup, {
      props: {
        closable: true,
        show: true
      }
    })
    expect(wrapper.find('.wd-popup__close').exists()).toBeTruthy()
    await wrapper.find('.wd-popup__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdPopup, {
      props: {
        customStyle: 'background: red;',
        customClass: 'custom-popup'
      }
    })
    expect(wrapper.classes()).toContain('custom-popup')
    expect(wrapper.attributes('style')).toBe('background: red;')
  })

  test('遮罩层点击', async () => {
    const wrapper = mount(WdPopup, {
      props: {
        show: true
      }
    })
    await wrapper.find('.wd-popup__mask').trigger('click')
    expect(wrapper.emitted('clickMask')).toBeTruthy()
  })

  test('禁用遮罩层点击', async () => {
    const wrapper = mount(WdPopup, {
      props: {
        show: true,
        closeOnClickMask: false
      }
    })
    await wrapper.find('.wd-popup__mask').trigger('click')
    expect(wrapper.emitted('close')).toBeFalsy()
  })

  test('插槽内容', async () => {
    const wrapper = mount(WdPopup, {
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      },
      props: {
        show: true
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBeTruthy()
    expect(wrapper.find('.custom-content').text()).toBe('自定义内容')
  })

  test('动画时长', async () => {
    const duration = 300
    const wrapper = mount(WdPopup, {
      props: {
        duration
      }
    })
    expect(wrapper.attributes('style')).toContain(`transition-duration: ${duration}ms`)
  })
})
