<template>
  <view :class="`wd-input-number ${customClass} ${disabled ? 'is-disabled' : ''} ${withoutInput ? 'is-without-input' : ''}`">
    <view :class="`wd-input-number__action ${minDisabled ? 'is-disabled' : ''}`" @click="sub">
      <wd-icon name="decrease" custom-class="wd-input-number__action-icon"></wd-icon>
    </view>
    <view v-if="!withoutInput" class="wd-input-number__inner">
      <input
        class="wd-input-number__input"
        :style="`${inputWidth ? 'width: ' + inputWidth : ''}`"
        type="digit"
        :disabled="disabled"
        v-model="inputValue"
        :placeholder="placeholder"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <view class="wd-input-number__input-border"></view>
    </view>
    <view :class="`wd-input-number__action ${maxDisabled ? 'is-disabled' : ''}`" @click="add">
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
import { ref, watch } from 'vue'
import { debounce, getType } from '../common/util'

interface Props {
  customClass?: string
  modelValue: number | string
  min: number
  max: number
  step: number
  stepStrictly: boolean
  precision: number
  disabled: boolean
  withoutInput: boolean
  inputWidth: string | number
  allowNull: boolean
  placeholder: string
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  min: 1,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
  stepStrictly: false,
  precision: 0,
  disabled: false,
  withoutInput: false,
  inputWidth: 36,
  allowNull: false,
  placeholder: '',
  name: ''
})

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

const emit = defineEmits(['focus', 'blur', 'change', 'update:modelValue'])

function updateBoundary() {
  debounce(() => {
    const value = formatValue(inputValue.value)
    setValue(value)
    splitDisabled(value)
  }, 30)()
}

function splitDisabled(value) {
  const { disabled, min, max, step } = props
  minDisabled.value = disabled || value <= min || changeStep(value, -step) < min
  maxDisabled.value = disabled || value >= max || changeStep(value, step) > max
}

function toPrecision(value: number) {
  return Number(parseFloat(`${Math.round(value * Math.pow(10, props.precision)) / Math.pow(10, props.precision)}`).toFixed(props.precision))
}

function getPrecision(value) {
  if (value === undefined) return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1
  }
  return precision
}

function toStrictlyStep(value) {
  const stepPrecision = getPrecision(props.step)
  const precisionFactory = Math.pow(10, stepPrecision)
  return (Math.round(value / props.step) * precisionFactory * props.step) / precisionFactory
}

function setValue(value: string | number, change: boolean = true) {
  const type = getType(value)

  if (props.allowNull && (type === 'null' || type === 'undefined' || value === '')) {
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
  if (minDisabled.value) return

  const newValue = changeStep(inputValue.value, -props.step)
  dispatchChangeEvent(newValue)
}

function add() {
  if (maxDisabled.value) return

  const newValue = changeStep(inputValue.value, props.step)
  dispatchChangeEvent(newValue)
}

function handleInput(event) {
  const value = event.detail.value || ''
  dispatchChangeEvent(value)
}

function handleFocus(event) {
  emit('focus', event.detail)
}

function handleBlur() {
  const value = formatValue(inputValue.value)
  setValue(value)
  emit('blur', {
    value
  })
}

function dispatchChangeEvent(value: string | number, change: boolean = true) {
  inputValue.value = value
  change && emit('change', { value })
  change && emit('update:modelValue', inputValue.value)
}

function formatValue(value: string | number) {
  const type = getType(value)

  if (props.allowNull && (type === 'null' || type === 'undefined' || value === '')) {
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

  return value
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
