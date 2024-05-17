<template>
  <view :class="rootClass" @click="handleClick" :style="rootStyle">
    <image
      :class="`wd-img__image ${customImage}`"
      :style="status !== 'success' ? 'width: 0;height: 0;' : ''"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      @load="handleLoad"
      @error="handleError"
    />
    <slot v-if="status === 'loading'" name="loading"></slot>
    <slot v-if="status === 'error'" name="error"></slot>
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
import { computed, ref } from 'vue'
import { addUnit, isDef, objToStyle } from '../common/util'
import { imgProps } from './types'

const props = defineProps(imgProps)
const emit = defineEmits(['error', 'click', 'load'])

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

const status = ref<'loading' | 'error' | 'success'>('loading')

function handleError(event: Event) {
  status.value = 'error'
  emit('error', event)
}
function handleClick() {
  if (props.enablePreview && props.src) {
    uni.previewImage({
      urls: [props.src]
    })
  }
  emit('click')
}
function handleLoad(event: Event) {
  status.value = 'success'
  emit('load', event)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
