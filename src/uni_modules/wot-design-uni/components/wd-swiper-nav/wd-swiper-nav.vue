<template>
  <view v-if="showControls" class="wd-swiper-nav__btn">
    <view class="wd-swiper-nav__btn--prev" @click="handleNav('prev')" />
    <view class="wd-swiper-nav__btn--next" @click="handleNav('next')" />
  </view>
  <view
    v-if="total >= minShowNum"
    :style="customStyle"
    :class="`wd-swiper-nav wd-swiper-nav--${direction} wd-swiper-nav--${type} wd-swiper-nav--${indicatorPosition} ${customClass}`"
  >
    <block v-if="type === 'dots' || type === 'dots-bar'">
      <view
        v-for="(item, index) in total"
        :key="index"
        :class="`wd-swiper-nav__item--${type} ${current === index ? 'is-active' : ''} is-${direction}`"
      ></view>
    </block>
    <block v-if="type === 'fraction'">{{ current + 1 }}/{{ total }}</block>
  </view>
</template>

<script lang="ts" setup>
import type { DirectionType, IndicatorPositionType } from '../wd-swiper/type'
import type { SwiperIndicatorType } from './type'

interface Props {
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
  customClass?: string
  customStyle?: string
}

withDefaults(defineProps<Props>(), {
  customClass: '',
  customStyle: '',
  current: 0,
  direction: 'horizontal',
  minShowNum: 2,
  indicatorPosition: 'bottom',
  showControls: false,
  total: 0,
  type: 'dots'
})

const emit = defineEmits(['change'])

function handleNav(dir: 'prev' | 'next') {
  const source: string = 'nav'
  emit('change', { dir, source })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
