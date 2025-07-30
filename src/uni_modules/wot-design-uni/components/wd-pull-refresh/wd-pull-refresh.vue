<template>
  <view :class="`wd-pull-refresh ${props.customClass}`" :style="props.customStyle">
    <!-- 统一的下拉头部区域 -->
    <view class="wd-pull-refresh__head" :style="headStyle">
      <slot v-if="status === 'normal'" name="normal"></slot>

      <slot v-else-if="status === 'pulling'" name="pulling" :distance="distance">
        <view class="wd-pull-refresh__text">{{ pullingText }}</view>
      </slot>

      <slot v-else-if="status === 'loosing'" name="loosing" :distance="distance">
        <view class="wd-pull-refresh__text">{{ loosingText }}</view>
      </slot>

      <slot v-else-if="status === 'loading'" name="loading" :distance="distance">
        <view class="wd-pull-refresh__loading">
          <wd-loading :size="loadingSize" />
          <view v-if="loadingText" class="wd-pull-refresh__text">{{ loadingText }}</view>
        </view>
      </slot>

      <slot v-else-if="status === 'success'" name="success">
        <view class="wd-pull-refresh__text">{{ successText }}</view>
      </slot>
    </view>

    <!-- 根据滚动模式渲染不同的内容区域 -->
    <!-- scroll-view 局部滚动模式 -->
    <scroll-view
      v-if="scrollMode === 'scroll-view'"
      class="wd-pull-refresh__content"
      :style="contentStyle"
      :scroll-y="true"
      :scroll-top="scrollTop"
      @scroll="handleScrollViewScroll"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <slot></slot>
    </scroll-view>

    <!-- 页面全局滚动模式 -->
    <view
      v-else
      class="wd-pull-refresh__content"
      :style="contentStyle"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch, type CSSProperties } from 'vue'
import { defineOptions } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'
import { useTouch } from '../composables/useTouch'
import { addUnit } from '../common/util'
import { pullRefreshProps, type PullRefreshStatus } from './types'
import WdLoading from '../wd-loading/wd-loading.vue'

defineOptions({
  name: 'wd-pull-refresh',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(pullRefreshProps)

const emit = defineEmits<{
  refresh: []
  change: [payload: { status: PullRefreshStatus; distance: number }]
  'update:modelValue': [value: boolean]
}>()

const status = ref<PullRefreshStatus>('normal')
const distance = ref<number>(0)
const duration = ref<number>(0)
const isRefreshing = ref<boolean>(false)
const scrollTop = ref<number>(0)
const pageScrollTop = ref<number>(0)

const touch = useTouch()

// scroll-view 滚动事件处理（用于 scroll-view 模式）
function handleScrollViewScroll(event: any) {
  if (props.scrollMode === 'scroll-view') {
    scrollTop.value = event.detail.scrollTop || 0
  }
}

// 使用 uni-app 的 onPageScroll 钩子监听页面滚动（用于 page 模式）
onPageScroll((event) => {
  if (props.scrollMode === 'page') {
    const scrollTop = event.scrollTop || 0
    pageScrollTop.value = scrollTop
  }
})

// 计算属性
const headHeight = computed(() => addUnit(props.headHeight))
const pullDistance = computed(() => {
  return props.pullDistance ? Number(props.pullDistance) : Number(props.headHeight)
})
const loadingSize = computed(() => {
  return Math.min(Number(props.headHeight) * 0.4, 20)
})

// 头部样式
const headStyle = computed(() => {
  const style: CSSProperties = {
    height: headHeight.value,
    transform: `translateY(${distance.value - Number(props.headHeight)}px)`,
    transition: duration.value ? `transform ${duration.value}ms ease-out` : 'none'
  }
  return style
})

// 内容区域样式
const contentStyle = computed(() => {
  const style: CSSProperties = {
    transform: `translateY(${distance.value}px)`,
    transition: duration.value ? `transform ${duration.value}ms ease-out` : 'none'
  }
  if (props.scrollMode === 'scroll-view') {
    style.height = addUnit(props.height)
  }
  return style
})

// 监听 v-model 变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal && isRefreshing.value) {
      // 刷新完成，立即开始回弹动画
      duration.value = Number(props.animationDuration)

      if (props.successText) {
        // 如果有成功文案，先显示成功状态
        setStatus('success')
        setTimeout(() => {
          resetPosition()
          isRefreshing.value = false
        }, Number(props.successDuration))
      } else {
        // 没有成功文案，直接回弹
        resetPosition()
        isRefreshing.value = false
      }
    }
  }
)

// 触摸事件处理
function handleTouchStart(event: TouchEvent) {
  if (props.disabled || isRefreshing.value) return

  // 检查是否在顶部
  const currentScrollTop = getCurrentScrollTop()
  if (currentScrollTop > 0) return

  touch.touchStart(event)
  duration.value = 0
}

function handleTouchMove(event: TouchEvent) {
  if (props.disabled || isRefreshing.value) return

  touch.touchMove(event)

  // 只处理向下滑动
  if (touch.deltaY.value <= 0 || touch.direction.value !== 'vertical') {
    return
  }

  // 检查是否在顶部
  const currentScrollTop = getCurrentScrollTop()
  if (currentScrollTop > 0) return

  // 阻止默认滚动
  event.preventDefault()

  // 计算下拉距离，添加阻尼效果
  const damping = 0.5
  distance.value = Math.max(0, touch.deltaY.value * damping)

  // 更新状态
  if (distance.value >= pullDistance.value) {
    setStatus('loosing')
  } else if (distance.value > 0) {
    setStatus('pulling')
  }
}

function handleTouchEnd() {
  if (props.disabled || isRefreshing.value) return

  duration.value = Number(props.animationDuration)

  if (status.value === 'loosing') {
    // 触发刷新
    distance.value = Number(props.headHeight)
    setStatus('loading')
    isRefreshing.value = true
    emit('update:modelValue', true)
    emit('refresh')
  } else {
    // 重置位置
    resetPosition()
  }
}

// 设置状态
function setStatus(newStatus: PullRefreshStatus) {
  if (status.value !== newStatus) {
    status.value = newStatus
    emit('change', { status: newStatus, distance: distance.value })
  }
}

// 重置位置
function resetPosition() {
  // 设置动画时长
  duration.value = Number(props.animationDuration)
  distance.value = 0
  setStatus('normal')

  // 动画完成后清除duration
  setTimeout(() => {
    duration.value = 0
  }, Number(props.animationDuration))
}

// 获取当前滚动位置
function getCurrentScrollTop(): number {
  try {
    if (props.scrollMode === 'scroll-view') {
      // scroll-view 模式：使用 scroll-view 的 scrollTop
      return scrollTop.value
    } else {
      // page 模式：使用页面滚动位置
      return pageScrollTop.value
    }
  } catch {
    return 0
  }
}

// 完成刷新
function finish() {
  if (isRefreshing.value) {
    emit('update:modelValue', false)
  }
}

// 暴露方法给父组件使用
defineExpose({
  finish,
  scrollMode: computed(() => props.scrollMode)
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
