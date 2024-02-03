<!--
 * @Author: weisheng
 * @Date: 2024-02-02 15:40:08
 * @LastEditTime: 2024-02-03 23:56:17
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\docs\.vitepress\theme\components\HomeFriendly.vue
 * 记得注释
-->
<style scoped></style>

<script setup lang="ts">
import { computed } from 'vue'
import { useFriendly } from '../composables/friendly'
import VPFeature from 'vitepress/dist/client/theme-default/components/VPFeature.vue'

const { data } = useFriendly()


const features = computed(() => {
  return data && data.value ? data.value : [{
    icon: "https://www.flowerui.com/logo.png",
    title: 'Flower Library',
    details: 'uni-app 多平台多版本兼容的轻量、简洁、高效、全面的移动端组件库',
    link: 'https://www.flowerui.com/',
  }, {
    icon: 'https://www.uxframe.cn/logo/hero.svg',
    title: 'UxFrame',
    details: '是一款基于 uni-app-x 跨平台应用开发引擎的低代码高性能原生UI框架，简单高效、丰富便捷、炫酷giao炸、无与伦比。',
    link: 'https://www.uxframe.cn/',
  }]
})

const grid = computed(() => {
  const length = features.value.length || 0
  if (!length) {
    return
  } else {
    return 'grid-3'
  }
})
</script>

<template>
  <div v-if="features && features.length" class="VPFeatures">
    <div class="container">
      <h1 class="friendly-title">友情链接</h1>

      <div class="items">
        <div v-for="feature in features" :key="feature.title" class="item" :class="[grid]">
          <VPFeature :icon="{ src: feature.icon, height: '48px', width: 'auto' }" :title="feature.title"
            :details="feature.details" :link="feature.link" />
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

