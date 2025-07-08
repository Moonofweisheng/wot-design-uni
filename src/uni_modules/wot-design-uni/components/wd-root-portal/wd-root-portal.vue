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
      <slot />
      <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
      <!-- #ifndef MP-DINGTALK -->
    </root-portal>
    <!-- #endif -->
    <!-- #endif -->
    <!-- #ifdef H5 -->
  </teleport>
  <!-- #endif -->
</template>
<script>
export default {
  name: 'wd-root-portal',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
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
