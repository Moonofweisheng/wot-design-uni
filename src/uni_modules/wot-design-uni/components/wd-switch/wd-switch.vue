<template>
  <view :class="rootClass" :style="rootStyle" @click="switchValue">
    <view class="wd-switch__circle" :style="circleStyle"></view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-switch',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue'
import { getType, objToStyle } from '../common/util'

interface Props {
  modelValue: boolean | string | number
  disabled: boolean
  activeValue: boolean | string | number
  inactiveValue: boolean | string | number
  activeColor?: string
  inactiveColor?: string
  size: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeChange?: Function
  customClass: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  disabled: false,
  modelValue: false,
  activeValue: true,
  inactiveValue: false,
  size: '28px'
})

const rootClass = computed(() => {
  return `wd-switch ${props.customClass} ${props.disabled ? 'is-disabled' : ''} ${props.modelValue === props.activeValue ? 'is-checked' : ''}`
})

const rootStyle = computed(() => {
  const rootStyle: Record<string, any> = {
    'font-size': props.size,
    background: props.modelValue === props.activeValue ? props.activeColor : props.inactiveColor,
    'border-color': props.modelValue === props.activeValue ? props.activeColor : props.inactiveColor
  }
  return objToStyle(rootStyle)
})

const circleStyle = computed(() => {
  const circleStyle: string =
    (props.modelValue === props.activeValue && props.activeColor) || (props.modelValue !== props.activeValue && props.inactiveColor)
      ? 'box-shadow: none;'
      : ''
  return circleStyle
})

const emit = defineEmits(['change', 'update:modelValue'])

function switchValue() {
  if (props.disabled) return
  const newVal = props.modelValue === props.activeValue ? props.inactiveValue : props.activeValue

  if (props.beforeChange && getType(props.beforeChange) === 'function') {
    props.beforeChange({
      value: newVal,
      resolve: (pass) => {
        if (pass) {
          emit('update:modelValue', newVal)
          emit('change', {
            value: newVal
          })
        }
      }
    })
  } else {
    emit('update:modelValue', newVal)
    emit('change', {
      value: newVal
    })
  }
}

onBeforeMount(() => {
  if ([props.activeValue, props.inactiveValue].indexOf(props.modelValue) === -1) {
    emit('update:modelValue', props.inactiveValue)
    emit('change', {
      value: props.inactiveValue
    })
  }
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
