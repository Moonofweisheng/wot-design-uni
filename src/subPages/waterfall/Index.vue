<script lang="ts" setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { uuid } from '@/uni_modules/wot-design-uni/components/common/util'
import NavTab from './components/NavTab.vue'
import { mockImages, random, text } from './utils/mock'

interface ListItem {
  title: string
  url: string
  id: string
}

const list = ref<ListItem[]>([])
const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

async function getData() {
  await sleep(300)
  return Array.from({ length: 10 }, (_, i) => {
    const min = 20
    const max = 50
    const startIndex = random(0, text.length - max)
    const length = random(min, max)
    return {
      title: text.slice(startIndex, startIndex + length),
      url: mockImages[i % mockImages.length],
      id: uuid()
    }
  })
}

function loadEnd() {}

onLoad(async () => {
  list.value.push(...(await getData()))
})

onReachBottom(async () => {
  list.value.push(...(await getData()))
})
</script>

<template>
  <view>
    <wd-waterfall class="waterfall-container" @load-end="loadEnd">
      <wd-waterfall-item v-for="(item, index) in list" :key="item.id" :order="index">
        <template #default="{ loaded, status }">
          <view class="waterfall-item">
            <image mode="widthFix" class="waterfall-image" :src="item.url" @load="loaded" @error="loaded" />
            <view class="item-title">{{ item.title }}{{ status }}</view>
          </view>
        </template>
      </wd-waterfall-item>
    </wd-waterfall>

    <!-- 瀑布流演示导航 -->
    <view class="bottom-spacing" />
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
  display: flex;
}

.item-title {
  padding: 8px;
}

.bottom-spacing {
  padding: 40px;
}
</style>

<route lang="json">
{
  "name": "waterfall-demo1",
  "layout": "default",
  "style": {
    "navigationBarTitleText": "基础使用"
  }
}
</route>
