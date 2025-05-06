import { mount } from '@vue/test-utils'
import WdPagination from '@/uni_modules/wot-design-uni/components/wd-pagination/wd-pagination.vue'
import { describe, test, expect, vi } from 'vitest'

describe('WdPagination', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 1,
        totalPage: 10
      }
    })
    expect(wrapper.find('.wd-pager').exists()).toBe(true)
    expect(wrapper.find('.wd-pager__content').exists()).toBe(true)
    expect(wrapper.find('.wd-pager__current').text()).toBe('1')
  })

  // 测试当前页显示
  test('当前页显示', async () => {
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 5,
        totalPage: 10
      }
    })
    expect(wrapper.find('.wd-pager__current').text()).toBe('5')

    await wrapper.setProps({ modelValue: 7 })
    expect(wrapper.find('.wd-pager__current').text()).toBe('7')
  })

  // 测试总页数计算
  test('总页数计算', async () => {
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 1,
        total: 100,
        pageSize: 20
      }
    })

    // 验证总页数显示
    expect(wrapper.find('.wd-pager__size').exists()).toBe(true)
  })

  // 测试文本模式
  test('文本模式显示', () => {
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 1,
        totalPage: 10,
        showIcon: false
      }
    })

    // 验证没有图标类
    expect(wrapper.findAll('.wd-pager__icon').length).toBe(0)
  })

  // 测试自定义上一页/下一页文本
  test('自定义上一页/下一页文本', () => {
    const prevText = '上页'
    const nextText = '下页'

    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 1,
        totalPage: 10,
        prevText,
        nextText,
        showIcon: false
      }
    })

    // 验证按钮文本
    const buttons = wrapper.findAll('.wd-button')
    expect(buttons[0].text()).toBe(prevText)
    expect(buttons[1].text()).toBe(nextText)
  })

  // 测试显示分页信息
  test('显示分页信息', () => {
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 2,
        totalPage: 10,
        total: 100,
        pageSize: 10,
        showMessage: true
      }
    })

    expect(wrapper.find('.wd-pager__message').exists()).toBe(true)
    const message = wrapper.find('.wd-pager__message').text()
    expect(message.length).toBeGreaterThan(0)
  })

  // 测试隐藏分页信息
  test('隐藏分页信息', () => {
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 1,
        totalPage: 10,
        showMessage: false
      }
    })

    expect(wrapper.find('.wd-pager__message').exists()).toBe(false)
  })

  // 测试只有一页时显示
  test('只有一页时的显示', () => {
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 1,
        totalPage: 1,
        hideIfOnePage: false
      }
    })

    expect(wrapper.find('.wd-pager').exists()).toBe(true)
  })

  // 测试点击上一页
  test('点击上一页按钮', async () => {
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 5,
        totalPage: 10
      }
    })

    const prevButton = wrapper.findAll('.wd-button')[0]
    await prevButton.trigger('click')

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0]).toEqual([4])

    expect(emitted['change']).toBeTruthy()
    expect(emitted['change'][0][0]).toEqual({ value: 4 })
  })

  // 测试在第一页点击上一页不触发事件
  test('第一页点击上一页不触发事件', async () => {
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 1,
        totalPage: 10
      }
    })

    const prevButton = wrapper.findAll('.wd-button')[0]
    await prevButton.trigger('click')

    // 不应该触发事件
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  // 测试在最后一页点击下一页不触发事件
  test('最后一页点击下一页不触发事件', async () => {
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 10,
        totalPage: 10
      }
    })

    const nextButton = wrapper.findAll('.wd-button')[1]
    await nextButton.trigger('click')

    // 不应该触发事件
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'my-pagination'
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 1,
        totalPage: 10,
        customClass
      }
    })

    expect(wrapper.find('.wd-pager').classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'background-color: red;'
    const wrapper = mount(WdPagination, {
      props: {
        modelValue: 1,
        totalPage: 10,
        customStyle
      }
    })

    expect(wrapper.find('.wd-pager').attributes('style')).toBe(customStyle)
  })
})
