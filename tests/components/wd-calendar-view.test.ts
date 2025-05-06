import { mount } from '@vue/test-utils'
import WdCalendarView from '@/uni_modules/wot-design-uni/components/wd-calendar-view/wd-calendar-view.vue'
import monthPanel from '@/uni_modules/wot-design-uni/components/wd-calendar-view/monthPanel/month-panel.vue'
import yearPanel from '@/uni_modules/wot-design-uni/components/wd-calendar-view/yearPanel/year-panel.vue'
import year from '@/uni_modules/wot-design-uni/components/wd-calendar-view/year/year.vue'
import month from '@/uni_modules/wot-design-uni/components/wd-calendar-view/month/month.vue'

import { describe, expect, test, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { CalendarFormatter, CalendarTimeFilter } from '@/uni_modules/wot-design-uni/components/wd-calendar-view/types'

describe('WdCalendarView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('基本渲染', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now()
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('wd-calendar-view')
    expect(wrapper.findComponent(monthPanel).exists()).toBe(true)
  })

  test('日期多选', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'dates'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('dates')
    expect(wrapper.findComponent(monthPanel).exists()).toBe(true)
  })

  test('日期范围选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'daterange',
        allowSameDay: true
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('daterange')
    expect(wrapper.props('allowSameDay')).toBe(true)
    expect(wrapper.findComponent(monthPanel).exists()).toBe(true)
  })

  test('周范围选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'weekrange',
        firstDayOfWeek: 1
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('weekrange')
    expect(wrapper.props('firstDayOfWeek')).toBe(1)
    expect(wrapper.findComponent(monthPanel).exists()).toBe(true)
  })

  test('月范围选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'monthrange'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('monthrange')
    expect(wrapper.findComponent(yearPanel).exists()).toBe(true)
  })

  test('月选择', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'month'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('month')
    expect(wrapper.findComponent(yearPanel).exists()).toBe(true)
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
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('datetime')
    expect(wrapper.props('hideSecond')).toBe(true)
    expect(wrapper.props('timeFilter')).toBeTruthy()
    expect(wrapper.findComponent(monthPanel).exists()).toBe(true)
  })

  test('最大范围限制', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'daterange',
        maxRange: 3
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

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
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('formatter')).toBeTruthy()
  })

  test('change事件', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'date'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    const monthPanelWrapper = wrapper.findComponent(monthPanel)

    monthPanelWrapper.vm.$emit('change', { value: Date.now() + 86400000 })

    // 验证事件被触发
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  test('pickstart 和 pickend 事件', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: [],
        type: 'daterange'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    const monthPanelWrapper = wrapper.findComponent(monthPanel)

    // 模拟月面板的 pickstart 事件
    monthPanelWrapper.vm.$emit('pickstart')

    // 验证 pickstart 事件被触发
    expect(wrapper.emitted('pickstart')).toBeTruthy()

    // 模拟月面板的 pickend 事件
    monthPanelWrapper.vm.$emit('pickend')

    // 验证 pickend 事件被触发
    expect(wrapper.emitted('pickend')).toBeTruthy()
  })

  test('scrollIntoView 方法', async () => {
    // 测试月类型
    const monthWrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'month'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    // 调用 scrollIntoView 方法
    monthWrapper.vm.scrollIntoView()

    // 测试日期类型
    const dateWrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'date'
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    // 调用 scrollIntoView 方法
    dateWrapper.vm.scrollIntoView()
  })

  test('immediateChange 属性', async () => {
    const wrapper = mount(WdCalendarView, {
      props: {
        modelValue: Date.now(),
        type: 'date',
        immediateChange: true
      },
      global: {
        components: {
          monthPanel,
          yearPanel,
          year,
          month
        }
      }
    })

    await nextTick()

    expect(wrapper.props('immediateChange')).toBe(true)
  })
})
