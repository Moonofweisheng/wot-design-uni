<template>
  <view :class="`wd-drag-handle ${customClass}`" :style="customStyle" @touchstart="handleTouch">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-drag-handle',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { DRAG_SORT_ITEM_KEY } from '../wd-drag-sort-item/types'
import { useParent } from '../composables/useParent'
import { dragHandleProps } from './types'

defineProps(dragHandleProps)

const { parent } = useParent(DRAG_SORT_ITEM_KEY)

const handleTouch = (e: any) => {
  if (parent && parent.onHandleTouch) {
    parent.onHandleTouch(e)
  }
}
</script>

<style lang="scss" scoped>
.wd-drag-handle {
  display: block;
}
</style>
