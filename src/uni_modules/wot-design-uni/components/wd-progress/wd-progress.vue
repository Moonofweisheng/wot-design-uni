<template>
  <view :class="`wd-progress ${customClass}`">
    <!--进度条-->
    <view class="wd-progress__outer">
      <view :class="`wd-progress__inner ${progressClass}`" :style="rootStyle"></view>
    </view>
    <!--文案、图标-->
    <view v-if="!hideText" class="wd-progress__label">{{ percentage }}%</view>
    <wd-icon
      v-else-if="status"
      :custom-class="`wd-progress__label wd-progress__icon ${progressClass}`"
      :name="status == 'danger' ? 'close-outline' : 'check-outline'"
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
import { computed, ref, watch } from 'vue'
import { checkNumRange, isArray, objToStyle } from '../common/util'

type ProgressStatus = 'success' | 'danger' // 状态类型

interface Props {
  customClass?: string
  percentage: number
  hideText?: boolean
  color?: string | string[] | Record<string, any>[]
  duration: number
  status?: ProgressStatus
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  percentage: 0,
  hideText: false,
  color: 'linear-gradient(315deg, rgba(81,124,240,1) 0%,rgba(118,158,245,1) 100%)',
  duration: 30
})

// 进度条展示的颜色
const showColor = ref<string>('')
// 进度条展示的进度
const showPercent = ref<number>(0)
// newPercent - oldPercent 的绝对值
const changeCount = ref<number>(0)
const progressClass = ref<string>('')

let timer: NodeJS.Timeout | null = null // 定时器

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {
    background: showColor.value,
    width: showPercent.value + '%',
    'transition-duration': changeCount.value * props.duration * 0.001 + 's'
  }
  return objToStyle(style)
})

watch(
  () => props.percentage,
  (newValue) => {
    // 校验类型
    if (Number.isNaN(newValue) || newValue < 0 || newValue > 100) {
      throw Error('The value of percentage must be between 0 and 100')
    }
    controlProgress()
  }
)

watch(
  () => props.color,
  () => {
    controlProgress()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.status,
  () => {
    computeProgressClass()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.duration,
  (newValue) => {
    checkNumRange(newValue)
  },
  {
    deep: true,
    immediate: true
  }
)

function computeProgressClass() {
  const { status } = props
  let progressClasses: string[] = []
  status && progressClasses.push(`is-${status}`)
  progressClass.value = progressClasses.join(' ')
}

/**
 * @description
 * @param {Number} targetPercent 目标值
 * @param {String} color 目标颜色
 */
function update(targetPercent: number, color: string) {
  // 需要等上一个定时器跑完
  if (timer) return
  const { duration } = props
  // transition-duration的优先更高
  changeCount.value = Math.abs(targetPercent - showPercent.value)
  setTimeout(() => {
    showPercent.value = targetPercent
    showColor.value = color
    timer = setTimeout(() => {
      clearTimeout(timer as any)
      timer = null
      controlProgress()
    }, changeCount.value * duration)
  }, 50)
}

/**
 * @description 控制进度条的进度和每段的颜色
 */
function controlProgress() {
  const {
    // 目标百分比
    percentage,
    // 传入的color数组
    color
  } = props
  // 锁
  if (showPercent.value === percentage || !percentage) return
  /**
   * 数组边界安全判断
   */
  let colorArray: string[] | Record<string, any>[] = (isArray(color) ? color : [color]) as string[] | Record<string, any>[]
  if (colorArray.length === 0) throw Error('The colorArray is empty')
  const isStrArray = (colorArray as any).every((item) => typeof item === 'string')
  // eslint-disable-next-line no-prototype-builtins
  const isObjArray = (colorArray as any).every((color) => color.hasOwnProperty('color') && color.hasOwnProperty('percentage'))
  if (!isStrArray && !isObjArray) {
    throw Error('Color must be String or Object with color and percentage')
  }
  if (isObjArray && (colorArray as any).some(({ percentage }) => Number.isNaN(parseInt(percentage)))) {
    throw Error('All the percentage must can be formatted to Number')
  }
  /**
   * 根据colorArray平均分布每段color值，或使用用户自定义的值
   */
  const partNum = parseInt(`${100 / colorArray.length}`)
  const partList = isObjArray
    ? colorArray.sort((a, b) => a.percentage - b.percentage)
    : colorArray.map((item, index) => {
        return {
          color: item,
          percentage: (index + 1) * partNum
        }
      })
  /**
   * 找到当前目标
   */
  showPercent.value > percentage
    ? // 减小不加动画，找到第一个比target大的锚点，取锚点颜色并设置target值
      partList.some((part) => {
        if (percentage <= part.percentage) {
          update(percentage, part.color)
          return true
        }
      })
    : // 增加使用分段动画
      partList.some((part, index) => {
        if (showPercent.value < part.percentage && part.percentage <= percentage) {
          // 找到第一个比now大的点，如果这个点比target小或等，就把这个点设置为下一个即将展示的点
          update(part.percentage, part.color)
          return true
        } else if (index === partList.length - 1) {
          update(percentage, part.color)
        }
      })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
