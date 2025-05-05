import { mount } from '@vue/test-utils'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { StrokeLinecapType } from '@/uni_modules/wot-design-uni/components/wd-circle/types'
import WdCircle from '@/uni_modules/wot-design-uni/components/wd-circle/wd-circle.vue'
describe('WdCircle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // 测试基本渲染
  test('基本渲染', async () => {
    const wrapper = mount(WdCircle, {
      slots: {
        default: '' // 空插槽内容
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('wd-circle')
    expect(wrapper.find('canvas').exists()).toBe(true)
    // 当没有 text 属性但有插槽时，.wd-circle__text 元素应该存在
    expect(wrapper.find('.wd-circle__text').exists()).toBe(true)
    // 但内容应该为空
    expect(wrapper.find('.wd-circle__text').text()).toBe('')
  })

  // 测试进度值
  test('不同进度值', async () => {
    const rate = 75

    const wrapper = mount(WdCircle, {
      props: { modelValue: rate }
    })

    await nextTick()

    expect(wrapper.props('modelValue')).toBe(rate)
  })

  // 测试自定义颜色
  test('自定义颜色', async () => {
    const color = '#ff0000'

    const wrapper = mount(WdCircle, {
      props: { color }
    })

    await nextTick()

    expect(wrapper.props('color')).toBe(color)
  })

  // 测试大小设置
  test('自定义大小', async () => {
    const size = 200

    const wrapper = mount(WdCircle, {
      props: { size }
    })

    await nextTick()

    // 验证 canvas 样式
    const canvas = wrapper.find('canvas')
    expect(canvas.attributes('style')).toContain(`width: ${size}px`)
    expect(canvas.attributes('style')).toContain(`height: ${size}px`)
  })

  // 测试线条宽度
  test('自定义线条宽度', async () => {
    const strokeWidth = 8

    const wrapper = mount(WdCircle, {
      props: { strokeWidth }
    })

    await nextTick()

    expect(wrapper.props('strokeWidth')).toBe(strokeWidth)
  })

  // 测试文本内容
  test('文本内容', async () => {
    const text = '75%'

    const wrapper = mount(WdCircle, {
      props: { text }
    })

    await nextTick()

    expect(wrapper.find('.wd-circle__text').exists()).toBe(true)
    expect(wrapper.find('.wd-circle__text').text()).toBe(text)
  })

  // 测试默认插槽内容
  test('默认插槽内容', async () => {
    const content = '75%'

    const wrapper = mount(WdCircle, {
      slots: {
        default: content
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-circle__text').exists()).toBe(true)
    expect(wrapper.find('.wd-circle__text').text()).toBe(content)
  })

  // 测试渐变色
  test('渐变色', async () => {
    const gradientColors = {
      '0%': '#3be6cb',
      '100%': '#3b7eeb'
    }

    const wrapper = mount(WdCircle, {
      props: {
        color: gradientColors
      }
    })

    await nextTick()

    expect(wrapper.props('color')).toEqual(gradientColors)
  })

  // 测试顺时针/逆时针方向
  test('顺时针/逆时针方向', async () => {
    const wrapper = mount(WdCircle, {
      props: { clockwise: false }
    })

    await nextTick()

    expect(wrapper.props('clockwise')).toBe(false)
  })

  // 测试线条端点形状
  test('不同线条端点形状', async () => {
    const linecaps: StrokeLinecapType[] = ['butt', 'round', 'square']

    for (const linecap of linecaps) {
      const wrapper = mount(WdCircle, {
        props: { strokeLinecap: linecap }
      })

      await nextTick()

      expect(wrapper.props('strokeLinecap')).toBe(linecap)
    }
  })

  // 测试轨道颜色
  test('自定义轨道颜色', async () => {
    const layerColor = '#eeeeee'

    const wrapper = mount(WdCircle, {
      props: { layerColor }
    })

    await nextTick()

    expect(wrapper.props('layerColor')).toBe(layerColor)
  })

  // 测试填充颜色
  test('填充颜色', async () => {
    const fill = '#f5f5f5'

    const wrapper = mount(WdCircle, {
      props: { fill }
    })

    await nextTick()

    expect(wrapper.props('fill')).toBe(fill)
  })

  // 测试动画速度
  test('自定义动画速度', async () => {
    const speed = 100

    const wrapper = mount(WdCircle, {
      props: { speed }
    })

    await nextTick()

    expect(wrapper.props('speed')).toBe(speed)
  })

  // 测试自定义类名
  test('自定义类名', async () => {
    const customClass = 'custom-circle'

    const wrapper = mount(WdCircle, {
      props: { customClass }
    })

    await nextTick()

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', async () => {
    const customStyle = 'margin: 20px;'

    const wrapper = mount(WdCircle, {
      props: { customStyle }
    })

    await nextTick()

    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试进度值变化
  test('进度值变化', async () => {
    const wrapper = mount(WdCircle, {
      props: { modelValue: 0 }
    })

    await nextTick()

    // 更新进度值
    await wrapper.setProps({ modelValue: 50 })

    // 验证重新渲染
    expect(wrapper.props('modelValue')).toBe(50)
  })

  // 测试大小变化
  test('大小变化', async () => {
    const wrapper = mount(WdCircle, {
      props: { size: 100 }
    })

    await nextTick()

    // 更新大小
    await wrapper.setProps({ size: 150 })

    // 等待定时器
    vi.advanceTimersByTime(50)

    // 验证样式更新
    const canvas = wrapper.find('canvas')
    expect(canvas.attributes('style')).toContain('width: 150px')
    expect(canvas.attributes('style')).toContain('height: 150px')
  })

  // 测试颜色变化
  test('颜色变化', async () => {
    const wrapper = mount(WdCircle, {
      props: { color: '#ff0000' }
    })

    await nextTick()

    // 更新颜色
    await wrapper.setProps({ color: '#00ff00' })

    // 验证颜色更新
    expect(wrapper.props('color')).toBe('#00ff00')
  })

  // 测试动画渲染
  test('带速度的动画渲染', async () => {
    const wrapper = mount(WdCircle, {
      props: {
        modelValue: 0,
        speed: 100
      }
    })

    await nextTick()

    // 更新进度值
    await wrapper.setProps({ modelValue: 50 })

    // 等待动画完成
    vi.advanceTimersByTime(1000)

    // 验证进度值
    expect(wrapper.props('modelValue')).toBe(50)
  })

  // 测试无动画渲染
  test('速度为0时无动画渲染', async () => {
    const wrapper = mount(WdCircle, {
      props: {
        modelValue: 0,
        speed: 0
      }
    })

    await nextTick()

    // 更新进度值
    await wrapper.setProps({ modelValue: 50 })

    // 验证进度值
    expect(wrapper.props('modelValue')).toBe(50)
  })
})
