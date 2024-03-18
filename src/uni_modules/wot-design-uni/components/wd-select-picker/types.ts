import type { PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { FormItemRule } from '../wd-form/types'

export type SelectPickerType = 'checkbox' | 'radio'

export const selectPickerProps = {
  ...baseProps,
  label: String,
  labelWidth: makeStringProp('33%'),
  disabled: makeBooleanProp(false),
  readonly: Boolean,
  placeholder: String,
  title: String,
  alignRight: makeBooleanProp(false),
  error: makeBooleanProp(false),
  required: makeBooleanProp(false),
  useLabelSlot: makeBooleanProp(false),
  useDefaultSlot: makeBooleanProp(false),
  size: String,
  checkedColor: String,
  min: makeNumberProp(0),
  max: makeNumberProp(0),
  selectSize: String,
  loading: makeBooleanProp(false),
  loadingColor: makeStringProp('#4D80F0'),
  closeOnClickModal: makeBooleanProp(true),
  modelValue: makeRequiredProp([String, Number, Boolean, Array] as PropType<string | number | boolean | (string | number | boolean)[]>),
  columns: makeArrayProp<Record<string, any>>(),
  type: makeStringProp<SelectPickerType>('checkbox'),
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  confirmButtonText: String,
  displayFormat: Function as PropType<SelectPickerDisplayFormat>,
  beforeConfirm: Function as PropType<SelectPickerBeforeConfirm>,
  zIndex: makeNumberProp(15),
  safeAreaInsetBottom: makeBooleanProp(true),
  filterable: makeBooleanProp(false),
  filterPlaceholder: String,
  ellipsis: makeBooleanProp(false),
  scrollIntoView: makeBooleanProp(true),
  prop: String,
  rules: makeArrayProp<FormItemRule>(),
  customContentClass: makeStringProp(''),
  customLabelClass: makeStringProp(''),
  customValueClass: makeStringProp('')
}

export type SelectPickerDisplayFormat = (items: string | number | boolean | (string | number | boolean)[], columns: Record<string, any>[]) => string

export type SelectPickerBeforeConfirm = (value: string | number | boolean | (string | number | boolean)[], resolve: (isPass: boolean) => void) => void
