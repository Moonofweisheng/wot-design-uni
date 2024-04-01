/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2024-04-01 12:30:51
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-message-box\index.ts
 * 记得注释
 */
import { provide, ref } from 'vue'
import type { Message, MessageOptions, MessageResult, MessageType } from './types'
import { deepMerge } from '../common/util'

/**
 * useMessage 用到的key
 *
 * @internal
 */
export const messageDefaultOptionKey = '__MESSAGE_OPTION__'

// 默认模板
export const defaultOptions: MessageOptions = {
  title: '',
  showCancelButton: false,
  show: false,
  closeOnClickModal: true,
  msg: '',
  type: 'alert',
  inputType: 'text',
  inputValue: '',
  inputValidate: null,
  showErr: false,
  zIndex: 99,
  lazyRender: true,
  inputError: ''
}

export function useMessage(selector: string = ''): Message {
  const messageOption = ref<MessageOptions>(defaultOptions) // Message选项
  const messageOptionKey = selector ? messageDefaultOptionKey + selector : messageDefaultOptionKey
  provide(messageOptionKey, messageOption)

  const createMethod = (type: MessageType) => {
    // 优先级：options->MessageOptions->defaultOptions
    return (options: MessageOptions | string) => {
      const messageOptions = deepMerge({ type: type }, typeof options === 'string' ? { title: options } : options) as MessageOptions
      if (messageOptions.type === 'confirm' || messageOptions.type === 'prompt') {
        messageOptions.showCancelButton = true
      } else {
        messageOptions.showCancelButton = false
      }
      return show(messageOptions)
    }
  }

  const show = (option: MessageOptions | string) => {
    // 返回一个promise
    return new Promise<MessageResult>((resolve, reject) => {
      const options = deepMerge(defaultOptions, typeof option === 'string' ? { title: option } : option) as MessageOptions
      messageOption.value = deepMerge(options, {
        show: true,
        onConfirm: (res: MessageResult) => {
          resolve(res)
        },
        onCancel: (res: MessageResult) => {
          reject(res)
        }
      }) as MessageOptions
    })
  }

  // 打开Alert 弹框
  const alert = createMethod('alert')
  // 打开Confirm 弹框
  const confirm = createMethod('confirm')
  // 打开Prompt 弹框
  const prompt = createMethod('prompt')

  const close = () => {
    messageOption.value = { ...defaultOptions }
  }
  return {
    show,
    alert,
    confirm,
    prompt,
    close
  }
}
