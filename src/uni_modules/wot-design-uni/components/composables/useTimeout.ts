import { type MaybeRefOrGetter, onUnmounted, shallowReadonly, shallowRef, toValue } from 'vue'

export interface UseTimeoutOptions {
  immediate?: boolean
  immediateCb?: boolean
}

export function useTimeout<CallbackFn extends (...args: any[]) => any>(cb: CallbackFn, ms: MaybeRefOrGetter<number>, options?: UseTimeoutOptions) {
  const { immediate = false, immediateCb = false } = options || {}

  const pending = shallowRef<boolean>(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function stop() {
    pending.value = false
    clear()
  }

  function start(...args: Parameters<CallbackFn> | []) {
    if (immediateCb) {
      cb()
    }
    clear()
    pending.value = true
    timer = setTimeout(() => {
      pending.value = false
      timer = null
      cb(...args)
    }, toValue(ms))
  }

  if (immediate) {
    start()
  }

  onUnmounted(() => {
    stop()
  })

  return {
    pending: shallowReadonly(pending),
    start,
    stop
  }
}
