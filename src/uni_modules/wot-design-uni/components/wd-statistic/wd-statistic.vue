<template>
  <view :class="rootClass" :style="rootStyle">
    <slot name="prefix">
      <text>{{ props.prefix }}</text>
    </slot>
    <slot name="default">
      <text>{{ displayValue }}</text>
    </slot>
    <slot name="suffix">
      <text>{{ props.suffix }}</text>
    </slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-statistic',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { objToStyle, addUnit, isDef } from '../common/util'
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { statisticProps } from './types'

// 获取并定义传入的属性
const props = defineProps(statisticProps)
// 定义emit用于发射事件
const emit = defineEmits(['callback'])

// 定义类名的响应式变量
const statisticClass = ref<string>('')

// 初始化局部状态变量
let localStartVal = ref(props.startVal)
let localDuration = ref(props.duration)
let startTime: number | null = null
let rAF: number | null = null
let displayValue = ref(formatNumber(props.startVal))

// 计算是否为倒计时
const countDown = computed(() => Number(props.startVal) > Number(props.endVal))
let paused = ref(false)

// 监听相关属性的变化
watch(
  [() => props.startVal, () => props.endVal, () => props.duration, () => props.autoplay],
  () => {
    if (props.autoplay) {
      start()
    }
  },
  { immediate: true }
)

// 开始计数
function start(startVal?: number | string) {
  cancelAnimationFrame(rAF as number)
  localStartVal.value = startVal !== undefined ? Number(startVal) : Number(props.startVal)
  startTime = null
  localDuration.value = props.duration
  displayValue.value = formatNumber(localStartVal.value)
  paused.value = false
  rAF = requestAnimationFrame(count)
}

// 计数逻辑
function count(timestamp: number) {
  if (!startTime) startTime = timestamp
  const progress = timestamp - startTime
  const remaining = localDuration.value - progress

  let printVal: number
  const endVal = Number(props.endVal)

  if (countDown.value) {
    printVal = (localStartVal.value as number) - ((localStartVal.value as number) - endVal) * (progress / localDuration.value)
  } else {
    printVal = (localStartVal.value as number) + (endVal - (localStartVal.value as number)) * (progress / localDuration.value)
  }

  if (countDown.value) {
    printVal = printVal < endVal ? endVal : printVal
  } else {
    printVal = printVal > endVal ? endVal : printVal
  }

  displayValue.value = formatNumber(printVal)

  if (progress < localDuration.value) {
    rAF = requestAnimationFrame(count)
  } else {
    emit('callback')
  }
}

// 重置计数器
function reset() {
  cancelAnimationFrame(rAF as number)
  localStartVal.value = Number(props.startVal)
  displayValue.value = formatNumber(props.startVal)
  paused.value = false
  if (props.autoplay) {
    start()
  }
}

// 暂停计数器
function pause() {
  paused.value = true
  cancelAnimationFrame(rAF as number)
}

// 判断是否为数字
function isNumber(val: any): boolean {
  return !isNaN(parseFloat(val)) && isFinite(val)
}

// 格式化数字
function formatNumber(num: number | string): string {
  num = Number(num).toFixed(props.decimals)
  num += ''
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? props.decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + props.separator + '$2')
    }
  }
  return x1 + x2
}

// 计算根类名
const rootClass = computed(() => {
  return `wd-statistic ${props.customClass} ${statisticClass.value}`
})

// 计算根样式
const rootStyle = computed(() => {
  const rootStyle: Record<string, any> = {}

  if (isDef(props.fontSize)) {
    rootStyle['font-size'] = addUnit(props.fontSize)
  }
  if (isDef(props.color)) {
    rootStyle['color'] = props.color
  }
  return `${objToStyle(rootStyle)};${props.customStyle}`
})

// 组件挂载时启动计数
onMounted(() => {
  if (props.autoplay) {
    start()
  }
})

// 组件卸载时取消动画帧
onUnmounted(() => {
  cancelAnimationFrame(rAF as number)
})

// 对外暴露的方法
defineExpose({
  start,
  reset,
  pause
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
