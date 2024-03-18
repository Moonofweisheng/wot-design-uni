import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import type { DirectionType, IndicatorPositionType } from '../wd-swiper/types'

/**
 * 指示器类型，点状(dots)、点条状(dots-bar)、分式(fraction)等
 */
export type SwiperIndicatorType = 'dots' | 'dots-bar' | 'fraction'

export const swiperNavprops = {
  ...baseProps,
  /**
   * 当前轮播在哪一项（下标）
   */
  current: makeNumberProp(0),
  /**
   * 轮播滑动方向，包括横向滑动和纵向滑动两个方向
   */
  direction: makeStringProp<DirectionType>('horizontal'),
  /**
   * 小于这个数字不会显示导航器
   */
  minShowNum: makeNumberProp(2),
  /**
   * 指示器位置
   */
  indicatorPosition: makeStringProp<IndicatorPositionType>('bottom'),
  /**
   * 是否显示两侧的控制按钮
   */
  showControls: makeBooleanProp(false),
  /**
   * 总共的项数
   */
  total: makeNumberProp(0),
  /**
   * 指示器类型，点状(dots)、点条状(dots-bar)、分式(fraction)等
   */
  type: makeStringProp<SwiperIndicatorType>('dots')
}

export type SwiperNavProps = ExtractPropTypes<typeof swiperNavprops>
