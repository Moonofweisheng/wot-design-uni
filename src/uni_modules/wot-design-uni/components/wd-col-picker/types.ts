import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp, numericProp } from '../common/props'
import type { FormItemRule } from '../wd-form/types'

export const colPickerProps = {
  ...baseProps,
  /**
   * 选中项
   */
  modelValue: makeRequiredProp(Array as PropType<Array<string | number>>),
  /**
   * 选择器数据，二维数组
   */
  columns: makeArrayProp<Record<string, any>[]>(),
  /**
   * 选择器左侧文案
   */
  label: String,
  /**
   * 设置左侧标题宽度
   */
  labelWidth: makeStringProp('33%'),
  /**
   * 使用 label 插槽时设置该选项
   */
  useLabelSlot: makeBooleanProp(false),
  /**
   * 使用默认插槽时设置该选项
   */
  useDefaultSlot: makeBooleanProp(false),
  /**
   * 禁用
   */
  disabled: makeBooleanProp(false),
  /**
   * 只读
   */
  readonly: makeBooleanProp(false),
  /**
   * 选择器占位符
   */
  placeholder: String,
  /**
   * 弹出层标题
   */
  title: String,
  /**
   * 接收当前列的选中项 item、当前列下标、当前列选中项下标下一列数据处理函数 resolve、结束选择 finish
   */
  columnChange: Function as PropType<ColPickerColumnChange>,
  /**
   * 自定义展示文案的格式化函数，返回一个字符串
   */
  displayFormat: Function as PropType<ColPickerDisplayFormat>,
  /**
   * 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收 1 个 boolean 参数
   */
  beforeConfirm: Function as PropType<ColPickerBeforeConfirm>,
  /**
   * 选择器的值靠右展示
   */
  alignRight: makeBooleanProp(false),
  /**
   * 是否为错误状态，错误状态时右侧内容为红色
   */
  error: makeBooleanProp(false),
  /**
   * 是否必填
   */
  required: makeBooleanProp(false),
  /**
   * 设置选择器大小，可选值：large
   */
  size: String,
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
   * 是否超出隐藏
   */
  ellipsis: makeBooleanProp(false),
  /**
   * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
   */
  prop: String,
  /**
   * 表单验证规则，结合wd-form组件使用
   */
  rules: makeArrayProp<FormItemRule>(),
  /**
   * 底部条宽度，单位像素
   */
  lineWidth: numericProp,
  /**
   * 底部条高度，单位像素
   */
  lineHeight: numericProp,
  /**
   * label 外部自定义样式
   */
  customViewClass: makeStringProp(''),
  /**
   * value 外部自定义样式
   */
  customLabelClass: makeStringProp(''),
  customValueClass: makeStringProp(''),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   */
  rootPortal: makeBooleanProp(false)
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
  // 关闭picker弹框
  close: () => void
  // 打开picker弹框
  open: () => void
}

export type ColPickerInstance = ComponentPublicInstance<ColPickerExpose, ColPickerProps>
