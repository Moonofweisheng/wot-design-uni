import type { PropType } from 'vue'
import { baseProps, makeNumberProp, makeNumericProp, makeRequiredProp, numericProp } from '../common/props'

export type WeekStart = 0 | 1

export const weekDateProps = {
  ...baseProps,
  /**
   * 双向绑定值
   */
  modelValue: makeRequiredProp([Number, String, Date] as PropType<number | string | Date>),

  /**
   * 周起始日
   * 0: 周日
   * 1: 周一
   * @default 1
   */
  weekStart: makeNumericProp<WeekStart>(1)
}
