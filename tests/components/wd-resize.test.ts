/*
 * @Author: weisheng
 * @Date: 2025-04-26 15:36:25
 * @LastEditTime: 2025-05-03 22:58:04
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/tests/components/wd-resize.test.ts
 * 记得注释
 */
import { mount } from '@vue/test-utils'
import WdResize from '@/uni_modules/wot-design-uni/components/wd-resize/wd-resize.vue'
import { describe, test, expect } from 'vitest'

describe('WdResize', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdResize)
    expect(wrapper.classes()).toContain('wd-resize')
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'custom-resize'
    const wrapper = mount(WdResize, {
      props: {
        customClass
      }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'margin: 10px;'
    const wrapper = mount(WdResize, {
      props: {
        customStyle
      }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试自定义容器类名
  test('自定义容器类名', () => {
    const customContainerClass = 'custom-container'
    const wrapper = mount(WdResize, {
      props: {
        customContainerClass
      }
    })
    expect(wrapper.find('.wd-resize__container').classes()).toContain(customContainerClass)
  })

  // 测试默认插槽
  test('默认插槽', () => {
    const wrapper = mount(WdResize, {
      slots: {
        default: '<div class="test-content">测试内容</div>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
  })

  // 测试 resize 事件
  test('触发 resize 事件', async () => {
    const wrapper = mount(WdResize)

    // 模拟 onScrollHandler 调用
    await (wrapper.vm as any).onScrollHandler()

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['resize']).toBeTruthy()
  })
})
