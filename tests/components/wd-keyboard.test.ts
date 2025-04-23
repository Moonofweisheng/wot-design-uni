import { mount } from '@vue/test-utils'
import WdKeyboard from '@/uni_modules/wot-design-uni/components/wd-keyboard/wd-keyboard.vue'
import { describe, expect, test } from 'vitest'

describe('WdKeyboard', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: false,
        modelValue: ''
      }
    })

    expect(wrapper.classes()).toContain('wd-keyboard')
  })

  test('自定义标题', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: false,
        modelValue: '',
        title: '自定义标题'
      }
    })

    expect(wrapper.find('.wd-keyboard__title').text()).toBe('自定义标题')
  })

  test('显示隐藏状态', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: false,
        modelValue: ''
      }
    })

    await wrapper.setProps({ visible: true })
    expect(wrapper.find('.wd-popup').classes()).toContain('wd-popup')

    await wrapper.setProps({ visible: false })
    expect(wrapper.find('.wd-popup').exists()).toBe(false)
  })

  test('按键点击事件', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: ''
      }
    })

    // 找到数字键1并点击
    const keys = wrapper.findAll('.wd-keyboard__keys .wd-key')
    const key1 = keys.find((key) => key.text().includes('1'))
    await key1?.trigger('click')

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')![0]).toEqual(['1'])
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['1'])
  })

  test('删除按键事件', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '123',
        showDeleteKey: true
      }
    })

    // 找到删除键并点击
    const deleteKey = wrapper.find('.wd-key--delete')
    await deleteKey.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['12'])
  })

  test('关闭事件', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        closeText: '完成',
        showClose: true
      }
    })

    // 找到关闭按钮并点击
    const closeButton = wrapper.find('.wd-keyboard__close')
    await closeButton.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('update:visible')).toBeTruthy()
    expect(wrapper.emitted('update:visible')![0]).toEqual([false])
  })

  test('最大长度限制', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '123',
        maxlength: 3
      }
    })

    // 找到数字键4并点击
    const keys = wrapper.findAll('.wd-keyboard__keys .wd-key')
    const key4 = keys.find((key) => key.text().includes('4'))
    await key4?.trigger('click')

    // 由于已达到最大长度，不应该触发更新
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  test('自定义模式', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        mode: 'custom',
        extraKey: ['X', 'Y']
      }
    })

    // 检查自定义模式下的布局
    expect(wrapper.find('.wd-keyboard__sidebar').exists()).toBe(true)

    // 检查额外按键
    const extraKeys = wrapper.findAll('.wd-key--extra')
    expect(extraKeys.length).toBe(2)
    expect(extraKeys[0].text()).toContain('X')
    expect(extraKeys[1].text()).toContain('Y')
  })

  test('车牌模式', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        mode: 'car'
      }
    })

    // 检查车牌模式下的布局
    expect(wrapper.find('.wd-keyboard-car__body').exists()).toBe(true)
  })

  test('随机键盘顺序', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        randomKeyOrder: true
      }
    })

    // 由于键盘顺序是随机的，我们只能检查键盘是否正确渲染
    const keys = wrapper.findAll('.wd-keyboard__keys .wd-key')
    expect(keys.length).toBeGreaterThan(0)
  })
})
