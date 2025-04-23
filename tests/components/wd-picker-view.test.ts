import { mount } from '@vue/test-utils'
import WdPickerView from '../../src/uni_modules/wot-design-uni/components/wd-picker-view/wd-picker-view.vue'
import { describe, expect, test } from 'vitest'

describe('WdPickerView', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdPickerView)
    expect(wrapper.classes()).toContain('wd-picker-view')
  })

  test('单列选项', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
      { value: '3', label: '选项3' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns
      }
    })
    const items = wrapper.findAll('.wd-picker-view__item')
    expect(items.length).toBe(3)
    expect(items[0].text()).toBe('选项1')
    expect(items[1].text()).toBe('选项2')
    expect(items[2].text()).toBe('选项3')
  })

  test('多列选项', async () => {
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
    const wrapper = mount(WdPickerView, {
      props: {
        columns
      }
    })
    const columnEls = wrapper.findAll('.wd-picker-view__column')
    expect(columnEls.length).toBe(2)
  })

  test('默认选中值', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        value: '2'
      }
    })
    const selectedItem = wrapper.find('.wd-picker-view__item--selected')
    expect(selectedItem.text()).toBe('选项2')
  })

  test('选项点击', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns
      }
    })
    const items = wrapper.findAll('.wd-picker-view__item')
    await items[1].trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  test('禁用选项', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2', disabled: true }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns
      }
    })
    const disabledItem = wrapper.find('.wd-picker-view__item--disabled')
    expect(disabledItem.exists()).toBeTruthy()
    expect(disabledItem.text()).toBe('选项2')
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdPickerView, {
      props: {
        customClass: 'custom-picker-view',
        customStyle: 'height: 200px;'
      }
    })
    expect(wrapper.classes()).toContain('custom-picker-view')
    expect(wrapper.attributes('style')).toBe('height: 200px;')
  })
})
