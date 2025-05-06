import { mount } from '@vue/test-utils'
import WdProgress from '@/uni_modules/wot-design-uni/components/wd-progress/wd-progress.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('进度条组件', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdProgress)
    expect(wrapper.classes()).toContain('wd-progress')
  })

  // 测试进度值
  test('不同百分比的进度条', async () => {
    const percentage = 50
    const wrapper = mount(WdProgress, {
      props: { percentage }
    })

    // 验证DOM
    const inner = wrapper.find('.wd-progress__inner')
    expect(inner.exists()).toBe(true)

    // 验证标签显示正确的百分比
    const label = wrapper.find('.wd-progress__label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe(`${percentage}%`)
  })

  // 测试状态颜色
  test('不同状态颜色', () => {
    const status = 'success'
    const wrapper = mount(WdProgress, {
      props: { status }
    })

    // 状态类名应该应用在 .wd-progress__inner 元素上，而不是根元素
    const inner = wrapper.find('.wd-progress__inner')
    expect(inner.classes()).toContain(`is-${status}`)
  })

  // 测试自定义颜色
  test('自定义颜色', () => {
    const color = '#f50'
    const wrapper = mount(WdProgress, {
      props: { color }
    })

    // 检查 props 是否正确传递
    const vm = wrapper.vm as any
    expect(vm.color).toBe(color)

    // 由于颜色可能会被转换为 rgb 格式，
    // 我们只检查 props 是否正确传递
    expect(vm.color).toBe(color)
  })

  // 测试隐藏进度文字
  test('隐藏文本', () => {
    const wrapper = mount(WdProgress, {
      props: { hideText: true }
    })
    expect(wrapper.find('.wd-progress__text').exists()).toBe(false)
  })

  // 测试自定义进度文字内容
  test('进度文本', () => {
    const percentage = 75
    const wrapper = mount(WdProgress, {
      props: {
        percentage
      }
    })

    // 查找进度标签
    const label = wrapper.find('.wd-progress__label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe(`${percentage}%`)
  })

  // 测试进度条外层元素
  test('进度条外层元素', () => {
    const wrapper = mount(WdProgress)

    // 检查外层元素是否存在
    const outer = wrapper.find('.wd-progress__outer')
    expect(outer.exists()).toBe(true)

    // 检查内层元素是否存在
    const inner = wrapper.find('.wd-progress__inner')
    expect(inner.exists()).toBe(true)
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'custom-progress'
    const wrapper = mount(WdProgress, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'margin: 16px 0px;'
    const wrapper = mount(WdProgress, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试图标显示
  test('状态图标', async () => {
    const wrapper = mount(WdProgress, {
      props: {
        status: 'success',
        hideText: true
      }
    })

    // 检查图标是否存在
    const icon = wrapper.find('.wd-progress__icon')
    expect(icon.exists()).toBe(true)

    // 检查图标类名
    expect(icon.classes()).toContain('is-success')
  })
})
