import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp } from '../common/props'

export const tabProps = {
  ...baseProps,
  name: String, // 唯一标识符
  title: String, // tab的label
  disabled: makeBooleanProp(false) // tab禁用，无法点击
}

export type TabProps = ExtractPropTypes<typeof tabProps>
