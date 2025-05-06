import { mount } from '@vue/test-utils'
import '../mocks/wd-transition.mock'
import { describe, expect, test, vi } from 'vitest'
import WdColPicker from '@/uni_modules/wot-design-uni/components/wd-col-picker/wd-col-picker.vue'
import type {
  ColPickerColumnChange,
  ColPickerDisplayFormat,
  ColPickerColumnChangeOption
} from '@/uni_modules/wot-design-uni/components/wd-col-picker/types'

describe('WdColPicker', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        label: '选择地址',
        columns: [
          [
            { value: '1', label: '选项1' },
            { value: '2', label: '选项2' }
          ]
        ]
      }
    })

    expect(wrapper.classes()).toContain('wd-col-picker')
    expect(wrapper.find('.wd-col-picker__label').text()).toBe('选择地址')
    expect(wrapper.find('.wd-col-picker__value').text()).toBe('请选择')
  })

  test('初始值设置', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: ['1', '2'],
        columns: [[{ value: '1', label: '选项1' }], [{ value: '2', label: '选项2' }]]
      }
    })

    expect(wrapper.props('modelValue')).toEqual(['1', '2'])
    expect(wrapper.find('.wd-col-picker__value').text()).not.toBe('请选择')
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        disabled: true,
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.find('.wd-col-picker__cell').classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('open')).toBeFalsy()
  })

  test('只读状态', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        readonly: true,
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.find('.wd-col-picker__cell').classes()).toContain('is-readonly')
    await wrapper.trigger('click')
    expect(wrapper.emitted('open')).toBeFalsy()
  })

  test('错误状态', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        error: true,
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.find('.wd-col-picker__cell').classes()).toContain('is-error')
  })

  test('必填样式', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        label: '测试',
        required: true,
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })
    expect(wrapper.find('.wd-col-picker__label').classes()).toContain('is-required')
  })

  test('自定义展示格式', async () => {
    const displayFormat: ColPickerDisplayFormat = (selectedItems) => {
      return selectedItems.map((item) => item.label).join('-')
    }

    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: ['1', '2'],
        columns: [[{ value: '1', label: '选项1' }], [{ value: '2', label: '选项2' }]],
        displayFormat
      }
    })

    expect(wrapper.find('.wd-col-picker__value').text()).toBe('选项1-选项2')
  })

  test('标题设置', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        title: '自定义标题',
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })
    wrapper.find('.wd-col-picker__field').trigger('click')
    expect(wrapper.find('.wd-action-sheet__header').text()).toBe('自定义标题')
  })

  test('自定义值和标签键名', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: ['a'],
        columns: [[{ id: 'a', text: '选项A' }]],
        valueKey: 'id',
        labelKey: 'text'
      }
    })

    expect(wrapper.props('valueKey')).toBe('id')
    expect(wrapper.props('labelKey')).toBe('text')
    expect(wrapper.find('.wd-col-picker__value').text()).not.toBe('请选择')
  })

  test('自动补全数据', async () => {
    const columnChange: ColPickerColumnChange = vi.fn((options: ColPickerColumnChangeOption) => {
      options.resolve([{ value: '2', label: '选项2' }])
    })

    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: ['1', '2'],
        columns: [[{ value: '1', label: '选项1' }]],
        autoComplete: true,
        columnChange
      }
    })

    expect(columnChange).toHaveBeenCalled()
  })

  test('对齐方式', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        alignRight: true,
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.find('.wd-col-picker__cell').classes()).toContain('is-align-right')
  })

  test('自定义提示文案', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        placeholder: '请选择选项',
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.find('.wd-col-picker__value').text()).toBe('请选择选项')
  })

  test('自定义提示键名', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: ['1'],
        columns: [[{ value: '1', label: '选项1', note: '提示信息' }]],
        tipKey: 'note'
      }
    })

    expect(wrapper.props('tipKey')).toBe('note')
  })

  test('点击遮罩关闭', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        closeOnClickModal: false,
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.props('closeOnClickModal')).toBe(false)
  })

  test('暴露的方法', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    // 检查组件实例是否有 open 和 close 方法
    expect('open' in wrapper.vm).toBe(true)
    expect('close' in wrapper.vm).toBe(true)
  })

  test('自定义尺寸', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        size: 'large',
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.find('.wd-col-picker__cell').classes()).toContain('is-large')
  })

  test('自定义标签宽度', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        label: '选择地址',
        labelWidth: '100px',
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    const labelStyle = wrapper.find('.wd-col-picker__label').attributes('style')
    expect(labelStyle).toContain('min-width: 100px')
    expect(labelStyle).toContain('max-width: 100px')
  })

  test('使用插槽', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        useLabelSlot: true,
        columns: [[{ value: '1', label: '选项1' }]]
      },
      slots: {
        label: '<div class="custom-label">自定义标签</div>'
      }
    })

    expect(wrapper.props('useLabelSlot')).toBe(true)
    expect(wrapper.find('.custom-label').exists()).toBeTruthy()
  })

  test('自定义样式类', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        label: '选择地址',
        modelValue: [],
        customLabelClass: 'custom-label-class',
        customValueClass: 'custom-value-class',
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.find('.wd-col-picker__label').classes()).toContain('custom-label-class')
    expect(wrapper.find('.wd-col-picker__value').classes()).toContain('custom-value-class')
  })

  test('省略显示', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: ['1'],
        ellipsis: true,
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.find('.wd-col-picker__value').classes()).toContain('is-ellipsis')
  })

  test('底部安全距离', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        safeAreaInsetBottom: false,
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.props('safeAreaInsetBottom')).toBe(false)
  })

  test('自定义底部条样式', async () => {
    const wrapper = mount(WdColPicker, {
      props: {
        modelValue: [],
        lineWidth: 100,
        lineHeight: 4,
        columns: [[{ value: '1', label: '选项1' }]]
      }
    })

    expect(wrapper.props('lineWidth')).toBe(100)
    expect(wrapper.props('lineHeight')).toBe(4)
  })
})
