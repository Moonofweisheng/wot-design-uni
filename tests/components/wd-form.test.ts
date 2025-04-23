import { mount } from '@vue/test-utils'
import WdForm from '@/uni_modules/wot-design-uni/components/wd-form/wd-form.vue'
import WdFormItem from '@/uni_modules/wot-design-uni/components/wd-form-item/wd-form-item.vue'
import WdInput from '@/uni_modules/wot-design-uni/components/wd-input/wd-input.vue'
import { describe, test, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import type { FormItemRule, FormRules } from '@/uni_modules/wot-design-uni/components/wd-form/types'

describe('WdForm', () => {
  // 测试基本渲染
  test('renders form with default props', () => {
    const wrapper = mount(WdForm, {
      props: {
        model: {}
      }
    })
    expect(wrapper.classes()).toContain('wd-form')
  })

  // 测试表单验证
  test('validates form fields', async () => {
    const rules: FormRules = {
      name: [{ required: true, message: '请输入姓名' }],
      age: [{ required: true, message: '请输入年龄' }]
    }

    const wrapper = mount({
      components: {
        WdForm,
        WdFormItem,
        WdInput
      },
      template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-form-item prop="name" label="姓名">
            <wd-input v-model="formData.name" />
          </wd-form-item>
          <wd-form-item prop="age" label="年龄">
            <wd-input v-model="formData.age" />
          </wd-form-item>
        </wd-form>
      `,
      data() {
        return {
          formData: {
            name: '',
            age: ''
          },
          rules
        }
      }
    })

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBe(2)
    await nextTick()
    expect(wrapper.findAll('.wd-form-item__error-message').length).toBe(2)
  })

  // 测试表单重置
  test('resets form fields', async () => {
    const wrapper = mount({
      components: {
        WdForm,
        WdFormItem,
        WdInput
      },
      template: `
        <wd-form ref="form" :model="formData">
          <wd-form-item prop="name">
            <wd-input v-model="formData.name" />
          </wd-form-item>
        </wd-form>
      `,
      data() {
        return {
          formData: {
            name: 'test'
          }
        }
      }
    })

    const form = wrapper.findComponent({ ref: 'form' })
    await form.vm.reset()
    await nextTick()
    // reset方法只会清除错误信息，不会重置表单值
    expect((wrapper.vm.formData as any).name).toBe('test')
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  // 测试表单项标签宽度
  test('renders with custom label width', () => {
    const labelWidth = '120px'
    const wrapper = mount({
      components: {
        WdForm,
        WdFormItem
      },
      template: `
        <wd-form :model="{}">
          <wd-form-item label="测试" label-width="${labelWidth}" prop="test">
            <div>内容</div>
          </wd-form-item>
        </wd-form>
      `
    })

    const formItem = wrapper.findComponent(WdFormItem)
    expect(formItem.props('labelWidth')).toBe(labelWidth)
  })

  // 测试表单错误提示类型
  test('supports different error types', async () => {
    const wrapper = mount({
      components: {
        WdForm,
        WdFormItem,
        WdInput
      },
      template: `
        <wd-form ref="form" :rules="rules" :model="formData" error-type="none">
          <wd-form-item prop="name" label="姓名">
            <wd-input v-model="formData.name" />
          </wd-form-item>
        </wd-form>
      `,
      data() {
        return {
          formData: {
            name: ''
          },
          rules: {
            name: [{ required: true, message: '请输入姓名' }]
          }
        }
      }
    })

    const form = wrapper.findComponent({ ref: 'form' })
    await form.vm.validate()
    await nextTick()
    // errorType为none时不显示错误信息
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  // 测试自定义校验规则
  test('handles custom validation rules', async () => {
    const validator = (value: any) => {
      if (value < 18) {
        return Promise.reject('年龄必须大于18岁')
      } else {
        return Promise.resolve()
      }
    }

    const wrapper = mount({
      components: {
        WdForm,
        WdFormItem,
        WdInput
      },
      template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-form-item prop="age">
            <wd-input v-model="formData.age" />
          </wd-form-item>
        </wd-form>
      `,
      data() {
        return {
          formData: { age: '17' },
          rules: {
            age: [
              {
                required: true,
                message: '年龄必须大于18岁',
                validator
              }
            ]
          }
        }
      }
    })

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    await nextTick()
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(true)
    expect(wrapper.find('.wd-form-item__error-message').text()).toBe('年龄必须大于18岁')
  })

  // 测试指定字段校验
  test('validates specific fields', async () => {
    const rules: FormRules = {
      name: [{ required: true, message: '请输入姓名' }],
      age: [{ required: true, message: '请输入年龄' }]
    }

    const wrapper = mount({
      components: {
        WdForm,
        WdFormItem,
        WdInput
      },
      template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-form-item prop="name" label="姓名">
            <wd-input v-model="formData.name" />
          </wd-form-item>
          <wd-form-item prop="age" label="年龄">
            <wd-input v-model="formData.age" />
          </wd-form-item>
        </wd-form>
      `,
      data() {
        return {
          formData: {
            name: '',
            age: '20'
          },
          rules
        }
      }
    })

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate('name')
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].prop).toBe('name')
    await nextTick()
    const errorMessages = wrapper.findAll('.wd-form-item__error-message')
    expect(errorMessages.length).toBe(1)
    expect(errorMessages[0].text()).toBe('请输入姓名')
  })

  // 测试resetOnChange属性
  test('resets validation on model change when resetOnChange is true', async () => {
    const wrapper = mount({
      components: {
        WdForm,
        WdFormItem,
        WdInput
      },
      template: `
        <wd-form ref="form" :rules="rules" :model="formData" :reset-on-change="true">
          <wd-form-item prop="name" label="姓名">
            <wd-input v-model="formData.name" />
          </wd-form-item>
        </wd-form>
      `,
      data() {
        return {
          formData: {
            name: ''
          },
          rules: {
            name: [{ required: true, message: '请输入姓名' }]
          }
        }
      }
    })

    const form = wrapper.findComponent({ ref: 'form' })
    await form.vm.validate()
    await nextTick()
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(true)

    // 修改表单值，错误信息应该被清除
    await wrapper.setData({
      formData: {
        name: 'test'
      }
    })
    await nextTick()
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-form'
    const wrapper = mount(WdForm, {
      props: {
        model: {},
        customClass
      }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 20px;'
    const wrapper = mount(WdForm, {
      props: {
        model: {},
        customStyle
      }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
