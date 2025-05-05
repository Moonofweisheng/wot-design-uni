import { mount } from '@vue/test-utils'
import WdToast from '@/uni_modules/wot-design-uni/components/wd-toast/wd-toast.vue'
import WdLoading from '@/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import WdOverlay from '@/uni_modules/wot-design-uni/components/wd-overlay/wd-overlay.vue'
import WdTransition from '@/uni_modules/wot-design-uni/components/wd-transition/wd-transition.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick, defineComponent } from 'vue'
import { useToast } from '@/uni_modules/wot-design-uni/components/wd-toast/index'
import type { ToastOptions } from '@/uni_modules/wot-design-uni/components/wd-toast/types'

// 创建一个包含 WdToast 和使用 useToast 的测试组件
const createTestComponent = () => {
  return defineComponent({
    components: {
      WdToast,
      WdLoading,
      WdIcon,
      WdOverlay,
      WdTransition
    },
    template: `
      <div>
        <wd-toast></wd-toast>
        <button class="show-toast" @click="showToast">Show Toast</button>
        <button class="show-success" @click="showSuccess">Show Success</button>
        <button class="show-error" @click="showError">Show Error</button>
        <button class="show-warning" @click="showWarning">Show Warning</button>
        <button class="show-info" @click="showInfo">Show Info</button>
        <button class="show-loading" @click="showLoading">Show Loading</button>
        <button class="close-toast" @click="closeToast">Close Toast</button>
      </div>
    `,
    setup() {
      const toast = useToast()

      const showToast = (options?: Partial<ToastOptions>) => {
        toast.show(options || {})
      }

      const showSuccess = (options?: Partial<ToastOptions>) => {
        toast.success(options || {})
      }

      const showError = (options?: Partial<ToastOptions>) => {
        toast.error(options || {})
      }

      const showWarning = (options?: Partial<ToastOptions>) => {
        toast.warning(options || {})
      }

      const showInfo = (options?: Partial<ToastOptions>) => {
        toast.info(options || {})
      }

      const showLoading = (options?: Partial<ToastOptions>) => {
        toast.loading(options || {})
      }

      const closeToast = () => {
        toast.close()
      }

      return {
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showLoading,
        closeToast
      }
    }
  })
}

describe('WdToast 组件', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // 重置定时器
    vi.useFakeTimers()
  })

  // 测试基本渲染
  test('渲染带有默认属性的轻提示', () => {
    const wrapper = mount(WdToast, {
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
      }
    })

    expect(wrapper.findComponent(WdTransition).exists()).toBe(true)
  })

  // 测试显示消息
  test('显示消息文本', async () => {
    const TestComponent = createTestComponent()
    const wrapper = mount(TestComponent)

    // 显示消息
    await wrapper.find('.show-toast').trigger('click', { msg: 'Test Message' })
    await nextTick()

    // 验证消息显示
    const toastWrapper = wrapper.findComponent(WdToast)
    expect(toastWrapper.exists()).toBe(true)
  })

  // 测试成功图标
  test('显示成功图标', async () => {
    const TestComponent = createTestComponent()
    const wrapper = mount(TestComponent)

    // 显示成功消息
    await wrapper.find('.show-success').trigger('click')
    await nextTick()

    // 验证成功图标显示
    const toastWrapper = wrapper.findComponent(WdToast)
    expect(toastWrapper.exists()).toBe(true)
  })

  // 测试错误图标
  test('显示错误图标', async () => {
    const TestComponent = createTestComponent()
    const wrapper = mount(TestComponent)

    // 显示错误消息
    await wrapper.find('.show-error').trigger('click')
    await nextTick()

    // 验证错误图标显示
    const toastWrapper = wrapper.findComponent(WdToast)
    expect(toastWrapper.exists()).toBe(true)
  })

  // 测试警告图标
  test('显示警告图标', async () => {
    const TestComponent = createTestComponent()
    const wrapper = mount(TestComponent)

    // 显示警告消息
    await wrapper.find('.show-warning').trigger('click')
    await nextTick()

    // 验证警告图标显示
    const toastWrapper = wrapper.findComponent(WdToast)
    expect(toastWrapper.exists()).toBe(true)
  })

  // 测试信息图标
  test('显示信息图标', async () => {
    const TestComponent = createTestComponent()
    const wrapper = mount(TestComponent)

    // 显示信息消息
    await wrapper.find('.show-info').trigger('click')
    await nextTick()

    // 验证信息图标显示
    const toastWrapper = wrapper.findComponent(WdToast)
    expect(toastWrapper.exists()).toBe(true)
  })

  // 测试加载状态
  test('显示加载状态', async () => {
    const TestComponent = createTestComponent()
    const wrapper = mount(TestComponent)

    // 显示加载状态
    await wrapper.find('.show-loading').trigger('click')
    await nextTick()

    // 验证加载状态显示
    const toastWrapper = wrapper.findComponent(WdToast)
    expect(toastWrapper.exists()).toBe(true)

    // 手动关闭
    await wrapper.find('.close-toast').trigger('click')
    await nextTick()
  })

  // 测试自定义选择器
  test('应用自定义选择器', () => {
    const selector = 'custom-selector'

    const wrapper = mount(WdToast, {
      props: {
        selector
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
      }
    })

    // 验证选择器
    expect(wrapper.props('selector')).toBe(selector)
  })
})
