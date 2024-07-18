<template>
  <view :class="rootClass" :style="customStyle" :id="sliderId">
    <!-- #ifdef MP-DINGTALK -->
    <view :id="sliderId" style="flex: 1" :class="rootClass">
      <!-- #endif -->
      <view :class="`wd-slider__label-min ${customMinClass}`" v-if="!hideMinMax">
        {{ minValue }}
      </view>
      <view class="wd-slider__bar-wrapper" :style="barWrapperStyle">
        <view class="wd-slider__bar" :style="barCustomStyle"></view>
        <!-- 左边 -->
        <view
          class="wd-slider__button-wrapper"
          :style="buttonLeftStyle"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
        >
          <view class="wd-slider__label" v-if="!hideLabel">{{ leftNewValue }}</view>
          <view class="wd-slider__button" />
        </view>
        <!-- 右边 -->
        <view
          v-if="showRight"
          class="wd-slider__button-wrapper"
          :style="buttonRightStyle"
          @touchstart="onTouchStartRight"
          @touchmove="onTouchMoveRight"
          @touchend="onTouchEndRight"
          @touchcancel="onTouchEndRight"
        >
          <view class="wd-slider__label" v-if="!hideLabel">{{ rightNewValue }}</view>
          <view class="wd-slider__button" />
        </view>
      </view>
      <view :class="`wd-slider__label-max ${customMaxClass}`" v-if="!hideMinMax">
        {{ maxValue }}
      </view>
      <!-- #ifdef MP-DINGTALK -->
    </view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-slider',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { getRect, isArray, isDef, isNumber, uuid } from '../common/util'
import { useTouch } from '../composables/useTouch'
import { watch } from 'vue'
import { sliderProps, type SliderExpose } from './types'

const props = defineProps(sliderProps)
const emit = defineEmits(['dragstart', 'dragmove', 'dragend', 'update:modelValue'])

// 存放右滑轮中的所有属性
const rightSlider = {
  startValue: 0,
  deltaX: 0,
  newValue: 0
}
const sliderId = ref<string>(`sliderId${uuid()}`)

const touchLeft = useTouch()
const touchRight = useTouch()

const showRight = ref<boolean>(false)
const barStyle = ref<string>('')
const leftNewValue = ref<number>(0)
const rightNewValue = ref<number>(0)
const rightBarPercent = ref<number>(0)
const leftBarPercent = ref<number>(0)
const trackWidth = ref<number>(0)
const trackLeft = ref<number>(0)
const startValue = ref<number>(0)
const currentValue = ref<number | number[]>(0)
const newValue = ref<number>(0)

const maxValue = ref<number>(100) // 最大值
const minValue = ref<number>(0) // 最小值
const stepValue = ref<number>(1) // 步长

watch(
  () => props.max,
  (newValue) => {
    if (newValue <= props.min) {
      maxValue.value = props.min // 交换最大值和最小值
      minValue.value = newValue
      console.warn('[wot design] warning(wd-slider): max value must be greater than min value')
    } else {
      maxValue.value = newValue // 更新最大值
    }
    calcBarPercent()
  },
  { immediate: true }
)

watch(
  () => props.min,
  (newValue) => {
    if (newValue >= props.max) {
      minValue.value = props.max // 交换最小值和最大值
      maxValue.value = newValue
      console.warn('[wot design] warning(wd-slider): min value must be less than max value')
    } else {
      minValue.value = newValue // 更新最小值
    }
    calcBarPercent()
  },
  { immediate: true }
)

watch(
  () => props.step,
  (newValue) => {
    if (newValue < 1) {
      stepValue.value = 1
      console.warn('[wot design] warning(wd-slider): step must be greater than 0')
    } else {
      stepValue.value = Math.floor(newValue)
    }
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  (newValue) => {
    // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
    if (newValue === null || newValue === undefined) {
      emit('update:modelValue', currentValue.value)
      console.warn('[wot design] warning(wd-slider): value can nott be null or undefined')
    } else if (isArray(newValue) && newValue.length !== 2) {
      console.warn('[wot design] warning(wd-slider): value must be dyadic array')
    } else if (!isNumber(newValue) && !isArray(newValue)) {
      emit('update:modelValue', currentValue.value)
      console.warn('[wot design] warning(wd-slider): value must be dyadic array Or Number')
    }
    // 动态传值后修改
    if (isArray(newValue)) {
      if (currentValue.value && isArray(currentValue.value) && equal(newValue, currentValue.value)) return
      currentValue.value = newValue
      showRight.value = true
      if (leftBarPercent.value <= rightBarPercent.value) {
        leftBarSlider(newValue[0])
        rightBarSlider(newValue[1])
      } else {
        leftBarSlider(newValue[1])
        rightBarSlider(newValue[0])
      }
    } else {
      if (newValue === currentValue.value) return
      currentValue.value = newValue
      leftBarSlider(newValue)
    }
  },
  { deep: true, immediate: true }
)

const { proxy } = getCurrentInstance() as any

const rootClass = computed(() => {
  const rootClass = `wd-slider ${!props.hideLabel ? 'wd-slider__has-label' : ''} ${props.disabled ? 'wd-slider--disabled' : ''} ${props.customClass}`
  return rootClass
})

const barWrapperStyle = computed(() => {
  const barWrapperStyle = `${props.inactiveColor ? 'background:' + props.inactiveColor : ''}`
  return barWrapperStyle
})

const barCustomStyle = computed(() => {
  const barWrapperStyle = `${barStyle.value};${props.activeColor ? 'background:' + props.activeColor : ''}`
  return barWrapperStyle
})

const buttonLeftStyle = computed(() => {
  const buttonLeftStyle = `left: ${leftBarPercent.value}%; visibility: ${!props.disabled ? 'show' : 'hidden'};`
  return buttonLeftStyle
})

const buttonRightStyle = computed(() => {
  const buttonRightStyle = `left: ${rightBarPercent.value}%; visibility: ${!props.disabled ? 'show' : 'hidden'}`
  return buttonRightStyle
})

onMounted(() => {
  initSlider()
})

/**
 * 初始化slider宽度
 */
function initSlider() {
  getRect(`#${sliderId.value}`, false, proxy).then((data) => {
    // trackWidth: 轨道全长
    trackWidth.value = Number(data.width)
    // trackLeft: 轨道距离左侧的距离
    trackLeft.value = Number(data.left)
  })
}

function onTouchStart(event: any) {
  const { disabled, modelValue } = props
  if (disabled) return
  touchLeft.touchStart(event)
  startValue.value = !isArray(modelValue)
    ? format(modelValue)
    : leftBarPercent.value < rightBarPercent.value
    ? format(modelValue[0])
    : format(modelValue[1])
  emit('dragstart', {
    value: currentValue.value
  })
}
function onTouchMove(event: any) {
  const { disabled } = props
  if (disabled) return
  touchLeft.touchMove(event)
  // 移动间距 deltaX 就是向左(-)向右(+)
  const diff = (touchLeft.deltaX.value / trackWidth.value) * (maxValue.value - minValue.value)
  newValue.value = startValue.value + diff

  // 左滑轮滑动控制
  leftBarSlider(newValue.value)
  emit('dragmove', {
    value: currentValue.value
  })
}
function onTouchEnd() {
  if (props.disabled) return
  emit('dragend', {
    value: currentValue.value
  })
}
// 右边滑轮滑动状态监听
function onTouchStartRight(event: any) {
  if (props.disabled) return
  const { modelValue } = props
  // 右滑轮移动时数据绑定
  touchRight.touchStart(event)
  // 记录开始数据值
  rightSlider.startValue = leftBarPercent.value < rightBarPercent.value ? format((modelValue as number[])[1]) : format((modelValue as number[])[0])
  emit('dragstart', {
    value: currentValue.value
  })
}
function onTouchMoveRight(event: any) {
  if (props.disabled) return
  touchRight.touchMove(event)
  // 移动间距 deltaX 就是向左向右
  const diff = (touchRight.deltaX.value / trackWidth.value) * (maxValue.value - minValue.value)
  rightSlider.newValue = format(rightSlider.startValue + diff)
  // 右滑轮滑动控制
  rightBarSlider(rightSlider.newValue)
  emit('dragmove', {
    value: currentValue.value
  })
}
function onTouchEndRight() {
  if (props.disabled) return
  emit('dragend', {
    value: currentValue.value
  })
}
/**
 * 控制右侧滑轮滑动， value校验
 * @param {Number} value 当前滑轮绑定值
 */
function rightBarSlider(value: number) {
  value = format(value)
  rightNewValue.value = value
  emit('update:modelValue', [Math.min(leftNewValue.value, rightNewValue.value), Math.max(leftNewValue.value, rightNewValue.value)])
  rightBarPercent.value = formatPercent(value)
  styleControl()
}
/**
 * 控制左滑轮滑动，更新渲染数据，对 value 进行校验取整
 * @param {Number} value 当前滑轮绑定值
 */
function leftBarSlider(value: number) {
  value = format(value)

  // 把 value 转换成百分比
  const percent = formatPercent(value)
  if (!showRight.value) {
    emit('update:modelValue', value)
    leftNewValue.value = value
    leftBarPercent.value = percent
    barStyle.value = `width: ${percent}%; `
  } else {
    leftNewValue.value = value
    leftBarPercent.value = percent
    emit('update:modelValue', [Math.min(leftNewValue.value, rightNewValue.value), Math.max(leftNewValue.value, rightNewValue.value)])
    styleControl()
  }
}
// 样式控制
function styleControl() {
  // 左右滑轮距离左边最短为当前激活条所处位置
  const barLeft =
    leftBarPercent.value < rightBarPercent.value ? [leftBarPercent.value, rightBarPercent.value] : [rightBarPercent.value, leftBarPercent.value]
  // 通过左右滑轮的间距控制 激活条宽度 barLeft[1] - barLeft[0]
  const barStyleTemp = `width: ${barLeft[1] - barLeft[0]}%;  left: ${barLeft[0]}%`
  currentValue.value =
    leftNewValue.value < rightNewValue.value ? [leftNewValue.value, rightNewValue.value] : [rightNewValue.value, leftNewValue.value]
  barStyle.value = barStyleTemp
}

function equal(arr1: number[], arr2: number[]) {
  if (!isDef(arr1) || !isDef(arr2)) {
    return false
  }
  let i = 0
  arr1.forEach((item, index) => {
    item === arr2[index] && i++
  })
  return i === 2
}
function format(value: number) {
  const formatValue = Math.round(Math.max(minValue.value, Math.min(value, maxValue.value)) / stepValue.value) * stepValue.value
  return formatValue
}

// 计算占比
function formatPercent(value: number) {
  const percentage = ((value - minValue.value) / (maxValue.value - minValue.value)) * 100
  return percentage
}
// 计算滑块位置和进度长度
function calcBarPercent() {
  const { modelValue } = props
  let value = !isArray(modelValue) ? format(modelValue) : leftBarPercent.value < rightBarPercent.value ? format(modelValue[0]) : format(modelValue[1])
  value = format(value)
  // 把 value 转换成百分比
  const percent = formatPercent(value)
  leftBarPercent.value = percent
  barStyle.value = `width: ${percent}%; `
}

defineExpose<SliderExpose>({
  initSlider
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
