<template>
  <view :class="['demo-block', transparent ? '' : 'is-white', 'custom-class']">
    <view class="demo-title">{{ title }}</view>
    <view class="demo-container" :style="transparent ? '' : style">
      <slot />
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  title: string
  ver: number
  hor: number
  transparent: boolean
}

const props = withDefaults(defineProps<Props>(), {
  ver: 10,
  hor: 15
})

const style = ref<string>('')

watch(
  [() => props.ver, () => props.hor],
  () => {
    setStyle()
  },
  { deep: true, immediate: true }
)

function setStyle() {
  style.value = `margin: ${props.ver}px ${props.hor}px`
}
</script>
<style lang="scss" scoped>
.demo-block {
  margin: 15px 0;
  color: #666;
  overflow: hidden;
}
.is-white {
  background: #fff;
}
.demo-title {
  padding: 0 15px;
  margin: 10px 0;
  font-size: 13px;
}
</style>
