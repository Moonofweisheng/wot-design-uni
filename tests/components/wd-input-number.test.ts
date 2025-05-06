import { mount } from '@vue/test-utils'
import WdInputNumber from '@/uni_modules/wot-design-uni/components/wd-input-number/wd-input-number.vue'
import { describe, test, expect } from 'vitest'

describe('WdInputNumber', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 1
      }
    })
    expect(wrapper.classes()).toContain('wd-input-number')
    expect(wrapper.find('.wd-input-number__input').exists()).toBe(true)
    expect(wrapper.findAll('.wd-input-number__action').length).toBe(2)
  })

  // 测试输入值
  test('显示正确的值', async () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 5
      }
    })
    // 使用 attributes 代替直接访问 element.value
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('5')

    await wrapper.setProps({ modelValue: 10 })
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('10')
  })

  // 测试最小值限制
  test('最小值限制', async () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 5,
        min: 3
      }
    })

    // 点击减号按钮两次，值应该变为3
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')

    // 检查是否发出了正确的事件
    const emitted = wrapper.emitted('update:modelValue') as Array<any[]>
    expect(emitted).toBeTruthy()
    expect(emitted[emitted.length - 1]).toEqual([3])

    // 当值等于最小值时，减号按钮应该被禁用
    expect(wrapper.findAll('.wd-input-number__action')[0].classes()).toContain('is-disabled')
  })

  // 测试最大值限制
  test('最大值限制', async () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 8,
        max: 10
      }
    })

    // 点击加号按钮两次，值应该变为10
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')

    // 检查是否发出了正确的事件
    const emitted = wrapper.emitted('update:modelValue') as Array<any[]>
    expect(emitted).toBeTruthy()
    expect(emitted[emitted.length - 1]).toEqual([10])

    // 当值等于最大值时，加号按钮应该被禁用
    expect(wrapper.findAll('.wd-input-number__action')[1].classes()).toContain('is-disabled')
  })

  // 测试步进值
  test('按步进值增减', async () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 5,
        step: 2
      }
    })

    // 点击加号按钮，值应该增加2
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    let emitted = wrapper.emitted('update:modelValue') as Array<any[]>
    expect(emitted).toBeTruthy()
    expect(emitted[emitted.length - 1]).toEqual([7])

    // 点击减号按钮，值应该减少2
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    emitted = wrapper.emitted('update:modelValue') as Array<any[]>
    expect(emitted[emitted.length - 1]).toEqual([5])
  })

  // 测试精度
  test('精度设置', async () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 1,
        step: 0.1,
        precision: 2
      }
    })

    // 点击加号按钮，值应该增加0.1并保持2位小数精度
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    const emitted = wrapper.emitted('update:modelValue') as Array<any[]>
    expect(emitted).toBeTruthy()
    expect(emitted[emitted.length - 1]).toEqual([1.1])
  })

  // 测试禁用状态
  test('禁用组件', async () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 5,
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('is-disabled')
    // 使用 attributes 代替直接访问 element.disabled
    expect(wrapper.find('.wd-input-number__input').attributes('disabled')).toBe('')

    // 点击按钮不应该改变值
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // 测试禁用输入
  test('仅禁用输入', async () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 5,
        disableInput: true
      }
    })

    // 使用 attributes 代替直接访问 element.disabled
    expect(wrapper.find('.wd-input-number__input').attributes('disabled')).toBe('')

    // 按钮应该仍然可用
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // 测试禁用加号按钮
  test('禁用加号按钮', async () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 5,
        disablePlus: true
      }
    })

    expect(wrapper.findAll('.wd-input-number__action')[1].classes()).toContain('is-disabled')

    // 点击加号按钮不应该改变值
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    // 减号按钮应该仍然可用
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // 测试禁用减号按钮
  test('禁用减号按钮', async () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 5,
        disableMinus: true
      }
    })

    expect(wrapper.findAll('.wd-input-number__action')[0].classes()).toContain('is-disabled')

    // 点击减号按钮不应该改变值
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    // 加号按钮应该仍然可用
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // 测试不显示输入框
  test('隐藏输入框', () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 5,
        withoutInput: true
      }
    })

    expect(wrapper.classes()).toContain('is-without-input')
    expect(wrapper.find('.wd-input-number__input').exists()).toBe(false)
  })

  // 测试输入框宽度
  test('设置输入框宽度', () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 5,
        inputWidth: 100
      }
    })

    // 只检查组件是否正确渲染，不检查具体样式
    expect(wrapper.find('.wd-input-number__input').exists()).toBe(true)
  })

  // 测试输入框占位符
  test('显示占位符', () => {
    const placeholder = '请输入'
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: '',
        allowNull: true,
        placeholder
      }
    })

    expect(wrapper.find('.wd-input-number__input').attributes('placeholder')).toBe(placeholder)
  })

  // 测试焦点事件
  test('触发焦点和失焦事件', async () => {
    const wrapper = mount(WdInputNumber, {
      props: {
        modelValue: 5
      }
    })

    await wrapper.find('.wd-input-number__input').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await wrapper.find('.wd-input-number__input').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })
})
