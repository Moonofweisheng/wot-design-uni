<template>
  <view :class="`wd-sort-button ${line ? 'wd-sort-button--line' : ''} ${customClass}`" :style="customStyle" @click="handleClick">
    <view class="wd-sort-button__wrapper">
      <view :class="`wd-sort-button__left ${modelValue !== 0 ? 'is-active' : ''}`">
        {{ title }}
      </view>
      <view :class="`wd-sort-button__right ${modelValue !== 0 ? 'is-active' : ''}`">
        <wd-icon v-if="modelValue !== 1" name="arrow-up" custom-class="wd-sort-button__icon-up" />
        <wd-icon v-if="modelValue !== -1" name="arrow-down" custom-class="wd-sort-button__icon-down" />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-sort-button',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { sortButtonProps } from './types'

const props = defineProps(sortButtonProps)

const emit = defineEmits(['change', 'update:modelValue'])

function handleClick() {
  let { modelValue: value, allowReset, descFirst } = props
  if (descFirst) {
    if (value === 0) {
      value = -1
    } else if (value === -1) {
      value = 1
    } else if (value === 1) {
      if (allowReset) {
        value = 0
      } else {
        value = -1
      }
    }
  } else {
    if (value === 0) {
      value = 1
    } else if (value === 1) {
      value = -1
    } else if (value === -1) {
      if (allowReset) {
        value = 0
      } else {
        value = 1
      }
    }
  }
  emit('update:modelValue', value)
  emit('change', {
    value
  })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
