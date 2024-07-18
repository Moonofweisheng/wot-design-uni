<!--
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2024-07-11 19:13:17
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
  title?: string
  ver?: number | string
  hor?: number | string
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  customClass: '',
  ver: 10,
  hor: 15,
  transparent: false
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
  style.value = `margin: 0 ${props.hor}px;padding:${props.ver}px 0;`
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
  position: relative;
  color: #666;

  &:not(:first-child) {
    margin-top: 15px;
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }
}

.is-white {
  background: #fff;
}

.demo-title {
  padding: 10px 15px;
  font-size: 13px;
}
</style>
