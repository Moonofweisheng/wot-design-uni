import { mount } from '@vue/test-utils'
import WdCurtain from '../../src/uni_modules/wot-design-uni/components/wd-curtain/wd-curtain.vue'
import { describe, expect, test } from 'vitest'

describe('WdCurtain', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdCurtain, {
      props: {
        modelValue: true,
        src: 'https://img.example.com/curtain.jpg'
      }
    })

    expect(wrapper.classes()).toContain('wd-curtain')
    expect(wrapper.find('.wd-curtain__image').exists()).toBe(true)
  })

  test('关闭按钮', async () => {
    const wrapper = mount(WdCurtain, {
      props: {
        modelValue: true,
        src: 'https://img.example.com/curtain.jpg',
        closePosition: 'top-right'
      }
    })

    expect(wrapper.find('.wd-curtain__close').exists()).toBe(true)
    expect(wrapper.find('.wd-curtain__close').classes()).toContain('is-top-right')
  })

  test('自定义内容', async () => {
    const wrapper = mount(WdCurtain, {
      props: {
        modelValue: true
      },
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      }
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toBe('自定义内容')
  })

  test('点击事件', async () => {
    const wrapper = mount(WdCurtain, {
      props: {
        modelValue: true,
        src: 'https://img.example.com/curtain.jpg'
      }
    })

    await wrapper.find('.wd-curtain__image').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('关闭事件', async () => {
    const wrapper = mount(WdCurtain, {
      props: {
        modelValue: true,
        src: 'https://img.example.com/curtain.jpg'
      }
    })

    await wrapper.find('.wd-curtain__close').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
