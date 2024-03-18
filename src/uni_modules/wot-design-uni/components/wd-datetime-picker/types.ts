import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { DateTimeType, DatetimePickerViewFilter, DatetimePickerViewFormatter } from '../wd-datetime-picker-view/types'
import type { FormItemRule } from '../wd-form/types'

export const datetimePickerProps = {
  ...baseProps,
  label: String,
  placeholder: String,
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  loading: makeBooleanProp(false),
  loadingColor: makeStringProp('#4D80F0'),
  title: String,
  cancelButtonText: String,
  confirmButtonText: String,
  required: makeBooleanProp(false),
  size: String,
  labelWidth: makeStringProp('33%'),
  useDefaultSlot: makeBooleanProp(false),
  useLabelSlot: makeBooleanProp(false),
  error: makeBooleanProp(false),
  alignRight: makeBooleanProp(false),
  closeOnClickModal: makeBooleanProp(true),
  safeAreaInsetBottom: makeBooleanProp(true),
  ellipsis: makeBooleanProp(false),
  columnsHeight: makeNumberProp(217),
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  modelValue: makeRequiredProp([String, Number, Date, Array] as PropType<string | number | Date | Array<string | number | Date>>),
  type: makeStringProp<DateTimeType>('datetime'),
  minDate: makeNumberProp(new Date(new Date().getFullYear() - 10, 0, 1).getTime()),
  maxDate: makeNumberProp(new Date(new Date().getFullYear() + 10, 11, 31).getTime()),
  minHour: makeNumberProp(0),
  maxHour: makeNumberProp(23),
  minMinute: makeNumberProp(0),
  maxMinute: makeNumberProp(59),
  filter: Function as PropType<DatetimePickerViewFilter>,
  formatter: Function as PropType<DatetimePickerViewFormatter>,
  displayFormat: Function as PropType<DatetimePickerDisplayFormat>,
  beforeConfirm: Function as PropType<DatetimePickerBeforeConfirm>,
  displayFormatTabLabel: Function as PropType<DatetimePickerDisplayFormatTabLabel>,
  defaultValue: [String, Number, Array] as PropType<string | number | Array<string | number>>,
  zIndex: makeNumberProp(15),
  prop: String,
  rules: makeArrayProp<FormItemRule>(),
  customViewClass: makeStringProp(''),
  customLabelClass: makeStringProp(''),
  customValueClass: makeStringProp('')
}

export type DatetimePickerDisplayFormat = (items: Record<string, any>[]) => string

export type DatetimePickerBeforeConfirm = (
  value: number | string | (number | string)[],
  resolve: (isPass: boolean) => void,
  picker: DatetimePickerInstance
) => void

export type DatetimePickerDisplayFormatTabLabel = (items: Record<string, any>[]) => string

export type DatetimePickerExpose = {
  open: () => void
  close: () => void
  setLoading: (loading: boolean) => void
}

export type DatetimePickerProps = ExtractPropTypes<typeof datetimePickerProps>

export type DatetimePickerInstance = ComponentPublicInstance<DatetimePickerProps, DatetimePickerExpose>
