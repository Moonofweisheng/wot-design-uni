import { mount } from '@vue/test-utils'
import WdPasswordInput from '../../src/uni_modules/wot-design-uni/components/wd-password-input/wd-password-input.vue'
import { describe, expect, test } from 'vitest'

describe('WdPasswordInput', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdPasswordInput)
    expect(wrapper.classes()).toContain('wd-password-input')
  })

  test('密码长度', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        length: 6,
        value: '123'
      }
    })
    const items = wrapper.findAll('.wd-password-input__item')
    expect(items.length).toBe(6)
    expect(items[0].find('.wd-password-input__dot').exists()).toBeTruthy()
    expect(items[1].find('.wd-password-input__dot').exists()).toBeTruthy()
    expect(items[2].find('.wd-password-input__dot').exists()).toBeTruthy()
    expect(items[3].find('.wd-password-input__dot').exists()).toBeFalsy()
  })

  test('明文显示', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        value: '123',
        mask: false
      }
    })
    const items = wrapper.findAll('.wd-password-input__item')
    expect(items[0].text()).toBe('1')
    expect(items[1].text()).toBe('2')
    expect(items[2].text()).toBe('3')
  })

  test('获取焦点', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        focused: true
      }
    })
    expect(wrapper.find('.wd-password-input--focused').exists()).toBeTruthy()
  })

  test('自定义样式', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        customClass: 'custom-password',
        customStyle: 'background: red;'
      }
    })
    expect(wrapper.classes()).toContain('custom-password')
    expect(wrapper.attributes('style')).toBe('background: red;')
  })

  test('点击事件', async () => {
    const wrapper = mount(WdPasswordInput)
    await wrapper.trigger('click')
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  test('完成事件', async () => {
    const wrapper = mount(WdPasswordInput, {
      props: {
        value: '123456',
        length: 6
      }
    })
    expect(wrapper.emitted('complete')).toBeTruthy()
  })
})
