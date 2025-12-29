<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import NavTab from './components/NavTab.vue'
import MockImage from './components/MockImage.vue'
import { mockImages, text, random } from './utils/mock'
import { onReachBottom } from '@dcloudio/uni-app'

interface ListItem {
  title: string
  id: number
  url: string
  width: number
  height: number
}

const list = ref<ListItem[]>([])
let uuid = 0

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
          url: mockImages[i % mockImages.length],
          width: random(200, 400),
          height: random(200, 500)
        }
      })
    resolve(data)
  })
}

function loadEnd() {}

onMounted(async () => {
  list.value.push(...(await getData()))
})

onReachBottom(async () => {
  list.value.push(...(await getData()))
})
</script>

<template>
  <view>
    <wd-waterfall class="waterfall-container" :max-wait="500" @load-end="loadEnd">
      <wd-waterfall-item v-for="(item, index) in list" :key="item.id" :order="index">
        <template #default="{ loaded, status }">
          <view class="waterfall-item">
            <!-- 成功状态：显示 MockImage -->
            <MockImage
              v-if="status === 'success'"
              :url="item.url"
              :meta="{ width: item.width, height: item.height }"
              :error-rate="0.3"
              :load-delay="{ min: 50, max: 800 }"
              @load="loaded"
              @error="loaded"
            />

            <!-- 超时状态：显示占位内容 -->
            <view v-if="status === 'timeout'" class="timeout-placeholder">
              <text class="timeout-text">加载超时</text>
            </view>

            <!-- 失败状态：显示失败占位 -->
            <view v-if="status === 'over'" class="over-placeholder">
              <text class="over-text">加载失败</text>
            </view>

            <!-- 超时标签 -->
            <view v-if="status === 'timeout'" class="timeout-badge">超时</view>

            <!-- 失败标签 -->
            <view v-if="status === 'over'" class="over-badge">失败</view>

            <!-- 内容区域 -->
            <view class="waterfall-content">{{ item.title }}</view>
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

.timeout-placeholder {
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee2e2;

  .timeout-text {
    font-size: 14px;
    color: #dc2626;
  }
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
  z-index: 10;
}

.over-placeholder {
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fef3c7;

  .over-text {
    font-size: 14px;
    color: #d97706;
  }
}

.over-badge {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #f59e0b;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 14px;
  color: white;
  z-index: 10;
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
    "navigationBarTitleText": "Mock 加载成功/失败演示"
  }
}
</route>
