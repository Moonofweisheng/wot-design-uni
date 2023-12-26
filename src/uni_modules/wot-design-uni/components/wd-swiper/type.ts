import type { SwiperIndicatorType } from '../wd-swiper-nav/type'

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

export interface SwiperIndicatorProps {
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
