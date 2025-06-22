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
        :type="inputType"
        :input-mode="precision ? 'decimal' : 'numeric'"
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
import { inputNumberProps, type OperationType } from './types'
import { callInterceptor } from '../common/interceptor'

const props = defineProps(inputNumberProps)
const emit = defineEmits<{
  /**
   * 数值变化事件
   */
  (e: 'change', value: { value: number | string }): void
  /**
   * 输入框聚焦事件
   */
  (e: 'focus', detail: any): void
  /**
   * 输入框失焦事件
   */
  (e: 'blur', value: { value: string | number }): void
  /**
   * v-model 更新事件
   */
  (e: 'update:modelValue', value: number | string): void
}>()
const inputValue = ref<string | number>(getInitValue())
let longPressTimer: ReturnType<typeof setTimeout> | null = null

/**
 * 判断数字是否达到最小值限制
 */
const minDisabled = computed(() => {
  const val = toNumber(inputValue.value)
  return props.disabled || val <= props.min || addStep(val, -props.step) < props.min
})

/**
 * 判断数字是否达到最大值限制
 */
const maxDisabled = computed(() => {
  const val = toNumber(inputValue.value)
  return props.disabled || val >= props.max || addStep(val, props.step) > props.max
})

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = formatValue(val)
  }
)

// 监听 max, min, precision 变化时重新格式化当前值
watch([() => props.max, () => props.min, () => props.precision], () => {
  const val = toNumber(inputValue.value)
  inputValue.value = formatValue(val)
})

/**
 * 获取初始值
 */
function getInitValue() {
  if (!props.updateOnInit) {
    // 不自动修正时，仅做显示格式化，不修正值
    return formatDisplay(props.modelValue)
  }

  const formatted = formatValue(props.modelValue)

  // 如果格式化后的值与原始值不同，同步到外部
  if (!isEqual(String(formatted), String(props.modelValue))) {
    emit('update:modelValue', formatted)
  }
  return formatted
}

/**
 * 获取数字的小数位数
 */
function getPrecision(val?: number) {
  if (!isDef(val)) return 0
  const str = val.toString()
  const dotIndex = str.indexOf('.')
  return dotIndex === -1 ? 0 : str.length - dotIndex - 1
}

/**
 * 按指定精度处理数值
 */
function toPrecision(val: number) {
  const precision = Number(props.precision)
  return Math.round(val * Math.pow(10, precision)) / Math.pow(10, precision)
}

/**
 * 将字符串或数字转换为标准数值
 */
function toNumber(val: string | number): number {
  // 空值处理
  if (props.allowNull && (!isDef(val) || val === '')) {
    return NaN
  }

  if (!isDef(val) || val === '') {
    return props.min
  }

  let str = String(val)

  // 处理中间输入状态
  if (str.endsWith('.')) str = str.slice(0, -1)
  if (str.startsWith('.')) str = '0' + str
  if (str.startsWith('-.')) str = '-0' + str.substring(1)
  if (str === '-' || str === '') return props.min

  let num = Number(str)
  if (isNaN(num)) num = props.min

  return normalizeValue(num)
}

/**
 * 标准化数值（应用步进、边界、精度规则）
 */
function normalizeValue(val: number): number {
  let result = val

  // 严格步进
  if (props.stepStrictly) {
    const stepPrecision = getPrecision(props.step)
    const factor = Math.pow(10, stepPrecision)
    result = (Math.round(result / props.step) * factor * props.step) / factor
  }

  // 边界限制
  if (props.stepStrictly) {
    result = applyStrictBounds(result, props.min, props.max)
  } else {
    result = Math.min(Math.max(result, props.min), props.max)
  }

  // 精度处理
  if (isDef(props.precision)) {
    result = toPrecision(result)
  }

  return result
}

/**
 * 严格步进模式下的边界处理
 */
function applyStrictBounds(val: number, min: number, max: number): number {
  if (val >= min && val <= max) return val

  const stepPrecision = getPrecision(props.step)
  const factor = Math.pow(10, stepPrecision)

  if (val < min) {
    const minSteps = Math.ceil((min * factor) / (props.step * factor))
    const candidate = toPrecision((minSteps * props.step * factor) / factor)
    if (candidate > max) {
      const maxSteps = Math.floor((max * factor) / (props.step * factor))
      return toPrecision((maxSteps * props.step * factor) / factor)
    }
    return candidate
  }

  if (val > max) {
    const maxSteps = Math.floor((max * factor) / (props.step * factor))
    const candidate = toPrecision((maxSteps * props.step * factor) / factor)
    if (candidate < min) {
      const minSteps = Math.ceil((min * factor) / (props.step * factor))
      return toPrecision((minSteps * props.step * factor) / factor)
    }
    return candidate
  }

  return val
}

/**
 * 格式化值用于显示（包含修正逻辑）
 */
function formatValue(val: string | number): string | number {
  if (props.allowNull && (!isDef(val) || val === '')) {
    return ''
  }

  const num = toNumber(val)
  const precision = Number(props.precision)
  if (!isDef(props.precision)) {
    return num
  }
  return precision === 0 ? Number(num.toFixed(0)) : num.toFixed(precision)
}

/**
 * 仅做显示格式化，不包含值修正逻辑
 */
function formatDisplay(val: string | number): string | number {
  if (props.allowNull && (!isDef(val) || val === '')) {
    return ''
  }

  if (!isDef(val) || val === '') {
    return props.min
  }

  let num = Number(val)
  if (isNaN(num)) {
    return props.min
  }

  const precision = Number(props.precision)
  if (!isDef(props.precision)) {
    return num
  }
  return precision === 0 ? Number(num.toFixed(0)) : num.toFixed(precision)
}

/**
 * 检查是否为中间输入状态
 */
function isIntermediate(val: string): boolean {
  if (!val) return false
  const str = String(val)
  return str.endsWith('.') || str.startsWith('.') || str.startsWith('-.') || str === '-' || (Number(props.precision) > 0 && str.indexOf('.') === -1)
}

/**
 * 清理输入值
 */
function cleanInput(val: string): string {
  if (!val) return ''

  // 清理非数字、小数点、负号
  let cleaned = val.replace(/[^\d.-]/g, '')

  // 处理负号，保证负号只出现在最前面
  const hasNegative = cleaned.startsWith('-')
  cleaned = cleaned.replace(/-/g, '')
  if (hasNegative) cleaned = '-' + cleaned

  // 处理小数点
  const precision = Number(props.precision)
  if (precision > 0) {
    const parts = cleaned.split('.')
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('')
    }
  } else {
    cleaned = cleaned.split('.')[0]
  }

  // 处理以点开头的情况
  if (cleaned.startsWith('.')) return '0' + cleaned
  if (cleaned.startsWith('-.')) return '-0' + cleaned.substring(1)

  return cleaned
}

/**
 * 更新值并触发事件
 */
function updateValue(val: string | number) {
  // 空值处理
  if (props.allowNull && (!isDef(val) || val === '')) {
    if (isEqual('', String(props.modelValue))) {
      inputValue.value = ''
      return
    }

    const doUpdate = () => {
      inputValue.value = ''
      emit('update:modelValue', '')
      emit('change', { value: '' })
    }

    callInterceptor(props.beforeChange, { args: [''], done: doUpdate })
    return
  }

  const num = toNumber(val)
  const display = formatValue(val)

  if (isEqual(String(num), String(props.modelValue))) {
    inputValue.value = display
    return
  }

  const doUpdate = () => {
    inputValue.value = display
    emit('update:modelValue', num)
    emit('change', { value: num })
  }

  callInterceptor(props.beforeChange, { args: [num], done: doUpdate })
}

/**
 * 按步进值增减
 */
function addStep(val: string | number, step: number) {
  const num = Number(val)
  if (isNaN(num)) return normalizeValue(props.min)

  const precision = Math.max(getPrecision(num), getPrecision(step))
  const factor = Math.pow(10, precision)
  const result = (num * factor + step * factor) / factor
  return normalizeValue(result)
}

/**
 * 处理按钮点击
 */
function handleClick(type: OperationType) {
  const step = type === 'add' ? props.step : -props.step
  if ((step < 0 && (minDisabled.value || props.disableMinus)) || (step > 0 && (maxDisabled.value || props.disablePlus))) return

  const newVal = addStep(inputValue.value, step)
  updateValue(newVal)
}

/**
 * 处理输入事件
 */
function handleInput(event: any) {
  const rawVal = event.detail.value || ''

  // 立即更新显示
  inputValue.value = rawVal

  nextTick(() => {
    // 空值处理
    if (rawVal === '') {
      inputValue.value = ''
      if (props.immediateChange && props.allowNull) {
        updateValue('')
      }
      return
    }

    // 清理输入
    const cleaned = cleanInput(rawVal)

    // 中间状态处理
    if (Number(props.precision) > 0 && isIntermediate(cleaned)) {
      inputValue.value = cleaned
      return
    }

    // 正常输入处理
    inputValue.value = cleaned
    if (props.immediateChange) {
      updateValue(cleaned)
    }
  })
}

/**
 * 处理失焦事件
 */
function handleBlur(event: any) {
  const val = event.detail.value || ''
  updateValue(val)
  emit('blur', { value: val })
}

/**
 * 处理聚焦事件
 */
function handleFocus(event: any) {
  emit('focus', event.detail)
}

/**
 * 长按逻辑
 */
function longPressStep(type: OperationType) {
  clearLongPressTimer()
  longPressTimer = setTimeout(() => {
    handleClick(type)
    longPressStep(type)
  }, 250)
}

function handleTouchStart(type: OperationType) {
  if (!props.longPress) return
  clearLongPressTimer()
  longPressTimer = setTimeout(() => {
    handleClick(type)
    longPressStep(type)
  }, 600)
}

function handleTouchEnd() {
  if (!props.longPress) return
  clearLongPressTimer()
}

function clearLongPressTimer() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
