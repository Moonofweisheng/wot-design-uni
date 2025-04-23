import { mount } from '@vue/test-utils'
import WdDatetimePickerView from '../../src/uni_modules/wot-design-uni/components/wd-datetime-picker-view/wd-datetime-picker-view.vue'
import { describe, expect, test } from 'vitest'
import { DatetimePickerViewFilter, DatetimePickerViewFormatter } from '@/uni_modules/wot-design-uni/components/wd-datetime-picker-view/types'

describe('WdDatetimePickerView', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'datetime'
      }
    })

    expect(wrapper.classes()).toContain('wd-datetime-picker-view')
  })

  test('年月日选择', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'date'
      }
    })

    expect(wrapper.props('type')).toBe('date')
  })

  test('年月选择', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'year-month'
      }
    })

    expect(wrapper.props('type')).toBe('year-month')
  })

  test('时间选择', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'time'
      }
    })

    expect(wrapper.props('type')).toBe('time')
  })

  test('自定义过滤选项', async () => {
    const filter: DatetimePickerViewFilter = (type, values) => {
      if (type === 'minute') {
        return values.filter((value) => value % 10 === 0)
      }
      return values
    }

    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'time',
        filter
      }
    })

    expect(wrapper.props('filter')).toBeTruthy()
  })

  test('自定义格式化', async () => {
    const formatter: DatetimePickerViewFormatter = (type, value) => {
      if (type === 'year') {
        return value + '年'
      }
      if (type === 'month') {
        return value + '月'
      }
      return value
    }

    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'date',
        formatter
      }
    })

    expect(wrapper.props('formatter')).toBeTruthy()
  })

  test('change事件', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'datetime'
      }
    })

    await wrapper.vm.$emit('change', { value: Date.now() })
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
