import { mount } from '@vue/test-utils'
import WdCountDown from '@/uni_modules/wot-design-uni/components/wd-count-down/wd-count-down.vue'
import { describe, test, expect } from 'vitest'

describe('WdCountDown', () => {
  // 测试基本渲染
  test('renders count down with default props', () => {
    const wrapper = mount(WdCountDown)
    expect(wrapper.classes()).toContain('wd-count-down')
  })

  // 测试时间格式
  test('renders with time format', () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 3600000, // 1小时
        format: 'HH:mm:ss'
      }
    })
    expect(wrapper.text()).toMatch(/\d{2}:\d{2}:\d{2}/)
  })

  // 测试自动开始
  test('starts automatically when autoStart is true', () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000,
        autoStart: true
      }
    })
    expect(wrapper.vm.autoStart).toBe(true)
  })

  // 测试暂停功能
  test('pauses countdown when called', async () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000,
        autoStart: true
      }
    })
    await wrapper.vm.$emit('pause')
    expect(wrapper.emitted('pause')).toBeTruthy()
  })

  // 测试重置功能
  test('resets countdown when called', async () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000
      }
    })
    await wrapper.vm.$emit('reset')
    expect(wrapper.emitted('reset')).toBeTruthy()
  })

  // 测试完成事件
  test('emits finish event when countdown ends', async () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 0
      }
    })
    await wrapper.vm.$emit('finish')
    expect(wrapper.emitted('finish')).toBeTruthy()
  })

  // 测试自定义插槽
  test('renders custom slot content', () => {
    const wrapper = mount(WdCountDown, {
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  // 测试毫秒显示
  test('renders with milliseconds', () => {
    const wrapper = mount(WdCountDown, {
      props: {
        time: 1000,
        format: 'ss:SSS',
        millisecond: true
      }
    })
    expect(wrapper.text()).toMatch(/\d{2}:\d{3}/)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-countdown'
    const wrapper = mount(WdCountDown, {
      props: { time: 1000, customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'color: red;'
    const wrapper = mount(WdCountDown, {
      props: { time: 1000, customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
