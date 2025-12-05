<template>
  <!-- 大屏幕：原有的固定容器 -->
  <div v-if="href && !isSmallScreen" class="demo-model" :class="{
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

  <!-- 小屏幕：触发按钮 -->
  <div v-if="href && isSmallScreen && !isTinyScreen" class="demo-trigger" @click="openDrawer">
    <el-icon class="trigger-icon">
      <component :is="Expand" />
    </el-icon>
  </div>

  <!-- 小屏幕：Drawer抽屉 -->
<view  v-if="isSmallScreen && !isTinyScreen" class="drawer-container">  
    <el-drawer
   
    v-model="drawerVisible"
    direction="rtl"
    size="380px"
    :modal="false"
    :lock-scroll="false"
    :before-close="closeDrawer"
  >
    <div class="demo-header">
        <ExternalLink :href="href" class="demo-link">
        </ExternalLink>
        <QrCode class="demo-qrcode" :src="qrcode" v-if="qrcode"></QrCode>
    </div>
    <div class="drawer-content">
      <iframe v-if="drawerVisible" ref="drawerIframe" class="drawer-iframe" scrolling="auto" frameborder="0" :src="href" />
    </div>
  </el-drawer>
</view>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import { ElDrawer, ElIcon } from 'element-plus'
import { useRoute, useData } from 'vitepress'
import { computed, onMounted, ref, watch, onUnmounted } from 'vue'
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
const drawerIframe = ref<HTMLIFrameElement | null>(null)
const transitionEnd = ref(true)
const drawerVisible = ref(false)
const isSmallScreen = ref(false)
const isTinyScreen = ref(false)

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

  return baseUrl.value + `subPages/${kebabToCamel(paths[paths.length - 1])}/Index`
})

const qrcode = computed(() => {
  const path = route.path
  const paths = path ? path.split('.')[0].split('/') : []
  if (!paths.length) return ''
  return `/wxqrcode/${paths[paths.length - 1]}.png`
})

// 获取页面标题
const pageTitle = computed(() => {
  const path = route.path
  const paths = path ? path.split('.')[0].split('/') : []
  if (!paths.length) return '预览Demo'
  
  // 将kebab-case转换为更友好的标题格式
  const pageName = paths[paths.length - 1]
  return pageName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
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

// 小屏幕抽屉控制
function openDrawer() {
  drawerVisible.value = true
}

function closeDrawer() {
  drawerVisible.value = false
}

// 检查屏幕尺寸
function checkScreenSize() {
  isSmallScreen.value = window.innerWidth <= 1439
  isTinyScreen.value = window.innerWidth < 1280
}

// 监听窗口大小变化
function handleResize() {
  checkScreenSize()
}

// 过渡结束处理
function onTransitionEnd() {
  transitionEnd.value = true

}

// iframe 消息通信
function sendMessage() {
  const targetIframe = isSmallScreen.value ? drawerIframe.value : iframe.value
  if (targetIframe?.contentWindow) {
    const targetOrigin = new URL(href.value, location.origin).origin
    targetIframe.contentWindow.postMessage(vitepressData.isDark.value, targetOrigin)
  }
}

// 发送语言信息给iframe
function sendLanguageMessage() {
  const targetIframe = isSmallScreen.value ? drawerIframe.value : iframe.value
  if (targetIframe?.contentWindow) {
    const targetOrigin = new URL(href.value, location.origin).origin
    targetIframe.contentWindow.postMessage(vitepressData.lang.value, targetOrigin)
  }
}

onMounted(() => {
  baseUrl.value = process.env.NODE_ENV === 'production'
    ? `${location.origin}/demo/?timestamp=${new Date().getTime()}#/`
    : 'http://localhost:5173/demo/#/'

  // 初始化屏幕尺寸检查
  checkScreenSize()
  window.addEventListener('resize', handleResize)

  // 监听 iframe 加载完成事件
  iframe.value?.addEventListener('load', () => {
    sendMessage()
    sendLanguageMessage()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 监听抽屉iframe加载完成
watch(drawerIframe, (newVal) => {
  if (newVal) {
    newVal.addEventListener('load', () => {
      sendMessage()
      sendLanguageMessage()
    })
  }
})

watch(
  () => vitepressData.isDark.value,
  sendMessage
)

// 监听语言变化
watch(
  () => vitepressData.lang.value,
  sendLanguageMessage
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
  top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 32px);
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

@media screen and (min-width: 1440px) {
  .demo-model {
    width: 280px;
    height: calc(320px * 143.6 / 70.9);
    right: 12px;
  }

  .collapsed {
    height: 48px;
  }
}

@media screen and (min-width: 1600px) {
  .demo-model {
    width: 340px;
    height: calc(340px * 143.6 / 70.9);
    right: 24px;
  }

  .collapsed {
    height: 48px;
  }
}

/* 小屏幕触发按钮样式 */
.demo-trigger {
  position: fixed;
  z-index: 10;
  right: 16px;
  top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 32px);
  width: 48px;
  height: 48px;
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.demo-trigger:hover {
  transform: scale(1.05);
}

.trigger-icon {
  font-size: 24px;
  color: var(--vp-c-text-1);
}

/* 抽屉内容样式 */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}

.drawer-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex: 1;
}

.drawer-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.drawer-actions .demo-link {
  font-size: 20px !important;
  color: var(--vp-c-text-2);
  transition: color 0.3s ease;
}

.drawer-actions .demo-link:hover {
  color: var(--vp-c-brand-1);
}

.drawer-actions .demo-qrcode {
  font-size: 20px !important;
  color: var(--vp-c-text-2);
}

.drawer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  height: calc(340px * 143.6 / 70.9);
}

.drawer-iframe {
  width: 340px;
  height: calc(340px * 143.6 / 70.9);
  border: none;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background: var(--vp-c-bg);
  overflow: hidden;
}

.drawer-container {
  --el-drawer-bg-color: var(--vp-c-bg);
  :deep() {
    .el-drawer {
      background-color: var(--vp-c-bg) !important;
    }
  }
}



@media (max-width: 768px) {
  .demo-trigger {
    display: none;
  }
}
</style>