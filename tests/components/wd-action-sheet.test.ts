import { mount } from '@vue/test-utils'
import WdActionSheet from '@/uni_modules/wot-design-uni/components/wd-action-sheet/wd-action-sheet.vue'
import { describe, expect, test, vi } from 'vitest'
import type { Action, Panel } from '@/uni_modules/wot-design-uni/components/wd-action-sheet/types'

describe('WdActionSheet', () => {
  // 测试基本渲染
  test('renders action sheet with default props', () => {
    const wrapper = mount(WdActionSheet)
    expect(wrapper.classes()).toContain('wd-action-sheet')
  })

  // 测试标题渲染
  test('renders title correctly', () => {
    const title = '标题文本'
    const wrapper = mount(WdActionSheet, {
      props: {
        title,
        modelValue: true
      }
    })
    expect(wrapper.find('.wd-action-sheet__header').text()).toBe(title)
  })

  // 测试动作列表渲染
  test('renders actions correctly', () => {
    const actions: Action[] = [
      { name: '选项1' },
      { name: '选项2', subname: '描述信息' },
      { name: '选项3', color: 'red' },
      { name: '选项4', disabled: true },
      { name: '选项5', loading: true }
    ]
    const wrapper = mount(WdActionSheet, {
      props: {
        actions,
        modelValue: true
      }
    })
    const actionButtons = wrapper.findAll('.wd-action-sheet__action')
    expect(actionButtons).toHaveLength(5)

    // 测试基本选项
    expect(actionButtons[0].text()).toBe('选项1')

    // 测试带描述的选项
    const action2 = actionButtons[1]
    expect(action2.find('.wd-action-sheet__name').text()).toBe('选项2')
    expect(action2.find('.wd-action-sheet__subname').text()).toBe('描述信息')

    // 测试带颜色的选项
    expect(actionButtons[2].attributes('style')).toContain('color: red')

    // 测试禁用状态
    expect(actionButtons[3].classes()).toContain('wd-action-sheet__action--disabled')

    // 测试加载状态
    expect(actionButtons[4].classes()).toContain('wd-action-sheet__action--loading')
  })

  // 测试面板渲染
  test('renders panels correctly', () => {
    const panels: Panel[] = [
      { iconUrl: 'url1', title: '面板1' },
      { iconUrl: 'url2', title: '面板2' }
    ]
    const wrapper = mount(WdActionSheet, {
      props: {
        panels,
        modelValue: true
      }
    })

    const panelItems = wrapper.findAll('.wd-action-sheet__panel')
    expect(panelItems).toHaveLength(2)

    // 验证面板内容
    expect(panelItems[0].find('.wd-action-sheet__panel-img').attributes('src')).toBe('url1')
    expect(panelItems[0].find('.wd-action-sheet__panel-title').text()).toBe('面板1')
  })

  // 测试取消按钮
  test('renders cancel button and emits cancel event', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        cancelText: '取消',
        modelValue: true
      }
    })

    const cancelButton = wrapper.find('.wd-action-sheet__cancel')
    expect(cancelButton.exists()).toBe(true)
    expect(cancelButton.text()).toBe('取消')

    await cancelButton.trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  // 测试选项点击事件
  test('emits select event when action clicked', async () => {
    const actions: Action[] = [{ name: '选项1' }]
    const wrapper = mount(WdActionSheet, {
      props: {
        actions,
        modelValue: true
      }
    })

    await wrapper.find('.wd-action-sheet__action').trigger('click')

    const selectEvent = wrapper.emitted('select')?.[0][0]
    expect(selectEvent).toEqual({
      item: actions[0],
      index: 0
    })
  })

  // 测试禁用项点击
  test('should not emit select event when disabled action clicked', async () => {
    const actions: Action[] = [{ name: '选项1', disabled: true }]
    const wrapper = mount(WdActionSheet, {
      props: {
        actions,
        modelValue: true
      }
    })

    await wrapper.find('.wd-action-sheet__action').trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  // 测试加载项点击
  test('should not emit select event when loading action clicked', async () => {
    const actions: Action[] = [{ name: '选项1', loading: true }]
    const wrapper = mount(WdActionSheet, {
      props: {
        actions,
        modelValue: true
      }
    })

    await wrapper.find('.wd-action-sheet__action').trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  // 测试多行面板
  test('renders multiple panel rows correctly', () => {
    const panels: Panel[][] = [[{ iconUrl: 'url1', title: '面板1' }], [{ iconUrl: 'url2', title: '面板2' }]]
    const wrapper = mount(WdActionSheet, {
      props: {
        panels,
        modelValue: true
      }
    })

    const panelRows = wrapper.findAll('.wd-action-sheet__panels')
    expect(panelRows).toHaveLength(2)
  })

  // 测试面板点击事件
  test('emits select event when panel clicked', async () => {
    const panels: Panel[] = [{ iconUrl: 'url1', title: '面板1' }]
    const wrapper = mount(WdActionSheet, {
      props: {
        panels,
        modelValue: true
      }
    })

    await wrapper.find('.wd-action-sheet__panel').trigger('click')

    const selectEvent = wrapper.emitted('select')?.[0][0]
    expect(selectEvent).toEqual({
      item: panels[0],
      index: 0
    })
  })

  // 测试关闭相关事件
  test('emits close-related events', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true
      }
    })

    wrapper.vm.$emit('close')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })
})
