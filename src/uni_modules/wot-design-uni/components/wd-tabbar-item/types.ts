import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeNumberProp, numericProp } from '../common/props'
import type { BadgeProps } from '../wd-badge/types'

/**
 * 折叠面板子项
 */
export interface TabbarItem {
  // 唯一标识
  name: string | number
}

export const tabbarItemProps = {
  ...baseProps,
  /**
   * 标签页的标题
   */
  title: String,
  /**
   * 唯一标识符
   */
  name: numericProp,
  /**
   * 图标
   */
  icon: String,
  /**
   * 徽标显示值
   */
  value: {
    type: [Number, String, null] as PropType<number | string | null>,
    default: null
  },
  /**
   * 是否点状徽标
   */
  isDot: {
    type: Boolean,
    default: undefined
  },
  /**
   * 徽标最大值
   */
  max: Number,
  /**
   * 徽标属性，透传给 Badge 组件
   */
  badgeProps: Object as PropType<BadgeProps>
}

export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>
