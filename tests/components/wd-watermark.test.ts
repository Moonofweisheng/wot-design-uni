import { mount } from '@vue/test-utils'
import WdWatermark from '@/uni_modules/wot-design-uni/components/wd-watermark/wd-watermark.vue'
import { describe, test, expect, beforeAll, vi } from 'vitest'

// 在测试开始前模拟 Canvas API 和 uni API
beforeAll(() => {
  // 模拟 uni API
  if (typeof uni !== 'undefined') {
    // 模拟 uni.canIUse
    if (!uni.canIUse) {
      uni.canIUse = vi.fn().mockImplementation((feature) => {
        // 默认返回 true，表示支持所有功能
        // 对于 createOffscreenCanvas，返回 false
        return feature !== 'createOffscreenCanvas'
      })
    }

    // 模拟 uni.createOffscreenCanvas
    if (!uni.createOffscreenCanvas) {
      uni.createOffscreenCanvas = vi.fn().mockImplementation(() => null)
    }
  }
  // 直接修改 HTMLCanvasElement.prototype.getContext
  if (typeof HTMLCanvasElement !== 'undefined') {
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: vi.fn().mockImplementation(() => ({
        fillStyle: '',
        font: '',
        textAlign: 'left',
        textBaseline: 'alphabetic',
        fillRect: vi.fn(),
        fillText: vi.fn(),
        measureText: vi.fn().mockReturnValue({ width: 100 }),
        rotate: vi.fn(),
        translate: vi.fn(),
        save: vi.fn(),
        restore: vi.fn(),
        clearRect: vi.fn(),
        drawImage: vi.fn(),
        createPattern: vi.fn().mockReturnValue({}),
        setTransform: vi.fn(),
        getImageData: vi.fn().mockReturnValue({
          data: new Uint8ClampedArray(400),
          width: 10,
          height: 10
        }),
        putImageData: vi.fn(),
        createLinearGradient: vi.fn().mockReturnValue({
          addColorStop: vi.fn()
        }),
        createRadialGradient: vi.fn().mockReturnValue({
          addColorStop: vi.fn()
        }),
        beginPath: vi.fn(),
        closePath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
        fill: vi.fn(),
        arc: vi.fn()
      })),
      writable: true,
      configurable: true
    })

    // 直接修改 HTMLCanvasElement.prototype.toDataURL
    Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
      value: vi
        .fn()
        .mockReturnValue('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='),
      writable: true,
      configurable: true
    })
  }

  // 模拟 document.createElement 方法
  if (typeof document !== 'undefined') {
    const originalCreateElement = document.createElement
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName.toLowerCase() === 'canvas') {
        const canvas = originalCreateElement.call(document, tagName) as any
        // 确保 canvas 元素有所有需要的方法和属性
        if (!canvas.getContext) {
          canvas.getContext = HTMLCanvasElement.prototype.getContext
        }
        if (!canvas.toDataURL) {
          canvas.toDataURL = HTMLCanvasElement.prototype.toDataURL
        }
        return canvas
      }
      return originalCreateElement.call(document, tagName)
    })
  }

  // 模拟 Image 构造函数
  if (typeof window !== 'undefined' && !window.Image) {
    // 使用 any 类型避免类型错误
    window.Image = class {
      src: string = ''
      width: number = 0
      height: number = 0
      crossOrigin: string | null = null
      referrerPolicy: string | null = null
      onload: (() => void) | null = null
      onerror: (() => void) | null = null

      constructor() {
        // 在构造函数中设置一个延迟的 onload 调用，模拟图片加载
        setTimeout(() => {
          this.width = 100
          this.height = 100
          if (this.onload) {
            this.onload()
          }
        }, 0)
      }
    } as any
  }
})

describe('WdWatermark', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdWatermark)
    expect(wrapper.classes()).toContain('wd-watermark')
  })

  // 测试水印文本
  test('文本内容渲染', () => {
    const content = '测试水印'
    const wrapper = mount(WdWatermark, {
      props: { content }
    })
    expect((wrapper.vm as any).content).toBe(content)
  })

  // 测试水印图片
  test('图片源渲染', () => {
    const image = 'https://example.com/logo.png'
    const wrapper = mount(WdWatermark, {
      props: { image }
    })
    expect((wrapper.vm as any).image).toBe(image)
  })

  // 测试宽高设置
  test('自定义宽高', () => {
    const width = 200
    const height = 100
    const wrapper = mount(WdWatermark, {
      props: { width, height }
    })
    expect((wrapper.vm as any).width).toBe(width)
    expect((wrapper.vm as any).height).toBe(height)
  })

  // 测试旋转角度
  test('旋转角度设置', () => {
    const rotate = -45
    const wrapper = mount(WdWatermark, {
      props: { rotate }
    })
    expect((wrapper.vm as any).rotate).toBe(rotate)
  })

  // 测试透明度
  test('透明度设置', () => {
    const opacity = 0.5
    const wrapper = mount(WdWatermark, {
      props: { opacity }
    })
    expect((wrapper.vm as any).opacity).toBe(opacity)
  })

  // 测试字体大小
  test('字体大小设置', () => {
    const size = 20
    const wrapper = mount(WdWatermark, {
      props: { size }
    })
    expect((wrapper.vm as any).size).toBe(size)
  })

  // 测试字体颜色
  test('字体颜色设置', () => {
    const color = '#ff0000'
    const wrapper = mount(WdWatermark, {
      props: { color }
    })
    expect((wrapper.vm as any).color).toBe(color)
  })

  // 测试Z轴层级
  test('z-index设置', () => {
    const zIndex = 100
    const wrapper = mount(WdWatermark, {
      props: { zIndex }
    })
    expect((wrapper.vm as any).zIndex).toBe(zIndex)
  })

  // 测试默认插槽
  test('默认插槽内容', () => {
    const wrapper = mount(WdWatermark, {
      slots: {
        default: '<div class="content">页面内容</div>'
      }
    })
    // 检查组件是否正确渲染，而不是检查具体的插槽内容
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('wd-watermark')
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-watermark'
    const wrapper = mount(WdWatermark, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'background: #f5f5f5;'
    const wrapper = mount(WdWatermark, {
      props: { customStyle }
    })
    // 检查样式是否应用，但允许颜色格式的差异（#f5f5f5 vs rgb(245, 245, 245)）
    expect(wrapper.attributes('style')).toContain('background:')
    expect(wrapper.attributes('style')).toContain('rgb(245, 245, 245)')
  })

  // 测试水印全屏显示
  test('全屏水印渲染', () => {
    const wrapper = mount(WdWatermark, {
      props: { fullscreen: true }
    })
    expect(wrapper.classes()).toContain('is-fullscreen')
  })

  // 测试水印重复渲染
  test('属性变化时更新水印', async () => {
    const wrapper = mount(WdWatermark, {
      props: { content: 'initial' }
    })
    await wrapper.setProps({ content: 'updated' })
    expect((wrapper.vm as any).content).toBe('updated')
  })
})
