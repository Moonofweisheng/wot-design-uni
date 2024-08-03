let lastTime = 0 // 上一次调用 requestAnimationFrame 的时间戳
const prefixes = 'webkit moz ms o'.split(' ') // 各浏览器厂商的前缀
let requestAnimationFrame = null // 用于请求下一帧的函数
let cancelAnimationFrame = null // 用于取消下一帧的函数
let prefix = ''

// #ifdef H5
// 尝试获取浏览器原生的 requestAnimationFrame 和 cancelAnimationFrame 方法
requestAnimationFrame = window.requestAnimationFrame
cancelAnimationFrame = window.cancelAnimationFrame

// 遍历浏览器前缀，获取兼容的 requestAnimationFrame 和 cancelAnimationFrame 实现
for (let i = 0; i < prefixes.length; i++) {
  if (requestAnimationFrame && cancelAnimationFrame) {
    break
  }
  prefix = prefixes[i]
  // 获取兼容的 requestAnimationFrame 方法
  requestAnimationFrame = requestAnimationFrame || window[`${prefix}RequestAnimationFrame`]
  // 获取兼容的 cancelAnimationFrame 方法
  cancelAnimationFrame = cancelAnimationFrame || window[`${prefix}CancelAnimationFrame`] || window[`${prefix}CancelRequestAnimationFrame`]
}
// #endif

// 如果当前浏览器不支持原生的 requestAnimationFrame 和 cancelAnimationFrame，则使用 setTimeout 作为替代方案
if (!requestAnimationFrame || !cancelAnimationFrame) {
  requestAnimationFrame = function (callback) {
    const currTime = new Date().getTime()
    // 计算到下次调用的时间，尽可能接近每秒60帧的效果
    const timeToCall = Math.max(0, 16 - (currTime - lastTime))
    const id = setTimeout(() => {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }

  cancelAnimationFrame = function (id) {
    clearTimeout(id)
  }
}

export { requestAnimationFrame, cancelAnimationFrame }
