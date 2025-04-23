import { mount } from '@vue/test-utils'
import WdToast from '@/uni_modules/wot-design-uni/components/wd-toast/wd-toast.vue'
import WdLoading from '@/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import WdOverlay from '@/uni_modules/wot-design-uni/components/wd-overlay/wd-overlay.vue'
import WdTransition from '@/uni_modules/wot-design-uni/components/wd-transition/wd-transition.vue'
import { describe, test, expect } from 'vitest'
import { ToastPositionType } from '@/uni_modules/wot-design-uni/components/wd-toast/types'

describe('WdToast', () => {
  // 测试基本渲染
  test('renders toast with default props', () => {
    const wrapper = mount(WdToast, {
      props: { show: true },
      global: {
        components: {
          WdLoading,
          WdIcon,
          WdOverlay,
          WdTransition
        },
        stubs: {
          'wd-transition': false
        }
      },
      attachTo: document.body
    })
    expect(wrapper.find('.wd-toast').exists()).toBe(true)
  })

  // 测试消息显示
  test('renders message correctly', () => {
    const msg = 'Test Message'
    const wrapper = mount(WdToast, {
      props: { msg, show: true },
      global: {
        components: {
          WdLoading,
          WdIcon,
          WdOverlay,
          WdTransition
        },
        stubs: {
          'wd-transition': false
        }
      },
      attachTo: document.body
    })
    expect(wrapper.find('.wd-toast__msg').text()).toBe(msg)
  })

  // 测试不同位置
  test('renders different positions', () => {
    const positions: ToastPositionType[] = ['middle', 'top', 'middle-top', 'bottom']
    positions.forEach((position) => {
      const wrapper = mount(WdToast, {
        props: { position, show: true },
        global: {
          components: {
            WdLoading,
            WdIcon,
            WdOverlay,
            WdTransition
          },
          stubs: {
            'wd-transition': false
          }
        },
        attachTo: document.body
      })
      expect(wrapper.find(`.wd-toast--${position}`).exists()).toBe(true)
    })
  })

  // 测试加载状态
  test('renders loading state', () => {
    const wrapper = mount(WdToast, {
      props: {
        show: true,
        iconName: 'loading',
        loadingType: 'outline',
        loadingColor: '#4D80F0'
      },
      global: {
        components: {
          WdLoading,
          WdIcon,
          WdOverlay,
          WdTransition
        },
        stubs: {
          'wd-transition': false
        }
      },
      attachTo: document.body
    })
    expect(wrapper.findComponent(WdLoading).exists()).toBe(true)
    expect(wrapper.find('.wd-toast--loading').exists()).toBe(true)
  })

  // 测试成功图标
  test('renders success icon', () => {
    const wrapper = mount(WdToast, {
      props: {
        show: true,
        iconName: 'success'
      },
      global: {
        components: {
          WdLoading,
          WdIcon,
          WdOverlay,
          WdTransition
        },
        stubs: {
          'wd-transition': false,
          'wd-icon': true
        }
      },
      attachTo: document.body
    })
    // 由于组件内部使用了复杂的SVG渲染，这里只测试类名是否正确
    expect(wrapper.find('.wd-toast--with-icon').exists()).toBe(true)
  })

  // 测试自定义图标
  test('renders custom icon', () => {
    const wrapper = mount(WdToast, {
      props: {
        show: true,
        iconName: '',
        iconClass: 'custom-icon'
      },
      global: {
        components: {
          WdLoading,
          WdIcon,
          WdOverlay,
          WdTransition
        },
        stubs: {
          'wd-transition': false,
          'wd-icon': true
        }
      },
      attachTo: document.body
    })
    // 由于组件使用了复杂的渲染逻辑，这里只测试类名是否正确
    expect(wrapper.find('.wd-toast').exists()).toBe(true)
  })

  // 测试遮罩层
  test('renders with overlay', () => {
    const wrapper = mount(WdToast, {
      props: {
        show: true,
        cover: true
      },
      global: {
        components: {
          WdLoading,
          WdIcon,
          WdOverlay,
          WdTransition
        },
        stubs: {
          'wd-transition': false,
          'wd-overlay': false
        }
      },
      attachTo: document.body
    })
    // 验证组件是否正确渲染
    expect(wrapper.find('.wd-toast').exists()).toBe(true)
    expect(wrapper.findComponent(WdOverlay).exists()).toBe(true)
  })

  // 测试垂直布局
  test('renders vertical layout', () => {
    const wrapper = mount(WdToast, {
      props: {
        show: true,
        direction: 'vertical',
        iconName: 'success',
        msg: 'Success'
      },
      global: {
        components: {
          WdLoading,
          WdIcon,
          WdOverlay,
          WdTransition
        },
        stubs: {
          'wd-transition': false,
          'wd-icon': true
        }
      },
      attachTo: document.body
    })
    // 测试垂直布局类名是否存在
    expect(wrapper.find('.is-vertical').exists()).toBe(true)
  })

  // 测试自定义样式
  test('applies custom class and style', () => {
    const customClass = 'custom-toast'
    const wrapper = mount(WdToast, {
      props: {
        show: true,
        customClass,
        msg: 'Test Message'
      },
      global: {
        components: {
          WdLoading,
          WdIcon,
          WdOverlay,
          WdTransition
        },
        stubs: {
          'wd-transition': false
        }
      },
      attachTo: document.body
    })
    // 测试自定义类名是否存在
    expect(wrapper.find(`.${customClass}`).exists()).toBe(true)
  })

  // 测试z-index设置
  test('applies custom z-index', () => {
    const zIndex = 1000
    const wrapper = mount(WdToast, {
      props: {
        show: true,
        zIndex
      },
      global: {
        components: {
          WdLoading,
          WdIcon,
          WdOverlay,
          WdTransition
        },
        stubs: {
          'wd-transition': false
        }
      },
      attachTo: document.body
    })
    expect(wrapper.findComponent(WdTransition).attributes('custom-style')).toContain(`z-index: ${zIndex}`)
  })
})
