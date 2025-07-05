<template>
  <wd-transition
    :show="show"
    name="fade"
    custom-class="wd-overlay"
    :duration="duration"
    :custom-style="`z-index: ${zIndex}; ${customStyle}`"
    :disable-touch-move="lockScroll"
    @click="handleClick"
  >
    <slot></slot>
  </wd-transition>
</template>
<script lang="ts">
export default {
  name: 'wd-overlay',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdTransition from '../wd-transition/wd-transition.vue'
import { overlayProps } from './types'
// #ifdef H5
import useLockScroll from '../composables/useLockScroll'
// #endif

const props = defineProps(overlayProps)

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}

// #ifdef H5
useLockScroll(() => props.show && props.lockScroll)
// #endif
</script>

<style lang="scss">
@import './index.scss';
</style>
