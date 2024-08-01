import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'
import type { SwiperNavProps } from '../wd-swiper-nav/types'
import type { ImageMode } from '../wd-img/types'

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
  value?: string
}

export const swiperProps = {
  ...baseProps,

  /**
   * 是否自动播放轮播图
   * 类型：boolean
   * 默认值：true
   */
  autoplay: makeBooleanProp(true),

  /**
   * 当前轮播在哪一项（下标）
   * 类型：number
   * 默认值：0
   */
  current: makeNumberProp(0),

  /**
   * 轮播滑动方向，可选值：'horizontal'（水平）或'vertical'（垂直）
   * 类型：string
   * 默认值：'horizontal'
   */
  direction: makeStringProp<DirectionType>('horizontal'),

  /**
   * 同时显示的滑块数量
   * 类型：number
   * 默认值：1
   */
  displayMultipleItems: makeNumberProp(1),

  /**
   * 滑动动画时长，单位为毫秒
   * 类型：number
   * 默认值：300
   */
  duration: makeNumberProp(300),

  /**
   * 指定 swiper 切换缓动动画类型
   * 类型：string
   * 默认值：'default'
   */
  easingFunction: makeStringProp<EasingType>('default'),

  /**
   * 轮播的高度
   * 类型：number 或 string（数字或可转换为数字的字符串）
   * 默认值：'192'
   */
  height: makeNumericProp('192'),

  /**
   * 轮播间隔时间，单位为毫秒
   * 类型：number
   * 默认值：5000
   */
  interval: makeNumberProp(5000),

  /**
   * 图片列表，可以是一个图片对象数组或字符串数组
   * 类型：array
   * 默认值：空数组
   */
  list: {
    type: Array as PropType<SwiperList[] | string[]>,
    default: () => []
  },

  /**
   * 是否循环播放轮播图
   * 类型：boolean
   * 默认值：true
   */
  loop: makeBooleanProp(true),

  /**
   * 后边距
   * 类型：number 或 string（数字或可转换为数字的字符串）
   * 默认值：'0'
   */
  nextMargin: makeNumericProp('0'),

  /**
   * 页码信息展示位置，可选值：'bottom'（底部）等
   * 类型：string
   * 默认值：'bottom'
   */
  indicatorPosition: makeStringProp<IndicatorPositionType>('bottom'),

  /**
   * 前边距
   * 类型：number 或 string（数字或可转换为数字的字符串）
   * 默认值：'0'
   */
  previousMargin: makeNumericProp('0'),

  /**
   * 是否应用边距到第一个、最后一个元素
   * 类型：boolean
   * 默认值：false
   */
  snapToEdge: makeBooleanProp(false),

  /**
   * 指示器全部配置，可以是布尔值或指示器配置对象
   * 类型：boolean 或 object
   * 默认值：true
   */
  indicator: {
    type: [Boolean, Object] as PropType<boolean | Partial<SwiperNavProps>>,
    default: true
  },

  /**
   * 图片裁剪、缩放的模式
   * 类型：string
   * 默认值：'aspectFill'
   */
  imageMode: makeStringProp<ImageMode>('aspectFill'),
  /**
   * 选项对象中，value 对应的 key
   */
  valueKey: makeStringProp('value'),
  /**
   * 自定义指示器类名
   * 类型：string
   */
  customIndicatorClass: makeStringProp(''),

  /**
   * 自定义图片类名
   * 类型：string
   */
  customImageClass: makeStringProp(''),

  /**
   * 自定义上一个图片类名
   * 类型：string
   */
  customPrevImageClass: makeStringProp(''),

  /**
   * 自定义下一个图片类名
   * 类型：string
   */
  customNextImageClass: makeStringProp('')
}

export type SwiperProps = ExtractPropTypes<typeof swiperProps>
