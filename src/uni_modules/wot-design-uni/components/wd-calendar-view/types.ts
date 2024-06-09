import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export type CalendarType = 'date' | 'dates' | 'datetime' | 'week' | 'month' | 'daterange' | 'datetimerange' | 'weekrange' | 'monthrange'

export const calendarViewProps = {
  ...baseProps,
  /**
   * 选中值，为 13 位时间戳或时间戳数组
   */
  modelValue: makeRequiredProp([Number, Array, null] as PropType<number | number[] | null>),
  /**
   * 日期类型
   */
  type: makeStringProp<CalendarType>('date'),
  /**
   * 最小日期，为 13 位时间戳
   */
  minDate: makeNumberProp(new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()).getTime()),
  /**
   * 最大日期，为 13 位时间戳
   */
  maxDate: makeNumberProp(new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate(), 23, 59, 59).getTime()),
  /**
   * 周起始天
   */
  firstDayOfWeek: makeNumberProp(0),
  /**
   * 日期格式化函数
   */
  formatter: Function as PropType<CalendarFormatter>,
  /**
   * type 为范围选择时有效，最大日期范围
   */
  maxRange: Number,
  /**
   * type 为范围选择时有效，选择超出最大日期范围时的错误提示文案
   */
  rangePrompt: String,
  /**
   * type 为范围选择时有效，是否允许选择同一天
   */
  allowSameDay: makeBooleanProp(false),
  // 是否展示面板标题，自动计算当前滚动的日期月份
  showPanelTitle: makeBooleanProp(true),
  /**
   * 选中日期所使用的当日内具体时刻
   */
  defaultTime: {
    type: [String, Array] as PropType<string | string[]>,
    default: '00:00:00'
  },
  /**
   * 可滚动面板的高度
   */
  panelHeight: makeNumberProp(378),
  /**
   * type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据
   */
  timeFilter: Function as PropType<CalendarTimeFilter>,
  /**
   * type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改
   */
  hideSecond: makeBooleanProp(false),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: makeBooleanProp(false)
}

export type CalendarViewProps = ExtractPropTypes<typeof calendarViewProps>

export type CalendarDayType = '' | 'start' | 'middle' | 'end' | 'selected' | 'same' | 'current'

export type CalendarDayItem = {
  date: number
  text?: number | string
  topInfo?: string
  bottomInfo?: string
  type?: CalendarDayType
  disabled?: boolean
}

export type CalendarFormatter = (day: CalendarDayItem) => CalendarDayItem

export type CalendarTimeFilterOptionType = 'hour' | 'minute' | 'second'

export type CalendarTimeFilterOption = {
  type: CalendarTimeFilterOptionType
  values: CalendarItem[]
}

export type CalendarTimeFilter = (option: CalendarTimeFilterOption) => CalendarItem[]

export type CalendarItem = {
  label: string
  value: number
  disabled: boolean
}

export type CalendarViewExpose = {
  /**
   * 使当前日期或者选中日期滚动到可视区域
   */
  scrollIntoView: () => void
}

export type CalendarViewInstance = ComponentPublicInstance<CalendarViewExpose, CalendarViewProps>
