import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, numericProp } from '../common/props'

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
  disabled: makeBooleanProp(false)
}

export type TabProps = ExtractPropTypes<typeof tabProps>
