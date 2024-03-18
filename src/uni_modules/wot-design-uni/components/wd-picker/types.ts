import type { PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import type { ColumnItem, PickerViewColumnChange } from '../wd-picker-view/types'
import type { FormItemRule } from '../wd-form/types'

export const pickerProps = {
  ...baseProps,
  customLabelClass: makeStringProp(''),
  customValueClass: makeStringProp(''),
  customViewClass: makeStringProp(''),
  // 选择器左侧文案
  label: String,
  // 选择器占位符
  placeholder: String,
  // 禁用
  disabled: makeBooleanProp(false),
  // 只读
  readonly: makeBooleanProp(false),
  loading: makeBooleanProp(false),
  loadingColor: makeStringProp('#4D80F0'),
  /* popup */
  // 弹出层标题
  title: String,
  // 取消按钮文案
  cancelButtonText: String,
  // 确认按钮文案
  confirmButtonText: String,
  // 是否必填
  required: makeBooleanProp(false),
  size: String,
  labelWidth: String,
  useDefaultSlot: makeBooleanProp(false),
  useLabelSlot: makeBooleanProp(false),
  error: makeBooleanProp(false),
  alignRight: makeBooleanProp(false),
  beforeConfirm: Function as PropType<PickerBeforeConfirm>,
  closeOnClickModal: makeBooleanProp(true),
  safeAreaInsetBottom: makeBooleanProp(true),
  ellipsis: makeBooleanProp(false),
  // 选项总高度
  columnsHeight: makeNumberProp(217),
  // 选项对象中，value对应的 key
  valueKey: makeStringProp('value'),
  // 选项对象中，展示的文本对应的 key
  labelKey: makeStringProp('label'),
  // 初始值
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | Array<string> | Array<number>>,
    default: ''
  },
  // 选择器数据
  // Array<string | number | ColumnItem | Array<string | number | ColumnItem>>
  columns: {
    type: Array as PropType<Array<string | number | ColumnItem | Array<string | number | ColumnItem>>>,
    default: () => []
  },
  // 多级联动
  columnChange: Function as PropType<PickerViewColumnChange>,
  // 外部展示格式化函数
  displayFormat: Function as PropType<PickerDisplayFormat>,
  // 自定义层级
  zIndex: makeNumberProp(15),
  prop: String,
  rules: makeArrayProp<FormItemRule>()
}

export type PickerDisplayFormat = (item: ColumnItem | ColumnItem[], vl: { valueKey: string; labelKey: string }) => string

export type PickerBeforeConfirm = (
  value: string | number | boolean | string[] | number[] | boolean[],
  resolve: (isPass: boolean) => void,
  picker: any
) => void
