import { mount } from '@vue/test-utils'
import WdSwipeAction from '@/uni_modules/wot-design-uni/components/wd-swipe-action/wd-swipe-action.vue'
import { describe, expect, test } from 'vitest'

describe('WdSwipeAction', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSwipeAction)
    expect(wrapper.classes()).toContain('wd-swipe-action')
  })

  test('左侧按钮渲染', async () => {
    const wrapper = mount(WdSwipeAction, {
      props: {
        leftButtons: [
          { text: '操作1', type: 'primary' },
          { text: '操作2', type: 'danger' }
        ]
      }
    })
    expect(wrapper.find('.wd-swipe-action__left').exists()).toBeTruthy()
    const buttons = wrapper.findAll('.wd-swipe-action__left .wd-swipe-action__button')
    expect(buttons.length).toBe(2)
  })

  test('右侧按钮渲染', async () => {
    const wrapper = mount(WdSwipeAction, {
      props: {
        rightButtons: [
          { text: '操作1', type: 'primary' },
          { text: '操作2', type: 'danger' }
        ]
      }
    })
    expect(wrapper.find('.wd-swipe-action__right').exists()).toBeTruthy()
    const buttons = wrapper.findAll('.wd-swipe-action__right .wd-swipe-action__button')
    expect(buttons.length).toBe(2)
  })

  test('按钮点击事件', async () => {
    const wrapper = mount(WdSwipeAction, {
      props: {
        rightButtons: [{ text: '操作1', type: 'primary' }]
      }
    })
    const button = wrapper.find('.wd-swipe-action__right .wd-swipe-action__button')
    await button.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdSwipeAction, {
      props: {
        disabled: true,
        rightButtons: [{ text: '操作1', type: 'primary' }]
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('自动关闭', async () => {
    const wrapper = mount(WdSwipeAction, {
      props: {
        autoClose: true,
        rightButtons: [{ text: '操作1', type: 'primary' }]
      }
    })
    const button = wrapper.find('.wd-swipe-action__right .wd-swipe-action__button')
    await button.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
