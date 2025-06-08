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
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width="42" height="42"><defs><linearGradient id="c" x1="50%" x2="50%" y1=".127%" y2="100%"><stop offset="0%" stop-color="#ACFFBD" stop-opacity=".208"/><stop offset="100%" stop-color="#10B87C"/></linearGradient><filter id="a" width="226.3%" height="260%" x="-63.2%" y="-80%" filterUnits="objectBoundingBox"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"/><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0.122733141 0 0 0 0 0.710852582 0 0 0 0 0.514812768 0 0 0 1 0"/><feMerge><feMergeNode in="shadowMatrixOuter1"/><feMergeNode in="SourceGraphic"/></feMerge></filter><rect id="b" width="3" height="8.5" x="3.418" y="5.814" rx="1.5"/></defs><circle cx="21" cy="21" r="20" fill="#34D19D" opacity=".4"/><circle cx="21" cy="21" r="16" fill="#34D19D"/><g filter="url(#a)" transform="translate(11.5 14)"><mask id="d" fill="#fff"><use xlink:href="#b"/></mask><use xlink:href="#b" fill="#C4FFEB" transform="rotate(-45 4.918 10.064)"/><path fill="url(#c)" d="M4.716 9.523h3v3.699h-3z" mask="url(#d)" transform="rotate(-45 6.216 11.372)"/><rect width="3" height="16.509" x="10.136" y="-1.022" fill="#FFF" rx="1.5" transform="scale(1 -1)rotate(-45 -5.825 0)"/></g></svg>'
  },
  warning() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width="42" height="42"><defs><filter id="a" width="580%" height="220%" x="-240%" y="-60%" filterUnits="objectBoundingBox"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"/><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0.824756567 0 0 0 0 0.450356612 0 0 0 0 0.168550194 0 0 0 1 0"/><feMerge><feMergeNode in="shadowMatrixOuter1"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle cx="21" cy="21" r="20" fill="#F0883A" opacity=".4"/><circle cx="21" cy="21" r="16" fill="#F0883A"/><g filter="url(#a)" transform="translate(18.5 10.8)"><rect width="3" height="12.432" x=".993" y=".955" fill="#FFF" rx="1.5" transform="matrix(1 0 0 -1 0 14.343)"/><rect width="3" height="4.004" x="1.009" y="15.201" fill="#FFDEC5" rx="1.5" transform="matrix(1 0 0 -1 0 34.405)"/></g></svg>'
  },
  info() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width="42" height="42"><defs><filter id="a" width="700%" height="214.3%" x="-300%" y="-57.1%" filterUnits="objectBoundingBox"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"/><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0.362700096 0 0 0 0 0.409035039 0 0 0 0 0.520238904 0 0 0 1 0"/><feMerge><feMergeNode in="shadowMatrixOuter1"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle cx="21" cy="21" r="20" fill="#909CB7" opacity=".4"/><circle cx="21" cy="21" r="16" fill="#909CB7"/><g filter="url(#a)" transform="translate(18.5 9.8)"><g transform="rotate(-180 1.996 10.102)"><rect width="3" height="14" fill="#FFF" rx="1.5" transform="matrix(1 0 0 -1 0 14)"/><rect width="3" height="4" y="16" fill="#EEE" rx="1.5" transform="matrix(1 0 0 -1 0 36)"/></g></g></svg>'
  },
  error() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" xml:space="preserve" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd"><circle cx="21" cy="21" r="20" fill="#fa4350" fill-opacity=".4"/><circle cx="21" cy="21" r="16" fill="#fa4350" fill-opacity=".9"/><path fill="#ffdfdf" d="M15.061 27.081a1.5 1.5 0 0 1 0-2.121l9.899-9.899a1.5 1.5 0 1 1 2.121 2.121l-9.899 9.899a1.5 1.5 0 0 1-2.121 0"/><path fill="url(#a)" d="m21.778 22.485-2.829 2.829-2.121-2.121 2.829-2.829z"/><path fill="url(#b)" d="m25.314 18.949-2.829 2.829-2.121-2.121 2.829-2.829z"/><path fill="#fff" d="M27.081 27.081a1.5 1.5 0 0 1-2.121 0l-9.899-9.899a1.5 1.5 0 1 1 2.121-2.121l9.899 9.899a1.5 1.5 0 0 1 0 2.121"/><defs><linearGradient id="a" x1="0" x2="1" y1="0" y2="0" gradientTransform="rotate(-45 38.197 -9.48)scale(3.9698)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffdfdf"/><stop offset="1" stop-color="#f9bebe"/></linearGradient><linearGradient id="b" x1="0" x2="1" y1="0" y2="0" gradientTransform="rotate(135 8.412 13.965)scale(3.9698)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffdfdf"/><stop offset="1" stop-color="#f9bebe"/></linearGradient></defs></svg>'
  }
}
