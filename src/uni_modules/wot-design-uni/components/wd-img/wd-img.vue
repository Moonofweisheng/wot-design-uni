<template>
  <view :class="rootClass" @click="handleClick" :style="rootStyle">
    <image :class="`wd-img__image ${customImage}`" :src="src" :mode="mode" :lazy-load="lazyLoad" @load="handleLoad" @error="handleError" />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-img',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { addUnit, isDef, objToStyle } from '../common/util'
import { imgProps } from './types'

const props = defineProps(imgProps)

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (isDef(props.height)) {
    style['height'] = addUnit(props.height)
  }
  if (isDef(props.width)) {
    style['width'] = addUnit(props.width)
  }
  if (isDef(props.radius)) {
    style['border-radius'] = addUnit(props.radius)
    style['overflow'] = 'hidden'
  }
  return `${objToStyle(style)};${props.customStyle}`
})

const rootClass = computed(() => {
  return `wd-img  ${props.round ? 'is-round' : ''} ${props.customClass}`
})

const emit = defineEmits(['error', 'click', 'load'])

function handleError(event: Event) {
  emit('error', event)
}
function handleClick() {
  emit('click')
}
function handleLoad(event: Event) {
  emit('load', event)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
