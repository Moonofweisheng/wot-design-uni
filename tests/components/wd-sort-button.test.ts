import { mount } from '@vue/test-utils'
import WdSortButton from '../../src/uni_modules/wot-design-uni/components/wd-sort-button/wd-sort-button.vue'
import { describe, expect, test } from 'vitest'

describe('WdSortButton', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSortButton)
    expect(wrapper.classes()).toContain('wd-sort-button')
  })

  test('排序功能', async () => {
    const wrapper = mount(WdSortButton, {
      props: {
        modelValue: 0
      }
    })
    await wrapper.trigger('click')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['change']).toBeTruthy()
  })

  test('自定义标题', async () => {
    const title = '价格排序'
    const wrapper = mount(WdSortButton, {
      props: {
        title
      }
    })
    expect(wrapper.find('.wd-sort-button__left').text()).toBe(title)
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdSortButton, {
      props: {
        customClass: 'custom-sort',
        customStyle: 'color: red;'
      }
    })
    expect(wrapper.classes()).toContain('custom-sort')
    expect(wrapper.attributes('style')).toBe('color: red;')
  })

  test('排序状态切换 - 默认顺序', async () => {
    const wrapper = mount(WdSortButton, {
      props: {
        modelValue: 1
      }
    })
    expect(wrapper.find('.wd-sort-button__left').classes()).toContain('is-active')
    await wrapper.trigger('click')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue'][0][0]).toBe(-1)
  })

  test('点击事件', async () => {
    const wrapper = mount(WdSortButton)
    await wrapper.trigger('click')
    const emitted = wrapper.emitted() as Record<string, any[]>
    // 检查是否触发了 click 事件
    expect(emitted['click']).toBeTruthy()
    // 检查是否触发了 update:modelValue 事件
    expect(emitted['update:modelValue']).toBeTruthy()
    // 检查是否触发了 change 事件
    expect(emitted['change']).toBeTruthy()
  })

  test('排序状态切换 - 降序优先', async () => {
    const wrapper = mount(WdSortButton, {
      props: {
        modelValue: 0,
        descFirst: true
      }
    })
    await wrapper.trigger('click')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue'][0][0]).toBe(-1)
  })

  test('允许重置', async () => {
    const wrapper = mount(WdSortButton, {
      props: {
        modelValue: -1,
        allowReset: true
      }
    })
    await wrapper.trigger('click')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue'][0][0]).toBe(0)
  })

  test('下划线显示', async () => {
    const wrapper = mount(WdSortButton, {
      props: {
        line: true
      }
    })
    expect(wrapper.classes()).toContain('wd-sort-button--line')
  })

  test('下划线隐藏', async () => {
    const wrapper = mount(WdSortButton, {
      props: {
        line: false
      }
    })
    expect(wrapper.classes()).not.toContain('wd-sort-button--line')
  })
})
