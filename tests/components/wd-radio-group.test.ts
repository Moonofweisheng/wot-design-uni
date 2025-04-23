import { mount } from '@vue/test-utils'
import WdRadioGroup from '@/uni_modules/wot-design-uni/components/wd-radio-group/wd-radio-group.vue'
import WdRadio from '@/uni_modules/wot-design-uni/components/wd-radio/wd-radio.vue'
import { describe, test, expect } from 'vitest'

describe('WdRadioGroup', () => {
  // 测试基本渲染
  test('renders radio group with default props', () => {
    const wrapper = mount(WdRadioGroup)
    expect(wrapper.classes()).toContain('wd-radio-group')
  })

  // 测试选中值
  test('handles model value', async () => {
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

    expect(wrapper.vm.value).toBe('1')
    const radios = wrapper.findAllComponents(WdRadio)
    await radios[1].trigger('click')
    expect(wrapper.vm.value).toBe('2')
  })

  // 测试禁用状态
  test('renders disabled state', () => {
    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group disabled>
          <wd-radio label="1">选项1</wd-radio>
          <wd-radio label="2">选项2</wd-radio>
        </wd-radio-group>
      `
    })

    const radios = wrapper.findAllComponents(WdRadio)
    radios.forEach((radio) => {
      expect(radio.props('disabled')).toBe(true)
    })
  })

  // 测试单选框组形状
  test('renders different shapes', () => {
    const shapes = ['circle', 'square']
    shapes.forEach((shape) => {
      const wrapper = mount({
        components: {
          WdRadioGroup,
          WdRadio
        },
        template: `
          <wd-radio-group :shape="shape">
            <wd-radio label="1">选项1</wd-radio>
          </wd-radio-group>
        `,
        data() {
          return { shape }
        }
      })
      const radio = wrapper.findComponent(WdRadio)
      expect(radio.props('shape')).toBe(shape)
    })
  })

  // 测试单选框组尺寸
  test('renders different sizes', () => {
    const sizes = ['large', 'small']
    sizes.forEach((size) => {
      const wrapper = mount({
        components: {
          WdRadioGroup,
          WdRadio
        },
        template: `
          <wd-radio-group :size="size">
            <wd-radio label="1">选项1</wd-radio>
          </wd-radio-group>
        `,
        data() {
          return { size }
        }
      })
      const radio = wrapper.findComponent(WdRadio)
      expect(radio.props('size')).toBe(size)
    })
  })

  // 测试自定义颜色
  test('renders with custom color', () => {
    const checkedColor = '#ff0000'
    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group :checked-color="checkedColor" v-model="value">
          <wd-radio label="1">选项1</wd-radio>
        </wd-radio-group>
      `,
      data() {
        return {
          checkedColor,
          value: '1'
        }
      }
    })
    const radio = wrapper.findComponent(WdRadio)
    expect(radio.props('checkedColor')).toBe(checkedColor)
  })

  // 测试change事件
  test('emits change event', async () => {
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
    await radios[1].trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual(['2'])
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-radio-group'
    const wrapper = mount(WdRadioGroup, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 16px;'
    const wrapper = mount(WdRadioGroup, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试单选框组布局方向
  test('renders with different cell directions', () => {
    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group direction="vertical">
          <wd-radio label="1">选项1</wd-radio>
          <wd-radio label="2">选项2</wd-radio>
        </wd-radio-group>
      `
    })
    expect(wrapper.classes()).toContain('is-vertical')
  })
})
