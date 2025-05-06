<template>
  <view :class="`wd-gap ${safeAreaBottom ? 'wd-gap--safe' : ''} ${customClass}`" :style="rootStyle"></view>
</template>

<script lang="ts">
export default {
  name: 'wd-gap',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { type CSSProperties, computed } from 'vue'
import { addUnit, isDef, objToStyle } from '../common/util'
import { gapProps } from './types'

const props = defineProps(gapProps)

const rootStyle = computed(() => {
  const rootStyle: CSSProperties = {}
  if (isDef(props.bgColor)) {
    rootStyle['background'] = props.bgColor
  }
  if (isDef(props.height)) {
    rootStyle['height'] = addUnit(props.height)
  }
  return `${objToStyle(rootStyle)}${props.customStyle}`
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
