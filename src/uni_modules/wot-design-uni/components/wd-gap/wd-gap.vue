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

interface Props {
  bgColor?: string
  safeAreaBottom?: boolean
  customClass?: string
  customStyle?: string
  height?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  // 背景颜色（默认transparent）
  bgColor: 'transparent',
  //额外添加底部安全区高度
  safeAreaBottom: false,
  //分割槽高度，单位px
  height: 15,
  customClass: '',
  customStyle: ''
})

const rootStyle = computed(() => {
  const rootStyle: CSSProperties = {}
  if (isDef(props.bgColor)) {
    rootStyle['background'] = props.bgColor
  }
  if (isDef(props.height)) {
    rootStyle['height'] = addUnit(props.height)
  }
  return `${objToStyle(rootStyle)};${props.customStyle}`
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
