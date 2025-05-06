import type { PropType } from 'vue'
import { makeBooleanProp, makeRequiredProp } from '../../common/props'
import type { CalendarFormatter, CalendarType } from '../types'

export const monthProps = {
  type: makeRequiredProp(String as PropType<CalendarType>),
  date: makeRequiredProp(Number),
  value: makeRequiredProp([Number, Array, null] as PropType<number | (number | null)[] | null>),
  minDate: makeRequiredProp(Number),
  maxDate: makeRequiredProp(Number),
  firstDayOfWeek: makeRequiredProp(Number),
  formatter: Function as PropType<CalendarFormatter>,
  maxRange: Number,
  rangePrompt: String,
  allowSameDay: makeBooleanProp(false),
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },
  showTitle: makeBooleanProp(true)
}
