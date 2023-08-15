<!--
 * @Author: weisheng
 * @Date: 2023-08-07 18:49:03
 * @LastEditTime: 2023-08-15 23:22:19
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\components\page-wraper\page-wraper.vue
 * 记得注释
-->
<template>
  <wd-config-provider :theme="theme">
    <view class="page-wraper">
      <!-- <wd-cell title="切换暗黑" title-width="240px" center>
        <wd-switch v-model="isDark" name="switchVal" />
      </wd-cell> -->
      <slot />
    </view>
  </wd-config-provider>
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
import { computed, ref } from 'vue'
import { useDark } from '../../store'
const darkMode = useDark()
const isDark = ref<boolean>(false)

const theme = computed(() => {
  return darkMode.isDark.value || isDark.value ? 'dark' : 'light'
})
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .page-wraper {
    background: #000;
  }
}
.page-wraper {
  min-height: calc(100vh - var(--window-top));
}
</style>
