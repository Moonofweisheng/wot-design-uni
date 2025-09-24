<!--
 * @Author: weisheng
 * @Date: 2025-05-08 22:54:27
 * @LastEditTime: 2025-08-28 13:04:43
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/docs/.vitepress/theme/components/CustomFooter.vue
 * 记得注释
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useData} from 'vitepress'
import { useSidebar } from 'vitepress/theme'

const { theme }:any = useData()
const { hasSidebar } = useSidebar()

const isNetlify = ref<boolean>(false)
const isWotUiDomain = ref<boolean>(false)

const copyright = computed(()=>{
  let copyrightText = theme.value.footer.copyright
  
  if (isWotUiDomain.value) {
    copyrightText += ' | <a href="https://beian.miit.gov.cn/" target="_blank" style="text-decoration: none;">沪ICP备2024070925号-4</a>'
  }
  
  if (isNetlify.value) {
    copyrightText += ' | <a style="text-decoration: none;" href="https://www.netlify.com">This site is powered by Netlify</a>'
  }
  
  return copyrightText
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    isNetlify.value = window.location.href.includes('netlify')
    isWotUiDomain.value = window.location.hostname.includes('wot-ui.cn')
  }
})
</script>

<template>
  <footer v-if="theme.footer" class="VPFooter" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
      <p v-if="theme.footer.message" class="message" v-html="theme.footer.message"></p>
      <p v-if="copyright" class="copyright" v-html="copyright"></p>
    </div>
  </footer>
</template>

<style scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 40px 24px 32px;
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.VPFooter.has-sidebar {
  display: none;
}

.VPFooter :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 500;
}

.VPFooter :deep(a:hover) {
  color: var(--vp-c-brand-2);
  background-color: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}

.VPFooter :deep(a:active) {
  transform: translateY(0);
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 48px 32px 40px;
  }
}

@media (max-width: 767px) {
  .VPFooter {
    padding: 32px 20px 24px;
  }
  
  .message,
  .copyright {
    font-size: 13px;
    line-height: 20px;
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.message {
  line-height: 28px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  opacity: 0.9;
}

.copyright {
  line-height: 26px;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.copyright:hover {
  opacity: 1;
}
</style>
