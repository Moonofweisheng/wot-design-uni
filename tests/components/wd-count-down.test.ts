import { mount } from '@vue/test-utils'
import WdCountDown from '@/uni_modules/wot-design-uni/components/wd-count-down/wd-count-down.vue'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import type { CountDownExpose } from '@/uni_modules/wot-design-uni/components/wd-count-down/types'

describe('WdCountDown 倒计时组件', () => {
  beforeEach(() => {
    // 使用假定时器
    vi.useFakeTimers()
  })

  afterEach(() => {
    // 恢复真实定时器
    vi.useRealTimers()
  })

  // 测试基本渲染
  test('使用默认属性渲染倒计时', () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 60000 // 添加必需的 time 属性
      }
    })
    expect(wrapper.classes()).toContain('wd-count-down')
  })

  // 测试时间格式
  test('使用自定义时间格式渲染', () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 3600000, // 1小时
        format: 'HH:mm:ss'
      }
    })
    expect(wrapper.text()).toMatch(/\d{2}:\d{2}:\d{2}/)
  })

  // 测试自动开始
  test('当autoStart为true时自动开始倒计时', async () => {
    const onChange = vi.fn()
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000,
        autoStart: true,
        onChange
      }
    })

    expect(wrapper.props('autoStart')).toBe(true)

    // 模拟时间流逝
    vi.advanceTimersByTime(100)
    await nextTick()

    // 验证 onChange 被调用
    expect(onChange).toHaveBeenCalled()
  })

  // 测试不自动开始
  test('当autoStart为false时不自动开始倒计时', async () => {
    const onChange = vi.fn()
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000,
        autoStart: false,
        onChange
      }
    })

    expect(wrapper.props('autoStart')).toBe(false)

    // 模拟时间流逝
    vi.advanceTimersByTime(500)
    await nextTick()

    // 验证 onChange 没有被调用
    expect(onChange).not.toHaveBeenCalled()

    // 手动开始
    const vm = wrapper.vm as unknown as CountDownExpose
    vm.start()

    // 模拟时间流逝
    vi.advanceTimersByTime(500)
    await nextTick()

    // 验证 onChange 被调用
    expect(onChange).toHaveBeenCalled()
  })

  // 测试暂停功能
  test('调用pause方法暂停倒计时', async () => {
    const onChange = vi.fn()
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000,
        autoStart: true,
        onChange
      }
    })

    // 模拟时间流逝
    vi.advanceTimersByTime(500)
    await nextTick()

    // 重置 mock 以便检查暂停后是否还会调用
    onChange.mockReset()

    // 暂停倒计时
    const vm = wrapper.vm as unknown as CountDownExpose
    vm.pause()

    // 模拟更多时间流逝
    vi.advanceTimersByTime(500)
    await nextTick()

    // 验证 onChange 在暂停后没有被调用
    expect(onChange).not.toHaveBeenCalled()
  })

  // 测试重置功能
  test('调用reset方法重置倒计时', async () => {
    const onChange = vi.fn()
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000,
        autoStart: true,
        onChange
      }
    })

    // 模拟时间流逝
    vi.advanceTimersByTime(500)
    await nextTick()

    // 重置 mock 以便检查重置后的行为
    onChange.mockReset()

    // 重置倒计时
    const vm = wrapper.vm as unknown as CountDownExpose
    vm.reset()

    // 验证重置后时间恢复到初始值
    expect(wrapper.text()).toContain('00:00:00')

    // 如果 autoStart 为 true，重置后应该自动开始
    vi.advanceTimersByTime(100)
    await nextTick()

    // 验证 onChange 在重置后被调用
    expect(onChange).toHaveBeenCalled()
  })

  // 测试完成事件
  test('倒计时结束时触发finish事件', async () => {
    const onFinish = vi.fn()
    mount(WdCountDown, {
      props: {
        time: 100,
        autoStart: true,
        onFinish
      }
    })

    // 模拟时间流逝超过倒计时时间
    vi.advanceTimersByTime(200)
    await nextTick()

    // 验证 onFinish 被调用
    expect(onFinish).toHaveBeenCalled()
  })

  // 测试自定义插槽
  test('使用自定义插槽渲染当前时间数据', async () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 60000 // 1分钟
      },
      slots: {
        default: `
          <template #default="{ current }">
            <div class="custom-content">
              <span class="minutes">{{ current.minutes }}</span>:
              <span class="seconds">{{ current.seconds }}</span>
            </div>
          </template>
        `
      }
    })

    await nextTick()

    // 验证自定义插槽内容被正确渲染
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.minutes').text()).toBe('1')
    expect(wrapper.find('.seconds').text()).toBe('0')
  })

  // 测试毫秒显示
  test('当millisecond为true时显示毫秒', () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000,
        format: 'ss:SSS',
        millisecond: true
      }
    })
    expect(wrapper.text()).toMatch(/\d{2}:\d{3}/)
  })

  // 测试不同的时间格式
  test('支持不同的时间格式', () => {
    // 测试天数格式
    const wrapper1 = mount(WdCountDown, {
      props: {
        time: 86400000, // 1天
        format: 'DD 天 HH 时 mm 分 ss 秒'
      }
    })
    expect(wrapper1.text()).toBe('01 天 00 时 00 分 00 秒')

    // 测试小时格式
    const wrapper2 = mount(WdCountDown, {
      props: {
        time: 3600000, // 1小时
        format: 'HH:mm:ss'
      }
    })
    expect(wrapper2.text()).toBe('01:00:00')

    // 测试分钟格式
    const wrapper3 = mount(WdCountDown, {
      props: {
        time: 60000, // 1分钟
        format: 'mm:ss'
      }
    })
    expect(wrapper3.text()).toBe('01:00')

    // 测试秒格式
    const wrapper4 = mount(WdCountDown, {
      props: {
        time: 1000, // 1秒
        format: 'ss'
      }
    })
    expect(wrapper4.text()).toBe('01')
  })

  // 测试时间变化事件
  test('时间变化时触发change事件', async () => {
    const onChange = vi.fn()
    mount(WdCountDown, {
      props: {
        time: 1000,
        autoStart: true,
        onChange
      }
    })

    // 模拟时间流逝
    vi.advanceTimersByTime(500)
    await nextTick()

    // 验证 onChange 被调用，并且传递了正确的时间数据
    expect(onChange).toHaveBeenCalled()
    const timeData = onChange.mock.calls[0][0]
    expect(timeData).toHaveProperty('days')
    expect(timeData).toHaveProperty('hours')
    expect(timeData).toHaveProperty('minutes')
    expect(timeData).toHaveProperty('seconds')
    expect(timeData).toHaveProperty('milliseconds')
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-countdown'
    const wrapper = mount(WdCountDown, {
      props: { time: 1000, customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'color: red;'
    const wrapper = mount(WdCountDown, {
      props: { time: 1000, customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试时间为0的情况
  test('正确处理时间为0的情况', () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 0,
        format: 'HH:mm:ss'
      }
    })
    expect(wrapper.text()).toBe('00:00:00')
  })

  // 测试时间更新
  test('当time属性变化时更新显示', async () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000,
        format: 'ss'
      }
    })

    expect(wrapper.text()).toBe('01')

    // 更新时间
    await wrapper.setProps({ time: 2000 })

    // 验证显示更新
    expect(wrapper.text()).toBe('02')
  })

  // 测试组件方法的可用性
  test('暴露start、pause和reset方法', () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000
      }
    })

    const vm = wrapper.vm as unknown as CountDownExpose

    // 验证方法存在
    expect(typeof vm.start).toBe('function')
    expect(typeof vm.pause).toBe('function')
    expect(typeof vm.reset).toBe('function')
  })

  // 测试毫秒级渲染的精度
  test('毫秒级渲染的精度', async () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1500, // 1.5秒
        format: 'ss:SSS',
        millisecond: true
      }
    })

    expect(wrapper.text()).toBe('01:500')

    // 模拟时间流逝
    vi.advanceTimersByTime(500)
    await nextTick()

    // 验证毫秒更新
    expect(wrapper.text()).toMatch(/01:0\d{2}/)
  })
})
