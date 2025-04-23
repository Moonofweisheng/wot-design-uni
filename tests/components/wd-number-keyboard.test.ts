import { mount } from '@vue/test-utils'
import WdNumberKeyboard from '../../src/uni_modules/wot-design-uni/components/wd-number-keyboard/wd-number-keyboard.vue'
import { describe, expect, test } from 'vitest'

describe('WdNumberKeyboard', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdNumberKeyboard)
    expect(wrapper.classes()).toContain('wd-number-keyboard')
  })

  test('显示状态', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true
      }
    })
    expect(wrapper.isVisible()).toBeTruthy()
    await wrapper.setProps({ visible: false })
    expect(wrapper.isVisible()).toBeFalsy()
  })

  test('按键点击', async () => {
    const wrapper = mount(WdNumberKeyboard)
    const keys = wrapper.findAll('.wd-number-keyboard__keys .wd-key')
    await keys[0].trigger('click')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')![0]).toEqual(['1'])
  })

  test('删除按键', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        showDeleteKey: true
      }
    })
    const deleteKey = wrapper.find('.wd-key--delete')
    expect(deleteKey.exists()).toBeTruthy()
    await deleteKey.trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })

  test('关闭按钮', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        closeText: '关闭'
      }
    })
    const closeButton = wrapper.find('.wd-number-keyboard__close')
    expect(closeButton.exists()).toBeTruthy()
    await closeButton.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('update:visible')).toBeTruthy()
    expect(wrapper.emitted('update:visible')![0]).toEqual([false])
  })

  test('标题显示', async () => {
    const title = '数字键盘'
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        title
      }
    })
    expect(wrapper.find('.wd-number-keyboard__title').text()).toBe(title)
  })

  test('键盘模式 - default', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        mode: 'default'
      }
    })
    expect(wrapper.find('.wd-number-keyboard__sidebar').exists()).toBeFalsy()
    const keys = wrapper.findAll('.wd-number-keyboard__keys .wd-key')
    expect(keys.length).toBe(12) // 9个数字键 + 额外键 + 0 + 删除键
  })

  test('键盘模式 - custom', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        mode: 'custom'
      }
    })
    expect(wrapper.find('.wd-number-keyboard__sidebar').exists()).toBeTruthy()
  })

  test('随机键盘顺序', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        randomKeyOrder: true
      }
    })
    // 由于键盘顺序是随机的，我们只能检查键盘是否正确渲染
    const keys = wrapper.findAll('.wd-number-keyboard__keys .wd-key')
    expect(keys.length).toBe(12)
  })

  test('额外按键 - 单个', async () => {
    const extraKey = '.'
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        extraKey
      }
    })
    const keys = wrapper.findAll('.wd-number-keyboard__keys .wd-key')
    const extraKeyElement = keys.find((key) => key.text() === extraKey)
    expect(extraKeyElement).toBeTruthy()
  })

  test('额外按键 - 多个', async () => {
    const extraKeys = ['00', '.']
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        mode: 'custom',
        extraKey: extraKeys
      }
    })
    // 在custom模式下，额外按键会被添加到键盘中
    const keys = wrapper.findAll('.wd-number-keyboard__keys .wd-key')
    const extraKeyElements = keys.filter((key) => extraKeys.includes(key.text()))
    expect(extraKeyElements.length).toBe(extraKeys.length)
  })

  test('最大长度限制', async () => {
    const maxlength = 3
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        maxlength,
        modelValue: '12'
      }
    })

    // 模拟按键点击
    const keys = wrapper.findAll('.wd-number-keyboard__keys .wd-key')
    await keys[0].trigger('click') // 点击数字1

    // 检查是否触发了input事件
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')![0]).toEqual(['1'])

    // 检查是否触发了update:modelValue事件，并且值为'121'
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['121'])

    // 设置modelValue为最大长度
    await wrapper.setProps({ modelValue: '123' })

    // 再次点击，由于已达到最大长度，不应该再触发input事件
    await keys[0].trigger('click')
    expect(wrapper.emitted('input')?.length).toBe(1) // 仍然只有一次input事件
    expect(wrapper.emitted('update:modelValue')?.length).toBe(1) // 仍然只有一次update:modelValue事件
  })
})
