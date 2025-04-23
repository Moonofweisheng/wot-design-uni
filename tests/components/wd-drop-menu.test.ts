import { mount } from '@vue/test-utils'
import WdDropMenu from '../../src/uni_modules/wot-design-uni/components/wd-drop-menu/wd-drop-menu.vue'
import { describe, expect, test } from 'vitest'

describe('WdDropMenu', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdDropMenu, {
      props: {
        modelValue: ''
      }
    })

    expect(wrapper.classes()).toContain('wd-drop-menu')
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdDropMenu, {
      props: {
        modelValue: '',
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('自定义标题', async () => {
    const wrapper = mount(WdDropMenu, {
      props: {
        modelValue: '',
        title: '自定义标题'
      }
    })

    expect(wrapper.find('.wd-drop-menu__title').text()).toBe('自定义标题')
  })

  test('点击事件', async () => {
    const wrapper = mount(WdDropMenu, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.find('.wd-drop-menu__title').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('展开收起事件', async () => {
    const wrapper = mount(WdDropMenu, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.find('.wd-drop-menu__title').trigger('click')
    expect(wrapper.emitted('open')).toBeTruthy()

    await wrapper.find('.wd-drop-menu__title').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('change事件', async () => {
    const wrapper = mount(WdDropMenu, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.vm.$emit('change', { value: 'option1' })
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
