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
export function formatNumber({ num, decimals = 0, separator }: { num: string | number; decimals?: number; separator?: string }) {
  const _num = (+num).toFixed(decimals)
  const x = _num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (separator) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return x1 + x2
}
