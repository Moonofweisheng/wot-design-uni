import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { DateTimeType, DatetimePickerViewFilter, DatetimePickerViewFormatter } from '../wd-datetime-picker-view/types'

export const datetimePickerProps = {
  ...baseProps,
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
   * 点击遮罩是否关闭
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * picker内部滚筒高
   */
  columnsHeight: makeNumberProp(217),
  valueKey: makeStringProp('value'),
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
   * 弹窗层级
   */
  zIndex: makeNumberProp(15),
  /**
   * pickerView 外部自定义样式
   */
  customViewClass: makeStringProp(''),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: makeBooleanProp(false),
  /**
   * 是否显示
   */
  visible: makeBooleanProp(false)
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
