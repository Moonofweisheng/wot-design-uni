/*
 * @Author: weisheng
 * @Date: 2025-04-10 18:35:55
 * @LastEditTime: 2025-04-22 23:02:22
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/tests/components/wd-tooltip.test.ts
 * 记得注释
 */
import { mount } from '@vue/test-utils'
import WdTooltip from '@/uni_modules/wot-design-uni/components/wd-tooltip/wd-tooltip.vue'
import { describe, expect, test } from 'vitest'

describe('WdTooltip', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdTooltip)
    expect(wrapper.classes()).toContain('wd-tooltip')
  })

  test('提示内容渲染', async () => {
    const content = '这是一个提示'
    const wrapper = mount(WdTooltip, {
      props: {
        content
      }
    })
    await wrapper.setProps({ visible: true })
    await wrapper.setProps({ visible: true })
    const contentEl = wrapper.find('.wd-tooltip__content')
    expect(contentEl.exists()).toBe(true)
    expect(contentEl.text()).toBe(content)
  })

  test('触发方式', async () => {
    const wrapper = mount(WdTooltip, {
      props: {
        trigger: 'click',
        content: '点击触发',
        modelValue: false
      }
    })
    const trigger = wrapper.find('.wd-tooltip__trigger')
    await trigger.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  test('位置设置', async () => {
    const wrapper = mount(WdTooltip, {
      props: {
        placement: 'top',
        content: '顶部提示'
      }
    })
    expect(wrapper.classes()).toContain('is-top')
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdTooltip, {
      props: {
        content: '自定义样式',
        visibleArrow: false,
        offset: 10
      }
    })
    expect(wrapper.find('.wd-tooltip__arrow').exists()).toBe(false)
    // 由于样式是通过 popover.popStyle 计算得到的，不直接应用在 content 元素上
    // 这里只验证 visibleArrow 属性是否正确应用
  })

  test('插槽内容', async () => {
    const wrapper = mount(WdTooltip, {
      slots: {
        default: '<button>点击我</button>'
      },
      props: {
        content: '提示内容'
      }
    })
    const trigger = wrapper.find('button')
    expect(trigger.exists()).toBe(true)
    expect(trigger.text()).toBe('点击我')
  })
})
