<template>
  <view :class="`wd-divider ${customClass}`">
    <view class="wd-divider__line" :style="color ? 'background: ' + color : ''"></view>
    <view class="wd-divider__content" :style="color ? 'color: ' + color : ''">
      <slot></slot>
    </view>
    <view class="wd-divider__line" :style="color ? 'background: ' + color : ''"></view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-divider',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
interface Props {
  customClass?: string
  color: string
}

const props = withDefaults(defineProps<Props>(), {
  color: '',
  customClass: ''
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
