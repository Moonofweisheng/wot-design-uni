<template>
  <view :class="`wd-input-number ${customClass} ${disabled ? 'is-disabled' : ''} ${withoutInput ? 'is-without-input' : ''}`" :style="customStyle">
    <!-- 减号按钮 -->
    <view :class="`wd-input-number__action ${minDisabled || disableMinus ? 'is-disabled' : ''}`" @click="sub">
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
    <view :class="`wd-input-number__action ${maxDisabled || disablePlus ? 'is-disabled' : ''}`" @click="add">
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
import { inputNumberProps } from './types'
import { callInterceptor } from '../common/interceptor'

const props = defineProps(inputNumberProps)
const emit = defineEmits(['focus', 'blur', 'change', 'update:modelValue'])
const inputValue = ref<string | number>(getInitValue()) // 输入框的值

// 减号是否禁用
const minDisabled = computed(() => {
  const value = formatValue(inputValue.value)
  const { disabled, min, step } = props
  return disabled || Number(value) <= min || changeStep(value, -step) < min
})

// 加号是否禁用
const maxDisabled = computed(() => {
  const value = formatValue(inputValue.value)
  const { disabled, max, step } = props
  return disabled || Number(value) >= max || changeStep(value, step) > max
})

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (value) => {
    updateValue(value)
  }
)

// 监听 max, min, precision 变化
watch([() => props.max, () => props.min, () => props.precision], () => {
  const value = formatValue(inputValue.value)
  updateValue(value)
})

// 判断两个值是否相等
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

// 获取值的精度
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

// 严格按照步进值递增或递减
function toStrictlyStep(value: number | string) {
  const stepPrecision = getPrecision(props.step)
  const precisionFactory = Math.pow(10, stepPrecision)
  return (Math.round(Number(value) / props.step) * precisionFactory * props.step) / precisionFactory
}

// 更新值
function updateValue(value: string | number, fromUser: boolean = false) {
  if (isValueEqual(value, inputValue.value)) {
    return
  }

  const update = () => {
    inputValue.value = value
    const formatted = formatValue(value)
    nextTick(() => {
      inputValue.value = formatted
      emit('update:modelValue', inputValue.value)
      emit('change', { value: inputValue.value })
    })
  }

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

// 改变值
function changeValue(step: number) {
  if ((step < 0 && (minDisabled.value || props.disableMinus)) || (step > 0 && (maxDisabled.value || props.disablePlus))) return
  const value = changeStep(inputValue.value, step)
  updateValue(value, true)
}

// 减少值
function sub() {
  changeValue(-props.step)
}

// 增加值
function add() {
  changeValue(props.step)
}

// 处理输入事件
function handleInput(event: any) {
  let value = event.detail.value || ''
  updateValue(value, true)
}

// 处理聚焦事件
function handleFocus(event: any) {
  emit('focus', event.detail)
}

// 处理失焦事件
function handleBlur(event: any) {
  const value = event.detail.value || ''
  updateValue(value, true)
  emit('blur', {
    value
  })
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
