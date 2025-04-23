import { mount } from '@vue/test-utils'
import WdSidebar from '../../src/uni_modules/wot-design-uni/components/wd-sidebar/wd-sidebar.vue'
import { describe, expect, test } from 'vitest'

describe('WdSidebar', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSidebar)
    expect(wrapper.classes()).toContain('wd-sidebar')
  })

  test('选择功能', async () => {
    const wrapper = mount(WdSidebar, {
      props: {
        modelValue: 0
      }
    })
    await wrapper.find('.wd-sidebar__item').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdSidebar, {
      props: {
        customClass: 'custom-sidebar',
        customStyle: 'background: red;'
      }
    })
    expect(wrapper.classes()).toContain('custom-sidebar')
    expect(wrapper.attributes('style')).toBe('background: red;')
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdSidebar, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('自定义激活项', async () => {
    const wrapper = mount(WdSidebar, {
      props: {
        modelValue: 1
      }
    })
    expect(wrapper.find('.wd-sidebar__item.is-active').exists()).toBeTruthy()
  })

  test('点击事件', async () => {
    const wrapper = mount(WdSidebar)
    await wrapper.find('.wd-sidebar__item').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('自定义内容', async () => {
    const wrapper = mount(WdSidebar, {
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBeTruthy()
    expect(wrapper.find('.custom-content').text()).toBe('自定义内容')
  })
})
