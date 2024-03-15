import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export const sortButtonProps = {
  ...baseProps,
  title: makeStringProp(''),
  modelValue: makeNumberProp(0),
  allowReset: makeBooleanProp(false),
  descFirst: makeBooleanProp(false),
  line: makeBooleanProp(true)
}

export type SortButtonProps = ExtractPropTypes<typeof sortButtonProps>
