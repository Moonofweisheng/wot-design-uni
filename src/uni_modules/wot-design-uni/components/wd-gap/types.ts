import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export const gapProps = {
  ...baseProps,
  bgColor: makeStringProp('transparent'),
  safeAreaBottom: makeBooleanProp(false),
  height: makeNumericProp(15)
}
