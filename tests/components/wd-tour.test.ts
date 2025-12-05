import { mount } from '@vue/test-utils'
import WdTour from '@/uni_modules/wot-design-uni/components/wd-tour/wd-tour.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'

// 模拟 useLockScroll 函数
vi.mock('@/uni_modules/wot-design-uni/components/composables/useLockScroll', () => ({
  default: vi.fn(() => ({
    lock: vi.fn(),
    unlock: vi.fn()
  }))
}))

// 模拟uni对象
const mockUni = {
  createSelectorQuery: vi.fn(() => ({
    select: vi.fn(() => ({
      boundingClientRect: vi.fn((callback) => {
        // 模拟元素位置信息
        setTimeout(() => {
          callback({
            top: 100,
            left: 50,
            width: 200,
            height: 100
          })
        }, 10)
        return {
          exec: vi.fn()
        }
      })
    }))
  })),
  pageScrollTo: vi.fn(),
  getSystemInfoSync: vi.fn(() => ({
    windowHeight: 600,
    windowTop: 0,
    statusBarHeight: 20
  })),
  getMenuButtonBoundingClientRect: vi.fn()
}

// 模拟全局uni对象
Object.defineProperty(global, 'uni', {
  value: mockUni
})

describe('WdTour', () => {
  const steps = [
    {
      element: '#step1',
      content: '这是第一步'
    },
    {
      element: '#step2',
      content: '这是第二步'
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    // 重置模拟函数
    mockUni.createSelectorQuery.mockClear()
    mockUni.createSelectorQuery.mockImplementation(() => ({
      select: vi.fn(() => ({
        boundingClientRect: vi.fn((callback) => {
          // 模拟元素位置信息
          setTimeout(() => {
            callback({
              top: 100,
              left: 50,
              width: 200,
              height: 100
            })
          }, 10)
          return {
            exec: vi.fn()
          }
        })
      }))
    }))
  })

  // 测试基本渲染
  test('基本渲染', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps
      }
    })

    // 等待 DOM 更新
    await wrapper.vm.$nextTick()

    expect(wrapper.classes()).toContain('wd-tour')
    expect(wrapper.find('.wd-tour__mask').exists()).toBe(true)
  })

  // 测试隐藏状态
  test('隐藏状态', () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: false,
        steps
      }
    })

    expect(wrapper.find('.wd-tour').exists()).toBe(false)
  })

  // 测试步骤内容渲染
  test('渲染步骤内容', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      }
    })

    // 等待 DOM 更新和元素查询完成
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.wd-tour__info').exists()).toBe(true)
    // 验证富文本内容是否正确渲染
    const richText = wrapper.find('.wd-tour__info rich-text')
    expect(richText.exists()).toBe(true)
  })

  // 测试按钮显示
  test('显示导航按钮', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    // 第一步应该显示"跳过"和"下一步"按钮
    expect(wrapper.find('.wd-tour__skip').exists()).toBe(true)
    expect(wrapper.find('.wd-tour__next').exists()).toBe(true)
    expect(wrapper.find('.wd-tour__prev').exists()).toBe(false)
    expect(wrapper.find('.wd-tour__finish').exists()).toBe(false)
  })

  // 测试最后一步按钮
  test('最后一步显示完成按钮', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 150))

    // 更新 current 属性
    await wrapper.setProps({ current: 1 })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 150))

    // 最后一步应该显示"上一步"和"完成"按钮
    expect(wrapper.find('.wd-tour__prev').exists()).toBe(true)
    expect(wrapper.find('.wd-tour__finish').exists()).toBe(true)
    expect(wrapper.find('.wd-tour__next').exists()).toBe(false)
    expect(wrapper.find('.wd-tour__skip').exists()).toBe(true)
  })
  // ... existing code ...

  // 测试自定义按钮文字
  test('自定义按钮文字', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0,
        prevText: '上一页',
        nextText: '下一页',
        skipText: '忽略',
        finishText: '结束'
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.wd-tour__skip__default').text()).toBe('忽略')
    expect(wrapper.find('.wd-tour__finish__default').exists()).toBe(false) // 不在第一页
  })

  // 测试进度显示
  test('显示进度', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.wd-tour__next__default').text()).toContain('(1/2)')
  })

  // 测试点击下一步
  test('点击下一步按钮', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const nextButton = wrapper.find('.wd-tour__next')
    await nextButton.trigger('click')

    // 验证是否发出 next 事件
    expect(wrapper.emitted('next')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  // 测试点击上一步按钮
  test('点击上一步按钮', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 150))

    // 更新 current 属性
    await wrapper.setProps({ current: 1 })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 150))

    const prevButton = wrapper.find('.wd-tour__prev')
    expect(prevButton.exists()).toBe(true)
    await prevButton.trigger('click')

    // 验证是否发出 prev 事件
    expect(wrapper.emitted('prev')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  // 测试点击完成按钮
  test('点击完成按钮', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 150))

    // 更新 current 属性
    await wrapper.setProps({ current: 1 })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 150))

    const finishButton = wrapper.find('.wd-tour__finish')
    expect(finishButton.exists()).toBe(true)
    await finishButton.trigger('click')

    // 验证是否发出 finish 事件和更新 modelValue
    expect(wrapper.emitted('finish')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // 测试点击跳过按钮
  test('点击跳过按钮', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const skipButton = wrapper.find('.wd-tour__skip')
    await skipButton.trigger('click')

    // 验证是否发出 skip 事件和更新 modelValue
    expect(wrapper.emitted('skip')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // 测试点击蒙版
  test('点击蒙版触发下一步', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0,
        clickMaskNext: true
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const mask = wrapper.find('.wd-tour__mask')
    await mask.trigger('click')

    // 验证是否触发下一步
    expect(wrapper.emitted('next')).toBeTruthy()
  })

  // 测试禁用点击蒙版
  test('禁用点击蒙版', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0,
        clickMaskNext: false
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const mask = wrapper.find('.wd-tour__mask')
    await mask.trigger('click')

    // 验证不触发下一步
    expect(wrapper.emitted('next')).toBeFalsy()
  })

  // 测试蒙版显示
  test('显示/隐藏蒙版', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0,
        mask: false
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    // 等待元素信息更新完成
    await new Promise((resolve) => setTimeout(resolve, 100))

    // 当 mask 为 false 时，boxShadow 应该为 none
    const highlightStyle = wrapper.find('.wd-tour__highlight').attributes('style')
    expect(highlightStyle).toContain('box-shadow: none')
  })

  // 测试自定义高亮区域插槽
  test('使用自定义高亮区域插槽', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      },
      slots: {
        highlight: '<div class="custom-highlight">自定义高亮区域</div>'
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.custom-highlight').exists()).toBe(true)
    expect(wrapper.find('.wd-tour__highlight').exists()).toBe(false)
  })

  // 测试自定义内容插槽
  test('使用自定义内容插槽', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      },
      slots: {
        content: '<div class="custom-content">自定义内容</div>'
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.wd-tour__info').exists()).toBe(false)
  })

  // 测试自定义按钮插槽
  test('使用自定义按钮插槽', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      },
      slots: {
        prev: '<button class="custom-prev">上一步</button>',
        next: '<button class="custom-next">下一步</button>',
        skip: '<button class="custom-skip">跳过</button>',
        finish: '<button class="custom-finish">完成</button>'
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    // 在第一页时，prev和finish按钮不应该存在
    expect(wrapper.find('.custom-prev').exists()).toBe(false)
    expect(wrapper.find('.custom-next').exists()).toBe(true)
    expect(wrapper.find('.custom-skip').exists()).toBe(true)
    expect(wrapper.find('.custom-finish').exists()).toBe(false)
  })

  // 测试样式属性
  test('应用样式属性', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0,
        maskColor: 'rgba(255, 0, 0, 0.5)',
        offset: 30,
        borderRadius: 10,
        padding: 15
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    // 等待元素信息更新完成
    await new Promise((resolve) => setTimeout(resolve, 100))

    const highlightStyle = wrapper.find('.wd-tour__highlight').attributes('style')
    expect(highlightStyle).toContain('border-radius: 10px')
    expect(highlightStyle).toContain('padding: 15px')
  })

  // 测试 zIndex 属性
  test('应用 zIndex', async () => {
    const zIndex = 10000
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0,
        zIndex
      }
    })

    await wrapper.vm.$nextTick()

    const style = wrapper.find('.wd-tour').attributes('style')
    expect(style).toContain(`z-index: ${zIndex}`)
  })

  // 测试禁用引导按钮
  test('禁用引导按钮', async () => {
    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0,
        showTourButtons: false
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.wd-tour__buttons').exists()).toBe(false)
  })

  // 测试错误处理
  test('处理元素查找错误', async () => {
    // 模拟找不到元素的情况
    mockUni.createSelectorQuery.mockImplementation(() => ({
      select: vi.fn(() => ({
        boundingClientRect: vi.fn((callback) => {
          // 模拟找不到元素
          setTimeout(() => {
            callback(null)
          }, 10)
          return {
            exec: vi.fn()
          }
        })
      }))
    }))

    const wrapper = mount(WdTour, {
      props: {
        modelValue: true,
        steps,
        current: 0
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    // 验证是否发出 error 事件
    expect(wrapper.emitted('error')).toBeTruthy()
  })
})
