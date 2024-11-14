import { inject, provide, reactive, ref } from 'vue'
import type { NotifyProps } from './types'
import { deepMerge, isString } from '../common/util'

let timer: ReturnType<typeof setTimeout>
let currentOptions = getDefaultOptions()
const notifyDefaultOptionKey = '__NOTIFY_OPTION__'
const None = Symbol('None')
export const setNotifyDefaultOptions = (options: NotifyProps) => {
  currentOptions = deepMerge(currentOptions, options) as NotifyProps
}
export const resetNotifyDefaultOptions = () => {
  currentOptions = getDefaultOptions()
}
export const useNotify = (selector: string = '') => {
  const notifyOptionKey = getNotifyOptionKey(selector)

  const notifyOption = inject(notifyOptionKey, ref<NotifyProps | typeof None>(None))
  if (notifyOption.value === None) {
    notifyOption.value = currentOptions
    provide(notifyOptionKey, notifyOption)
  }
  const showNotify = (option: NotifyProps | string) => {
    const options = deepMerge(currentOptions, isString(option) ? { message: option } : option) as NotifyProps
    notifyOption.value = deepMerge(options, { visible: true })
    if (notifyOption.value.duration && notifyOption.value.duration > 0) {
      timer && clearTimeout(timer)
      timer = setTimeout(() => closeNotify(), options.duration)
    }
  }
  const closeNotify = () => {
    timer && clearTimeout(timer)
    if (notifyOption.value !== None) {
      notifyOption.value.visible = false
    }
  }

  return {
    showNotify,
    closeNotify
  }
}
export const getNotifyOptionKey = (selector: string) => {
  return selector ? `${notifyDefaultOptionKey}${selector}` : notifyDefaultOptionKey
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
