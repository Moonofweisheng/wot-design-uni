<script setup lang="ts">
import { computed } from 'vue'
import { useCaseData } from '../composables/cases'
import { useData } from 'vitepress'
import VPFeature from './VPFeature.vue'

const { data } = useCaseData()
const { lang } = useData()

const cases = computed(() => {
  return lang.value === 'en-US' ? [] : (data.value.length ? data.value : [])
})

const grid = computed(() => {
  const length = cases.value.length || 0
  if (!length) {
    return
  } else {
    return 'grid-4'
  }
})
</script>

<template>
  <div v-if="cases && cases.length" class="VPFeatures">
    <div class="container">
      <h1 class="cases-title">优秀案例</h1>

      <div class="items">
        <div v-for="(item, index) in cases" :key="index" class="item" :class="[grid]">
          <VPFeature
            :icon="{ src: item.image, height: '48px', width: 'auto' }"
            :title="item.name"
            :details="item.description"
            :image-preview="true"
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

.cases-title {
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
  .item.grid-2 {
    width: calc(100% / 2);
  }

  .item.grid-3,
  .item.grid-4,
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
