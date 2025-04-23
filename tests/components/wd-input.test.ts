import { mount } from '@vue/test-utils'
import WdInput from '@/uni_modules/wot-design-uni/components/wd-input/wd-input.vue'
import { describe, test, expect } from 'vitest'
import { InputType } from '@/uni_modules/wot-design-uni/components/wd-input/types'

describe('WdInput', () => {
  // 测试基本渲染
  test('renders input with default props', () => {
    const wrapper = mount(WdInput)
    expect(wrapper.classes()).toContain('wd-input')
  })

  // 测试输入值
  test('handles input value', async () => {
    const value = 'test input'
    const wrapper = mount(WdInput, {
      props: {
        modelValue: value
      }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe(value)

    await input.setValue('new value')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  // 测试输入类型
  test('renders different input types', () => {
    const types: InputType[] = ['text', 'number', 'digit', 'idcard', 'safe-password', 'nickname', 'tel']
    types.forEach((type) => {
      const wrapper = mount(WdInput, {
        props: { type }
      })
      expect(wrapper.find('input').attributes('type')).toBe(type)
    })
  })

  // 测试禁用状态
  test('renders disabled state', () => {
    const wrapper = mount(WdInput, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })

  // 测试只读状态
  test('renders readonly state', () => {
    const wrapper = mount(WdInput, {
      props: { readonly: true }
    })
    expect(wrapper.classes()).toContain('is-readonly')
    expect(wrapper.find('input').attributes('readonly')).toBe('')
  })

  // 测试清空功能
  test('handles clear functionality', async () => {
    const wrapper = mount(WdInput, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })

    // 显示清空按钮
    await wrapper.find('input').trigger('focus')
    expect(wrapper.find('.wd-input__clear').exists()).toBe(true)

    // 点击清空
    await wrapper.find('.wd-input__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  // 测试不同清空触发模式
  test('handles different clear trigger modes', async () => {
    // 测试 focus 模式
    const wrapperFocus = mount(WdInput, {
      props: {
        modelValue: 'test',
        clearable: true,
        clearTrigger: 'focus'
      }
    })

    // 聚焦时显示清空按钮
    await wrapperFocus.find('input').trigger('focus')
    expect(wrapperFocus.find('.wd-input__clear').exists()).toBe(true)

    // 失焦时隐藏清空按钮
    await wrapperFocus.find('input').trigger('blur')
    await new Promise((resolve) => setTimeout(resolve, 200)) // 等待失焦处理完成
    expect(wrapperFocus.find('.wd-input__clear').exists()).toBe(false)

    // 测试 always 模式
    const wrapperAlways = mount(WdInput, {
      props: {
        modelValue: 'test',
        clearable: true,
        clearTrigger: 'always'
      }
    })

    // 不聚焦也显示清空按钮
    expect(wrapperAlways.find('.wd-input__clear').exists()).toBe(true)
  })

  // 测试最大长度
  test('handles maxlength', async () => {
    const wrapper = mount(WdInput, {
      props: {
        maxlength: 5,
        showWordCount: true
      }
    })

    await wrapper.find('input').setValue('123456')
    expect((wrapper.emitted('update:modelValue')?.[0][0] as string).length).toBe(5)
    expect(wrapper.find('.wd-input__count').text()).toBe('5/5')
  })

  // 测试前置/后置内容
  test('renders prefix and suffix content', () => {
    const wrapper = mount(WdInput, {
      slots: {
        prefix: '<span class="prefix-content">¥</span>',
        suffix: '<span class="suffix-content">元</span>'
      }
    })
    expect(wrapper.find('.prefix-content').exists()).toBe(true)
    expect(wrapper.find('.suffix-content').exists()).toBe(true)
  })

  // 测试错误状态
  test('renders error state', () => {
    const wrapper = mount(WdInput, {
      props: {
        error: true,
        errorMessage: '输入有误'
      }
    })
    expect(wrapper.classes()).toContain('is-error')
    expect(wrapper.find('.wd-input__error-message').text()).toBe('输入有误')
  })

  // 测试密码可见切换
  test('handles password visibility toggle', async () => {
    const wrapper = mount(WdInput, {
      props: {
        type: 'safe-password',
        showPassword: true
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('password')

    await wrapper.find('.wd-input__suffix .wd-input__icon').trigger('click')
    expect(input.attributes('type')).toBe('text')
  })

  // 测试自动获取焦点
  test('handles autofocus', () => {
    const wrapper = mount(WdInput, {
      props: { autofocus: true }
    })
    expect(wrapper.find('input').attributes('autofocus')).toBe('')
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-input'
    const wrapper = mount(WdInput, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'width: 300px;'
    const wrapper = mount(WdInput, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试输入事件
  test('emits input events', async () => {
    const wrapper = mount(WdInput)
    const input = wrapper.find('input')

    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await input.setValue('test')
    expect(wrapper.emitted('input')).toBeTruthy()

    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  // 测试输入值格式化
  test('handles input formatter', async () => {
    const wrapper = mount(WdInput, {
      props: {
        modelValue: '',
        formatter: (value: string) => value.toUpperCase()
      }
    })

    await wrapper.find('input').setValue('test')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['TEST'])
  })

  // 测试占位符样式
  test('applies placeholder style', () => {
    const placeholderStyle = 'color: red; font-size: 14px;'
    const wrapper = mount(WdInput, {
      props: { placeholderStyle }
    })
    expect(wrapper.find('input').attributes('placeholder-style')).toBe(placeholderStyle)
  })

  // 测试对齐方式
  test('applies right alignment', () => {
    const wrapper = mount(WdInput, {
      props: { alignRight: true }
    })
    expect(wrapper.find('.wd-input__inner').classes()).toContain('is-align-right')
  })

  // 测试标签宽度
  test('applies label width', () => {
    const labelWidth = '100px'
    const wrapper = mount(WdInput, {
      props: {
        label: '标签',
        labelWidth
      }
    })
    expect(wrapper.find('.wd-input__label').attributes('style')).toContain(`min-width: ${labelWidth}`)
  })

  // 测试必填状态
  test('renders required state', () => {
    const wrapper = mount(WdInput, {
      props: {
        label: '标签',
        required: true
      }
    })
    expect(wrapper.find('.wd-input__label').classes()).toContain('is-required')
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdInput)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试前缀图标点击事件
  test('emits prefix icon click event', async () => {
    const wrapper = mount(WdInput, {
      props: {
        prefixIcon: 'search'
      }
    })
    await wrapper.find('.wd-input__prefix .wd-input__icon').trigger('click')
    expect(wrapper.emitted('clickprefixicon')).toBeTruthy()
  })

  // 测试后缀图标点击事件
  test('emits suffix icon click event', async () => {
    const wrapper = mount(WdInput, {
      props: {
        suffixIcon: 'search'
      }
    })
    await wrapper.find('.wd-input__suffix .wd-input__icon').trigger('click')
    expect(wrapper.emitted('clicksuffixicon')).toBeTruthy()
  })

  // 测试确认按钮
  test('emits confirm event', async () => {
    const wrapper = mount(WdInput, {
      props: {
        confirmType: 'search'
      }
    })
    await wrapper.find('input').trigger('confirm')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })
})
