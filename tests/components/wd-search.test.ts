import { mount } from '@vue/test-utils'
import WdSearch from '../../src/uni_modules/wot-design-uni/components/wd-search/wd-search.vue'
import { describe, expect, test } from 'vitest'

describe('WdSearch', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSearch)
    expect(wrapper.classes()).toContain('wd-search')
  })

  test('输入功能', async () => {
    const wrapper = mount(WdSearch)
    const input = wrapper.find('.wd-search__input')
    await input.setValue('搜索内容')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  test('占位符文本', async () => {
    const placeholder = '请输入搜索内容'
    const wrapper = mount(WdSearch, {
      props: {
        placeholder
      }
    })
    expect(wrapper.find('.wd-search__input').attributes('placeholder')).toBe(placeholder)
  })

  test('清空按钮', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        value: '搜索内容',
        clearable: true
      }
    })
    expect(wrapper.find('.wd-search__clear').exists()).toBeTruthy()
    await wrapper.find('.wd-search__clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  test('取消按钮', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        showCancel: true
      }
    })
    expect(wrapper.find('.wd-search__cancel').exists()).toBeTruthy()
    await wrapper.find('.wd-search__cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  test('搜索按钮', async () => {
    const wrapper = mount(WdSearch)
    await wrapper.find('.wd-search__search').trigger('click')
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdSearch, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('.wd-search__input').attributes('disabled')).toBeTruthy()
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
        hideIcon: false
      }
    })
    expect(wrapper.find('.wd-search__icon').exists()).toBeTruthy()
  })

  test('最大长度限制', async () => {
    const maxlength = 10
    const wrapper = mount(WdSearch, {
      props: {
        maxlength
      }
    })
    expect(wrapper.find('.wd-search__input').attributes('maxlength')).toBe(maxlength.toString())
  })
})
