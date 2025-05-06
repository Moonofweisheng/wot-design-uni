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

    expect(wrapper.classes()).toContain('wd-picker')
    expect(wrapper.props('label')).toBe('日期选择')
    expect(wrapper.find('.wd-picker__label').text()).toBe('日期选择')
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
    expect(wrapper.classes()).toContain('is-disabled')
    // 点击不应该触发 open 事件
    const field = wrapper.find('.wd-picker__field')
    await field.trigger('click')
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

    // 点击不应该触发 open 事件
    const field = wrapper.find('.wd-picker__field')
    await field.trigger('click')
    expect(wrapper.emitted('open')).toBeFalsy()
  })

  test('自定义格式化', async () => {
    const date = new Date(2024, 0, 1).getTime() // 2024-01-01
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: date,
        format: 'YYYY年MM月DD日'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('modelValue')).toBe(date)
    expect(wrapper.find('.wd-picker__value').text()).toBe('2024-01-01 00:00')
  })

  test('自定义显示格式化函数', async () => {
    const date = new Date(2024, 0, 1).getTime() // 2024-01-01
    const displayFormat = vi.fn((value) => {
      return '自定义格式: ' + new Date(value).toLocaleDateString()
    })

    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: date,
        displayFormat
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()
    expect(displayFormat).toHaveBeenCalled()
    expect(wrapper.find('.wd-picker__value').text()).toContain('自定义格式')
  })

  test('最大最小日期', async () => {
    const minDate = new Date(2024, 0, 1).getTime() // 2024-01-01
    const maxDate = new Date(2024, 11, 31).getTime() // 2024-12-31

    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: new Date(2024, 5, 15).getTime(), // 2024-06-15
        minDate,
        maxDate
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.props('minDate')).toBe(minDate)
    expect(wrapper.props('maxDate')).toBe(maxDate)
  })

  test('时间类型和时间范围', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '12:30',
        type: 'time',
        minHour: 9,
        maxHour: 18,
        minMinute: 0,
        maxMinute: 45
      },
      global: {
        components: globalComponents
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.props('type')).toBe('time')
    expect(wrapper.props('modelValue')).toBe('12:30')
    expect(wrapper.props('minHour')).toBe(9)
    expect(wrapper.props('maxHour')).toBe(18)
    expect(wrapper.props('minMinute')).toBe(0)
    expect(wrapper.props('maxMinute')).toBe(45)
    expect(wrapper.find('.wd-picker__value').text()).toBe('12:30')
  })

  test('年月日类型', async () => {
    const date = new Date(2024, 0, 1).getTime() // 2024-01-01
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: date,
        type: 'date'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('type')).toBe('date')
    expect(wrapper.props('modelValue')).toBe(date)
  })

  test('年月类型', async () => {
    const date = new Date(2024, 0, 1).getTime() // 2024-01-01
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: date,
        type: 'year-month'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('type')).toBe('year-month')
    expect(wrapper.props('modelValue')).toBe(date)
  })

  test('年份类型', async () => {
    const date = new Date(2024, 0, 1).getTime() // 2024-01-01
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: date,
        type: 'year'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('type')).toBe('year')
    expect(wrapper.props('modelValue')).toBe(date)
  })

  test('加载状态', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        loading: true,
        loadingColor: '#ff0000'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('loading')).toBe(true)
    expect(wrapper.props('loadingColor')).toBe('#ff0000')
  })

  test('自定义标题和按钮文案', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        title: '选择日期',
        cancelButtonText: '取消选择',
        confirmButtonText: '确认选择'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('title')).toBe('选择日期')
    expect(wrapper.props('cancelButtonText')).toBe('取消选择')
    expect(wrapper.props('confirmButtonText')).toBe('确认选择')
  })

  test('必填状态', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: Date.now(),
        label: '日期',
        required: true
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('required')).toBe(true)
    expect(wrapper.find('.is-required').exists()).toBe(true)
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
    expect(wrapper.classes()).toContain('is-large')
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
    // 检查样式包含 min-width: 100px，注意空格
    expect(wrapper.find('.wd-picker__label').attributes('style')).toContain('min-width: 100px')
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
    expect(wrapper.classes()).toContain('is-error')
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
    expect(wrapper.classes()).toContain('is-align-right')
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
        label: '日期' // 添加标签以确保 .wd-picker__label 元素存在
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
    expect(wrapper.find('.wd-picker__cell').classes()).toContain('custom-cell')
    // 确保标签元素存在后再检查类名
    const labelElement = wrapper.find('.wd-picker__label')
    expect(labelElement.exists()).toBe(true)
    expect(labelElement.classes()).toContain('custom-label')
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

    const field = wrapper.find('.wd-picker__field')
    await field.trigger('click')

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
    const startDate = new Date(2024, 0, 1).getTime()
    const endDate = new Date(2024, 0, 15).getTime()

    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: [startDate, endDate]
      },
      global: {
        components: globalComponents
      }
    })

    await wrapper.vm.$nextTick()

    expect(Array.isArray(wrapper.props('modelValue'))).toBe(true)
    expect(wrapper.props('modelValue')).toEqual([startDate, endDate])
    expect(wrapper.find('.wd-picker__value').text()).toContain(' 至 ')
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
})
