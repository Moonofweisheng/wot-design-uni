import { getContext, isObj } from '../common/util'
// 默认模板
const defaultOptions = {
  msg: '',
  duration: 2000,
  iconName: '',
  loadingType: 'outline',
  loadingColor: '#4D80F0',
  iconColor: '#4D80F0',
  iconSize: 42,
  loadingSize: 42,
  customIcon: false,
  position: 'middle',
  show: true,
  selector: '#wd-toast',
  zIndex: 100
}
// toast注册的队列，此处使用队列方便后续边界管理
const queue = []
/**
 * @description 转换msg为对象形式，方便处理
 * @param msg
 * @return {{}|{msg: *}}
 */
const parseOptions = (msg) => {
  if (!msg) return {}
  return isObj(msg) ? msg : { msg }
}
/**
 * @description toast render
 * @param toastOptions
 * @return {wx.Component<any, any>}
 * @constructor
 */
const Toast = (toastOptions) => {
  // 覆盖模板中的选项
  const options = Object.assign({}, defaultOptions, parseOptions(toastOptions))
  // 获取页面栈中栈顶页面(当前显示的页面)
  const toast = (options.context || getContext()).selectComponent(options.selector)
  // 错误提示
  if (!toast) {
    const selector = toastOptions.selector ? toastOptions.selector : 'wd-toast'
    console.warn(`[wot design] warning(wd-toast): 未找到 ${selector} 节点，请确认 selector 是否正确`)
    return
  }
  // 删除无用字段
  delete options.selector
  // 强制清除队列中所有的toast
  Toast.close()
  // 设置订阅者
  toast.clear = () => {
    if (toast.timer) {
      clearTimeout(toast.timer)
      delete toast.timer
    }
    toast.setData({ show: false })
  }
  // 开始渲染，并在 duration ms之后执行清除
  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear()
    }, options.duration)
  }
  toast.setData(options)
  // 将toast放入队列
  queue.push(toast)
  // 返回toast实例
  return toast
}
/**
 * @description 柯里化函数
 * @param toastOptions
 * @return {function(options): (Toast)}
 */
const createMethod = (toastOptions) => {
  // 优先级：options->toastOptions->defaultOptions
  return (options) => {
    return Toast(Object.assign({}, defaultOptions, toastOptions, parseOptions(options)))
  }
}
/**
 * @description 主动通知订阅者强制清除toast
 */
Toast.close = () => {
  queue.forEach(toast => {
    toast.clear()
  })
  queue.length = 0
}

Toast.loading = createMethod({
  iconName: 'loading',
  duration: 0
})
Toast.success = createMethod({
  iconName: 'success',
  duration: 1500
})
Toast.error = createMethod({ iconName: 'error' })
Toast.warning = createMethod({ iconName: 'warning' })
Toast.info = createMethod({ iconName: 'info' })

export default Toast