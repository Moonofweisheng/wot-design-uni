import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp } from '../common/props'

export type CardType = 'rectangle'

export const cardProps = {
  ...baseProps,
  /**
   * 卡片类型
   */
  type: String as PropType<CardType>,
  /**
   * 卡片标题
   */
  title: String,
  /**
   * 标题自定义样式
   */
  customTitleClass: makeStringProp(''),
  /**
   * 内容自定义样式
   */
  customContentClass: makeStringProp(''),
  /**
   * 底部自定义样式
   */
  customFooterClass: makeStringProp('')
}

export type CardProps = ExtractPropTypes<typeof cardProps>
