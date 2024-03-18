import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

export const tagProps = {
  ...baseProps,

  /**
   * 是否开启图标插槽
   * 类型：boolean
   * 默认值：false
   */
  useIconSlot: makeBooleanProp(false),

  /**
   * 标签类型
   * 类型：string
   * 可选值：'default' / 'primary' / 'danger' / 'warning' / 'success'
   * 默认值：'default'
   */
  type: makeStringProp<TagType>('default'),

  /**
   * 左侧图标
   * 类型：string
   * 默认值：空字符串
   */
  icon: makeStringProp(''),

  /**
   * 是否可关闭（只对圆角类型支持）
   * 类型：boolean
   * 默认值：false
   */
  closable: makeBooleanProp(false),

  /**
   * 幽灵类型
   * 类型：boolean
   * 默认值：false
   */
  plain: makeBooleanProp(false),

  /**
   * 是否为新增标签
   * 类型：boolean
   * 默认值：false
   */
  dynamic: makeBooleanProp(false),

  /**
   * 文字颜色
   * 类型：string
   * 默认值：空字符串
   */
  color: makeStringProp(''),

  /**
   * 背景色和边框色
   * 类型：string
   * 默认值：空字符串
   */
  bgColor: makeStringProp(''),

  /**
   * 圆角类型
   * 类型：boolean
   * 默认值：false
   */
  round: makeBooleanProp(false),

  /**
   * 标记类型
   * 类型：boolean
   * 默认值：false
   */
  mark: makeBooleanProp(false)
}

export type TagProps = ExtractPropTypes<typeof tagProps>
