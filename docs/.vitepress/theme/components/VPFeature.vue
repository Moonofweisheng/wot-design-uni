<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { ref, computed } from 'vue'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { ElImageViewer } from 'element-plus'
import { useData } from 'vitepress'

const props = defineProps<{
  icon?: DefaultTheme.FeatureIcon
  title: string
  details?: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
  imagePreview?: boolean
}>()

const { isDark } = useData()

const showViewer = ref(false)
const currentImageUrl = ref('')

const getImageSrc = computed(() => {
  if (!props.icon || typeof props.icon !== 'object') return ''
  
  if ('src' in props.icon) {
    return props.icon.src
  }
  
  if ('light' in props.icon && 'dark' in props.icon) {
    return isDark.value ? props.icon.dark : props.icon.light
  }
  
  return ''
})

const handleImageClick = (event: Event) => {
  if (props.imagePreview && getImageSrc.value) {
    event.preventDefault()
    event.stopPropagation()
    currentImageUrl.value = getImageSrc.value
    showViewer.value = true
  }
}

const handleCloseViewer = () => {
  showViewer.value = false
}
</script>

<template>
  <VPLink
    class="VPFeature"
    :href="link"
    :rel="rel"
    :target="target"
    :no-icon="true"
    :tag="link ? 'a' : 'div'"
  >
    <article class="box">
      <div v-if="typeof icon === 'object' && icon.wrap" class="icon">
        <VPImage
          :image="icon"
          :alt="icon.alt"
          :height="icon.height || 48"
          :width="icon.width || 48"
        />
      </div>
      <VPImage
        v-else-if="typeof icon === 'object'"
        :image="icon"
        :alt="icon.alt"
        :height="icon.height || 48"
        :width="icon.width || 48"
        @click="handleImageClick"
      />
      <div v-else-if="icon" class="icon" v-html="icon"></div>
      <h2 class="title" v-html="title"></h2>
      <p v-if="details" class="details" v-html="details"></p>

      <div v-if="linkText" class="link-text">
        <p class="link-text-value">
          {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
        </p>
      </div>
    </article>
  </VPLink>
  <el-image-viewer
    v-if="showViewer"
    :url-list="[currentImageUrl]"
    :initial-index="0"
    :close-on-press-escape="true"
    @close="handleCloseViewer"
  />
</template>

<style scoped>
.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.VPFeature.link:hover {
  border-color: var(--vp-c-brand-1);
}

.box {
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.box > :deep(.VPImage) {
  margin-bottom: 20px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: var(--vp-c-default-soft);
  width: 48px;
  height: 48px;
  font-size: 24px;
  transition: background-color 0.25s;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.link-text {
  padding-top: 8px;
}

.link-text-value {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.link-text-icon {
  margin-left: 6px;
}
</style>
