import { mount } from '@vue/test-utils'
import WdWaterfallItem from '@/uni_modules/wot-design-uni/components/wd-waterfall-item/wd-waterfall-item.vue'
import { describe, test, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { waterfallContextKey } from '@/uni_modules/wot-design-uni/components/wd-waterfall/types'

describe('WdWaterfallItem', () => {
  // 模拟瀑布流上下文
  const mockWaterfallContext = {
    addItem: vi.fn(),
    removeItem: vi.fn(),
    onItemLoad: vi.fn(),
    columnWidth: 150,
    isReflowing: false,
    isLayoutInterrupted: false,
    errorMode: 'none' as const,
    retryCount: 1,
    maxWait: 3000
  }

  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.find('view').classes()).toContain('wd-waterfall-item')
  })

  // 测试默认属性
  test('默认属性', () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.props('index')).toBeUndefined()
    expect(wrapper.props('width')).toBeUndefined()
    expect(wrapper.props('height')).toBeUndefined()
  })

  // 测试索引属性
  test('索引属性', () => {
    const wrapper = mount(WdWaterfallItem, {
      props: { index: 5 },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.props('index')).toBe(5)
  })

  // 测试宽度属性
  test('宽度属性', () => {
    const wrapper = mount(WdWaterfallItem, {
      props: { width: 200 },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.props('width')).toBe(200)
  })

  // 测试高度属性
  test('高度属性', () => {
    const wrapper = mount(WdWaterfallItem, {
      props: { height: 300 },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.props('height')).toBe(300)
  })

  // 测试自定义样式类
  test('自定义样式类', () => {
    const customClass = 'my-item'
    const wrapper = mount(WdWaterfallItem, {
      props: { customClass },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.find('view').classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'background-color: blue;'
    const wrapper = mount(WdWaterfallItem, {
      props: { customStyle },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    const style = wrapper.find('view').attributes('style')
    expect(style).toBeDefined()
    expect(style).toContain('background-color: blue')
  })

  // 测试插槽渲染
  test('插槽渲染', () => {
    const wrapper = mount(WdWaterfallItem, {
      slots: {
        default: '<div class="test-content">测试内容</div>'
      },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('测试内容')
  })

  // 测试组件生命周期
  test('组件生命周期', () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    // 验证组件挂载时调用了上下文方法
    expect(mockWaterfallContext.addItem).toHaveBeenCalled()

    // 卸载组件
    wrapper.unmount()

    // 验证组件卸载时调用了上下文方法
    expect(mockWaterfallContext.removeItem).toHaveBeenCalled()
  })

  // 测试暴露的方法
  test('暴露的方法', () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    const vm = wrapper.vm as any

    // 测试 updateHeight 方法存在
    expect(typeof vm.updateHeight).toBe('function')

    // 测试 refreshImage 方法存在
    expect(typeof vm.refreshImage).toBe('function')
  })

  // 测试无上下文情况
  test('无上下文情况', () => {
    // 测试在没有瀑布流上下文的情况下组件的行为
    expect(() => {
      mount(WdWaterfallItem)
    }).toThrow('[wd-waterfall-item] 缺少瀑布流上下文，请确保组件仅在 <wd-waterfall> 内使用。')
  })

  // 测试边界情况
  test('边界情况处理', () => {
    // 测试负数索引
    const wrapper1 = mount(WdWaterfallItem, {
      props: { index: -1 },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })
    expect(wrapper1.props('index')).toBe(-1)

    // 测试零尺寸
    const wrapper2 = mount(WdWaterfallItem, {
      props: { width: 0, height: 0 },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })
    expect(wrapper2.props('width')).toBe(0)
    expect(wrapper2.props('height')).toBe(0)
  })
})
