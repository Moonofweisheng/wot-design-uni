import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { DateTimeType, DatetimePickerViewFilter, DatetimePickerViewFormatter } from '../wd-datetime-picker-view/types'
import type { FormItemRule } from '../wd-form/types'

export const datetimePickerProps = {
  ...baseProps,
  /**
   * 选择器左侧文案，label可以不传
   */
  label: String,
  /**
   * 选择器占位符
   */
  placeholder: String,
  /**
   * 禁用
   */
  disabled: makeBooleanProp(false),
  /**
   * 只读
   */
  readonly: makeBooleanProp(false),
  /**
   * 加载中
   */
  loading: makeBooleanProp(false),
  /**
   * 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写
   */
  loadingColor: makeStringProp('#4D80F0'),
  /**
   * 弹出层标题
   */
  title: String,
  /**
   * 取消按钮文案
   */
  cancelButtonText: String,
  /**
   * 确认按钮文案
   */
  confirmButtonText: String,
  /**
   * 是否必填
   */
  required: makeBooleanProp(false),
  /**
   * 设置选择器大小，可选值：large
   */
  size: String,
  /**
   * 设置左侧标题宽度
   */
  labelWidth: makeStringProp('33%'),
  /**
   * 是否为错误状态，错误状态时右侧内容为红色
   */
  error: makeBooleanProp(false),
  /**
   * 选择器的值靠右展示
   */
  alignRight: makeBooleanProp(false),
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * 是否超出隐藏
   */
  ellipsis: makeBooleanProp(false),
  /**
   * picker内部滚筒高
   */
  columnsHeight: makeNumberProp(217),
  /**
   * 选项的key
   */
  valueKey: makeStringProp('value'),
  /**
   * 选项的label
   */
  labelKey: makeStringProp('label'),
  /**
   * 选中项，当 type 为 time 时，类型为字符串；当 type 为 Array 时，类型为范围选择；否则为 时间戳
   */
  modelValue: makeRequiredProp([String, Number, Array] as PropType<string | number | Array<string | number>>),
  /**
   * 选择器类型，可选值为：date / year-month / time
   */
  type: makeStringProp<DateTimeType>('datetime'),
  /**
   * 最小日期
   */
  minDate: makeNumberProp(new Date(new Date().getFullYear() - 10, 0, 1).getTime()),
  /**
   * 最大日期
   */
  maxDate: makeNumberProp(new Date(new Date().getFullYear() + 10, 11, 31, 23, 59, 59).getTime()),
  /**
   * 最小小时，time类型时生效
   */
  minHour: makeNumberProp(0),
  /**
   * 最大小时，time类型时生效
   */
  maxHour: makeNumberProp(23),
  /**
   * 最小分钟，time类型时生效
   */
  minMinute: makeNumberProp(0),
  /**
   * 最大分钟，time类型时生效
   */
  maxMinute: makeNumberProp(59),
  /**
   * 是否启用秒选择，仅在 time 和 datetime 类型下生效
   */
  useSecond: makeBooleanProp(false),
  /**
   * 最小秒数，仅在 time 和 datetime 类型下生效
   */
  minSecond: makeNumberProp(0),
  /**
   * 最大秒数，仅在 time 和 datetime 类型下生效
   */
  maxSecond: makeNumberProp(59),
  /**
   * 自定义过滤选项的函数，返回列的选项数组
   */
  filter: Function as PropType<DatetimePickerViewFilter>,
  /**
   * 自定义弹出层选项文案的格式化函数，返回一个字符串
   */
  formatter: Function as PropType<DatetimePickerViewFormatter>,
  /**
   * 自定义展示文案的格式化函数，返回一个字符串
   */
  displayFormat: Function as PropType<DatetimePickerDisplayFormat>,
  /**
   * 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数
   */
  beforeConfirm: Function as PropType<DatetimePickerBeforeConfirm>,
  /**
   * 在区域选择模式下，自定义展示tab标签文案的格式化函数，返回一个字符串
   */
  displayFormatTabLabel: Function as PropType<DatetimePickerDisplayFormatTabLabel>,
  /**
   * 默认日期，类型保持与 value 一致，打开面板时面板自动选到默认日期
   */
  defaultValue: [String, Number, Array] as PropType<string | number | Array<string | number>>,
  /**
   * 弹窗层级
   */
  zIndex: makeNumberProp(15),
  /**
   * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
   */
  prop: String,
  /**
   * 表单验证规则，结合wd-form组件使用
   */
  rules: makeArrayProp<FormItemRule>(),
  /**
   * picker cell 外部自定义样式
   */
  customCellClass: makeStringProp(''),
  /**
   * pickerView 外部自定义样式
   */
  customViewClass: makeStringProp(''),
  /**
   * label 外部自定义样式
   */
  customLabelClass: makeStringProp(''),
  /**
   * value 外部自定义样式
   */
  customValueClass: makeStringProp(''),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: makeBooleanProp(false),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   */
  rootPortal: makeBooleanProp(false),
  /**
   * 显示清空按钮
   */
  clearable: makeBooleanProp(false)
}

export type DatetimePickerDisplayFormat = (items: Record<string, any>[]) => string

export type DatetimePickerBeforeConfirm = (
  value: number | string | (number | string)[],
  resolve: (isPass: boolean) => void,
  picker: DatetimePickerInstance
) => void

export type DatetimePickerDisplayFormatTabLabel = (items: Record<string, any>[]) => string

export type DatetimePickerExpose = {
  /**
   * 打开picker弹框
   */
  open: () => void
  /**
   * 关闭picker弹框
   */
  close: () => void
  /**
   * 设置加载状态
   * @param loading 加载状态
   * @returns
   */
  setLoading: (loading: boolean) => void
}

export type DatetimePickerProps = ExtractPropTypes<typeof datetimePickerProps>

export type DatetimePickerInstance = ComponentPublicInstance<DatetimePickerProps, DatetimePickerExpose>
