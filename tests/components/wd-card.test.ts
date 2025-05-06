import { mount } from '@vue/test-utils'
import WdCard from '@/uni_modules/wot-design-uni/components/wd-card/wd-card.vue'
import { describe, expect, test, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import type { CardType } from '@/uni_modules/wot-design-uni/components/wd-card/types'

describe('WdCard', () => {
  beforeEach(() => {
    // 清理任何模拟或状态
  })

  test('基本渲染', async () => {
    const wrapper = mount(WdCard)

    await nextTick()

    expect(wrapper.classes()).toContain('wd-card')
    expect(wrapper.classes()).not.toContain('is-rectangle') // 默认不是矩形卡片
  })

  test('矩形卡片', async () => {
    const wrapper = mount(WdCard, {
      props: {
        type: 'rectangle' as CardType
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('is-rectangle')
  })

  test('标题渲染', async () => {
    const title = '卡片标题'

    const wrapper = mount(WdCard, {
      props: {
        title
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-card__title').exists()).toBe(true)
    expect(wrapper.find('.wd-card__title').text()).toBe(title)
  })

  test('标题插槽', async () => {
    const wrapper = mount(WdCard, {
      slots: {
        title: '<div class="custom-title">自定义标题</div>'
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-card__title-content').exists()).toBe(true)
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  test('内容插槽', async () => {
    const wrapper = mount(WdCard, {
      slots: {
        default: '<div class="custom-content">卡片内容</div>'
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-card__content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toBe('卡片内容')
  })

  test('底部插槽', async () => {
    const wrapper = mount(WdCard, {
      slots: {
        footer: '<div class="custom-footer">底部内容</div>'
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-card__footer').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').text()).toBe('底部内容')
  })

  test('自定义类名', async () => {
    const customClass = 'custom-card'

    const wrapper = mount(WdCard, {
      props: {
        customClass
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain(customClass)
  })

  test('自定义样式', async () => {
    const customStyle = 'background: rgb(245, 245, 245);'

    const wrapper = mount(WdCard, {
      props: {
        customStyle
      }
    })

    await nextTick()

    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  test('自定义标题类名', async () => {
    const customTitleClass = 'custom-title'

    const wrapper = mount(WdCard, {
      props: {
        title: '卡片标题',
        customTitleClass
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-card__title-content').classes()).toContain(customTitleClass)
  })

  test('自定义内容类名', async () => {
    const customContentClass = 'custom-content'

    const wrapper = mount(WdCard, {
      props: {
        customContentClass
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-card__content').classes()).toContain(customContentClass)
  })

  test('自定义底部类名', async () => {
    const customFooterClass = 'custom-footer'

    const wrapper = mount(WdCard, {
      props: {
        customFooterClass
      },
      slots: {
        footer: '<div>底部内容</div>'
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-card__footer').classes()).toContain(customFooterClass)
  })

  test('组合使用所有自定义类名', async () => {
    const wrapper = mount(WdCard, {
      props: {
        customClass: 'custom-card',
        customStyle: 'background: rgb(245, 245, 245);',
        customTitleClass: 'custom-title',
        customContentClass: 'custom-content',
        customFooterClass: 'custom-footer'
      },
      slots: {
        title: '<div>自定义标题</div>',
        default: '<div>卡片内容</div>',
        footer: '<div>底部内容</div>'
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('custom-card')
    expect(wrapper.attributes('style')).toBe('background: rgb(245, 245, 245);')
    expect(wrapper.find('.wd-card__title-content').classes()).toContain('custom-title')
    expect(wrapper.find('.wd-card__content').classes()).toContain('custom-content')
    expect(wrapper.find('.wd-card__footer').classes()).toContain('custom-footer')
  })

  test('没有标题时不渲染标题容器', async () => {
    const wrapper = mount(WdCard, {
      props: {
        // 不设置 title
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-card__title-content').exists()).toBe(false)
  })

  test('没有底部插槽时不渲染底部容器', async () => {
    const wrapper = mount(WdCard, {
      props: {
        // 不设置底部插槽
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-card__footer').exists()).toBe(false)
  })

  test('复杂内容渲染', async () => {
    const wrapper = mount(WdCard, {
      props: {
        title: '卡片标题'
      },
      slots: {
        default: `
          <div class="card-item">
            <h3>项目1</h3>
            <p>项目1的详细描述</p>
          </div>
          <div class="card-item">
            <h3>项目2</h3>
            <p>项目2的详细描述</p>
          </div>
        `,
        footer: '<button class="action-btn">操作按钮</button>'
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-card__title').text()).toBe('卡片标题')
    expect(wrapper.findAll('.card-item').length).toBe(2)
    expect(wrapper.findAll('.card-item h3')[0].text()).toBe('项目1')
    expect(wrapper.findAll('.card-item p')[0].text()).toBe('项目1的详细描述')
    expect(wrapper.findAll('.card-item h3')[1].text()).toBe('项目2')
    expect(wrapper.findAll('.card-item p')[1].text()).toBe('项目2的详细描述')
    expect(wrapper.find('.action-btn').exists()).toBe(true)
    expect(wrapper.find('.action-btn').text()).toBe('操作按钮')
  })
})
