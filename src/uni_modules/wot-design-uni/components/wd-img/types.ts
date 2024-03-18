import { baseProps, makeBooleanProp, makeStringProp, numericProp } from '../common/props'

export const imgProps = {
  ...baseProps,
  customImage: makeStringProp(''),
  src: String,
  round: makeBooleanProp(false),
  mode: makeStringProp('scaleToFill'),
  lazyLoad: makeBooleanProp(false),
  width: numericProp,
  height: numericProp,
  radius: numericProp
}
