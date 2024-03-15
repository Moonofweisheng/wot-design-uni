import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export const sliderProps = {
  ...baseProps,
  customMinClass: makeStringProp(''),
  customMaxClass: makeStringProp(''),
  hideMinMax: makeBooleanProp(false),
  hideLabel: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  inactiveColor: makeStringProp('#e5e5e5'),
  activeColor: makeStringProp(''),
  max: makeNumberProp(100),
  min: makeNumberProp(0),
  step: makeNumberProp(1),
  modelValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0
  }
}
