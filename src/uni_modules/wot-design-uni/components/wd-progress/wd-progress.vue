<template>
  <view :class="`wd-progress ${customClass}`" :style="customStyle">
    <view class="wd-progress__outer">
      <view :class="`wd-progress__inner ${innerClass}`" :style="rootStyle"></view>
    </view>
    <view v-if="!hideText" class="wd-progress__label">{{ percentage }}%</view>
    <wd-icon
      v-else-if="status"
      :custom-class="`wd-progress__label wd-progress__icon ${innerClass}`"
      :name="iconName"
      :color="typeof color === 'string' ? color : ''"
    ></wd-icon>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-progress',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, ref, watch } from 'vue'
import { isArray, isDef, isObj, objToStyle, pause } from '../common/util'
import { progressProps, type ProgressColor } from './types'

const props = defineProps(progressProps)
const showColor = ref<string>('')
const showPercent = ref<number>(0)
const changeCount = ref<number>(0)
let timer: ReturnType<typeof setTimeout> | null = null

const rootStyle = computed(() => {
  return objToStyle({
    background: showColor.value,
    width: `${showPercent.value}%`,
    'transition-duration': `${changeCount.value * props.duration * 0.001}s`
  })
})

const innerClass = computed(() => (props.status ? `is-${props.status}` : ''))

const iconName = computed(() => {
  let icon: string = ''
  switch (props.status) {
    case 'danger':
      icon = 'close-outline'
      break
    case 'success':
      icon = 'check-outline'
      break
    case 'warning':
      icon = 'warn-bold'
      break
    default:
      break
  }
  return icon
})

watch(
  () => [props.percentage, props.color, props.duration],
  () => {
    validatePercentage(props.percentage)
    updateProgress()
  },
  { immediate: true }
)

function validatePercentage(value: number) {
  if (Number.isNaN(value) || value < 0 || value > 100) {
    console.error('The value of percentage must be between 0 and 100')
  }
}

/**
 * 进度条前进
 * @param partList 颜色数组
 * @param percentage 进度值
 */
function updateProgressForward(partList: ProgressColor[], percentage: number) {
  return partList.some((part, index) => {
    if (showPercent.value < part.percentage && part.percentage <= percentage) {
      update(part.percentage, part.color)
      return true
    } else if (index === partList.length - 1) {
      update(percentage, part.color)
    }
  })
}

/**
 * 进度条后退
 * @param partList 颜色数组
 * @param percentage 进度值
 */
function updateProgressBackward(partList: ProgressColor[], percentage: number) {
  return partList.some((part) => {
    if (percentage <= part.percentage) {
      update(percentage, part.color)
      return true
    }
  })
}

/**
 * 更新进度条
 */
async function updateProgress() {
  const { percentage, color } = props
  if (!isDef(color) || (isArray(color) && color.length === 0)) {
    changeCount.value = Math.abs(percentage - showPercent.value)
    await pause()
    showPercent.value = percentage
    return
  }
  if (showPercent.value === percentage) return

  const colorArray = isArray(color) ? color : [color]
  validateColorArray(colorArray)
  const partList = createPartList(colorArray)
  showPercent.value > percentage ? updateProgressBackward(partList, percentage) : updateProgressForward(partList, percentage)
}

/**
 * 判断是否是颜色数组
 * @param array 颜色数组
 */
function isProgressColorArray(array: string[] | ProgressColor[]): array is ProgressColor[] {
  return array.every(
    (color) => isObj(color) && Object.prototype.hasOwnProperty.call(color, 'color') && Object.prototype.hasOwnProperty.call(color, 'percentage')
  )
}

/**
 * 判断是否是字符串数组
 * @param array 颜色数组
 */
function isStringArray(array: string[] | ProgressColor[]): array is string[] {
  return array.every((item) => typeof item === 'string')
}

/**
 * 颜色数组校验
 * @param colorArray 颜色数组
 */
function validateColorArray(colorArray: string[] | ProgressColor[]) {
  const isStrArray = isStringArray(colorArray)
  const isObjArray = isProgressColorArray(colorArray)
  if (!isStrArray && !isObjArray) {
    throw Error('Color must be String or Object with color and percentage')
  }
  if (isObjArray && colorArray.some(({ percentage }) => Number.isNaN(percentage))) {
    throw Error('All the percentage must can be formatted to Number')
  }
}

/**
 * 创建颜色数组
 * @param colorArray 颜色数组
 * @return 颜色数组
 */
function createPartList(colorArray: string[] | ProgressColor[]) {
  const partNum = 100 / colorArray.length
  return isProgressColorArray(colorArray)
    ? colorArray.sort((a, b) => a.percentage - b.percentage)
    : colorArray.map((item, index) => ({
        color: item,
        percentage: (index + 1) * partNum
      }))
}

function update(targetPercent: number, color: string) {
  if (timer) return
  const { duration } = props
  changeCount.value = Math.abs(targetPercent - showPercent.value)
  setTimeout(() => {
    showPercent.value = targetPercent
    showColor.value = color
    timer = setTimeout(() => {
      timer && clearTimeout(timer)
      timer = null
      updateProgress()
    }, changeCount.value * duration)
  }, 50)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
