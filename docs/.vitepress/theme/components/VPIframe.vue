<template>
  <!-- 主容器：根据展开状态和过渡状态添加对应类名 -->
  <div v-if="href" class="demo-model" :class="{
    'collapsed': !expanded,
    'transition-end': transitionEnd
  }" @transitionend="onTransitionEnd">
    <!-- 头部控制栏 -->
    <div class="demo-header">
      <ExternalLink :href="href" class="demo-link" :style="`${expanded ? '' : 'height:0;width:0;opacity:0'}`">
      </ExternalLink>
      <QrCode class="demo-qrcode" :src="qrcode" v-if="expanded&&qrcode"></QrCode>
      <el-icon class="expand-icon" style="cursor: pointer;" @click="toggleExpand">
        <component :is="expanded ? Fold : Expand" />
      </el-icon>
    </div>
    <!-- iframe 容器 -->
    <div class="iframe-container">
      <iframe v-if="expanded&&transitionEnd" ref="iframe" id="demo" class="iframe" scrolling="auto" frameborder="0" :src="href" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import { useRoute, useData } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'
import QrCode from './QrCode.vue'

interface Props {
  /** 是否展开状态 */
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  expanded: true
})

// 状态管理
const baseUrl = ref('')
const iframe = ref<HTMLIFrameElement | null>(null)
const transitionEnd = ref(true)

const emit = defineEmits<{
  'update:expanded': [boolean]  // 更新展开状态
  'state-change': [boolean]     // 状态变化通知
}>()

const route = useRoute()
const vitepressData = useData()

const href = computed(() => {
  const path = route.path
  const paths = path ? path.split('.')[0].split('/') : []

  if (!paths.length) return baseUrl.value

  return baseUrl.value + `pages/${kebabToCamel(paths[paths.length - 1])}/Index`
})

const qrcode = computed(() => {
  const path = route.path
  const paths = path ? path.split('.')[0].split('/') : []
  if (!paths.length) return ''
  return `/wxqrcode/${kebabToCamel(paths[paths.length - 1])}.png`
})

// 工具函数：转换 kebab-case 为 camelCase
function kebabToCamel(input: string): string {
  return input.replace(/-([a-z])/g, (match, group) => group.toUpperCase())
}

// 监听 props.expanded 变化
watch(
  () => props.expanded,
  (newVal) => {
    if (newVal) {
      transitionEnd.value = false
    }
  }
)

// 展开/收起控制
function toggleExpand() {
  // 触发事件通知父组件
  emit('update:expanded', !props.expanded)
  emit('state-change', !props.expanded)
  transitionEnd.value = false
}

// 过渡结束处理
function onTransitionEnd() {
  transitionEnd.value = true

}

// iframe 消息通信
function sendMessage() {
  if (iframe.value?.contentWindow) {
    iframe.value.contentWindow.postMessage(vitepressData.isDark.value, href.value)
  }
}

onMounted(() => {
  baseUrl.value = process.env.NODE_ENV === 'production'
    ? `${location.origin}/demo/?timestamp=${new Date().getTime()}#/`
    : 'http://localhost:5173/demo/#/'

  // 监听 iframe 加载完成事件
  iframe.value?.addEventListener('load', sendMessage)
})

watch(
  () => vitepressData.isDark.value,
  sendMessage
)
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.demo-model {
  position: fixed;
  z-index: 10;
  right: 32px;
  top: calc(var(--vp-nav-height) + 32px);
  width: 330px;
  font-size: 16px;
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-4);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.iframe-container {
  height: calc(100% - 56px);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.collapsed .iframe-container {
  height: 0;
}

.fade-enter-active,
.fade-leave-active,
.fade-enter,
.fade-leave-to {
  display: none;
}

.dark .demo-model {
  background: #1b1b1b;
}

.iframe {
  height: 100%;
  width: 100%;
}

.demo-header {
  position: relative;
  height: 48px;
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px 6px 0px 0px;
  box-sizing: border-box;
  background: var(--vp-sidebar-bg-color);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-size: 28px;
  cursor: pointer;
}

.demo-link {
  font-size: 28px !important;
  transition: all 0.3s ease-in-out;
  position: absolute;
  left: 0;
  --color: inherit;
  fill: currentColor;
  color: var(--color);
}

.demo-qrcode{
  font-size: 28px !important;
  transition: all 0.3s ease-in-out;
  position: absolute;
  left: calc(50% - 14px);
  --color: inherit;
  fill: currentColor;
  color: var(--color);
}

.expand-icon {
  position: absolute;
  right: 8px;
  cursor: pointer;
}

.collapsed {
  width: 48px !important;
  height: 48px;
  border-radius: 12px;
}

.collapsed.transition-end .demo-header {
  justify-content: center;
  /* 动画结束后居中对齐 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}

@media screen and (min-width: 1280px) {
  .demo-model {
    width: 310px;
    height: calc(310px * 143.6 / 70.9 + 56px);
    right: 48px;
  }

  .collapsed {
    height: 48px;
  }
}

@media screen and (min-width: 1440px) {
  .demo-model {
    width: 360px;
    height: calc(360px * 143.6 / 70.9 + 56px);
    right: 64px;
  }

  .collapsed {
    height: 48px;
  }
}

@media (max-width: 1279px) {
  .demo-model {
    display: none;
  }
}
</style>