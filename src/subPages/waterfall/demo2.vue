<script lang="ts" setup>
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { type WaterfallExpose } from '@/uni_modules/wot-design-uni/components/wd-waterfall/types'
import NavTab from './components/NavTab.vue'
import { mockImages, random, text } from './utils/mock'

interface ListItem {
  id: number
  title: string
  url: string
}

const currentPage = ref(1)
const list = ref<ListItem[]>([])
const placeholderSrc = 'https://wot-ui.cn/logo.png'

let uuid = 1
const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

// 生成随机title的函数
const generateTitle = () => {
  const min = 5
  const max = 30
  const startIndex = random(0, text.length - max)
  const length = random(min, max)
  return text.slice(startIndex, startIndex + length)
}

async function fetchApi(page: number) {
  await sleep(300)
  const getList = () =>
    Array(10)
      .fill(0)
      .map((_, i) => {
        return {
          id: uuid++,
          title: generateTitle(),
          url: mockImages[i % mockImages.length]
        }
      })

  return {
    page,
    total: 10,
    list: page > 10 ? [] : getList()
  }
}

// waterfall
const waterfallRef = ref<WaterfallExpose>()

// 下拉刷新
const refreshing = ref(false)

type LoadMoreState = 'loading' | 'error' | 'finished'
// 加载更多
const loadMoreStatus = ref<LoadMoreState>('loading')
const loading = ref(false)

// 监听下拉刷新
onPullDownRefresh(async () => {
  refreshing.value = true
  try {
    const res = await fetchApi(1)
    currentPage.value = 1
    list.value = res.list

    // 重置加载状态
    loadMoreStatus.value = res.page < res.total ? 'loading' : 'finished'

    // 清空并重置瀑布流
    waterfallRef.value?.reset()
  } catch (error) {
    console.error('刷新失败', error)
  } finally {
    refreshing.value = false
    // 停止下拉刷新动画
    uni.stopPullDownRefresh()
  }
})

async function loadMoreFetch(page: number) {
  loadMoreStatus.value = 'loading'
  loading.value = true
  try {
    const res = await fetchApi(page)
    if (res.list.length === 0) {
      loadMoreStatus.value = 'finished'
      return
    }
    list.value.push(...res.list)
    currentPage.value = page

    waterfallRef.value?.loadDone(() => {
      setTimeout(() => {
        loadMoreStatus.value = res.page < res.total ? 'loading' : 'finished'
      }, 300)
    })
  } catch (error) {
    loadMoreStatus.value = 'error'
  } finally {
    loading.value = false
  }
}

function onReload() {
  if (!refreshing.value) {
    loadMoreFetch(currentPage.value)
  }
}

// 🔥 统一的加载更多处理函数
async function handleLoadMore() {
  // 防止重复加载
  if (loading.value || refreshing.value) {
    // console.log('⏸️ 跳过加载（正在加载中）', { loading: loading.value, refreshing: refreshing.value })
    return
  }

  // 检查是否还有更多数据
  if (loadMoreStatus.value !== 'loading') {
    // console.log('⏸️ 跳过加载（无更多数据）', { loadMoreStatus: loadMoreStatus.value })
    return
  }

  // 检查瀑布流是否正在排版
  if (waterfallRef.value?.loadStatus === 'busy') {
    // console.log('⏸️ 跳过加载（瀑布流排版中）')
    return
  }

  // console.log('📦 开始加载第', currentPage.value + 1, '页')
  await loadMoreFetch(currentPage.value + 1)
}

onReachBottom(() => {
  // console.log('📍 触底事件触发')
  handleLoadMore()
})

onLoad(() => {
  loadMoreFetch(currentPage.value)
})
// #ifdef WEB || APP-PLUS
// 删除
function onDelete(item: ListItem) {
  const index = list.value.indexOf(item)
  if (index !== -1) {
    list.value.splice(index, 1)
    // console.log('🗑️ 删除了 item:', item.id, '剩余数量:', list.value.length)
    // ✅ 不需要手动调用 checkAndLoadMore，组件会自动检查
  }
}

// 头部插入
function insertAtBeginning() {
  const newItem: ListItem = {
    id: uuid++,
    title: generateTitle(),
    url: mockImages[Math.floor(Math.random() * mockImages.length)]
  }
  list.value.unshift(newItem)
}

// 中间插入
function insertAtMiddle() {
  const newItem: ListItem = {
    id: uuid++,
    title: generateTitle(),
    url: mockImages[Math.floor(Math.random() * mockImages.length)]
  }
  const middleIndex = Math.floor(list.value.length / 2)
  list.value.splice(middleIndex, 0, newItem)
}

// 随机插入
function insertRandom() {
  const newItem: ListItem = {
    id: uuid++,
    title: generateTitle(),
    url: mockImages[Math.floor(Math.random() * mockImages.length)]
  }
  const randomIndex = Math.floor(Math.random() * (list.value.length + 1))
  list.value.splice(randomIndex, 0, newItem)
}

// 批量随机插入
function insertBatch() {
  const batchSize = 5
  const newItems: ListItem[] = Array(batchSize)
    .fill(0)
    .map(() => ({
      id: uuid++,
      title: generateTitle(),
      url: mockImages[Math.floor(Math.random() * mockImages.length)]
    }))

  // 随机插入位置
  const randomIndex = Math.floor(Math.random() * (list.value.length + 1))
  list.value.splice(randomIndex, 0, ...newItems)
}
// #endif

// 尾部插入
function insertAtEnd() {
  const newItem: ListItem = {
    id: uuid++,
    title: generateTitle(),
    url: mockImages[Math.floor(Math.random() * mockImages.length)]
  }
  list.value.push(newItem)
}

// 清空数据
function clearAll() {
  list.value = []
  currentPage.value = 1
  loadMoreStatus.value = 'loading'
}
</script>

<template>
  <view>
    <view class="button-row">
      <!-- #ifdef WEB || APP-PLUS -->
      <wd-button size="small" @click="insertAtBeginning">头部插入</wd-button>
      <wd-button size="small" @click="insertAtMiddle">中间插入</wd-button>
      <wd-button size="small" @click="insertRandom">随机插入</wd-button>
      <wd-button size="small" @click="insertBatch">批量插入</wd-button>
      <!-- #endif -->
      <wd-button size="small" @click="insertAtEnd">添加数据</wd-button>
      <wd-button size="small" @click="clearAll">清空数据</wd-button>
    </view>
    <wd-waterfall ref="waterfallRef" custom-class="waterfall-container" error-strategy="retryHard" @auto-load-more="handleLoadMore">
      <wd-waterfall-item v-for="(item, index) in list" :key="item.id" :order="index" :id="item.id">
        <template #default="{ loaded, status, onFallbackLoad, onFallbackError, message }">
          <view class="waterfall-item">
            <!-- !!! 由于框架原因，微信小程序、支付宝小程序、钉钉小程序等平台不支持动态增删item，H5和APP平台支持 -->
            <!-- !!! 注意由于微信小程序 支付宝小程序  钉钉小程序等for循环中同时使用slot和v-if还有异常问题，这里在slot中用v-if的，删除的item的时候会触发for循环的模板重新渲染 -->
            <!-- !!! 参考uniap的仓库issues：https://github.com/dcloudio/uni-app/issues/4847 -->
            <image v-if="status === 'success'" mode="widthFix" class="waterfall-image" :src="item.url" @load="loaded" @error="loaded" />
            <!--占位图片 -->
            <view v-else-if="status === 'fail'" class="fallback-container">
              <image :src="placeholderSrc" mode="aspectFill" class="fallback-image" @load="onFallbackLoad" @error="onFallbackError" />
            </view>
            <!-- 最终兜底 -->
            <view v-else class="final-fallback">
              {{ message || '图片加载失败' }}
            </view>
            <view class="item-content">
              {{ item.title }}
            </view>
            <!-- #ifdef WEB || APP-PLUS -->
            <wd-button type="error" block :round="false" @click="onDelete(item)">删除-{{ index }}</wd-button>
            <!-- #endif -->
          </view>
        </template>
      </wd-waterfall-item>
    </wd-waterfall>

    <wd-loadmore :state="loadMoreStatus" @reload="onReload" />
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
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.waterfall-image {
  width: 100%;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.bottom-spacing {
  padding: 40px;
}

// 错误处理相关样式
.fallback-container {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.fallback-image {
  width: 100%;
  height: 100%;
}

.final-fallback {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 1px dashed #ddd;
}

.item-content {
  padding: 8px;
}
</style>

<route lang="json">
{
  "name": "waterfall-demo2",
  "layout": "default",
  "style": {
    "navigationBarTitleText": "完整示例",
    "enablePullDownRefresh": true
  }
}
</route>
