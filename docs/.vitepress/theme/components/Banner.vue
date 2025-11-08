<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useBanner } from '../composables/banner'

const open = ref(false) // 默认不显示，避免闪烁
const BANNER_STORAGE_KEY = 'wot-banner-dismissed-time'
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000 // 24小时的毫秒数

// 使用 banner composable 获取远程数据
const { data: bannerData } = useBanner()

// 计算当前要显示的 banner 信息（取第一个）
const currentBanner = computed(() => {
  return bannerData.value && bannerData.value.length > 0 ? bannerData.value[0] : null
})

/**
 * 检查是否应该显示横幅
 */
function checkShouldShowBanner() {
  if (typeof window === 'undefined') return true
  
  const dismissedTime = localStorage.getItem(BANNER_STORAGE_KEY)
  if (!dismissedTime) {
    // 首次访问，添加 banner-show class 以显示横幅
    document.documentElement.classList.add('banner-show')
    return true
  }
  
  const dismissedTimestamp = parseInt(dismissedTime, 10)
  const currentTime = Date.now()
  
  // 如果超过24小时，清除记录并显示横幅
  if (currentTime - dismissedTimestamp > TWENTY_FOUR_HOURS) {
    localStorage.removeItem(BANNER_STORAGE_KEY)
    document.documentElement.classList.add('banner-show')
    return true
  }
  
  // 未超过24小时，确保不显示横幅
  document.documentElement.classList.remove('banner-show')
  return false
}

function dismiss() {
  open.value = false
  document.documentElement.classList.remove('banner-show')
  
  // 存储当前时间戳到 localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(BANNER_STORAGE_KEY, Date.now().toString())
  }
}

// 监听 banner 数据变化，只有当有数据时才进行展示逻辑校验
watch(currentBanner, (newBanner) => {
  if (newBanner) {
    // 有 banner 数据时，检查是否应该显示
    const shouldShow = checkShouldShowBanner()
    open.value = shouldShow
  } else {
    // 没有 banner 数据时，不显示横幅
    open.value = false
  }
}, { immediate: true })
</script>

<template>
  <div class="banner" v-if="open && currentBanner">
  
    <div class="vt-banner-text">
      <p class="vt-banner-title">{{ currentBanner.title }}</p>
      <a
        target="_blank"
        class="vt-primary-action"
        :href="currentBanner.link"
      >
        {{ currentBanner.action }}
      </a>
    </div>
    <button aria-label="close" @click="dismiss">
      <svg
        class="close"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
      >
        <path
          d="M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z"
        />
      </svg>
    </button>
    <div class="glow glow--purple"></div>
    <div class="glow glow--blue"></div>
  </div>
</template>

<style>
html.banner-show {
  --vp-layout-top-height: 64px;
}

/* 移动端优化高度 */
@media (max-width: 768px) {
  html.banner-show {
    --vp-layout-top-height: 56px;
  }
}

@media (max-width: 480px) {
  html.banner-show {
    --vp-layout-top-height: 48px;
  }
}
</style>

<style scoped>
.banner {
  position: fixed;
  z-index: 100;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vp-layout-top-height, 64px);
  padding: 0 48px 0 12px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: #131A24;
  display: none;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

html.banner-show .banner {
  display: flex;
}

.glow.glow--purple {
  position: absolute;
  bottom: -15%;
  left: -75%;
  width: 80%;
  aspect-ratio: 1.5;
  pointer-events: none;
  border-radius: 100%;
  background: linear-gradient(270deg, #7a23a1, #715ebde6 60% 80%, #bd34fe00);
  filter: blur(15vw);
  transform: none;
  opacity: 0.6;
}

.glow.glow--blue {
  position: absolute;
  bottom: -15%;
  right: -40%;
  width: 80%;
  aspect-ratio: 1.5;
  pointer-events: none;
  border-radius: 100%;
  background: linear-gradient(180deg, #61d9ff, #0000);
  filter: blur(15vw);
  transform: none;
  opacity: 0.3;
}

button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

button:hover {
  opacity: 0.8;
}

button:active {
  opacity: 0.6;
}

.close {
  width: 28px;
  height: 28px;
  fill: #fff;
  transform: rotate(45deg);
  transition: transform 0.2s ease;
}

button:hover .close {
  transform: rotate(45deg) scale(1.1);
}

.vt-banner-text {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  color: #fff;
  font-size: 18px;
  line-height: 1.4;
  padding: 8px 0;
}

.vt-banner-title {
  display: inline-block;
  background: linear-gradient(90deg, #bd34fe 0%, #41d1ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.4;
  white-space: nowrap;
}

.vt-primary-action {
  display: inline-block;
  background:
    radial-gradient(140.35% 140.35% at 175% 94.74%, #2bfdd2, #bd34fe00),
    radial-gradient(89.94% 89.94% at 18.42% 15.79%, #4d80f0, #41d1ff00);
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
}

.vt-primary-action:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(77, 128, 240, 0.4);
}

.vt-primary-action:active {
  transform: translateY(0);
}

/* 桌面端优化 */
@media (min-width: 769px) {
  .banner {
    padding: 0 60px 0 20px;
  }

  .glow.glow--blue {
    top: -15%;
    right: -40%;
    width: 80%;
  }

  .glow.glow--purple {
    bottom: -15%;
    left: -40%;
    width: 80%;
  }

  .vt-banner-text {
    gap: 12px;
  }
}

/* 平板端优化 */
@media (max-width: 768px) {
  .banner {
    padding: 0 40px 0 10px;
  }

  button {
    right: 6px;
  }

  .close {
    width: 24px;
    height: 24px;
  }

  .vt-banner-text {
    font-size: 16px;
    gap: 6px;
  }

  .vt-banner-title {
    font-size: 16px;
  }

  .vt-primary-action {
    font-size: 14px;
    padding: 5px 10px;
  }
}

/* 手机端优化 */
@media (max-width: 640px) {
  .banner {
    padding: 0 36px 0 8px;
  }

  .vt-banner-text {
    font-size: 14px;
    gap: 6px;
  }

  .vt-banner-title {
    font-size: 14px;
  }

  .vt-primary-action {
    font-size: 13px;
    padding: 4px 8px;
  }
}

/* 小屏手机优化 */
@media (max-width: 480px) {
  .banner {
    padding: 0 32px 0 6px;
  }

  button {
    right: 4px;
    padding: 2px;
  }

  .close {
    width: 20px;
    height: 20px;
  }

  .vt-banner-text {
    font-size: 12px;
    gap: 4px;
    flex-direction: column;
    line-height: 1.3;
  }

  .vt-banner-title {
    font-size: 12px;
  }

  .vt-primary-action {
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 4px;
  }
}

/* 超小屏优化 */
@media (max-width: 375px) {
  .banner {
    padding: 0 28px 0 4px;
  }

  .vt-banner-text {
    font-size: 11px;
    gap: 3px;
  }

  .vt-banner-title {
    font-size: 11px;
  }

  .vt-primary-action {
    font-size: 11px;
    padding: 2px 6px;
  }
}
</style>
