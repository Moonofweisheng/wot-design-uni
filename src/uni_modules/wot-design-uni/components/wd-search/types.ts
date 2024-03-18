import { baseProps, makeBooleanProp, makeNumericProp, makeStringProp } from '../common/props'

export const searchProps = {
  ...baseProps,
  modelValue: makeStringProp(''),
  userSuffixSlot: makeBooleanProp(false),
  placeholder: String,
  cancelTxt: String,
  light: makeBooleanProp(false),
  hideCancel: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  maxlength: makeNumericProp(-1),
  placeholderLeft: makeBooleanProp(false),
  focus: makeBooleanProp(false),
  focusWhenClear: makeBooleanProp(false)
}
