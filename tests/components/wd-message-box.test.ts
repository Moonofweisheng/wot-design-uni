import { mount } from '@vue/test-utils'
import WdMessageBox from '../../src/uni_modules/wot-design-uni/components/wd-message-box/wd-message-box.vue'
import { describe, expect, test, vi } from 'vitest'

describe('WdMessageBox', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdMessageBox)
    expect(wrapper.classes()).toContain('wd-message-box')
  })

  test('标题和内容', async () => {
    const wrapper = mount(WdMessageBox, {
      props: {
        title: '提示',
        message: '这是一条消息'
      }
    })
    expect(wrapper.find('.wd-message-box__title').text()).toBe('提示')
    expect(wrapper.find('.wd-message-box__message').text()).toBe('这是一条消息')
  })

  test('按钮文本', async () => {
    const wrapper = mount(WdMessageBox, {
      props: {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }
    })
    expect(wrapper.find('.wd-message-box__confirm').text()).toBe('确定')
    expect(wrapper.find('.wd-message-box__cancel').text()).toBe('取消')
  })

  test('按钮事件', async () => {
    const wrapper = mount(WdMessageBox)
    await wrapper.find('.wd-message-box__confirm').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
    await wrapper.find('.wd-message-box__cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdMessageBox, {
      props: {
        customClass: 'custom-message-box',
        customStyle: 'background: red;'
      }
    })
    expect(wrapper.classes()).toContain('custom-message-box')
    expect(wrapper.attributes('style')).toBe('background: red;')
  })

  test('Prompt类型', async () => {
    const wrapper = mount(WdMessageBox, {
      props: {
        type: 'prompt',
        inputType: 'text',
        inputValue: 'test',
        inputPlaceholder: '请输入内容'
      }
    })
    expect(wrapper.find('.wd-message-box__body').classes()).toContain('is-prompt')
    const input = wrapper.find('input')
    expect(input.exists()).toBeTruthy()
    expect(input.element.value).toBe('test')
    expect(input.attributes('placeholder')).toBe('请输入内容')
  })

  test('输入框校验', async () => {
    const inputPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const inputError = '请输入正确的邮箱格式'
    const wrapper = mount(WdMessageBox, {
      props: {
        type: 'prompt',
        inputValue: 'test',
        inputPattern,
        inputError
      }
    })

    // 模拟输入无效值并点击确认
    await wrapper.find('input').setValue('invalid')
    await wrapper.find('.wd-message-box__confirm').trigger('click')
    expect(wrapper.find('.wd-message-box__input-error').exists()).toBeTruthy()
    expect(wrapper.find('.wd-message-box__input-error').text()).toBe(inputError)

    // 模拟输入有效值
    await wrapper.find('input').setValue('test@example.com')
    await wrapper.find('.wd-message-box__confirm').trigger('click')
    expect(wrapper.find('.wd-message-box__input-error').exists()).toBeFalsy()
  })

  test('beforeConfirm功能', async () => {
    const beforeConfirm = vi.fn(({ resolve }) => {
      resolve(true)
    })

    const wrapper = mount(WdMessageBox, {
      props: {
        beforeConfirm
      }
    })

    await wrapper.find('.wd-message-box__confirm').trigger('click')
    expect(beforeConfirm).toHaveBeenCalled()
  })

  test('自定义按钮属性', async () => {
    const wrapper = mount(WdMessageBox, {
      props: {
        showCancelButton: true,
        confirmButtonProps: {
          type: 'success',
          customClass: 'custom-confirm'
        },
        cancelButtonProps: {
          type: 'error',
          customClass: 'custom-cancel'
        }
      }
    })

    const confirmBtn = wrapper.find('.wd-message-box__confirm')
    const cancelBtn = wrapper.find('.wd-message-box__cancel')

    expect(confirmBtn.classes()).toContain('custom-confirm')
    expect(cancelBtn.classes()).toContain('custom-cancel')
    expect(confirmBtn.classes()).toContain('wd-button--success')
    expect(cancelBtn.classes()).toContain('wd-button--error')
  })

  test('插槽功能', async () => {
    const wrapper = mount(WdMessageBox, {
      slots: {
        default: '<div class="custom-slot-content">自定义内容</div>'
      }
    })

    expect(wrapper.find('.custom-slot-content').exists()).toBeTruthy()
    expect(wrapper.find('.custom-slot-content').text()).toBe('自定义内容')
  })

  test('selector属性', async () => {
    const wrapper = mount(WdMessageBox, {
      props: {
        selector: 'custom-selector'
      }
    })

    expect(wrapper.vm.selector).toBe('custom-selector')
  })
})
