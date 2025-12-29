<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import { mockImages } from './utils/mock'
import NavTab from './components/NavTab.vue'

const columns = ref(3)

interface ListItem {
  id: number
  url: string
}

const list = ref<ListItem[]>([])
let uuid = 0
function getData() {
  return new Promise<ListItem[]>((resolve) => {
    const data = Array(30)
      .fill(0)
      .map((_, i) => {
        return {
          id: uuid++,
          url: mockImages[i % mockImages.length]
        }
      })
    resolve(data)
  })
}

function loadEnd() {}
function sliderChange({ detail: { value } }: any) {
  console.log('value', value)
  columns.value = value
}
onMounted(async () => {
  list.value.push(...(await getData()))
})
let i = 0
onReachBottom(async () => {
  if (i++ > 10) return
  list.value.push(...(await getData()))
})
</script>

<template>
  <view>
    <slider :value="columns" class="slider-control" show-value :min="1" :max="8" @change="sliderChange" />
    <wd-waterfall
      class="waterfall-container"
      :columns="columns"
      :column-gap="4"
      :row-gap="4"
      :retry-count="1"
      :max-wait="1000"
      error-strategy="retryHard"
      @load-end="loadEnd"
    >
      <wd-waterfall-item v-for="(item, index) in list" :key="item.id" :index="index">
        <template #default="{ loaded }">
          <image mode="widthFix" class="iamge-node" :src="item.url" @load="loaded" @error="loaded" />
        </template>
      </wd-waterfall-item>
    </wd-waterfall>

    <!-- 瀑布流演示导航 -->
    <view class="bottom-spacing" />
    <NavTab />
  </view>
</template>

<style lang="scss" scoped>
.slider-control {
  margin-bottom: 8px;
}

.waterfall-container {
  margin-left: 8px;
  margin-right: 8px;
}

.bottom-spacing {
  padding: 40px;
}

.iamge-node {
  width: 100%;
}
</style>

<route lang="json">
{
  "name": "waterfall-demo3",
  "layout": "default",
  "style": {
    "navigationBarTitleText": "列数切换示例",
    "enablePullDownRefresh ": true
  }
}
</route>
