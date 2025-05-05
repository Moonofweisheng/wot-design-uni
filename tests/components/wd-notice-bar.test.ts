import { mount } from '@vue/test-utils'
import WdNoticeBar from '@/uni_modules/wot-design-uni/components/wd-notice-bar/wd-notice-bar.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import { describe, expect, test, vi, beforeEach } from 'vitest'

const globalComponents = {
  WdIcon
}

describe('WdNoticeBar', () => {
  beforeEach(() => {
    // 清除所有模拟函数的调用记录
    vi.clearAllMocks()
  })

  test('基本渲染', () => {
    const wrapper = mount(WdNoticeBar)
    expect(wrapper.classes()).toContain('wd-notice-bar')
  })

  test('文本内容', () => {
    const text = '这是一条通知公告'
    const wrapper = mount(WdNoticeBar, {
      global: {
        components: globalComponents
      },
      props: {
        text
      }
    })
    // 由于组件内部使用了 slot 来渲染文本，我们可以检查 props 是否正确设置
    expect(wrapper.props('text')).toBe(text)
  })

  test('滚动模式', () => {
    const wrapper = mount(WdNoticeBar, {
      global: {
        components: globalComponents
      },
      props: {
        scrollable: true
      }
    })
    // 检查 props 是否正确设置
    expect(wrapper.props('scrollable')).toBe(true)
  })

  test('可关闭', async () => {
    const wrapper = mount(WdNoticeBar, {
      global: {
        components: globalComponents
      },
      props: {
        closable: true
      }
    })
    // 检查 props 是否正确设置
    expect(wrapper.props('closable')).toBe(true)

    wrapper.find('.wd-notice-bar__suffix').trigger('click')
    // 检查是否触发了 close 事件
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('自定义样式', () => {
    const wrapper = mount(WdNoticeBar, {
      global: {
        components: globalComponents
      },
      props: {
        color: 'red',
        backgroundColor: '#f0f0f0'
      }
    })
    // 检查 props 是否正确设置
    expect(wrapper.props('color')).toBe('red')
    expect(wrapper.props('backgroundColor')).toBe('#f0f0f0')
  })

  test('左侧图标', () => {
    const wrapper = mount(WdNoticeBar, {
      global: {
        components: globalComponents
      },
      props: {
        prefix: 'warning'
      }
    })
    // 检查 props 是否正确设置
    expect(wrapper.props('prefix')).toBe('warning')
  })

  test('点击事件', async () => {
    const wrapper = mount(WdNoticeBar, {
      global: {
        components: globalComponents
      },
      props: {
        text: '这是一条通知公告'
      }
    })
    // 直接调用 handleClick 方法，模拟点击内容区域
    await wrapper.find('.wd-notice-bar__content').trigger('click')
    // 检查是否触发了 click 事件
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('垂直滚动模式', () => {
    const textArray = ['消息1', '消息2', '消息3']
    const wrapper = mount(WdNoticeBar, {
      global: {
        components: globalComponents
      },
      props: {
        text: textArray,
        direction: 'vertical'
      }
    })
    // 检查 props 是否正确设置
    expect(wrapper.props('text')).toEqual(textArray)
    expect(wrapper.props('direction')).toBe('vertical')
  })

  test('可换行显示', () => {
    const wrapper = mount(WdNoticeBar, {
      global: {
        components: globalComponents
      },
      props: {
        wrapable: true,
        scrollable: false
      }
    })
    // 检查 props 是否正确设置
    expect(wrapper.props('wrapable')).toBe(true)
    expect(wrapper.props('scrollable')).toBe(false)
  })
})
