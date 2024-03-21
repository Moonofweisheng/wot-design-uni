<template>
  <view :class="rootClass" :style="customStyle" />
</template>

<script lang="ts">
const componentName = 'wd-safe-area'
export default {
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed } from 'vue'
import { safeareaProps } from './types'
const props = defineProps(safeareaProps)

const rootClass = computed(() => {
  return `${componentName} ${componentName}-position-${props.position} ${props.customClass}`
})
</script>

<style lang="scss">
@import './index';
</style>
