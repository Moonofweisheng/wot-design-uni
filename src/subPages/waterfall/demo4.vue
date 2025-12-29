<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'

import NavTab from './components/NavTab.vue'
import { mockImages, text } from './utils/mock'

interface ListItem {
  title: string
  id: number
  img: {
    width: number
    height: number
  }
  url: string
}

const list = ref<ListItem[]>([])
let uuid = 0
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
function getData() {
  return new Promise<ListItem[]>((resolve) => {
    const data = Array(20)
      .fill(0)
      .map((_, i) => {
        const min = 20
        const max = 50
        const startIndex = random(0, text.length - max)
        const length = random(min, max)
        return {
          title: i + text.slice(startIndex, startIndex + length),
          id: uuid++,
          img: {
            width: random(100, 400),
            height: random(100, 400)
          },
          url: mockImages[i % mockImages.length]
        }
      })
    resolve(data)
  })
}

onMounted(async () => {
  list.value.push(...(await getData()))
})

onReachBottom(async () => {
  list.value.push(...(await getData()))
})
</script>

<template>
  <view>
    <wd-waterfall class="waterfall-container">
      <wd-waterfall-item v-for="(item, index) in list" :order="index" :key="item.id" :width="item.img.width" :height="item.img.height">
        <template #default="{ imageHeight }">
          <view class="waterfall-item">
            <image class="waterfall-image" mode="aspectFill" :style="{ height: `${imageHeight}px` }" :src="item.url" />
            <view class="waterfall-content">
              {{ item.title }}
            </view>
          </view>
        </template>
      </wd-waterfall-item>
    </wd-waterfall>

    <view class="bottom-spacing" />
    <!-- 瀑布流演示导航 -->
    <NavTab />
  </view>
</template>

<style lang="scss" scoped>
.waterfall-container {
  margin-left: 8px;
  margin-right: 8px;
}

.waterfall-item {
  position: relative;
  overflow: hidden;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.waterfall-image {
  width: 100%;
  padding-top: 0;
}

.waterfall-content {
  margin-top: 8px;
  padding: 8px;
  font-size: 14px;
}

.bottom-spacing {
  padding: 40px;
}
</style>

<route lang="json">
{
  "name": "waterfall-known",
  "layout": "default",
  "style": {
    "navigationBarTitleText": "已知高度示例"
  }
}
</route>
