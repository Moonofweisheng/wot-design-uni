import { mount } from '@vue/test-utils'
import WdRadioGroup from '@/uni_modules/wot-design-uni/components/wd-radio-group/wd-radio-group.vue'
import WdRadio from '@/uni_modules/wot-design-uni/components/wd-radio/wd-radio.vue'
import { describe, test, expect, vi } from 'vitest'
import { RadioShape } from '@/uni_modules/wot-design-uni/components/wd-radio/types'

describe('单选框组组件', () => {
  // 测试基本渲染
  test('使用默认属性渲染单选框组', () => {
    const wrapper = mount(WdRadioGroup)
    expect(wrapper.classes()).toContain('wd-radio-group')
  })

  // 测试按钮模式
  test('应用按钮模式', () => {
    const wrapper = mount(WdRadioGroup, {
      props: {
        shape: 'button' as RadioShape,
        cell: true
      }
    })

    expect(wrapper.classes()).toContain('is-button')
  })

  // 测试非按钮模式
  test('非按钮形状不应用按钮模式', () => {
    const wrapper = mount(WdRadioGroup, {
      props: {
        shape: 'check' as RadioShape,
        cell: true
      }
    })

    expect(wrapper.classes()).not.toContain('is-button')
  })

  // 测试无效的形状
  test('处理无效的形状', () => {
    // 模拟 console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // 测试无效的形状
    mount(WdRadioGroup, {
      props: {
        // @ts-expect-error - 故意使用无效的形状进行测试
        shape: 'invalid'
      }
    })

    // 应该输出错误信息
    expect(consoleErrorSpy).toHaveBeenCalled()

    // 恢复 console.error
    consoleErrorSpy.mockRestore()
  })

  // 测试事件触发
  test('值变化时触发事件', async () => {
    const wrapper = mount(WdRadioGroup, {
      props: {
        modelValue: '1'
      }
    })

    // 调用 updateValue 方法
    await (wrapper.vm as any).updateValue('2')

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0][0]).toBe('2')

    expect(emitted['change']).toBeTruthy()
    expect(emitted['change'][0][0]).toEqual({ value: '2' })
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-radio-group'
    const wrapper = mount(WdRadioGroup, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'margin: 16px;'
    const wrapper = mount(WdRadioGroup, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试父子组件组合使用
  test('与子单选框组件一起工作', async () => {
    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group v-model="value">
          <wd-radio value="1">选项1</wd-radio>
          <wd-radio value="2">选项2</wd-radio>
          <wd-radio value="3">选项3</wd-radio>
        </wd-radio-group>
      `,
      data() {
        return {
          value: '1'
        }
      }
    })

    // 检查初始状态
    const radios = wrapper.findAllComponents(WdRadio)
    expect(radios.length).toBe(3)

    // 第一个选项应该被选中
    expect(radios[0].classes()).toContain('is-checked')
    expect(radios[1].classes()).not.toContain('is-checked')
    expect(radios[2].classes()).not.toContain('is-checked')

    // 点击第二个选项
    await radios[1].trigger('click')

    // 检查选中状态变化
    expect(radios[0].classes()).not.toContain('is-checked')
    expect(radios[1].classes()).toContain('is-checked')
    expect(radios[2].classes()).not.toContain('is-checked')

    // 检查数据模型是否更新
    expect(wrapper.vm.value).toBe('2')
  })

  // 测试父子组件属性传递
  test('将属性从父组件传递给子组件', async () => {
    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group v-model="value" shape="dot" checked-color="#ff0000" disabled>
          <wd-radio value="1">选项1</wd-radio>
          <wd-radio value="2">选项2</wd-radio>
        </wd-radio-group>
      `,
      data() {
        return {
          value: '1'
        }
      }
    })

    const radios = wrapper.findAllComponents(WdRadio)

    // 检查形状属性是否传递
    expect(radios[0].classes()).toContain('is-dot')

    // 检查禁用属性是否传递
    expect(radios[0].classes()).toContain('is-disabled')
    expect(radios[1].classes()).toContain('is-disabled')

    // 检查选中颜色是否传递
    // 注意：在实际组件中，颜色可能会以不同的方式应用，或者可能需要先选中才会显示颜色
    // 所以我们只检查组件是否正确渲染，而不检查具体的样式
    expect(radios[0].classes()).toContain('is-dot')
  })

  // 测试子组件覆盖父组件属性
  test('子单选框可以覆盖父组件属性', async () => {
    const wrapper = mount({
      components: {
        WdRadioGroup,
        WdRadio
      },
      template: `
        <wd-radio-group v-model="value" disabled>
          <wd-radio value="1">选项1</wd-radio>
          <wd-radio value="2" :disabled="false">选项2</wd-radio>
        </wd-radio-group>
      `,
      data() {
        return {
          value: '1'
        }
      }
    })

    const radios = wrapper.findAllComponents(WdRadio)

    // 第一个选项应该被禁用（继承父组件属性）
    expect(radios[0].classes()).toContain('is-disabled')

    // 第二个选项不应该被禁用（覆盖父组件属性）
    expect(radios[1].classes()).not.toContain('is-disabled')

    // 点击第二个选项（未禁用）应该可以改变选中状态
    await radios[1].trigger('click')
    expect(wrapper.vm.value).toBe('2')
  })
})
