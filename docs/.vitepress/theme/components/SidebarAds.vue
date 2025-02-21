<script lang="ts" setup>
import { ElImageViewer } from 'element-plus'
import { ref } from 'vue'
import { useAds } from '../composables/adsData'

const {data} = useAds()


const showViewer = ref(false)
const previewUrl = ref('')

const handleClick = (ad: any) => {
  if (ad.link) {
    window.open(ad.link, '_blank')
  } else if (ad.image) {
    previewUrl.value = ad.image
    showViewer.value = true
  }
}
</script>

<template>
  <div class="sidebar-ad-container" v-if="data">
    <slot name="sidebar-ad-content">
      <!-- 默认广告内容 -->
      <div class="sidebar-ad-list">

        <div v-for="(ad, index) in data" :key="index" class="sidebar-ad-item">
          <div class="sidebar-ad-link" @click="handleClick(ad)">
            <img :src="ad.image" :alt="ad.title" class="sidebar-ad-img">
          </div>
        </div>
      </div>
    </slot>
    <el-image-viewer v-if="showViewer" :url-list="[previewUrl]" @close="showViewer = false" hide-on-click-modal
      teleported />
  </div>
</template>

<style scoped>
.sidebar-ad-container {
  margin: 6px 0;
  padding: 6px;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  box-sizing: border-box;
  width: calc(100% - 6px);
  margin-left: 3px;
  margin-right: 3px;
}

.sidebar-ad-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar-ad-item {
  width: 100%;
}

.sidebar-ad-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.sidebar-ad-img {
  width: 100%;
  height: auto;
  max-height: 120px;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.sidebar-ad-img:hover {
  transform: translateY(-2px);
}

.sidebar-ad-title {
  margin-top: 4px;
  font-size: 14px;
  text-align: center;
}
</style>