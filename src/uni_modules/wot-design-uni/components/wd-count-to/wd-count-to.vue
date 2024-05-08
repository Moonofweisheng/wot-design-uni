<template>
  <view :class="`wd-count-to ${props.customClass}`" :style="props.customStyle">
    <text
      :style="{
        fontSize: props.fontSize ? props.fontSize : '',
        fontWeight: props.isBold ? 'bold' : 'normal',
        color: props.fontColor ? props.fontColor : ''
      }"
    >
      {{ result }}
    </text>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-count-to',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref, unref, onMounted, watch, computed } from 'vue'
import { countToProps } from './types'
import { onBeforeUnmount } from 'vue'

const props = defineProps(countToProps)

const result = ref(0)
let printVal = null
let localStartVal: number | null = null
let localDuration: number | null = null
let timestamp: number | null = null // 时间戳
let startTime: number | null = null // 开始的时间
let remaining: number | null = null //  停留的时间
let lastTime = 0 // 上一次的时间
let rafId: number | null = null
const countDown = computed(() => props.startVal > props.endVal)

const handleCountTo = (_timestamp) => {
  if (!startTime) startTime = _timestamp
  const _countDown = unref(countDown)
  const _endVal = props.endVal
  timestamp = _timestamp
  const progress = timestamp - startTime
  remaining = remaining - progress

  if (_countDown) {
    printVal = localStartVal - (localStartVal - _endVal) * (progress / localDuration)
    printVal = printVal < _endVal ? _endVal : printVal
  } else {
    printVal = localStartVal + (_endVal - localStartVal) * (progress / localDuration)
    printVal = printVal > _endVal ? _endVal : printVal
  }

  result.value = formatNumber(printVal) || 0
  if (progress < localDuration) {
    rafId = requestAnimationFrame(handleCountTo)
  } else {
    localStartVal = props.endVal //  让结束时间等于开始时间，下次更新时开始时间不从0开始
    console.log('结束')
  }
}

const handleStart = () => {
  !localStartVal && (localStartVal = props.startVal)
  localDuration = props.duration
  startTime = null
  rafId = requestAnimationFrame(handleCountTo)
}

const handleStop = () => {
  rafId && cancelAnimationFrame(rafId)
}

onMounted(() => {
  props.autoStart && handleStart()
})

onBeforeUnmount(handleStop)

watch(
  () => props.endVal,
  () => {
    handleStart()
  }
)

function requestAnimationFrame(callback) {
  const currTime = new Date().getTime()
  // 为了使setTimteout的尽可能的接近每秒60帧的效果
  const timeToCall = Math.max(0, 16 - (currTime - lastTime))
  const id = setTimeout(() => {
    callback(currTime + timeToCall)
  }, timeToCall) as unknown as number
  lastTime = currTime + timeToCall
  return id
}
function cancelAnimationFrame(id) {
  clearTimeout(id)
}

// 判断是否数字
function isNumber(val): boolean {
  return !isNaN(parseFloat(val))
}

// 格式化结果
function formatNumber(num) {
  num = Number(num)
  num = num.toFixed(props.decimals)
  return num
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
