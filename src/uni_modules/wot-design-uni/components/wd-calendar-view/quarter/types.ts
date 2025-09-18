import { makeBooleanProp, makeRequiredProp } from '@/uni_modules/wot-design-uni/components/common/props'
import type { PropType } from 'vue'
import type { CalendarFormatter, CalendarType } from '@/uni_modules/wot-design-uni/components/wd-calendar-view/types'

export const quarterProps = {
  type: makeRequiredProp(String as PropType<CalendarType>),
  date: makeRequiredProp(Number),
  value: makeRequiredProp([Number, Array] as PropType<number | (number | null)[] | null>),
  minDate: makeRequiredProp(Number),
  maxDate: makeRequiredProp(Number),
  // 日期格式化函数
  formatter: Function as PropType<CalendarFormatter>,
  maxRange: Number,
  rangePrompt: String,
  allowSameDay: makeBooleanProp(false),
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },
  showTitle: makeBooleanProp(true)
}
