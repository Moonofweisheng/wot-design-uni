import { mount } from '@vue/test-utils'
import WdTextarea from '@/uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.vue'
import { describe, test, expect } from 'vitest'

describe('WdTextarea', () => {
  // 测试基本渲染
  test('renders textarea with default props', () => {
    const wrapper = mount(WdTextarea)
    expect(wrapper.classes()).toContain('wd-textarea')
  })

  // 测试文本输入值
  test('handles textarea value', async () => {
    const value = 'test content'
    const wrapper = mount(WdTextarea, {
      props: {
        modelValue: value
      }
    })
    const textarea = wrapper.find('textarea')
    expect(textarea.element.value).toBe(value)

    await textarea.setValue('new content')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new content'])
  })

  // 测试禁用状态
  test('renders disabled state', () => {
    const wrapper = mount(WdTextarea, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('textarea').attributes('disabled')).toBe('')
  })

  // 测试只读状态
  test('renders readonly state', () => {
    const wrapper = mount(WdTextarea, {
      props: { readonly: true }
    })
    expect(wrapper.classes()).toContain('is-readonly')
    expect(wrapper.find('textarea').attributes('readonly')).toBe('')
  })

  // 测试最大长度和字数统计
  test('handles maxlength and word count', async () => {
    const wrapper = mount(WdTextarea, {
      props: {
        maxlength: 50,
        showWordCount: true
      }
    })

    const textarea = wrapper.find('textarea')
    await textarea.setValue('test content')
    expect(wrapper.find('.wd-textarea__count').text()).toBe('12/50')
  })

  // 测试自动高度
  test('handles autosize', async () => {
    const wrapper = mount(WdTextarea, {
      props: {
        autosize: true,
        modelValue: 'Line 1\nLine 2\nLine 3'
      }
    })

    expect(wrapper.classes()).toContain('is-autosize')
  })

  // 测试自定义行高
  test('renders with custom rows', () => {
    const rows = 5
    const wrapper = mount(WdTextarea, {
      props: { rows }
    })
    expect(wrapper.find('textarea').attributes('rows')).toBe(rows.toString())
  })

  // 测试占位文本
  test('renders placeholder', () => {
    const placeholder = '请输入内容'
    const wrapper = mount(WdTextarea, {
      props: { placeholder }
    })
    expect(wrapper.find('textarea').attributes('placeholder')).toBe(placeholder)
  })

  // 测试输入事件
  test('emits textarea events', async () => {
    const wrapper = mount(WdTextarea)
    const textarea = wrapper.find('textarea')

    await textarea.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await textarea.setValue('test input')
    expect(wrapper.emitted('input')).toBeTruthy()

    await textarea.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-textarea'
    const wrapper = mount(WdTextarea, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'height: 200px;'
    const wrapper = mount(WdTextarea, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试错误状态
  test('renders error state', () => {
    const errorMessage = '输入内容有误'
    const wrapper = mount(WdTextarea, {
      props: {
        error: true,
        errorMessage
      }
    })
    expect(wrapper.classes()).toContain('is-error')
    expect(wrapper.find('.wd-textarea__error-message').text()).toBe(errorMessage)
  })

  // 测试自动聚焦
  test('handles autofocus', () => {
    const wrapper = mount(WdTextarea, {
      props: { autofocus: true }
    })
    expect(wrapper.find('textarea').attributes('autofocus')).toBe('')
  })

  // 测试自定义高度范围
  test('handles autosize with min and max height', () => {
    const wrapper = mount(WdTextarea, {
      props: {
        autosize: {
          minHeight: '100px',
          maxHeight: '200px'
        }
      }
    })
    expect(wrapper.find('textarea').attributes('style')).toContain('min-height: 100px')
    expect(wrapper.find('textarea').attributes('style')).toContain('max-height: 200px')
  })
})
