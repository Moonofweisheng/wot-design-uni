<template>
  <view :class="`wd-navbar-capsule ${customClass}`" :style="customStyle">
    <wd-icon @click="handleBack" name="chevron-left" custom-class="wd-navbar-capsule__icon" />
    <wd-icon @click="handleBackHome" name="home" custom-class="wd-navbar-capsule__icon" />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-navbar-capsule',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { navbarCapsuleProps } from './types'

const emit = defineEmits(['back', 'back-home'])
defineProps(navbarCapsuleProps)

function handleBack() {
  emit('back')
}
function handleBackHome() {
  emit('back-home')
}
</script>

<style lang="scss">
@import './index.scss';
</style>
