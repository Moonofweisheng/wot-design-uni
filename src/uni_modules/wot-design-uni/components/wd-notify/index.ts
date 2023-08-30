import type { InjectionKey } from 'vue'
import { ref, provide, reactive } from 'vue'
import type { NotifyProps } from './type'
import { deepMerge, getType, isString } from '../common/util'

let timer: ReturnType<typeof setTimeout>
let currentOptions = getDefaultOptions()
const notifyOptionKey = '__NOTIFY_OPTION__'
const notifyDefaultOptionKey = Symbol(notifyOptionKey) as InjectionKey<NotifyProps>
export const setNotifyDefaultOptions = (options: NotifyProps) => {
  currentOptions = deepMerge(currentOptions, options) as NotifyProps
}
export const resetNotifyDefaultOptions = () => {
  currentOptions = getDefaultOptions()
}
export const useNotify = (selector: string = '') => {
  const notifyOption = reactive<NotifyProps>(currentOptions)
  const showNotify = (option: NotifyProps | string) => {
    const options = deepMerge(currentOptions, isString(option) ? { message: option } : option) as NotifyProps

    Object.assign(notifyOption, options, { visible: true })
    if (notifyOption.duration && notifyOption.duration > 0) {
      timer && clearTimeout(timer)
      timer = setTimeout(() => closeNotify(), options.duration)
    }
  }
  const closeNotify = () => {
    timer && clearTimeout(timer)
    notifyOption.visible = false
  }

  // provide
  provide(getNotifyOptionKey(selector), notifyOption)

  return {
    showNotify,
    closeNotify
  }
}
export const getNotifyOptionKey = (selector: string) => {
  return selector ? `${notifyOptionKey}${selector}` : notifyDefaultOptionKey
}

function getDefaultOptions(): NotifyProps {
  return {
    type: 'danger',
    color: undefined,
    zIndex: 99,
    message: '',
    duration: 3000,
    position: 'top',
    safeHeight: undefined,
    background: undefined,
    onClick: undefined,
    onClosed: undefined,
    onOpened: undefined
  }
}
