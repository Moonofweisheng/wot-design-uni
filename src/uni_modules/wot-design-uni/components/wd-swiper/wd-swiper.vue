<template>
  <view :class="`wd-swiper ${customClass}`" :style="customStyle">
    <!-- #ifdef MP-WEIXIN -->
    <scroll-view scroll-x scroll-y style="width: 100%; height: 100%">
      <!-- #endif -->
      <swiper
        :adjust-height="adjustHeight"
        :adjust-vertical-height="adjustVerticalHeight"
        class="wd-swiper__track"
        :autoplay="autoplay && !videoPlaying"
        :current="navCurrent"
        :interval="interval"
        :duration="duration"
        :circular="loop"
        :vertical="direction == 'vertical'"
        :easing-function="easingFunction"
        :previous-margin="addUnit(previousMargin)"
        :next-margin="addUnit(nextMargin)"
        :snap-to-edge="snapToEdge"
        :display-multiple-items="displayMultipleItems"
        :style="{ height: addUnit(height) }"
        @change="handleChange"
        @animationfinish="handleAnimationfinish"
      >
        <swiper-item v-for="(item, index) in list" :key="index" class="wd-swiper__item">
          <video
            v-if="isVideo(item)"
            :id="`video-${index}-${uid}`"
            :style="{ height: addUnit(height) }"
            :src="isObj(item) ? item[valueKey] : item"
            :poster="isObj(item) ? item.poster : ''"
            :class="`wd-swiper__video ${customItemClass} ${getCustomItemClass(currentValue, index, list)}`"
            @play="handleVideoPaly"
            @pause="handleVideoPause"
            :enable-progress-gesture="false"
            :loop="videoLoop"
            :muted="muted"
            :autoplay="autoplayVideo"
            objectFit="cover"
            @click="handleClick(index, item)"
          />
          <image
            v-else
            :src="isObj(item) ? item[valueKey] : item"
            :class="`wd-swiper__image ${customImageClass} ${customItemClass} ${getCustomItemClass(currentValue, index, list)}`"
            :style="{ height: addUnit(height) }"
            :mode="imageMode"
            @click="handleClick(index, item)"
          />

          <text v-if="isObj(item) && item[textKey]" :class="`wd-swiper__text ${customTextClass}`" :style="customTextStyle">{{ item[textKey] }}</text>
        </swiper-item>
      </swiper>
      <!-- #ifdef MP-WEIXIN -->
    </scroll-view>
    <!-- #endif -->

    <template v-if="indicator">
      <slot name="indicator" :current="currentValue" :total="list.length"></slot>
      <wd-swiper-nav
        v-if="!$slots.indicator"
        :custom-class="customIndicatorClass"
        :type="swiperIndicator.type"
        :current="swiperIndicator.current"
        :total="swiperIndicator.total"
        :direction="swiperIndicator.direction"
        :indicator-position="swiperIndicator.indicatorPosition"
        :min-show-num="swiperIndicator.minShowNum"
        :show-controls="swiperIndicator.showControls"
        @change="handleIndicatorChange"
      />
    </template>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-swiper',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdSwiperNav from '../wd-swiper-nav/wd-swiper-nav.vue'
import { computed, watch, ref, getCurrentInstance } from 'vue'
import { addUnit, isObj, isImageUrl, isVideoUrl, uuid, isDef } from '../common/util'
import { swiperProps, type SwiperList } from './types'
import type { SwiperNavProps } from '../wd-swiper-nav/types'

const props = defineProps(swiperProps)
const emit = defineEmits(['click', 'change', 'animationfinish', 'update:current'])
const navCurrent = ref<number>(props.current) // 当前滑块 swiper使用
const currentValue = ref<number>(props.current) // 当前滑块

/**
 * 更新当前滑块
 * @param current 当前滑块索引
 * @param force 是否强制更新swiper绑定的的current
 */
const updateCurrent = (current: number, force: boolean = false) => {
  currentValue.value = current
  if (force) {
    navCurrent.value = current
  }
  emit('update:current', current)
}

const videoPlaying = ref<boolean>(false) // 当前是否在播放视频

const { proxy } = getCurrentInstance() as any

const uid = ref<string>(uuid())

watch(
  () => props.current,
  (val) => {
    if (val < 0) {
      props.loop ? goToEnd() : goToStart()
    } else if (val >= props.list.length) {
      props.loop ? goToStart() : goToEnd()
    } else {
      navTo(val)
    }
  }
)

const swiperIndicator = computed(() => {
  const { list, direction, indicatorPosition, indicator } = props
  const swiperIndicator: Partial<SwiperNavProps> = {
    current: currentValue.value || 0,
    total: list.length || 0,
    direction: direction || 'horizontal',
    indicatorPosition: indicatorPosition || 'bottom'
  }
  if (isObj(indicator)) {
    swiperIndicator.type = indicator.type || 'dots'
    swiperIndicator.minShowNum = indicator.minShowNum || 2
    swiperIndicator.showControls = indicator.showControls || false
  }
  return swiperIndicator
})

const getMediaType = (item: string | SwiperList, type: 'video' | 'image') => {
  const checkType = (url: string) => (type === 'video' ? isVideoUrl(url) : isImageUrl(url))

  if (isObj(item)) {
    return item.type && ['video', 'image'].includes(item.type) ? item.type === type : checkType(item[props.valueKey])
  } else {
    return checkType(item)
  }
}

const isVideo = (item: string | SwiperList) => {
  return getMediaType(item, 'video')
}

const isImage = (item: string | SwiperList) => {
  return getMediaType(item, 'image')
}

function navTo(index: number) {
  if (index === currentValue.value) return
  updateCurrent(index, true)
}

function goToStart() {
  navTo(0)
}

function goToEnd() {
  navTo(props.list.length - 1)
}

// 视频播放
function handleVideoPaly() {
  props.stopAutoplayWhenVideoPlay && (videoPlaying.value = true)
}

// 视频暂停
function handleVideoPause() {
  videoPlaying.value = false
}

/**
 * 是否为当前滑块的前一个滑块
 * @param current
 * @param index
 * @param list
 */
function isPrev(current: number, index: number, list: string[] | SwiperList[]) {
  return (current - 1 + list.length) % list.length === index
}

/**
 * 是否为当前滑块的后一个滑块
 * @param current
 * @param index
 * @param list
 */
function isNext(current: number, index: number, list: string[] | SwiperList[]) {
  return (current + 1 + list.length) % list.length === index
}

function getCustomItemClass(current: number, index: number, list: string[] | SwiperList[]) {
  let customItemClass: string = ''
  if (isPrev(current, index, list)) {
    customItemClass = props.customPrevClass || props.customPrevImageClass
  }
  if (isNext(current, index, list)) {
    customItemClass = props.customNextClass || props.customNextImageClass
  }
  return customItemClass
}

/**
 * 轮播滑块切换时触发
 */
function handleChange(e: { detail: { current: number; source: string } }) {
  const { current, source } = e.detail
  const previous = currentValue.value
  emit('change', { current, source })
  if (current !== currentValue.value) {
    const forceUpdate = source === 'autoplay' || source === 'touch'
    updateCurrent(current, forceUpdate)
  }
  handleVideoChange(previous, current)
}

/**
 * 处理视频切换
 */
function handleVideoChange(previous: number, current: number) {
  handleStopVideoPaly(previous)
  handleStartVideoPaly(current)
}

/**
 * 开始播放指定视频
 * @param index
 */
function handleStartVideoPaly(index: number) {
  if (props.autoplayVideo) {
    const currentItem = props.list[index]
    if (isDef(currentItem) && isVideo(currentItem)) {
      const video = uni.createVideoContext(`video-${index}-${uid.value}`, proxy)
      video.play()
    }
  }
}

/**
 * 停止播放指定视频
 * @param index
 */
function handleStopVideoPaly(index: number) {
  if (props.stopPreviousVideo) {
    const previousItem = props.list[index]
    if (isDef(previousItem) && isVideo(previousItem)) {
      const video = uni.createVideoContext(`video-${index}-${uid.value}`, proxy)
      video.pause()
    }
  } else if (props.stopAutoplayWhenVideoPlay) {
    handleVideoPause()
  }
}

/**
 * 滑块动画结束
 */
function handleAnimationfinish(e: { detail: { current: any; source: string } }) {
  const { current, source } = e.detail
  if (current !== currentValue.value) {
    const forceUpdate = source === 'autoplay' || source === 'touch'
    updateCurrent(current, forceUpdate)
  }
  /**
   * 滑块动画结束时触发
   */
  emit('animationfinish', { current, source })
}

/**
 * 点击滑块事件
 * @param index 点击的滑块下标
 * @param item 点击的滑块内容
 */
function handleClick(index: number, item: string | SwiperList) {
  emit('click', { index, item })
}

function handleIndicatorChange({ dir }: { dir: 'prev' | 'next' }) {
  const { list, loop } = props
  const total = list.length
  let nextPos = dir === 'next' ? currentValue.value + 1 : currentValue.value - 1
  if (loop) {
    nextPos = dir === 'next' ? (currentValue.value + 1) % total : (currentValue.value - 1 + total) % total
  } else {
    nextPos = nextPos < 0 || nextPos >= total ? currentValue.value : nextPos
  }
  if (nextPos === currentValue.value) return
  navTo(nextPos)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
