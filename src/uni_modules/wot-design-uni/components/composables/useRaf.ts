import { ref, onUnmounted } from 'vue'
import { isDef, isH5, isNumber } from '../common/util'

// 定义回调函数类型
type RafCallback = (time: number) => void

export function useRaf(callback: RafCallback) {
  const requestRef = ref<number | null | ReturnType<typeof setTimeout>>(null)

  // 启动动画帧
  const start = () => {
    const handle = (time: number) => {
      callback(time)
    }

    if (isH5) {
      requestRef.value = requestAnimationFrame(handle)
    } else {
      requestRef.value = setTimeout(() => handle(Date.now()), 1000 / 30)
    }
  }

  // 取消动画帧
  const cancel = () => {
    if (isH5 && isNumber(requestRef.value)) {
      cancelAnimationFrame(requestRef.value!)
    } else if (isDef(requestRef.value)) {
      clearTimeout(requestRef.value)
    }
  }

  onUnmounted(() => {
    cancel()
  })

  return { start, cancel }
}
