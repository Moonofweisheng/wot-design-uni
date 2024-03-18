import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type ClosePosition = 'inset' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export const curtainProps = {
  ...baseProps,
  value: makeBooleanProp(false),
  closePosition: makeStringProp<ClosePosition>('inset'),
  src: String,
  to: String,
  width: Number,
  closeOnClickModal: makeBooleanProp(false),
  hideWhenClose: makeBooleanProp(true)
}

export type CurtainProps = ExtractPropTypes<typeof curtainProps>
