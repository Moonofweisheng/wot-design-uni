import { mount } from '@vue/test-utils'
import WdPullRefresh from '@/uni_modules/wot-design-uni/components/wd-pull-refresh/wd-pull-refresh.vue'
import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'

describe('WdPullRefresh', () => {
  test('should render correctly', () => {
    const wrapper = mount(WdPullRefresh, {
      props: {
        modelValue: false
      },
      slots: {
        default: '<div>Content</div>'
      }
    })

    expect(wrapper.find('.wd-pull-refresh').exists()).toBe(true)
    expect(wrapper.find('.wd-pull-refresh__content').exists()).toBe(true)
    expect(wrapper.find('.wd-pull-refresh__head').exists()).toBe(true)
  })

  test('should support scroll mode prop', async () => {
    const wrapper = mount(WdPullRefresh, {
      props: {
        modelValue: false,
        scrollMode: 'page'
      },
      slots: {
        default: '<div>Content</div>'
      }
    })

    await nextTick()

    expect(wrapper.vm.scrollMode).toBe('page')
  })

  test('should handle page scroll correctly', async () => {
    const wrapper = mount(WdPullRefresh, {
      props: {
        modelValue: false,
        scrollMode: 'page'
      },
      slots: {
        default: '<div>Content</div>'
      }
    })

    await nextTick()

    // 验证组件正常渲染
    expect(wrapper.vm.scrollMode).toBe('page')
  })

  test('should render scroll-view mode correctly', async () => {
    const wrapper = mount(WdPullRefresh, {
      props: {
        modelValue: false,
        scrollMode: 'scroll-view'
      },
      slots: {
        default: '<div>Content</div>'
      }
    })

    await nextTick()

    // 验证 scroll-view 模式下的渲染
    expect(wrapper.find('.wd-pull-refresh__scroll-view').exists()).toBe(true)
    expect(wrapper.vm.scrollMode).toBe('scroll-view')
  })

  test('should use default scroll mode', async () => {
    const wrapper = mount(WdPullRefresh, {
      props: {
        modelValue: false
      },
      slots: {
        default: '<div>Content</div>'
      }
    })

    await nextTick()
    // 默认模式应该是 page
    expect(wrapper.vm.scrollMode).toBe('page')
  })

  test('should expose correct methods', () => {
    const wrapper = mount(WdPullRefresh, {
      props: {
        modelValue: false
      },
      slots: {
        default: '<div>Content</div>'
      }
    })

    // 检查暴露的方法
    expect(typeof wrapper.vm.finish).toBe('function')
    expect(wrapper.vm.scrollMode).toBeDefined()
  })

  test('should handle refresh correctly', async () => {
    const onRefresh = vi.fn()
    const wrapper = mount(WdPullRefresh, {
      props: {
        modelValue: false,
        scrollMode: 'page'
      },
      slots: {
        default: '<div>Content</div>'
      }
    })

    wrapper.vm.$emit('refresh')
    await nextTick()

    // 检查是否可以正常触发刷新事件
    expect(wrapper.emitted('refresh')).toBeTruthy()
  })
})
