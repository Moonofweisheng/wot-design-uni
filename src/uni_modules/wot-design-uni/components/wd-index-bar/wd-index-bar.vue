<template>
  <view class="wd-index-bar" :id="indexBarId">
    <!-- #ifdef MP-DINGTALK -->
    <view class="wd-index-bar" :id="indexBarId">
      <!-- #endif -->
      <scroll-view :scrollTop="scrollTop" :scroll-y="true" class="wd-index-bar__content" @scroll="hanleScroll">
        <slot></slot>
      </scroll-view>
      <view
        class="wd-index-bar__sidebar"
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
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
import { getRect, isDef, uuid } from '../common/util'
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

const scrollTop = ref(0)

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
  const { detail } = scrollEvent
  const anchor = state.anchorList.find((item, index) => {
    if (!isDef(state.anchorList[index + 1])) return true
    if (item.top - offsetTop <= detail.scrollTop && state.anchorList[index + 1].top - offsetTop > detail.scrollTop) return true
    return false
  })!
  state.activeIndex = anchor.index
}

function getAnchorByPageY(pageY: number) {
  const y = pageY - sidebarInfo.offsetTop
  let idx = Math.floor(y / sidebarInfo.indexHeight)
  if (idx < 0) idx = 0
  else if (idx > state.anchorList.length - 1) idx = state.anchorList.length - 1
  return state.anchorList[idx]
}

function handleTouchMove(e: TouchEvent) {
  const clientY = e.touches[0].pageY
  if (state.activeIndex === getAnchorByPageY(clientY).index) {
    return
  }
  state.activeIndex = getAnchorByPageY(clientY).index
  scrollTop.value = getAnchorByPageY(clientY).top - offsetTop
}

function handleTouchEnd(e: TouchEvent) {
  const clientY = e.changedTouches[0].pageY
  scrollTop.value = getAnchorByPageY(clientY).top - offsetTop
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
