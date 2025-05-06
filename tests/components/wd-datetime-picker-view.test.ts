import { mount } from '@vue/test-utils'
import WdDatetimePickerView from '@/uni_modules/wot-design-uni/components/wd-datetime-picker-view/wd-datetime-picker-view.vue'
import { describe, expect, test, vi } from 'vitest'
import { DatetimePickerViewFilter, DatetimePickerViewFormatter } from '@/uni_modules/wot-design-uni/components/wd-datetime-picker-view/types'
import { nextTick } from 'vue'

describe('WdDatetimePickerView 日期时间选择器视图', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'datetime'
      }
    })

    // 检查是否渲染了 wd-picker-view 组件
    expect(wrapper.findComponent({ name: 'wd-picker-view' }).exists()).toBe(true)
  })

  test('年月日时分选择（datetime类型）', async () => {
    const now = Date.now()
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: now,
        type: 'datetime'
      }
    })

    expect(wrapper.props('type')).toBe('datetime')
    expect(wrapper.props('modelValue')).toBe(now)
  })

  test('年月日选择（date类型）', async () => {
    const now = Date.now()
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: now,
        type: 'date'
      }
    })

    expect(wrapper.props('type')).toBe('date')
    expect(wrapper.props('modelValue')).toBe(now)
  })

  test('年月选择（year-month类型）', async () => {
    const now = Date.now()
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: now,
        type: 'year-month'
      }
    })

    expect(wrapper.props('type')).toBe('year-month')
    expect(wrapper.props('modelValue')).toBe(now)
  })

  test('年份选择（year类型）', async () => {
    const now = Date.now()
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: now,
        type: 'year'
      }
    })

    expect(wrapper.props('type')).toBe('year')
    expect(wrapper.props('modelValue')).toBe(now)
  })

  test('时间选择（time类型）', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: '12:30',
        type: 'time'
      }
    })

    expect(wrapper.props('type')).toBe('time')
    expect(wrapper.props('modelValue')).toBe('12:30')
  })

  test('加载状态', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'datetime',
        loading: true,
        loadingColor: '#ff0000'
      }
    })

    expect(wrapper.props('loading')).toBe(true)
    expect(wrapper.props('loadingColor')).toBe('#ff0000')

    // 检查是否传递给了 wd-picker-view 组件
    const pickerView = wrapper.findComponent({ name: 'wd-picker-view' })
    expect(pickerView.props('loading')).toBe(true)
    expect(pickerView.props('loadingColor')).toBe('#ff0000')
  })

  test('自定义列高度', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'datetime',
        columnsHeight: 300
      }
    })

    expect(wrapper.props('columnsHeight')).toBe(300)

    // 检查是否传递给了 wd-picker-view 组件
    const pickerView = wrapper.findComponent({ name: 'wd-picker-view' })
    expect(pickerView.props('columnsHeight')).toBe(300)
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
    expect(wrapper.props('filter')).toBe(filter)
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
    expect(wrapper.props('formatter')).toBe(formatter)
  })

  test('设置日期范围', async () => {
    const minDate = new Date(2020, 0, 1).getTime() // 2020-01-01
    const maxDate = new Date(2025, 11, 31).getTime() // 2025-12-31

    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: new Date(2022, 5, 15).getTime(), // 2022-06-15
        type: 'date',
        minDate,
        maxDate
      }
    })

    expect(wrapper.props('minDate')).toBe(minDate)
    expect(wrapper.props('maxDate')).toBe(maxDate)
  })

  test('设置时间范围', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: '12:30',
        type: 'time',
        minHour: 9,
        maxHour: 18,
        minMinute: 0,
        maxMinute: 45
      }
    })

    expect(wrapper.props('minHour')).toBe(9)
    expect(wrapper.props('maxHour')).toBe(18)
    expect(wrapper.props('minMinute')).toBe(0)
    expect(wrapper.props('maxMinute')).toBe(45)
  })

  test('immediateChange 属性', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'datetime',
        immediateChange: true
      }
    })

    expect(wrapper.props('immediateChange')).toBe(true)

    // 检查是否传递给了 wd-picker-view 组件
    const pickerView = wrapper.findComponent({ name: 'wd-picker-view' })
    expect(pickerView.props('immediateChange')).toBe(true)
  })

  test('change 事件', async () => {
    const onChange = vi.fn()
    const now = Date.now()

    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: now,
        type: 'datetime',
        onChange
      }
    })

    // 模拟 wd-picker-view 组件触发 change 事件
    wrapper.findComponent({ name: 'wd-picker-view' }).vm.$emit('change', { value: [2022, 6, 15, 12, 30] })
    await nextTick()

    // 检查是否触发了 update:modelValue 事件
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()

    // 检查是否触发了 change 事件
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  test('pickstart 和 pickend 事件', async () => {
    const onPickStart = vi.fn()
    const onPickEnd = vi.fn()

    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'datetime',
        onPickstart: onPickStart,
        onPickend: onPickEnd
      }
    })

    // 模拟 wd-picker-view 组件触发 pickstart 事件
    wrapper.findComponent({ name: 'wd-picker-view' }).vm.$emit('pickstart')
    await nextTick()

    // 检查是否触发了 pickstart 事件
    expect(wrapper.emitted('pickstart')).toBeTruthy()

    // 模拟 wd-picker-view 组件触发 pickend 事件
    wrapper.findComponent({ name: 'wd-picker-view' }).vm.$emit('pickend')
    await nextTick()

    // 检查是否触发了 pickend 事件
    expect(wrapper.emitted('pickend')).toBeTruthy()
  })

  test('自定义类名和样式', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'datetime',
        customClass: 'custom-class',
        customStyle: 'color: red;'
      }
    })

    expect(wrapper.props('customClass')).toBe('custom-class')
    expect(wrapper.props('customStyle')).toBe('color: red;')

    // 检查是否传递给了 wd-picker-view 组件
    const pickerView = wrapper.findComponent({ name: 'wd-picker-view' })
    expect(pickerView.props('customClass')).toBe('custom-class')
    expect(pickerView.props('customStyle')).toBe('color: red;')
  })

  test('更新 modelValue', async () => {
    const now = Date.now()
    const newDate = new Date(2023, 5, 15).getTime() // 2023-06-15

    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: now,
        type: 'date'
      }
    })

    expect(wrapper.props('modelValue')).toBe(now)

    // 更新 modelValue
    await wrapper.setProps({ modelValue: newDate })

    expect(wrapper.props('modelValue')).toBe(newDate)
  })

  test('更新 type', async () => {
    const wrapper = mount(WdDatetimePickerView, {
      props: {
        modelValue: Date.now(),
        type: 'date'
      }
    })

    expect(wrapper.props('type')).toBe('date')

    // 更新 type
    await wrapper.setProps({ type: 'year-month' })

    expect(wrapper.props('type')).toBe('year-month')
  })
})
