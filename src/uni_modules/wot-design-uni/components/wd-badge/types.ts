import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeStringProp } from '../common/props'

export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export const badgeProps = {
  ...baseProps,
  modelValue: makeNumericProp(null),
  /** 当数值为 0 时，是否展示徽标 */
  showZero: makeBooleanProp(false),
  bgColor: String,
  max: Number,
  isDot: Boolean,
  hidden: Boolean,
  type: makeStringProp<BadgeType | undefined>(undefined),
  top: Number,
  right: Number,
  customClass: String,
  customStyle: String
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
