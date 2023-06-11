<template>
  <view class="wd-img {{ round ? 'is-round' : '' }} custom-class" bindtap="handleClick" style="{{ style }}">
    <image class="custom-image" src="{{ src }}" mode="{{ mode }}" lazy-load="{{ lazyLoad }}" bindload="handleLoad" binderror="handleError" />
  </view>
</template>

<script lang="ts" setup>
interface Props {
  src: string
  round: boolean
  mode: string
  lazyLoad: boolean
  width: string
  height: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: null
})
</script>

<style lang="scss" scoped></style>
