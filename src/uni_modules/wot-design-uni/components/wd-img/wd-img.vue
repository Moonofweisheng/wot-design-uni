<!--
 * @Author: weisheng
 * @Date: 2023-06-12 10:04:19
 * @LastEditTime: 2023-08-15 13:11:35
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-img\wd-img.vue
 * 记得注释
-->
<template>
  <view :class="rootClass" @click="handleClick" :style="rootStyle">
    <image :class="customImage" :src="src" :mode="mode" :lazy-load="lazyLoad" @load="handleLoad" @error="handleError" />
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

interface Props {
  customClass?: string
  customStyle?: string
  customImage?: string
  src: string
  round: boolean
  mode: string
  lazyLoad: boolean
  width?: string | number
  height?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customStyle: '',
  customImage: '',
  round: false,
  mode: 'scaleToFill',
  lazyLoad: false
})

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (isDef(props.height)) {
    style['height'] = addUnit(props.height)
  }
  if (isDef(props.width)) {
    style['width'] = addUnit(props.width)
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
