<template>
  <view :class="`wd-loading-page ${props.customClass}`">
    <wd-overlay :show="props.loading" :style="`--wot-overlay-bg:${props.bgColor}`">
      <slot v-if="$slots.default"></slot>
      <view class="wrapper" v-else>
        <view v-if="props.loadingImage">
          <image class="" :src="props.loadingImage" mode="aspectFill"></image>
        </view>
        <wd-loading :color="props.loadingColor" v-else />
        <view class="wd-loading-page-text" :style="textStyle">{{ props.loadingText }}</view>
      </view>
    </wd-overlay>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-loading-page',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, type CSSProperties } from 'vue'
import { objToStyle, addUnit, isDef } from '../common/util'
import { loadingPageProps } from './types'

const props = defineProps(loadingPageProps)

//  计算样式
const textStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.fontSize)) {
    style.fontSize = addUnit(props.fontSize)
  }
  if (isDef(props.color)) {
    style.color = props.color
  }
  return `${objToStyle(style)}; ${props.customStyle}`
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  .wd-loading-page-text {
    margin: var(--wd-loading-page-text-margin, 8px 0 0 0);
  }
}
</style>
