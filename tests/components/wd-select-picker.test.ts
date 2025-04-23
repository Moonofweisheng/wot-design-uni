import { mount } from '@vue/test-utils'
import WdSelectPicker from '../../src/uni_modules/wot-design-uni/components/wd-select-picker/wd-select-picker.vue'
import { describe, expect, test } from 'vitest'

describe('WdSelectPicker', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSelectPicker)
    expect(wrapper.classes()).toContain('wd-select-picker')
  })

  test('选择功能', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
      { value: '3', label: '选项3' }
    ]
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: '',
        columns
      }
    })
    await wrapper.find('.wd-select-picker__value').trigger('click')
    expect(wrapper.emitted('open')).toBeTruthy()
  })

  test('自定义标题', async () => {
    const title = '请选择'
    const wrapper = mount(WdSelectPicker, {
      props: {
        title,
        modelValue: ''
      }
    })
    expect(wrapper.find('.wd-select-picker__title').text()).toBe(title)
  })

  test('确认事件', async () => {
    const columns = [{ value: '1', label: '选项1' }]
    const wrapper = mount(WdSelectPicker, {
      props: {
        modelValue: '',
        columns
      }
    })
    await wrapper.find('.wd-select-picker__confirm').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  test('取消事件', async () => {
    const wrapper = mount(WdSelectPicker)
    await wrapper.find('.wd-select-picker__cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        disabled: true,
        modelValue: ''
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('加载状态', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        loading: true,
        modelValue: ''
      }
    })
    expect(wrapper.find('.wd-select-picker__loading').exists()).toBeTruthy()
  })

  test('错误状态', async () => {
    const wrapper = mount(WdSelectPicker, {
      props: {
        error: true,
        modelValue: ''
      }
    })
    expect(wrapper.classes()).toContain('is-error')
  })

  test('自定义展示文案', async () => {
    const label = '自定义文案'
    const wrapper = mount(WdSelectPicker, {
      props: {
        label,
        modelValue: ''
      }
    })
    expect(wrapper.find('.wd-select-picker__label').text()).toBe(label)
  })
})
