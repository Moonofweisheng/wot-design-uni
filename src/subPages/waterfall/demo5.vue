<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import NavTab from './components/NavTab.vue'
import { mockImages, text } from './utils/mock'

interface ListItem {
  title: string
  id: number
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
          id: uuid++,
          title: text.slice(startIndex, startIndex + length),
          url: mockImages[i % mockImages.length]
        }
      })
    resolve(data)
  })
}

function loadEnd() {}

onMounted(async () => {
  list.value.push(...(await getData()))
})
</script>

<template>
  <view>
    <wd-waterfall class="waterfall-container" :max-wait="1000" @load-end="loadEnd">
      <wd-waterfall-item v-for="(item, index) in list" :key="item.id" :order="index">
        <template #default="{ loaded, status }">
          <view class="waterfall-item">
            <image v-if="status === 'success'" mode="widthFix" class="waterfall-image" :src="item.url" @load="loaded" @error="loaded" />
            <view v-if="status === 'timeout'" class="timeout-placeholder">加载超时占位</view>
            <view v-if="status === 'timeout'" class="timeout-badge">超时</view>
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
  height: 100%;
  width: 100%;
  display: flex;
}

.timeout-placeholder {
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0f2fe;
}

.timeout-badge {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #ef4444;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 14px;
  color: white;
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
  "name": "waterfall-demo5",
  "layout": "default",
  "style": {
    "navigationBarTitleText": "最大等待时间"
  }
}
</route>
