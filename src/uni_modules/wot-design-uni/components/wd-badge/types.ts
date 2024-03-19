/*
 * @Author: weisheng
 * @Date: 2024-03-15 11:36:12
 * @LastEditTime: 2024-03-19 16:33:12
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-badge\types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export const badgeProps = {
  ...baseProps,
  /**
   * 显示值
   */
  modelValue: {
    type: [Number, String, null] as PropType<number | string | null>,
    default: null
  },
  /** 当数值为 0 时，是否展示徽标 */
  showZero: makeBooleanProp(false),
  bgColor: String,
  /**
   * 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型
   */
  max: Number,
  /**
   * 是否为红色点状标注
   */
  isDot: Boolean,
  /**
   * 是否隐藏 badge
   */
  hidden: Boolean,
  /**
   * badge类型，可选值primary / success / warning / danger / info
   */
  type: makeStringProp<BadgeType | undefined>(undefined),
  /**
   * 为正时，角标向下偏移对应的像素
   */
  top: Number,
  /**
   * 为正时，角标向左偏移对应的像素
   */
  right: Number
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
