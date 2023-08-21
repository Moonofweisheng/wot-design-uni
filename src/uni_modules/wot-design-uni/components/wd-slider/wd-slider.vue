<template>
  <view :class="rootClass">
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
        <view class="wd-slider__label" v-if="!hideLabel">
          {{ leftNewValue }}
        </view>
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
        <view class="wd-slider__label" v-if="!hideLabel">
          {{ rightNewValue }}
        </view>
        <view class="wd-slider__button" />
      </view>
    </view>
    <view :class="`wd-slider__label-max ${customMaxClass}`" v-if="!hideMinMax">
      {{ maxValue }}
    </view>
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
import { getRect, isDef } from '../common/util'
import { useTouch } from '../mixins/useTouch'
import { watch } from 'vue'

interface Props {
  customMinClass?: string
  customMaxClass?: string
  customClass?: string
  hideMinMax: boolean
  hideLabel: boolean
  disabled: boolean
  inactiveColor: string
  activeColor: string
  max: number
  min: number
  step: number
  modelValue: number | number[]
}

const props = withDefaults(defineProps<Props>(), {
  customMinClass: '',
  customMaxClass: '',
  customClass: '',
  hideMinMax: false,
  hideLabel: false,
  disabled: false,
  inactiveColor: '#e5e5e5',
  activeColor: '',
  max: 100,
  min: 0,
  step: 1,
  modelValue: 0
})

// 存放右滑轮中的所有属性
const rightSlider = {
  startValue: 0,
  deltaX: 0,
  newValue: 0
}

const touchLeft = useTouch()
const touchRight = useTouch()

const $slider = '.wd-slider'
const showRight = ref<boolean>(false)
const barStyle = ref<string>('width: 0; height: 3px')
const barHeight = ref<string>('3px')
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
    if (newValue < 0) {
      maxValue.value = 100
      console.warn('[wot design] warning(wd-slider): max value must be greater than 0')
    } else if (newValue <= props.min) {
      maxValue.value = 100
      console.warn('[wot design] warning(wd-slider): max value must be greater than min value')
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.min,
  (newValue) => {
    if (newValue < 0) {
      minValue.value = 0
      console.warn('[wot design] warning(wd-slider): min value must be greater than 0')
    } else if (newValue <= props.min) {
      minValue.value = 0
      console.warn('[wot design] warning(wd-slider): min value must be less than max value')
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.step,
  (newValue) => {
    if (newValue <= 0) {
      stepValue.value = 1
      console.warn('[wot design] warning(wd-slider): step must be greater than 0')
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
    if (newValue === null || newValue === undefined) {
      emit('update:modelValue', oldValue)
      console.warn('[wot design] warning(wd-slider): value can nott be null or undefined')
    } else if (checkType(newValue) === 'Array' && (newValue as any).length !== 2) {
      throw Error('[wot design] warning(wd-slider): value must be dyadic array')
    } else if (checkType(newValue) !== 'Number' && checkType(newValue) !== 'Array') {
      emit('update:modelValue', oldValue)
      console.warn('[wot design] warning(wd-slider): value must be dyadic array Or Number')
    }
    currentValue.value = newValue
    // 动态传值后修改
    if (checkType(newValue) === 'Array') {
      if (equal(newValue, oldValue)) return
      showRight.value = true
      if (leftBarPercent.value <= rightBarPercent.value) {
        leftBarSlider(newValue[0])
        rightBarSlider(newValue[1])
      } else {
        leftBarSlider(newValue[1])
        rightBarSlider(newValue[0])
      }
    } else {
      if (newValue === oldValue) return
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
  getRect($slider, false, proxy).then((data: any) => {
    // trackWidth: 轨道全长
    trackWidth.value = data.width
    // trackLeft: 轨道距离左侧的距离
    trackLeft.value = data.left
  })
})

const emit = defineEmits(['dragstart', 'dragmove', 'dragend', 'update:modelValue'])

function onTouchStart(event) {
  const { disabled, modelValue } = props
  if (disabled) return
  touchLeft.touchStart(event)
  startValue.value =
    checkType(modelValue) !== 'Array'
      ? format(modelValue)
      : leftBarPercent.value < rightBarPercent.value
      ? format(modelValue[0])
      : format(modelValue[1])
  emit('dragstart', {
    value: currentValue.value
  })
}
function onTouchMove(event) {
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
function onTouchStartRight(event) {
  if (props.disabled) return
  const { modelValue } = props
  // 右滑轮移动时数据绑定
  touchRight.touchStart(event)
  // 记录开始数据值
  rightSlider.startValue = leftBarPercent.value < rightBarPercent.value ? format(modelValue[1]) : format(modelValue[0])
  emit('dragstart', {
    value: currentValue.value
  })
}
function onTouchMoveRight(event) {
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
function rightBarSlider(value) {
  value = format(value)
  const rightBarPercentTemp = ((value - minValue.value) / (maxValue.value - minValue.value)) * 100
  rightNewValue.value = value
  emit('update:modelValue', [Math.min(leftNewValue.value, rightNewValue.value), Math.max(leftNewValue.value, rightNewValue.value)])
  rightBarPercent.value = format(rightBarPercentTemp)
  styleControl()
}
/**
 * 控制左滑轮滑动，更新渲染数据，对 value 进行校验取整
 * @param {Number} value 当前滑轮绑定值
 */
function leftBarSlider(value) {
  value = format(value)

  // 把 value 转换成百分比
  const percent = ((value - minValue.value) / (maxValue.value - minValue.value)) * 100
  if (!showRight.value) {
    emit('update:modelValue', value)
    leftNewValue.value = value
    leftBarPercent.value = percent
    barStyle.value = `width: ${percent}%; height: ${barHeight.value};`
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
  const barStyleTemp = `width: ${barLeft[1] - barLeft[0]}%; height: ${barHeight.value}; left: ${barLeft[0]}%`
  currentValue.value =
    leftNewValue.value < rightNewValue.value ? [leftNewValue.value, rightNewValue.value] : [rightNewValue.value, leftNewValue.value]
  barStyle.value = barStyleTemp
}
// 将pos转化为value
function pos2Value(pos) {
  const percent = pos / trackWidth.value
  const value = percent * (maxValue.value - minValue.value) + minValue.value
  const res = minValue.value + Math.floor((value - minValue.value) / stepValue.value) * stepValue.value
  return res
}
function checkType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
function equal(arr1, arr2) {
  if (!isDef(arr1) || !isDef(arr2)) {
    return false
  }
  let i = 0
  arr1.forEach((item, index) => {
    item === arr2[index] && i++
  })
  return i === 2
}
function format(value) {
  return Math.round(Math.max(minValue.value, Math.min(value, maxValue.value)) / stepValue.value) * stepValue.value
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
