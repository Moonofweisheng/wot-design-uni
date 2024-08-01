import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type TextType = 'default' | 'primary' | 'success' | 'warning' | 'error'

export const textProps = {
  ...baseProps,
  /**
   * 主题类型
   * 类型：string
   * 可选值：'default' /'primary' / 'error' / 'warning' / 'success'
   * 默认值：'default'
   */
  type: makeStringProp<TextType>('default'),
  /**
   * 文字
   * 类型：string
   * 默认值：'空字符串'
   */
  text: makeStringProp(''),
  /**
   * 字体大小
   * 类型：string
   * 默认值：'空字符串'
   */
  size: makeStringProp(''),
  /**
   * 文本处理的匹配模式
   * 可选值：'text-普通文本' / 'date - 日期' / 'phone - 手机号' / 'name - 姓名' / 'price - 金额'
   * 类型：string
   * 默认值：'text'
   */
  mode: makeStringProp('text'),
  /**
   * 文字装饰，下划线，中划线等
   * 可选值：'underline/line-through/overline'
   * 类型：string
   * 默认值：'none'
   */
  decoration: makeStringProp('none'),

  /**
   * mode=phone时，点击文本是否拨打电话
   * 类型：boolean
   * 默认值：false
   */
  call: makeBooleanProp(false),
  /**
   * 是否粗体，默认normal
   * 类型：boolean
   * 默认值：false
   */
  bold: makeBooleanProp(false),
  /**
   * 是否脱敏,当mode为phone和name时生效
   * 类型：boolean
   * 默认值：false
   */
  format: makeBooleanProp(false),
  /**
   * 文本颜色
   * 类型：string
   * 默认值：''
   */
  color: makeStringProp(''),
  /**
   * 前置插槽
   * 类型：string
   * 默认值：''
   */
  prefix: String,
  /**
   * 后置插槽
   * 类型：string
   * 默认值：''
   */
  suffix: String,
  /**
   * 文本显示的行数，如果设置，超出此行数，将会显示省略号。最大值为5。
   */
  lines: Number,
  /**
   * 文本行高
   * 类型：string
   * 默认值：''
   */
  lineHeight: makeStringProp(''),
  /**
   * 自定义根节点样式
   */
  customStyle: makeStringProp(''),
  /**
   * 自定义根节点样式类
   */
  customClass: makeStringProp('')
}

export type TextProps = ExtractPropTypes<typeof textProps>
