import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type DividerPosition = 'center' | 'left' | 'right'
export type DividerDirection = 'horizontal' | 'vertical'

export const dividerProps = {
  ...baseProps,
  /**
   * 自定义颜色
   */
  color: String,
  /**
   * 内容位置，可选值为 `left` `right` `center`
   * 默认值：`center`
   */
  contentPosition: makeStringProp<DividerPosition>('center'),
  /**
   * 是否显示为虚线
   * 默认值：`false`
   */
  dashed: Boolean,
  /**
   * 是否为垂直分割线
   * 默认值：`false`
   */
  vertical: makeBooleanProp(false),
  /**
   * 是否显示为 0.5px 的线
   * 默认值：`true`
   */
  hairline: makeBooleanProp(true)
}

export type DividerProps = ExtractPropTypes<typeof dividerProps>
