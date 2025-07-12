import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { FormItemRule } from '../wd-form/types'

export type SelectPickerType = 'checkbox' | 'radio'

export const selectPickerProps = {
  ...baseProps,
  /** 选择器左侧文案 */
  label: String,
  /** 设置左侧标题宽度 */
  labelWidth: makeStringProp('33%'),
  /** 禁用 */
  disabled: makeBooleanProp(false),
  /** 只读 */
  readonly: Boolean,
  /** 选择器占位符 */
  placeholder: String,
  /** 弹出层标题 */
  title: String,
  /** 选择器的值靠右展示 */
  alignRight: makeBooleanProp(false),
  /** 是否为错误状态，错误状态时右侧内容为红色 */
  error: makeBooleanProp(false),
  /** 必填样式 */
  required: makeBooleanProp(false),
  /**
   * 使用 label 插槽时设置该选项
   * @deprecated 可以直接使用标签插槽，无需配置此选项
   */
  useLabelSlot: makeBooleanProp(false),
  /**
   * 使用默认插槽时设置该选项
   * @deprecated 可以直接使用默认插槽，无需配置此选项
   */
  useDefaultSlot: makeBooleanProp(false),
  /** 设置选择器大小 */
  size: String,
  /**
   * 是否垂直居中
   */
  center: makeBooleanProp(false),
  /** 选中的颜色（单/复选框） */
  checkedColor: String,
  /** 最小选中的数量（仅在复选框类型下生效，`type`类型为`checkbox`） */
  min: makeNumberProp(0),
  /** 最大选中的数量，0 为无限数量，默认为 0（仅在复选框类型下生效，`type`类型为`checkbox`） */
  max: makeNumberProp(0),
  /** 设置 picker 内部的选项组尺寸大小 （单/复选框） */
  selectSize: String,
  /** 加载中 */
  loading: makeBooleanProp(false),
  /** 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 */
  loadingColor: makeStringProp('#4D80F0'),
  /** 点击遮罩是否关闭 */
  closeOnClickModal: makeBooleanProp(true),
  /** 选中项，`type`类型为`checkbox`时，类型为 array；`type`为`radio` 时 ，类型为 number / boolean / string */
  modelValue: makeRequiredProp([String, Number, Boolean, Array] as PropType<string | number | boolean | (string | number | boolean)[]>),
  /** 选择器数据，一维数组 */
  columns: makeArrayProp<Record<string, any>>(),
  /** 单复选选择器类型 */
  type: makeStringProp<SelectPickerType>('checkbox'),
  /** 选项对象中，value 对应的 key */
  valueKey: makeStringProp('value'),
  /** 选项对象中，展示的文本对应的 key */
  labelKey: makeStringProp('label'),
  /** 确认按钮文案 */
  confirmButtonText: String,
  /** 自定义展示文案的格式化函数，返回一个字符串 */
  displayFormat: Function as PropType<SelectPickerDisplayFormat>,
  /** 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收 1 个 boolean 参数 */
  beforeConfirm: Function as PropType<SelectPickerBeforeConfirm>,
  /** 弹窗层级 */
  zIndex: makeNumberProp(15),
  /** 弹出面板是否设置底部安全距离（iphone X 类型的机型） */
  safeAreaInsetBottom: makeBooleanProp(true),
  /** 可搜索（目前只支持本地搜索） */
  filterable: makeBooleanProp(false),
  /** 搜索框占位符 */
  filterPlaceholder: String,
  /** 是否超出隐藏 */
  ellipsis: makeBooleanProp(false),
  /** 重新打开是否滚动到选中项 */
  scrollIntoView: makeBooleanProp(true),
  /** 表单域 `model` 字段名，在使用表单校验功能的情况下，该属性是必填的 */
  prop: String,
  /** 表单验证规则，结合`wd-form`组件使用 */
  rules: makeArrayProp<FormItemRule>(),
  /** 自定义内容样式类 */
  customContentClass: makeStringProp(''),
  /** 自定义标签样式类 */
  customLabelClass: makeStringProp(''),
  /** 自定义值样式类 */
  customValueClass: makeStringProp(''),
  /** 是否显示确认按钮（radio类型生效），默认值为：true */
  showConfirm: makeBooleanProp(true),
  /**
   * 显示清空按钮
   */
  clearable: makeBooleanProp(false),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   */
  rootPortal: makeBooleanProp(false)
}
export type SelectPickerProps = ExtractPropTypes<typeof selectPickerProps>

export type SelectPickerDisplayFormat = (items: string | number | boolean | (string | number | boolean)[], columns: Record<string, any>[]) => string

export type SelectPickerBeforeConfirm = (value: string | number | boolean | (string | number | boolean)[], resolve: (isPass: boolean) => void) => void

export type SelectPickerExpose = {
  // 打开picker弹框
  open: () => void
  // 关闭picker弹框
  close: () => void
}

export type SelectPickerInstance = ComponentPublicInstance<SelectPickerExpose, SelectPickerProps>
