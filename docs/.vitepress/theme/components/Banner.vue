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

onMounted(() => {
  // 默认添加 banner-dismissed class，避免布局闪烁
  if (typeof window !== 'undefined') {
    document.documentElement.classList.add('banner-dismissed')
  }
})

/**
 * 检查是否应该显示横幅
 */
function checkShouldShowBanner() {
  if (typeof window === 'undefined') return true
  
  const dismissedTime = localStorage.getItem(BANNER_STORAGE_KEY)
  if (!dismissedTime) {
    // 首次访问，移除 banner-dismissed class 以显示横幅
    document.documentElement.classList.remove('banner-dismissed')
    return true
  }
  
  const dismissedTimestamp = parseInt(dismissedTime, 10)
  const currentTime = Date.now()
  
  // 如果超过24小时，清除记录并显示横幅
  if (currentTime - dismissedTimestamp > TWENTY_FOUR_HOURS) {
    localStorage.removeItem(BANNER_STORAGE_KEY)
    document.documentElement.classList.remove('banner-dismissed')
    return true
  }
  
  // 未超过24小时，保持 banner-dismissed class（已经默认添加了）
  return false
}

function dismiss() {
  open.value = false
  document.documentElement.classList.add('banner-dismissed')
  
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
html:not(.banner-dismissed) {
  --vp-layout-top-height: 64px;
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
  height: var(--vp-layout-top-height);
  line-height: var(--vp-layout-top-height);
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: #131A24;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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

@media (min-width: 768px) {
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
}

@media (min-width: 1025px) {
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
}

.banner-dismissed .banner {
  display: none;
}

button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 5px;
}

.close {
  width: 32px;
  height: 32px;
  fill: #fff;
  transform: rotate(45deg);
}

.vt-banner-text {
  color: #fff;
  font-size: 20px;
  margin-left: 0.75rem;
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
  line-height: normal;
}

.vt-primary-action {
  background:
    radial-gradient(140.35% 140.35% at 175% 94.74%, #2bfdd2, #bd34fe00),
    radial-gradient(89.94% 89.94% at 18.42% 15.79%, #4d80f0, #41d1ff00);
  color: #fff;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 18px;
  text-decoration: none;
  margin: 0 0.75rem;
  transition: all 0.2s ease-in-out;
}

@media (max-width: 1280px) {
  .banner .vt-banner-text,
  .banner .vt-primary-action {
    font-size: 10px;
  }

  .vt-tagline {
    display: none;
  }
}

@media (max-width: 780px) {
  .vt-tagline {
    display: none;
  }

  .vt-coupon {
    display: none;
  }

  .vt-primary-action {
    margin: 0 10px;
    padding: 4px 8px;
  }

  .vt-time-now {
    display: none;
  }
}

@media (max-width: 560px) {
  .vt-place {
    display: none;
  }
}
</style>
