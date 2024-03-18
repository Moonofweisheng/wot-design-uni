import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type TransitionName =
  | 'fade'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'zoom-in'
  | 'zoom-out'

export const transitionProps = {
  ...baseProps,
  show: makeBooleanProp(false),
  duration: {
    type: [Object, Number, Boolean] as PropType<Record<string, number> | number | boolean>,
    default: 300
  },
  name: makeStringProp<TransitionName | ''>('fade'),
  lazyRender: makeBooleanProp(true),
  enterClass: makeStringProp(''),
  enterActiveClass: makeStringProp(''),
  enterToClass: makeStringProp(''),
  leaveClass: makeStringProp(''),
  leaveActiveClass: makeStringProp(''),
  leaveToClass: makeStringProp('')
}

export type TransitionProps = ExtractPropTypes<typeof transitionProps>
