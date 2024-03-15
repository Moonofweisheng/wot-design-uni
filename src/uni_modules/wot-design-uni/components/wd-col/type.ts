import type { ExtractPropTypes } from 'vue'
import { baseProps, makeNumberProp } from '../common/props'

export const colProps = {
  ...baseProps,
  span: makeNumberProp(24),
  offset: makeNumberProp(0)
}
export type ColProps = ExtractPropTypes<typeof colProps>
