import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../common/props'

export const overlayProps = {
  ...baseProps,
  show: makeBooleanProp(false),
  duration: {
    type: [Object, Number, Boolean] as PropType<Record<string, number> | number | boolean>,
    default: 300
  },
  lockScroll: makeBooleanProp(true),
  zIndex: makeNumberProp(10)
}
