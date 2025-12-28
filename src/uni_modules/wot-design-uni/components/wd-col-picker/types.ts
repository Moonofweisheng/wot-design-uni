import { handleError, type ComponentPublicInstance, type ExtractPropTypes, type PropType } from 'vue'
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
  rootPortal: makeBooleanProp(false),
  /**
   * 必填标记位置，可选值：before、after
   */
  markerSide: makeStringProp<'before' | 'after'>('before'),
  /**
   * 搜索过滤类型，可选值：local、remote 开启filterable时有效
   */
  filterType: makeStringProp<'local' | 'remote'>('local'),
  /**
   * 可搜索
   *
   */
  filterable: makeBooleanProp(false),
  /** 搜索框占位符 */
  filterPlaceholder: String,
  /**
   * 开启下拉刷新
   */
  refresherEnabled: makeBooleanProp(false),
  /**
   * 开启上拉加载更多
   */
  scrollToLowerEnabled: makeBooleanProp(false),
  /**
   * 设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式
   */
  refresherDefaultStyle: {
    type: String as PropType<'black' | 'white' | 'none'>,
    default: 'white'
  },
  /**
   * 设置自定义下拉刷新区域背景颜色
   */
  refresherBackground: makeStringProp('transparent')
}

export type ColPickerProps = ExtractPropTypes<typeof colPickerProps>

export type ColPickerColumnChangeOption = {
  selectedItem: Record<string, any>
  index: number
  rowIndex: number
  resolve: (nextColumn: Record<string, any>[]) => void
  finish: (isOk?: boolean) => void
}
export type ColPickerHandleScrollToLowerOption = {
  /** 是否刷新 */
  isRefresh: boolean
  /** 搜索文本 */
  searchText: string
  colIndex: number
}
export type ColPickerHandleRefreshOption = {
  /** 搜索文本 */
  searchText: string
  colIndex: number
}
export type ColPickerPureSearchOption = {
  /** 搜索文本 */
  searchText: string
  /** 当前列索引 */
  colIndex: number
  /** 当前选中的值数组 */
  selectedValues: (string | number)[]
  /** 当前选中的项目数组 */
  selectedItems: Record<string, any>[]
}

export type ColPickerColumnChange = (option: ColPickerColumnChangeOption) => void
export type ColPickerDisplayFormat = (selectedItems: Record<string, any>[]) => string
export type ColPickerBeforeConfirm = (value: (string | number)[], selectedItems: Record<string, any>[], resolve: (isPass: boolean) => void) => void
/** 监听输入框内容变化事件*/
export type ColPickerHandleSearchChange = (option: ColPickerPureSearchOption) => void
export type ColPickerHandleSearch = (option: ColPickerPureSearchOption) => void
export type ColPickerHandleClear = (option: ColPickerPureSearchOption) => void
/** 下拉刷新 */
export type ColPickerHandleRefresh = (option: ColPickerHandleRefreshOption) => void
/** 上拉加载更多 */
export type ColPickerHandleScrollToLower = (option: ColPickerHandleScrollToLowerOption) => void
export type ColPickerExpose = {
  // 关闭picker弹框
  close: () => void
  // 打开picker弹框
  open: () => void
  // 停止下拉刷新
  stopRefresh: () => void
}

export type ColPickerInstance = ComponentPublicInstance<ColPickerExpose, ColPickerProps>
