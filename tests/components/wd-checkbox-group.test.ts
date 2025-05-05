import { mount } from '@vue/test-utils'
import WdCheckboxGroup from '@/uni_modules/wot-design-uni/components/wd-checkbox-group/wd-checkbox-group.vue'
import WdCheckbox from '@/uni_modules/wot-design-uni/components/wd-checkbox/wd-checkbox.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'

describe('WdCheckboxGroup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdCheckboxGroup, {
      props: {
        modelValue: ['1', '2']
      }
    })

    expect(wrapper.classes()).toContain('wd-checkbox-group')
  })

  // 测试按钮模式
  test('按钮模式', () => {
    const wrapper = mount(WdCheckboxGroup, {
      props: {
        shape: 'button',
        cell: true
      }
    })

    expect(wrapper.classes()).toContain('is-button')
  })

  // 测试非按钮模式
  test('非按钮模式', () => {
    const wrapper = mount(WdCheckboxGroup, {
      props: {
        shape: 'circle',
        cell: true
      }
    })

    expect(wrapper.classes()).not.toContain('is-button')
  })

  // 测试选中值
  test('选中值处理', async () => {
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group v-model="value">
          <wd-checkbox modelValue="1">选项1</wd-checkbox>
          <wd-checkbox modelValue="2">选项2</wd-checkbox>
          <wd-checkbox modelValue="3">选项3</wd-checkbox>
        </wd-checkbox-group>
      `,
      data() {
        return {
          value: ['1', '2']
        }
      }
    })

    await nextTick()

    const checkboxes = wrapper.findAllComponents(WdCheckbox)
    expect(checkboxes[0].classes()).toContain('is-checked')
    expect(checkboxes[1].classes()).toContain('is-checked')
    expect(checkboxes[2].classes()).not.toContain('is-checked')

    // 点击第三个复选框
    await checkboxes[2].trigger('click')

    // 验证值更新 - 使用类型断言
    const vm = wrapper.vm as any
    expect(vm.value).toContain('3')
    expect(vm.value.length).toBe(3)
  })

  // 测试禁用状态
  test('禁用状态', async () => {
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group disabled>
          <wd-checkbox modelValue="1">选项1</wd-checkbox>
          <wd-checkbox modelValue="2">选项2</wd-checkbox>
        </wd-checkbox-group>
      `
    })

    await nextTick()

    const checkboxes = wrapper.findAllComponents(WdCheckbox)
    checkboxes.forEach((checkbox) => {
      expect(checkbox.classes()).toContain('is-disabled')
    })
  })

  // 测试最小和最大可选数量
  test('最小和最大可选数量限制', async () => {
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group v-model="value" :min="1" :max="2">
          <wd-checkbox modelValue="1">选项1</wd-checkbox>
          <wd-checkbox modelValue="2">选项2</wd-checkbox>
          <wd-checkbox modelValue="3">选项3</wd-checkbox>
        </wd-checkbox-group>
      `,
      data() {
        return {
          value: ['1']
        }
      }
    })

    await nextTick()

    const checkboxes = wrapper.findAllComponents(WdCheckbox)

    // 测试最小值限制 - 尝试取消选中唯一选中的复选框
    await checkboxes[0].trigger('click')

    // 由于最小值限制，值不应该改变
    expect(wrapper.vm.value).toEqual(['1'])

    // 测试最大值限制 - 选中第二个复选框
    await checkboxes[1].trigger('click')

    // 值应该更新为 ['1', '2']
    expect(wrapper.vm.value).toEqual(['1', '2'])

    // 尝试选中第三个复选框
    await checkboxes[2].trigger('click')

    // 由于最大值限制，值不应该改变
    expect(wrapper.vm.value).toEqual(['1', '2'])
  })

  // 测试复选框组形状
  test('不同形状渲染', async () => {
    const shapes = ['circle', 'square', 'button']

    for (const shape of shapes) {
      const wrapper = mount({
        components: {
          WdCheckboxGroup,
          WdCheckbox
        },
        template: `
          <wd-checkbox-group :shape="shape">
            <wd-checkbox modelValue="1">选项1</wd-checkbox>
          </wd-checkbox-group>
        `,
        data() {
          return { shape }
        }
      })

      await nextTick()

      const checkbox = wrapper.findComponent(WdCheckbox)

      if (shape === 'circle') {
        expect(checkbox.find('.wd-checkbox__shape').classes()).not.toContain('is-square')
      } else if (shape === 'square') {
        expect(checkbox.find('.wd-checkbox__shape').classes()).toContain('is-square')
      } else if (shape === 'button') {
        expect(checkbox.classes()).toContain('is-button')
      }
    }
  })

  // 测试复选框组尺寸
  test('不同尺寸渲染', async () => {
    const size = 'large'

    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group :size="size">
          <wd-checkbox modelValue="1">选项1</wd-checkbox>
        </wd-checkbox-group>
      `,
      data() {
        return { size }
      }
    })

    await nextTick()

    const checkbox = wrapper.findComponent(WdCheckbox)
    expect(checkbox.classes()).toContain(`is-${size}`)
  })

  // 测试自定义颜色
  test('自定义颜色', async () => {
    const checkedColor = '#ff0000'

    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group :checked-color="checkedColor" v-model="value">
          <wd-checkbox modelValue="1">选项1</wd-checkbox>
        </wd-checkbox-group>
      `,
      data() {
        return {
          checkedColor,
          value: ['1']
        }
      }
    })

    await nextTick()

    const checkbox = wrapper.findComponent(WdCheckbox)
    expect(checkbox.find('.wd-checkbox__shape').attributes('style')).toContain('color')
  })

  // 测试单元格模式
  test('单元格模式', async () => {
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group cell>
          <wd-checkbox modelValue="1">选项1</wd-checkbox>
          <wd-checkbox modelValue="2">选项2</wd-checkbox>
        </wd-checkbox-group>
      `
    })

    await nextTick()

    const checkboxes = wrapper.findAllComponents(WdCheckbox)
    checkboxes.forEach((checkbox) => {
      expect(checkbox.classes()).toContain('is-cell-box')
    })
  })

  // 测试内联模式
  test('内联模式', async () => {
    const wrapper = mount({
      components: {
        WdCheckboxGroup,
        WdCheckbox
      },
      template: `
        <wd-checkbox-group inline>
          <wd-checkbox modelValue="1">选项1</wd-checkbox>
          <wd-checkbox modelValue="2">选项2</wd-checkbox>
        </wd-checkbox-group>
      `
    })

    await nextTick()

    const checkboxes = wrapper.findAllComponents(WdCheckbox)
    checkboxes.forEach((checkbox) => {
      expect(checkbox.classes()).toContain('is-inline')
    })
  })

  // 测试change事件
  test('触发change事件', async () => {
    const wrapper = mount(WdCheckboxGroup, {
      props: {
        modelValue: ['1']
      }
    })

    // 调用 changeSelectState 方法 - 使用类型断言
    const vm = wrapper.vm as any
    vm.changeSelectState('2')

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0][0]).toEqual(['1', '2'])

    expect(emitted['change']).toBeTruthy()
    expect(emitted['change'][0][0]).toEqual({ value: ['1', '2'] })
  })

  // 测试取消选中
  test('取消选中时触发change事件', async () => {
    const wrapper = mount(WdCheckboxGroup, {
      props: {
        modelValue: ['1', '2']
      }
    })

    // 调用 changeSelectState 方法取消选中 - 使用类型断言
    const vm = wrapper.vm as any
    vm.changeSelectState('2')

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0][0]).toEqual(['1'])

    expect(emitted['change']).toBeTruthy()
    expect(emitted['change'][0][0]).toEqual({ value: ['1'] })
  })

  // 测试无效的形状
  test('处理无效的形状', () => {
    // 模拟 console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // 测试无效的形状 - 使用类型断言
    mount(WdCheckboxGroup, {
      props: {
        shape: 'invalid' as any
      }
    })

    // 应该输出错误信息
    expect(consoleErrorSpy).toHaveBeenCalled()

    // 恢复 console.error
    consoleErrorSpy.mockRestore()
  })

  // 测试重复值
  test('处理重复值', () => {
    // 模拟 console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // 测试重复值
    mount(WdCheckboxGroup, {
      props: {
        modelValue: ['1', '1']
      }
    })

    // 应该输出错误信息
    expect(consoleErrorSpy).toHaveBeenCalled()

    // 恢复 console.error
    consoleErrorSpy.mockRestore()
  })

  // 测试最小值限制
  test('处理最小值限制违规', () => {
    // 模拟 console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // 测试最小值限制
    mount(WdCheckboxGroup, {
      props: {
        modelValue: [],
        min: 1
      }
    })

    // 应该输出错误信息
    expect(consoleErrorSpy).toHaveBeenCalled()

    // 恢复 console.error
    consoleErrorSpy.mockRestore()
  })

  // 测试最大值限制
  test('处理最大值限制违规', () => {
    // 模拟 console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // 测试最大值限制
    mount(WdCheckboxGroup, {
      props: {
        modelValue: ['1', '2', '3'],
        max: 2
      }
    })

    // 应该输出错误信息
    expect(consoleErrorSpy).toHaveBeenCalled()

    // 恢复 console.error
    consoleErrorSpy.mockRestore()
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'custom-checkbox-group'
    const wrapper = mount(WdCheckboxGroup, {
      props: { customClass }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'margin: 16px;'
    const wrapper = mount(WdCheckboxGroup, {
      props: { customStyle }
    })

    expect(wrapper.attributes('style')).toBe(customStyle)
  })
})
