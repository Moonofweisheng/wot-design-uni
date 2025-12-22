import { mount } from '@vue/test-utils'
import WdWaterfall from '@/uni_modules/wot-design-uni/components/wd-waterfall/wd-waterfall.vue'
import { describe, test, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import type { ErrorStrategy } from '@/uni_modules/wot-design-uni/components/wd-waterfall/types'

describe('WdWaterfall', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdWaterfall)
    // 检查容器是否存在（使用动态生成的 containerId）
    expect(wrapper.find('view').exists()).toBe(true)
    expect(wrapper.find('view').attributes('class')).toMatch(/wd-waterfall-/)
  })

  // 测试默认属性
  test('默认属性', () => {
    const wrapper = mount(WdWaterfall)
    expect(wrapper.props('columns')).toBe(2)
    expect(wrapper.props('columnGap')).toBe(8)
    expect(wrapper.props('rowGap')).toBe(8)
  })

  // 测试自定义列数
  test('自定义列数', () => {
    const wrapper = mount(WdWaterfall, {
      props: { columns: 3 }
    })
    expect(wrapper.props('columns')).toBe(3)
  })

  // 测试自定义列间距
  test('自定义列间距', () => {
    const wrapper = mount(WdWaterfall, {
      props: { columnGap: 16 }
    })
    expect(wrapper.props('columnGap')).toBe(16)
  })

  // 测试自定义行间距
  test('自定义行间距', () => {
    const wrapper = mount(WdWaterfall, {
      props: { rowGap: 12 }
    })
    expect(wrapper.props('rowGap')).toBe(12)
  })

  // 测试显示隐藏控制
  test('显示隐藏控制', () => {
    const wrapper = mount(WdWaterfall, {
      props: { show: false }
    })
    expect(wrapper.props('show')).toBe(false)
  })

  // 测试错误处理策略
  test('错误处理策略', () => {
    const errorStrategies: ErrorStrategy[] = ['default', 'placeholder', 'retry', 'retryHard', 'pass']

    errorStrategies.forEach((strategy) => {
      const wrapper = mount(WdWaterfall, {
        props: { errorStrategy: strategy }
      })
      expect(wrapper.props('errorStrategy')).toBe(strategy)
    })
  })

  // 测试重试次数设置
  test('重试次数设置', () => {
    const wrapper = mount(WdWaterfall, {
      props: { retryCount: 5 }
    })
    expect(wrapper.props('retryCount')).toBe(5)
  })

  // 测试最大等待时间设置
  test('最大等待时间设置', () => {
    const wrapper = mount(WdWaterfall, {
      props: { maxWait: 5000 }
    })
    expect(wrapper.props('maxWait')).toBe(5000)
  })

  // 测试自定义样式类
  test('自定义样式类', () => {
    const customClass = 'my-waterfall'
    const wrapper = mount(WdWaterfall, {
      props: { customClass }
    })
    expect(wrapper.find('view').classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'background-color: red;'
    const wrapper = mount(WdWaterfall, {
      props: { customStyle }
    })
    const style = wrapper.find('view').attributes('style')
    expect(style).toBeDefined()
    expect(style).toContain('background-color: red')
  })

  // 测试插槽渲染
  test('插槽渲染', () => {
    const wrapper = mount(WdWaterfall, {
      slots: {
        default: '<div class="test-slot">测试内容</div>'
      }
    })

    expect(wrapper.find('.test-slot').exists()).toBe(true)
    expect(wrapper.find('.test-slot').text()).toBe('测试内容')
  })

  // 测试暴露的方法
  test('暴露的方法', async () => {
    const wrapper = mount(WdWaterfall)
    const vm = wrapper.vm as any

    // 测试 reflow 方法存在
    expect(typeof vm.reflow).toBe('function')

    // 测试 refreshReflow 方法存在
    expect(typeof vm.refreshReflow).toBe('function')

    // 测试 loadDone 方法存在
    expect(typeof vm.loadDone).toBe('function')
  })

  // 测试容器尺寸初始化
  test('容器尺寸初始化', async () => {
    const wrapper = mount(WdWaterfall)
    const vm = wrapper.vm as any

    // 等待组件挂载完成
    await nextTick()

    // 验证容器ID生成
    expect(vm.containerId).toMatch(/^wd-waterfall-/)
  })

  // 测试多列布局
  test('多列布局', () => {
    const testCases = [1, 2, 3, 4, 5]

    testCases.forEach((columns) => {
      const wrapper = mount(WdWaterfall, {
        props: { columns }
      })

      expect(wrapper.props('columns')).toBe(columns)
    })
  })

  // 测试边界情况
  test('边界情况处理', () => {
    // 测试最小列数
    const wrapper1 = mount(WdWaterfall, {
      props: { columns: 1 }
    })
    expect(wrapper1.props('columns')).toBe(1)

    // 测试零间距
    const wrapper2 = mount(WdWaterfall, {
      props: { columnGap: 0, rowGap: 0 }
    })
    expect(wrapper2.props('columnGap')).toBe(0)
    expect(wrapper2.props('rowGap')).toBe(0)
  })
})
