<template>
  <view :class="`wd-input-number ${customClass} ${disabled ? 'is-disabled' : ''} ${withoutInput ? 'is-without-input' : ''}`" :style="customStyle">
    <view :class="`wd-input-number__action ${minDisabled || disableMinus ? 'is-disabled' : ''}`" @click="sub">
      <slot name="left-icon" :value="inputValue">
        <wd-icon name="decrease" custom-class="wd-input-number__action-icon"></wd-icon>
      </slot>
    </view>
    <view v-if="!withoutInput" class="wd-input-number__inner" @click.stop="">
      <input
        class="wd-input-number__input"
        :style="`${inputWidth ? 'width: ' + inputWidth : ''}`"
        type="digit"
        :disabled="disabled || disableInput"
        v-model="inputValue"
        :placeholder="placeholder"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <view class="wd-input-number__input-border"></view>
    </view>
    <view :class="`wd-input-number__action ${maxDisabled || disablePlus ? 'is-disabled' : ''}`" @click="add">
      <slot name="right-icon" :value="inputValue">
        <wd-icon name="add" custom-class="wd-input-number__action-icon"></wd-icon>
      </slot>
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
import { ref, watch } from 'vue'
import { debounce, isDef, isEqual } from '../common/util'
import { inputNumberProps } from './types'

const props = defineProps(inputNumberProps)
const emit = defineEmits(['focus', 'blur', 'change', 'update:modelValue'])

const minDisabled = ref<boolean>(false)
const maxDisabled = ref<boolean>(false)
const inputValue = ref<string | number>('') // 输入框的值

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
    splitDisabled(newValue)
  },
  { immediate: true, deep: true }
)

watch(
  [() => props.max, () => props.min],
  () => {
    updateBoundary()
  },
  { immediate: true, deep: true }
)

watch(
  () => props.disabled,
  (newValue) => {
    minDisabled.value = newValue
    maxDisabled.value = newValue
  },
  { immediate: true, deep: true }
)

function updateBoundary() {
  debounce(() => {
    const value = formatValue(inputValue.value)
    if (!isEqual(inputValue.value, value)) {
      setValue(value)
    }
    splitDisabled(value)
  }, 30)()
}

function splitDisabled(value: number | string) {
  const { disabled, min, max, step } = props
  minDisabled.value = disabled || Number(value) <= min || changeStep(value, -step) < min
  maxDisabled.value = disabled || Number(value) >= max || changeStep(value, step) > max
}

function toPrecision(value: number) {
  return Number(parseFloat(`${Math.round(value * Math.pow(10, props.precision)) / Math.pow(10, props.precision)}`).toFixed(props.precision))
}

function getPrecision(value?: number) {
  if (value === undefined) return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1
  }
  return precision
}

function toStrictlyStep(value: number | string) {
  const stepPrecision = getPrecision(props.step)
  const precisionFactory = Math.pow(10, stepPrecision)
  return (Math.round(Number(value) / props.step) * precisionFactory * props.step) / precisionFactory
}

function setValue(value: string | number, change: boolean = true) {
  if (props.allowNull && (!isDef(value) || value === '')) {
    dispatchChangeEvent(value, change)
    return
  }

  if (props.stepStrictly) {
    value = toStrictlyStep(value)
  }
  if ((value || value === 0) && props.precision !== undefined) {
    value = toPrecision(Number(value))
  }
  if (Number(value) > props.max) value = toPrecision(props.max)
  if (Number(value) < props.min) value = toPrecision(props.min)

  dispatchChangeEvent(value, change)
}

function changeStep(val: string | number, step: number) {
  val = Number(val)

  if (isNaN(val)) {
    return props.min
  }

  const precisionFactory = Math.pow(10, props.precision)
  return toPrecision((val * precisionFactory + step * precisionFactory) / precisionFactory)
}

function sub() {
  if (minDisabled.value || props.disableMinus) return

  const newValue = changeStep(inputValue.value, -props.step)
  dispatchChangeEvent(newValue)
}

function add() {
  if (maxDisabled.value || props.disablePlus) return

  const newValue = changeStep(inputValue.value, props.step)
  dispatchChangeEvent(newValue)
}

function handleInput(event: any) {
  const value = event.detail.value || ''
  dispatchChangeEvent(value)
}

function handleFocus(event: any) {
  emit('focus', event.detail)
}

function handleBlur() {
  const value = formatValue(inputValue.value)
  if (!isEqual(inputValue.value, value)) {
    setValue(value)
  }
  emit('blur', {
    value
  })
}

function dispatchChangeEvent(value: string | number, change: boolean = true) {
  if (isEqual(inputValue.value, value)) {
    return
  }
  inputValue.value = value
  change && emit('update:modelValue', inputValue.value)
  change && emit('change', { value })
}

function formatValue(value: string | number) {
  if (props.allowNull && (!isDef(value) || value === '')) {
    return ''
  }

  value = Number(value)

  if (isNaN(value)) {
    value = props.min
  }

  if (props.stepStrictly) {
    value = toStrictlyStep(value)
  }

  if (props.precision !== undefined) {
    value = value.toFixed(props.precision)
  }

  return Number(value)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
