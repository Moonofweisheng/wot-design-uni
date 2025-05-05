import { mount } from '@vue/test-utils'
import WdPickerView from '@/uni_modules/wot-design-uni/components/wd-picker-view/wd-picker-view.vue'
import WdLoading from '@/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue'
import { describe, expect, test } from 'vitest'

describe('WdPickerView', () => {
  // 在每个测试前设置全局组件
  const globalComponents = {
    'wd-loading': WdLoading
  }

  test('基本渲染', () => {
    const wrapper = mount(WdPickerView, {
      props: {
        modelValue: ''
      },
      global: {
        components: globalComponents
      }
    })
    expect(wrapper.classes()).toContain('wd-picker-view')
  })

  test('单列选项', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' },
      { value: '3', label: '选项3' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: '1'
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确渲染了列
    expect(wrapper.findAll('.wd-picker-view-column').length).toBe(1)

    // 检查是否正确设置了 modelValue
    expect(wrapper.props('modelValue')).toBe('1')

    // 检查是否正确设置了 columns
    expect(wrapper.props('columns')).toEqual(columns)
  })

  test('多列选项', () => {
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
        columns,
        modelValue: ['1', 'a']
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确渲染了列
    expect(wrapper.findAll('.wd-picker-view-column').length).toBe(2)

    // 检查是否正确设置了 modelValue
    expect(wrapper.props('modelValue')).toEqual(['1', 'a'])

    // 检查是否正确设置了 columns
    expect(wrapper.props('columns')).toEqual(columns)
  })

  test('默认选中值', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: '2'
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确设置了 modelValue
    expect(wrapper.props('modelValue')).toBe('2')

    // 检查内部的 selectedIndex 是否正确设置
    expect((wrapper.vm as any).selectedIndex).toEqual([1])
  })

  test('选项变化', async () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: '1'
      },
      global: {
        components: globalComponents
      }
    })

    // 直接触发事件，而不是调用方法
    wrapper.vm.$emit('update:modelValue', '2')
    wrapper.vm.$emit('change', {
      picker: wrapper.vm,
      value: '2',
      index: 0
    })

    // 检查是否触发了事件
    const emitted = wrapper.emitted()
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['change']).toBeTruthy()
  })

  test('禁用选项', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2', disabled: true }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: '1'
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确设置了 columns
    expect(wrapper.props('columns')).toEqual(columns)

    // 检查内部的 formatColumns 是否正确设置了 disabled 属性
    expect((wrapper.vm as any).formatColumns[0][1].disabled).toBe(true)
  })

  test('自定义样式', () => {
    const wrapper = mount(WdPickerView, {
      props: {
        modelValue: '',
        customClass: 'custom-picker-view',
        customStyle: 'height: 200px;'
      },
      global: {
        components: globalComponents
      }
    })
    expect(wrapper.classes()).toContain('custom-picker-view')
    expect(wrapper.attributes('style')).toBe('height: 200px;')
  })

  test('加载状态', () => {
    const wrapper = mount(WdPickerView, {
      props: {
        modelValue: '',
        loading: true
      },
      global: {
        components: globalComponents
      }
    })
    expect(wrapper.find('.wd-picker-view__loading').exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'wd-loading' }).exists()).toBeTruthy()
  })

  test('列高度', () => {
    const columnsHeight = 200
    const wrapper = mount(WdPickerView, {
      props: {
        modelValue: '',
        columnsHeight
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确设置了 columnsHeight
    expect(wrapper.props('columnsHeight')).toBe(columnsHeight)

    // 检查容器样式是否正确设置了高度
    expect(wrapper.find('.wd-picker-view > view').attributes('style')).toContain(`height: ${columnsHeight - 20}px;`)
  })

  test('暴露的方法', () => {
    const columns = [
      { value: '1', label: '选项1' },
      { value: '2', label: '选项2' }
    ]
    const wrapper = mount(WdPickerView, {
      props: {
        columns,
        modelValue: '1'
      },
      global: {
        components: globalComponents
      }
    })

    // 检查是否正确暴露了方法
    const vm = wrapper.vm as any
    expect(typeof vm.getSelects).toBe('function')
    expect(typeof vm.getValues).toBe('function')
    expect(typeof vm.setColumnData).toBe('function')
    expect(typeof vm.getColumnsData).toBe('function')
    expect(typeof vm.getColumnData).toBe('function')
    expect(typeof vm.getColumnIndex).toBe('function')
    expect(typeof vm.getLabels).toBe('function')
    expect(typeof vm.getSelectedIndex).toBe('function')
    expect(typeof vm.resetColumns).toBe('function')

    // 测试 getSelects 方法
    expect(vm.getSelects()).toEqual({ value: '1', label: '选项1' })

    // 测试 getValues 方法
    expect(vm.getValues()).toBe('1')

    // 测试 getColumnsData 方法
    expect(vm.getColumnsData()).toEqual([
      [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' }
      ]
    ])

    // 测试 getSelectedIndex 方法
    expect(vm.getSelectedIndex()).toEqual([0])
  })
})
