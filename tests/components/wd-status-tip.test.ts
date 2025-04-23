/*
 * @Author: weisheng
 * @Date: 2025-04-10 16:06:35
 * @LastEditTime: 2025-04-14 14:04:40
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/tests/components/wd-status-tip.test.ts
 * 记得注释
 */
import { mount } from '@vue/test-utils'
import WdStatusTip from '../../src/uni_modules/wot-design-uni/components/wd-status-tip/wd-status-tip.vue'
import { describe, expect, test } from 'vitest'

describe('WdStatusTip', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdStatusTip)
    expect(wrapper.classes()).toContain('wd-status-tip')
  })

  test('自定义图标', async () => {
    const wrapper = mount(WdStatusTip, {
      props: {
        icon: 'warning'
      }
    })
    expect(wrapper.find('.wd-status-tip__icon').exists()).toBeTruthy()
  })

  test('自定义提示文案', async () => {
    const tip = '暂无数据'
    const wrapper = mount(WdStatusTip, {
      props: {
        tip
      }
    })
    expect(wrapper.find('.wd-status-tip__text').text()).toBe(tip)
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdStatusTip, {
      props: {
        customClass: 'custom-tip',
        customStyle: 'color: red;'
      }
    })
    expect(wrapper.classes()).toContain('custom-tip')
    expect(wrapper.attributes('style')).toBe('color: red;')
  })

  test('图标大小', async () => {
    const wrapper = mount(WdStatusTip, {
      props: {
        iconSize: 40
      }
    })
    expect(wrapper.find('.wd-status-tip__icon').attributes('style')).toContain('40')
  })

  test('图标颜色', async () => {
    const wrapper = mount(WdStatusTip, {
      props: {
        iconColor: '#ff0000'
      }
    })
    expect(wrapper.find('.wd-status-tip__icon').attributes('style')).toContain('#ff0000')
  })

  test('自定义内容', async () => {
    const wrapper = mount(WdStatusTip, {
      slots: {
        image: '<div class="custom-content">自定义内容</div>'
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBeTruthy()
    expect(wrapper.find('.custom-content').text()).toBe('自定义内容')
  })

  test('图片类型', async () => {
    const wrapper = mount(WdStatusTip, {
      props: {
        type: 'image',
        image: 'test.png'
      }
    })
    expect(wrapper.find('.wd-status-tip__image').exists()).toBeTruthy()
    expect(wrapper.find('.wd-status-tip__image').attributes('src')).toBe('test.png')
  })
})
