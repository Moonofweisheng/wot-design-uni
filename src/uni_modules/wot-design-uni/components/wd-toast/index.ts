import { inject, provide, ref } from 'vue'
import type { Toast, ToastOptions } from './types'
import { deepMerge } from '../common/util'

/**
 * useToast 用到的key
 */
const toastDefaultOptionKey = '__TOAST_OPTION__'

// 默认模板
export const defaultOptions: ToastOptions = {
  duration: 2000,
  show: false
}

const None = Symbol('None')

export function useToast(selector: string = ''): Toast {
  const toastOptionKey = getToastOptionKey(selector)
  const toastOption = inject(toastOptionKey, ref<ToastOptions | typeof None>(None)) // toast选项
  if (toastOption.value === None) {
    toastOption.value = defaultOptions
    provide(toastOptionKey, toastOption)
  }
  let timer: ReturnType<typeof setTimeout> | null = null

  const createMethod = (toastOptions: ToastOptions) => {
    return (options: ToastOptions | string) => {
      return show(deepMerge(toastOptions, typeof options === 'string' ? { msg: options } : options) as ToastOptions)
    }
  }

  const show = (option: ToastOptions | string) => {
    const options = deepMerge(defaultOptions, typeof option === 'string' ? { msg: option } : option) as ToastOptions
    toastOption.value = deepMerge(options, {
      show: true
    }) as ToastOptions
    // 开始渲染，并在 duration ms之后执行清除
    timer && clearTimeout(timer)
    if (toastOption.value.duration && toastOption.value.duration > 0) {
      timer = setTimeout(() => {
        timer && clearTimeout(timer)
        close()
      }, options.duration)
    }
  }

  const loading = createMethod({
    iconName: 'loading',
    duration: 0,
    cover: true
  })
  const success = createMethod({
    iconName: 'success',
    duration: 1500
  })
  const error = createMethod({ iconName: 'error' })
  const warning = createMethod({ iconName: 'warning' })
  const info = createMethod({ iconName: 'info' })

  const close = () => {
    toastOption.value = { show: false }
  }
  return {
    show,
    loading,
    success,
    error,
    warning,
    info,
    close
  }
}

export const getToastOptionKey = (selector: string) => {
  return selector ? `${toastDefaultOptionKey}${selector}` : toastDefaultOptionKey
}

export const toastIcon = {
  success() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 44 44" width="48" height="48"><circle cx="24" cy="26" r="22" fill="#000" opacity=".1"/><circle cx="24" cy="24" r="20" fill="#34D19D" opacity=".4"/><circle cx="24" cy="24" r="16" fill="#34D19D"/><path d="M19 24l4 4 8-8" stroke="#FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>'
  },
  warning() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 44 44" width="48" height="48"><circle cx="24" cy="26" r="22" fill="#000" opacity=".1"/><circle cx="24" cy="24" r="20" fill="#F0883A" opacity=".4"/><circle cx="24" cy="24" r="16" fill="#F0883A"/><rect x="22.5" y="14" width="3" height="12" fill="#FFF" rx="1.5"/><circle cx="24" cy="30" r="2" fill="#FFF"/></svg>'
  },
  info() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 44 44" width="48" height="48"><circle cx="24" cy="26" r="22" fill="#000" opacity=".1"/><circle cx="24" cy="24" r="20" fill="#909CB7" opacity=".4"/><circle cx="24" cy="24" r="16" fill="#909CB7"/><circle cx="24" cy="18" r="2" fill="#FFF"/><rect x="22.5" y="22" width="3" height="12" fill="#FFF" rx="1.5"/></svg>'
  },
  error() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 44 44" width="48" height="48"><circle cx="24" cy="26" r="22" fill="#000" opacity=".1"/><circle cx="24" cy="24" r="20" fill="#fa4350" opacity=".4"/><circle cx="24" cy="24" r="16" fill="#fa4350"/><path d="M18 18l12 12M30 18L18 30" stroke="#FFF" stroke-width="2.5" stroke-linecap="round"/></svg>'
  }
}
