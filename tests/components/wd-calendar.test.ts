import { mount } from '@vue/test-utils'
import WdCalendar from '../../src/uni_modules/wot-design-uni/components/wd-calendar/wd-calendar.vue'
import { describe, expect, test } from 'vitest'
import { CalendarFormatter } from '@/uni_modules/wot-design-uni/components/wd-calendar-view/types'

describe('WdCalendar', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        label: '日期选择'
      }
    })

    expect(wrapper.classes()).toContain('wd-calendar')
    expect(wrapper.find('.wd-calendar__label').text()).toBe('日期选择')
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        disabled: true
      }
    })

    expect(wrapper.find('.wd-calendar__cell').classes()).toContain('is-disabled')
  })

  test('只读状态', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        readonly: true
      }
    })

    expect(wrapper.find('.wd-calendar__cell').classes()).toContain('is-readonly')
  })

  test('日期范围选择', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: [],
        type: 'daterange'
      }
    })

    expect(wrapper.vm.type).toBe('daterange')
  })

  test('周选择', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        type: 'week',
        firstDayOfWeek: 1
      }
    })

    expect(wrapper.vm.type).toBe('week')
  })

  test('月选择', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        type: 'month'
      }
    })

    expect(wrapper.vm.type).toBe('month')
  })

  test('日期时间选择', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        type: 'datetime'
      }
    })

    expect(wrapper.vm.type).toBe('datetime')
  })

  test('快捷选项', async () => {
    const shortcuts = [
      {
        text: '最近7天',
        id: 7
      },
      {
        text: '最近15天',
        id: 15
      }
    ]
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: [],
        type: 'daterange',
        shortcuts
      }
    })

    expect(wrapper.findAll('.wd-calendar__tag').length).toBe(2)
  })

  test('自定义格式化', async () => {
    const formatter: CalendarFormatter = (day) => {
      if (day.type === 'start') {
        day.bottomInfo = '开始'
      }
      if (day.type === 'end') {
        day.bottomInfo = '结束'
      }
      return day
    }

    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: [],
        type: 'daterange',
        formatter
      }
    })

    expect(wrapper.props('formatter')).toBeTruthy()
  })
})
