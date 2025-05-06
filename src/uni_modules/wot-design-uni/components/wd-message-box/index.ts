/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2024-12-05 13:23:17
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-message-box\index.ts
 * 记得注释
 */
import { inject, provide, ref } from 'vue'
import type { Message, MessageOptions, MessageOptionsWithCallBack, MessageResult, MessageType } from './types'
import { deepMerge } from '../common/util'

const messageDefaultOptionKey = '__MESSAGE_OPTION__'

const None = Symbol('None')

// 默认模板
export const defaultOptions: MessageOptionsWithCallBack = {
  title: '',
  showCancelButton: false,
  show: false,
  closeOnClickModal: true,
  msg: '',
  type: 'alert',
  inputType: 'text',
  inputValue: '',
  showErr: false,
  zIndex: 99,
  lazyRender: true,
  inputError: ''
}

export function useMessage(selector: string = ''): Message {
  const messageOptionKey = selector ? messageDefaultOptionKey + selector : messageDefaultOptionKey
  const messageOption = inject(messageOptionKey, ref<MessageOptionsWithCallBack | typeof None>(None)) // Message选项
  if (messageOption.value === None) {
    messageOption.value = defaultOptions
    provide(messageOptionKey, messageOption)
  }

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
      const options = deepMerge(defaultOptions, typeof option === 'string' ? { title: option } : option)
      messageOption.value = deepMerge(options, {
        show: true,
        success: (res: MessageResult) => {
          close()
          resolve(res)
        },
        fail: (res: MessageResult) => {
          close()
          reject(res)
        }
      })
    })
  }

  // 打开Alert 弹框
  const alert = createMethod('alert')
  // 打开Confirm 弹框
  const confirm = createMethod('confirm')
  // 打开Prompt 弹框
  const prompt = createMethod('prompt')

  const close = () => {
    if (messageOption.value !== None) {
      messageOption.value.show = false
    }
  }
  return {
    show,
    alert,
    confirm,
    prompt,
    close
  }
}

export const getMessageDefaultOptionKey = (selector: string) => {
  return selector ? `${messageDefaultOptionKey}${selector}` : messageDefaultOptionKey
}
