<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const s = document.createElement('script')
  s.async = true
  s.src = `https://cdn.wwads.cn/js/makemoney.js`
  document.querySelector('.wwads-container')!.appendChild(s)
})
</script>

<template>
  <div class="wwads-container">
    <div class="wwads-cn wwads-vertical" data-id="372"></div>
  </div>
</template>

<style>
.wwads-container {
  padding: 1px 15px 10px;
  margin-top: 20px;
  background-color: var(--vt-c-bg-soft);
}
.wwads-vertical {
  background-color: transparent !important;
}
.wwads-text {
  color: var(--vt-c-text-2) !important;
}
</style>
