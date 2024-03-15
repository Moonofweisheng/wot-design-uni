import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeNumberProp, makeNumericProp, numericProp } from '../common/props'
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
  title: String, // 标签页的标题
  name: numericProp, // 唯一标识符
  icon: String, // 图标
  value: makeNumericProp(null), // 徽标显示值
  isDot: Boolean, // 是否点状徽标
  max: makeNumberProp(99), // 徽标最大值
  badgeProps: Object as PropType<BadgeProps> // 徽标属性，透传给 Badge 组件
}

export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>
