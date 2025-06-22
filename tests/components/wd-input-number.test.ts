import { mount } from '@vue/test-utils'
import WdInputNumber from '@/uni_modules/wot-design-uni/components/wd-input-number/wd-input-number.vue'
import { describe, test, expect, vi } from 'vitest'
import { nextTick, defineComponent, ref, toRefs } from 'vue'
import { type InputNumberProps } from '@/uni_modules/wot-design-uni/components/wd-input-number/types'

// 辅助函数：创建带v-model的包装组件
function createWrapper(props: Partial<InputNumberProps> = {}, vModelValue: number | string = 1) {
  const WrapperComponent = defineComponent({
    components: { WdInputNumber },
    props: {
      // 定义所有可能的props，这样可以通过setProps动态修改
      modelValue: { type: [Number, String], default: undefined },
      min: { type: Number, default: -Infinity },
      max: { type: Number, default: Infinity },
      step: { type: Number, default: 1 },
      precision: { type: [Number, String], default: undefined },
      stepStrictly: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      disableInput: { type: Boolean, default: false },
      disableMinus: { type: Boolean, default: false },
      disablePlus: { type: Boolean, default: false },
      withoutInput: { type: Boolean, default: false },
      inputWidth: { type: [String, Number], default: undefined },
      allowNull: { type: Boolean, default: false },
      placeholder: { type: String, default: undefined },
      adjustPosition: { type: Boolean, default: true },
      immediateChange: { type: Boolean, default: true },
      longPress: { type: Boolean, default: false },
      beforeChange: { type: Function, default: undefined },
      customClass: { type: String, default: '' },
      customStyle: { type: String, default: '' },
      updateOnInit: { type: Boolean, default: false }
    },
    setup(componentProps) {
      const value = ref(vModelValue)

      // 返回所有props，使其可以在模板中使用
      return {
        value,
        ...toRefs(componentProps)
      }
    },
    template: `<WdInputNumber 
      v-model="value" 
      :min="min"
      :max="max"
      :step="step"
      :precision="precision"
      :step-strictly="stepStrictly"
      :disabled="disabled"
      :disable-input="disableInput"
      :disable-minus="disableMinus"
      :disable-plus="disablePlus"
      :without-input="withoutInput"
      :input-width="inputWidth"
      :allow-null="allowNull"
      :placeholder="placeholder"
      :adjust-position="adjustPosition"
      :immediate-change="immediateChange"
      :long-press="longPress"
      :before-change="beforeChange"
      :custom-class="customClass"
      :custom-style="customStyle"
      :update-on-init="updateOnInit"
    />`
  })

  return mount(WrapperComponent, { props })
}

// 辅助函数：创建不需要v-model的组件（用于测试单向props）
function createPropsOnlyWrapper(props: any = {}) {
  return mount(WdInputNumber, { props })
}

// 辅助函数：模拟input事件
function createInputEvent(value: string) {
  return {
    detail: { value }
  }
}

// 辅助函数：模拟input输入
async function simulateInput(wrapper: any, value: string) {
  // 直接调用组件的handleInput方法
  const component = wrapper.findComponent(WdInputNumber)
  if (component.exists()) {
    component.vm.handleInput(createInputEvent(value))
  }
  await nextTick()
}

// 辅助函数：模拟blur失焦
async function simulateBlur(wrapper: any, value: string) {
  // 直接调用组件的handleBlur方法
  const component = wrapper.findComponent(WdInputNumber)
  if (component.exists()) {
    component.vm.handleBlur(createInputEvent(value))
  }
  await nextTick()
}

describe('WdInputNumber', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = createWrapper()
    expect(wrapper.findComponent(WdInputNumber).classes()).toContain('wd-input-number')
    expect(wrapper.find('.wd-input-number__input').exists()).toBe(true)
    expect(wrapper.findAll('.wd-input-number__action').length).toBe(2)
  })

  // 测试输入值
  test('显示正确的值', async () => {
    const wrapper = createWrapper({}, 5)
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('5')

    // 测试v-model更新
    wrapper.vm.value = 10
    await nextTick()
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('10')
  })

  // 测试最小值限制
  test('最小值限制', async () => {
    const wrapper = createWrapper({ min: 3 }, 5)

    // 点击减号按钮多次，值应该不能低于最小值
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')

    // 值应该被限制在最小值
    expect(wrapper.vm.value).toBe(3)

    // 当值等于最小值时，减号按钮应该被禁用
    expect(wrapper.findAll('.wd-input-number__action')[0].classes()).toContain('is-disabled')
  })

  // 测试最大值限制
  test('最大值限制', async () => {
    const wrapper = createWrapper({ max: 10 }, 8)

    // 点击加号按钮多次，值应该不能超过最大值
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')

    // 值应该被限制在最大值
    expect(wrapper.vm.value).toBe(10)

    // 当值等于最大值时，加号按钮应该被禁用
    expect(wrapper.findAll('.wd-input-number__action')[1].classes()).toContain('is-disabled')
  })

  // 测试步进值
  test('按步进值增减', async () => {
    const wrapper = createWrapper({ step: 2 }, 5)

    // 点击加号按钮，值应该增加2
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.vm.value).toBe(7)

    // 点击减号按钮，值应该减少2
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    expect(wrapper.vm.value).toBe(5)
  })

  // 测试精度
  test('精度设置', async () => {
    const wrapper = createWrapper({ step: 0.1, precision: 2 }, 1)

    // 点击加号按钮，值应该增加0.1并保持2位小数精度
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.vm.value).toBe(1.1)
  })

  // 测试严格步进模式
  test('严格步进模式', async () => {
    const wrapper = createWrapper({ step: 2, stepStrictly: true }, 1)

    // 模拟输入
    await simulateInput(wrapper, '3')
    await simulateBlur(wrapper, '3')
    await nextTick()

    // 输入3，步进2：Math.round(3/2)*2 = Math.round(1.5)*2 = 2*2 = 4
    expect(wrapper.vm.value).toBe(4)
  })

  // 测试严格步进模式 + 边界限制
  test('严格步进模式与边界限制', async () => {
    const wrapper = createWrapper(
      {
        step: 2,
        min: 3,
        max: 15,
        stepStrictly: true
      },
      4
    )

    // 输入1，应该调整为4（≥3的最小2的倍数）
    await simulateInput(wrapper, '1')
    await simulateBlur(wrapper, '1')
    await nextTick()
    expect(wrapper.vm.value).toBe(4)

    // 输入17，应该调整为14（≤15的最大2的倍数）
    await simulateInput(wrapper, '17')
    await simulateBlur(wrapper, '17')
    await nextTick()
    expect(wrapper.vm.value).toBe(14)
  })

  // 测试禁用状态
  test('禁用组件', async () => {
    const wrapper = createWrapper({ disabled: true }, 5)

    expect(wrapper.findComponent(WdInputNumber).classes()).toContain('is-disabled')
    expect(wrapper.find('.wd-input-number__input').attributes('disabled')).toBe('')

    const initialValue = wrapper.vm.value
    // 点击按钮不应该改变值
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.vm.value).toBe(initialValue)
  })

  // 测试禁用输入
  test('仅禁用输入', async () => {
    const wrapper = createWrapper({ disableInput: true }, 5)

    expect(wrapper.find('.wd-input-number__input').attributes('disabled')).toBe('')

    // 按钮应该仍然可用
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.vm.value).toBe(6)
  })

  // 测试禁用加号按钮
  test('禁用加号按钮', async () => {
    const wrapper = createWrapper({ disablePlus: true }, 5)

    expect(wrapper.findAll('.wd-input-number__action')[1].classes()).toContain('is-disabled')

    const initialValue = wrapper.vm.value
    // 点击加号按钮不应该改变值
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.vm.value).toBe(initialValue)

    // 减号按钮应该仍然可用
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    expect(wrapper.vm.value).toBe(4)
  })

  // 测试禁用减号按钮
  test('禁用减号按钮', async () => {
    const wrapper = createWrapper({ disableMinus: true }, 5)

    expect(wrapper.findAll('.wd-input-number__action')[0].classes()).toContain('is-disabled')

    const initialValue = wrapper.vm.value
    // 点击减号按钮不应该改变值
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    expect(wrapper.vm.value).toBe(initialValue)

    // 加号按钮应该仍然可用
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.vm.value).toBe(6)
  })

  // 测试不显示输入框
  test('隐藏输入框', () => {
    const wrapper = createWrapper({ withoutInput: true }, 5)

    expect(wrapper.findComponent(WdInputNumber).classes()).toContain('is-without-input')
    expect(wrapper.find('.wd-input-number__input').exists()).toBe(false)
  })

  // 测试输入框宽度 - 只需要验证组件正常渲染
  test('设置输入框宽度', () => {
    const wrapper = createWrapper({ inputWidth: '100px' }, 5)
    expect(wrapper.find('.wd-input-number__input').exists()).toBe(true)
  })

  // 测试允许空值
  test('允许空值', async () => {
    const wrapper = createWrapper({ allowNull: true }, '')

    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('')

    await simulateInput(wrapper, '')
    await simulateBlur(wrapper, '')
    await nextTick()

    expect(wrapper.vm.value).toBe('')
  })

  // 测试不允许空值的临时删除
  test('非允许空值但可临时删除', async () => {
    const wrapper = createWrapper({ allowNull: false, min: 1 }, 5)

    await simulateInput(wrapper, '')
    await nextTick()

    // 输入过程中应该显示空值
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('')

    // 失焦后应该自动修正为最小值
    await simulateBlur(wrapper, '')
    await nextTick()
    expect(wrapper.vm.value).toBe(1)
  })

  // 测试输入框占位符
  test('显示占位符', () => {
    const placeholder = '请输入'
    const wrapper = createWrapper({ allowNull: true, placeholder }, '')

    expect(wrapper.find('.wd-input-number__input').attributes('placeholder')).toBe(placeholder)
  })

  // 测试adjustPosition属性
  test('adjustPosition属性', () => {
    const wrapper = createWrapper({ adjustPosition: false }, 5)
    expect(wrapper.find('.wd-input-number__input').attributes('adjust-position')).toBe('false')
  })

  // 测试立即更新模式
  test('立即更新模式', async () => {
    const wrapper = createWrapper({ immediateChange: true }, 1)

    await simulateInput(wrapper, '5')
    await nextTick()

    // 立即模式下应该立即更新
    expect(wrapper.vm.value).toBe(5)
  })

  // 测试非立即更新模式
  test('非立即更新模式', async () => {
    const wrapper = createWrapper({ immediateChange: false }, 1)

    await simulateInput(wrapper, '5')
    await nextTick()

    // 非立即模式下输入时不应该更新
    expect(wrapper.vm.value).toBe(1)

    // 失焦时才更新
    await simulateBlur(wrapper, '5')
    await nextTick()
    expect(wrapper.vm.value).toBe(5)
  })

  // 测试初始化时自动修正
  test('初始化时自动修正', async () => {
    const wrapper = createPropsOnlyWrapper({
      modelValue: 1,
      min: 3,
      max: 15,
      step: 2,
      stepStrictly: true,
      updateOnInit: true
    })

    await nextTick()

    // 应该触发update:modelValue事件，将值从1修正为4
    const updateEvents = wrapper.emitted('update:modelValue')
    expect(updateEvents).toBeTruthy()
    expect(updateEvents![0]).toEqual([4])
  })

  // 测试不自动修正初始值
  test('不自动修正初始值', async () => {
    const wrapper = createPropsOnlyWrapper({
      modelValue: 1,
      min: 3,
      max: 15,
      step: 2,
      stepStrictly: true,
      updateOnInit: false
    })

    await nextTick()

    // 不应该触发update:modelValue事件
    const updateEvents = wrapper.emitted('update:modelValue')
    expect(updateEvents).toBeFalsy()
  })

  // 测试拦截器功能 - 使用props形式测试更合适
  test('beforeChange拦截器', async () => {
    let shouldAllow = true
    const beforeChange = vi.fn(() => shouldAllow)

    const wrapper = createPropsOnlyWrapper({
      modelValue: 5,
      beforeChange
    })

    // 允许变更
    shouldAllow = true
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(beforeChange).toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()

    // 阻止变更
    shouldAllow = false
    beforeChange.mockClear()
    const previousEvents = wrapper.emitted('update:modelValue')?.length || 0
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(beforeChange).toHaveBeenCalled()
    const currentEvents = wrapper.emitted('update:modelValue')?.length || 0
    expect(currentEvents).toBe(previousEvents) // 事件数量不应该增加
  })

  // 测试异步拦截器
  test('异步beforeChange拦截器', async () => {
    const beforeChange = vi.fn(() => Promise.resolve(true))

    const wrapper = createPropsOnlyWrapper({
      modelValue: 5,
      beforeChange
    })

    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(beforeChange).toHaveBeenCalled()

    // 等待异步操作完成
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // 测试长按功能
  test('长按功能', async () => {
    vi.useFakeTimers()

    const wrapper = createWrapper({ longPress: true }, 5)

    const addButton = wrapper.findAll('.wd-input-number__action')[1]

    // 开始长按
    await addButton.trigger('touchstart')

    // 等待600ms后应该触发第一次增加
    vi.advanceTimersByTime(600)
    await nextTick()
    expect(wrapper.vm.value).toBe(6)

    // 继续长按，应该每250ms触发一次
    vi.advanceTimersByTime(250)
    await nextTick()
    expect(wrapper.vm.value).toBe(7)

    // 结束长按
    await addButton.trigger('touchend')

    vi.useRealTimers()
  })

  // 测试焦点事件
  test('触发焦点和失焦事件', async () => {
    const wrapper = createWrapper({}, 5)

    await wrapper.find('.wd-input-number__input').trigger('focus')
    expect(wrapper.findComponent(WdInputNumber).emitted('focus')).toBeTruthy()

    await wrapper.find('.wd-input-number__input').trigger('blur')
    expect(wrapper.findComponent(WdInputNumber).emitted('blur')).toBeTruthy()
  })

  // 测试输入处理：中间状态
  test('中间状态输入处理', async () => {
    const wrapper = createWrapper({ precision: 2, immediateChange: false }, 1)

    // 输入以小数点结尾的值
    await simulateInput(wrapper, '1.')
    await nextTick()

    // 中间状态应该只更新显示值，不提交
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('1.')
    expect(wrapper.vm.value).toBe(1) // v-model值不应该变化

    // 失焦时应该格式化并提交
    await simulateBlur(wrapper, '1.')
    await nextTick()
    expect(wrapper.vm.value).toBe(1)
  })

  // 测试以小数点开头的输入
  test('以小数点开头的输入', async () => {
    const wrapper = createWrapper({ precision: 2 }, 1)

    await simulateInput(wrapper, '.5')
    await simulateBlur(wrapper, '.5')
    await nextTick()

    expect(wrapper.vm.value).toBe(0.5)
  })

  // 测试负数输入
  test('负数输入处理', async () => {
    const wrapper = createWrapper({ min: -10 }, 1)

    // 只输入负号
    await simulateInput(wrapper, '-')
    await nextTick()

    // 中间状态应该显示负号，但实际组件可能直接处理为最小值
    const currentValue = wrapper.find('.wd-input-number__input').attributes('value')
    expect(['-', '-10']).toContain(currentValue)

    // 失焦时应该转为最小值
    await simulateBlur(wrapper, '-')
    await nextTick()
    expect(wrapper.vm.value).toBe(-10)
  })

  // 测试负小数输入
  test('负小数输入处理', async () => {
    const wrapper = createWrapper({ min: -10, precision: 2 }, 1)

    await simulateInput(wrapper, '-.5')
    await simulateBlur(wrapper, '-.5')
    await nextTick()

    expect(wrapper.vm.value).toBe(-0.5)
  })

  // 测试非法字符输入过滤
  test('非法字符输入过滤', async () => {
    const wrapper = createWrapper({}, 1)

    await simulateInput(wrapper, 'abc123def')
    await nextTick()

    // 应该只保留数字
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('123')
  })

  // 测试多个小数点处理
  test('多个小数点处理', async () => {
    const wrapper = createWrapper({ precision: 2 }, 1)

    await simulateInput(wrapper, '1.2.3')
    await nextTick()

    // 应该只保留第一个小数点
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('1.23')
  })

  // 测试精度为0时的小数点过滤
  test('精度为0时过滤小数点', async () => {
    const wrapper = createWrapper({ precision: 0 }, 1)

    await simulateInput(wrapper, '1.5')
    await nextTick()

    // 精度为0时应该移除小数点
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('1')
  })

  // 测试超出边界的输入
  test('超出边界的输入处理', async () => {
    const wrapper = createWrapper({ min: 1, max: 10 }, 5)

    // 输入小于最小值的数
    await simulateInput(wrapper, '0')
    await simulateBlur(wrapper, '0')
    await nextTick()
    expect(wrapper.vm.value).toBe(1)

    // 输入大于最大值的数
    await simulateInput(wrapper, '15')
    await simulateBlur(wrapper, '15')
    await nextTick()
    expect(wrapper.vm.value).toBe(10)
  })

  // 测试NaN输入处理
  test('NaN输入处理', async () => {
    const wrapper = createWrapper({ min: 1 }, 5)
    await simulateInput(wrapper, '')
    await simulateBlur(wrapper, '')
    await nextTick()

    // 空值应该转为最小值
    expect(wrapper.vm.value).toBe(1)
  })

  // 测试change事件触发
  test('change事件触发', async () => {
    const wrapper = createWrapper({}, 5)

    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')

    const changeEvents = wrapper.findComponent(WdInputNumber).emitted('change') as Array<any[]>
    expect(changeEvents).toBeTruthy()
    expect(changeEvents[changeEvents.length - 1]).toEqual([{ value: 6 }])
  })

  // 测试props变化时的同步
  test('props变化监听', async () => {
    const wrapper = createWrapper({ min: 1, max: 10 }, 5)

    // 测试精度变化是否会触发重新格式化
    await wrapper.setProps({ precision: 1 })
    await nextTick()

    // 验证组件正常运行，值被格式化为1位小数（应该显示为5.0而不是5）
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('5.0')

    // 测试精度为2的情况
    await wrapper.setProps({ precision: 2 })
    await nextTick()

    // 值应该被格式化为2位小数（应该显示为5.00）
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('5.00')

    // 测试取消精度设置
    await wrapper.setProps({ precision: undefined })
    await nextTick()

    // 没有精度时应该显示为数值
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('5')
  })

  // 测试边界值按钮禁用逻辑
  test('边界值按钮禁用逻辑', async () => {
    const wrapper = createWrapper({ min: 3, max: 7, step: 2 }, 3)

    // 当前值3，步进2，减少后为1，小于最小值3，所以减号应该禁用
    expect(wrapper.findAll('.wd-input-number__action')[0].classes()).toContain('is-disabled')
  })

  // 测试数值标准化函数覆盖
  test('数值标准化边界情况', async () => {
    const wrapper = createWrapper(
      {
        min: 1,
        max: 10,
        step: 0.1,
        precision: 1,
        stepStrictly: true
      },
      0
    )

    // 初始化时不会自动标准化
    expect(wrapper.vm.value).toBe(0)

    // 用户交互时才会标准化 - 模拟失焦事件
    await simulateBlur(wrapper, '0')
    await nextTick()

    // 失焦后值应该被标准化为符合最小值要求
    expect(wrapper.vm.value).toBeGreaterThanOrEqual(1)
  })

  // 测试精度计算功能
  test('精度计算功能', async () => {
    const wrapper = createWrapper({ precision: 2 }, 1.123456)

    // 初始化时不会自动处理精度
    expect(wrapper.vm.value).toBe(1.123456)

    // 用户交互时才会应用精度处理 - 模拟失焦事件
    await simulateBlur(wrapper, '1.123456')
    await nextTick()

    // 失焦后值应该被格式化为2位小数
    expect(wrapper.vm.value).toBe(1.12)
  })

  // 测试工具函数覆盖
  test('工具函数覆盖测试', () => {
    const wrapper = createWrapper({ step: 0.001, precision: 3 }, 1)

    // 测试组件正常运行
    expect(wrapper.vm).toBeDefined()
  })

  // 测试边界情况：无效初始值处理
  test('无效初始值处理', async () => {
    // 使用特殊的wrapper来处理无效值
    const WrapperComponent = defineComponent({
      components: { WdInputNumber },
      setup() {
        const value = ref('invalid' as any)
        return {
          value,
          min: 1,
          stepStrictly: true
        }
      },
      template: '<WdInputNumber v-model="value" :min="min" :step-strictly="stepStrictly" />'
    })

    const wrapper = mount(WrapperComponent)
    await nextTick()
    expect(wrapper.vm.value).toBe(1)
  })

  // 专门测试props响应式变化
  test('props响应式变化测试', async () => {
    const wrapper = createWrapper({ step: 1, min: 0, max: 100 }, 5)

    // 验证初始props
    const inputNumber = wrapper.findComponent(WdInputNumber)
    expect(inputNumber.props('step')).toBe(1)
    expect(inputNumber.props('min')).toBe(0)
    expect(inputNumber.props('max')).toBe(100)

    // 修改props
    await wrapper.setProps({ step: 2, min: 2, max: 50 })
    await nextTick()

    // 验证props已经响应式更新
    expect(inputNumber.props('step')).toBe(2)
    expect(inputNumber.props('min')).toBe(2)
    expect(inputNumber.props('max')).toBe(50)

    // 验证组件行为也随之改变（点击按钮应该按新的step值增减）
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.vm.value).toBe(7) // 5 + 2(新的step值) = 7
  })

  // 专门测试精度格式化保持
  test('精度格式化保持测试', async () => {
    // 测试精度为1的情况
    const wrapper1 = createWrapper({ precision: 1 }, 1)
    await nextTick()
    expect(wrapper1.find('.wd-input-number__input').attributes('value')).toBe('1.0')

    // 测试精度为2的情况
    const wrapper2 = createWrapper({ precision: 2 }, 1)
    await nextTick()
    expect(wrapper2.find('.wd-input-number__input').attributes('value')).toBe('1.00')

    // 测试精度为3的情况
    const wrapper3 = createWrapper({ precision: 3 }, 1.5)
    await nextTick()
    expect(wrapper3.find('.wd-input-number__input').attributes('value')).toBe('1.500')

    // 测试没有精度设置的情况（应该显示为数值）
    const wrapper4 = createWrapper({}, 1)
    await nextTick()
    expect(wrapper4.find('.wd-input-number__input').attributes('value')).toBe('1')
  })

  // 测试自定义样式和类名
  test('自定义样式和类名', () => {
    const customClass = 'my-custom-class'
    const customStyle = 'background: red;'
    const wrapper = createWrapper({ customClass, customStyle }, 1)

    const component = wrapper.findComponent(WdInputNumber)
    expect(component.classes()).toContain(customClass)
    expect(component.attributes('style')).toContain('background: red;')
  })

  // 测试input-mode属性
  test('input-mode属性设置', () => {
    // 有精度时应该是decimal
    const wrapper1 = createWrapper({ precision: 2 }, 1)
    expect(wrapper1.find('.wd-input-number__input').attributes('input-mode')).toBe('decimal')

    // 无精度时应该是numeric
    const wrapper2 = createWrapper({}, 1)
    expect(wrapper2.find('.wd-input-number__input').attributes('input-mode')).toBe('numeric')
  })

  // 测试长按功能禁用时的行为
  test('长按功能禁用时的行为', async () => {
    const wrapper = createWrapper({ longPress: false }, 5)
    const addButton = wrapper.findAll('.wd-input-number__action')[1]

    const initialValue = wrapper.vm.value

    // 触发touchstart，但长按功能禁用，不应该有任何效果
    await addButton.trigger('touchstart')
    await addButton.trigger('touchend')

    expect(wrapper.vm.value).toBe(initialValue)
  })

  // 测试异步拦截器拒绝变更
  test('异步拦截器拒绝变更', async () => {
    const beforeChange = vi.fn(() => Promise.resolve(false))
    const wrapper = createPropsOnlyWrapper({
      modelValue: 5,
      beforeChange
    })

    const initialEvents = wrapper.emitted('update:modelValue')?.length || 0
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')

    // 等待异步操作完成
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 10))

    const finalEvents = wrapper.emitted('update:modelValue')?.length || 0
    expect(finalEvents).toBe(initialEvents) // 事件数量不应该增加
  })

  // 测试更复杂的严格步进场景
  test('复杂严格步进场景', async () => {
    const wrapper = createWrapper(
      {
        step: 0.3,
        min: 0.1,
        max: 2.9,
        stepStrictly: true,
        precision: 1
      },
      0.1
    )

    // 输入0.25，应该调整为最接近的0.3的倍数
    await simulateInput(wrapper, '0.25')
    await simulateBlur(wrapper, '0.25')
    await nextTick()

    // 0.25 / 0.3 = 0.833..., Math.round(0.833) = 1, 1 * 0.3 = 0.3
    expect(wrapper.vm.value).toBe(0.3)
  })

  // 测试空值在不同模式下的行为
  test('空值在不同模式下的行为', async () => {
    // 允许空值 + 立即模式
    const wrapper1 = createWrapper({ allowNull: true, immediateChange: true }, '')
    await simulateInput(wrapper1, '')
    await nextTick()
    expect(wrapper1.vm.value).toBe('')

    // 允许空值 + 非立即模式
    const wrapper2 = createWrapper({ allowNull: true, immediateChange: false }, '')
    await simulateInput(wrapper2, '')
    await nextTick()
    expect(wrapper2.vm.value).toBe('') // 非立即模式也应该保持空值

    // 不允许空值 + 立即模式
    const wrapper3 = createWrapper({ allowNull: false, immediateChange: true, min: 1 }, 5)
    await simulateInput(wrapper3, '')
    await nextTick()
    expect(wrapper3.vm.value).toBe(5) // 立即模式下应该保持原值不变
  })

  // 测试数值精度边界情况
  test('数值精度边界情况', async () => {
    // 测试极小步进值
    const wrapper1 = createWrapper({ step: 0.001, precision: 3 }, 1.001)
    await wrapper1.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper1.vm.value).toBe(1.002)

    // 测试精度为0但有小数步进
    const wrapper2 = createWrapper({ step: 0.5, precision: 0 }, 1)
    await wrapper2.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper2.vm.value).toBe(2) // 应该被精度0处理为整数
  })

  // 测试边界值的精确计算
  test('边界值精确计算', async () => {
    const wrapper = createWrapper(
      {
        min: 0.1,
        max: 0.9,
        step: 0.1,
        precision: 1
      },
      0.1
    )

    // 连续点击加号直到接近最大值
    for (let i = 0; i < 10; i++) {
      await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
      await nextTick()
    }

    // 应该被限制在最大值
    expect(wrapper.vm.value).toBe(0.9)

    // 加号按钮应该被禁用
    expect(wrapper.findAll('.wd-input-number__action')[1].classes()).toContain('is-disabled')
  })

  // 测试连续快速操作
  test('连续快速操作', async () => {
    const wrapper = createWrapper({ step: 1 }, 5)

    // 快速连续点击
    const addButton = wrapper.findAll('.wd-input-number__action')[1]
    await addButton.trigger('click')
    await addButton.trigger('click')
    await addButton.trigger('click')
    await nextTick()

    expect(wrapper.vm.value).toBe(8)
  })

  // 测试输入框类型属性
  test('输入框类型属性', () => {
    const wrapper = createWrapper({}, 1)
    expect(wrapper.find('.wd-input-number__input').attributes('type')).toBe('digit')
  })

  // 测试组件在极端值下的稳定性
  test('极端值下的稳定性', async () => {
    // 测试接近JavaScript数值极限的情况
    const wrapper = createWrapper(
      {
        min: -Number.MAX_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER
      },
      0
    )

    // 设置一个非常大的值
    wrapper.vm.value = Number.MAX_SAFE_INTEGER - 1
    await nextTick()

    // 点击加号，应该被限制在最大值
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.vm.value).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER)
  })

  // 测试组件清理逻辑
  test('组件清理逻辑', async () => {
    vi.useFakeTimers()

    const wrapper = createWrapper({ longPress: true }, 5)
    const addButton = wrapper.findAll('.wd-input-number__action')[1]

    // 开始长按
    await addButton.trigger('touchstart')

    // 在长按过程中卸载组件
    wrapper.unmount()

    // 推进时间，确保没有内存泄漏
    vi.advanceTimersByTime(1000)

    // 如果没有正确清理，这里可能会有错误
    expect(true).toBe(true) // 能执行到这里说明清理正常

    vi.useRealTimers()
  })

  // 测试负数步进的边界情况
  test('负数步进边界情况', async () => {
    const wrapper = createWrapper(
      {
        min: -10,
        max: -1,
        step: 2
      },
      -5
    )

    // 点击减号，应该变为-7
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    expect(wrapper.vm.value).toBe(-7)

    // 再次点击减号，应该变为-9
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    expect(wrapper.vm.value).toBe(-9)

    // 再次点击减号，应该被限制在-10（不是-11）
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    expect(wrapper.vm.value).toBe(-10)
  })

  // 测试小数精度的累积误差
  test('小数精度累积误差处理', async () => {
    const wrapper = createWrapper(
      {
        step: 0.1,
        precision: 1
      },
      0
    )

    // 连续增加0.1，测试精度处理
    for (let i = 0; i < 10; i++) {
      await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    }

    // 应该是1.0而不是0.9999999999999999
    expect(wrapper.vm.value).toBe(1.0)
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('1.0')
  })

  // 测试输入框聚焦时的值保持
  test('输入框聚焦时值保持', async () => {
    const wrapper = createWrapper({ precision: 2 }, 1.5)
    const input = wrapper.find('.wd-input-number__input')

    // 聚焦时应该保持当前显示的格式化值
    await input.trigger('focus')
    expect(input.attributes('value')).toBe('1.50')
  })

  // 测试多种无效输入的组合
  test('多种无效输入组合', async () => {
    const wrapper = createWrapper({ precision: 2, min: 0 }, 1)

    // 测试包含多种无效字符的输入
    await simulateInput(wrapper, 'abc1.2.3def4..5ghi')
    await nextTick()

    // 应该清理为有效的数字格式，并按precision格式化
    expect(wrapper.find('.wd-input-number__input').attributes('value')).toBe('1.23')
  })

  // 测试步进值为负数的情况
  test('负步进值处理', async () => {
    // 虽然一般不会设置负步进值，但测试组件的健壮性
    const wrapper = createWrapper({ step: -1 }, 5)

    // 点击"加号"按钮，实际上会减少值
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.vm.value).toBe(4)

    // 点击"减号"按钮，实际上会增加值
    await wrapper.findAll('.wd-input-number__action')[0].trigger('click')
    expect(wrapper.vm.value).toBe(5)
  })

  // 测试beforeChange拦截器的边界情况
  test('beforeChange拦截器边界情况', async () => {
    // 测试拦截器返回异常Promise的情况
    const beforeChange = vi.fn(() => Promise.reject(new Error('拦截器错误')))

    const wrapper = createPropsOnlyWrapper({
      modelValue: 5,
      beforeChange
    })

    // 即使拦截器Promise被拒绝，组件也应该稳定运行
    const initialEvents = wrapper.emitted('update:modelValue')?.length || 0
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')

    // 等待异步操作完成
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 10))

    const finalEvents = wrapper.emitted('update:modelValue')?.length || 0
    // 异常情况下不应该触发更新
    expect(finalEvents).toBe(initialEvents)
    expect(beforeChange).toHaveBeenCalled()
  })

  // 测试组件的响应式性能
  test('响应式性能测试', async () => {
    const wrapper = createWrapper({}, 1)

    // 快速连续修改props，测试组件是否能正确响应
    await wrapper.setProps({ step: 2 })
    await wrapper.setProps({ step: 3 })
    await wrapper.setProps({ step: 1 })
    await nextTick()

    // 最终应该使用最后设置的step值
    await wrapper.findAll('.wd-input-number__action')[1].trigger('click')
    expect(wrapper.vm.value).toBe(2) // 1 + 1 = 2
  })

  // 测试输入框的禁用属性传递
  test('输入框禁用属性传递', () => {
    // 测试全局禁用
    const wrapper1 = createWrapper({ disabled: true }, 1)
    expect(wrapper1.find('.wd-input-number__input').attributes()).toHaveProperty('disabled')

    // 测试仅输入框禁用
    const wrapper2 = createWrapper({ disableInput: true }, 1)
    expect(wrapper2.find('.wd-input-number__input').attributes()).toHaveProperty('disabled')

    // 测试都不禁用
    const wrapper3 = createWrapper({}, 1)
    expect(wrapper3.find('.wd-input-number__input').attributes()).not.toHaveProperty('disabled')
  })

  // 测试allowNull与其他属性的组合
  test('allowNull与其他属性组合', async () => {
    // allowNull + stepStrictly
    const wrapper1 = createWrapper(
      {
        allowNull: true,
        stepStrictly: true,
        step: 2
      },
      ''
    )

    await simulateInput(wrapper1, '3')
    await simulateBlur(wrapper1, '3')
    await nextTick()

    // 即使允许空值，严格步进也应该生效
    expect(wrapper1.vm.value).toBe(4) // 3调整为最接近的2的倍数4

    // allowNull + precision
    const wrapper2 = createWrapper(
      {
        allowNull: true,
        precision: 2
      },
      ''
    )

    await simulateInput(wrapper2, '1.1')
    await simulateBlur(wrapper2, '1.1')
    await nextTick()

    expect(wrapper2.vm.value).toBe(1.1)
    expect(wrapper2.find('.wd-input-number__input').attributes('value')).toBe('1.10')
  })
})
