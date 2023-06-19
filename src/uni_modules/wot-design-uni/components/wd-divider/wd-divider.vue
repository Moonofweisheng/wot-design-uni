<template>
  <view class="wd-divider custom-class">
    <view class="wd-divider__line" :style="color ? 'background: ' + color : ''"></view>
    <view class="wd-divider__content" :style="color ? 'color: ' + color : ''">
      <slot></slot>
    </view>
    <view class="wd-divider__line" :style="color ? 'background: ' + color : ''"></view>
  </view>
</template>

<script lang="ts" setup>
interface Props {
  color: string
}

const props = withDefaults(defineProps<Props>(), {
  color: ''
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
