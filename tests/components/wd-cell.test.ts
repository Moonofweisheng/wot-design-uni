import { mount } from '@vue/test-utils'
import WdCell from '@/uni_modules/wot-design-uni/components/wd-cell/wd-cell.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('WdCell', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试标题和值
  test('渲染标题和值', () => {
    const title = '标题'
    const value = '内容'

    const wrapper = mount(WdCell, {
      props: { title, value },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.wd-cell__title').text()).toBe(title)
    expect(wrapper.find('.wd-cell__value').text()).toBe(value)
  })

  // 测试标签
  test('渲染标签', () => {
    const label = '描述信息'

    const wrapper = mount(WdCell, {
      props: { label },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.wd-cell__label').text()).toBe(label)
  })

  // 测试图标
  test('渲染图标', () => {
    const icon = 'setting'

    const wrapper = mount(WdCell, {
      props: { icon },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.findComponent(WdIcon).exists()).toBe(true)
    expect(wrapper.find('.wd-cell__icon').exists()).toBe(true)
  })

  // 测试可点击状态
  test('可点击状态', async () => {
    const wrapper = mount(WdCell, {
      props: { clickable: true },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.attributes('hover-class')).toBe('is-hover')

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试链接状态
  test('链接状态', async () => {
    const wrapper = mount(WdCell, {
      props: { isLink: true },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.attributes('hover-class')).toBe('is-hover')
    expect(wrapper.findComponent(WdIcon).exists()).toBe(true)
    expect(wrapper.findComponent(WdIcon).props('name')).toBe('arrow-right')

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试点击跳转
  test('处理点击导航', async () => {
    const to = '/pages/index/index'

    const wrapper = mount(WdCell, {
      props: {
        isLink: true,
        to
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await wrapper.trigger('click')

    expect(uni.navigateTo).toHaveBeenCalledWith({ url: to })
  })

  // 测试替换页面跳转
  test('处理替换导航', async () => {
    const to = '/pages/index/index'

    const wrapper = mount(WdCell, {
      props: {
        isLink: true,
        to,
        replace: true
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await wrapper.trigger('click')

    expect(uni.redirectTo).toHaveBeenCalledWith({ url: to })
  })

  // 测试边框
  test('渲染带边框', () => {
    const wrapper = mount(WdCell, {
      props: { border: true },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.classes()).toContain('is-border')
  })

  // 测试无边框
  test('渲染无边框', () => {
    const wrapper = mount(WdCell, {
      props: { border: false },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.classes()).not.toContain('is-border')
  })

  // 测试大小
  test('渲染不同尺寸', () => {
    const size = 'large'

    const wrapper = mount(WdCell, {
      props: { size },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.classes()).toContain(`is-${size}`)
  })

  // 测试垂直居中
  test('垂直居中对齐', () => {
    const wrapper = mount(WdCell, {
      props: { center: true },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.classes()).toContain('is-center')
  })

  // 测试标题宽度
  test('应用标题宽度', () => {
    const titleWidth = '100px'

    const wrapper = mount(WdCell, {
      props: {
        title: '标题',
        titleWidth
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    const leftElement = wrapper.find('.wd-cell__left')
    expect(leftElement.exists()).toBe(true)
    expect(leftElement.attributes('style')).toContain('min-width')
    expect(leftElement.attributes('style')).toContain('max-width')
  })

  // 测试必填状态
  test('必填状态', () => {
    const wrapper = mount(WdCell, {
      props: {
        title: '标题',
        required: true
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    // 检查必填星号存在（默认在前面）
    expect(wrapper.find('.wd-cell__required--left').exists()).toBe(true)
    expect(wrapper.find('.wd-cell__required--left').text()).toBe('*')
  })

  // 测试垂直布局
  test('垂直布局', () => {
    const wrapper = mount(WdCell, {
      props: { vertical: true },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.wd-cell__wrapper').classes()).toContain('is-vertical')
  })

  // 测试表单验证规则
  test('应用表单验证规则', () => {
    const rules = [{ required: true, message: '必填字段' }]

    const wrapper = mount(WdCell, {
      props: {
        title: '标题',
        prop: 'name',
        rules
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.props('rules')).toEqual(rules)
    // 检查必填星号存在（默认在前面）
    expect(wrapper.find('.wd-cell__required--left').exists()).toBe(true)
    expect(wrapper.find('.wd-cell__required--left').text()).toBe('*')
  })

  // 测试插槽
  test('渲染插槽', () => {
    const wrapper = mount(WdCell, {
      slots: {
        title: '<div class="custom-title">自定义标题</div>',
        icon: '<div class="custom-icon">自定义图标</div>',
        label: '<div class="custom-label">自定义标签</div>',
        default: '<div class="custom-value">自定义内容</div>',
        'right-icon': '<div class="custom-right-icon">自定义右侧图标</div>'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.custom-label').exists()).toBe(true)
    expect(wrapper.find('.custom-value').exists()).toBe(true)
    expect(wrapper.find('.custom-right-icon').exists()).toBe(true)
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-cell'

    const wrapper = mount(WdCell, {
      props: { customClass },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'background: yellow;'

    const wrapper = mount(WdCell, {
      props: { customStyle },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  // 测试自定义图标类名
  test('应用自定义图标类名', () => {
    const customIconClass = 'custom-icon-class'

    const wrapper = mount(WdCell, {
      props: {
        icon: 'setting',
        customIconClass
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.wd-cell__icon').classes()).toContain(customIconClass)
  })

  // 测试自定义标题类名
  test('应用自定义标题类名', () => {
    const customTitleClass = 'custom-title-class'

    const wrapper = mount(WdCell, {
      props: {
        title: '标题',
        customTitleClass
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    // 查找标题文本元素，它应该有自定义类名
    const titleText = wrapper.find('.wd-cell__title text')
    expect(titleText.exists()).toBe(true)
    expect(titleText.classes()).toContain(customTitleClass)
  })

  // 测试自定义标签类名
  test('应用自定义标签类名', () => {
    const customLabelClass = 'custom-label-class'

    const wrapper = mount(WdCell, {
      props: {
        label: '描述',
        customLabelClass
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.wd-cell__label').classes()).toContain(customLabelClass)
  })

  // 测试自定义值类名
  test('应用自定义值类名', () => {
    const customValueClass = 'custom-value-class'

    const wrapper = mount(WdCell, {
      props: {
        value: '内容',
        customValueClass
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.find('.wd-cell__value').classes()).toContain(customValueClass)
  })

  // 测试ellipsis属性
  test('ellipsis属性', () => {
    const wrapper = mount(WdCell, {
      props: {
        value: '这是一段很长的内容，需要省略号显示',
        ellipsis: true
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.props('ellipsis')).toBe(true)
    expect(wrapper.find('.wd-cell__value').classes()).toContain('wd-cell__value--ellipsis')
  })

  // 测试use-title-slot属性
  test('use-title-slot属性', () => {
    const wrapper = mount(WdCell, {
      props: {
        title: '标题',
        useTitleSlot: false
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.props('useTitleSlot')).toBe(false)
  })

  // 测试use-title-slot为true时使用插槽
  test('use-title-slot为true时使用插槽', () => {
    const wrapper = mount(WdCell, {
      props: {
        title: '标题',
        useTitleSlot: true
      },
      slots: {
        title: '<div class="custom-title-slot">自定义标题插槽</div>'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.props('useTitleSlot')).toBe(true)
    expect(wrapper.find('.custom-title-slot').exists()).toBe(true)
  })

  // 测试 markerSide 属性
  test('markerSide 属性 - before', () => {
    const wrapper = mount(WdCell, {
      props: {
        title: '标题',
        required: true,
        markerSide: 'before'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.props('markerSide')).toBe('before')
    // 检查必填星号在前面
    expect(wrapper.find('.wd-cell__required--left').exists()).toBe(true)
    expect(wrapper.find('.wd-cell__required--left').text()).toBe('*')
  })

  test('markerSide 属性 - after', () => {
    const wrapper = mount(WdCell, {
      props: {
        title: '标题',
        required: true,
        markerSide: 'after'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    expect(wrapper.props('markerSide')).toBe('after')
    // 检查必填星号在后面（没有 --left 类）
    expect(wrapper.find('.wd-cell__required').exists()).toBe(true)
    expect(wrapper.find('.wd-cell__required--left').exists()).toBe(false)
    expect(wrapper.find('.wd-cell__required').text()).toBe('*')
  })

  test('markerSide 默认值', () => {
    const wrapper = mount(WdCell, {
      props: {
        title: '标题',
        required: true
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    // 默认值应该是 'before'
    expect(wrapper.props('markerSide')).toBe('before')
    // 检查必填星号在前面
    expect(wrapper.find('.wd-cell__required--left').exists()).toBe(true)
    expect(wrapper.find('.wd-cell__required--left').text()).toBe('*')
  })
})
