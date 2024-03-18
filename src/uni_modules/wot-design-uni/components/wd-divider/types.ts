import type { ExtractPropTypes } from 'vue'
import { baseProps, makeStringProp } from '../common/props'

export const dividerProps = {
  ...baseProps,
  /**
   * 自定义颜色，所有颜色的写法
   */
  color: makeStringProp('')
}

export type DividerProps = ExtractPropTypes<typeof dividerProps>
