let lastTime = 0
const prefixes = 'webkit moz ms o'.split(' ') // 各浏览器前缀数组，用于兼容不同浏览器的requestAnimationFrame和cancelAnimationFrame方法
let requestAnimationFrame: (callback: FrameRequestCallback) => number = null // 定义requestAnimationFrame函数
let cancelAnimationFrame: (handle: number) => void = null // 定义cancelAnimationFrame函数
let prefix: string = ''

// #ifdef H5
// 在H5环境下，首先尝试直接从window对象获取requestAnimationFrame和cancelAnimationFrame方法
requestAnimationFrame = window.requestAnimationFrame
cancelAnimationFrame = window.cancelAnimationFrame

// 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
for (let i = 0; i < prefixes.length; i++) {
  if (requestAnimationFrame && cancelAnimationFrame) {
    break // 如果已经找到requestAnimationFrame和cancelAnimationFrame方法，跳出循环
  }
  prefix = prefixes[i]
  // 尝试从window对象获取带前缀的requestAnimationFrame方法
  requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame']
  // 尝试从window对象获取带前缀的cancelAnimationFrame方法
  cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame']
}
// #endif

// 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout实现
if (!requestAnimationFrame || !cancelAnimationFrame) {
  // 实现自定义的requestAnimationFrame方法
  requestAnimationFrame = function (callback) {
    const currTime = new Date().getTime()
    // 计算下一个帧调用的时间，确保接近每秒60帧的效果
    const timeToCall = Math.max(0, 16 - (currTime - lastTime))
    // 使用setTimeout模拟requestAnimationFrame
    const id = setTimeout(() => {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id // 返回定时器ID
  }

  // 实现自定义的cancelAnimationFrame方法
  cancelAnimationFrame = function (id) {
    clearTimeout(id) // 取消对应的定时器
  }
}

// 导出requestAnimationFrame和cancelAnimationFrame方法
export { requestAnimationFrame, cancelAnimationFrame }
