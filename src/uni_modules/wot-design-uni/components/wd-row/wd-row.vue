<template>
  <view :class="`wd-row ${customClass}`" :style="style">
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
import { ref, watch } from 'vue'
import { useChildren } from '../composables/useChildren'
import { ROW_KEY, rowProps } from './types'

const props = defineProps(rowProps)
const { linkChildren } = useChildren(ROW_KEY)

linkChildren({ props })

const style = ref<string>('')

watch(
  () => props.gutter,
  () => {
    setGutter()
  },
  {
    deep: true,
    immediate: true
  }
)

function setGutter() {
  const { gutter } = props
  if (gutter < 0) {
    console.error('[wot design] warning(wd-row): attribute gutter must be greater than or equal to 0')
  }
  const margin = `${gutter / 2}px`
  const gutterStyle = gutter ? `margin-left: -${margin}; margin-right: -${margin};` : ''
  style.value = `${gutterStyle}${props.customStyle}`
}
</script>
<style lang="scss" scoped>
@import '../common/abstracts/variable';
@import '../common/abstracts/mixin';

@include b(row) {
  &::after {
    display: table;
    clear: both;
    content: '';
  }
}
</style>
