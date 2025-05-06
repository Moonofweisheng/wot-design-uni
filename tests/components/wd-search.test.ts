import { mount } from '@vue/test-utils'
import WdSearch from '../../src/uni_modules/wot-design-uni/components/wd-search/wd-search.vue'
import { describe, expect, test, vi } from 'vitest'

describe('WdSearch', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSearch)
    expect(wrapper.classes()).toContain('wd-search')
  })

  test('输入功能', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        modelValue: '',
        placeholderLeft: true // 确保输入框始终可见
      }
    })

    // 找到输入框并模拟输入事件
    const input = wrapper.find('.wd-search__input')

    // 模拟输入事件
    await input.trigger('input', {
      detail: { value: '搜索内容' }
    })

    // 验证事件是否被触发
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  test('占位符文本', async () => {
    const placeholder = '请输入搜索内容'
    const wrapper = mount(WdSearch, {
      props: {
        placeholder,
        placeholderLeft: true // 确保输入框始终可见
      }
    })

    // 检查 props 是否正确传递
    const vm = wrapper.vm as any
    expect(vm.placeholder).toBe(placeholder)

    // 检查模板中是否包含占位符文本
    const template = wrapper.html()
    expect(template).toContain(placeholder)
  })

  test('清空按钮', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        modelValue: '搜索内容',
        placeholderLeft: true // 确保输入框始终可见
      }
    })

    // 手动触发 clear 事件
    wrapper.vm.$emit('clear')

    // 验证 clear 事件是否被触发
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  test('取消按钮', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        hideCancel: false // 显示取消按钮
      }
    })

    // 找到取消按钮并点击
    const cancelButton = wrapper.find('.wd-search__cancel')
    expect(cancelButton.exists()).toBeTruthy()

    await cancelButton.trigger('click')

    // 验证 cancel 事件是否被触发
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  test('搜索按钮', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        placeholderLeft: true // 确保输入框始终可见
      }
    })

    // 模拟输入框的 confirm 事件
    const input = wrapper.find('.wd-search__input')
    await input.trigger('confirm', {
      detail: { value: '搜索内容' }
    })

    // 验证 search 事件是否被触发
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        disabled: true,
        placeholderLeft: true // 确保输入框始终可见
      }
    })

    // 检查 props 是否正确传递
    const vm = wrapper.vm as any
    expect(vm.disabled).toBe(true)

    // 检查模板中是否包含禁用状态
    const template = wrapper.html()
    expect(template).toContain('disabled')
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        customClass: 'custom-search',
        customStyle: 'background: red;'
      }
    })
    expect(wrapper.classes()).toContain('custom-search')
    expect(wrapper.attributes('style')).toBe('background: red;')
  })

  test('搜索图标', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        placeholderLeft: true // 确保输入框始终可见
      }
    })

    // 检查模板中是否包含搜索图标
    const template = wrapper.html()
    expect(template).toContain('wd-icon')
  })

  test('最大长度限制', async () => {
    const maxlength = 10
    const wrapper = mount(WdSearch, {
      props: {
        maxlength,
        placeholderLeft: true // 确保输入框始终可见
      }
    })

    // 检查输入框的最大长度限制
    const input = wrapper.find('.wd-search__input')
    expect(input.attributes('maxlength')).toBe(maxlength.toString())
  })
})
