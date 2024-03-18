import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { makeBooleanProp, makeRequiredProp } from '../../common/props'
import type { CalendarFormatter, CalendarType } from '../types'

/**
 * 月份信息
 */
export interface YearInfo {
  date: number
  height: number
}

export const yearPanelProps = {
  type: makeRequiredProp(String as PropType<CalendarType>),
  value: makeRequiredProp([Number, Array] as PropType<number | (number | null)[] | null>),
  minDate: makeRequiredProp(Number),
  maxDate: makeRequiredProp(Number),
  formatter: Function as PropType<CalendarFormatter>,
  maxRange: Number,
  rangePrompt: String,
  allowSameDay: makeBooleanProp(false),
  showPanelTitle: makeBooleanProp(false),
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },
  panelHeight: makeRequiredProp(Number)
}

export type YearPanelProps = ExtractPropTypes<typeof yearPanelProps>

export type YearPanelExpose = {
  /**
   * 使当前日期或者选中日期滚动到可视区域
   */
  scrollIntoView: () => void
}

export type YearPanelInstance = ComponentPublicInstance<YearPanelProps, YearPanelExpose>
