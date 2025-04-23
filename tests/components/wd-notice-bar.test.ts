import { mount } from '@vue/test-utils'
import WdNoticeBar from '../../src/uni_modules/wot-design-uni/components/wd-notice-bar/wd-notice-bar.vue'
import { describe, expect, test } from 'vitest'

describe('WdNoticeBar', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdNoticeBar)
    expect(wrapper.classes()).toContain('wd-notice-bar')
  })

  test('文本内容', async () => {
    const text = '这是一条通知公告'
    const wrapper = mount(WdNoticeBar, {
      props: {
        text
      }
    })
    expect(wrapper.find('.wd-notice-bar__content').text()).toBe(text)
  })

  test('滚动模式', async () => {
    const wrapper = mount(WdNoticeBar, {
      props: {
        scrollable: true
      }
    })
    expect(wrapper.find('.wd-notice-bar__content--scrollable').exists()).toBeTruthy()
  })

  test('可关闭', async () => {
    const wrapper = mount(WdNoticeBar, {
      props: {
        closable: true
      }
    })
    expect(wrapper.find('.wd-notice-bar__close').exists()).toBeTruthy()
    await wrapper.find('.wd-notice-bar__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdNoticeBar, {
      props: {
        color: 'red',
        backgroundColor: '#f0f0f0'
      }
    })
    const content = wrapper.find('.wd-notice-bar__content')
    expect(content.attributes('style')).toContain('color: red')
    expect(wrapper.attributes('style')).toContain('background-color: #f0f0f0')
  })

  test('左侧图标', async () => {
    const wrapper = mount(WdNoticeBar, {
      props: {
        leftIcon: 'warning'
      }
    })
    expect(wrapper.find('.wd-notice-bar__left-icon').exists()).toBeTruthy()
  })

  test('点击事件', async () => {
    const wrapper = mount(WdNoticeBar)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
