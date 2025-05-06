import { mount } from '@vue/test-utils'
import '../mocks/wd-transition.mock'
import WdNumberKeyboard from '@/uni_modules/wot-design-uni/components/wd-number-keyboard/wd-number-keyboard.vue'
import { describe, expect, test } from 'vitest'

describe('WdNumberKeyboard', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        modelValue: ''
      }
    })
    expect(wrapper.find('.wd-number-keyboard').exists()).toBe(true)
  })

  test('显示状态', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        modelValue: ''
      }
    })

    // 检查 wd-popup 的 modelValue 属性
    expect(wrapper.findComponent({ name: 'wd-popup' }).props('modelValue')).toBe(true)

    await wrapper.setProps({ visible: false })
    expect(wrapper.findComponent({ name: 'wd-popup' }).props('modelValue')).toBe(false)
  })

  test('按键点击', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        modelValue: ''
      }
    })

    // 模拟按键点击
    const key = wrapper.findComponent({ name: 'wd-key' })
    await key.vm.$emit('press', '1', '')

    // 检查是否触发了input事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['input']).toBeTruthy()
    expect(emitted['input'][0]).toEqual(['1'])
  })

  test('删除按键', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        showDeleteKey: true,
        modelValue: '123'
      }
    })

    // 找到删除键并模拟点击
    const keys = wrapper.findAllComponents({ name: 'wd-key' })
    const deleteKey = keys.find((key) => key.props('type') === 'delete')
    expect(deleteKey).toBeDefined()

    await deleteKey?.vm.$emit('press', '', 'delete')

    // 检查是否触发了delete事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['delete']).toBeTruthy()
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0]).toEqual(['12'])
  })

  test('关闭按钮', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        closeText: '关闭',
        modelValue: ''
      }
    })

    // 找到关闭按钮
    const closeButton = wrapper.find('.wd-number-keyboard__close')
    expect(closeButton.exists()).toBe(true)

    // 模拟点击关闭按钮
    await closeButton.trigger('click')

    // 检查是否触发了close事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['close']).toBeTruthy()
    expect(emitted['update:visible']).toBeTruthy()
    expect(emitted['update:visible'][0]).toEqual([false])
  })

  test('标题显示', async () => {
    const title = '数字键盘'
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        title,
        modelValue: ''
      }
    })

    // 检查标题是否正确显示
    const titleElement = wrapper.find('.wd-number-keyboard__title')
    expect(titleElement.exists()).toBe(true)
    expect(titleElement.text()).toBe(title)
  })

  test('键盘模式 - default', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        mode: 'default',
        modelValue: ''
      }
    })

    // 检查是否没有侧边栏
    expect(wrapper.find('.wd-number-keyboard__sidebar').exists()).toBe(false)

    // 检查键盘按键数量
    const keys = wrapper.findAllComponents({ name: 'wd-key' })
    expect(keys.length).toBe(12) // 9个数字键 + 额外键 + 0 + 删除键
  })

  test('键盘模式 - custom', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        mode: 'custom',
        modelValue: ''
      }
    })

    // 检查是否有侧边栏
    expect(wrapper.find('.wd-number-keyboard__sidebar').exists()).toBe(true)
  })

  test('随机键盘顺序', async () => {
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        randomKeyOrder: true,
        modelValue: ''
      }
    })

    // 由于键盘顺序是随机的，我们只能检查键盘是否正确渲染
    const keys = wrapper.findAllComponents({ name: 'wd-key' })
    expect(keys.length).toBe(12)
  })

  test('额外按键 - 单个', async () => {
    const extraKey = '.'
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        extraKey,
        modelValue: ''
      }
    })

    // 找到额外按键
    const keys = wrapper.findAllComponents({ name: 'wd-key' })
    const extraKeyElement = keys.find((key) => key.props('text') === extraKey && key.props('type') === 'extra')
    expect(extraKeyElement).toBeDefined()
  })

  test('额外按键 - 多个', async () => {
    const extraKeys = ['00', '.']
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        mode: 'custom',
        extraKey: extraKeys,
        modelValue: ''
      }
    })

    // 在custom模式下，额外按键会被添加到键盘中
    const keys = wrapper.findAllComponents({ name: 'wd-key' })
    const extraKeyElements = keys.filter((key) => extraKeys.includes(key.props('text') as string) && key.props('type') === 'extra')
    expect(extraKeyElements.length).toBe(extraKeys.length)
  })

  test('最大长度限制', async () => {
    const maxlength = 3
    const wrapper = mount(WdNumberKeyboard, {
      props: {
        visible: true,
        maxlength,
        modelValue: '12'
      }
    })

    // 模拟按键点击
    const key = wrapper.findComponent({ name: 'wd-key' })
    await key.vm.$emit('press', '1', '')

    // 检查是否触发了input事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['input']).toBeTruthy()
    expect(emitted['input'][0]).toEqual(['1'])

    // 检查是否触发了update:modelValue事件，并且值为'121'
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0]).toEqual(['121'])

    // 设置modelValue为最大长度
    await wrapper.setProps({ modelValue: '123' })

    // 再次点击，由于已达到最大长度，不应该再触发input事件
    await key.vm.$emit('press', '1', '')

    // 检查事件数量是否没有增加
    expect(emitted['input'].length).toBe(1) // 仍然只有一次input事件
    expect(emitted['update:modelValue'].length).toBe(1) // 仍然只有一次update:modelValue事件
  })
})
