import { mount } from '@vue/test-utils'
import WdForm from '@/uni_modules/wot-design-uni/components/wd-form/wd-form.vue'
import WdFormItem from '@/uni_modules/wot-design-uni/components/wd-form-item/wd-form-item.vue'
import WdInput from '@/uni_modules/wot-design-uni/components/wd-input/wd-input.vue'
import WdCalendar from '@/uni_modules/wot-design-uni/components/wd-calendar/wd-calendar.vue'
import WdCell from '@/uni_modules/wot-design-uni/components/wd-cell/wd-cell.vue'
import WdColPicker from '@/uni_modules/wot-design-uni/components/wd-col-picker/wd-col-picker.vue'
import WdDatetimePicker from '@/uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.vue'
import WdPicker from '@/uni_modules/wot-design-uni/components/wd-picker/wd-picker.vue'
import WdSelectPicker from '@/uni_modules/wot-design-uni/components/wd-select-picker/wd-select-picker.vue'
import WdTextarea from '@/uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.vue'
import WdCheckbox from '@/uni_modules/wot-design-uni/components/wd-checkbox/wd-checkbox.vue'
import WdCheckboxGroup from '@/uni_modules/wot-design-uni/components/wd-checkbox-group/wd-checkbox-group.vue'
import WdSearch from '@/uni_modules/wot-design-uni/components/wd-search/wd-search.vue'
import WdTabs from '@/uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.vue'
import WdTab from '@/uni_modules/wot-design-uni/components/wd-tab/wd-tab.vue'
import WdTag from '@/uni_modules/wot-design-uni/components/wd-tag/wd-tag.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import { describe, test, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import type { FormRules } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import { isArray } from '@/uni_modules/wot-design-uni/components/common/util'

// 全局组件
const globalComponents = {
  WdFormItem,
  WdInput,
  WdCalendar,
  WdCell,
  WdColPicker,
  WdDatetimePicker,
  WdPicker,
  WdSelectPicker,
  WdTextarea,
  WdCheckbox,
  WdCheckboxGroup,
  WdForm,
  WdIcon,
  WdSearch,
  WdTabs,
  WdTab,
  WdTag
}

describe('WdForm 和 WdFormItem', () => {
  // 测试基本渲染
  test('测试基本渲染 - 默认属性', () => {
    const wrapper = mount(WdForm, {
      props: {
        model: {}
      }
    })
    expect(wrapper.classes()).toContain('wd-form')
  })

  // 测试表单验证
  test('测试表单字段验证', async () => {
    const rules: FormRules = {
      name: [{ required: true, message: '请输入姓名' }],
      age: [{ required: true, message: '请输入年龄' }]
    }

    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-input prop="name" label="姓名" v-model="formData.name" />
          <wd-input prop="age" label="年龄" v-model="formData.age" />
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
      },
      {
        global: { components: globalComponents }
      }
    )

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
    await nextTick()
    expect(wrapper.findAll('.wd-input__error-message').length).toBeGreaterThan(0)
  })

  // 测试表单重置
  test('测试表单字段重置', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :model="formData">
          <wd-input prop="name"  :rules="[{ required: true, message: '请填写用户名' }]" v-model="formData.name" />
        </wd-form>
      `,
        data() {
          return {
            formData: {
              name: 'test'
            }
          }
        }
      },
      {
        global: { components: globalComponents }
      }
    )

    // 使用类型断言访问组件实例的数据
    const vm = wrapper.vm as any

    expect(vm.formData.name).toBe('test')

    // Call reset and check if error messages are cleared
    vm.formData.name = ''

    const form = wrapper.findComponent(WdForm)
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)

    await nextTick()

    expect(wrapper.find('.wd-input__error-message').exists()).toBe(true)
    form.vm.reset()
    await nextTick()
    expect(wrapper.find('.wd-input__error-message').exists()).toBe(false)
  })

  // 测试表单项标签宽度
  test('测试自定义标签宽度渲染', () => {
    const labelWidth = '120px'
    const wrapper = mount(
      {
        template: `
        <wd-form :model="{}">
          <wd-form-item label="测试" label-width="${labelWidth}" prop="test">
            <div>内容</div>
          </wd-form-item>
        </wd-form>
      `
      },
      {
        global: { components: globalComponents }
      }
    )

    const formItem = wrapper.findComponent(WdFormItem)
    expect(formItem.props('labelWidth')).toBe(labelWidth)
  })

  // 测试表单错误提示类型
  test('测试支持不同的错误提示类型', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData" error-type="none">
          <wd-input v-model="formData.name" prop="name" label="姓名" />
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
      },
      {
        global: { components: globalComponents }
      }
    )
    wrapper.findComponent(WdForm).vm.validate()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.wd-input__error-message').exists()).toBe(false)
  })

  // 测试自定义校验规则
  test('测试处理自定义校验规则', async () => {
    const validator = (value: any) => {
      if (value < 18) {
        return Promise.reject('年龄必须大于18岁')
      } else {
        return Promise.resolve()
      }
    }

    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-input prop="age" v-model="formData.age" />
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
      },
      {
        global: { components: globalComponents }
      }
    )

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    await nextTick()
    expect(wrapper.find('.wd-input__error-message').exists()).toBe(true)
  })

  // 测试指定字段校验
  test('测试校验指定字段', async () => {
    const rules: FormRules = {
      name: [{ required: true, message: '请输入姓名' }],
      age: [{ required: true, message: '请输入年龄' }]
    }

    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-input prop="name" label="姓名" v-model="formData.name" />
          <wd-input prop="age" label="年龄" v-model="formData.age" />
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
      },
      {
        global: { components: globalComponents }
      }
    )

    const form = wrapper.findComponent(WdForm)
    const result = await form.vm.validate('name')
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
    await nextTick()
    const errorMessages = wrapper.findAll('.wd-input__error-message')
    expect(errorMessages.length).toBeGreaterThan(0)
  })

  // 测试resetOnChange属性
  test('当 resetOnChange 为 true 时，在模型更改时重置验证', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData" :reset-on-change="true">
          <wd-input prop="name" label="姓名" v-model="formData.name" />
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
      },
      {
        global: { components: globalComponents }
      }
    )
    const form = wrapper.findComponent(WdForm)
    await form.vm.validate()
    await nextTick()
    expect(wrapper.find('.wd-input__error-message').exists()).toBe(true)
  })

  // 测试自定义类名
  test('测试应用自定义类名', () => {
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
  test('测试应用自定义样式', () => {
    const customStyle = 'margin: 20px;'
    const wrapper = mount(WdForm, {
      props: {
        model: {},
        customStyle
      }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试与 WdSelectPicker 集成
  test('测试与 WdSelectPicker 集成', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-select-picker prop="fruit" label="水果" v-model="formData.fruit" :columns="columns" />
        </wd-form>
      `,
        data() {
          return {
            formData: {
              fruit: ''
            },
            rules: {
              fruit: [{ required: true, message: '请选择水果' }]
            },
            columns: [
              { label: '苹果', value: 'apple' },
              { label: '香蕉', value: 'banana' }
            ]
          }
        }
      },
      {
        global: { components: globalComponents }
      }
    )

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors[0].message).toBe('请选择水果')
    await nextTick()
    expect(wrapper.find('.wd-select-picker__error-message').exists()).toBe(true)

    // Set value and validate again
    const vm = wrapper.vm as any
    vm.formData.fruit = 'apple'
    await nextTick()
    const result2 = await form.vm.validate()
    expect(result2.valid).toBe(true)
    await nextTick()
    expect(wrapper.find('.wd-select-picker__error-message').exists()).toBe(false)
  })

  // 测试与 WdPicker 集成
  test('测试与 WdPicker 集成', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-picker prop="city" label="城市" v-model="formData.city" :columns="columns" />
        </wd-form>
      `,
        data() {
          return {
            formData: {
              city: ''
            },
            rules: {
              city: [{ required: true, message: '请选择城市' }]
            },
            columns: [
              { label: '北京', value: 'beijing' },
              { label: '上海', value: 'shanghai' }
            ]
          }
        }
      },
      {
        global: { components: globalComponents }
      }
    )

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors[0].message).toBe('请选择城市')
    await nextTick()
    expect(wrapper.find('.wd-picker__error-message').exists()).toBe(true)

    // Set value and validate again
    const vm = wrapper.vm as any
    vm.formData.city = 'beijing'
    await nextTick()
    const result2 = await form.vm.validate()
    expect(result2.valid).toBe(true)
    await nextTick()
    expect(wrapper.find('.wd-picker__error-message').exists()).toBe(false)
  })

  // 测试与 WdTextarea 集成
  test('测试与 WdTextarea 集成', async () => {
    const wrapper = mount(
      {
        global: { components: globalComponents },
        template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-textarea prop="intro" label="介绍" v-model="formData.intro" />
        </wd-form>
      `,
        data() {
          return {
            formData: {
              intro: ''
            },
            rules: {
              intro: [{ required: true, message: '请输入介绍' }]
            }
          }
        }
      },
      {
        global: { components: globalComponents }
      }
    )

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors[0].message).toBe('请输入介绍')
    await nextTick()
    expect(wrapper.find('.wd-textarea__error-message').exists()).toBe(true)

    // Set value and validate again
    const vm = wrapper.vm as any
    vm.formData.intro = 'some introduction'
    await nextTick()
    const result2 = await form.vm.validate()
    expect(result2.valid).toBe(true)
    await nextTick()
    expect(wrapper.find('.wd-textarea__error-message').exists()).toBe(false)
  })

  // 测试与 WdCalendar 集成
  test('测试与 WdCalendar 集成', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-calendar prop="date" label="日期" v-model="formData.date" />
        </wd-form>
      `,
        data() {
          return {
            formData: {
              date: null
            },
            rules: {
              date: [{ required: true, message: '请选择日期' }]
            }
          }
        }
      },
      {
        global: { components: globalComponents }
      }
    )

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors[0].message).toBe('请选择日期')
    await nextTick()
    expect(wrapper.find('.wd-calendar__error-message').exists()).toBe(true)

    // Set value and validate again
    const vm = wrapper.vm as any
    vm.formData.date = new Date().getTime()
    await nextTick()
    const result2 = await form.vm.validate()
    expect(result2.valid).toBe(true)
    await nextTick()
    expect(wrapper.find('.wd-calendar__error-message').exists()).toBe(false)
  })

  // 测试与 WdDatetimePicker 集成
  test('测试与 WdDatetimePicker 集成', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-datetime-picker prop="datetime" label="日期时间" v-model="formData.datetime" />
        </wd-form>
      `,
        data() {
          return {
            formData: {
              datetime: ''
            },
            rules: {
              datetime: [{ required: true, message: '请选择日期时间' }]
            }
          }
        }
      },
      {
        global: { components: globalComponents }
      }
    )

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors[0].message).toBe('请选择日期时间')
    await nextTick()
    expect(wrapper.find('.wd-picker__error-message').exists()).toBe(true)

    // Set value and validate again
    const vm = wrapper.vm as any
    vm.formData.datetime = '2024-01-01 10:00'
    await nextTick()
    const result2 = await form.vm.validate()
    expect(result2.valid).toBe(true)
    await nextTick()
    expect(wrapper.find('.wd-picker__error-message').exists()).toBe(false)
  })

  // 测试与 WdColPicker 集成
  test('测试与 WdColPicker 集成', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-col-picker prop="area" label="地区" v-model="formData.area" :columns="columns" />
        </wd-form>
      `,
        data() {
          return {
            formData: {
              area: []
            },
            rules: {
              area: [
                {
                  required: true,
                  message: '请选择地区',
                  validator: (value: any) => {
                    return isArray(value) && value.length > 0
                  }
                }
              ]
            },
            columns: [[{ label: '北京', value: 'beijing' }], [{ label: '朝阳区', value: 'chaoyang' }]]
          }
        }
      },
      {
        global: { components: globalComponents }
      }
    )

    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors[0].message).toBe('请选择地区')
    await nextTick()
    expect(wrapper.find('.wd-col-picker__error-message').exists()).toBe(true)

    // Set value and validate again
    const vm = wrapper.vm as any
    vm.formData.area = ['beijing', 'chaoyang']
    await nextTick()
    const result2 = await form.vm.validate()
    expect(result2.valid).toBe(true)
    await nextTick()
    expect(wrapper.find('.wd-col-picker__error-message').exists()).toBe(false)
  })

  // 测试与 WdCheckboxGroup 集成
  test('测试与 WdCheckboxGroup 集成', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :rules="rules" :model="formData">
          <wd-form-item prop="hobbies" label="爱好">
            <wd-checkbox-group v-model="formData.hobbies">
              <wd-checkbox modelValue="reading">阅读</wd-checkbox>
              <wd-checkbox modelValue="music">音乐</wd-checkbox>
            </wd-checkbox-group>
          </wd-form-item>
        </wd-form>
      `,
        data() {
          return {
            formData: {
              hobbies: []
            },
            rules: {
              hobbies: [
                {
                  required: true,
                  message: '请选择爱好',
                  validator: (value: any) => {
                    return isArray(value) && value.length > 0
                  }
                }
              ]
            }
          }
        }
      },
      {
        global: { components: globalComponents }
      }
    )
    const form = wrapper.findComponent(WdForm)
    const result = await form.vm.validate()
    expect(result.valid).toBe(false)
    expect(result.errors[0].message).toBe('请选择爱好')
    await nextTick()
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(true)

    // Set value and validate again
    const vm = wrapper.vm as any
    vm.formData.hobbies = ['reading']
    await nextTick()
    const result2 = await form.vm.validate()
    expect(result2.valid).toBe(true)
    await nextTick()
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  // ===== WdFormItem 测试用例 =====

  // 测试 WdFormItem 基本渲染
  test('WdFormItem 基本渲染', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form :model="formData">
          <wd-form-item prop="username" label="用户名">
            <wd-input v-model="formData.username" placeholder="请输入用户名" />
          </wd-form-item>
        </wd-form>
      `,
        data() {
          return {
            formData: {
              username: ''
            }
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    // 检查 form-item 是否正确渲染
    expect(wrapper.find('.wd-form-item').exists()).toBe(true)
    // 检查标签是否正确显示
    expect(wrapper.text()).toContain('用户名')
  })

  // 测试 WdFormItem 必填标记
  test('WdFormItem 显示必填标记', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form :model="formData">
          <wd-form-item prop="username" label="用户名" required>
            <wd-input v-model="formData.username" placeholder="请输入用户名" />
          </wd-form-item>
        </wd-form>
      `,
        data() {
          return {
            formData: {
              username: ''
            }
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    // 检查必填标记是否存在
    expect(wrapper.html()).toContain('required')
  })

  // 测试 WdFormItem 垂直居中
  test('WdFormItem 垂直居中', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form :model="formData">
          <wd-form-item prop="username" label="用户名" center>
            <wd-input v-model="formData.username" placeholder="请输入用户名" />
          </wd-form-item>
        </wd-form>
      `,
        data() {
          return {
            formData: {
              username: ''
            }
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    // 检查是否有居中样式
    expect(wrapper.html()).toContain('is-center')
  })

  // 测试 WdFormItem 自定义标签宽度
  test('WdFormItem 自定义标签宽度', async () => {
    const labelWidth = '150px'
    const wrapper = mount(
      {
        template: `
        <wd-form :model="formData">
          <wd-form-item prop="username" label="用户名" label-width="${labelWidth}">
            <wd-input v-model="formData.username" placeholder="请输入用户名" />
          </wd-form-item>
        </wd-form>
      `,
        data() {
          return {
            formData: {
              username: ''
            }
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    // 检查标签宽度是否正确设置
    const formItem = wrapper.findComponent(WdFormItem)
    expect(formItem.props('labelWidth')).toBe(labelWidth)
  })

  // 测试 WdFormItem 链接样式
  test('WdFormItem 链接样式', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form :model="formData">
          <wd-form-item prop="username" label="用户名" is-link>
            <wd-input v-model="formData.username" placeholder="请输入用户名" />
          </wd-form-item>
        </wd-form>
      `,
        data() {
          return {
            formData: {
              username: ''
            }
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    // 检查是否有链接样式
    const formItem = wrapper.findComponent(WdFormItem)
    expect(formItem.props('isLink')).toBe(true)
  })

  // 测试 WdFormItem 错误消息显示
  test('WdFormItem 错误消息显示', async () => {
    const errorMessage = '用户名不能为空'
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :model="formData" :rules="rules">
          <wd-form-item prop="username" label="用户名">
            <wd-input v-model="formData.username" placeholder="请输入用户名" />
          </wd-form-item>
        </wd-form>
      `,
        data() {
          return {
            formData: {
              username: ''
            },
            rules: {
              username: [{ required: true, message: errorMessage }]
            }
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    // 触发表单验证
    const form = wrapper.findComponent({ ref: 'form' })
    await form.vm.validate()
    await nextTick()

    // 检查错误消息是否显示
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(true)
    expect(wrapper.find('.wd-form-item__error-message').text()).toBe(errorMessage)
  })

  // 测试 WdFormItem 与 WdForm 的集成 - 表单验证
  test('WdFormItem 与 WdForm 的集成 - 表单验证', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :model="formData" :rules="rules">
          <wd-form-item prop="username" label="用户名">
            <wd-input v-model="formData.username" placeholder="请输入用户名" />
          </wd-form-item>
          <wd-form-item prop="password" label="密码">
            <wd-input v-model="formData.password" type="password" placeholder="请输入密码" />
          </wd-form-item>
        </wd-form>
      `,
        data() {
          return {
            formData: {
              username: '',
              password: ''
            },
            rules: {
              username: [{ required: true, message: '请输入用户名' }],
              password: [{ required: true, message: '请输入密码' }]
            }
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    // 触发表单验证
    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()

    // 检查验证结果
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBe(2)

    await nextTick()

    // 检查错误消息是否显示
    const errorMessages = wrapper.findAll('.wd-form-item__error-message')
    expect(errorMessages.length).toBe(2)
    expect(errorMessages[0].text()).toBe('请输入用户名')
    expect(errorMessages[1].text()).toBe('请输入密码')

    // 更新表单数据
    await wrapper.setData({
      formData: {
        username: 'test',
        password: 'password'
      }
    })

    // 再次验证
    const result2 = await form.vm.validate()
    expect(result2.valid).toBe(true)
    expect(result2.errors.length).toBe(0)

    await nextTick()

    // 检查错误消息是否清除
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  // 测试 WdFormItem 与 WdForm 的集成 - 重置表单
  test('WdFormItem 与 WdForm 的集成 - 重置表单', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :model="formData" :rules="rules">
          <wd-form-item prop="username" label="用户名">
            <wd-input v-model="formData.username" placeholder="请输入用户名" />
          </wd-form-item>
        </wd-form>
      `,
        data() {
          return {
            formData: {
              username: ''
            },
            rules: {
              username: [{ required: true, message: '请输入用户名' }]
            }
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    // 触发表单验证
    const form = wrapper.findComponent({ ref: 'form' })
    await form.vm.validate()
    await nextTick()

    // 检查错误消息是否显示
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(true)

    // 重置表单
    form.vm.reset()
    await nextTick()

    // 检查错误消息是否清除
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })

  // 测试 WdFormItem 与 WdForm 的集成 - 自定义校验规则
  test('WdFormItem 与 WdForm 的集成 - 自定义校验规则', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-form ref="form" :model="formData">
          <wd-form-item
            prop="email"
            label="邮箱"
            :rules="[
              { required: true, message: '请输入邮箱' },
              {
                validator: validateEmail,
                message: '请输入正确的邮箱格式'
              }
            ]"
          >
            <wd-input v-model="formData.email" placeholder="请输入邮箱" />
          </wd-form-item>
        </wd-form>
      `,
        data() {
          return {
            formData: {
              email: 'invalid-email'
            }
          }
        },
        methods: {
          validateEmail(value: string): boolean {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(value)
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    // 触发表单验证
    const form = wrapper.findComponent({ ref: 'form' })
    const result = await form.vm.validate()

    // 检查验证结果
    expect(result.valid).toBe(false)

    await nextTick()

    // 检查错误消息是否显示
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(true)
    expect(wrapper.find('.wd-form-item__error-message').text()).toBe('请输入正确的邮箱格式')

    // 更新为有效的邮箱
    await wrapper.setData({
      formData: {
        email: 'test@example.com'
      }
    })

    // 再次验证
    const result2 = await form.vm.validate()
    expect(result2.valid).toBe(true)

    await nextTick()

    // 检查错误消息是否清除
    expect(wrapper.find('.wd-form-item__error-message').exists()).toBe(false)
  })
})
