<script setup lang="ts">
import { computed } from 'vue'
import { useFriendly } from '../composables/friendly'
import VPFeature from 'vitepress/dist/client/theme-default/components/VPFeature.vue'

const { data } = useFriendly()

const links = computed(() => {
  return data.value.length ? data.value : []
})

const grid = computed(() => {
  const length = links.value.length || 0
  if (!length) {
    return
  } else {
    return 'grid-3'
  }
})
</script>

<template>
  <div v-if="links && links.length" class="VPFeatures">
    <div class="container">
      <h1 class="friendly-title">友情链接</h1>

      <div class="items">
        <div v-for="feature in links" :key="feature.title" class="item" :class="[grid]">
          <VPFeature
            :icon="{ src: feature.icon, height: '48px', width: 'auto' }"
            :title="feature.title"
            :details="feature.details"
            :link="feature.link"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPFeatures {
  position: relative;
  padding: 0 24px;
}

:deep(.VPImage) {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  /* background-color: var(--vp-c-default-soft); */
  width: 48px;
  height: 48px;
  font-size: 24px;
  transition: background-color 0.25s;
}

 

@media (min-width: 640px) {
  .VPFeatures {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPFeatures {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.friendly-title {
  text-align: center;
  margin-bottom: 50px;
  margin-top: 50px;
  font-size: 24px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
  width: 100%;
}

@media (min-width: 640px) {
  .item.grid-2,
  .item.grid-4,
  .item.grid-6 {
    width: calc(100% / 2);
  }
}

@media (min-width: 768px) {
  .item.grid-2,
  .item.grid-4 {
    width: calc(100% / 2);
  }

  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 3);
  }
}

@media (min-width: 960px) {
  .item.grid-4 {
    width: calc(100% / 4);
  }
}
</style>
