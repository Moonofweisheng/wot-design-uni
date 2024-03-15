import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'
import type { FormItemRule } from '../wd-form/types'

export type ConfirmType = 'send' | 'search' | 'next' | 'go' | 'done'

export const textareaProps = {
  ...baseProps,
  // 原生属性
  placeholder: String,
  placeholderStyle: String,
  placeholderClass: makeStringProp(''),
  disabled: makeBooleanProp(false),
  maxlength: makeNumberProp(-1),
  focus: makeBooleanProp(false),
  autoFocus: makeBooleanProp(false),
  autoHeight: makeBooleanProp(false),
  fixed: makeBooleanProp(false),
  cursorSpacing: makeNumberProp(0),
  cursor: makeNumberProp(-1),
  confirmType: makeStringProp<ConfirmType>('done'),
  confirmHold: makeBooleanProp(false),
  showConfirmBar: makeBooleanProp(true),
  selectionStart: makeNumberProp(-1),
  selectionEnd: makeNumberProp(-1),
  adjustPosition: makeBooleanProp(true),
  disableDefaultPadding: makeBooleanProp(false),
  holdKeyboard: makeBooleanProp(false),
  // 原生属性结束
  modelValue: makeNumericProp(''),
  showPassword: makeBooleanProp(false),
  clearable: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  prefixIcon: String,
  usePrefixSlot: makeBooleanProp(false),
  showWordLimit: makeBooleanProp(false),
  label: String,
  labelWidth: makeStringProp('33%'),
  useLabelSlot: makeBooleanProp(false),
  size: String,
  error: makeBooleanProp(false),
  center: makeBooleanProp(false),
  noBorder: makeBooleanProp(false),
  required: makeBooleanProp(false),
  prop: makeStringProp(''),
  rules: makeArrayProp<FormItemRule>(),
  customTextareaContainerClass: makeStringProp(''),
  customTextareaClass: makeStringProp(''),
  customLabelClass: makeStringProp('')
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
