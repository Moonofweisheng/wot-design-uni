import { mount } from '@vue/test-utils'
import WdCard from '../../src/uni_modules/wot-design-uni/components/wd-card/wd-card.vue'
import { describe, expect, test } from 'vitest'

describe('WdCard', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdCard)
    expect(wrapper.classes()).toContain('wd-card')
  })

  test('矩形卡片', async () => {
    const wrapper = mount(WdCard, {
      props: {
        type: 'rectangle'
      }
    })
    expect(wrapper.classes()).toContain('is-rectangle')
  })

  test('标题渲染', async () => {
    const title = '卡片标题'
    const wrapper = mount(WdCard, {
      props: {
        title
      }
    })
    expect(wrapper.find('.wd-card__title').text()).toBe(title)
  })

  test('标题插槽', async () => {
    const wrapper = mount(WdCard, {
      slots: {
        title: '<div class="custom-title">自定义标题</div>'
      }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  test('内容插槽', async () => {
    const wrapper = mount(WdCard, {
      slots: {
        default: '<div class="custom-content">卡片内容</div>'
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toBe('卡片内容')
  })

  test('底部插槽', async () => {
    const wrapper = mount(WdCard, {
      slots: {
        footer: '<div class="custom-footer">底部内容</div>'
      }
    })
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').text()).toBe('底部内容')
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdCard, {
      props: {
        customClass: 'custom-card',
        customStyle: 'background: #f5f5f5',
        customTitleClass: 'custom-title',
        customContentClass: 'custom-content',
        customFooterClass: 'custom-footer'
      }
    })
    expect(wrapper.classes()).toContain('custom-card')
    expect(wrapper.attributes('style')).toContain('background: #f5f5f5')
    expect(wrapper.find('.wd-card__title-content').classes()).toContain('custom-title')
    expect(wrapper.find('.wd-card__content').classes()).toContain('custom-content')
    expect(wrapper.find('.wd-card__footer').classes()).toContain('custom-footer')
  })
})
