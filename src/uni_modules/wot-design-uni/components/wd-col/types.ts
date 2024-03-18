import type { ExtractPropTypes } from 'vue'
import { baseProps, makeNumberProp } from '../common/props'

export const colProps = {
  ...baseProps,
  /**
   * 列元素宽度
   */
  span: makeNumberProp(24),
  /**
   * 列元素偏移距离
   */
  offset: makeNumberProp(0)
}
export type ColProps = ExtractPropTypes<typeof colProps>
