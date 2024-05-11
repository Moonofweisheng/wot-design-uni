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
import { useRequestAnimationFrame, formatNumber } from './utils'

const props = defineProps(countToProps)
const { requestAnimationFrame } = useRequestAnimationFrame()

console.log(props)
const result = ref<string | number>(0)
let printVal: string | number = ''
let localStartVal: number = 0
let localDuration: number = 0
let timestamp: number = 0 // 时间戳
let startTime: number = 0 // 开始的时间
let remaining: number = 0 //  停留的时间
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

  result.value = formatNumber({ num: printVal, separator: props.separator }) || 0
  if (progress < localDuration) {
    rafId = requestAnimationFrame(handleCountTo)
  } else {
    localStartVal = props.endVal //  让结束时间等于开始时间，下次更新时开始时间不从0开始
  }
}

const handleStart = () => {
  !localStartVal && (localStartVal = props.startVal)
  localDuration = props.duration
  startTime = 0
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

function cancelAnimationFrame(id) {
  clearTimeout(id)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
