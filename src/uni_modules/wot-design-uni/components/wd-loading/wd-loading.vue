<template>
  <view :class="`wd-loading ${props.customClass}`" :style="rootStyle">
    <view class="wd-loading__body">
      <view class="wd-loading__svg" :style="`background-image: url(${svg});`"></view>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-loading',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch, type CSSProperties } from 'vue'
import base64 from '../common/base64'
import { gradient, context, objToStyle, addUnit, isDef } from '../common/util'
import { loadingProps, type LoadingType } from './types'

const svgDefineId = context.id++
const svgDefineId1 = context.id++
const svgDefineId2 = context.id++

/** svg 字符串生成器 */
const icon: Record<LoadingType, (color: string, intermediateColor?: string) => string> = {
  outline(color = '#4D80F0') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="${svgDefineId}"><stop stop-color="#FFF" offset="0%" stop-opacity="0"/><stop stop-color="#FFF" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${color}"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#${svgDefineId}) " stroke-width="3.5" stroke-linecap="round"/></g></svg>`
  },
  ring(color = '#4D80F0', intermediateColor = '#a6bff7') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="${svgDefineId1}" gradientUnits="userSpaceOnUse" x1="50" x2="50" y2="180"><stop offset="0" stop-color="${color}"></stop> <stop offset="1" stop-color="${intermediateColor}"></stop></linearGradient> <path fill="url(#${svgDefineId1})" d="M20 100c0-44.1 35.9-80 80-80V0C44.8 0 0 44.8 0 100s44.8 100 100 100v-20c-44.1 0-80-35.9-80-80z"></path> <linearGradient id="${svgDefineId2}" gradientUnits="userSpaceOnUse" x1="150" y1="20" x2="150" y2="180"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop> <stop offset="1" stop-color="${intermediateColor}"></stop></linearGradient> <path fill="url(#${svgDefineId2})" d="M100 0v20c44.1 0 80 35.9 80 80s-35.9 80-80 80v20c55.2 0 100-44.8 100-100S155.2 0 100 0z"></path> <circle cx="100" cy="10" r="10" fill="${color}"></circle></svg>`
  },
  spinner(color = '#4D80F0') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M960 576h-128c-35.392 0-64-28.608-64-64a64 64 0 0 1 64-64h128a64 64 0 0 1 64 64c0 35.392-28.608 64-64 64z m-176.512-244.992c-25.024 25.024-65.472 25.024-90.496 0s-25.024-65.472 0-90.496l90.496-90.56a64 64 0 1 1 90.496 90.56l-90.496 90.496zM512 1024a64 64 0 0 1-64-64v-128a64.021333 64.021333 0 0 1 128 0v128c0 35.392-28.608 64-64 64z m0-768a64 64 0 0 1-64-64V64a64.021333 64.021333 0 0 1 128 0v128c0 35.392-28.608 64-64 64zM240.448 874.048c-25.024 25.024-65.472 25.024-90.496 0s-25.024-65.536 0-90.496l90.496-90.56a64 64 0 1 1 90.496 90.56l-90.496 90.496z m0-543.04l-90.496-90.496a64 64 0 1 1 90.496-90.56l90.496 90.56a63.936 63.936 0 0 1 0 90.496 64.042667 64.042667 0 0 1-90.496 0zM256 512a64 64 0 0 1-64 64H64a64 64 0 1 1 0-128h128c35.328 0 64 28.672 64 64z m527.488 180.992l90.496 90.56c25.024 24.96 25.024 65.472 0 90.496s-65.472 25.024-90.496 0l-90.496-90.496a64 64 0 1 1 90.496-90.56z" fill="${color}"></path></svg>`
  }
}

const props = defineProps(loadingProps)

const svg = ref<string>('')
const intermediateColor = ref<string>('')
const iconSize = ref<string | number | null>(null)

watch(
  () => props.size,
  (newVal) => {
    iconSize.value = addUnit(newVal)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.type,
  () => {
    buildSvg()
  },
  {
    deep: true,
    immediate: true
  }
)

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(iconSize.value)) {
    style.height = addUnit(iconSize.value)
    style.width = addUnit(iconSize.value)
  }
  return `${objToStyle(style)} ${props.customStyle}`
})

onBeforeMount(() => {
  intermediateColor.value = gradient(props.color, '#ffffff', 2)[1]
  buildSvg()
})

function buildSvg() {
  const { type, color } = props
  /** 当前选中的加载类型 */
  const currentType: LoadingType = isDef(type) ? type : 'ring'
  const svgContent = currentType === 'ring' ? icon[currentType](color, intermediateColor.value) : icon[currentType](color)
  const svgStr = `"data:image/svg+xml;base64,${base64(svgContent)}"`
  svg.value = svgStr
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
