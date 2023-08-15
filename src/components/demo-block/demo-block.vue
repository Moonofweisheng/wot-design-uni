<!--
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2023-08-15 22:13:27
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\components\demo-block\demo-block.vue
 * 记得注释
-->
<template>
  <view :class="['demo-block', transparent ? '' : 'is-white', customClass]">
    <view class="demo-title">{{ title }}</view>
    <view class="demo-container" :style="transparent ? '' : style">
      <slot />
    </view>
  </view>
</template>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  customClass?: string
  title: string
  ver: number
  hor: number
  transparent: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
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
.wot-theme-dark {
  .is-white {
    background: $-dark-background2;
  }
  .demo-block {
    color: $-dark-color3;
  }
}

.demo-block {
  margin-bottom: 15px;
  &:not(:first-child) {
    margin: 15px 0;
  }
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
