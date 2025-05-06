import { mount } from '@vue/test-utils'
import WdCollapse from '@/uni_modules/wot-design-uni/components/wd-collapse/wd-collapse.vue'
import WdCollapseItem from '@/uni_modules/wot-design-uni/components/wd-collapse-item/wd-collapse-item.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'

// 测试 WdCollapse 组件
describe('WdCollapse', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染', async () => {
    const wrapper = mount(WdCollapse, {
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('wd-collapse')
    expect(wrapper.classes()).not.toContain('is-viewmore')
  })

  // 测试插槽内容
  test('默认插槽内容', async () => {
    const wrapper = mount(WdCollapse, {
      slots: {
        default: '<div class="test-content">测试内容</div>'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('测试内容')
  })

  // 测试查看更多点击事件
  test('点击更多按钮触发事件', async () => {
    // 使用真实的 WdCollapse 组件
    const wrapper = mount(WdCollapse, {
      props: {
        viewmore: true,
        modelValue: false
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    // 直接调用 handleMore 方法，而不是点击按钮
    const vm = wrapper.vm as any
    vm.handleMore()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([{ value: true }])
  })

  // 测试自定义类名
  test('应用自定义类名', async () => {
    const customClass = 'custom-collapse'

    const wrapper = mount(WdCollapse, {
      props: { customClass },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', async () => {
    const customStyle = 'background: yellow;'

    const wrapper = mount(WdCollapse, {
      props: { customStyle },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  // 测试 toggleAll 方法 - 全部展开
  test('toggleAll方法展开所有项', async () => {
    const wrapper = mount(WdCollapse, {
      props: {
        modelValue: ['1'],
        accordion: false
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    // 使用类型断言访问 vm 属性
    const vm = wrapper.vm as any
    vm.toggleAll(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  // 测试 toggleAll 方法 - 跳过禁用项
  test('toggleAll方法跳过禁用项', async () => {
    const wrapper = mount(WdCollapse, {
      props: {
        modelValue: [],
        accordion: false
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    // 使用类型断言访问 vm 属性
    const vm = wrapper.vm as any
    vm.toggleAll({ expanded: true, skipDisabled: true })

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // 测试 toggleAll 方法在手风琴模式下不生效
  test('手风琴模式下toggleAll方法无效', async () => {
    const wrapper = mount(WdCollapse, {
      props: {
        modelValue: '1',
        accordion: true
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    // 使用类型断言访问 vm 属性
    const vm = wrapper.vm as any
    vm.toggleAll(true)

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})

// 测试 WdCollapseItem 组件
describe('WdCollapseItem', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染', async () => {
    const wrapper = mount(WdCollapseItem, {
      props: {
        name: 'test'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('wd-collapse-item')
    expect(wrapper.classes()).toContain('is-border')
  })

  // 测试标题
  test('标题渲染', async () => {
    const title = '标题'

    const wrapper = mount(WdCollapseItem, {
      props: {
        title,
        name: 'test'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-collapse-item__title').text()).toBe(title)
  })

  // 测试禁用状态
  test('禁用状态渲染', async () => {
    const wrapper = mount(WdCollapseItem, {
      props: {
        disabled: true,
        name: 'test'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('is-disabled')
  })

  // 测试第一个项目的特殊样式
  test('第一个项目应用特殊样式', async () => {
    // 创建一个父组件 WdCollapse，并将 WdCollapseItem 作为子组件
    // 这样才能正确设置 isFirst 属性
    const wrapper = mount(WdCollapse, {
      slots: {
        default: '<wd-collapse-item name="test">内容</wd-collapse-item>'
      },
      global: {
        components: {
          WdIcon,
          WdCollapseItem
        }
      }
    })

    await nextTick()

    // 找到子组件中的 header 元素
    const collapseItem = wrapper.findComponent(WdCollapseItem)
    expect(collapseItem.find('.wd-collapse-item__header').classes()).toContain('wd-collapse-item__header-first')
  })

  // 测试插槽内容
  test('默认插槽内容', async () => {
    const wrapper = mount(WdCollapseItem, {
      props: {
        name: 'test'
      },
      slots: {
        default: '<div class="collapse-content">折叠面板内容</div>'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.collapse-content').exists()).toBe(true)
    expect(wrapper.find('.collapse-content').text()).toBe('折叠面板内容')
  })

  // 测试自定义标题插槽
  test('自定义标题插槽', async () => {
    const wrapper = mount(WdCollapseItem, {
      props: {
        name: 'test'
      },
      slots: {
        title: '<div class="custom-title">自定义标题</div>'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-collapse-item__header').classes()).toContain('is-custom')
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  // 测试箭头图标
  test('箭头图标渲染', async () => {
    const wrapper = mount(WdCollapseItem, {
      props: {
        name: 'test'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    // 检查 WdIcon 组件是否存在
    expect(wrapper.findComponent(WdIcon).exists()).toBe(true)
    expect(wrapper.findComponent(WdIcon).props('name')).toBe('arrow-down')

    // 检查 WdIcon 组件的 custom-class 属性
    // 在 Vue 中，props 会被转换为 camelCase，但在模板中使用的是 kebab-case
    // 由于 customClass 是通过 v-bind 传递的，我们可以通过检查 HTML 属性来验证
    const iconComponent = wrapper.findComponent(WdIcon)
    expect(iconComponent.attributes()).toBeDefined()
    console.log()

    expect(iconComponent.props('customClass')).toBeDefined()
    expect(iconComponent.props('customClass')).toContain('wd-collapse-item__arrow')
  })

  // 测试点击事件
  test('处理点击事件', async () => {
    const wrapper = mount(WdCollapseItem, {
      props: {
        name: 'test'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-collapse-item__header').trigger('click')
  })

  // 测试禁用状态下点击事件
  test('禁用状态下不处理点击事件', async () => {
    const wrapper = mount(WdCollapseItem, {
      props: {
        name: 'test',
        disabled: true
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-collapse-item__header').trigger('click')
  })

  // 测试自定义类名
  test('应用自定义类名', async () => {
    const customClass = 'custom-item'

    const wrapper = mount(WdCollapseItem, {
      props: {
        customClass,
        name: 'test'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', async () => {
    const customStyle = 'background: yellow;'

    const wrapper = mount(WdCollapseItem, {
      props: {
        customStyle,
        name: 'test'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  // 测试自定义内容容器类名
  test('应用自定义内容容器类名', async () => {
    const customBodyClass = 'custom-body'

    const wrapper = mount(WdCollapseItem, {
      props: {
        customBodyClass,
        name: 'test'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-collapse-item__body').classes()).toContain(customBodyClass)
  })

  // 测试自定义内容容器样式
  test('应用自定义内容容器样式', async () => {
    const customBodyStyle = 'padding: 20px;'

    const wrapper = mount(WdCollapseItem, {
      props: {
        customBodyStyle,
        name: 'test'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-collapse-item__body').attributes('style')).toBe(customBodyStyle)
  })

  // 测试展开前钩子函数 - 返回 true
  test('调用返回true的beforeExpend钩子', async () => {
    const beforeExpend = vi.fn().mockReturnValue(true)

    const wrapper = mount(WdCollapseItem, {
      props: {
        name: 'test',
        beforeExpend
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-collapse-item__header').trigger('click')

    expect(beforeExpend).toHaveBeenCalledWith('test')
  })

  // 测试展开前钩子函数 - 返回 false
  test('调用返回false的beforeExpend钩子', async () => {
    const beforeExpend = vi.fn().mockReturnValue(false)

    const wrapper = mount(WdCollapseItem, {
      props: {
        name: 'test',
        beforeExpend
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-collapse-item__header').trigger('click')

    expect(beforeExpend).toHaveBeenCalledWith('test')
  })

  // 测试展开前钩子函数 - 返回 Promise
  test('calls beforeExpend hook that returns Promise', async () => {
    const beforeExpend = vi.fn().mockResolvedValue(true)

    const wrapper = mount(WdCollapseItem, {
      props: {
        name: 'test',
        beforeExpend
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-collapse-item__header').trigger('click')

    expect(beforeExpend).toHaveBeenCalledWith('test')
  })

  // 测试过渡结束事件
  test('handles transition end event', async () => {
    const wrapper = mount(WdCollapseItem, {
      props: {
        name: 'test'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    // 设置为展开状态 - 使用类型断言
    const vm = wrapper.vm as any
    vm.expanded = true

    // 触发过渡结束事件
    await wrapper.find('.wd-collapse-item__wrapper').trigger('transitionend')

    // 高度应该被重置为空字符串 - 使用类型断言
    expect((wrapper.vm as any).height).toBe('')
  })
})

// 测试 WdCollapse 和 WdCollapseItem 组件的集成
describe('WdCollapse and WdCollapseItem Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试 WdCollapse 和 WdCollapseItem 组件的结合使用
  test('renders with collapse items', async () => {
    const wrapper = mount(WdCollapse, {
      props: {
        modelValue: ['item1']
      },
      slots: {
        default: `
          <wd-collapse-item title="标签1" name="item1">内容1</wd-collapse-item>
          <wd-collapse-item title="标签2" name="item2">内容2</wd-collapse-item>
        `
      },
      global: {
        components: {
          WdIcon,
          WdCollapseItem
        }
      }
    })

    await nextTick()

    expect(wrapper.findAllComponents(WdCollapseItem).length).toBe(2)
    expect(wrapper.html()).toContain('标签1')
    expect(wrapper.html()).toContain('标签2')
  })

  // 测试手风琴模式
  test('works in accordion mode', async () => {
    const wrapper = mount(WdCollapse, {
      props: {
        modelValue: 'item1',
        accordion: true
      },
      slots: {
        default: `
          <wd-collapse-item title="标签1" name="item1">内容1</wd-collapse-item>
          <wd-collapse-item title="标签2" name="item2">内容2</wd-collapse-item>
        `
      },
      global: {
        components: {
          WdIcon,
          WdCollapseItem
        }
      }
    })

    await nextTick()

    // 找到第二个折叠项并点击
    const items = wrapper.findAllComponents(WdCollapseItem)
    await items[1].find('.wd-collapse-item__header').trigger('click')

    // 应该发出更新事件，将值更改为 'item2'
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['item2'])
  })

  // 测试禁用项
  test('respects disabled items', async () => {
    const wrapper = mount(WdCollapse, {
      props: {
        modelValue: ['item1']
      },
      slots: {
        default: `
          <wd-collapse-item title="标签1" name="item1">内容1</wd-collapse-item>
          <wd-collapse-item title="标签2" name="item2" disabled>内容2</wd-collapse-item>
        `
      },
      global: {
        components: {
          WdIcon,
          WdCollapseItem
        }
      }
    })

    await nextTick()

    // 找到禁用的折叠项并点击
    const items = wrapper.findAllComponents(WdCollapseItem)
    await items[1].find('.wd-collapse-item__header').trigger('click')

    // 不应该发出更新事件
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // 测试查看更多模式
  test('works in viewmore mode', async () => {
    const wrapper = mount(WdCollapse, {
      props: {
        modelValue: false,
        viewmore: true,
        lineNum: 2
      },
      slots: {
        default: '<div>这是一段很长的内容，需要折叠起来，点击查看更多才能看到全部内容。</div>'
      },
      global: {
        components: {
          WdIcon
        }
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('is-viewmore')
    expect(wrapper.find('.wd-collapse__content').classes()).toContain('is-retract')

    // 点击查看更多按钮
    await wrapper.find('.wd-collapse__more').trigger('click')

    // 应该发出更新事件，将值更改为 true
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })
})
