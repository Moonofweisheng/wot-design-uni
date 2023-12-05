<template>
  <view :style="{ background: bgColor }" :class="[customClass]">
    <view :style="{ height: height }"></view>
    <view v-if="safeAreaBottom" :style="{ height: 'var(--window-bottom)' }"></view>
  </view>
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
interface Props {
  bgColor?: string
  safeAreaBottom?: boolean
  customClass?: string
  height?: string
}
withDefaults(defineProps<Props>(), {
  // 背景颜色（默认transparent）
  bgColor: 'transparent',
  //额外添加底部安全区高度
  safeAreaBottom: false,
  //分割槽高度，单位rpx（默认30）
  height: '30rpx',
  customClass: ''
})
</script>
