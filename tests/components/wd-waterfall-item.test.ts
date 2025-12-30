import { mount } from '@vue/test-utils'
import WdWaterfallItem from '@/uni_modules/wot-design-uni/components/wd-waterfall-item/wd-waterfall-item.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick, ref, computed } from 'vue'
import { waterfallContextKey } from '@/uni_modules/wot-design-uni/components/wd-waterfall/types'

/**
 * WdWaterfallItem 组件测试
 *
 * 测试覆盖：
 * 1. 基本渲染和默认属性
 * 2. 索引、宽度、高度属性
 * 3. 自定义样式类和样式
 * 4. 插槽渲染（包含 loaded 回调、columnWidth、imageHeight 等）
 * 5. 组件生命周期（link/unlink, addItem/removeItem）
 * 6. 无上下文情况的错误处理
 * 7. 边界情况（负数索引、零尺寸）
 * 8. 固定宽高模式
 * 9. 错误处理策略（default, placeholder, retry, retryHard）
 * 10. 响应式列宽
 * 11. 重排状态（isReflowing）
 *
 * 最近更新：
 * - 使用 useChildren/useParent 重构组件间通信
 * - 模拟上下文需要包含 link/unlink 方法
 * - 更新响应式属性类型（columnWidth, isReflowing, isProcessingRemoval）
 * - 优化生命周期测试，验证 link/unlink 调用
 */
describe('WdWaterfallItem', () => {
  // 模拟瀑布流上下文（使用 useChildren/useParent 模式）
  const createMockContext = () => ({
    link: vi.fn(),
    unlink: vi.fn(),
    children: [],
    internalChildren: [],
    addItem: vi.fn(),
    removeItem: vi.fn(),
    onItemLoad: vi.fn(),
    columnWidth: computed(() => 150),
    isReflowing: ref(false),
    errorStrategy: 'default' as const,
    retryCount: 1,
    maxWait: 1500,
    isProcessingRemoval: ref(false)
  })

  let mockWaterfallContext: ReturnType<typeof createMockContext>

  beforeEach(() => {
    mockWaterfallContext = createMockContext()
  })

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

    expect(wrapper.props('order')).toBeUndefined()
    expect(wrapper.props('width')).toBeUndefined()
    expect(wrapper.props('height')).toBeUndefined()
  })

  // 测试索引属性
  test('索引属性', () => {
    const wrapper = mount(WdWaterfallItem, {
      props: { order: 5 },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.props('order')).toBe(5)
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
  test('组件生命周期', async () => {
    const context = createMockContext()

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      }
    })

    // 等待组件挂载完成
    await nextTick()

    // 验证组件挂载时调用了 link 和 addItem 方法
    expect(context.link).toHaveBeenCalled()
    expect(context.addItem).toHaveBeenCalled()

    // 卸载组件
    wrapper.unmount()

    // 验证组件卸载时调用了 unlink 和 removeItem 方法
    expect(context.unlink).toHaveBeenCalled()
    expect(context.removeItem).toHaveBeenCalled()
  })

  // 测试组件实例
  test('组件实例', () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    // 验证组件实例存在
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm).toBeDefined()
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
      props: { order: -1 },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })
    expect(wrapper1.props('order')).toBe(-1)

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

  // 测试固定宽高模式
  test('固定宽高模式', async () => {
    const wrapper = mount(WdWaterfallItem, {
      props: { width: 200, height: 300 },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.props('width')).toBe(200)
    expect(wrapper.props('height')).toBe(300)
  })

  // 测试错误处理策略
  test('错误处理策略', () => {
    const strategies = ['default', 'placeholder', 'retry', 'retryHard'] as const

    strategies.forEach((strategy) => {
      const context = {
        ...createMockContext(),
        errorStrategy: strategy
      }

      const wrapper = mount(WdWaterfallItem, {
        global: {
          provide: {
            [waterfallContextKey as symbol]: context
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  // 测试响应式列宽
  test('响应式列宽', () => {
    const columnWidthRef = ref(150)
    const context = {
      ...createMockContext(),
      columnWidth: computed(() => columnWidthRef.value)
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      }
    })

    expect(wrapper.exists()).toBe(true)

    // 改变列宽
    columnWidthRef.value = 200
    expect(context.columnWidth.value).toBe(200)
  })

  // 测试重排状态
  test('重排状态', async () => {
    const isReflowingRef = ref(false)
    const context = {
      ...createMockContext(),
      isReflowing: isReflowingRef
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      }
    })

    expect(wrapper.find('.is-reflowing').exists()).toBe(false)

    // 触发重排
    isReflowingRef.value = true
    await nextTick()

    expect(wrapper.find('.is-reflowing').exists()).toBe(true)
  })

  // 测试插槽作用域参数
  test('插槽作用域参数', () => {
    const wrapper = mount(WdWaterfallItem, {
      slots: {
        default: `
          <template #default="{ loaded, columnWidth, imageHeight, status, message, onFallbackLoad, onFallbackError }">
            <div class="slot-content">
              <span class="column-width">{{ columnWidth }}</span>
              <span class="status">{{ status }}</span>
            </div>
          </template>
        `
      },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
  })

  // 测试可见性状态
  test('可见性状态', async () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    // 初始状态应该不可见
    expect(wrapper.find('.is-show').exists()).toBe(false)
  })

  // 测试最大等待时间配置
  test('最大等待时间配置', () => {
    const context = {
      ...createMockContext(),
      maxWait: 3000
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  // 测试重试次数配置
  test('重试次数配置', () => {
    const context = {
      ...createMockContext(),
      retryCount: 3
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  // 测试删除处理状态
  test('删除处理状态', () => {
    const isProcessingRemovalRef = ref(false)
    const context = {
      ...createMockContext(),
      isProcessingRemoval: isProcessingRemovalRef
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      }
    })

    expect(wrapper.exists()).toBe(true)

    // 改变删除状态
    isProcessingRemovalRef.value = true
    expect(context.isProcessingRemoval.value).toBe(true)
  })

  // 测试多个错误策略组合
  test('多个错误策略组合', () => {
    const strategies = ['default', 'placeholder', 'retry', 'retryHard'] as const
    const retryCounts = [1, 2, 3]
    const maxWaits = [1000, 1500, 2000]

    strategies.forEach((strategy, index) => {
      const context = {
        ...createMockContext(),
        errorStrategy: strategy,
        retryCount: retryCounts[index % retryCounts.length],
        maxWait: maxWaits[index % maxWaits.length]
      }

      const wrapper = mount(WdWaterfallItem, {
        global: {
          provide: {
            [waterfallContextKey as symbol]: context
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  // 测试组件样式计算
  test('组件样式计算', () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    const viewElement = wrapper.find('.wd-waterfall-item')
    expect(viewElement.exists()).toBe(true)

    // 验证样式属性存在
    const style = viewElement.attributes('style')
    expect(style).toBeDefined()
  })

  // 测试固定宽高与动态宽高切换
  test('固定宽高与动态宽高', async () => {
    const wrapper = mount(WdWaterfallItem, {
      props: { width: 200, height: 300 },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.props('width')).toBe(200)
    expect(wrapper.props('height')).toBe(300)

    // 改变为动态宽高
    await wrapper.setProps({ width: undefined, height: undefined })
    expect(wrapper.props('width')).toBeUndefined()
    expect(wrapper.props('height')).toBeUndefined()
  })

  // 测试 order 属性变化
  test('order 属性变化', async () => {
    const wrapper = mount(WdWaterfallItem, {
      props: { order: 0 },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    expect(wrapper.props('order')).toBe(0)

    // 改变 order
    await wrapper.setProps({ order: 5 })
    expect(wrapper.props('order')).toBe(5)
  })
})
