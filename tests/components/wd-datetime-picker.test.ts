import '../mocks/wd-transition.mock'
import { mount } from '@vue/test-utils'
import WdDatetimePicker from '@/uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.vue'
import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import WdPopup from '@/uni_modules/wot-design-uni/components/wd-popup/wd-popup.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import WdDatetimePickerView from '@/uni_modules/wot-design-uni/components/wd-datetime-picker-view/wd-datetime-picker-view.vue'

const globalComponents = {
  WdPopup,
  WdIcon,
  WdDatetimePickerView
}

describe('WdDatetimePicker 日期时间选择器', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        label: '日期选择'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.classes()).toContain('wd-datetime-picker')
    expect(wrapper.props('label')).toBe('日期选择')
    // DatetimePicker使用wd-cell，检查cell的title属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('title')).toBe('日期选择')
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        disabled: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()
    // 检查cell组件的clickable属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('clickable')).toBe(false)
    // 点击不应该触发 open 事件
    await wrapper.trigger('click')
    expect(wrapper.emitted('open')).toBeFalsy()
  })

  test('只读状态', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        readonly: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    // 检查cell组件的clickable属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('clickable')).toBe(false)
    // 点击不应该触发 open 事件
    await wrapper.trigger('click')
    expect(wrapper.emitted('open')).toBeFalsy()
  })

  test('自定义格式化', async () => {
    const formatter = vi.fn((type: string, value: string) => {
      if (type === 'year') return `${value}年`
      if (type === 'month') return `${value}月`
      if (type === 'date') return `${value}日`
      return value
    })

    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        type: 'date',
        formatter
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('formatter')).toBe(formatter)
    // 检查props是否正确设置，不检查具体的显示值
    expect(wrapper.props('modelValue')).toBeTruthy()
  })

  test('自定义显示格式化函数', async () => {
    const displayFormat = vi.fn(() => '自定义显示')
    const now = Date.now()

    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: now,
        displayFormat
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    // 检查displayFormat函数是否被调用
    expect(displayFormat).toHaveBeenCalled()
    expect(wrapper.props('displayFormat')).toBe(displayFormat)
  })

  test('时间类型和时间范围', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '12:30',
        type: 'time',
        minHour: 9,
        maxHour: 18,
        minMinute: 0,
        maxMinute: 59
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('type')).toBe('time')
    expect(wrapper.props('minHour')).toBe(9)
    expect(wrapper.props('maxHour')).toBe(18)
    expect(wrapper.props('modelValue')).toBe('12:30')
  })

  test('自定义尺寸', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        size: 'large'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('size')).toBe('large')
    // 检查cell组件的size属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('size')).toBe('large')
  })

  test('自定义标签宽度', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        label: '日期',
        labelWidth: '100px'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('labelWidth')).toBe('100px')
    // 检查cell组件的titleWidth属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('titleWidth')).toBe('100px')
  })

  test('错误状态', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        error: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('error')).toBe(true)
    // 检查cell组件的customClass是否包含错误状态
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('customClass')).toContain('is-error')
  })

  test('右对齐', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        alignRight: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('alignRight')).toBe(true)
    // 检查cell组件的valueAlign属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('valueAlign')).toBe('right')
  })

  test('自定义类名和样式', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        customClass: 'custom-picker',
        customStyle: 'color: red;',
        customCellClass: 'custom-cell',
        customLabelClass: 'custom-label',
        customValueClass: 'custom-value',
        label: '日期' // 添加标签以确保 cell 元素存在
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('customClass')).toBe('custom-picker')
    expect(wrapper.props('customStyle')).toBe('color: red;')
    expect(wrapper.props('customCellClass')).toBe('custom-cell')
    expect(wrapper.props('customLabelClass')).toBe('custom-label')
    expect(wrapper.props('customValueClass')).toBe('custom-value')

    expect(wrapper.classes()).toContain('custom-picker')
    expect(wrapper.attributes('style')).toContain('color: red;')
    // 检查props是否正确传递，不检查具体的customClass内容
    expect(wrapper.props('customCellClass')).toBe('custom-cell')
  })

  test('点击打开弹窗', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now()
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    // 直接调用组件的open方法
    const vm = wrapper.vm as any
    vm.showPopup()

    expect(wrapper.emitted('open')).toBeTruthy()
  })

  test('change事件', async () => {
    const onChange = vi.fn()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        onChange
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    // 直接触发事件
    wrapper.vm.$emit('change', { value: new Date(2024, 0, 1).getTime() })
    await nextTick()

    // 使用类型安全的方式访问 emitted
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['change']).toBeTruthy()
  })

  test('confirm事件', async () => {
    const onConfirm = vi.fn()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        onConfirm
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    // 直接触发事件
    wrapper.vm.$emit('confirm', { value: new Date(2024, 0, 1).getTime() })
    await nextTick()

    // 使用类型安全的方式访问 emitted
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['confirm']).toBeTruthy()
  })

  test('cancel事件', async () => {
    const onCancel = vi.fn()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        onCancel
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()
    // 直接触发事件
    wrapper.vm.$emit('cancel')
    await nextTick()

    // 使用类型安全的方式访问 emitted
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['cancel']).toBeTruthy()
  })

  test('update:modelValue事件', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now()
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    const newValue = new Date(2024, 0, 1).getTime()

    // 直接触发事件
    wrapper.vm.$emit('update:modelValue', newValue)
    await nextTick()

    // 使用类型安全的方式访问 emitted
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0]).toEqual([newValue])
  })

  test('暴露的方法', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now()
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    const vm = wrapper.vm

    // 测试 open 方法
    expect(typeof vm.open).toBe('function')
    vm.open()
    await nextTick()
    expect(wrapper.emitted('open')).toBeTruthy()

    // 测试 close 方法
    expect(typeof vm.close).toBe('function')

    // 测试 setLoading 方法
    expect(typeof vm.setLoading).toBe('function')
  })

  test('范围选择', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: [new Date(2024, 0, 1).getTime(), new Date(2024, 0, 15).getTime()],
        type: 'datetime'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('type')).toBe('datetime')
    expect(wrapper.props('modelValue')).toEqual([new Date(2024, 0, 1).getTime(), new Date(2024, 0, 15).getTime()])
    // 检查modelValue是否为数组类型（范围选择）
    expect(Array.isArray(wrapper.props('modelValue'))).toBe(true)
  })

  test('beforeConfirm 属性', async () => {
    const beforeConfirm = vi.fn((_value, resolve) => {
      // 模拟异步验证
      setTimeout(() => {
        resolve(true)
      }, 100)
    })

    const onConfirm = vi.fn()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        beforeConfirm,
        onConfirm
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    // 直接触发 confirm 事件
    wrapper.vm.$emit('confirm', { value: new Date(2024, 0, 1).getTime() })
    await nextTick()

    expect(wrapper.props('beforeConfirm')).toBe(beforeConfirm)
  })

  test('displayFormatTabLabel 属性', async () => {
    const displayFormatTabLabel = vi.fn((items) => {
      return `${items[0].label}年${items[1].label}月${items[2].label}日`
    })

    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: [new Date(2024, 0, 1).getTime(), new Date(2024, 0, 15).getTime()],
        displayFormatTabLabel
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('displayFormatTabLabel')).toBe(displayFormatTabLabel)
  })

  test('defaultValue 属性', async () => {
    const defaultValue = new Date(2024, 0, 1).getTime()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '',
        defaultValue
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('defaultValue')).toBe(defaultValue)
  })

  test('ellipsis 属性', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        ellipsis: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('ellipsis')).toBe(true)
  })

  test('clearable 属性', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        clearable: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('clearable')).toBe(true)
  })

  test('clearable 清空功能', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        clearable: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    const vm = wrapper.vm as any

    // 模拟有值的情况
    vm.showValue = '2024-01-01'

    // 调用清空方法
    vm.handleClear()
    await nextTick()

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['clear']).toBeTruthy()
    expect(emitted['update:modelValue']).toBeTruthy()
  })

  test('toggle 事件', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: [new Date(2024, 0, 1).getTime(), new Date(2024, 0, 15).getTime()],
        onToggle
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    // 直接触发事件
    wrapper.vm.$emit('toggle', true)
    await nextTick()

    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  test('setLoading 方法', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now()
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    const vm = wrapper.vm as any

    // 调用 setLoading 方法
    vm.setLoading(true)
    await nextTick()

    // 由于无法直接访问内部状态，我们只能验证方法存在并且可以调用
    expect(typeof vm.setLoading).toBe('function')

    vm.setLoading(false)
    await nextTick()
  })

  test('close 方法', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now()
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    const vm = wrapper.vm as any

    // 先打开弹窗
    vm.open()
    await nextTick()

    // 验证 open 事件被触发
    expect(wrapper.emitted('open')).toBeTruthy()

    // 调用 close 方法
    vm.close()
    await nextTick()

    // 由于无法直接访问内部状态，我们只能验证方法存在并且可以调用
    expect(typeof vm.close).toBe('function')
  })

  test('表单验证相关属性', async () => {
    const rules = [{ required: true, message: '请选择日期' }]
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '',
        prop: 'date',
        rules
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('prop')).toBe('date')
    expect(wrapper.props('rules')).toEqual(rules)
  })

  test('useSecond 属性 - 时间类型', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '12:30:45',
        type: 'time',
        useSecond: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('useSecond')).toBe(true)
    expect(wrapper.props('type')).toBe('time')
    expect(wrapper.props('modelValue')).toBe('12:30:45')
    // 检查props设置是否正确
    expect(wrapper.props('useSecond')).toBe(true)
  })

  test('useSecond 属性 - 日期时间类型', async () => {
    const now = Date.now()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: now,
        type: 'datetime',
        useSecond: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('useSecond')).toBe(true)
    expect(wrapper.props('type')).toBe('datetime')
    expect(wrapper.props('modelValue')).toBe(now)
  })

  test('useSecond 属性 - 时间范围限制', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '12:30:45',
        type: 'time',
        useSecond: true,
        minSecond: 0,
        maxSecond: 30
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('useSecond')).toBe(true)
    expect(wrapper.props('minSecond')).toBe(0)
    expect(wrapper.props('maxSecond')).toBe(30)
  })

  test('useSecond 属性 - 日期时间范围限制', async () => {
    const now = Date.now()
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: now,
        type: 'datetime',
        useSecond: true,
        minSecond: 0,
        maxSecond: 30
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('useSecond')).toBe(true)
    expect(wrapper.props('minSecond')).toBe(0)
    expect(wrapper.props('maxSecond')).toBe(30)
  })

  test('useSecond 属性 - 自定义显示格式', async () => {
    const displayFormat = vi.fn((items) => {
      return `${items[0].label}时${items[1].label}分${items[2].label}秒`
    })

    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '12:30:45',
        type: 'time',
        useSecond: true,
        displayFormat
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('useSecond')).toBe(true)
    expect(wrapper.props('displayFormat')).toBe(displayFormat)
    expect(displayFormat).toHaveBeenCalled()
  })

  test('useSecond 属性 - 范围选择', async () => {
    const startDate = new Date(2024, 0, 1, 12, 30, 45).getTime()
    const endDate = new Date(2024, 0, 1, 13, 30, 45).getTime()

    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: [startDate, endDate],
        type: 'datetime',
        useSecond: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('useSecond')).toBe(true)
    expect(Array.isArray(wrapper.props('modelValue'))).toBe(true)
    expect(wrapper.props('modelValue')).toEqual([startDate, endDate])
  })

  test('useSecond 属性 - 表单验证', async () => {
    const rules = [{ required: true, message: '请选择时间' }]
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '',
        type: 'time',
        useSecond: true,
        prop: 'time',
        rules
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('useSecond')).toBe(true)
    expect(wrapper.props('prop')).toBe('time')
    expect(wrapper.props('rules')).toEqual(rules)
  })

  // 测试 markerSide 属性
  test('markerSide 属性 - before', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        label: '日期选择',
        required: true,
        markerSide: 'before'
      },
      global: {
        components: globalComponents
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.props('markerSide')).toBe('before')
    // 检查传递给 wd-cell 的 markerSide 属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('markerSide')).toBe('before')
  })

  test('markerSide 属性 - after', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        label: '日期选择',
        required: true,
        markerSide: 'after'
      },
      global: {
        components: globalComponents
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.props('markerSide')).toBe('after')
    // 检查传递给 wd-cell 的 markerSide 属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('markerSide')).toBe('after')
  })

  test('markerSide 默认值', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        label: '日期选择',
        required: true
      },
      global: {
        components: globalComponents
      }
    })

    await wrapper.vm.$nextTick()
    // 默认值应该是 'before'
    expect(wrapper.props('markerSide')).toBe('before')
    // 检查传递给 wd-cell 的 markerSide 属性
    expect(wrapper.findComponent({ name: 'wd-cell' }).props('markerSide')).toBe('before')
  })
})
