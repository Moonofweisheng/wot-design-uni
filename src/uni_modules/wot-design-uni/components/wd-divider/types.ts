import type { ExtractPropTypes } from 'vue'
import { baseProps, makeStringProp } from '../common/props'

export const dividerProps = {
  ...baseProps,
  color: makeStringProp('')
}

export type DividerProps = ExtractPropTypes<typeof dividerProps>
