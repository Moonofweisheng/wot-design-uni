<template>
  <view :class="rootClass" :style="customStyle">
    <!-- #ifdef MP-DINGTALK -->
    <view style="flex: 1" :class="rootClass">
      <!-- #endif -->
      <view :class="`wd-slider__label-min ${customMinClass}`" v-if="!hideMinMax">{{ minProp }}</view>
      <view class="wd-slider__bar-wrapper" :style="wrapperStyle" :id="sliderBarWrapperId">
        <view class="wd-slider__bar" :style="barStyle">
          <template v-if="isRange">
            <!-- 左边滑块 -->
            <view
              class="wd-slider__button-wrapper wd-slider__button-wrapper--left"
              :style="sliderButtonStyle"
              @touchstart="(event) => onSliderTouchStart(event, 0)"
              @touchmove="onSliderTouchMove"
              @touchend="onSliderTouchEnd"
              @touchcancel="onSliderTouchEnd"
            >
              <view class="wd-slider__label" v-if="!hideLabel">{{ firstValue }}</view>
              <view class="wd-slider__button" />
            </view>
            <!-- 右边滑块 -->
            <view
              class="wd-slider__button-wrapper wd-slider__button-wrapper--right"
              :style="sliderButtonStyle"
              @touchstart="(event) => onSliderTouchStart(event, 1)"
              @touchmove="onSliderTouchMove"
              @touchend="onSliderTouchEnd"
              @touchcancel="onSliderTouchEnd"
            >
              <view class="wd-slider__label" v-if="!hideLabel">{{ secondValue }}</view>
              <view class="wd-slider__button" />
            </view>
          </template>
          <view
            v-else
            class="wd-slider__button-wrapper"
            :style="sliderButtonStyle"
            @touchstart="(event) => onSliderTouchStart(event, 0)"
            @touchmove="onSliderTouchMove"
            @touchend="onSliderTouchEnd"
            @touchcancel="onSliderTouchEnd"
          >
            <view class="wd-slider__label" v-if="!hideLabel">{{ firstValue }}</view>
            <view class="wd-slider__button" />
          </view>
        </view>
      </view>
      <view :class="`wd-slider__label-max ${customMaxClass}`" v-if="!hideMinMax">
        {{ maxProp }}
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
import { computed, type CSSProperties, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { deepClone, getRect, isArray, isDef, isEqual, objToStyle, uuid } from '../common/util'
import { useTouch } from '../composables/useTouch'
import { sliderProps, type SliderExpose, type SliderEmits, type SliderDragEvent, type SliderValue } from './types'

const props = defineProps(sliderProps)
const emit = defineEmits<SliderEmits>()

// ----------- 基础状态 -----------
const sliderBarWrapperId = ref<string>(`sliderBarWrapperId${uuid()}`)
const touch = useTouch()
const touchIndex = ref<number>(0)
const { proxy } = getCurrentInstance() as any

// ----------- 轨道尺寸状态 -----------
const trackWidth = ref<number>(0)
const trackLeft = ref<number>(0)

// ----------- 值相关状态 -----------
/**
 * 最小值 - 直接使用props，减少状态同步
 */
const minProp = computed(() => props.min)

/**
 * 最大值 - 直接使用props，减少状态同步
 */
const maxProp = computed(() => props.max)

/**
 * 步长值 - 直接使用props，减少状态同步
 */
const stepProp = computed(() => {
  if (props.step <= 0) {
    console.warn('[wot ui] warning(wd-slider): step must be greater than 0')
    return 1
  }
  return props.step
})

const startValue = ref<SliderValue>(0)
const modelValue = ref<SliderValue>(getInitValue())

// ----------- 计算属性 -----------

/**
 * 是否为双滑块模式
 */
const isRange = computed(() => isArray(modelValue.value))

/**
 * 计算滑块的取值范围大小
 */
const scope = computed(() => maxProp.value - minProp.value)

/**
 * 获取左侧滑块的值
 */
const firstValue = computed(() => (isRange.value ? (modelValue.value as number[])[0] : (modelValue.value as number)))

/**
 * 获取右侧滑块的值（仅双滑块模式有效）
 */
const secondValue = computed(() => (isRange.value ? (modelValue.value as number[])[1] : 0))

/**
 * 根类名计算
 */
const rootClass = computed(() => {
  return `wd-slider ${!props.hideLabel ? 'wd-slider__has-label' : ''} ${props.disabled ? 'wd-slider--disabled' : ''} ${props.customClass}`
})

/**
 * 滑块按钮样式
 */
const sliderButtonStyle = computed(() => {
  return objToStyle({
    visibility: !props.disabled ? 'visible' : 'hidden'
  })
})

/**
 * 轨道包装器样式
 */
const wrapperStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.inactiveColor) {
    style.background = props.inactiveColor
  }
  return objToStyle(style)
})

/**
 * 进度条样式计算
 */
const barStyle = computed(() => {
  const style: CSSProperties = {}

  if (scope.value === 0) return objToStyle(style)

  if (isRange.value) {
    // 双滑块模式
    const [left, right] = normalizeRangeValues(modelValue.value as number[])
    style.width = `${((right - left) * 100) / scope.value}%`
    style.left = `${((left - minProp.value) * 100) / scope.value}%`
  } else {
    // 单滑块模式
    style.width = `${(((modelValue.value as number) - minProp.value) * 100) / scope.value}%`
    style.left = '0'
  }

  // 添加自定义颜色
  if (props.activeColor) {
    style.background = props.activeColor
  }

  return objToStyle(style)
})

// ----------- 监听器 -----------
/**
 * 监听 modelValue 属性变化
 */
watch(
  () => props.modelValue,
  (newValue) => {
    if (!isEqual(newValue, modelValue.value)) {
      modelValue.value = getInitValue()
    }
  },
  { deep: true }
)

/**
 * 向上发射模型值变化
 */
watch(modelValue, (newVal) => {
  emit('update:modelValue', newVal)
})

// ----------- 生命周期钩子 -----------
onMounted(() => {
  initSlider()
})

// ----------- 工具方法 -----------
/**
 * 检查组件是否处于禁用状态
 */
function isDisabled(): boolean {
  return props.disabled
}

/**
 * 限制值在指定范围内
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// ----------- 核心方法 -----------
/**
 * 初始化滑块宽度
 */
function initSlider() {
  getRect(`#${sliderBarWrapperId.value}`, false, proxy).then((data) => {
    trackWidth.value = Number(data.width)
    trackLeft.value = Number(data.left)
  })
}

/**
 * 获取初始值
 */
function getInitValue(): SliderValue {
  if (isArray(props.modelValue)) {
    return normalizeRangeValues(props.modelValue as number[])
  } else {
    return clamp(props.modelValue as number, minProp.value, maxProp.value)
  }
}

/**
 * 处理双滑块模式下的值，确保值有效
 */
function normalizeRangeValues(value: number[]): [number, number] {
  // 检查输入是否为有效的双滑块数组
  if (!Array.isArray(value) || value.length < 2) {
    console.warn('[wot ui] warning(wd-slider): range value should be an array with at least 2 elements')
    return [minProp.value, maxProp.value]
  }

  const left = clamp(value[0], minProp.value, maxProp.value)
  const right = clamp(value[1], minProp.value, maxProp.value)

  return left > right ? [right, left] : [left, right]
}

/**
 * 将值对齐到最近的步长倍数
 */
function snapValueToStep(value: number): number {
  // 确保值在范围内
  value = clamp(value, minProp.value, maxProp.value)

  // 计算最接近的步长倍数
  const steps = Math.round((value - minProp.value) / stepProp.value)

  // 计算最终值并处理精度问题
  return parseFloat((minProp.value + steps * stepProp.value).toFixed(10))
}

/**
 * 统一更新滑块值的函数
 */
function updateValue(value: SliderValue) {
  let newValue: SliderValue = deepClone(value)

  if (isArray(value)) {
    newValue = normalizeRangeValues(value as number[]).map((v) => snapValueToStep(v)) as [number, number]
  } else {
    newValue = snapValueToStep(value as number)
  }

  if (!isEqual(newValue, modelValue.value)) {
    modelValue.value = newValue
  }
}

// ----------- 事件处理 -----------
/**
 * 滑块触摸开始事件处理
 */
function onSliderTouchStart(event: any, index: number) {
  if (isDisabled()) return

  touchIndex.value = index
  touch.touchStart(event)

  // 保存触摸开始时的滑块值
  startValue.value = deepClone(modelValue.value)

  // 触发拖动开始事件
  emit('dragstart', { value: modelValue.value })
}

/**
 * 滑块触摸移动事件处理
 */
function onSliderTouchMove(event: any) {
  if (isDisabled()) return

  // 更新触摸状态
  touch.touchMove(event)

  // 计算滑动距离对应的值变化
  const diff = (touch.deltaX.value / trackWidth.value) * scope.value
  let newValue = deepClone(startValue.value)

  if (isArray(newValue)) {
    ;(newValue as number[])[touchIndex.value] += diff
  } else {
    newValue = (newValue as number) + diff
  }

  updateValue(newValue)

  // 触发拖动事件
  emit('dragmove', { value: modelValue.value })
}

/**
 * 滑块触摸结束事件处理
 */
function onSliderTouchEnd() {
  if (isDisabled()) return

  emit('dragend', { value: modelValue.value })
}

defineExpose<SliderExpose>({
  initSlider
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
