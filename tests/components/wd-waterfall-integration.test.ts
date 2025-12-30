import { mount } from '@vue/test-utils'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick, defineComponent, h } from 'vue'
import WdWaterfall from '@/uni_modules/wot-design-uni/components/wd-waterfall/wd-waterfall.vue'
import WdWaterfallItem from '@/uni_modules/wot-design-uni/components/wd-waterfall-item/wd-waterfall-item.vue'

/**
 * WdWaterfall 集成测试
 *
 * 测试瀑布流组件与子项目组件的集成场景：
 * 1. 父子组件通信（addItem/removeItem）
 * 2. 项目加载和布局计算
 * 3. 重排和重置功能
 * 4. 错误处理流程
 * 5. 自动加载更多机制
 */
describe('WdWaterfall Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试父子组件集成
  test('父子组件集成渲染', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      template: `
        <wd-waterfall>
          <wd-waterfall-item v-for="i in 3" :key="i" :order="i">
            <template #default="{ loaded }">
              <div class="item-content">Item {{ i }}</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    // 验证瀑布流容器存在
    expect(wrapper.findComponent(WdWaterfall).exists()).toBe(true)

    // 验证子项目存在
    const items = wrapper.findAllComponents(WdWaterfallItem)
    expect(items.length).toBe(3)
  })

  // 测试动态添加项目
  test('动态添加项目', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      data() {
        return {
          items: [1, 2, 3]
        }
      },
      template: `
        <wd-waterfall>
          <wd-waterfall-item v-for="i in items" :key="i" :order="i">
            <template #default="{ loaded }">
              <div class="item-content">Item {{ i }}</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    // 初始有 3 个项目
    expect(wrapper.findAllComponents(WdWaterfallItem).length).toBe(3)

    // 添加新项目
    wrapper.vm.items.push(4)
    await nextTick()

    // 验证项目数量增加
    expect(wrapper.findAllComponents(WdWaterfallItem).length).toBe(4)
  })

  // 测试动态移除项目
  test('动态移除项目', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      data() {
        return {
          items: [1, 2, 3, 4]
        }
      },
      template: `
        <wd-waterfall>
          <wd-waterfall-item v-for="i in items" :key="i" :order="i">
            <template #default="{ loaded }">
              <div class="item-content">Item {{ i }}</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    // 初始有 4 个项目
    expect(wrapper.findAllComponents(WdWaterfallItem).length).toBe(4)

    // 移除一个项目
    wrapper.vm.items.pop()
    await nextTick()

    // 验证项目数量减少
    expect(wrapper.findAllComponents(WdWaterfallItem).length).toBe(3)
  })

  // 测试 reflow 方法
  test('reflow 方法集成测试', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      template: `
        <wd-waterfall ref="waterfall" :columns="2">
          <wd-waterfall-item v-for="i in 3" :key="i" :order="i">
            <template #default="{ loaded }">
              <div class="item-content">Item {{ i }}</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    const waterfallRef = wrapper.findComponent({ ref: 'waterfall' })
    const waterfallVm = waterfallRef.vm as any

    // 调用 reflow 方法
    await waterfallVm.reflow()

    // 验证组件仍然正常
    expect(waterfallRef.exists()).toBe(true)
  })

  // 测试 reset 方法
  test('reset 方法集成测试', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      data() {
        return {
          items: [1, 2, 3]
        }
      },
      template: `
        <wd-waterfall ref="waterfall">
          <wd-waterfall-item v-for="i in items" :key="i" :order="i">
            <template #default="{ loaded }">
              <div class="item-content">Item {{ i }}</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    const waterfallRef = wrapper.findComponent({ ref: 'waterfall' })
    const waterfallVm = waterfallRef.vm as any

    // 调用 reset 方法
    await waterfallVm.reset()

    // 验证组件仍然正常
    expect(waterfallRef.exists()).toBe(true)
  })

  // 测试 loadDone 回调
  test('loadDone 回调集成测试', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      template: `
        <wd-waterfall ref="waterfall">
          <wd-waterfall-item v-for="i in 2" :key="i" :order="i">
            <template #default="{ loaded }">
              <div class="item-content">Item {{ i }}</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    const waterfallRef = wrapper.findComponent({ ref: 'waterfall' })
    const waterfallVm = waterfallRef.vm as any

    const callback = vi.fn()

    // 注册 loadDone 回调
    waterfallVm.loadDone(callback)

    // 验证方法可以被调用
    expect(typeof waterfallVm.loadDone).toBe('function')
  })

  // 测试不同列数配置
  test('不同列数配置集成测试', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      data() {
        return {
          columns: 2
        }
      },
      template: `
        <wd-waterfall :columns="columns">
          <wd-waterfall-item v-for="i in 4" :key="i" :order="i">
            <template #default="{ loaded }">
              <div class="item-content">Item {{ i }}</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    // 验证初始列数
    const waterfallComponent = wrapper.findComponent(WdWaterfall)
    expect(waterfallComponent.props('columns')).toBe(2)

    // 改变列数
    wrapper.vm.columns = 3
    await nextTick()

    expect(waterfallComponent.props('columns')).toBe(3)
  })

  // 测试错误处理策略集成
  test('错误处理策略集成测试', async () => {
    const strategies = ['default', 'placeholder', 'retry', 'retryHard'] as const

    for (const strategy of strategies) {
      const TestComponent = defineComponent({
        components: { WdWaterfall, WdWaterfallItem },
        setup() {
          return { strategy }
        },
        template: `
          <wd-waterfall :error-strategy="strategy">
            <wd-waterfall-item :order="0">
              <template #default="{ loaded, status }">
                <div class="item-content">Item with {{ status }}</div>
              </template>
            </wd-waterfall-item>
          </wd-waterfall>
        `
      })

      const wrapper = mount(TestComponent)
      await nextTick()

      const waterfallComponent = wrapper.findComponent(WdWaterfall)
      expect(waterfallComponent.props('errorStrategy')).toBe(strategy)

      wrapper.unmount()
    }
  })

  // 测试固定宽高项目
  test('固定宽高项目集成测试', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      template: `
        <wd-waterfall>
          <wd-waterfall-item :order="0" :width="200" :height="300">
            <template #default="{ loaded }">
              <div class="item-content">Fixed size item</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    const itemComponent = wrapper.findComponent(WdWaterfallItem)
    expect(itemComponent.props('width')).toBe(200)
    expect(itemComponent.props('height')).toBe(300)
  })

  // 测试自定义样式
  test('自定义样式集成测试', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      template: `
        <wd-waterfall custom-class="custom-waterfall" custom-style="background: red;">
          <wd-waterfall-item :order="0" custom-class="custom-item" custom-style="color: blue;">
            <template #default="{ loaded }">
              <div class="item-content">Styled item</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    const waterfallComponent = wrapper.findComponent(WdWaterfall)
    expect(waterfallComponent.props('customClass')).toBe('custom-waterfall')

    const itemComponent = wrapper.findComponent(WdWaterfallItem)
    expect(itemComponent.props('customClass')).toBe('custom-item')
  })

  // 测试显示隐藏控制
  test('显示隐藏控制集成测试', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      data() {
        return {
          show: true
        }
      },
      template: `
        <wd-waterfall :show="show">
          <wd-waterfall-item :order="0">
            <template #default="{ loaded }">
              <div class="item-content">Item</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    const waterfallComponent = wrapper.findComponent(WdWaterfall)
    expect(waterfallComponent.props('show')).toBe(true)

    // 隐藏瀑布流
    wrapper.vm.show = false
    await nextTick()

    expect(waterfallComponent.props('show')).toBe(false)
  })

  // 测试间距配置
  test('间距配置集成测试', async () => {
    const TestComponent = defineComponent({
      components: { WdWaterfall, WdWaterfallItem },
      template: `
        <wd-waterfall :column-gap="16" :row-gap="12">
          <wd-waterfall-item v-for="i in 3" :key="i" :order="i">
            <template #default="{ loaded }">
              <div class="item-content">Item {{ i }}</div>
            </template>
          </wd-waterfall-item>
        </wd-waterfall>
      `
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    const waterfallComponent = wrapper.findComponent(WdWaterfall)
    expect(waterfallComponent.props('columnGap')).toBe(16)
    expect(waterfallComponent.props('rowGap')).toBe(12)
  })
})
