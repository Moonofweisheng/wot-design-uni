import { mount } from '@vue/test-utils'
import WdSticky from '@/uni_modules/wot-design-uni/components/wd-sticky/wd-sticky.vue'
import WdResize from '@/uni_modules/wot-design-uni/components/wd-resize/wd-resize.vue'
import { describe, test, expect } from 'vitest'

describe('吸顶组件', () => {
  // 测试基本渲染
  test('使用默认属性渲染吸顶组件', () => {
    const wrapper = mount(WdSticky, {
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })
    expect(wrapper.find('.wd-sticky').exists()).toBe(true)
    expect(wrapper.find('.wd-sticky__container').exists()).toBe(true)
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'my-sticky'
    const wrapper = mount(WdSticky, {
      props: {
        customClass
      },
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })
    expect(wrapper.find('.wd-sticky').classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'background-color: red;'
    const wrapper = mount(WdSticky, {
      props: {
        customStyle
      },
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试z-index
  test('应用z-index', () => {
    const zIndex = 100
    const wrapper = mount(WdSticky, {
      props: {
        zIndex
      },
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })
    // 验证z-index被应用到样式中
    const style = wrapper.attributes('style')
    expect(style).toBeDefined()
    expect(style).toContain('z-index')
  })

  // 测试插槽内容
  test('渲染插槽内容', () => {
    const wrapper = mount(WdSticky, {
      slots: {
        default: '<div class="sticky-content">Sticky Content</div>'
      },
      global: {
        components: {
          WdResize
        }
      }
    })
    // 由于 wd-resize 组件会包装插槽内容，我们需要检查 HTML 是否包含我们的内容
    expect(wrapper.html()).toContain('Sticky Content')
  })

  // 测试设置位置方法
  test('setPosition方法更新吸顶状态', async () => {
    const wrapper = mount(WdSticky, {
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })

    // 调用 setPosition 方法
    const vm = wrapper.vm as any
    vm.setPosition(true, 'fixed', 20)

    // 验证状态更新
    expect(vm.stickyState.boxLeaved).toBe(true)
    expect(vm.stickyState.position).toBe('fixed')
    expect(vm.stickyState.top).toBe(20)
  })

  // 测试偏移量
  test('应用offsetTop', () => {
    const offsetTop = 50
    const wrapper = mount(WdSticky, {
      props: {
        offsetTop
      },
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })

    // 验证计算属性
    expect((wrapper.vm as any).innerOffsetTop).toBeGreaterThanOrEqual(offsetTop)
  })

  // 测试尺寸变化处理
  test('处理尺寸变化事件', async () => {
    const wrapper = mount(WdSticky, {
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })

    const vm = wrapper.vm as any

    const newWidth = 200
    const newHeight = 100

    // 模拟尺寸变化
    await vm.handleResize({ width: newWidth, height: newHeight })

    // 验证尺寸更新
    expect(vm.stickyState.width).toBe(newWidth)
    expect(vm.stickyState.height).toBe(newHeight)
  })

  // 测试相对位置处理 - 正常状态
  test('处理相对位置 - 正常状态', async () => {
    const wrapper = mount(WdSticky, {
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })

    const vm = wrapper.vm as any

    // 模拟 boundingClientRect 数据 - 正常状态（top > offsetTop）
    await vm.handleRelativeTo({
      boundingClientRect: {
        top: 100,
        bottom: 200
      }
    })

    // 验证状态更新为正常状态
    expect(vm.stickyState.state).toBe('normal')
    expect(vm.stickyState.position).toBe('absolute')
    expect(vm.stickyState.top).toBe(0)
  })

  // 测试相对位置处理 - 吸顶状态
  test('处理相对位置 - 吸顶状态', async () => {
    const wrapper = mount(WdSticky, {
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })

    const vm = wrapper.vm as any

    // 模拟 boundingClientRect 数据 - 吸顶状态（top <= offsetTop）
    await vm.handleRelativeTo({
      boundingClientRect: {
        top: 0,
        bottom: 100
      }
    })

    // 验证状态更新为吸顶状态
    expect(vm.stickyState.state).toBe('sticky')
    expect(vm.stickyState.position).toBe('fixed')
    expect(vm.stickyState.top).toBe(vm.innerOffsetTop)
  })

  // 测试观察者内容滚动
  test('观察内容滚动', async () => {
    const wrapper = mount(WdSticky, {
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })

    const vm = wrapper.vm as any

    // 设置尺寸，否则 observerContentScroll 会提前返回
    vm.stickyState.height = 100
    vm.stickyState.width = 200

    // 调用 observerContentScroll 方法
    await vm.observerContentScroll()

    // 验证观察者被创建
    expect(uni.createIntersectionObserver).toHaveBeenCalled()
  })
})
