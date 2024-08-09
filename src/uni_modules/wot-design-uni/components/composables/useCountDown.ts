import { ref, computed, onBeforeUnmount } from 'vue'
import { isDef } from '../common/util'
import { useRaf } from './useRaf'

// 定义倒计时时间的数据结构
export type CurrentTime = {
  days: number
  hours: number
  total: number
  minutes: number
  seconds: number
  milliseconds: number
}

// 定义倒计时的配置项
export type UseCountDownOptions = {
  time: number // 倒计时总时间，单位为毫秒
  millisecond?: boolean // 是否开启毫秒级倒计时，默认为 false
  onChange?: (current: CurrentTime) => void // 倒计时每次变化时的回调函数
  onFinish?: () => void // 倒计时结束时的回调函数
}

// 定义常量
const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

// 将时间转换为倒计时数据结构
function parseTime(time: number): CurrentTime {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)

  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  }
}

// 判断两个时间是否在同一秒内
function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}

// 定义 useCountDown 函数
export function useCountDown(options: UseCountDownOptions) {
  let endTime: number // 结束时间
  let counting: boolean // 是否计时中

  const { start: startRaf, cancel: cancelRaf } = useRaf(tick)

  const remain = ref(options.time) // 剩余时间
  const current = computed(() => parseTime(remain.value)) // 当前倒计时数据

  // 暂停倒计时
  const pause = () => {
    counting = false
    cancelRaf()
  }

  // 获取当前剩余时间
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)

  // 设置剩余时间
  const setRemain = (value: number) => {
    remain.value = value
    isDef(options.onChange) && options.onChange(current.value)
    if (value === 0) {
      pause()
      isDef(options.onFinish) && options.onFinish()
    }
  }

  // 每毫秒更新一次倒计时
  const microTick = () => {
    if (counting) {
      setRemain(getCurrentRemain())
      if (remain.value > 0) {
        startRaf()
      }
    }
  }

  // 每秒更新一次倒计时
  const macroTick = () => {
    if (counting) {
      const remainRemain = getCurrentRemain()
      if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
        setRemain(remainRemain)
      }

      if (remain.value > 0) {
        startRaf()
      }
    }
  }

  // 根据配置项选择更新方式
  function tick() {
    if (options.millisecond) {
      microTick()
    } else {
      macroTick()
    }
  }

  // 开始倒计时
  const start = () => {
    if (!counting) {
      endTime = Date.now() + remain.value
      counting = true
      startRaf()
    }
  }

  // 重置倒计时
  const reset = (totalTime: number = options.time) => {
    pause()
    remain.value = totalTime
  }

  // 在组件卸载前暂停倒计时
  onBeforeUnmount(pause)

  return {
    start,
    pause,
    reset,
    current
  }
}
