import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export const rateProps = {
  ...baseProps,
  num: makeNumberProp(5),
  modelValue: {
    type: [String, Number, null] as PropType<string | number | null>,
    default: null
  },
  readonly: makeBooleanProp(false),
  size: makeStringProp('16px'),
  space: makeStringProp('4px'),
  color: makeStringProp('#E8E8E8'),
  activeColor: {
    type: [String, Array] as PropType<string | Array<string>>,
    default: 'linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)'
  },
  icon: makeStringProp('star-on'),
  activeIcon: makeStringProp('star-on'),
  disabled: makeBooleanProp(false),
  disabledColor: makeStringProp('linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%)')
}
