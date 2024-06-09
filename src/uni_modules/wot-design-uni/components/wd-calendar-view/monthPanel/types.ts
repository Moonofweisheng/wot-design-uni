import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { makeBooleanProp, makeRequiredProp } from '../../common/props'
import type { CalendarFormatter, CalendarTimeFilter, CalendarType } from '../types'

/**
 * 月份信息
 */
export interface MonthInfo {
  date: number
  height: number
}

export const monthPanelProps = {
  type: makeRequiredProp(String as PropType<CalendarType>),
  value: makeRequiredProp([Number, Array, null] as PropType<number | (number | null)[] | null>),
  minDate: makeRequiredProp(Number),
  maxDate: makeRequiredProp(Number),
  firstDayOfWeek: makeRequiredProp(Number),
  formatter: Function as PropType<CalendarFormatter>,
  maxRange: Number,
  rangePrompt: String,
  allowSameDay: makeBooleanProp(false),
  showPanelTitle: makeBooleanProp(false),
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },
  panelHeight: makeRequiredProp(Number),
  // type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据
  timeFilter: Function as PropType<CalendarTimeFilter>,
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
