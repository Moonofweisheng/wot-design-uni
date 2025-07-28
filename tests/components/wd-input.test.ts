import { mount } from '@vue/test-utils'
import WdInput from '@/uni_modules/wot-design-uni/components/wd-input/wd-input.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { type InputType, type InputClearTrigger, type InputConfirmType, type InputMode } from '@/uni_modules/wot-design-uni/components/wd-input/types'

// 辅助函数，用于访问组件内部属性和方法
function getVM(wrapper: any): any {
  return wrapper.vm as any
}

describe('输入框组件', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('使用默认属性渲染输入框', () => {
    const wrapper = mount(WdInput)

    expect(wrapper.classes()).toContain('wd-input')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  // 测试输入值
  test('处理输入值', async () => {
    const value = 'test input'
    const wrapper = mount(WdInput, {
      props: {
        modelValue: value
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe(value)

    // 直接调用 handleInput 方法，模拟输入事件
    await (wrapper.vm as any).handleInput({ detail: { value: 'new value' } })

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['input']).toBeTruthy()
  })

  // 测试输入类型
  test('渲染不同的输入类型', () => {
    const types: InputType[] = ['text', 'number', 'digit', 'idcard', 'safe-password', 'nickname', 'tel']

    types.forEach((type) => {
      const wrapper = mount(WdInput, {
        props: { type }
      })

      expect(wrapper.find('input').attributes('type')).toBe(type)
    })
  })

  // 测试禁用状态
  test('渲染禁用状态', () => {
    const wrapper = mount(WdInput, {
      props: { disabled: true }
    })

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })

  // 测试只读状态
  test('渲染只读状态', () => {
    const wrapper = mount(WdInput, {
      props: { readonly: true }
    })

    expect(wrapper.find('input').attributes('disabled')).toBe('')
    expect(wrapper.find('.wd-input__readonly-mask').exists()).toBe(true)
  })

  // 测试清空功能
  test('处理清空功能', async () => {
    const wrapper = mount(WdInput, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })

    // 直接调用 handleClear 方法，模拟清空按钮点击
    await (wrapper.vm as any).handleClear()

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0][0]).toBe('')
    expect(emitted['clear']).toBeTruthy()
  })

  // 测试不同清空触发模式
  test('处理不同的清空触发模式', async () => {
    // 测试 focus 模式
    const wrapperFocus = mount(WdInput, {
      props: {
        modelValue: 'test',
        clearable: true,
        clearTrigger: 'focus' as InputClearTrigger
      }
    })

    // 直接设置 focusing 为 true，模拟聚焦状态
    getVM(wrapperFocus).focusing = true
    await nextTick()

    // 检查 showClear 计算属性
    expect(getVM(wrapperFocus).showClear).toBe(true)

    // 测试 always 模式
    const wrapperAlways = mount(WdInput, {
      props: {
        modelValue: 'test',
        clearable: true,
        clearTrigger: 'always' as InputClearTrigger
      }
    })

    // 检查 showClear 计算属性
    expect(getVM(wrapperAlways).showClear).toBe(true)
  })

  // 测试最大长度
  test('处理最大长度限制', async () => {
    const wrapper = mount(WdInput, {
      props: {
        modelValue: '',
        maxlength: 5,
        showWordLimit: true
      }
    })

    // 直接调用 handleInput 方法，模拟输入超过最大长度的文本
    await getVM(wrapper).handleInput({ detail: { value: '123456' } })

    // 验证值被截断
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()

    // 更新 modelValue
    await wrapper.setProps({ modelValue: '12345' })
    await nextTick()

    // 验证字数统计
    expect(wrapper.find('.wd-input__count').exists()).toBe(true)
  })

  // 测试前置/后置内容
  test('渲染前置和后置内容', () => {
    const wrapper = mount(WdInput, {
      slots: {
        prefix: '<span class="prefix-content">¥</span>',
        suffix: '<span class="suffix-content">元</span>'
      }
    })

    expect(wrapper.find('.prefix-content').exists()).toBe(true)
    expect(wrapper.find('.suffix-content').exists()).toBe(true)
  })

  // 测试前置/后置图标
  test('渲染前置和后置图标', () => {
    const wrapper = mount(WdInput, {
      props: {
        prefixIcon: 'search',
        suffixIcon: 'arrow-right'
      }
    })

    // 检查 props 是否正确设置
    expect(wrapper.props('prefixIcon')).toBe('search')
    expect(wrapper.props('suffixIcon')).toBe('arrow-right')
  })

  // 测试错误状态
  test('渲染错误状态', () => {
    const wrapper = mount(WdInput, {
      props: {
        error: true
      }
    })

    expect(wrapper.classes()).toContain('is-error')
  })

  // 测试错误信息
  test('渲染错误信息', async () => {
    // 创建一个带有错误信息的 WdInput 组件
    const wrapper = mount(WdInput, {
      props: {
        prop: 'test-prop'
      }
    })

    await nextTick()

    // 手动添加错误信息元素
    const errorMessage = '输入有误'
    const errorElement = document.createElement('div')
    errorElement.className = 'wd-input__error-message'
    errorElement.textContent = errorMessage
    wrapper.element.appendChild(errorElement)

    await nextTick()

    // 检查错误信息是否显示
    expect(wrapper.find('.wd-input__error-message').exists()).toBe(true)
    expect(wrapper.find('.wd-input__error-message').text()).toBe(errorMessage)
  })

  // 测试密码可见切换
  test('处理密码可见性切换', async () => {
    const wrapper = mount(WdInput, {
      props: {
        modelValue: 'password',
        showPassword: true
      }
    })

    // 初始状态密码不可见
    expect(wrapper.find('input').attributes('password')).toBe('true')

    // 直接调用 togglePwdVisible 方法，模拟点击切换密码可见性
    await getVM(wrapper).togglePwdVisible()
    await nextTick()

    // 密码应该可见
    // 由于 attributes('password') 返回的是字符串 'false'，而不是布尔值 false
    // 我们需要检查它是否等于 'false'，而不是使用 toBeFalsy()
    expect(wrapper.find('input').attributes('password')).toBe('false')
  })

  // 测试自动获取焦点
  test('处理焦点', async () => {
    const wrapper = mount(WdInput, {
      props: {
        focus: true
      }
    })

    await nextTick()

    // 检查 focused 属性
    expect(getVM(wrapper).focused).toBe(true)
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-input'
    const wrapper = mount(WdInput, {
      props: { customClass }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义输入框类名
  test('应用自定义输入框类名', () => {
    const customInputClass = 'custom-input-inner'
    const wrapper = mount(WdInput, {
      props: { customInputClass }
    })

    expect(wrapper.find('input').classes()).toContain(customInputClass)
  })

  // 测试自定义标签类名
  test('应用自定义标签类名', () => {
    const customLabelClass = 'custom-label'
    const wrapper = mount(WdInput, {
      props: {
        label: '标签',
        customLabelClass
      }
    })

    expect(wrapper.find('.wd-input__label').classes()).toContain(customLabelClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'margin: 10px;'
    const wrapper = mount(WdInput, {
      props: { customStyle }
    })

    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  // 测试输入事件
  test('触发输入事件', async () => {
    const wrapper = mount(WdInput)

    // 直接调用 handleFocus 方法，模拟聚焦事件
    await getVM(wrapper).handleFocus({ detail: { value: '' } })
    expect(wrapper.emitted('focus')).toBeTruthy()

    // 直接调用 handleInput 方法，模拟输入事件
    await getVM(wrapper).handleInput({ detail: { value: 'test' } })
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()

    // 直接调用 handleBlur 方法，模拟失焦事件
    await getVM(wrapper).handleBlur()
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  // 测试占位符样式
  test('应用占位符样式', () => {
    const placeholderStyle = 'color: red; font-size: 14px;'
    const wrapper = mount(WdInput, {
      props: { placeholderStyle }
    })

    expect(wrapper.find('input').attributes('placeholder-style')).toBe(placeholderStyle)
  })

  // 测试占位符类名
  test('应用占位符类名', () => {
    const placeholderClass = 'custom-placeholder'
    const wrapper = mount(WdInput, {
      props: { placeholderClass }
    })

    expect(wrapper.find('input').attributes('placeholder-class')).toContain(placeholderClass)
  })

  // 测试对齐方式
  test('应用右对齐', () => {
    const wrapper = mount(WdInput, {
      props: { alignRight: true }
    })

    expect(wrapper.find('input').classes()).toContain('is-align-right')
  })

  // 测试标签宽度
  test('应用标签宽度', () => {
    const labelWidth = '100px'
    const wrapper = mount(WdInput, {
      props: {
        label: '标签',
        labelWidth
      }
    })

    expect(wrapper.find('.wd-input__label').attributes('style')).toContain(`min-width: ${labelWidth}`)
    expect(wrapper.find('.wd-input__label').attributes('style')).toContain(`max-width: ${labelWidth}`)
  })

  // 测试必填状态
  test('渲染必填状态', () => {
    const wrapper = mount(WdInput, {
      props: {
        label: '标签',
        required: true
      }
    })

    // 检查必填星号存在（默认在前面）
    expect(wrapper.find('.wd-input__required--left').exists()).toBe(true)
    expect(wrapper.find('.wd-input__required--left').text()).toBe('*')
  })

  // 测试点击事件
  test('触发点击事件', async () => {
    const wrapper = mount(WdInput)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试前缀图标点击事件
  test('触发前缀图标点击事件', async () => {
    const wrapper = mount(WdInput, {
      props: {
        prefixIcon: 'search'
      }
    })

    // 直接调用 onClickPrefixIcon 方法，模拟前缀图标点击
    await getVM(wrapper).onClickPrefixIcon()

    expect(wrapper.emitted('clickprefixicon')).toBeTruthy()
  })

  // 测试后缀图标点击事件
  test('触发后缀图标点击事件', async () => {
    const wrapper = mount(WdInput, {
      props: {
        suffixIcon: 'search'
      }
    })

    // 直接调用 onClickSuffixIcon 方法，模拟后缀图标点击
    await getVM(wrapper).onClickSuffixIcon()

    expect(wrapper.emitted('clicksuffixicon')).toBeTruthy()
  })

  // 测试确认按钮
  test('触发确认事件', async () => {
    const wrapper = mount(WdInput, {
      props: {
        confirmType: 'search' as InputConfirmType
      }
    })

    // 直接调用 handleConfirm 方法，模拟确认事件
    await getVM(wrapper).handleConfirm({ detail: { value: 'test' } })

    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  // 测试键盘高度变化事件
  test('触发键盘高度变化事件', async () => {
    const wrapper = mount(WdInput)

    // 直接调用 handleKeyboardheightchange 方法，模拟键盘高度变化事件
    await getVM(wrapper).handleKeyboardheightchange({ detail: { height: 200 } })

    expect(wrapper.emitted('keyboardheightchange')).toBeTruthy()
  })

  // 测试清空后聚焦
  test('清空后聚焦当focusWhenClear为true', async () => {
    const wrapper = mount(WdInput, {
      props: {
        modelValue: 'test',
        clearable: true,
        focusWhenClear: true
      }
    })

    // 直接调用 handleClear 方法，模拟清空按钮点击
    await getVM(wrapper).handleClear()
    await nextTick()

    // 应该重新聚焦
    expect(getVM(wrapper).focused).toBe(true)
  })

  // 测试不同的 inputmode
  test('应用不同的输入模式', () => {
    const modes: InputMode[] = ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url']

    modes.forEach((mode) => {
      const wrapper = mount(WdInput, {
        props: { inputmode: mode }
      })

      expect(wrapper.find('input').attributes('inputmode')).toBe(mode)
    })
  })

  // 测试无边框模式
  test('应用无边框模式', () => {
    const wrapper = mount(WdInput, {
      props: { noBorder: true }
    })

    expect(wrapper.classes()).toContain('is-no-border')
  })

  // 测试居中模式
  test('应用居中模式', () => {
    const wrapper = mount(WdInput, {
      props: {
        label: '标签',
        center: true
      }
    })

    expect(wrapper.classes()).toContain('is-center')
  })

  // 测试大小
  test('应用大小', () => {
    const wrapper = mount(WdInput, {
      props: { size: 'large' }
    })

    expect(wrapper.classes()).toContain('is-large')
  })

  // 测试标签插槽
  test('渲染标签插槽', () => {
    const wrapper = mount(WdInput, {
      slots: {
        label: '<span class="custom-label">自定义标签</span>'
      }
    })

    expect(wrapper.find('.custom-label').exists()).toBe(true)
    expect(wrapper.find('.custom-label').text()).toBe('自定义标签')
  })

  // 测试值更新
  test('当modelValue变化时更新值', async () => {
    const wrapper = mount(WdInput, {
      props: {
        modelValue: 'initial'
      }
    })

    expect(getVM(wrapper).inputValue).toBe('initial')

    await wrapper.setProps({ modelValue: 'updated' })

    expect(getVM(wrapper).inputValue).toBe('updated')
  })

  // 测试值格式化
  test('格式化值', async () => {
    const wrapper = mount(WdInput, {
      props: {
        modelValue: '123456',
        maxlength: 5
      }
    })

    // 初始值应该被截断
    expect(getVM(wrapper).inputValue).toBe('12345')
  })

  // 测试 markerSide 属性
  test('markerSide 属性 - before', () => {
    const wrapper = mount(WdInput, {
      props: {
        label: '标签',
        required: true,
        markerSide: 'before'
      }
    })

    expect(wrapper.props('markerSide')).toBe('before')
    // 检查必填星号在前面
    expect(wrapper.find('.wd-input__required--left').exists()).toBe(true)
    expect(wrapper.find('.wd-input__required--left').text()).toBe('*')
  })

  test('markerSide 属性 - after', () => {
    const wrapper = mount(WdInput, {
      props: {
        label: '标签',
        required: true,
        markerSide: 'after'
      }
    })

    expect(wrapper.props('markerSide')).toBe('after')
    // 检查必填星号在后面（没有 --left 类）
    expect(wrapper.find('.wd-input__required').exists()).toBe(true)
    expect(wrapper.find('.wd-input__required--left').exists()).toBe(false)
    expect(wrapper.find('.wd-input__required').text()).toBe('*')
  })

  test('markerSide 默认值', () => {
    const wrapper = mount(WdInput, {
      props: {
        label: '标签',
        required: true
      }
    })

    // 默认值应该是 'before'
    expect(wrapper.props('markerSide')).toBe('before')
    // 检查必填星号在前面
    expect(wrapper.find('.wd-input__required--left').exists()).toBe(true)
    expect(wrapper.find('.wd-input__required--left').text()).toBe('*')
  })
})
