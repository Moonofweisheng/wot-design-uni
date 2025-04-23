import { mount } from '@vue/test-utils'
import WdPicker from '../../src/uni_modules/wot-design-uni/components/wd-picker/wd-picker.vue'
import { describe, expect, test } from 'vitest'

describe('WdPicker', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdPicker)
    expect(wrapper.classes()).toContain('wd-picker')
  })

  test('选项列表', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
      { value: '3', label: '选项3' }
    ]
    const wrapper = mount(WdPicker, {
      props: {
        columns
      }
    })
    const options = wrapper.findAll('.wd-picker__item')
    expect(options.length).toBe(3)
    expect(options[0].text()).toBe('选项1')
    expect(options[1].text()).toBe('选项2')
    expect(options[2].text()).toBe('选项3')
  })

  test('默认值', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPicker, {
      props: {
        columns,
        value: '2'
      }
    })
    expect(wrapper.find('.wd-picker__value').text()).toBe('选项2')
  })

  test('标题显示', async () => {
    const title = '请选择'
    const wrapper = mount(WdPicker, {
      props: {
        title
      }
    })
    expect(wrapper.find('.wd-picker__title').text()).toBe(title)
  })

  test('确认取消按钮', async () => {
    const wrapper = mount(WdPicker)
    await wrapper.find('.wd-picker__confirm').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
    await wrapper.find('.wd-picker__cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdPicker, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('多列选择', async () => {
    const columns = [
      [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' }
      ],
      [
        { value: 'a', label: '选项A' },
        { value: 'b', label: '选项B' }
      ]
    ]
    const wrapper = mount(WdPicker, {
      props: {
        columns
      }
    })
    const columnEls = wrapper.findAll('.wd-picker__column')
    expect(columnEls.length).toBe(2)
  })

  test('选项改变事件', async () => {
    const wrapper = mount(WdPicker)
    await wrapper.find('.wd-picker__item').trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
