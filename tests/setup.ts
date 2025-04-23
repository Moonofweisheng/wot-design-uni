import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import { setupCanvasMock } from './setup-canvas-mock'

// 设置Canvas API模拟
setupCanvasMock()

// 配置全局组件模拟
config.global.stubs = {
  // 模拟uni-app的block组件
  block: {
    template: '<div><slot></slot></div>'
  },
  // 模拟wd-icon组件
  'wd-icon': {
    template: '<i class="wd-icon"></i>',
    props: ['name', 'size', 'color']
  }
}

// 模拟 uni-app 环境
const uni = {
  showToast: vi.fn(),
  hideToast: vi.fn(),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  showModal: vi.fn(),
  previewImage: vi.fn(),
  getSystemInfoSync: vi.fn(() => ({
    platform: 'ios',
    windowWidth: 375,
    windowHeight: 667,
    screenWidth: 375,
    screenHeight: 667
  })),
  upx2px: vi.fn((size) => size * 2),
  createSelectorQuery: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    selectAll: vi.fn().mockReturnThis(),
    boundingClientRect: vi.fn().mockReturnThis(),
    fields: vi.fn((options, callback) => {
      if (callback) {
        callback({
          width: 100,
          height: 100,
          node: {
            width: 100,
            height: 100,
            getContext: vi.fn(() => ({
              scale: vi.fn(),
              fillRect: vi.fn(),
              clearRect: vi.fn(),
              getImageData: vi.fn(),
              putImageData: vi.fn(),
              createImageData: vi.fn(),
              setLineDash: vi.fn(),
              getLineDash: vi.fn(),
              measureText: vi.fn(),
              createLinearGradient: vi.fn(),
              createRadialGradient: vi.fn(),
              // 添加绘图必要方法
              beginPath: vi.fn(),
              moveTo: vi.fn(),
              lineTo: vi.fn(),
              stroke: vi.fn(),
              arc: vi.fn(),
              fill: vi.fn(),
              setStrokeStyle: vi.fn(),
              setLineWidth: vi.fn(),
              setLineCap: vi.fn(),
              setFillStyle: vi.fn(),
              closePath: vi.fn(),
              draw: vi.fn()
            }))
          }
        })
      }
      return {
        exec: vi.fn()
      }
    }),
    exec: vi.fn(),
    in: vi.fn().mockReturnThis()
  })),
  createCanvasContext: vi.fn(() => {
    const ctx = {
      scale: vi.fn(),
      arc: vi.fn(),
      stroke: vi.fn(),
      setStrokeStyle: vi.fn(),
      setLineWidth: vi.fn(),
      setLineCap: vi.fn(),
      setFillStyle: vi.fn(),
      beginPath: vi.fn(),
      closePath: vi.fn(),
      draw: vi.fn(),
      clearRect: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      fill: vi.fn(),
      createLinearGradient: vi.fn(() => ({
        addColorStop: vi.fn()
      })),
      // 添加缺失的方法
      rotate: vi.fn(),
      translate: vi.fn(),
      fillText: vi.fn(),
      fillRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      setTransform: vi.fn(),
      toDataURL: vi.fn(() => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==')
    }
    return ctx
  }),
  // 添加对createOffscreenCanvas的模拟
  createOffscreenCanvas: vi.fn(({ height, width }) => {
    const context = {
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
      setTransform: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      createLinearGradient: vi.fn(() => ({
        addColorStop: vi.fn()
      })),
      // 确保所有绘图方法都可用
      setStrokeStyle: vi.fn(),
      setLineWidth: vi.fn(),
      setLineCap: vi.fn(),
      setFillStyle: vi.fn(),
      closePath: vi.fn(),
      draw: vi.fn()
    }
    const canvas = {
      height,
      width,
      getContext: vi.fn(() => context),
      // 确保toDataURL方法直接定义在canvas对象上，而不是在原型链上
      toDataURL: vi.fn(() => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==')
    }
    return canvas
  }),
  createImage: vi.fn(() => ({
    src: '',
    onload: vi.fn(),
    onerror: vi.fn()
  })),
  // 确保全局toDataURL方法可用
  toDataURL: vi.fn(() => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='),
  width: 100,
  height: 100
}

;(global as any).uni = uni
;(global as any).getCurrentPages = vi.fn(() => [{ route: 'pages/index/index', $getAppWebview: vi.fn() }])
;(global as any).getApp = vi.fn(() => ({}))

// 模拟 uni-app 生命周期
;(global as any).onLaunch = vi.fn()
;(global as any).onShow = vi.fn()
;(global as any).onHide = vi.fn()
;(global as any).onUnload = vi.fn()
;(global as any).onError = vi.fn()

// 模拟触摸事件
class TouchEvent extends Event {
  touches: Array<{ clientX: number; clientY: number }>
  constructor(type: string, options: any = {}) {
    super(type, options)
    this.touches = options.touches || [{ clientX: 0, clientY: 0 }]
  }
}

// 添加到全局
;(global as any).TouchEvent = TouchEvent
