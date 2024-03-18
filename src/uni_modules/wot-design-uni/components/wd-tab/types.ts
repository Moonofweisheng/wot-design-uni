import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp } from '../common/props'

export const tabProps = {
  ...baseProps,
  /**
   * 唯一标识符
   */
  name: String,
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
