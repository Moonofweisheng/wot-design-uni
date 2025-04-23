import { mount } from '@vue/test-utils'
import WdWatermark from '@/uni_modules/wot-design-uni/components/wd-watermark/wd-watermark.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { setupWatermarkTest } from '../setup-watermark'
import { setupCanvasMock } from '../setup-canvas-mock'

describe('WdWatermark', () => {
  beforeEach(() => {
    // Mock canvas API
    ;(global as any).uni = {
      createOffscreenCanvas: vi.fn(({ height, width }) => ({
        height,
        width,
        getContext: vi.fn(() => ({
          fillStyle: '',
          font: '',
          textAlign: '',
          textBaseline: '',
          fillText: vi.fn(),
          fillRect: vi.fn(),
          rotate: vi.fn(),
          translate: vi.fn(),
          drawImage: vi.fn(),
          save: vi.fn(),
          restore: vi.fn(),
          clearRect: vi.fn(),
          setTransform: vi.fn()
        })),
        createImage: vi.fn(() => ({
          src: '',
          onload: vi.fn(),
          onerror: vi.fn()
        })),
        // 添加toDataURL方法模拟
        toDataURL: vi
          .fn()
          .mockReturnValue('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==')
      })),
      canIUse: vi.fn().mockReturnValue(true),
      getSystemInfoSync: vi.fn().mockReturnValue({ pixelRatio: 2 })
    }

    // 使用专门的watermark测试设置
    setupWatermarkTest()

    // 确保每个测试都有Canvas API模拟
    setupCanvasMock()
  })
  // 测试基本渲染
  test('renders watermark with default props', () => {
    const wrapper = mount(WdWatermark)
    expect(wrapper.classes()).toContain('wd-watermark')
  })

  // 测试水印文本
  test('renders with text content', () => {
    const content = '测试水印'
    const wrapper = mount(WdWatermark, {
      props: { content }
    })
    expect(wrapper.vm.content).toBe(content)
  })

  // 测试水印图片
  test('renders with image source', () => {
    const image = 'https://example.com/logo.png'
    const wrapper = mount(WdWatermark, {
      props: { image }
    })
    expect(wrapper.vm.image).toBe(image)
  })

  // 测试宽高设置
  test('renders with custom width and height', () => {
    const width = 200
    const height = 100
    const wrapper = mount(WdWatermark, {
      props: { width, height }
    })
    expect(wrapper.vm.width).toBe(width)
    expect(wrapper.vm.height).toBe(height)
  })

  // 测试旋转角度
  test('renders with rotation', () => {
    const rotate = -45
    const wrapper = mount(WdWatermark, {
      props: { rotate }
    })
    expect(wrapper.vm.rotate).toBe(rotate)
  })

  // 测试透明度
  test('renders with opacity', () => {
    const opacity = 0.5
    const wrapper = mount(WdWatermark, {
      props: { opacity }
    })
    expect(wrapper.vm.opacity).toBe(opacity)
  })

  // 测试字体大小
  test('renders with font size', () => {
    const size = 20
    const wrapper = mount(WdWatermark, {
      props: { size }
    })
    expect(wrapper.vm.size).toBe(size)
  })

  // 测试字体颜色
  test('renders with font color', () => {
    const color = '#ff0000'
    const wrapper = mount(WdWatermark, {
      props: { color }
    })
    expect(wrapper.vm.color).toBe(color)
  })

  // 测试Z轴层级
  test('renders with z-index', () => {
    const zIndex = 100
    const wrapper = mount(WdWatermark, {
      props: { zIndex }
    })
    expect(wrapper.vm.zIndex).toBe(zIndex)
  })

  // 测试默认插槽
  test('renders default slot content', () => {
    const wrapper = mount(WdWatermark, {
      slots: {
        default: '<div class="content">页面内容</div>'
      }
    })
    // 检查插槽内容是否被渲染到了组件内部
    expect(wrapper.html()).toContain('页面内容')
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-watermark'
    const wrapper = mount(WdWatermark, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'background: #f5f5f5;'
    const wrapper = mount(WdWatermark, {
      props: { customStyle }
    })
    // 检查样式是否应用，但允许颜色格式的差异（#f5f5f5 vs rgb(245, 245, 245)）
    expect(wrapper.attributes('style')).toContain('background:')
    expect(wrapper.attributes('style')).toContain('rgb(245, 245, 245)')
  })

  // 测试水印全屏显示
  test('renders fullscreen watermark', () => {
    const wrapper = mount(WdWatermark, {
      props: { fullscreen: true }
    })
    expect(wrapper.classes()).toContain('is-fullscreen')
  })

  // 测试水印重复渲染
  test('updates watermark when props change', async () => {
    const wrapper = mount(WdWatermark, {
      props: { content: 'initial' }
    })
    await wrapper.setProps({ content: 'updated' })
    expect(wrapper.vm.content).toBe('updated')
  })
})
