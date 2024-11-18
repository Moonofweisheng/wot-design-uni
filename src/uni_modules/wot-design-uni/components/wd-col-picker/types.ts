import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp, numericProp } from '../common/props'

export type ColPickerOption = {
  label?: string
  value?: string | number
  tip?: string
  disabled?: boolean
  [key: PropertyKey]: any
}

export const colPickerProps = {
  ...baseProps,
  /**
   * 选中项
   */
  modelValue: makeRequiredProp(Array as PropType<Array<string | number>>),
  /**
   * 是否显示
   */
  visible: makeBooleanProp(false),
  /**
   * 选择器数据，二维数组
   */
  columns: makeArrayProp<ColPickerOption[]>(),
  /**
   * 弹出层标题
   */
  title: String,
  /**
   * 接收当前列的选中项 item、当前列下标、当前列选中项下标下一列数据处理函数 resolve、结束选择 finish
   */
  columnChange: Function as PropType<ColPickerColumnChange>,
  /**
   * 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收 1 个 boolean 参数
   */
  beforeConfirm: Function as PropType<ColPickerBeforeConfirm>,
  /**
   * 选项对象中，value 对应的 key
   */
  valueKey: makeStringProp('value'),
  /**
   * 选项对象中，展示的文本对应的 key
   */
  labelKey: makeStringProp('label'),
  /**
   * 选项对象中，提示文案对应的 key
   */
  tipKey: makeStringProp('tip'),
  /**
   * loading 图标的颜色
   */
  loadingColor: makeStringProp('#4D80F0'),
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 自动触发 column-change 事件来补全数据，当 columns 为空数组或者 columns 数组长度小于 value 数组长度时，会自动触发 column-change
   */
  autoComplete: makeBooleanProp(false),
  /**
   * 弹窗层级
   */
  zIndex: makeNumberProp(15),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * 底部条宽度，单位像素
   */
  lineWidth: numericProp,
  /**
   * 底部条高度，单位像素
   */
  lineHeight: numericProp
}

export type ColPickerProps = ExtractPropTypes<typeof colPickerProps>

export type ColPickerColumnChangeOption = {
  selectedItem: ColPickerOption
  index: number
  rowIndex: number
  resolve: (nextColumn: ColPickerOption[]) => void
  finish: (isOk?: boolean) => void
}
export type ColPickerColumnChange = (option: ColPickerColumnChangeOption) => void
export type ColPickerDisplayFormat = (selectedItems: ColPickerOption[]) => string
export type ColPickerBeforeConfirm = (value: (string | number)[], selectedItems: ColPickerOption[], resolve: (isPass: boolean) => void) => void

export type ColPickerExpose = {
  // 关闭picker弹框
  close: () => void
  // 打开picker弹框
  open: () => void
}

export type ColPickerInstance = ComponentPublicInstance<ColPickerExpose, ColPickerProps>
