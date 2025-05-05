import { mount } from '@vue/test-utils'
import WdStickyBox from '@/uni_modules/wot-design-uni/components/wd-sticky-box/wd-sticky-box.vue'
import WdResize from '@/uni_modules/wot-design-uni/components/wd-resize/wd-resize.vue'
import { describe, test, expect } from 'vitest'

// 由于 wd-sticky-box 组件依赖于 uni-app 的特定 API，
// 这些在测试环境中不容易模拟，所以我们只进行基本的测试
describe('吸顶容器组件', () => {
  // 测试基本渲染
  test('使用默认属性渲染吸顶容器', () => {
    const wrapper = mount(WdStickyBox, {
      global: {
        components: {
          WdResize
        },
        stubs: {
          'wd-resize': true
        }
      }
    })
    expect(wrapper.find('.wd-sticky-box').exists()).toBe(true)
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'my-sticky-box'
    const wrapper = mount(WdStickyBox, {
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
    expect(wrapper.find('.wd-sticky-box').classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'background-color: red;'
    const wrapper = mount(WdStickyBox, {
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
    expect(wrapper.find('.wd-sticky-box').attributes('style')).toBe(customStyle)
  })

  // 测试插槽内容
  test('渲染插槽内容', () => {
    const wrapper = mount(WdStickyBox, {
      slots: {
        default: '<div class="sticky-box-content">Sticky Box Content</div>'
      },
      global: {
        components: {
          WdResize
        }
      }
    })
    // 由于 wd-resize 组件会包装插槽内容，我们需要检查 HTML 是否包含我们的内容
    expect(wrapper.html()).toContain('Sticky Box Content')
  })

  // 测试尺寸变化处理
  test('处理尺寸变化事件', async () => {
    const wrapper = mount(WdStickyBox, {
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

    // 直接测试尺寸更新，而不是尝试模拟复杂的组件交互
    await vm.handleResize({ width: 200, height: 100 })

    // 验证尺寸更新
    expect(vm.boxStyle.width).toBe(200)
    expect(vm.boxStyle.height).toBe(100)
  })
})
