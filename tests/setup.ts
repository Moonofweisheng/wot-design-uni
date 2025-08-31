import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import './suppress-warnings'

// 全局设置 uni 相关 API 的 mock
vi.stubGlobal('uni', {
  // 设置 getSystemInfoSync 方法
  getSystemInfoSync: vi.fn().mockReturnValue({
    brand: 'devtools',
    model: 'iPhone',
    pixelRatio: 2,
    screenWidth: 375,
    screenHeight: 800,
    windowWidth: 375,
    windowHeight: 667,
    windowTop: 0,
    statusBarHeight: 20,
    language: 'zh-CN',
    version: '1.0.0',
    platform: 'ios',
    safeArea: {
      bottom: 780,
      height: 667,
      left: 0,
      right: 375,
      top: 20,
      width: 375
    },
    safeAreaInsets: {
      bottom: 20,
      left: 0,
      right: 0,
      top: 20
    },
    theme: 'light'
  }),
  // 模拟 Canvas 相关 API
  createCanvasContext: vi.fn().mockReturnValue({
    setFillStyle: vi.fn(),
    setStrokeStyle: vi.fn(),
    setLineWidth: vi.fn(),
    setLineCap: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    clearRect: vi.fn(),
    draw: vi.fn((_, callback) => {
      callback && callback()
    }),
    createLinearGradient: vi.fn().mockReturnValue({
      addColorStop: vi.fn()
    }),
    scale: vi.fn(),
    fillRect: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    drawImage: vi.fn(),
    restore: vi.fn()
  }),
  // 模拟 Canvas 导出图片 API
  canvasToTempFilePath: vi.fn().mockImplementation(({ success }) => {
    success?.({
      tempFilePath: 'cropped-image.jpg'
    })
  }),
  // 模拟 SelectorQuery 相关 API
  createSelectorQuery: vi.fn().mockImplementation(() => {
    // 创建一个更健壮的 mock 对象，支持链式调用和不同的选择器
    let currentSelector = ''
    let isSelectAll = false
    let boundingClientRectCallback: ((rect: any) => void) | null = null
    let scrollOffsetCallback: ((rect: any) => void) | null = null
    let fieldsCallback: ((rect: any) => void) | null = null
    let fieldsOptions: any = null
    let currentScope: any = null

    // 默认的节点信息模板
    const mockNodeInfo = {
      id: '',
      dataset: {},
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
      scrollTop: 0,
      scrollLeft: 0
    }

    const mockQuery: any = {
      // 支持 in 方法，用于组件内查询
      in: vi.fn((scope) => {
        currentScope = scope
        return mockQuery
      }),

      select: vi.fn((selector) => {
        currentSelector = selector
        isSelectAll = false
        return mockQuery
      }),

      selectAll: vi.fn((selector) => {
        currentSelector = selector
        isSelectAll = true
        return mockQuery
      }),

      selectViewport: vi.fn(() => {
        currentSelector = 'viewport'
        isSelectAll = false
        return mockQuery
      }),

      boundingClientRect: vi.fn((callback) => {
        boundingClientRectCallback = callback
        return mockQuery
      }),

      scrollOffset: vi.fn((callback) => {
        scrollOffsetCallback = callback
        return mockQuery
      }),

      fields: vi.fn((fields, callback) => {
        fieldsOptions = fields
        fieldsCallback = callback
        return mockQuery
      }),

      exec: vi.fn((callback) => {
        // 根据选择器和方法生成模拟数据
        let result

        // 提取选择器中的 ID 或类名
        const idMatch = currentSelector.match(/#([^.\s]+)/)
        const classMatch = currentSelector.match(/\.([^#\s]+)/)
        const id = idMatch ? idMatch[1] : ''
        const className = classMatch ? classMatch[1] : ''

        // 创建模拟节点信息，根据选择器调整
        let nodeInfo = { ...mockNodeInfo, id }

        // 为特定选择器提供特定的模拟数据
        if (currentSelector.includes('wd-tabs') || currentSelector.includes('wd-tab')) {
          nodeInfo = {
            ...nodeInfo,
            width: 375,
            height: 44,
            top: 0,
            left: 0,
            right: 375,
            bottom: 44
          }
        } else if (currentSelector.includes('wd-segmented')) {
          nodeInfo = {
            ...nodeInfo,
            width: 300,
            height: 40,
            top: 0,
            left: 0,
            right: 300,
            bottom: 40
          }
        } else if (currentSelector.includes('wd-index-bar')) {
          nodeInfo = {
            ...nodeInfo,
            width: 375,
            height: 600,
            top: 0,
            left: 0,
            right: 375,
            bottom: 600
          }
        }

        // 根据是否是 selectAll 返回数组或单个对象
        if (isSelectAll) {
          // 为不同的选择器创建不同数量的项目
          let count = 2
          if (currentSelector.includes('wd-segmented__item')) {
            count = 3
          } else if (currentSelector.includes('wd-tab')) {
            count = 4
          } else if (currentSelector.includes('wd-index-anchor')) {
            count = 5
          }

          // 创建指定数量的节点信息
          result = Array(count)
            .fill(0)
            .map((_, index) => ({
              ...nodeInfo,
              id: `${id || className}-${index}`,
              dataset: { index: index.toString() },
              width: nodeInfo.width / count,
              left: (nodeInfo.width / count) * index,
              right: (nodeInfo.width / count) * (index + 1)
            }))
        } else {
          result = nodeInfo
        }

        // 调用相应的回调函数
        if (boundingClientRectCallback) {
          boundingClientRectCallback(result)
        }

        if (scrollOffsetCallback) {
          scrollOffsetCallback(result)
        }

        if (fieldsCallback) {
          fieldsCallback(result)
        }

        // 如果提供了 exec 的回调，也调用它
        if (callback) {
          callback([result])
        }

        return Promise.resolve([result])
      })
    }

    return mockQuery
  }),
  // 模拟 IntersectionObserver 相关 API
  createIntersectionObserver: vi.fn().mockImplementation(() => {
    let relativeToOptions: any = null
    let relativeToViewportOptions: any = null

    const mockObserver: any = {
      relativeTo: vi.fn((selector, margins) => {
        relativeToOptions = { selector, margins }
        return mockObserver
      }),

      relativeToViewport: vi.fn((margins) => {
        relativeToViewportOptions = margins
        return mockObserver
      }),

      observe: vi.fn((selector, callback) => {
        if (callback) {
          // 提取选择器中的 ID
          const idMatch = selector.match(/#([^.\s]+)/)
          const id = idMatch ? idMatch[1] : selector

          callback({
            id: id,
            dataset: {},
            intersectionRatio: 0.5,
            intersectionRect: {
              width: 100,
              height: 100,
              top: 0,
              left: 0,
              right: 100,
              bottom: 100
            },
            boundingClientRect: {
              width: 100,
              height: 100,
              top: 0,
              left: 0,
              right: 100,
              bottom: 100
            },
            relativeRect: {
              width: 100,
              height: 100,
              top: 0,
              left: 0,
              right: 100,
              bottom: 100
            },
            time: Date.now()
          })
        }
      }),

      disconnect: vi.fn()
    }

    return mockObserver
  }),
  // 模拟图片预览相关 API
  previewImage: vi.fn().mockImplementation((options) => {
    if (options.success) options.success({ errMsg: 'previewImage:ok' })
    if (options.complete) options.complete()
    return Promise.resolve({ errMsg: 'previewImage:ok' })
  }),
  // 模拟页面滚动相关 API
  pageScrollTo: vi.fn().mockImplementation((options) => {
    if (options.success) options.success({ errMsg: 'pageScrollTo:ok' })
    if (options.complete) options.complete()
    return Promise.resolve({ errMsg: 'pageScrollTo:ok' })
  }),
  // 模拟上传文件相关 API
  uploadFile: vi.fn().mockImplementation((options) => {
    if (options.success) options.success({ data: '{"code": 0, "msg": "success", "url": "https://example.com/image.jpg"}' })
    if (options.complete) options.complete()
    return {
      onProgressUpdate: vi.fn(),
      abort: vi.fn()
    }
  }),
  // 模拟选择文件相关 API
  chooseImage: vi.fn().mockImplementation((options) => {
    if (options.success) {
      options.success({
        tempFilePaths: ['https://example.com/image.jpg'],
        tempFiles: [{ path: 'https://example.com/image.jpg', size: 1024 }]
      })
    }
    if (options.complete) options.complete()
    return Promise.resolve({
      tempFilePaths: ['https://example.com/image.jpg'],
      tempFiles: [{ path: 'https://example.com/image.jpg', size: 1024 }]
    })
  }),
  // 模拟保存图片相关 API
  saveImageToPhotosAlbum: vi.fn().mockImplementation((options) => {
    if (options.success) options.success({ errMsg: 'saveImageToPhotosAlbum:ok' })
    if (options.complete) options.complete()
    return Promise.resolve({ errMsg: 'saveImageToPhotosAlbum:ok' })
  }),
  // 模拟获取图片信息相关 API
  getImageInfo: vi.fn().mockImplementation((options) => {
    if (options.src) {
      if (options.success) {
        options.success({
          width: 800,
          height: 600,
          path: options.src,
          orientation: 'up',
          type: 'png'
        })
      }
    } else {
      if (options.fail) options.fail()
    }
    if (options.complete) options.complete()
    return Promise.resolve({
      width: 800,
      height: 600,
      path: options.src,
      orientation: 'up',
      type: 'png'
    })
  }),
  // 模拟 toast 相关 API
  showToast: vi.fn().mockImplementation((options) => {
    if (options.success) options.success()
    if (options.complete) options.complete()
    return Promise.resolve({ errMsg: 'showToast:ok' })
  }),
  hideToast: vi.fn().mockImplementation((options) => {
    if (options?.success) options.success()
    if (options?.complete) options.complete()
    return Promise.resolve({ errMsg: 'hideToast:ok' })
  }),
  // 模拟 loading 相关 API
  showLoading: vi.fn().mockImplementation((options) => {
    if (options.success) options.success()
    if (options.complete) options.complete()
    return Promise.resolve({ errMsg: 'showLoading:ok' })
  }),
  hideLoading: vi.fn().mockImplementation((options) => {
    if (options?.success) options.success()
    if (options?.complete) options.complete()
    return Promise.resolve({ errMsg: 'hideLoading:ok' })
  }),
  // 模拟 modal 相关 API
  showModal: vi.fn().mockImplementation((options) => {
    if (options.success) options.success({ confirm: true, cancel: false })
    if (options.complete) options.complete()
    return Promise.resolve({ confirm: true, cancel: false, errMsg: 'showModal:ok' })
  }),
  // 模拟 小程序路由相关 API
  navigateTo: vi.fn().mockImplementation((options) => {
    if (options?.success) options.success()
    if (options?.complete) options.complete()
    return Promise.resolve({ errMsg: 'navigateTo:ok' })
  }),
  redirectTo: vi.fn().mockImplementation((options) => {
    if (options?.success) options.success()
    if (options?.complete) options.complete()
    return Promise.resolve({ errMsg: 'redirectTo:ok' })
  }),
  // 模拟 canIUse API
  canIUse: vi.fn().mockImplementation((feature: string) => {
    // 默认返回 true，表示支持所有功能
    // 可以根据需要为特定功能返回 false
    const unsupportedFeatures: string[] = [
      'createOffscreenCanvas'
      // 在这里添加不支持的功能
    ]
    return !unsupportedFeatures.includes(feature)
  }),

  // 模拟振动反馈 API
  vibrateShort: vi.fn().mockImplementation((options?: any) => {
    if (options?.success) options.success()
    if (options?.complete) options.complete()
    return Promise.resolve({ errMsg: 'vibrateShort:ok' })
  }),

  // 模拟获取节点信息 API
  getNodeInfo: vi.fn().mockImplementation((options) => {
    if (options?.success) {
      options.success({
        id: options.selector || '',
        dataset: {},
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        right: 100,
        bottom: 100
      })
    }
    if (options?.complete) options.complete()
    return Promise.resolve({
      id: options.selector || '',
      dataset: {},
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      right: 100,
      bottom: 100
    })
  }),

  // 模拟页面滚动监听 API
  onPageScroll: vi.fn(),

  // 模拟窗口尺寸变化监听 API
  onWindowResize: vi.fn(),
  // 模拟 createOffscreenCanvas API
  createOffscreenCanvas: vi.fn().mockImplementation((options?: { width?: number; height?: number }) => {
    // 返回一个模拟的 OffscreenCanvas 对象
    return {
      width: options?.width || 300,
      height: options?.height || 150,
      getContext: vi.fn().mockReturnValue({
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
        createPattern: vi.fn().mockReturnValue({})
      }),
      createImage: vi.fn().mockImplementation(() => {
        const img = {
          src: '',
          onload: null as unknown as (() => void) | null,
          onerror: null as unknown as (() => void) | null
        }
        return img
      })
    }
  })
})

// 配置全局组件模拟
config.global.components = {
  // 模拟uni-app的block组件
  block: {
    name: 'block',
    template: '<div><slot></slot></div>'
  },
  // 模拟uni-app的view组件
  view: {
    name: 'uni-view',
    template: '<div><slot></slot></div>'
  },
  // 模拟uni-app的text组件
  text: {
    name: 'uni-text',
    template: '<span><slot></slot></span>'
  },
  // 模拟uni-app的image组件
  image: {
    name: 'uni-image',
    template: '<img><slot></slot></img>',
    props: ['src', 'mode', 'lazy-load']
  },
  // 模拟uni-app的scroll-view组件
  'scroll-view': {
    name: 'uni-scroll-view',
    template: '<div class="scroll-view"><slot></slot></div>',
    props: ['scroll-y', 'scroll-x', 'scroll-top', 'scroll-left', 'scroll-into-view']
  },
  // 模拟uni-app的swiper组件
  swiper: {
    name: 'uni-swiper',
    template: '<div class="swiper"><slot></slot></div>',
    props: ['indicator-dots', 'autoplay', 'interval', 'duration', 'circular']
  },
  // 模拟uni-app的swiper-item组件
  'swiper-item': {
    name: 'uni-swiper-item',
    template: '<div class="swiper-item"><slot></slot></div>'
  },
  // 模拟uni-app的input组件
  input: {
    name: 'uni-input',
    template: '<input />',
    props: ['value', 'type', 'password', 'placeholder', 'disabled', 'maxlength'],
    emits: ['input', 'focus', 'blur', 'confirm']
  },
  // 模拟uni-app的textarea组件
  textarea: {
    name: 'uni-textarea',
    template: '<textarea></textarea>',
    props: ['value', 'placeholder', 'disabled', 'maxlength'],
    emits: ['input', 'focus', 'blur', 'confirm']
  },
  // 模拟uni-app的video组件
  video: {
    name: 'uni-video',
    template: '<video></video>',
    props: ['src', 'poster', 'controls', 'autoplay', 'loop'],
    emits: ['play', 'pause', 'ended', 'timeupdate', 'fullscreenchange']
  },
  // 模拟uni-app的picker-view和picker-view-column
  'picker-view': {
    name: 'uni-picker-view',
    template: '<div class="picker-view"><slot></slot></div>',
    props: ['value', 'range', 'range-key', 'indicator-style', 'indicator-class'],
    emits: ['change']
  },
  'picker-view-column': {
    name: 'uni-picker-view-column',
    template: '<div class="picker-view-column"><slot></slot></div>',
    props: ['value', 'range', 'range-key']
  }
}

// 同时设置 stubs 以确保兼容性
config.global.stubs = config.global.components

// 添加一些额外的全局对象
;(global as any).getCurrentPages = vi.fn(() => [{ route: 'pages/index/index', $getAppWebview: vi.fn() }])
;(global as any).getApp = vi.fn(() => ({}))

// 模拟 uni-app 生命周期
;(global as any).onLaunch = vi.fn()
;(global as any).onShow = vi.fn()
;(global as any).onHide = vi.fn()
;(global as any).onUnload = vi.fn()
;(global as any).onError = vi.fn()

// 模拟 @dcloudio/uni-app 的生命周期钩子
vi.mock('@dcloudio/uni-app', () => ({
  onShow: vi.fn(),
  onHide: vi.fn(),
  onLaunch: vi.fn(),
  onUnload: vi.fn(),
  onError: vi.fn()
}))

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
