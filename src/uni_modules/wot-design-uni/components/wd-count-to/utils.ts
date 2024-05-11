export function useRequestAnimationFrame() {
  let lastTime = 0

  const requestAnimationFrame = (callback: FrameRequestCallback) => {
    const currTime = new Date().getTime()
    const timeToCall = Math.max(0, 16 - (currTime - lastTime))
    const id = setTimeout(() => {
      callback(currTime + timeToCall)
    }, timeToCall) as unknown as number
    lastTime = currTime + timeToCall
    return id
  }

  return {
    requestAnimationFrame
  }
}

/**
 *
 * @param num
 * @param decimals 保留几位小数
 * @returns
 */
export function formatNumber(num: string | number, decimals = 0) {
  num = Number(num)
  num = num.toFixed(decimals)
  return num
}
