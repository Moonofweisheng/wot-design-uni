<template>
  <view :class="rootClass">
    <!-- 前缀插槽 -->
    <slot name="prefix">
      <wd-text :color="props.color" :size="`${props.fontSize * 0.7}px`" :text="props.prefix"></wd-text>
    </slot>
    <!-- 默认文本插槽 -->
    <slot name="default">
      <wd-text :color="props.color" :size="`${props.fontSize}px`" :text="displayValue"></wd-text>
    </slot>
    <!-- 后缀插槽 -->
    <slot name="suffix">
      <wd-text :color="props.color" :size="`${props.fontSize * 0.7}px`" :text="props.suffix"></wd-text>
    </slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-statistic',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { textProps } from './types'
import { isNumber } from '../common/util'
import { requestAnimationFrame, cancelAnimationFrame } from './requestAnimationFrame'

// 获取组件的 props 和 emit 函数
const props = defineProps(textProps)
const emits = defineEmits(['mountedCallback', 'callback'])

// 存储文本类名的响应式变量
const textClass = ref<string>('')

// 计算根元素的类名
const rootClass = computed(() => {
  return `wd-statistic ${props.customClass} ${textClass.value}`
})

let localStartVal = ref(props.startVal)
let displayValue = ref(formatNumber(props.startVal)) // 显示的文本值
let isAnimationEnded = false // 标记动画是否结束
let printVal: number | null = null
let paused = false // 标记动画是否暂停
let localDuration = ref(props.duration) // 动画时长
let startTime: number | null = null // 动画开始时间
let timestamp: number | null = null // 当前时间戳
let remaining: number | null = null // 剩余时间
let rAF: number | null = null // requestAnimationFrame ID
let timer: number | null = null // 定时器 ID
const countDown = props.startVal > props.endVal // 判断是否是倒计时

// 监听 props.startVal 和 props.endVal 的变化，重新启动动画
watch([() => props.startVal, () => props.endVal], () => {
  start(props.startVal)
})

onMounted(() => {
  // 组件挂载时自动开始动画（如果设置了 autoplay）
  if (props.autoplay) {
    start(props.startVal)
  }
  // 如果设置了频繁跳动和频繁时间，则启动定时器
  if (props.isFrequent && props.frequentTime) {
    timer = setInterval(() => {
      start(randomNum(0, props.endVal))
    }, props.frequentTime)
  }
  emits('mountedCallback')
})

onBeforeUnmount(() => {
  clearInterval(timer) // 组件卸载时清除定时器
})

// 缓动函数
function easingFn(t = 0, b = 0, c = 0, d = 0) {
  return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
}

// 生成指定范围的随机数
function randomNum(a: number, b: number): number {
  return Math.round(Math.random() * (b - a) + a)
}

// 启动动画
function start(startVal?: number) {
  // 清理之前的动画状态和定时器
  cancelAnimationFrame(rAF)
  clearInterval(timer)

  localStartVal.value = startVal || props.startVal
  startTime = null
  isAnimationEnded = false
  localDuration.value = props.duration
  paused = false

  // 重新启动动画
  rAF = requestAnimationFrame(count)
}

// 切换暂停和恢复状态
function pauseResume() {
  if (isAnimationEnded) {
    // 如果动画已经结束，不进行任何操作
    return
  }
  if (paused) {
    resume()
    paused = false
  } else {
    pause()
    paused = true
  }
}

// 暂停动画
function pause() {
  cancelAnimationFrame(rAF)
}

// 恢复动画
function resume() {
  if (isAnimationEnded) {
    // 如果动画已经结束，重置并重新开始动画
    start(localStartVal.value)
    return
  }
  startTime = null
  localDuration.value = +remaining
  localStartVal.value = +printVal
  rAF = requestAnimationFrame(count)
}

// 重置动画
function reset() {
  startTime = null
  isAnimationEnded = false
  cancelAnimationFrame(rAF)
  clearInterval(timer) // 清除定时器
  displayValue.value = formatNumber(props.startVal)
}

// 执行动画计数
function count(timestamp_e: number) {
  if (!startTime) startTime = timestamp_e
  timestamp = timestamp_e
  const progress = timestamp - startTime
  remaining = localDuration.value - progress

  if (props.useEasing) {
    if (countDown) {
      printVal = localStartVal.value - easingFn(progress, 0, localStartVal.value - props.endVal, localDuration.value) || 0
    } else {
      printVal = easingFn(progress, localStartVal.value, props.endVal - localStartVal.value, localDuration.value)
    }
  } else {
    if (countDown) {
      printVal = localStartVal.value - (localStartVal.value - props.endVal) * (progress / localDuration.value)
    } else {
      printVal = localStartVal.value + (props.endVal - localStartVal.value) * (progress / localDuration.value)
    }
  }

  // 限制最终值在目标范围内
  if (countDown) {
    printVal = printVal < props.endVal ? props.endVal : printVal
  } else {
    printVal = printVal > props.endVal ? props.endVal : printVal
  }

  displayValue.value = formatNumber(printVal)

  if (progress < localDuration.value) {
    rAF = requestAnimationFrame(count)
  } else {
    isAnimationEnded = true // 标记动画已结束
    emits('callback')
  }
}

// 格式化数字
function formatNumber(num: any): string {
  if (typeof num !== 'number') {
    num = parseFloat(num)
    if (isNaN(num)) {
      return '0'
    }
  }
  num = num.toFixed(props.decimals)
  const parts = num.split('.')
  let integerPart = parts[0]
  const decimalPart = parts.length > 1 ? props.decimal + parts[1] : ''
  const rgx = /(\d+)(\d{3})/

  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(integerPart)) {
      integerPart = integerPart.replace(rgx, '$1' + props.separator + '$2')
    }
  }
  return integerPart + decimalPart
}

// 对外暴露的方法
defineExpose({ start, reset, pause, pauseResume })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
