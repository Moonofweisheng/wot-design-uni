import { mount } from '@vue/test-utils'
import WdAvatar from '@/uni_modules/wot-design-uni/components/wd-avatar/wd-avatar.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import WdImg from '@/uni_modules/wot-design-uni/components/wd-img/wd-img.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('WdAvatar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染 - 默认属性', () => {
    const wrapper = mount(WdAvatar)

    expect(wrapper.classes()).toContain('wd-avatar')
    expect(wrapper.classes()).toContain('wd-avatar--round')
    expect(wrapper.classes()).toContain('wd-avatar--normal')
  })

  // 测试图片头像
  test('渲染图片头像', () => {
    const src = 'https://example.com/avatar.jpg'

    const wrapper = mount(WdAvatar, {
      props: { src },
      global: {
        components: {
          WdImg
        }
      }
    })

    const img = wrapper.findComponent(WdImg)
    expect(img.exists()).toBe(true)
    expect(img.props('src')).toBe(src)
  })

  // 测试文本头像
  test('渲染文本头像', () => {
    const text = '张三'

    const wrapper = mount(WdAvatar, {
      props: { text }
    })

    expect(wrapper.find('.wd-avatar__text').exists()).toBe(true)
    expect(wrapper.find('.wd-avatar__text').text()).toBe(text)
  })

  // 测试图标头像
  test('渲染图标头像', () => {
    const icon = 'user'

    const wrapper = mount(WdAvatar, {
      props: { icon },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.findComponent(WdIcon).exists()).toBe(true)
    expect(wrapper.findComponent(WdIcon).props('name')).toBe(icon)
  })

  // 测试默认插槽
  test('渲染默认插槽', () => {
    const wrapper = mount(WdAvatar, {
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      }
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  // 测试尺寸 - 预设尺寸
  test('渲染预设尺寸', () => {
    const sizes = ['large', 'medium', 'normal', 'small'] as const

    sizes.forEach((size) => {
      const wrapper = mount(WdAvatar, {
        props: { size }
      })

      expect(wrapper.classes()).toContain(`wd-avatar--${size}`)
    })
  })

  // 测试尺寸 - 自定义尺寸
  test('渲染自定义尺寸', () => {
    const size = '80px'

    const wrapper = mount(WdAvatar, {
      props: { size }
    })

    expect(wrapper.classes()).not.toContain(`wd-avatar--${size}`)
    expect(wrapper.attributes('style')).toContain('width')
    expect(wrapper.attributes('style')).toContain('height')
  })

  // 测试形状 - 圆形
  test('渲染圆形头像', () => {
    const wrapper = mount(WdAvatar, {
      props: { shape: 'round' }
    })

    expect(wrapper.classes()).toContain('wd-avatar--round')
    expect(wrapper.attributes('style')).toContain('border-radius')
  })

  // 测试形状 - 方形
  test('渲染方形头像', () => {
    const wrapper = mount(WdAvatar, {
      props: { shape: 'square' }
    })

    expect(wrapper.classes()).toContain('wd-avatar--square')
  })

  // 测试背景颜色
  test('应用背景颜色', () => {
    const bgColor = '#f5f5f5'

    const wrapper = mount(WdAvatar, {
      props: { bgColor }
    })

    expect(wrapper.attributes('style')).toContain('background-color')
    expect(wrapper.attributes('style')).toContain('rgb(245, 245, 245)')
  })

  // 测试文字颜色
  test('应用文字颜色', () => {
    const color = '#333333'

    const wrapper = mount(WdAvatar, {
      props: { color, text: '测试' }
    })

    expect(wrapper.attributes('style')).toContain('color')
    expect(wrapper.attributes('style')).toContain('rgb(51, 51, 51)')
  })

  // 测试背景颜色和文字颜色同时设置
  test('同时设置背景颜色和文字颜色', () => {
    const bgColor = '#1890ff'
    const color = '#ffffff'

    const wrapper = mount(WdAvatar, {
      props: { bgColor, color, text: '测试' }
    })

    expect(wrapper.attributes('style')).toContain('background-color')
    expect(wrapper.attributes('style')).toContain('rgb(24, 144, 255)')
    expect(wrapper.attributes('style')).toContain('color')
    expect(wrapper.attributes('style')).toContain('rgb(255, 255, 255)')
  })

  // 测试图片填充模式
  test('应用图片填充模式', () => {
    const mode = 'aspectFit'

    const wrapper = mount(WdAvatar, {
      props: {
        src: 'https://example.com/avatar.jpg',
        mode
      },
      global: {
        components: {
          WdImg
        }
      }
    })

    const img = wrapper.findComponent(WdImg)
    expect(img.props('mode')).toBe(mode)
  })

  // 测试点击事件
  test('触发点击事件', async () => {
    const wrapper = mount(WdAvatar)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  // 测试错误事件
  test('触发图片加载错误事件', async () => {
    const wrapper = mount(WdAvatar, {
      props: {
        src: 'https://example.com/avatar.jpg'
      },
      global: {
        components: {
          WdImg
        }
      }
    })

    const img = wrapper.findComponent(WdImg)
    await img.vm.$emit('error', {})

    expect(wrapper.emitted('error')).toBeTruthy()
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-avatar'

    const wrapper = mount(WdAvatar, {
      props: { customClass }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'margin: 10px;'

    const wrapper = mount(WdAvatar, {
      props: { customStyle }
    })

    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试图片类名
  test('应用图片类名', () => {
    const wrapper = mount(WdAvatar, {
      props: {
        src: 'https://example.com/avatar.jpg'
      },
      global: {
        components: {
          WdImg
        }
      }
    })

    const img = wrapper.findComponent(WdImg)
    expect(img.classes()).toContain('wd-avatar__img')
  })

  // 测试图标类名
  test('应用图标类名', () => {
    const wrapper = mount(WdAvatar, {
      props: {
        icon: 'user'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    const icon = wrapper.findComponent(WdIcon)
    expect(icon.classes()).toContain('wd-avatar__icon')
  })

  // 测试文本类名
  test('应用文本类名', () => {
    const wrapper = mount(WdAvatar, {
      props: {
        text: '测试'
      }
    })

    expect(wrapper.find('.wd-avatar__text').exists()).toBe(true)
  })

  // 测试不同尺寸的像素值
  test('不同尺寸对应的像素值', () => {
    const sizeMap = {
      large: 76,
      medium: 64,
      normal: 54,
      small: 48
    }

    Object.entries(sizeMap).forEach(([size, pixel]) => {
      const wrapper = mount(WdAvatar, {
        props: { size }
      })

      const style = wrapper.attributes('style')
      expect(style).toContain(`width: ${pixel}px`)
      expect(style).toContain(`height: ${pixel}px`)
    })
  })

  // 测试数字尺寸
  test('数字尺寸', () => {
    const size = 100

    const wrapper = mount(WdAvatar, {
      props: { size }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('width: 100px')
    expect(style).toContain('height: 100px')
  })

  // 测试字体大小计算
  test('字体大小根据尺寸自动计算', () => {
    const wrapper = mount(WdAvatar, {
      props: { size: 'large' }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('font-size')
  })

  // 测试优先级 - 插槽 > 图片 > 文本 > 图标
  test('内容优先级 - 插槽优先', () => {
    const wrapper = mount(WdAvatar, {
      props: {
        src: 'https://example.com/avatar.jpg',
        text: '测试',
        icon: 'user'
      },
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      },
      global: {
        components: {
          WdImg,
          WdIcon
        }
      }
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.findComponent(WdImg).exists()).toBe(false)
    expect(wrapper.find('.wd-avatar__text').exists()).toBe(false)
    expect(wrapper.findComponent(WdIcon).exists()).toBe(false)
  })

  // 测试优先级 - 图片 > 文本
  test('内容优先级 - 图片优先于文本', () => {
    const wrapper = mount(WdAvatar, {
      props: {
        src: 'https://example.com/avatar.jpg',
        text: '测试'
      },
      global: {
        components: {
          WdImg
        }
      }
    })

    expect(wrapper.findComponent(WdImg).exists()).toBe(true)
    expect(wrapper.find('.wd-avatar__text').exists()).toBe(false)
  })

  // 测试优先级 - 文本 > 图标
  test('内容优先级 - 文本优先于图标', () => {
    const wrapper = mount(WdAvatar, {
      props: {
        text: '测试',
        icon: 'user'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.wd-avatar__text').exists()).toBe(true)
    expect(wrapper.findComponent(WdIcon).exists()).toBe(false)
  })

  // 测试内部使用属性
  test('_internal 属性', () => {
    const wrapper = mount(WdAvatar, {
      props: { _internal: true }
    })

    expect(wrapper.props('_internal')).toBe(true)
  })
})
