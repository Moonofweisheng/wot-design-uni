import { mount } from '@vue/test-utils'
import WdCheckbox from '@/uni_modules/wot-design-uni/components/wd-checkbox/wd-checkbox.vue'
import WdCheckboxGroup from '@/uni_modules/wot-design-uni/components/wd-checkbox-group/wd-checkbox-group.vue'
import { describe, test, expect } from 'vitest'
import { CheckShape } from '@/uni_modules/wot-design-uni/components/wd-checkbox/types'

describe('WdCheckbox', () => {
  // 测试基本渲染
  test('renders checkbox with default props', () => {
    const wrapper = mount(WdCheckbox)
    expect(wrapper.classes()).toContain('wd-checkbox')
  })

  // 测试选中状态
  test('handles checked state', async () => {
    const wrapper = mount(WdCheckbox, {
      props: {
        modelValue: false
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  // 测试禁用状态
  test('renders disabled state', () => {
    const wrapper = mount(WdCheckbox, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 测试自定义颜色
  test('renders with custom color', () => {
    const checkedColor = '#ff0000'
    const wrapper = mount(WdCheckbox, {
      props: {
        modelValue: true,
        checkedColor
      }
    })
    expect(wrapper.find('.wd-checkbox__shape').attributes('style')).toContain(`border-color: ${checkedColor}`)
  })

  // 测试复选框形状
  test('renders different shapes', () => {
    const shapes: CheckShape[] = ['circle', 'square']
    shapes.forEach((shape) => {
      const wrapper = mount(WdCheckbox, {
        props: { shape }
      })
      expect(wrapper.classes()).toContain(`is-${shape}`)
    })
  })

  // 测试复选框尺寸
  test('renders different sizes', () => {
    const sizes = ['large', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(WdCheckbox, {
        props: { size }
      })
      expect(wrapper.classes()).toContain(`is-${size}`)
    })
  })

  // 测试配合复选框组使用
  test('works with checkbox group', async () => {
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group v-model="value">
          <wd-checkbox label="1">选项1</wd-checkbox>
          <wd-checkbox label="2">选项2</wd-checkbox>
        </wd-checkbox-group>
      `,
      data() {
        return {
          value: ['1']
        }
      }
    })

    const checkboxes = wrapper.findAllComponents(WdCheckbox)
    expect(checkboxes[0].classes()).toContain('is-checked')

    await checkboxes[1].trigger('click')
    expect(wrapper.vm.value).toEqual(['1', '2'])
  })

  // 测试判定值
  test('handles true-value and false-value', async () => {
    const wrapper = mount(WdCheckbox, {
      props: {
        modelValue: '0',
        trueValue: '1',
        falseValue: '0'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
  })

  // 测试文本显示位置
  test('renders label alignment', () => {
    const wrapper = mount(WdCheckbox, {
      props: {
        label: '选项',
        labelLeft: true
      }
    })
    expect(wrapper.classes()).toContain('is-label-left')
  })

  // 测试自定义图标
  test('renders custom icon', () => {
    const wrapper = mount(WdCheckbox, {
      slots: {
        icon: '<div class="custom-icon">自定义图标</div>'
      }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-checkbox'
    const wrapper = mount(WdCheckbox, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 8px;'
    const wrapper = mount(WdCheckbox, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试中间状态
  test('renders indeterminate state', () => {
    const wrapper = mount(WdCheckbox, {
      props: {
        indeterminate: true
      }
    })
    expect(wrapper.classes()).toContain('is-indeterminate')
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdCheckbox)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试change事件
  test('emits change event', async () => {
    const wrapper = mount(WdCheckbox, {
      props: {
        modelValue: false
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  // 测试禁用点击
  test('prevents click when disabled', async () => {
    const wrapper = mount(WdCheckbox, {
      props: {
        disabled: true,
        modelValue: false
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})
