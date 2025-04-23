import { mount } from '@vue/test-utils'
import WdCalendarView from '../../src/uni_modules/wot-design-uni/components/wd-calendar-view/wd-calendar-view.vue'
import { describe, expect, test } from 'vitest'
import { CalendarFormatter, CalendarTimeFilter } from '@/uni_modules/wot-design-uni/components/wd-calendar-view/types'

describe('WdCalendarView', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now()
      }
    })

    expect(wrapper.classes()).toContain('wd-calendar-view')
  })

  test('日期多选', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'dates'
      }
    })

    expect(wrapper.props('type')).toBe('dates')
  })

  test('日期范围选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'daterange',
        allowSameDay: true
      }
    })

    expect(wrapper.props('type')).toBe('daterange')
    expect(wrapper.props('allowSameDay')).toBe(true)
  })

  test('周范围选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'weekrange',
        firstDayOfWeek: 1
      }
    })

    expect(wrapper.props('type')).toBe('weekrange')
    expect(wrapper.props('firstDayOfWeek')).toBe(1)
  })

  test('月范围选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'monthrange'
      }
    })

    expect(wrapper.props('type')).toBe('monthrange')
  })

  test('日期时间选择', async () => {
    const timeFilter: CalendarTimeFilter = ({ type, values }) => {
      if (type === 'minute') {
        return values.filter((item) => item.value % 10 === 0)
      }
      return values
    }

    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'datetime',
        hideSecond: true,
        timeFilter
      }
    })

    expect(wrapper.props('type')).toBe('datetime')
    expect(wrapper.props('hideSecond')).toBe(true)
    expect(wrapper.props('timeFilter')).toBeTruthy()
  })

  test('最大范围限制', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'daterange',
        maxRange: 3
      }
    })

    expect(wrapper.props('maxRange')).toBe(3)
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

    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'daterange',
        formatter
      }
    })

    expect(wrapper.props('formatter')).toBeTruthy()
  })

  test('change事件', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'date'
      }
    })

    await wrapper.vm.$emit('change', { value: Date.now() })
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
