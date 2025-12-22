import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'
import type { CalendarFormatter, CalendarTimeFilter, CalendarType } from '../types'

const now = new Date()
const defaultMinDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()).getTime()
const defaultMaxDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate(), 23, 59, 59).getTime()

/**
 * 月份信息
 */
export interface MonthInfo {
  date: number
  height: number
}

export const monthPanelProps = {
  /**
   * 日期类型
   */
  type: makeStringProp<CalendarType>('date'),
  /**
   * 选中值，为 13 位时间戳或时间戳数组
   */
  value: {
    type: [Number, Array, null] as PropType<number | (number | null)[] | null>,
    default: null
  },
  /**
   * 最小日期，为 13 位时间戳
   */
  minDate: makeNumberProp(defaultMinDate),
  /**
   * 最大日期，为 13 位时间戳
   */
  maxDate: makeNumberProp(defaultMaxDate),
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
  /**
   * 是否展示面板标题，自动计算当前滚动的日期月份
   */
  showPanelTitle: makeBooleanProp(false),
  /**
   * 选中日期所使用的当日内具体时刻
   */
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
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

export type MonthPanelProps = ExtractPropTypes<typeof monthPanelProps>

export type MonthPanelTimeType = 'start' | 'end' | ''

export type MonthPanelExpose = {
  /**
   * 使当前日期或者选中日期滚动到可视区域
   */
  scrollIntoView: () => void
}

export type MonthPanelInstance = ComponentPublicInstance<MonthPanelProps, MonthPanelExpose>
