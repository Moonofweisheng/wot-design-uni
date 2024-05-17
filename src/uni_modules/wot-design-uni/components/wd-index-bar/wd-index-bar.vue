<template>
  <view class="wd-index-bar">
    <scroll-view :scrollTop="scrollTop" :scroll-y="true" class="wd-index-bar__content" @scroll="hanleScroll">
      <slot></slot>
    </scroll-view>
    <view
      class="wd-index-bar__sidebar"
      @touchmove.stop.prevent="handleTouchMove"
      @touchend.stop.prevent="handleTouchEnd"
      @touchcancel.stop.prevent="handleTouchEnd"
    >
      <view class="wd-index-bar__index" :class="{ 'is-active': item.index === currentAnchorIndex }" v-for="item in anchorList" :key="item.index">
        {{ item.index }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { AnchorItem, AnchorIndex } from './type'
import { indexBarInjectionKey } from './type'
import { provide, ref, getCurrentInstance, onMounted } from 'vue'

const { proxy } = getCurrentInstance()!

const anchorList = ref<AnchorItem[]>([])
provide(indexBarInjectionKey, { anchorList })

const scrollTop = ref(0)
const currentAnchorIndex = ref<AnchorIndex | null>()

// 组件距离页面顶部的高度
let offsetTop = 0
let sidebarInfo = {
  // 侧边栏距离顶部的高度
  offsetTop: 0,
  // 高度固定24px
  indexHeight: 24
}

function init() {
  uni
    .createSelectorQuery()
    .in(proxy)
    .select('.wd-index-bar')
    .boundingClientRect()
    .exec(([res]) => (offsetTop = res.top))

  setTimeout(() => {
    currentAnchorIndex.value = anchorList.value[0]?.index

    uni
      .createSelectorQuery()
      .in(proxy)
      .select('.wd-index-bar__sidebar')
      .boundingClientRect()
      .exec(([res]) => {
        sidebarInfo.offsetTop = res.top
      })

    uni
      .createSelectorQuery()
      .in(proxy)
      .select('.wd-index-bar__index')
      .boundingClientRect()
      .exec(([res]) => {
        sidebarInfo.indexHeight = res.height
      })
  }, 100)
}

onMounted(() => {
  init()
})

function hanleScroll(scrollEvent: any) {
  const { detail } = scrollEvent
  scrollTop.value = detail.scrollTop
  const anchor = anchorList.value.find((item, index) => {
    if (anchorList.value[index + 1] == null) return true
    if (item.top - offsetTop <= scrollTop.value && anchorList.value[index + 1].top - offsetTop > scrollTop.value) return true
    return false
  })!
  currentAnchorIndex.value = anchor.index
}

function getAnchorByPageY(pageY: number) {
  const y = pageY - sidebarInfo.offsetTop
  let idx = Math.floor(y / sidebarInfo.indexHeight)
  if (idx < 0) idx = 0
  else if (idx > anchorList.value.length - 1) idx = anchorList.value.length - 1
  return anchorList.value[idx]
}

function handleTouchMove(e: TouchEvent) {
  const clientY = e.touches[0].pageY
  currentAnchorIndex.value = getAnchorByPageY(clientY).index
}

function handleTouchEnd(e: TouchEvent) {
  const clientY = e.changedTouches[0].pageY
  scrollTop.value = getAnchorByPageY(clientY).top - offsetTop
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
