import { mount } from '@vue/test-utils'
import '../mocks/wd-transition.mock'

import WdCurtain from '@/uni_modules/wot-design-uni/components/wd-curtain/wd-curtain.vue'
import { describe, expect, test, vi } from 'vitest'

describe('WdCurtain', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdCurtain, {
      props: {
        modelValue: true,
        src: 'https://img.example.com/curtain.jpg'
      }
    })
    expect(wrapper.classes()).toContain('wd-curtain-wrapper')
    expect(wrapper.find('.wd-curtain__content-img').exists()).toBe(true)
  })

  test('关闭按钮', async () => {
    const wrapper = mount(WdCurtain, {
      props: {
        modelValue: true,
        src: 'https://img.example.com/curtain.jpg',
        closePosition: 'top-right'
      }
    })
    expect(wrapper.find('.wd-curtain__content-close').exists()).toBe(true)
    expect(wrapper.find('.wd-curtain__content-close').classes()).toContain('top-right')
  })

  test('点击事件', async () => {
    const wrapper = mount(WdCurtain, {
      props: {
        modelValue: true,
        src: 'https://img.example.com/curtain.jpg'
      }
    })

    await wrapper.find('.wd-curtain__content-img').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('关闭事件', async () => {
    const wrapper = mount(WdCurtain, {
      props: {
        modelValue: true,
        src: 'https://img.example.com/curtain.jpg'
      }
    })

    await wrapper.find('.wd-curtain__content-close').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
