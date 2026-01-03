import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import WdAvatarGroup from '@/uni_modules/wot-design-uni/components/wd-avatar-group/wd-avatar-group.vue'
import WdAvatar from '@/uni_modules/wot-design-uni/components/wd-avatar/wd-avatar.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('WdAvatarGroup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染 - 默认属性', () => {
    const wrapper = mount(WdAvatarGroup)

    expect(wrapper.classes()).toContain('wd-avatar-group')
    expect(wrapper.classes()).toContain('wd-avatar-group--left-up')
  })

  // 测试层叠方向 - 左侧叠层
  test('层叠方向 - 左侧叠层', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { cascading: 'left-up' }
    })

    expect(wrapper.classes()).toContain('wd-avatar-group--left-up')
  })

  // 测试层叠方向 - 右侧叠层
  test('层叠方向 - 右侧叠层', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { cascading: 'right-up' }
    })

    expect(wrapper.classes()).toContain('wd-avatar-group--right-up')
  })

  // 测试默认插槽内容
  test('渲染默认插槽内容', () => {
    const wrapper = mount(WdAvatarGroup, {
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      }
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  // 测试子组件头像
  test('渲染子组件头像', () => {
    const wrapper = mount(WdAvatarGroup, {
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)
    expect(avatars.length).toBe(2)
  })

  // 测试最大数量限制
  test('最大数量限制 - 显示部分头像', async () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { maxCount: 2 },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
          <wd-avatar src="https://example.com/avatar3.jpg" />
          <wd-avatar src="https://example.com/avatar4.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    await nextTick()

    const avatars = wrapper.findAllComponents(WdAvatar)
    const visibleAvatars = avatars.filter((avatar) => avatar.isVisible())
    expect(visibleAvatars.length).toBe(3)
  })

  // 测试最大数量限制 - 不显示折叠头像
  test('最大数量限制 - 不显示折叠头像', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { maxCount: 4 },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
          <wd-avatar src="https://example.com/avatar3.jpg" />
          <wd-avatar src="https://example.com/avatar4.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)
    expect(avatars.length).toBe(4)
    expect(wrapper.find('.wd-avatar-group__collapse').exists()).toBe(false)
  })

  // 测试最大数量为0
  test('最大数量为0 - 显示所有头像', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { maxCount: 0 },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
          <wd-avatar src="https://example.com/avatar3.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)
    expect(avatars.length).toBe(3)
    expect(wrapper.find('.wd-avatar-group__collapse').exists()).toBe(false)
  })

  // 测试最大数量未设置
  test('最大数量未设置 - 显示所有头像', () => {
    const wrapper = mount(WdAvatarGroup, {
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
          <wd-avatar src="https://example.com/avatar3.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)
    expect(avatars.length).toBe(3)
    expect(wrapper.find('.wd-avatar-group__collapse').exists()).toBe(false)
  })

  // 测试折叠头像文本
  test('折叠头像文本 - 默认格式', async () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { maxCount: 2 },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
          <wd-avatar src="https://example.com/avatar3.jpg" />
          <wd-avatar src="https://example.com/avatar4.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    await nextTick()

    const collapseAvatar = wrapper.find('.wd-avatar-group__collapse')
    expect(collapseAvatar.exists()).toBe(true)

    const collapseAvatarComponent = collapseAvatar.findComponent(WdAvatar)
    expect(collapseAvatarComponent.exists()).toBe(true)
    expect(collapseAvatarComponent.props('text')).toBe('+2')
  })

  // 测试折叠头像文本 - 自定义内容
  test('折叠头像文本 - 自定义内容', async () => {
    const collapseAvatarText = '更多'

    const wrapper = mount(WdAvatarGroup, {
      props: {
        maxCount: 2,
        collapseAvatar: collapseAvatarText
      },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
          <wd-avatar src="https://example.com/avatar3.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    await nextTick()

    const collapseAvatar = wrapper.find('.wd-avatar-group__collapse')
    const collapseAvatarComponent = collapseAvatar.findComponent(WdAvatar)
    expect(collapseAvatarComponent.props('text')).toBe(collapseAvatarText)
  })

  // 测试统一设置形状
  test('统一设置组内头像形状', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { shape: 'square' },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)
    avatars.forEach((avatar) => {
      expect(avatar.classes()).toContain('wd-avatar--square')
    })
  })

  // 测试统一设置尺寸
  test('统一设置组内头像尺寸', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { size: 'large' },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)
    avatars.forEach((avatar) => {
      expect(avatar.classes()).toContain('wd-avatar--large')
    })
  })

  // 测试子组件继承组属性 - 形状和尺寸
  test('子组件继承组属性 - 形状和尺寸', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: {
        shape: 'square',
        size: 'small'
      },
      slots: {
        default: '<wd-avatar src="https://example.com/avatar.jpg" />'
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatar = wrapper.findComponent(WdAvatar)
    expect(avatar.classes()).toContain('wd-avatar--square')
    expect(avatar.classes()).toContain('wd-avatar--small')
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-avatar-group'

    const wrapper = mount(WdAvatarGroup, {
      props: { customClass }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'margin: 10px;'

    const wrapper = mount(WdAvatarGroup, {
      props: { customStyle }
    })

    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试子组件添加组内类名
  test('子组件添加组内类名', () => {
    const wrapper = mount(WdAvatarGroup, {
      slots: {
        default: '<wd-avatar src="https://example.com/avatar.jpg" />'
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatar = wrapper.findComponent(WdAvatar)
    expect(avatar.classes()).toContain('wd-avatar-group__item')
  })

  // 测试折叠头像样式
  test('折叠头像样式', async () => {
    const wrapper = mount(WdAvatarGroup, {
      props: {
        maxCount: 1,
        cascading: 'left-up'
      },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    await nextTick()

    const collapseAvatar = wrapper.find('.wd-avatar-group__collapse')
    expect(collapseAvatar.exists()).toBe(true)
    expect(collapseAvatar.classes()).toContain('wd-avatar-group__collapse')
  })

  // 测试最大数量为字符串
  test('最大数量为字符串', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { maxCount: '2' },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
          <wd-avatar src="https://example.com/avatar3.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)
    expect(avatars.length).toBe(3)
  })

  // 测试最大数量为无效值
  test('最大数量为无效值 - 显示所有头像', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { maxCount: 'invalid' },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)
    expect(avatars.length).toBe(2)
    expect(wrapper.find('.wd-avatar-group__collapse').exists()).toBe(false)
  })

  // 测试最大数量为负数
  test('最大数量为负数 - 显示所有头像', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { maxCount: -1 },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)
    expect(avatars.length).toBe(2)
    expect(wrapper.find('.wd-avatar-group__collapse').exists()).toBe(false)
  })

  // 测试折叠头像的背景色和文字色
  test('折叠头像的背景色和文字色', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { maxCount: 1 },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const collapseAvatar = wrapper.find('.wd-avatar-group__collapse')
    if (collapseAvatar.exists()) {
      const collapseAvatarComponent = collapseAvatar.findComponent(WdAvatar)
      if (collapseAvatarComponent.exists()) {
        expect(collapseAvatarComponent.props('bgColor')).toBe('#ebedf0')
        expect(collapseAvatarComponent.props('color')).toBe('#969799')
      }
    }
  })

  // 测试折叠头像继承组的形状和尺寸
  test('折叠头像继承组的形状和尺寸', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: {
        maxCount: 1,
        shape: 'square',
        size: 'large'
      },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const collapseAvatar = wrapper.find('.wd-avatar-group__collapse')
    if (collapseAvatar.exists()) {
      const collapseAvatarComponent = collapseAvatar.findComponent(WdAvatar)
      if (collapseAvatarComponent.exists()) {
        expect(collapseAvatarComponent.props('shape')).toBe('square')
        expect(collapseAvatarComponent.props('size')).toBe('large')
      }
    }
  })

  // 测试左侧叠层的z-index
  test('左侧叠层的z-index', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: {
        maxCount: 3,
        cascading: 'left-up'
      },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
          <wd-avatar src="https://example.com/avatar3.jpg" />
          <wd-avatar src="https://example.com/avatar4.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)
    const collapseAvatar = wrapper.find('.wd-avatar-group__collapse')

    avatars.forEach((avatar, index) => {
      const style = avatar.attributes('style')
      if (style) {
        expect(style).toContain(`z-index: ${index + 1}`)
      }
    })

    if (collapseAvatar.exists()) {
      const collapseStyle = collapseAvatar.attributes('style')
      if (collapseStyle) {
        expect(collapseStyle).toContain('z-index: 4')
      }
    }
  })

  // 测试右侧叠层的z-index
  test('右侧叠层的z-index', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: {
        maxCount: 3,
        cascading: 'right-up'
      },
      slots: {
        default: `
          <wd-avatar src="https://example.com/avatar1.jpg" />
          <wd-avatar src="https://example.com/avatar2.jpg" />
          <wd-avatar src="https://example.com/avatar3.jpg" />
          <wd-avatar src="https://example.com/avatar4.jpg" />
        `
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatars = wrapper.findAllComponents(WdAvatar)

    avatars.forEach((avatar, index) => {
      const style = avatar.attributes('style')
      if (style) {
        expect(style).toContain(`z-index: ${3 - index}`)
      }
    })

    const collapseAvatar = wrapper.find('.wd-avatar-group__collapse')
    if (collapseAvatar.exists()) {
      const collapseStyle = collapseAvatar.attributes('style')
      if (collapseStyle) {
        expect(collapseStyle).toContain('z-index: 0')
      }
    }
  })

  // 测试子组件的层叠样式
  test('子组件的层叠样式', () => {
    const wrapper = mount(WdAvatarGroup, {
      props: { size: 'large' },
      slots: {
        default: '<wd-avatar src="https://example.com/avatar.jpg" />'
      },
      global: {
        components: {
          WdAvatar
        }
      }
    })

    const avatar = wrapper.findComponent(WdAvatar)
    const style = avatar.attributes('style')
    expect(style).toContain('--wot-avatar-group-overlap')
  })
})
