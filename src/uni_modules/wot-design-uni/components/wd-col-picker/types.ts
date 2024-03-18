import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { FormItemRule } from '../wd-form/types'

export const colPickerProps = {
  ...baseProps,
  // Array<string | number>
  modelValue: makeRequiredProp(Array as PropType<Array<string | number>>),
  columns: makeArrayProp<Record<string, any>[]>(),
  label: String,
  labelWidth: makeStringProp('33%'),
  useLabelSlot: makeBooleanProp(false),
  useDefaultSlot: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  placeholder: String,
  title: String,
  // 接收当前列的选中项 item、当前列下标、当前列选中项下标下一列数据处理函数 resolve、结束选择 finish
  columnChange: Function as PropType<ColPickerColumnChange>,
  // 外部展示格式化函数
  displayFormat: Function as PropType<ColPickerDisplayFormat>,
  beforeConfirm: Function as PropType<ColPickerBeforeConfirm>,
  alignRight: makeBooleanProp(false),
  error: makeBooleanProp(false),
  required: makeBooleanProp(false),
  size: String,
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  tipKey: makeStringProp('tip'),
  loadingColor: makeStringProp('#4D80F0'),
  closeOnClickModal: makeBooleanProp(true),
  autoComplete: makeBooleanProp(false),
  zIndex: makeNumberProp(15),
  safeAreaInsetBottom: makeBooleanProp(true),
  ellipsis: makeBooleanProp(false),
  prop: String,
  rules: makeArrayProp<FormItemRule>(),
  customViewClass: makeStringProp(''),
  customLabelClass: makeStringProp(''),
  customValueClass: makeStringProp('')
}

export type ColPickerProps = ExtractPropTypes<typeof colPickerProps>

export type ColPickerColumnChangeOption = {
  selectedItem: Record<string, any>
  index: number
  rowIndex: number
  resolve: (nextColumn: Record<string, any>[]) => void
  finish: (isOk?: boolean) => void
}
export type ColPickerColumnChange = (option: ColPickerColumnChangeOption) => void
export type ColPickerDisplayFormat = (selectedItems: Record<string, any>[]) => string
export type ColPickerBeforeConfirm = (value: (string | number)[], selectedItems: Record<string, any>[], resolve: (isPass: boolean) => void) => void

export type ColPickerExpose = {
  close: () => void
  open: () => void
}

export type ColPickerInstance = ComponentPublicInstance<ColPickerExpose, ColPickerProps>
