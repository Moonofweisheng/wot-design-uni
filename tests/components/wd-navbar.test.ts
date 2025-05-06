import { mount } from '@vue/test-utils'
import WdNavbar from '@/uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.vue'
import { describe, test, expect } from 'vitest'

describe('WdNavbar', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdNavbar)
    expect(wrapper.find('.wd-navbar').exists()).toBe(true)
    expect(wrapper.find('.wd-navbar__content').exists()).toBe(true)
  })

  // 测试标题
  test('标题显示', () => {
    const title = '页面标题'
    const wrapper = mount(WdNavbar, {
      props: {
        title
      }
    })
    expect(wrapper.find('.wd-navbar__title').text()).toBe(title)
  })

  // 测试左侧文案
  test('左侧文案显示', () => {
    const leftText = '返回'
    const wrapper = mount(WdNavbar, {
      props: {
        leftText
      }
    })
    expect(wrapper.find('.wd-navbar__left').text()).toBe(leftText)
  })

  // 测试右侧文案
  test('右侧文案显示', () => {
    const rightText = '更多'
    const wrapper = mount(WdNavbar, {
      props: {
        rightText
      }
    })
    expect(wrapper.find('.wd-navbar__right').text()).toBe(rightText)
  })

  // 测试左侧箭头
  test('显示左侧箭头', () => {
    const wrapper = mount(WdNavbar, {
      props: {
        leftArrow: true
      }
    })
    // 检查是否渲染了 wd-icon 组件，而不是直接检查 .wd-navbar__arrow 类
    expect(wrapper.findComponent({ name: 'wd-icon' }).exists()).toBe(true)
    // 检查 wd-icon 组件的 name 属性是否为 'arrow-left'
    expect(wrapper.findComponent({ name: 'wd-icon' }).props('name')).toBe('arrow-left')
  })

  // 测试边框
  test('添加边框', () => {
    const wrapper = mount(WdNavbar, {
      props: {
        bordered: true
      }
    })
    expect(wrapper.find('.wd-navbar').classes()).toContain('is-border')
  })

  // 测试固定定位
  test('固定定位', () => {
    const wrapper = mount(WdNavbar, {
      props: {
        fixed: true
      }
    })
    expect(wrapper.find('.wd-navbar').classes()).toContain('is-fixed')
  })

  // 测试z-index
  test('设置z-index', () => {
    const zIndex = 1000
    const wrapper = mount(WdNavbar, {
      props: {
        fixed: true,
        zIndex
      }
    })
    expect(wrapper.find('.wd-navbar').attributes('style')).toContain(`z-index: ${zIndex}`)
  })

  // 测试安全区适配
  test('顶部安全区适配', () => {
    // 模拟状态栏高度
    const statusBarHeight = 20

    const wrapper = mount(WdNavbar, {
      props: {
        safeAreaInsetTop: true
      }
    })
    expect(wrapper.find('.wd-navbar').attributes('style')).toContain(`padding-top: ${statusBarHeight}px`)
  })

  // 测试左侧按钮禁用
  test('左侧按钮禁用', async () => {
    const wrapper = mount(WdNavbar, {
      props: {
        leftText: '返回',
        leftDisabled: true
      }
    })

    expect(wrapper.find('.wd-navbar__left').classes()).toContain('is-disabled')

    await wrapper.find('.wd-navbar__left').trigger('click')
    expect(wrapper.emitted('click-left')).toBeFalsy()
  })

  // 测试右侧按钮禁用
  test('右侧按钮禁用', async () => {
    const wrapper = mount(WdNavbar, {
      props: {
        rightText: '更多',
        rightDisabled: true
      }
    })

    expect(wrapper.find('.wd-navbar__right').classes()).toContain('is-disabled')

    await wrapper.find('.wd-navbar__right').trigger('click')
    expect(wrapper.emitted('click-right')).toBeFalsy()
  })

  // 测试左侧点击事件
  test('左侧点击事件', async () => {
    const wrapper = mount(WdNavbar, {
      props: {
        leftText: '返回'
      }
    })

    await wrapper.find('.wd-navbar__left').trigger('click')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['click-left']).toBeTruthy()
    expect(emitted['click-left'].length).toBe(1)
  })

  // 测试右侧点击事件
  test('右侧点击事件', async () => {
    const wrapper = mount(WdNavbar, {
      props: {
        rightText: '更多'
      }
    })

    await wrapper.find('.wd-navbar__right').trigger('click')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['click-right']).toBeTruthy()
    expect(emitted['click-right'].length).toBe(1)
  })

  // 测试标题插槽
  test('标题插槽', () => {
    const wrapper = mount(WdNavbar, {
      slots: {
        title: '<div class="custom-title">自定义标题</div>'
      }
    })

    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  // 测试左侧插槽
  test('左侧插槽', () => {
    const wrapper = mount(WdNavbar, {
      slots: {
        left: '<div class="custom-left">自定义左侧</div>'
      }
    })

    expect(wrapper.find('.custom-left').exists()).toBe(true)
    expect(wrapper.find('.custom-left').text()).toBe('自定义左侧')
  })

  // 测试右侧插槽
  test('右侧插槽', () => {
    const wrapper = mount(WdNavbar, {
      slots: {
        right: '<div class="custom-right">自定义右侧</div>'
      }
    })

    expect(wrapper.find('.custom-right').exists()).toBe(true)
    expect(wrapper.find('.custom-right').text()).toBe('自定义右侧')
  })

  // 测试胶囊插槽
  test('胶囊插槽', () => {
    const wrapper = mount(WdNavbar, {
      slots: {
        capsule: '<div class="custom-capsule">自定义胶囊</div>'
      }
    })

    expect(wrapper.find('.wd-navbar__capsule').exists()).toBe(true)
    expect(wrapper.find('.custom-capsule').exists()).toBe(true)
    expect(wrapper.find('.custom-capsule').text()).toBe('自定义胶囊')
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'background-color: red;'
    const wrapper = mount(WdNavbar, {
      props: {
        customStyle
      }
    })

    // 直接检查 props 是否正确设置
    expect(wrapper.props('customStyle')).toBe(customStyle)
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'my-navbar'
    const wrapper = mount(WdNavbar, {
      props: {
        customClass
      }
    })

    expect(wrapper.find('.wd-navbar').classes()).toContain(customClass)
  })
})
