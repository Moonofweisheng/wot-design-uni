import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeRequiredProp } from '../common/props'

export type CollpaseItemBeforeExpand = (name: string) => void

export const collpaseItemProps = {
  ...baseProps,
  title: String,
  disabled: makeBooleanProp(false),
  name: makeRequiredProp(String),
  beforeExpend: Function as PropType<CollpaseItemBeforeExpand>
}

export type CollpaseItemProps = ExtractPropTypes<typeof collpaseItemProps>
