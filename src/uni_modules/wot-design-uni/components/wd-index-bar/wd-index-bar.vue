<template>
  <view class="wd-index-bar" :id="indexBarId">
    <!-- #ifdef MP-DINGTALK -->
    <view class="wd-index-bar" :id="indexBarId">
      <!-- #endif -->
      <scroll-view :scrollTop="scrollState.scrollTop" :scroll-y="true" class="wd-index-bar__content" @scroll="hanleScroll">
        <slot></slot>
      </scroll-view>
      <view
        class="wd-index-bar__sidebar"
        @touchstart.stop.prevent="handleTouchStart"
        @touchmove.stop.prevent="handleTouchMove"
        @touchend.stop.prevent="handleTouchEnd"
        @touchcancel.stop.prevent="handleTouchEnd"
      >
        <view
          class="wd-index-bar__index"
          :class="{ 'is-active': item.index === state.activeIndex }"
          v-for="item in state.anchorList"
          :key="item.index"
        >
          {{ item.index }}
        </view>
      </view>
      <!-- #ifdef MP-DINGTALK -->
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import type { AnchorItem, AnchorIndex } from './type'
import { indexBarInjectionKey, indexBarProps } from './type'
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from 'vue'
import { getRect, isDef, uuid, requestAnimationFrame } from '../common/util'
import { useChildren } from '../composables/useChildren'

const props = defineProps(indexBarProps)

const indexBarId = ref<string>(`indexBar${uuid()}`)

const { proxy } = getCurrentInstance()!

const state = reactive({
  activeIndex: null as AnchorIndex | null,
  anchorList: [] as AnchorItem[]
})

const { linkChildren } = useChildren(indexBarInjectionKey)

linkChildren({ props, anchorState: state })

const scrollState = reactive({
  scrollTop: 0, // 即将滚动到的位置
  prevScrollTop: 0, // 上次记录的位置
  // 滚动距离
  touching: false
})

// 组件距离页面顶部的高度
let offsetTop = 0
let sidebarInfo = {
  // 侧边栏距离顶部的高度
  offsetTop: 0,
  // 高度固定24px
  indexHeight: 24
}

function init() {
  setTimeout(() => {
    state.activeIndex = state.anchorList[0]?.index
    Promise.all([
      getRect(`#${indexBarId.value}`, false, proxy),
      getRect('.wd-index-bar__sidebar', false, proxy),
      getRect('.wd-index-bar__index', false, proxy)
    ]).then(([bar, sidebar, index]) => {
      offsetTop = bar.top!
      sidebarInfo.offsetTop = sidebar.top!
      sidebarInfo.indexHeight = index.height!
    })
  }, 100)
}

onMounted(() => {
  init()
})

function hanleScroll(scrollEvent: any) {
  if (scrollState.touching) {
    return
  }
  const { detail } = scrollEvent
  const scrolltop = Math.floor(detail.scrollTop)
  const anchor = state.anchorList.find((item, index) => {
    if (!isDef(state.anchorList[index + 1])) return true
    if (item.top - offsetTop <= scrolltop && state.anchorList[index + 1].top - offsetTop > scrolltop) return true
    return false
  })!
  if (state.activeIndex !== anchor.index) {
    state.activeIndex = anchor.index
  }
  scrollState.prevScrollTop = scrolltop
}

function getAnchorByPageY(pageY: number) {
  const y = pageY - sidebarInfo.offsetTop
  let idx = Math.floor(y / sidebarInfo.indexHeight)
  if (idx < 0) idx = 0
  else if (idx > state.anchorList.length - 1) idx = state.anchorList.length - 1
  return state.anchorList[idx]
}

function handleTouchStart() {
  scrollState.touching = true
}

function handleTouchMove(e: TouchEvent) {
  const clientY = e.touches[0].pageY
  if (state.activeIndex === getAnchorByPageY(clientY).index) {
    return
  }
  state.activeIndex = getAnchorByPageY(clientY).index
  setScrollTop(getAnchorByPageY(clientY).top - offsetTop)
}

function handleTouchEnd(e: TouchEvent) {
  const clientY = e.changedTouches[0].pageY
  state.activeIndex = getAnchorByPageY(clientY).index
  setScrollTop(getAnchorByPageY(clientY).top - offsetTop)
  requestAnimationFrame(() => {
    scrollState.touching = false
  })
}

function setScrollTop(top: number) {
  if (scrollState.scrollTop === top) {
    scrollState.scrollTop = scrollState.prevScrollTop
    nextTick(() => {
      scrollState.scrollTop = top
    })
  } else {
    scrollState.scrollTop = top
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
