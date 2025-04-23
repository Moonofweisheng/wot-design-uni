import { mount } from '@vue/test-utils'
import WdDatetimePicker from '../../src/uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.vue'
import { describe, expect, test } from 'vitest'

describe('WdDatetimePicker', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '',
        label: '日期选择'
      }
    })

    expect(wrapper.classes()).toContain('wd-datetime-picker')
    expect(wrapper.find('.wd-datetime-picker__label').text()).toBe('日期选择')
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '',
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('自定义格式化', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '2024-01-01',
        format: 'YYYY年MM月DD日'
      }
    })

    expect(wrapper.find('.wd-picker__value').text()).toContain('2024年01月01日')
  })

  test('最大最小日期', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: '',
        minDate: new Date('2024/01/01').getTime(),
        maxDate: new Date('2024/12/31').getTime()
      }
    })

    expect(wrapper.props('minDate')).toBe(new Date('2024/01/01').getTime())
    expect(wrapper.props('maxDate')).toBe(new Date('2024/12/31').getTime())
  })

  test('change事件', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.vm.$emit('change', '2024-01-01')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual(['2024-01-01'])
  })

  test('confirm事件', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.vm.$emit('confirm', '2024-01-01')
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('confirm')![0]).toEqual(['2024-01-01'])
  })

  test('cancel事件', async () => {
    const wrapper = mount(WdDatetimePicker, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.vm.$emit('cancel')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })
})
