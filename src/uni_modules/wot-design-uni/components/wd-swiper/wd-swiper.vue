<template>
  <view :class="`wd-swiper ${customClass}`" :style="customStyle">
    <swiper
      class="wd-swiper__track"
      :autoplay="autoplay"
      :current="navCurrent"
      :interval="interval"
      :duration="duration"
      :circular="loop"
      :vertical="direction == 'vertical'"
      :easing-function="easingFunction"
      :previous-margin="previousMargin"
      :next-margin="nextMargin"
      :snap-to-edge="snapToEdge"
      :display-multiple-items="displayMultipleItems"
      :style="{ height: addUnit(height) }"
      @change="handleChange"
      @animationfinish="handleAnimationfinish"
    >
      <swiper-item v-for="(item, index) in list" :key="index" class="wd-swiper__item" @click="handleClick(index)">
        <image
          :src="isObj(item) ? item.value : item"
          :class="`wd-swiper__image ${customImageClass} ${getCustomImageClass(navCurrent, index, list)}`"
          :style="{ height: addUnit(height) }"
          :mode="imageMode"
        />
      </swiper-item>
    </swiper>

    <template v-if="indicator">
      <slot name="indicator" :current="navCurrent" :total="list.length"></slot>
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

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { addUnit, isObj } from '../common/util'
import type { DirectionType, EasingType, IndicatorPositionType, SwiperList } from './type'
import type { SwiperIndicatorType } from '../wd-swiper-nav/type'

interface SwiperIndicatorProps {
  /**
   * 当前轮播在哪一项（下标）
   * @default 0
   */
  current?: number
  /**
   * 轮播滑动方向，包括横向滑动和纵向滑动两个方向
   * @default horizontal
   */
  direction?: DirectionType
  /**
   * 小于这个数字不会显示导航器
   * @default 2
   */
  minShowNum?: number
  /**
   * 页码信息展示位置
   * @default bottom
   */
  indicatorPosition?: IndicatorPositionType
  /**
   * 是否显示两侧的控制按钮
   * @default false
   */
  showControls?: boolean
  /**
   * 总共的项数
   * @default 0
   */
  total?: number
  /**
   * 导航器类型，点状(dots)、点条状(dots-bar)、分式(fraction)等
   * @default dots
   */
  type?: SwiperIndicatorType
}

interface Props {
  /**
   * 是否自动播放
   * @default true
   */
  autoplay?: boolean
  /**
   * 当前轮播在哪一项（下标）
   * @default 0
   */
  current?: number
  /**
   * 轮播滑动方向，包括横向滑动和纵向滑动两个方向
   * @default horizontal
   */
  direction?: DirectionType
  /**
   * 同时显示的滑块数量
   * @default 1
   */
  displayMultipleItems?: number
  /**
   * 滑动动画时长
   * @default 300
   */
  duration?: number
  /**
   * 指定 swiper 切换缓动动画类型
   * @default default
   */
  easingFunction?: EasingType
  /**
   * 轮播的高度；默认单位 `px`
   * @default 192
   */
  height?: string | number
  /**
   * 轮播间隔时间
   * @default 5000
   */
  interval?: number
  /**
   * 图片列表
   */
  list?: string[] | SwiperList[]
  /**
   * 是否循环播放
   * @default true
   */
  loop?: boolean
  /**
   * 后边距，可用于露出后一项的一小部分。默认单位 `px`
   * @default 0
   */
  nextMargin?: string | number
  /**
   * 页码信息展示位置
   * @default bottom
   */
  indicatorPosition?: IndicatorPositionType
  /**
   * 前边距，可用于露出前一项的一小部分。默认单位 `px`
   * @default 0
   */
  previousMargin?: string | number
  /**
   * 当 swiper-item 的个数大于等于 2，关闭 circular 并且开启 previous-margin 或 next-margin 的时候，可以指定这个边距是否应用到第一个、最后一个元素
   * @default false
   */
  snapToEdge?: boolean
  /**
   * 指示器全部配置，true 的话使用默认配置
   * @default true
   */
  indicator?: SwiperIndicatorProps | boolean
  /**
   * 图片裁剪、缩放的模式
   */
  imageMode?: number | string
  /**
   * 外部自定义样式
   */
  customStyle?: string
  /**
   * 外部自定义类名
   */
  customClass?: string
  /**
   * 自定义指示器类名
   */
  customIndicatorClass?: string

  /**
   * 自定义图片类名
   */
  customImageClass?: string

  /**
   * 自定义上一个图片类名
   */
  customPrevImageClass?: string

  /**
   * 自定义下一个图片类名
   */
  customNextImageClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  customStyle: '',
  customClass: '',
  customIndicatorClass: '',
  customImageClass: '',
  customPrevImageClass: '',
  customNextImageClass: '',
  autoplay: true,
  current: 0,
  direction: 'horizontal',
  displayMultipleItems: 1,
  duration: 300,
  easingFunction: 'default',
  height: '192',
  interval: 5000,
  list: () => [],
  loop: true,
  indicator: true,
  nextMargin: '0',
  indicatorPosition: 'bottom',
  previousMargin: '0',
  snapToEdge: false,
  imageMode: 'aspectFill'
})

const navCurrent = ref<number>(0) // 当前滑块

onBeforeMount(() => {
  navCurrent.value = props.current
})

const swiperIndicator = computed(() => {
  const { list, direction, indicatorPosition, indicator } = props
  const swiperIndicator: SwiperIndicatorProps = {
    current: navCurrent.value || 0,
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

const emit = defineEmits(['click', 'change', 'animationfinish'])

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

function getCustomImageClass(current: number, index: number, list: string[] | SwiperList[]) {
  let customImageClass: string = ''
  if (isPrev(current, index, list)) {
    customImageClass = props.customPrevImageClass
  }
  if (isNext(current, index, list)) {
    customImageClass = props.customNextImageClass
  }
  return customImageClass
}

/**
 * 轮播滑块切换时触发
 * @param e
 */
function handleChange(e: { detail: { current: any; source: string } }) {
  const { current, source } = e.detail
  navCurrent.value = current
  emit('change', { current, source })
}

/**
 * 滑块动画结束
 */
function handleAnimationfinish(e: { detail: { current: any; source: string } }) {
  const { current, source } = e.detail
  // navCurrent.value = current
  /**
   * 滑块动画结束时触发
   * @arg value:Object 滑块值
   */
  emit('animationfinish', { current, source })
}

/**
 * 点击滑块事件
 * @param index 点击的滑块下标
 */
function handleClick(index: number) {
  emit('click', { index })
}

function handleIndicatorChange(e: { dir: any; source: string }) {
  const { dir, source } = e
  doIndicatorBtnChange(dir, source)
}

function doIndicatorBtnChange(dir: string, source: string) {
  const { list, loop } = props
  const total = list.length
  let nextPos = dir === 'next' ? navCurrent.value + 1 : navCurrent.value - 1

  if (loop) {
    nextPos = dir === 'next' ? (navCurrent.value + 1) % total : (navCurrent.value - 1 + total) % total
  } else {
    nextPos = nextPos < 0 || nextPos >= total ? navCurrent.value : nextPos
  }

  if (nextPos === navCurrent.value) return

  navCurrent.value = nextPos
  emit('change', { current: nextPos, source })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
