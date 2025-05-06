import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, numericProp } from '../common/props'
import type { BadgeProps } from '../wd-badge/types'

export const tabProps = {
  ...baseProps,
  /**
   * 唯一标识符
   */
  name: numericProp,
  /**
   * tab的标题
   */
  title: String,
  /**
   *  是否禁用，无法点击
   */
  disabled: makeBooleanProp(false),
  /**
   * 是否懒加载，切换到该tab时才加载内容
   * @default true
   */
  lazy: makeBooleanProp(true),
  /**
   * 徽标属性，透传给 Badge 组件
   */
  badgeProps: Object as PropType<Partial<BadgeProps>>
}

export type TabProps = ExtractPropTypes<typeof tabProps>
