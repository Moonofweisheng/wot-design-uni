/**
 * 节流函数
 * @param {Function} fn - 需要节流的函数
 * @param {Number} delay - 延迟时间(ms)
 * @returns {Function}
 */
export const throttle = (fn: (...args: any[]) => void, delay: number) => {
  let last = 0
  return (...args: any[]) => {
    const now = Date.now()
    if (now - last > delay) {
      last = now
      fn(...args)
    }
  }
}

/**
 * 计算两点间的距离
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @returns {Number}
 */
export const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.hypot(x1 - x2, y1 - y2)
}

/**
 * 寻找最近的插槽索引
 * @param {Object} point - 当前中心点 {x, y}
 * @param {Array} slots - 插槽列表 [{left, top, width, height}]
 * @param {Function} filterFn - 过滤函数，返回 false 跳过该插槽 (index) => boolean
 * @returns {Object} { index: number, dist: number }
 */
export const findClosestSlot = (point: { x: number; y: number }, slots: any[], filterFn?: (index: number) => boolean) => {
  let minDist = Infinity
  let targetSlotIndex = -1
  const { x: centerX, y: centerY } = point

  slots.forEach((slot, sIdx) => {
    if (filterFn && !filterFn(sIdx)) return

    const sx = slot.left + slot.width / 2
    const sy = slot.top + slot.height / 2
    const dist = getDistance(centerX, centerY, sx, sy)

    if (dist < minDist) {
      minDist = dist
      targetSlotIndex = sIdx
    }
  })

  return { index: targetSlotIndex, dist: minDist }
}

/**
 * 移动数组中的元素
 * @param {Array} array - 原数组
 * @param {Number} fromIndex - 起始位置
 * @param {Number} toIndex - 目标位置
 * @returns {Array} 移动后的新数组
 */
export const moveArrayItem = (array: any[], fromIndex: number, toIndex: number) => {
  const newArray = [...array]
  const item = newArray.splice(fromIndex, 1)[0]
  newArray.splice(toIndex, 0, item)
  return newArray
}

/**
 * 交换数组中两项（原地修改，返回同一引用）
 * @param {Array} arr
 * @param {Number} fromIndex
 * @param {Number} toIndex
 */
export const swapArrayItem = (arr: any[], fromIndex: number, toIndex: number) => {
  if (fromIndex === toIndex) return arr // 同一个位置啥也不做
  const temp = arr[fromIndex]
  arr[fromIndex] = arr[toIndex]
  arr[toIndex] = temp
  return arr
}

/**
 * 获取触摸点对象
 * @param {Object} e - 事件对象
 * @returns {Object} 触摸点对象 (Touch 或 Event)
 */
export const getTouch = (e: any) => {
  return e.touches && e.touches[0] ? e.touches[0] : e
}

/**
 * 限制数值范围

 * @param {Number} val - 当前值
 * @param {Number} min - 最小值
 * @param {Number} max - 最大值
 * @returns {Number}
 */
export const clamp = (val: number, min: number, max: number) => {
  return Math.max(min, Math.min(val, max))
}

/**
 * 获取滚动方向
 * @param {Number} clientY - 当前触摸点 Y 坐标
 * @param {Number} topEdge - 顶部边缘阈值
 * @param {Number} bottomEdge - 底部边缘阈值
 * @param {Number} threshold - 触发阈值
 * @returns {Number} 0: 不滚动, -1: 向上, 1: 向下
 */
export const getScrollDirection = (clientY: number, topEdge: number, bottomEdge: number, threshold: number) => {
  if (clientY < topEdge + threshold) {
    return -1
  } else if (clientY > bottomEdge - threshold) {
    return 1
  }
  return 0
}

/**
 * 生成唯一 ID
 * @param {String} prefix - 前缀
 * @returns {String}
 */
export const generateId = (prefix = 'ds') => {
  // 使用时间戳 + 随机数生成 ID，兼容小程序环境
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `${prefix}_${timestamp}${random}`
}
