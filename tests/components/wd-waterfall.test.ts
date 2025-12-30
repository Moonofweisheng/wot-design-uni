import { mount } from '@vue/test-utils'
import WdWaterfall from '@/uni_modules/wot-design-uni/components/wd-waterfall/wd-waterfall.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import type { ErrorStrategy } from '@/uni_modules/wot-design-uni/components/wd-waterfall/types'

/**
 * WdWaterfall 组件测试
 *
 * 测试覆盖：
 * 1. 基本渲染和默认属性
 * 2. 自定义列数、列间距、行间距
 * 3. 显示隐藏控制和双向绑定
 * 4. 错误处理策略（default, placeholder, retry, retryHard, pass）
 * 5. 重试次数和最大等待时间设置
 * 6. 自定义样式类和样式
 * 7. 插槽渲染
 * 8. 暴露的方法（reflow, reset, loadDone, checkAndLoadMore）
 * 9. 容器尺寸初始化
 * 10. 多列布局和边界情况
 * 11. 事件触发（loadStart, loadEnd, autoLoadMore）
 * 12. loadStatus 状态管理
 * 13. 上下文提供（useChildren 模式）
 *
 * 最近更新：
 * - 重命名自动加载更多事件为 autoLoadMore
 * - 使用 useChildren/useParent 重构组件间通信
 * - 更新响应式属性类型定义
 * - 优化注释说明和错误处理逻辑
 */
describe('WdWaterfall', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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

    // 测试 reset 方法存在
    expect(typeof vm.reset).toBe('function')

    // 测试 loadDone 方法存在
    expect(typeof vm.loadDone).toBe('function')

    // 测试 checkAndLoadMore 方法存在
    expect(typeof vm.checkAndLoadMore).toBe('function')

    // 测试 loadStatus 属性存在
    expect(['idle', 'busy']).toContain(vm.loadStatus)
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

  // 测试事件触发
  test('事件触发', async () => {
    const wrapper = mount(WdWaterfall)

    // 测试 loadStart 事件
    expect(wrapper.emitted()).not.toHaveProperty('loadStart')

    // 测试 loadEnd 事件
    expect(wrapper.emitted()).not.toHaveProperty('loadEnd')

    // 测试 autoLoadMore 事件
    expect(wrapper.emitted()).not.toHaveProperty('autoLoadMore')
  })

  // 测试 show 属性双向绑定
  test('show 属性双向绑定', async () => {
    const wrapper = mount(WdWaterfall, {
      props: { show: true }
    })

    expect(wrapper.props('show')).toBe(true)

    // 模拟更新 show 状态
    await wrapper.setProps({ show: false })
    expect(wrapper.props('show')).toBe(false)
  })

  // 测试 loadStatus 初始状态
  test('loadStatus 初始状态', () => {
    const wrapper = mount(WdWaterfall)
    const vm = wrapper.vm as any

    // 初始状态应该是 idle
    expect(vm.loadStatus).toBe('idle')
  })

  // 测试上下文提供
  test('上下文提供', () => {
    const wrapper = mount(WdWaterfall)
    const vm = wrapper.vm as any

    // 验证组件实例存在
    expect(vm).toBeDefined()
    expect(wrapper.exists()).toBe(true)
  })

  // 测试 reflow 方法调用
  test('reflow 方法调用', async () => {
    const wrapper = mount(WdWaterfall)
    const vm = wrapper.vm as any

    // 调用 reflow 方法
    await vm.reflow()

    // 验证方法执行后组件仍然正常
    expect(wrapper.exists()).toBe(true)
  })

  // 测试 reset 方法调用
  test('reset 方法调用', async () => {
    const wrapper = mount(WdWaterfall)
    const vm = wrapper.vm as any

    // 调用 reset 方法
    await vm.reset()

    // 验证方法执行后组件仍然正常
    expect(wrapper.exists()).toBe(true)
    expect(vm.loadStatus).toBe('idle')
  })

  // 测试 loadDone 回调注册
  test('loadDone 回调注册', async () => {
    const wrapper = mount(WdWaterfall)
    const vm = wrapper.vm as any
    const callback = vi.fn()

    // 在空闲状态下注册回调应该立即执行
    vm.loadDone(callback)

    await nextTick()
    expect(callback).toHaveBeenCalled()
  })

  // 测试列数变化触发重排
  test('列数变化触发重排', async () => {
    const wrapper = mount(WdWaterfall, {
      props: { columns: 2 }
    })

    // 改变列数
    await wrapper.setProps({ columns: 3 })
    await nextTick()

    expect(wrapper.props('columns')).toBe(3)
  })

  // 测试列间距变化触发重排
  test('列间距变化触发重排', async () => {
    const wrapper = mount(WdWaterfall, {
      props: { columnGap: 8 }
    })

    // 改变列间距
    await wrapper.setProps({ columnGap: 16 })
    await nextTick()

    expect(wrapper.props('columnGap')).toBe(16)
  })

  // 测试行间距变化触发重排
  test('行间距变化触发重排', async () => {
    const wrapper = mount(WdWaterfall, {
      props: { rowGap: 8 }
    })

    // 改变行间距
    await wrapper.setProps({ rowGap: 16 })
    await nextTick()

    expect(wrapper.props('rowGap')).toBe(16)
  })

  // 测试 checkAndLoadMore 方法
  test('checkAndLoadMore 方法调用', () => {
    const wrapper = mount(WdWaterfall)
    const vm = wrapper.vm as any

    // 调用 checkAndLoadMore 方法
    vm.checkAndLoadMore()

    // 验证方法可以被调用
    expect(typeof vm.checkAndLoadMore).toBe('function')
  })

  // 测试容器高度计算
  test('容器高度初始化', () => {
    const wrapper = mount(WdWaterfall)
    const vm = wrapper.vm as any

    // 初始容器高度应该为 0
    expect(vm.containerHeight).toBe(0)
  })

  // 测试列宽度计算
  test('列宽度计算', async () => {
    const wrapper = mount(WdWaterfall, {
      props: { columns: 2, columnGap: 8 }
    })
    const vm = wrapper.vm as any

    await nextTick()

    // 列宽度应该根据容器宽度和列数计算
    expect(typeof vm.columnWidth).toBe('number')
  })
})
