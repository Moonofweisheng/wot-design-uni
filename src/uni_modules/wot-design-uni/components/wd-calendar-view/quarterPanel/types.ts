import { monthPanelProps } from '@/uni_modules/wot-design-uni/components/wd-calendar-view/monthPanel/types'
import { makeBooleanProp, makeRequiredProp } from '@/uni_modules/wot-design-uni/components/common/props'
import type { PropType } from 'vue'
import type { CalendarFormatter, CalendarType } from '@/uni_modules/wot-design-uni/components/wd-calendar-view/types'

export const quarterPanelProps = {
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
