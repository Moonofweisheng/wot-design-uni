import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'
import type { SwiperNavProps } from '../wd-swiper-nav/type'

/**
 * 轮播滑动方向
 */
export type DirectionType = 'horizontal' | 'vertical'

/**
 * 切换动画
 */
export type EasingType = 'default' | 'linear' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'

/**
 * 指示器位置
 */
export type IndicatorPositionType = 'left' | 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right' | 'right'

export interface SwiperList {
  [key: string]: any
  value: string
}

export const swiperProps = {
  ...baseProps,
  autoplay: makeBooleanProp(true), // 是否自动播放
  current: makeNumberProp(0), // 当前轮播在哪一项（下标）
  direction: makeStringProp<DirectionType>('horizontal'), // 轮播滑动方向
  displayMultipleItems: makeNumberProp(1), // 同时显示的滑块数量
  duration: makeNumberProp(300), // 滑动动画时长
  easingFunction: makeStringProp<EasingType>('default'), // 指定 swiper 切换缓动动画类型
  height: makeNumericProp('192'), // 轮播的高度
  interval: makeNumberProp(5000), // 轮播间隔时间
  list: {
    type: Array as PropType<SwiperList[] | string[]>,
    default: () => []
  }, // 图片列表
  loop: makeBooleanProp(true), // 是否循环播放
  nextMargin: makeNumericProp('0'), // 后边距
  indicatorPosition: makeStringProp<IndicatorPositionType>('bottom'), // 页码信息展示位置
  previousMargin: makeNumericProp('0'), // 前边距
  snapToEdge: makeBooleanProp(false), // 是否应用边距到第一个、最后一个元素
  indicator: {
    type: [Boolean, Object] as PropType<boolean | Partial<SwiperNavProps>>,
    default: true
  }, // 指示器全部配置
  imageMode: makeStringProp('aspectFill'), // 图片裁剪、缩放的模式
  customIndicatorClass: makeStringProp(''), // 自定义指示器类名
  customImageClass: makeStringProp(''), // 自定义图片类名
  customPrevImageClass: makeStringProp(''), // 自定义上一个图片类名
  customNextImageClass: makeStringProp('') // 自定义下一个图片类名
}

export type SwiperProps = ExtractPropTypes<typeof swiperProps>
