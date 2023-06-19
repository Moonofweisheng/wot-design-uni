export type MessageType = 'alert' | 'confirm' | 'prompt'

export type MessageOptions = {
  /**
   * 标题
   */
  title?: string
  /**
   * 是否展示取消按钮
   */
  showCancelButton?: boolean

  show?: boolean
  /**
   * 是否支持点击蒙层进行关闭，点击蒙层回调传入的action为'modal'
   */
  closeOnClickModal?: boolean
  /**
   * 确定按钮文案
   */
  confirmButtonText?: string
  /**
   * 取消按钮文案
   */
  cancelButtonText?: string
  /**
   * 消息文案
   */
  msg?: string
  /**
   * 弹框类型
   */
  type?: MessageType
  /**
   * 当type为prompt时，输入框类型
   */
  inputType?: string
  /**
   * 当type为prompt时，输入框初始值
   */
  inputValue?: string | number
  /**
   * 当type为prompt时，输入框placeholder
   */
  inputPlaceholder?: string
  /**
   * 当type为prompt时，输入框正则校验，点击确定按钮时进行校验
   */
  inputPattern?: RegExp
  /**
   * 当type为prompt时，输入框校验函数，点击确定按钮时进行校验
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  inputValidate?: Function | null
  /**
   * 当type为prompt时，输入框检验不通过时的错误提示文案
   */
  inputError?: string
  showErr?: boolean
  /**
   * 弹窗层级
   */
  zIndex?: number
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   */
  lazyRender?: boolean
}

export type ActionType = 'confirm' | 'cancel' | 'modal'

export interface MessageResult {
  action: ActionType
  value?: string | number
}

export interface Message {
  // 打开Message
  show(toastOptions: MessageOptions | string): Promise<MessageResult>
  // 打开Alert 弹框
  alert(toastOptions: MessageOptions | string): Promise<MessageResult>
  // 打开Confirm 弹框
  confirm(toastOptions: MessageOptions | string): Promise<MessageResult>
  // 打开Prompt 弹框
  prompt(toastOptions: MessageOptions | string): Promise<MessageResult>
  // 关闭Message
  close(): void
}
