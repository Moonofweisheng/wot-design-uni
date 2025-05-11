<template>
  <view :class="`wd-row ${customClass}`" :style="rowStyle">
    <!-- 每一行 -->
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-row',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'
import { useChildren } from '../composables/useChildren'
import { ROW_KEY, rowProps } from './types'
import { addUnit, objToStyle } from '../common/util'

const props = defineProps(rowProps)
const { linkChildren } = useChildren(ROW_KEY)

linkChildren({ props })

const rowStyle = computed(() => {
  const style: CSSProperties = {}
  const { gutter } = props
  if (gutter < 0) {
    console.error('[wot ui] warning(wd-row): attribute gutter must be greater than or equal to 0')
  } else if (gutter) {
    style.marginLeft = addUnit(gutter / 2)
    style.marginRight = addUnit(gutter / 2)
  }
  return `${objToStyle(style)}${props.customStyle}`
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
