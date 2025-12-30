<script lang="ts" setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'
import MockImage from './components/MockImage.vue'
import NavTab from './components/NavTab.vue'
import { mockImages, random, text } from './utils/mock'

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

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

async function getData() {
  await sleep(300)
  return Array.from({ length: 10 }, (_, i) => {
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
}

onLoad(async () => {
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
            <view class="image-container" :style="{ height: `${imageHeight}px` }">
              <MockImage
                :url="item.url"
                :meta="{ width: item.img.width, height: item.img.height }"
                mode="aspectFill"
                :error-rate="0.2"
                :load-delay="{ min: 100, max: 500 }"
              />
            </view>
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

.image-container {
  width: 100%;
  overflow: hidden;
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
