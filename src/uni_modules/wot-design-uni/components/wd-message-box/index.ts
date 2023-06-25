/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-06-19 12:52:04
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-message-box\index.ts
 * 记得注释
 */
import { InjectionKey, Ref, provide, ref } from 'vue'
import { Message, MessageOptions, MessageResult, MessageType } from './types'
import { deepMerge } from '../common/util'

/**
 * useMessage 用到的key
 *
 * @internal
 */
export const messageDefaultKey = Symbol('__MESSAGE__') as InjectionKey<Ref<boolean>>
export const messageDefaultOptionKey = Symbol('__MESSAGE_OPTION__') as InjectionKey<Ref<MessageOptions>>

// 默认模板
export const defaultOptions: MessageOptions = {
  title: '',
  showCancelButton: false,
  show: false,
  closeOnClickModal: true,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  msg: '',
  type: 'alert',
  inputType: 'text',
  inputValue: '',
  inputPlaceholder: '请输入',
  inputValidate: null,
  showErr: false,
  zIndex: 99,
  lazyRender: true,
  inputError: ''
}

export function useMessage(selector: string = ''): Message {
  const messageOption = ref<MessageOptions>(defaultOptions) // Message选项
  const messageOptionKey = selector ? '__MESSAGE_OPTION__' + selector : messageDefaultOptionKey
  provide(messageOptionKey, messageOption)

  const createMethod = (type: MessageType) => {
    // 优先级：options->toastOptions->defaultOptions
    return (options: MessageOptions | string) => {
      return show(deepMerge({ type: type }, typeof options === 'string' ? { title: options } : options) as MessageOptions)
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
