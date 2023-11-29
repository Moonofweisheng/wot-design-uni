<template>
  <view :style="{ background: bgColor, height: height }" :class="{ 'safe-area-inset-bottom': safeAreaBottom }"></view>
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
defineProps({
  // 背景颜色（默认transparent）
  bgColor: {
    type: String,
    default: 'transparent'
  },
  //额外添加底部安全区高度
  safeAreaBottom: {
    type: Boolean,
    default: false
  },
  // 分割槽高度，单位rpx（默认30）
  height: {
    type: String,
    default: '30rpx'
  }
})
</script>

<style lang="scss" scoped>
.safe-area-inset-bottom {
  padding-bottom: var(--window-bottom);
}
</style>
