<template>
  <view :class="`wd-password-input ${customClass}`" :style="customStyle">
    <view @touchstart="onTouchStart" class="wd-password-input__security">
      <view
        v-for="(_, index) in length"
        :key="index"
        :class="`wd-password-input__item ${gutter ? '' : 'is-border'}`"
        :style="{ marginLeft: index !== 0 && gutter ? addUnit(gutter) : 0 }"
      >
        <view v-if="focused && index === modelValue.length" class="wd-password-input__cursor"></view>
        <view v-else :class="`wd-password-input__value`">
          <view :style="{ visibility: mask && modelValue[index] ? 'visible' : 'hidden' }" class="wd-password-input__mask"></view>
          <text v-if="!mask && modelValue[index]">{{ modelValue[index] }}</text>
        </view>
      </view>
    </view>
    <view v-if="info || errorInfo" :class="`wd-password-input__info ${errorInfo ? 'is-error' : ''}`">
      {{ errorInfo || info }}
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-password-input',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { addUnit } from '../common/util'
import { passwordInputProps } from './types'

defineProps(passwordInputProps)

const emit = defineEmits(['focus'])

function onTouchStart(event: Event) {
  emit('focus', event)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
