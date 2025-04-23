import { mount } from '@vue/test-utils'
import WdCheckboxGroup from '@/uni_modules/wot-design-uni/components/wd-checkbox-group/wd-checkbox-group.vue'
import WdCheckbox from '@/uni_modules/wot-design-uni/components/wd-checkbox/wd-checkbox.vue'
import { describe, test, expect } from 'vitest'

describe('WdCheckboxGroup', () => {
  // 测试基本渲染
  test('renders checkbox group with default props', () => {
    const wrapper = mount(WdCheckboxGroup)
    expect(wrapper.classes()).toContain('wd-checkbox-group')
  })

  // 测试选中值
  test('handles model value', async () => {
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group v-model="value">
          <wd-checkbox label="1">选项1</wd-checkbox>
          <wd-checkbox label="2">选项2</wd-checkbox>
          <wd-checkbox label="3">选项3</wd-checkbox>
        </wd-checkbox-group>
      `,
      data() {
        return {
          value: ['1', '2']
        }
      }
    })

    const checkboxes = wrapper.findAllComponents(WdCheckbox)
    expect(checkboxes[0].classes()).toContain('is-checked')
    expect(checkboxes[1].classes()).toContain('is-checked')
    expect(checkboxes[2].classes()).not.toContain('is-checked')

    await checkboxes[2].trigger('click')
    expect(wrapper.vm.value).toContain('3')
    expect(((wrapper.vm.value as any) || []).length).toBe(3)
  })

  // 测试禁用状态
  test('renders disabled state', () => {
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group disabled>
          <wd-checkbox label="1">选项1</wd-checkbox>
          <wd-checkbox label="2">选项2</wd-checkbox>
        </wd-checkbox-group>
      `
    })

    const checkboxes = wrapper.findAllComponents(WdCheckbox)
    checkboxes.forEach((checkbox) => {
      expect(checkbox.props('disabled')).toBe(true)
    })
  })

  // 测试最小和最大可选数量
  test('handles min and max limits', async () => {
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group v-model="value" :min="1" :max="2">
          <wd-checkbox label="1">选项1</wd-checkbox>
          <wd-checkbox label="2">选项2</wd-checkbox>
          <wd-checkbox label="3">选项3</wd-checkbox>
        </wd-checkbox-group>
      `,
      data() {
        return {
          value: ['1']
        }
      }
    })

    const checkboxes = wrapper.findAllComponents(WdCheckbox)

    // 测试最小值限制
    await checkboxes[0].trigger('click')
    expect(wrapper.vm.value).toEqual(['1'])

    // 测试最大值限制
    await checkboxes[1].trigger('click')
    await checkboxes[2].trigger('click')
    expect(((wrapper.vm.value as any) || []).length).toBe(2)
  })

  // 测试复选框组形状
  test('renders different shapes', () => {
    const shapes = ['circle', 'square']
    shapes.forEach((shape) => {
      const wrapper = mount({
        components: {
          WdCheckboxGroup,
          WdCheckbox
        },
        template: `
          <wd-checkbox-group :shape="shape">
            <wd-checkbox label="1">选项1</wd-checkbox>
          </wd-checkbox-group>
        `,
        data() {
          return { shape }
        }
      })
      const checkbox = wrapper.findComponent(WdCheckbox)
      expect(checkbox.props('shape')).toBe(shape)
    })
  })

  // 测试复选框组尺寸
  test('renders different sizes', () => {
    const sizes = ['large', 'small']
    sizes.forEach((size) => {
      const wrapper = mount({
        components: {
          WdCheckboxGroup,
          WdCheckbox
        },
        template: `
          <wd-checkbox-group :size="size">
            <wd-checkbox label="1">选项1</wd-checkbox>
          </wd-checkbox-group>
        `,
        data() {
          return { size }
        }
      })
      const checkbox = wrapper.findComponent(WdCheckbox)
      expect(checkbox.props('size')).toBe(size)
    })
  })

  // 测试自定义颜色
  test('renders with custom color', () => {
    const checkedColor = '#ff0000'
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group :checked-color="checkedColor" v-model="value">
          <wd-checkbox label="1">选项1</wd-checkbox>
        </wd-checkbox-group>
      `,
      data() {
        return {
          checkedColor,
          value: ['1']
        }
      }
    })
    const checkbox = wrapper.findComponent(WdCheckbox)
    expect(checkbox.props('checkedColor')).toBe(checkedColor)
  })

  // 测试change事件
  // test('emits change event', async () => {
  //   const wrapper = mount({
  //     components: {
  //       WdCheckboxGroup,
  //       WdCheckbox
  //     },
  //     template: `
  //       <wd-checkbox-group v-model="value" @change="handleChange">
  //         <wd-checkbox label="1">选项1</wd-checkbox>
  //         <wd-checkbox label="2">选项2</wd-checkbox>
  //       </wd-checkbox-group>
  //     `,
  //     data() {
  //       return {
  //         value: ['1']
  //       }
  //     },
  //     methods: {
  //       handleChange(value) {
  //         this.changeValue = value
  //       }
  //     }
  //   })

  //   const checkboxes = wrapper.findAllComponents(WdCheckbox)
  //   await checkboxes[1].trigger('click')
  //   expect(wrapper.emitted('change')?.[0]).toEqual([['1', '2']])
  // })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-checkbox-group'
    const wrapper = mount(WdCheckboxGroup, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 16px;'
    const wrapper = mount(WdCheckboxGroup, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试复选框组布局方向
  test('renders with different cell directions', () => {
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group direction="vertical">
          <wd-checkbox label="1">选项1</wd-checkbox>
          <wd-checkbox label="2">选项2</wd-checkbox>
        </wd-checkbox-group>
      `
    })
    expect(wrapper.classes()).toContain('is-vertical')
  })
})
