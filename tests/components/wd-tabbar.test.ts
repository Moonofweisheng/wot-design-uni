import { mount } from '@vue/test-utils'
import WdTabbar from '@/uni_modules/wot-design-uni/components/wd-tabbar/wd-tabbar.vue'
import { describe, expect, test } from 'vitest'

describe('WdTabbar', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdTabbar)
    expect(wrapper.classes()).toContain('wd-tabbar')
  })

  test('选项卡渲染', async () => {
    const wrapper = mount(WdTabbar, {
      props: {
        value: 0,
        items: [
          { text: '首页', icon: 'home' },
          { text: '消息', icon: 'message' },
          { text: '我的', icon: 'user' }
        ]
      }
    })
    const items = wrapper.findAll('.wd-tabbar__item')
    expect(items.length).toBe(3)
    expect(items[0].classes()).toContain('is-active')
  })

  test('切换事件', async () => {
    const wrapper = mount(WdTabbar, {
      props: {
        value: 0,
        items: [
          { text: '首页', icon: 'home' },
          { text: '消息', icon: 'message' }
        ]
      }
    })
    const items = wrapper.findAll('.wd-tabbar__item')
    await items[1].trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([1])
  })

  test('徽标显示', async () => {
    const wrapper = mount(WdTabbar, {
      props: {
        value: 0,
        items: [
          { text: '首页', icon: 'home' },
          { text: '消息', icon: 'message', badge: '99' },
          { text: '我的', icon: 'user', badge: 'new' }
        ]
      }
    })
    const badges = wrapper.findAll('.wd-badge')
    expect(badges.length).toBe(2)
    expect(badges[0].text()).toBe('99')
    expect(badges[1].text()).toBe('new')
  })

  test('固定底部', async () => {
    const wrapper = mount(WdTabbar, {
      props: {
        fixed: true
      }
    })
    expect(wrapper.classes()).toContain('is-fixed')
  })

  test('自定义激活颜色', async () => {
    const wrapper = mount(WdTabbar, {
      props: {
        value: 0,
        activeColor: '#ff0000',
        items: [
          { text: '首页', icon: 'home' },
          { text: '消息', icon: 'message' }
        ]
      }
    })
    const activeItem = wrapper.find('.wd-tabbar__item.is-active')
    expect(activeItem.attributes('style')).toContain('color: #ff0000')
  })
})
