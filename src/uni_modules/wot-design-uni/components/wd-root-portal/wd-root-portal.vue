<template>
  <!-- #ifdef H5 -->
  <!-- H5端使用 teleport -->
  <teleport to="body">
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
    <!-- #ifndef MP-DINGTALK -->
    <!-- 小程序使用 root-portal -->
    <root-portal>
      <!-- #endif -->
      <!-- #endif -->
      <view :style="configProviderStyle">
        <slot />
      </view>
      <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
      <!-- #ifndef MP-DINGTALK -->
    </root-portal>
    <!-- #endif -->
    <!-- #endif -->
    <!-- #ifdef H5 -->
  </teleport>
  <!-- #endif -->
</template>
<script lang="ts">
export default {
  name: 'wd-root-portal',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useParent } from '../composables/useParent'
import { USE_CONFIG_PROVIDER_KEY } from '../composables/useConfigProvider'
import { CONFIG_PROVIDER_KEY, type ConfigProviderProvide } from '../wd-config-provider/types'

const None = Symbol('None')
const hooksProvider = inject<ConfigProviderProvide | typeof None>(USE_CONFIG_PROVIDER_KEY, None)
const { parent: configProvider } = useParent(CONFIG_PROVIDER_KEY)

const configProviderStyle = computed(() => {
  console.log(hooksProvider !== None ? hooksProvider.themeStyle.value || '' : configProvider?.themeStyle.value || '')

  return hooksProvider !== None ? hooksProvider.themeStyle.value || '' : configProvider?.themeStyle.value || ''
})
</script>

<!-- #ifdef APP-PLUS -->
<script module="render" lang="renderjs">
export default {
  mounted() {
    if (this.$ownerInstance.$el) {
      (document.querySelector('uni-app') || document.body).appendChild(this.$ownerInstance.$el)
    }
  },
  beforeDestroy() {
    // 清理，将元素移回原位置
    if (this.$ownerInstance.$el) {
      (document.querySelector('uni-app') || document.body).removeChild(this.$ownerInstance.$el)
    }
  }
}
</script>
<!-- #endif -->
