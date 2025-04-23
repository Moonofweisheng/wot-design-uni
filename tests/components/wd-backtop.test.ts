import { mount } from '@vue/test-utils'
import WdBacktop from '@/uni_modules/wot-design-uni/components/wd-backtop/wd-backtop.vue'
import { describe, test, expect } from 'vitest'

describe('WdBacktop', () => {
  // 测试基本渲染
  test('renders backtop with default props', () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 0
      }
    })
    expect(wrapper.classes()).toContain('wd-backtop')
  })

  // 测试滚动显示/隐藏逻辑
  test('shows/hides based on scroll position', async () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 0,
        top: 300
      }
    })
    expect(wrapper.isVisible()).toBe(false)

    await wrapper.setProps({ scrollTop: 400 })
    expect(wrapper.isVisible()).toBe(true)

    await wrapper.setProps({ scrollTop: 200 })
    expect(wrapper.isVisible()).toBe(false)
  })

  // 测试自定义图标
  test('renders custom icon content', () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400
      },
      slots: {
        default: '<text>TOP</text>'
      }
    })
    expect(wrapper.find('text').text()).toBe('TOP')
    expect(wrapper.find('.wd-backtop__backicon').exists()).toBe(false)
  })

  // 测试默认图标
  test('renders default icon when no slot content', () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400
      }
    })
    expect(wrapper.find('.wd-backtop__backicon').exists()).toBe(true)
  })

  // 测试自定义样式
  test('applies custom styles', () => {
    const customStyle = 'background: red; color: white;'
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        customStyle
      }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试自定义图标样式
  test('applies custom icon style', () => {
    const iconStyle = 'font-size: 20px;'
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        iconStyle
      }
    })
    expect(wrapper.find('.wd-backtop__backicon').attributes('custom-style')).toBe(iconStyle)
  })

  // 测试不同形状
  test('renders different shapes', () => {
    const shapes = ['circle', 'square']
    shapes.forEach((shape) => {
      const wrapper = mount(WdBacktop, {
        props: {
          scrollTop: 400,
          shape
        }
      })
      expect(wrapper.classes()).toContain(`is-${shape}`)
    })
  })

  // 测试自定义位置
  test('applies custom position', () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        bottom: 150,
        right: 30
      }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('bottom: 150px')
    expect(style).toContain('right: 30px')
  })

  // 测试自定义z-index
  test('applies custom z-index', () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        zIndex: 20
      }
    })
    expect(wrapper.attributes('style')).toContain('z-index: 20')
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
