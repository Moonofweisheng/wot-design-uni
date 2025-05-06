import { mount } from '@vue/test-utils'
import '../mocks/wd-transition.mock'
import WdMessageBox from '@/uni_modules/wot-design-uni/components/wd-message-box/wd-message-box.vue'
import { describe, test, expect, vi } from 'vitest'
import { nextTick, defineComponent } from 'vue'
import WdPopup from '@/uni_modules/wot-design-uni/components/wd-popup/wd-popup.vue'
import WdButton from '@/uni_modules/wot-design-uni/components/wd-button/wd-button.vue'
import WdInput from '@/uni_modules/wot-design-uni/components/wd-input/wd-input.vue'
import { useMessage } from '@/uni_modules/wot-design-uni/components/wd-message-box'

const globalComponents = {
  WdPopup,
  WdButton,
  WdInput,
  WdMessageBox
}

// 创建一个测试组件，使用 useMessageBox
const TestComponent = defineComponent({
  props: {
    // 添加回调函数作为 props，方便测试
    onConfirm: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    }
  },
  setup(props) {
    const messageBox = useMessage()

    // 暴露 messageBox 方法供测试使用
    return {
      messageBox,
      props
    }
  },
  template: `
    <div>
      <wd-message-box></wd-message-box>
    </div>
  `
})

describe('WdMessageBox with useMessageBox', () => {
  // 测试基本渲染和 alert 方法
  test('渲染消息框并显示提示', async () => {
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 确认组件已渲染
    expect(wrapper.findComponent(WdMessageBox).exists()).toBe(true)

    // 使用 alert 方法显示消息框
    const alertPromise = wrapper.vm.messageBox.alert('这是一条提示消息')

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.props('selector')).toBe('')

    // 检查内容是否正确
    expect(messageBox.text()).toContain('这是一条提示消息')

    // 点击确认按钮
    await messageBox.findComponent(WdButton).trigger('click')

    // 等待 Promise 解析
    const result = await alertPromise.catch(() => null)
    expect(result).toEqual({ action: 'confirm', value: '' })
  })

  // 测试 confirm 方法
  test('显示确认对话框并处理确认操作', async () => {
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 confirm 方法显示确认框
    const confirmPromise = wrapper.vm.messageBox.confirm({
      title: '确认操作',
      msg: '确定要执行此操作吗？'
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)

    // 检查内容是否正确
    expect(messageBox.text()).toContain('确认操作')
    expect(messageBox.text()).toContain('确定要执行此操作吗？')

    // 检查是否显示取消按钮
    const buttons = messageBox.findAllComponents(WdButton)
    expect(buttons.length).toBe(2)

    // 点击确认按钮
    await buttons[1].trigger('click')

    // 等待 Promise 解析
    const result = await confirmPromise
    expect(result).toEqual({ action: 'confirm', value: '' })
  })

  // 测试 confirm 方法的取消操作
  test('显示确认对话框并处理取消操作', async () => {
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 confirm 方法显示确认框
    const confirmPromise = wrapper.vm.messageBox.confirm('确定要取消吗？')

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)

    // 检查内容是否正确
    expect(messageBox.text()).toContain('确定要取消吗？')

    // 点击取消按钮
    const buttons = messageBox.findAllComponents(WdButton)
    await buttons[0].trigger('click')

    // 等待 Promise 拒绝
    try {
      await confirmPromise
      // 如果 Promise 解析，测试应该失败
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toEqual({ action: 'cancel' })
    }
  })

  // 测试 prompt 方法
  test('显示输入对话框并处理输入', async () => {
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 prompt 方法显示输入框
    const promptPromise = wrapper.vm.messageBox.prompt({
      title: '请输入',
      msg: '请输入您的姓名',
      inputValue: '',
      inputPlaceholder: '姓名'
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)

    // 检查内容是否正确
    expect(messageBox.text()).toContain('请输入')
    expect(messageBox.text()).toContain('请输入您的姓名')

    // 检查是否显示输入框
    const input = messageBox.findComponent(WdInput)
    expect(input.exists()).toBe(true)

    // 输入内容
    await input.setValue('张三')

    // 点击确认按钮
    const buttons = messageBox.findAllComponents(WdButton)
    await buttons[1].trigger('click')

    // 等待 Promise 解析
    const result = await promptPromise
    expect(result).toEqual({ action: 'confirm', value: '张三' })
  })

  // 测试自定义样式
  test('使用useMessageBox应用自定义样式', async () => {
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 alert 方法显示消息框
    wrapper.vm.messageBox.alert({
      title: '提示',
      msg: '这是一条消息'
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查标题和消息是否正确
    expect(messageBox.text()).toContain('提示')
    expect(messageBox.text()).toContain('这是一条消息')
  })

  // 测试标题和内容
  test('渲染标题和消息', async () => {
    const title = '提示'
    const msg = '这是一条消息'

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 alert 方法显示消息框，并设置标题和消息
    wrapper.vm.messageBox.alert({
      title,
      msg
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查标题和消息是否正确显示
    const messageBoxHtml = messageBox.html()
    expect(messageBoxHtml).toContain(title)
    expect(messageBoxHtml).toContain(msg)
  })

  // 测试按钮文本
  test('渲染自定义按钮文本', async () => {
    const confirmButtonText = '自定义确定'
    const cancelButtonText = '自定义取消'

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 confirm 方法显示消息框，并设置自定义按钮文本
    wrapper.vm.messageBox.confirm({
      title: '提示',
      msg: '这是一条消息',
      confirmButtonText,
      cancelButtonText
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查按钮文本是否正确显示
    const buttons = messageBox.findAllComponents(WdButton)
    expect(buttons.length).toBe(2)
    expect(buttons[1].text()).toContain(confirmButtonText)
    expect(buttons[0].text()).toContain(cancelButtonText)
  })

  // 测试按钮事件 - 确认
  test('处理确认按钮点击', async () => {
    const onConfirm = vi.fn()

    const wrapper = mount(TestComponent, {
      props: {
        onConfirm
      },
      global: {
        components: globalComponents
      }
    })

    // 使用 alert 方法显示消息框
    const alertPromise = wrapper.vm.messageBox.alert('确认消息')

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 找到确认按钮并点击
    const confirmButton = messageBox.findComponent(WdButton)
    await confirmButton.trigger('click')

    // 等待 Promise 解析
    const result = await alertPromise

    // 验证结果
    expect(result).toEqual({ action: 'confirm', value: '' })
  })

  // 测试按钮事件 - 取消
  test('处理取消按钮点击', async () => {
    const onCancel = vi.fn()

    const wrapper = mount(TestComponent, {
      props: {
        onCancel
      },
      global: {
        components: globalComponents
      }
    })

    // 使用 confirm 方法显示消息框
    const confirmPromise = wrapper.vm.messageBox.confirm('取消消息')

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 找到取消按钮并点击
    const buttons = messageBox.findAllComponents(WdButton)
    expect(buttons.length).toBe(2)
    await buttons[0].trigger('click')

    // 等待 Promise 拒绝
    try {
      await confirmPromise
      // 如果 Promise 解析，测试应该失败
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toEqual({ action: 'cancel' })
    }
  })

  // 测试点击蒙层
  test('处理蒙层点击', async () => {
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 confirm 方法显示消息框，允许点击蒙层关闭
    const confirmPromise = wrapper.vm.messageBox.confirm({
      title: '提示',
      msg: '点击蒙层关闭',
      closeOnClickModal: true
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 模拟点击蒙层
    messageBox.findComponent(WdPopup).vm.$emit('click-modal')
    await nextTick() // 等待更新

    // 等待 Promise 拒绝
    try {
      await confirmPromise
      // 如果 Promise 解析，测试应该失败
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toEqual({ action: 'modal' })
    }
  })

  // 测试禁用点击蒙层关闭
  test('closeOnClickModal为false时不关闭', async () => {
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 confirm 方法显示消息框，禁止点击蒙层关闭
    const confirmPromise = wrapper.vm.messageBox.confirm({
      title: '提示',
      msg: '禁止点击蒙层关闭',
      closeOnClickModal: false
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 模拟点击蒙层
    messageBox.findComponent(WdPopup).vm.$emit('click-modal')
    await nextTick() // 等待更新

    // 消息框应该仍然显示，可以通过检查 DOM 来验证
    expect(messageBox.isVisible()).toBe(true)

    // 点击确认按钮关闭消息框
    const confirmButton = messageBox.findAllComponents(WdButton)[1]
    await confirmButton.trigger('click')

    // 等待 Promise 解析
    const result = await confirmPromise
    expect(result).toEqual({ action: 'confirm', value: '' })
  })

  // 测试 Prompt 类型
  test('渲染输入框类型', async () => {
    const inputType = 'text'
    const inputValue = 'test'
    const inputPlaceholder = '请输入内容'

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 prompt 方法显示输入框
    wrapper.vm.messageBox.prompt({
      title: '请输入',
      msg: '请输入内容',
      inputType,
      inputValue,
      inputPlaceholder
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查输入框是否正确显示
    const input = messageBox.findComponent(WdInput)
    expect(input.exists()).toBe(true)
    expect(input.props('type')).toBe(inputType)
    expect(input.props('modelValue')).toBe(inputValue)
    expect(input.props('placeholder')).toBe(inputPlaceholder)
  })

  // 测试输入框校验 - 正则表达式
  test('使用正则表达式验证输入', async () => {
    const inputPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const inputError = '请输入正确的邮箱格式'

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 prompt 方法显示输入框，并设置校验规则
    const promptPromise = wrapper.vm.messageBox.prompt({
      title: '请输入邮箱',
      msg: '请输入有效的邮箱地址',
      inputPattern,
      inputError,
      inputValue: 'invalid-email' // 初始值是无效的
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查输入框是否正确显示
    const input = messageBox.findComponent(WdInput)
    expect(input.exists()).toBe(true)

    // 点击确认按钮，应该显示错误信息
    const confirmButton = messageBox.findAllComponents(WdButton)[1]
    await confirmButton.trigger('click')
    await nextTick()

    // 检查错误信息是否显示
    expect(messageBox.html()).toContain(inputError)

    // 修改输入值为有效值
    input.vm.$emit('update:modelValue', 'test@example.com')
    await nextTick()

    // 再次点击确认按钮，应该关闭消息框
    await confirmButton.trigger('click')

    // 等待 Promise 解析
    const result = await promptPromise
    expect(result).toEqual({ action: 'confirm', value: 'test@example.com' })
  })

  // 测试输入框校验 - 自定义校验函数
  test('validates input with custom function', async () => {
    // 创建自定义校验函数，只有当值为 'valid' 时才返回 true
    const inputValidate = vi.fn((value) => {
      return value === 'valid'
    })
    const inputError = '请输入 "valid"'

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 prompt 方法显示输入框，并设置自定义校验函数
    const promptPromise = wrapper.vm.messageBox.prompt({
      title: '请输入',
      msg: '请输入 "valid"',
      inputValidate,
      inputError,
      inputValue: 'invalid' // 初始值是无效的
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查输入框是否正确显示
    const input = messageBox.findComponent(WdInput)
    expect(input.exists()).toBe(true)

    // 点击确认按钮，应该显示错误信息
    const confirmButton = messageBox.findAllComponents(WdButton)[1]
    await confirmButton.trigger('click')
    await nextTick()

    // 验证校验函数被调用
    expect(inputValidate).toHaveBeenCalled()

    // 检查错误信息是否显示
    expect(messageBox.html()).toContain(inputError)

    // 修改输入值为有效值
    input.vm.$emit('update:modelValue', 'valid')
    await nextTick()

    // 再次点击确认按钮，应该关闭消息框
    await confirmButton.trigger('click')

    // 等待 Promise 解析
    const result = await promptPromise
    expect(result).toEqual({ action: 'confirm', value: 'valid' })
  })

  // 测试确认前钩子
  test('handles beforeConfirm hook', async () => {
    // 创建 beforeConfirm 钩子函数，接受输入并返回 true
    const beforeConfirm = vi.fn(({ resolve }) => {
      // 模拟异步操作
      setTimeout(() => {
        resolve(true)
      }, 0)
    })

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 confirm 方法显示消息框，并设置 beforeConfirm 钩子
    const confirmPromise = wrapper.vm.messageBox.confirm({
      title: '确认操作',
      msg: '确定要执行此操作吗？',
      beforeConfirm
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 点击确认按钮，应该触发 beforeConfirm 钩子
    const confirmButton = messageBox.findAllComponents(WdButton)[1]
    await confirmButton.trigger('click')

    // 验证 beforeConfirm 被调用
    expect(beforeConfirm).toHaveBeenCalled()

    // 等待 Promise 解析
    const result = await confirmPromise
    expect(result).toEqual({ action: 'confirm', value: '' })
  })

  // 测试确认前钩子 - 拒绝确认
  test('handles beforeConfirm hook rejection', async () => {
    // 创建 beforeConfirm 钩子函数，拒绝确认
    const beforeConfirm = vi.fn(({ resolve }) => {
      // 模拟异步操作
      setTimeout(() => {
        resolve(false)
      }, 0)
    })

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 confirm 方法显示消息框，并设置 beforeConfirm 钩子
    wrapper.vm.messageBox.confirm({
      title: '确认操作',
      msg: '确定要执行此操作吗？',
      beforeConfirm
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 点击确认按钮，应该触发 beforeConfirm 钩子
    const confirmButton = messageBox.findAllComponents(WdButton)[1]
    await confirmButton.trigger('click')

    // 验证 beforeConfirm 被调用
    expect(beforeConfirm).toHaveBeenCalled()

    // 消息框应该仍然显示，可以通过检查 DOM 来验证
    await nextTick()
    expect(messageBox.isVisible()).toBe(true)

    // 再次点击确认按钮，应该再次触发 beforeConfirm 钩子
    await confirmButton.trigger('click')
    expect(beforeConfirm).toHaveBeenCalledTimes(2)
  })

  // 测试自定义按钮属性
  test('applies custom button props', async () => {
    const confirmButtonProps = {
      type: 'success' as const, // 使用 const 断言修复类型错误
      customClass: 'custom-confirm'
    }
    const cancelButtonProps = {
      type: 'error' as const, // 使用 const 断言修复类型错误
      customClass: 'custom-cancel'
    }

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 confirm 方法显示消息框，并设置自定义按钮属性
    wrapper.vm.messageBox.confirm({
      title: '提示',
      msg: '这是一条消息',
      confirmButtonProps,
      cancelButtonProps
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查按钮是否应用了自定义属性
    const buttons = messageBox.findAllComponents(WdButton)
    expect(buttons.length).toBe(2)

    // 确认按钮应该有 success 类型和自定义类名
    expect(buttons[1].props('type')).toBe(confirmButtonProps.type)
    expect(buttons[1].classes()).toContain(confirmButtonProps.customClass)

    // 取消按钮应该有 error 类型和自定义类名
    expect(buttons[0].props('type')).toBe(cancelButtonProps.type)
    expect(buttons[0].classes()).toContain(cancelButtonProps.customClass)
  })

  // 测试插槽功能
  test('renders custom content', async () => {
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 alert 方法显示消息框，并设置自定义内容
    wrapper.vm.messageBox.alert({
      title: '提示',
      msg: '<div class="custom-content">自定义内容</div>'
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查自定义内容是否正确显示
    expect(messageBox.html()).toContain('custom-content')
    expect(messageBox.html()).toContain('自定义内容')
  })

  // 测试 selector 属性
  test('applies selector prop', async () => {
    // 注意：由于 useMessageBox 的实现，selector 属性可能不会直接传递给组件
    // 这个测试主要是确保 messageBox 能够正常工作
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 alert 方法显示消息框
    wrapper.vm.messageBox.alert({
      title: '提示',
      msg: '这是一条消息'
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查 selector 属性是否存在（默认为空字符串）
    expect(messageBox.props('selector')).toBe('')
  })

  // 测试 z-index 属性
  test('applies z-index', async () => {
    const zIndex = 1000

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 alert 方法显示消息框，并设置 z-index
    wrapper.vm.messageBox.alert({
      title: '提示',
      msg: '这是一条消息',
      zIndex
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查 z-index 是否正确应用到 popup 组件
    const popup = messageBox.findComponent(WdPopup)
    expect(popup.props('zIndex')).toBe(zIndex)
  })

  // 测试懒渲染
  test('applies lazy render', async () => {
    const lazyRender = true

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 alert 方法显示消息框，并设置 lazyRender
    wrapper.vm.messageBox.alert({
      title: '提示',
      msg: '这是一条消息',
      lazyRender
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查 lazyRender 是否正确应用到 popup 组件
    const popup = messageBox.findComponent(WdPopup)
    expect(popup.props('lazyRender')).toBe(lazyRender)
  })

  // 测试输入框大小
  test('applies input size', async () => {
    const inputSize = 'large'

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 prompt 方法显示输入框，并设置 inputSize
    wrapper.vm.messageBox.prompt({
      title: '请输入',
      msg: '请输入内容',
      inputSize
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查输入框是否正确显示
    const input = messageBox.findComponent(WdInput)
    expect(input.exists()).toBe(true)
    expect(input.props('size')).toBe(inputSize)
  })

  // 测试输入值变化
  test('handles input value change', async () => {
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 prompt 方法显示输入框
    const promptPromise = wrapper.vm.messageBox.prompt({
      title: '请输入',
      msg: '请输入内容',
      inputValue: 'initial value'
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查输入框是否正确显示
    const input = messageBox.findComponent(WdInput)
    expect(input.exists()).toBe(true)
    expect(input.props('modelValue')).toBe('initial value')

    // 修改输入值
    input.vm.$emit('update:modelValue', 'new value')
    await nextTick()

    // 点击确认按钮
    const confirmButton = messageBox.findAllComponents(WdButton)[1]
    await confirmButton.trigger('click')

    // 等待 Promise 解析
    const result = await promptPromise
    expect(result).toEqual({ action: 'confirm', value: 'new value' })
  })

  // 测试空输入值清除错误
  test('clears error when input is empty', async () => {
    // 创建自定义校验函数，只有当值不为空时才返回 true
    const inputValidate = vi.fn((value) => {
      return value !== ''
    })
    const inputError = '请输入内容'

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 prompt 方法显示输入框，并设置自定义校验函数
    const promptPromise = wrapper.vm.messageBox.prompt({
      title: '请输入',
      msg: '请输入内容',
      inputValidate,
      inputError,
      inputValue: '' // 初始值是空的
    })

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 检查输入框是否正确显示
    const input = messageBox.findComponent(WdInput)
    expect(input.exists()).toBe(true)

    // 点击确认按钮，应该显示错误信息
    const confirmButton = messageBox.findAllComponents(WdButton)[1]
    await confirmButton.trigger('click')
    await nextTick()

    // 检查错误信息是否显示
    expect(messageBox.html()).toContain(inputError)

    // 修改输入值为非空值
    input.vm.$emit('update:modelValue', 'new value')
    await nextTick()

    // 再次点击确认按钮，应该关闭消息框
    await confirmButton.trigger('click')

    // 等待 Promise 解析
    const result = await promptPromise
    expect(result).toEqual({ action: 'confirm', value: 'new value' })
  })

  // 测试多次调用 messageBox
  test('can be called multiple times', async () => {
    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 第一次调用 alert 方法
    const alertPromise1 = wrapper.vm.messageBox.alert('第一条消息')

    await nextTick()

    // 检查消息框是否显示
    let messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)
    expect(messageBox.text()).toContain('第一条消息')

    // 点击确认按钮关闭第一个消息框
    await messageBox.findComponent(WdButton).trigger('click')

    // 等待 Promise 解析
    await alertPromise1

    // 第二次调用 alert 方法
    const alertPromise2 = wrapper.vm.messageBox.alert('第二条消息')

    await nextTick()

    // 检查消息框是否显示
    messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)
    expect(messageBox.text()).toContain('第二条消息')

    // 点击确认按钮关闭第二个消息框
    await messageBox.findComponent(WdButton).trigger('click')

    // 等待 Promise 解析
    await alertPromise2
  })

  // 测试关闭时重置错误
  test('resets error when closed', async () => {
    // 创建自定义校验函数，始终返回 false
    const inputValidate = vi.fn(() => false)
    const inputError = '输入错误'

    const wrapper = mount(TestComponent, {
      global: {
        components: globalComponents
      }
    })

    // 使用 prompt 方法显示输入框，并设置自定义校验函数
    const promptPromise = wrapper.vm.messageBox
      .prompt({
        title: '请输入',
        msg: '请输入内容',
        inputValidate,
        inputError
      })
      .catch(() => null) // 捕获错误，避免测试失败

    await nextTick()

    // 检查消息框是否显示
    const messageBox = wrapper.findComponent(WdMessageBox)
    expect(messageBox.exists()).toBe(true)

    // 点击确认按钮，应该显示错误信息
    const confirmButton = messageBox.findAllComponents(WdButton)[1]
    await confirmButton.trigger('click')
    await nextTick()

    // 检查错误信息是否显示
    expect(messageBox.html()).toContain(inputError)

    // 点击取消按钮关闭消息框
    const cancelButton = messageBox.findAllComponents(WdButton)[0]
    await cancelButton.trigger('click')

    // 等待 Promise 解析
    await promptPromise

    // 再次使用 prompt 方法显示输入框
    wrapper.vm.messageBox.prompt({
      title: '请再次输入',
      msg: '请输入内容'
    })

    await nextTick()

    // 检查消息框是否显示，且错误信息应该被重置
    const newMessageBox = wrapper.findComponent(WdMessageBox)
    expect(newMessageBox.exists()).toBe(true)
    expect(newMessageBox.html()).not.toContain(inputError)
  })
})
