<template>
  <wd-transition
    :show="show"
    name="fade"
    custom-class="wd-overlay"
    :duration="duration"
    :custom-style="`z-index: ${zIndex}; ${customStyle}`"
    @click="handleClick"
    @touchmove.stop.prevent="lockScroll ? noop : ''"
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
import useLockScroll from '../composables/useLockScroll'

interface Props {
  show: boolean
  duration?: Record<string, number> | number | boolean
  lockScroll?: boolean
  zIndex?: number
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  lockScroll: true,
  duration: 300,
  zIndex: 10,
  customStyle: ''
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}

function noop() {}

// #ifdef H5
useLockScroll(() => props.show && props.lockScroll)
// #endif
</script>

<style lang="scss">
@import './index.scss';
</style>
