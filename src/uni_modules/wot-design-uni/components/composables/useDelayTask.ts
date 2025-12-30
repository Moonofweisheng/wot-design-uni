import { onBeforeUnmount, ref, shallowReadonly, type Ref } from 'vue'

export interface UseDelayTaskOptions {
  /**
   * 是否在创建时立即启动任务
   * @default false
   */
  immediate?: boolean
}

export interface UseDelayTaskReturn {
  /**
   * 启动任务
   * @param newDelay 可选，覆盖默认延迟时间
   */
  run: (newDelay?: number) => void
  /**
   * 取消任务
   */
  cancel: () => void
  /**
   * 任务是否正在运行中
   */
  isRunning: Readonly<Ref<boolean>>
}

/**
 * 延迟任务控制器
 * 用于管理组件内的延时操作，自动处理组件卸载清理
 * @param fn 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @param options 配置项
 */
export function useDelayTask(fn: () => void, delay: number, options?: UseDelayTaskOptions): UseDelayTaskReturn {
  let timerId: ReturnType<typeof setTimeout> | null = null
  const isRunning = ref(false)

  // 启动任务
  const run = (newDelay?: number) => {
    cancel() // 确保单例
    isRunning.value = true
    timerId = setTimeout(
      () => {
        isRunning.value = false
        fn()
      },
      newDelay !== undefined ? newDelay : delay
    )
  }

  // 取消任务
  const cancel = () => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
    isRunning.value = false
  }

  // 组件卸载时自动清理
  onBeforeUnmount(cancel)

  // 如果设置了 immediate，立即启动
  if (options?.immediate) {
    run()
  }

  return {
    run,
    cancel,
    isRunning: shallowReadonly(isRunning)
  }
}
