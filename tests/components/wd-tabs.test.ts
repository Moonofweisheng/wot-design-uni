import { mount } from '@vue/test-utils'
import WdTabs from '@/uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.vue'
import { describe, expect, test } from 'vitest'

describe('WdTabs', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdTabs)
    expect(wrapper.classes()).toContain('wd-tabs')
  })

  test('标签页渲染', async () => {
    const wrapper = mount(WdTabs, {
      props: {
        value: 0,
        items: [{ title: '标签1' }, { title: '标签2' }, { title: '标签3' }]
      }
    })
    const tabs = wrapper.findAll('.wd-tabs__nav-item')
    expect(tabs.length).toBe(3)
    expect(tabs[0].classes()).toContain('is-active')
  })

  test('切换事件', async () => {
    const wrapper = mount(WdTabs, {
      props: {
        value: 0,
        items: [{ title: '标签1' }, { title: '标签2' }]
      }
    })
    const tabs = wrapper.findAll('.wd-tabs__nav-item')
    await tabs[1].trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([1])
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdTabs, {
      props: {
        value: 0,
        items: [{ title: '标签1' }, { title: '标签2', disabled: true }]
      }
    })
    const disabledTab = wrapper.findAll('.wd-tabs__nav-item')[1]
    expect(disabledTab.classes()).toContain('is-disabled')
    await disabledTab.trigger('click')
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdTabs, {
      props: {
        value: 0,
        activeColor: '#ff0000',
        items: [{ title: '标签1' }, { title: '标签2' }]
      }
    })
    const activeTab = wrapper.find('.wd-tabs__nav-item.is-active')
    expect(activeTab.attributes('style')).toContain('color: #ff0000')
  })

  test('滚动模式', async () => {
    const wrapper = mount(WdTabs, {
      props: {
        value: 0,
        scrollable: true,
        items: Array(10)
          .fill(null)
          .map((_, i) => ({ title: `标签${i + 1}` }))
      }
    })
    expect(wrapper.classes()).toContain('is-scrollable')
  })

  test('标签位置', async () => {
    const wrapper = mount(WdTabs, {
      props: {
        value: 0,
        position: 'bottom',
        items: [{ title: '标签1' }, { title: '标签2' }]
      }
    })
    expect(wrapper.classes()).toContain('is-bottom')
  })
})
