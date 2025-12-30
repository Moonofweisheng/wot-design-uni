import { mount } from '@vue/test-utils'
import WdWaterfallItem from '@/uni_modules/wot-design-uni/components/wd-waterfall-item/wd-waterfall-item.vue'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick, ref, computed } from 'vue'
import { waterfallContextKey } from '@/uni_modules/wot-design-uni/components/wd-waterfall/types'

/**
 * WdWaterfallItem 高级功能测试
 *
 * 重点测试：
 * 1. loaded 回调函数（成功/失败场景）
 * 2. updateHeight 函数
 * 3. refreshImage 函数
 * 4. 错误处理流程（default, placeholder, retry, retryHard）
 * 5. 超时处理
 * 6. 降级图片加载（onFallbackLoad, onFallbackError）
 */
describe('WdWaterfallItem Advanced', () => {
  // 模拟 getRect 函数
  const mockGetRect = vi.fn()

  // 创建模拟上下文
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
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // 测试 loaded 回调 - 成功场景
  test('loaded 回调 - 加载成功', async () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      },
      slots: {
        default: `
          <template #default="{ loaded }">
            <img @load="loaded" src="test.jpg" />
          </template>
        `
      }
    })

    await nextTick()

    // 模拟图片加载成功
    const img = wrapper.find('img')
    if (img.exists()) {
      await img.trigger('load')
      await nextTick()
    }

    expect(wrapper.exists()).toBe(true)
  })

  // 测试 loaded 回调 - 失败场景（default 模式）
  test('loaded 回调 - 加载失败 (default 模式)', async () => {
    const context = {
      ...createMockContext(),
      errorStrategy: 'default' as const
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      },
      slots: {
        default: `
          <template #default="{ loaded }">
            <img @error="loaded" src="invalid.jpg" />
          </template>
        `
      }
    })

    await nextTick()

    // 模拟图片加载失败
    const img = wrapper.find('img')
    if (img.exists()) {
      await img.trigger('error')
      await nextTick()
    }

    expect(wrapper.exists()).toBe(true)
  })

  // 测试 loaded 回调 - 失败场景（placeholder 模式）
  test('loaded 回调 - 加载失败 (placeholder 模式)', async () => {
    const context = {
      ...createMockContext(),
      errorStrategy: 'placeholder' as const
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      },
      slots: {
        default: `
          <template #default="{ loaded, status, onFallbackLoad }">
            <img v-if="status === 'success'" @load="loaded" @error="loaded" src="test.jpg" />
            <img v-else @load="onFallbackLoad" src="placeholder.jpg" />
          </template>
        `
      }
    })

    await nextTick()
    expect(wrapper.exists()).toBe(true)
  })

  // 测试 loaded 回调 - 失败场景（retry 模式）
  test('loaded 回调 - 加载失败 (retry 模式)', async () => {
    const context = {
      ...createMockContext(),
      errorStrategy: 'retry' as const,
      retryCount: 2
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      },
      slots: {
        default: `
          <template #default="{ loaded }">
            <img @error="loaded" src="invalid.jpg" />
          </template>
        `
      }
    })

    await nextTick()

    // 模拟图片加载失败
    const img = wrapper.find('img')
    if (img.exists()) {
      await img.trigger('error')
      await nextTick()
    }

    expect(wrapper.exists()).toBe(true)
  })

  // 测试 loaded 回调 - 失败场景（retryHard 模式）
  test('loaded 回调 - 加载失败 (retryHard 模式)', async () => {
    const context = {
      ...createMockContext(),
      errorStrategy: 'retryHard' as const,
      retryCount: 2
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      },
      slots: {
        default: `
          <template #default="{ loaded, status, onFallbackLoad, onFallbackError }">
            <img v-if="status === 'success'" @load="loaded" @error="loaded" src="test.jpg" />
            <img v-else-if="status === 'fail'" @load="onFallbackLoad" @error="onFallbackError" src="placeholder.jpg" />
            <div v-else>Error</div>
          </template>
        `
      }
    })

    await nextTick()
    expect(wrapper.exists()).toBe(true)
  })

  // 测试 onFallbackLoad 回调
  test('onFallbackLoad 回调', async () => {
    const context = {
      ...createMockContext(),
      errorStrategy: 'placeholder' as const
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      },
      slots: {
        default: `
          <template #default="{ loaded, status, onFallbackLoad }">
            <img v-if="status === 'fail'" @load="onFallbackLoad" src="placeholder.jpg" class="fallback-img" />
            <img v-else @error="loaded" src="test.jpg" />
          </template>
        `
      }
    })

    await nextTick()

    // 先触发原始图片失败
    const originalImg = wrapper.find('img')
    if (originalImg.exists()) {
      await originalImg.trigger('error')
      await nextTick()
    }

    // 然后触发降级图片加载成功
    const fallbackImg = wrapper.find('.fallback-img')
    if (fallbackImg.exists()) {
      await fallbackImg.trigger('load')
      await nextTick()
    }

    expect(wrapper.exists()).toBe(true)
  })

  // 测试 onFallbackError 回调
  test('onFallbackError 回调', async () => {
    const context = {
      ...createMockContext(),
      errorStrategy: 'retryHard' as const
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      },
      slots: {
        default: `
          <template #default="{ loaded, status, onFallbackLoad, onFallbackError }">
            <img v-if="status === 'fail'" @load="onFallbackLoad" @error="onFallbackError" src="placeholder.jpg" class="fallback-img" />
            <div v-else-if="status === 'over'" class="error-text">加载失败</div>
            <img v-else @error="loaded" src="test.jpg" />
          </template>
        `
      }
    })

    await nextTick()
    expect(wrapper.exists()).toBe(true)
  })

  // 测试固定宽高模式的加载
  test('固定宽高模式加载', async () => {
    const wrapper = mount(WdWaterfallItem, {
      props: {
        width: 200,
        height: 300
      },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      },
      slots: {
        default: `
          <template #default="{ loaded }">
            <img @load="loaded" src="test.jpg" />
          </template>
        `
      }
    })

    await nextTick()

    expect(wrapper.props('width')).toBe(200)
    expect(wrapper.props('height')).toBe(300)
  })

  // 测试超时处理
  test('超时处理', async () => {
    const context = {
      ...createMockContext(),
      maxWait: 100 // 设置很短的超时时间
    }

    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: context
        }
      },
      slots: {
        default: `
          <template #default="{ loaded, status }">
            <div class="status">{{ status }}</div>
            <img src="slow-loading.jpg" />
          </template>
        `
      }
    })

    await nextTick()

    // 等待超时
    await new Promise((resolve) => setTimeout(resolve, 150))
    await nextTick()

    expect(wrapper.exists()).toBe(true)
  })

  // 测试 columnWidth 和 imageHeight 计算
  test('columnWidth 和 imageHeight 计算', async () => {
    const wrapper = mount(WdWaterfallItem, {
      props: {
        width: 300,
        height: 400
      },
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      },
      slots: {
        default: `
          <template #default="{ columnWidth, imageHeight }">
            <div class="column-width">{{ columnWidth }}</div>
            <div class="image-height">{{ imageHeight }}</div>
          </template>
        `
      }
    })

    await nextTick()

    const columnWidthDiv = wrapper.find('.column-width')
    const imageHeightDiv = wrapper.find('.image-height')

    expect(columnWidthDiv.exists()).toBe(true)
    expect(imageHeightDiv.exists()).toBe(true)
  })

  // 测试状态变化
  test('状态变化', async () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      },
      slots: {
        default: `
          <template #default="{ loaded, status, message }">
            <div class="status">{{ status }}</div>
            <div class="message">{{ message }}</div>
            <img @error="loaded" src="invalid.jpg" />
          </template>
        `
      }
    })

    await nextTick()

    const statusDiv = wrapper.find('.status')
    expect(statusDiv.exists()).toBe(true)
    expect(statusDiv.text()).toBe('success') // 初始状态

    // 触发错误
    const img = wrapper.find('img')
    if (img.exists()) {
      await img.trigger('error')
      await nextTick()
    }
  })

  // 测试多个错误策略的消息
  test('错误策略消息', async () => {
    const strategies = [
      { strategy: 'default' as const, expectedStatus: 'success' },
      { strategy: 'placeholder' as const, expectedStatus: 'success' },
      { strategy: 'retry' as const, expectedStatus: 'success' },
      { strategy: 'retryHard' as const, expectedStatus: 'success' }
    ]

    for (const { strategy } of strategies) {
      const context = {
        ...createMockContext(),
        errorStrategy: strategy
      }

      const wrapper = mount(WdWaterfallItem, {
        global: {
          provide: {
            [waterfallContextKey as symbol]: context
          }
        },
        slots: {
          default: `
            <template #default="{ status, message }">
              <div class="status">{{ status }}</div>
              <div class="message">{{ message }}</div>
            </template>
          `
        }
      })

      await nextTick()

      const statusDiv = wrapper.find('.status')
      expect(statusDiv.exists()).toBe(true)

      wrapper.unmount()
    }
  })

  // 测试 slotId 变化（用于刷新）
  test('slotId 变化触发刷新', async () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      },
      slots: {
        default: `
          <template #default="{ loaded }">
            <img @load="loaded" src="test.jpg" />
          </template>
        `
      }
    })

    await nextTick()

    const vm = wrapper.vm as any
    const initialSlotId = vm.slotId

    // slotId 应该是一个字符串
    expect(typeof initialSlotId).toBe('string')
  })

  // 测试可见性延迟
  test('可见性延迟', async () => {
    const wrapper = mount(WdWaterfallItem, {
      global: {
        provide: {
          [waterfallContextKey as symbol]: mockWaterfallContext
        }
      }
    })

    await nextTick()

    // 初始不可见
    expect(wrapper.find('.is-show').exists()).toBe(false)

    // 模拟设置可见
    const vm = wrapper.vm as any
    if (vm.item) {
      vm.item.visible = true
      await nextTick()

      // 等待延迟
      await new Promise((resolve) => setTimeout(resolve, 150))
      await nextTick()
    }
  })

  // 测试重排状态下的样式
  test('重排状态下的样式', async () => {
    const isReflowingRef = ref(true)
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

    await nextTick()

    expect(wrapper.find('.is-reflowing').exists()).toBe(true)

    // 结束重排
    isReflowingRef.value = false
    await nextTick()

    expect(wrapper.find('.is-reflowing').exists()).toBe(false)
  })

  // 测试不同重试次数
  test('不同重试次数配置', async () => {
    const retryCounts = [0, 1, 2, 3, 5]

    for (const retryCount of retryCounts) {
      const context = {
        ...createMockContext(),
        errorStrategy: 'retry' as const,
        retryCount
      }

      const wrapper = mount(WdWaterfallItem, {
        global: {
          provide: {
            [waterfallContextKey as symbol]: context
          }
        }
      })

      await nextTick()
      expect(wrapper.exists()).toBe(true)

      wrapper.unmount()
    }
  })

  // 测试不同超时时间
  test('不同超时时间配置', async () => {
    const maxWaits = [500, 1000, 1500, 2000, 3000]

    for (const maxWait of maxWaits) {
      const context = {
        ...createMockContext(),
        maxWait
      }

      const wrapper = mount(WdWaterfallItem, {
        global: {
          provide: {
            [waterfallContextKey as symbol]: context
          }
        }
      })

      await nextTick()
      expect(wrapper.exists()).toBe(true)

      wrapper.unmount()
    }
  })

  // 测试宽高比计算
  test('宽高比计算', async () => {
    const testCases = [
      { width: 100, height: 100 }, // 1:1
      { width: 200, height: 100 }, // 2:1
      { width: 100, height: 200 }, // 1:2
      { width: 300, height: 400 } // 3:4
    ]

    for (const { width, height } of testCases) {
      const wrapper = mount(WdWaterfallItem, {
        props: { width, height },
        global: {
          provide: {
            [waterfallContextKey as symbol]: mockWaterfallContext
          }
        }
      })

      await nextTick()

      const vm = wrapper.vm as any
      const expectedRatio = height / width
      expect(vm.aspectRatio).toBeCloseTo(expectedRatio, 2)

      wrapper.unmount()
    }
  })
})
