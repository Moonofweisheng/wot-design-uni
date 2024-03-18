import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeRequiredProp } from '../common/props'
import type { BadgeProps } from '../wd-badge/types'

export const sidebarItemProps = {
  ...baseProps,
  /** 当前选项标题 */
  label: makeRequiredProp(String),
  /** 当前选项的值，唯一标识 */
  value: makeRequiredProp([Number, String]),
  /** 徽标显示值 */
  badge: makeNumericProp(null),
  /** 徽标属性，透传给 Badge 组件 */
  badgeProps: Object as PropType<Partial<BadgeProps>>,
  /** 图标 */
  icon: String,
  /** 是否点状徽标 */
  isDot: Boolean,
  /** 徽标最大值 */
  max: makeNumberProp(99),
  /** 是否禁用 */
  disabled: makeBooleanProp(false)
}

export type SidebarItemProps = ExtractPropTypes<typeof sidebarItemProps>
