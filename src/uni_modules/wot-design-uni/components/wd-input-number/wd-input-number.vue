<template>
  <view :class="`wd-input-number ${customClass} ${disabled ? 'is-disabled' : ''} ${withoutInput ? 'is-without-input' : ''}`" :style="customStyle">
    <!-- 减号按钮 -->
    <view
      :class="`wd-input-number__action ${minDisabled || disableMinus ? 'is-disabled' : ''}`"
      @click="handleClick('sub')"
      @touchstart="handleTouchStart('sub')"
      @touchend.stop="handleTouchEnd"
    >
      <wd-icon name="decrease" custom-class="wd-input-number__action-icon"></wd-icon>
    </view>
    <!-- 输入框 -->
    <view v-if="!withoutInput" class="wd-input-number__inner" @click.stop="">
      <input
        class="wd-input-number__input"
        :style="`${inputWidth ? 'width: ' + inputWidth : ''}`"
        type="digit"
        :disabled="disabled || disableInput"
        :value="String(inputValue)"
        :placeholder="placeholder"
        :adjust-position="adjustPosition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <view class="wd-input-number__input-border"></view>
    </view>
    <!-- 加号按钮 -->
    <view
      :class="`wd-input-number__action ${maxDisabled || disablePlus ? 'is-disabled' : ''}`"
      @click="handleClick('add')"
      @touchstart="handleTouchStart('add')"
      @touchend.stop="handleTouchEnd"
    >
      <wd-icon name="add" custom-class="wd-input-number__action-icon"></wd-icon>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-input-number',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, nextTick, ref, watch } from 'vue'
import { isDef, isEqual } from '../common/util'
import { inputNumberProps, InputNumberEventType, type OperationType } from './types'
import { callInterceptor } from '../common/interceptor'

const props = defineProps(inputNumberProps)
const emit = defineEmits(['focus', 'blur', 'change', 'update:modelValue'])
const inputValue = ref<string | number>(getInitValue()) // 输入框的值
let longPressTimer: ReturnType<typeof setTimeout> | null = null // 长按定时器

/**
 * 判断数字是否达到最小值限制
 */
const minDisabled = computed(() => {
  const value = formatValue(inputValue.value)
  const { disabled, min, step } = props
  return disabled || Number(value) <= min || changeStep(value, -step) < min
})

/**
 * 判断数字是否达到最大值限制
 */
const maxDisabled = computed(() => {
  const value = formatValue(inputValue.value)
  const { disabled, max, step } = props
  return disabled || Number(value) >= max || changeStep(value, step) > max
})

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (value) => {
    updateValue(value, InputNumberEventType.Watch)
  }
)

// 监听 max, min, precision 变化
watch([() => props.max, () => props.min, () => props.precision], () => {
  const value = formatValue(inputValue.value)
  updateValue(value, InputNumberEventType.Watch)
})

/**
 * 对比两个值是否相等
 * @param value1 第一个值
 * @param value2 第二个值
 * @returns 是否相等
 */
function isValueEqual(value1: number | string, value2: number | string) {
  return isEqual(String(value1), String(value2))
}

// 获取初始值
function getInitValue() {
  const formatted = formatValue(props.modelValue)
  if (!isValueEqual(formatted, props.modelValue)) {
    emit('update:modelValue', formatted)
  }
  return formatted
}

// 将值转换为指定精度
function toPrecision(value: number) {
  const precision = Number(props.precision)
  return Number(parseFloat(`${Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)}`).toFixed(precision))
}

/**
 * 获取数字的小数位数
 * @param value 需要计算精度的数字
 * @returns 小数位数
 */
function getPrecision(value?: number) {
  if (!isDef(value)) return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1
  }
  return precision
}

/**
 * 按步进值严格递增或递减
 * @param value 当前值
 * @returns 按步进值调整后的值
 */
function toStrictlyStep(value: number | string) {
  const stepPrecision = getPrecision(props.step)
  const precisionFactory = Math.pow(10, stepPrecision)
  return (Math.round(Number(value) / props.step) * precisionFactory * props.step) / precisionFactory
}

// 内部更新处理函数
function doUpdate(value: string | number) {
  inputValue.value = value
  const formatted = formatValue(value)
  nextTick(() => {
    inputValue.value = formatted
    emit('update:modelValue', inputValue.value)
    emit('change', { value: inputValue.value })
  })
}

/**
 * 清理输入字符串中多余的小数点
 * @param value 输入的字符串
 * @returns 清理后的字符串
 */
function cleanExtraDecimal(value: string): string {
  const precisionAllowed = Number(props.precision) > 0
  if (precisionAllowed) {
    const dotIndex = value.indexOf('.')
    if (dotIndex === -1) {
      return value
    } else {
      const integerPart = value.substring(0, dotIndex + 1)
      // 去除后续出现的'.'
      const decimalPart = value.substring(dotIndex + 1).replace(/\./g, '')
      return integerPart + decimalPart
    }
  } else {
    // 不允许小数：保留整数部分
    const dotIndex = value.indexOf('.')
    return dotIndex !== -1 ? value.substring(0, dotIndex) : value
  }
}

/**
 * 更新输入框的值
 * @param value 新的值
 * @param eventType 触发更新的事件类型
 */
function updateValue(value: string | number, eventType: InputNumberEventType = InputNumberEventType.Input) {
  const fromUser = eventType !== InputNumberEventType.Watch // watch时不认为是用户直接输入
  const forceFormat = eventType === InputNumberEventType.Blur || eventType === InputNumberEventType.Button
  // 对于 Input 和 Watch 类型，如果值以'.'结尾，则直接更新，不进行格式化
  if ((eventType === InputNumberEventType.Input || eventType === InputNumberEventType.Watch) && String(value).endsWith('.') && props.precision) {
    inputValue.value = value
    nextTick(() => {
      inputValue.value = cleanExtraDecimal(String(value))
      emit('update:modelValue', inputValue.value)
      emit('change', { value: inputValue.value })
    })
    return
  }
  if (!forceFormat && isValueEqual(value, inputValue.value)) {
    return
  }

  const update = () => doUpdate(value)

  if (fromUser) {
    callInterceptor(props.beforeChange, {
      args: [value],
      done: update
    })
  } else {
    update()
  }
}

// 根据步进值改变值
function changeStep(val: string | number, step: number) {
  val = Number(val)
  if (isNaN(val)) {
    return props.min
  }
  const precision = Math.max(getPrecision(val), getPrecision(step))
  const precisionFactor = Math.pow(10, precision)
  return toPrecision((val * precisionFactor + step * precisionFactor) / precisionFactor)
}

function changeValue(step: number) {
  if ((step < 0 && (minDisabled.value || props.disableMinus)) || (step > 0 && (maxDisabled.value || props.disablePlus))) return
  const value = changeStep(inputValue.value, step)
  updateValue(value, InputNumberEventType.Button)
}

// 增减值
function handleClick(type: OperationType) {
  const diff = type === 'add' ? props.step : -props.step
  changeValue(diff)
}

function handleInput(event: any) {
  const rawValue = event.detail.value || ''
  updateValue(rawValue, InputNumberEventType.Input)
}

function handleBlur(event: any) {
  const value = event.detail.value || ''
  updateValue(value, InputNumberEventType.Blur)
  emit('blur', { value })
}

// 每隔一段时间，重新调用自身，达到长按加减效果
function longPressStep(type: OperationType) {
  clearlongPressTimer()
  longPressTimer = setTimeout(() => {
    handleClick(type)
    longPressStep(type)
  }, 250)
}

// 按下一段时间后，达到长按状态
function handleTouchStart(type: OperationType) {
  if (!props.longPress) return
  clearlongPressTimer()
  longPressTimer = setTimeout(() => {
    handleClick(type)
    longPressStep(type)
  }, 600)
}

// 触摸结束，清除定时器，停止长按加减
function handleTouchEnd() {
  if (!props.longPress) return
  clearlongPressTimer()
}

// 清除定时器
function clearlongPressTimer() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

// 处理聚焦事件
function handleFocus(event: any) {
  emit('focus', event.detail)
}

// 格式化值
function formatValue(value: string | number) {
  if (props.allowNull && (!isDef(value) || value === '')) {
    return ''
  }

  let formatted = Number(value)

  if (isNaN(formatted)) {
    formatted = props.min
  }

  if (props.stepStrictly) {
    formatted = toStrictlyStep(value)
  }

  formatted = Math.min(Math.max(formatted, props.min), props.max)

  if (isDef(props.precision)) {
    formatted = toPrecision(formatted)
  }

  return formatted
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
