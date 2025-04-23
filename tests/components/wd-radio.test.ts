import { mount } from '@vue/test-utils'
import WdRadio from '@/uni_modules/wot-design-uni/components/wd-radio/wd-radio.vue'
import WdRadioGroup from '@/uni_modules/wot-design-uni/components/wd-radio-group/wd-radio-group.vue'
import { describe, test, expect } from 'vitest'
import { RadioShape } from '@/uni_modules/wot-design-uni/components/wd-radio/types'

describe('WdRadio', () => {
  // 测试基本渲染
  test('renders radio with default props', () => {
    const wrapper = mount(WdRadio)
    expect(wrapper.classes()).toContain('wd-radio')
  })

  // 测试选中状态
  test('handles checked state', async () => {
    const wrapper = mount(WdRadio, {
      props: {
        value: false
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([true])
  })

  // 测试禁用状态
  test('renders disabled state', () => {
    const wrapper = mount(WdRadio, {
      props: {
        value: false,
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 测试自定义颜色
  test('renders with custom color', () => {
    const checkedColor = '#ff0000'
    const wrapper = mount(WdRadio, {
      props: {
        value: true,
        checkedColor
      }
    })
    expect(wrapper.find('.wd-radio__shape').attributes('style')).toContain(`color: ${checkedColor}`)
  })

  // 测试配合单选框组使用
  test('works with radio group', async () => {
    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group v-model="value">
          <wd-radio label="1">选项1</wd-radio>
          <wd-radio label="2">选项2</wd-radio>
        </wd-radio-group>
      `,
      data() {
        return {
          value: '1'
        }
      }
    })

    const radios = wrapper.findAllComponents(WdRadio)
    expect(radios[0].classes()).toContain('is-checked')

    await radios[1].trigger('click')
    expect(wrapper.vm.value).toBe('2')
  })

  // 测试单选框形状
  test('renders different shapes', () => {
    const shapes: RadioShape[] = ['dot', 'button', 'check']
    shapes.forEach((shape) => {
      const wrapper = mount(WdRadio, {
        props: { shape, value: true }
      })
      expect(wrapper.classes()).toContain(`is-${shape}`)
    })
  })

  // 测试单选框尺寸
  test('renders different sizes', () => {
    const sizes = ['large', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(WdRadio, {
        props: { size, value: true }
      })
      expect(wrapper.classes()).toContain(`is-${size}`)
    })
  })

  // 测试文本显示位置
  test('renders label alignment', () => {
    const wrapper = mount(WdRadio, {
      props: {
        value: '选项',
        iconPlacement: 'right'
      }
    })
    expect(wrapper.classes()).toContain('icon-placement-right')
  })

  // 测试自定义图标
  test('renders custom icon', () => {
    const wrapper = mount(WdRadio, {
      slots: {
        icon: '<div class="custom-icon">自定义图标</div>'
      }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-radio'
    const wrapper = mount(WdRadio, {
      props: { customClass, value: true }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 8px;'
    const wrapper = mount(WdRadio, {
      props: { customStyle, value: true }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdRadio)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试change事件
  test('emits change event', async () => {
    const wrapper = mount(WdRadio, {
      props: {
        value: false,
        label: 'test'
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  // 测试禁用点击
  test('prevents click when disabled', async () => {
    const wrapper = mount(WdRadio, {
      props: {
        disabled: true,
        value: false
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:value')).toBeFalsy()
  })

  // 测试空值和超长文本
  test('handles empty and long text', () => {
    const wrapper = mount(WdRadio, {
      props: {
        value: '',
        maxWidth: '200px'
      },
      slots: {
        default: '这是一段非常长的文本，用来测试单选框组件在处理长文本时的表现，确保文本能够正确换行或截断'
      }
    })
    expect(wrapper.find('.wd-radio__label').attributes('style')).toContain('max-width:200px')
  })

  // 测试内联模式
  test('renders inline mode', () => {
    const wrapper = mount(WdRadio, {
      props: {
        inline: true,
        value: false
      }
    })
    expect(wrapper.classes()).toContain('is-inline')
  })

  // 测试单元格模式
  test('renders cell mode', () => {
    const wrapper = mount(WdRadio, {
      props: {
        cell: true,
        value: false
      }
    })
    expect(wrapper.classes()).toContain('is-cell-radio')
  })
})
