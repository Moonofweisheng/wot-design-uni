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
import { getCurrentInstance, provide, ref, watch } from 'vue'

interface Props {
  customClass?: string
  gutter?: number
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  gutter: 0
})

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

const { proxy } = getCurrentInstance() as any
provide('$row', proxy)

function setGutter() {
  const { gutter } = props
  if (gutter < 0) {
    console.warn('[wot design] warning(wd-row): attribute gutter must be greater than or equal to 0')
  }
  const margin = `${gutter / 2}px`
  const customStyle = gutter ? `margin-left: -${margin}; margin-right: -${margin};` : ''
  style.value = customStyle
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
