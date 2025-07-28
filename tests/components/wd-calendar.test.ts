import { mount } from '@vue/test-utils'
import '../mocks/wd-transition.mock'
import WdCalendar from '@/uni_modules/wot-design-uni/components/wd-calendar/wd-calendar.vue'
import WdActionSheet from '@/uni_modules/wot-design-uni/components/wd-action-sheet/wd-action-sheet.vue'
import WdCalendarView from '@/uni_modules/wot-design-uni/components/wd-calendar-view/wd-calendar-view.vue'
import WdButton from '@/uni_modules/wot-design-uni/components/wd-button/wd-button.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import WdTag from '@/uni_modules/wot-design-uni/components/wd-tag/wd-tag.vue'
import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { type CalendarFormatter } from '@/uni_modules/wot-design-uni/components/wd-calendar-view/types'
import { pause } from '@/uni_modules/wot-design-uni/components/common/util'
import WdTabs from '@/uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.vue'
import WdTab from '@/uni_modules/wot-design-uni/components/wd-tab/wd-tab.vue'

describe('WdCalendar', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        label: '日期选择'
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()
    expect(wrapper.classes()).toContain('wd-calendar')
    // Calendar组件使用wd-cell，所以应该查找cell的title
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('title')).toBe('日期选择')
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        disabled: true
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-calendar__cell').classes()).toContain('is-disabled')
  })

  test('只读状态', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        readonly: true
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-calendar__cell').classes()).toContain('is-readonly')
  })

  test('日期范围选择', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: [],
        type: 'daterange'
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('daterange')
  })

  test('周选择', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        type: 'week',
        firstDayOfWeek: 1
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('week')
    expect(wrapper.props('firstDayOfWeek')).toBe(1)
  })

  test('月选择', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        type: 'month'
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('month')
  })

  test('日期时间选择', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        type: 'datetime'
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    expect(wrapper.props('type')).toBe('datetime')
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
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    // 打开日历
    wrapper.vm.open()
    await nextTick()

    expect(wrapper.findAll('.wd-calendar__tag').length).toBe(2)
    expect(wrapper.findAll('.wd-calendar__tag')[0].text()).toBe('最近7天')
    expect(wrapper.findAll('.wd-calendar__tag')[1].text()).toBe('最近15天')
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
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    expect(wrapper.props('formatter')).toBeTruthy()
  })

  test('不使用内置单元格', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        withCell: false
      },

      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()
    expect(wrapper.find('.wd-calendar__cell').exists()).toBe(false)
  })

  test('open 和 close 方法', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now()
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    // 初始状态下 ActionSheet 不显示
    expect(wrapper.findComponent(WdActionSheet).props('modelValue')).toBe(false)

    // 调用 open 方法
    wrapper.vm.open()
    await pause()

    // ActionSheet 显示
    expect(wrapper.findComponent(WdActionSheet).props('modelValue')).toBe(true)
    expect(wrapper.emitted('open')).toBeTruthy()

    // 调用 close 方法
    wrapper.vm.close()
    await nextTick()

    // ActionSheet 隐藏
    expect(wrapper.findComponent(WdActionSheet).props('modelValue')).toBe(false)
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  test('快捷选项点击回调', async () => {
    const shortcuts = [
      {
        text: '最近7天',
        id: 7
      }
    ]

    const onShortcutsClick = vi.fn().mockImplementation((_params: { item: any; index: number }) => {
      const now = Date.now()
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
      return [sevenDaysAgo, now]
    })

    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: [],
        type: 'daterange',
        shortcuts,
        onShortcutsClick,
        showConfirm: false
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    // 打开日历
    wrapper.vm.open()
    await nextTick()

    // 点击快捷选项
    await wrapper.find('.wd-calendar__tag').trigger('click')

    // 验证回调被调用
    expect(onShortcutsClick).toHaveBeenCalledWith({
      item: shortcuts[0],
      index: 0
    })

    // 验证 update:modelValue 事件被触发
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  test('beforeConfirm 回调', async () => {
    const beforeConfirm = vi.fn().mockImplementation((params: { value: any; resolve: (result: boolean) => void }) => {
      // 模拟异步验证
      setTimeout(() => {
        params.resolve(true)
      }, 0)
    })

    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        beforeConfirm
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    // 打开日历
    wrapper.vm.open()
    await nextTick()

    // 点击确认按钮
    await wrapper.findComponent(WdButton).trigger('click')

    // 验证 beforeConfirm 被调用
    expect(beforeConfirm).toHaveBeenCalled()
    expect(beforeConfirm.mock.calls[0][0]).toHaveProperty('value')
    expect(beforeConfirm.mock.calls[0][0]).toHaveProperty('resolve')

    // 等待异步操作完成
    await new Promise((resolve) => setTimeout(resolve, 10))

    // 验证事件被触发
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  test('日历视图变化事件', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        showConfirm: false
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    // 打开日历
    wrapper.vm.open()
    await nextTick()

    // 模拟日历视图变化
    wrapper.findComponent(WdCalendarView).vm.$emit('change', { value: Date.now() + 86400000 })
    await nextTick()

    // 验证事件被触发
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  test('自定义显示格式', async () => {
    const displayFormat = vi.fn().mockImplementation((_value: any, _type: string) => {
      return '自定义日期格式'
    })

    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        displayFormat
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    // 检查cell组件的value属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('value')).toBe('自定义日期格式')
    expect(displayFormat).toHaveBeenCalled()
  })

  test('自定义内部显示格式', async () => {
    const innerDisplayFormat = vi.fn().mockImplementation((_value: any, rangeType: string, _type: string) => {
      return rangeType === 'start' ? '开始日期' : '结束日期'
    })

    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: [Date.now(), Date.now() + 86400000],
        type: 'daterange',
        innerDisplayFormat
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()

    // 打开日历
    wrapper.vm.open()
    await nextTick()

    expect(innerDisplayFormat).toHaveBeenCalled()
  })

  test('表单验证相关属性', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        prop: 'date',
        label: '日期选择',
        required: true,
        rules: [{ required: true, message: '请选择日期' }]
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })
    await nextTick()
    // 检查cell组件的required属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('required')).toBe(true)
  })

  test('clearable 属性', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        clearable: true
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })
    await nextTick()

    expect(wrapper.props('clearable')).toBe(true)
  })

  test('clearable 清空功能', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        clearable: true
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })
    await nextTick()

    const vm = wrapper.vm as any

    // 调用清空方法
    vm.handleClear()
    await nextTick()

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['clear']).toBeTruthy()
    expect(emitted['update:modelValue']).toBeTruthy()
  })

  // 测试 markerSide 属性
  test('markerSide 属性 - before', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        label: '日期选择',
        required: true,
        markerSide: 'before'
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()
    expect(wrapper.props('markerSide')).toBe('before')
    // 检查传递给 wd-cell 的 markerSide 属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('markerSide')).toBe('before')
  })

  test('markerSide 属性 - after', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        label: '日期选择',
        required: true,
        markerSide: 'after'
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()
    expect(wrapper.props('markerSide')).toBe('after')
    // 检查传递给 wd-cell 的 markerSide 属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('markerSide')).toBe('after')
  })

  test('markerSide 默认值', async () => {
    const wrapper = mount(WdCalendar, {
      props: {
        modelValue: Date.now(),
        label: '日期选择',
        required: true
      },
      global: {
        components: {
          WdActionSheet,
          WdCalendarView,
          WdButton,
          WdIcon,
          WdTag,
          WdTabs,
          WdTab
        }
      }
    })

    await nextTick()
    // 默认值应该是 'before'
    expect(wrapper.props('markerSide')).toBe('before')
    // 检查传递给 wd-cell 的 markerSide 属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('markerSide')).toBe('before')
  })
})
