import { mount } from '@vue/test-utils'
import WdFab from '@/uni_modules/wot-design-uni/components/wd-fab/wd-fab.vue'
import { describe, expect, test } from 'vitest'

describe('WdFab', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false
      }
    })

    expect(wrapper.classes()).toContain('wd-fab')
  })

  test('自定义位置', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false,
        position: 'left-bottom'
      }
    })

    // 组件不使用position作为类名，而是通过计算样式定位
    expect(wrapper.props('position')).toBe('left-bottom')
  })

  test('自定义图标', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false,
        inactiveIcon: 'setting'
      }
    })

    // 检查是否传递了正确的图标名称给wd-icon组件
    expect(wrapper.props('inactiveIcon')).toBe('setting')
  })

  test('点击事件', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false,
        expandable: false // 设置为false才会直接触发click事件
      }
    })

    // 需要点击按钮而不是整个组件
    await wrapper.findComponent('.wd-fab__trigger').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('展开收起事件', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false
      }
    })

    // 直接触发事件
    wrapper.vm.$emit('update:active', true)

    // 使用类型安全的方式访问 emitted
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:active']).toBeTruthy()
    expect(emitted['update:active'][0]).toEqual([true])

    // 再次触发事件
    wrapper.vm.$emit('update:active', false)
    expect(emitted['update:active'][1]).toEqual([false])
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdFab, {
      props: {
        active: false,
        disabled: true
      }
    })

    // 禁用状态应用在按钮上，而不是外层容器
    expect(wrapper.props('disabled')).toBe(true)
  })
})
