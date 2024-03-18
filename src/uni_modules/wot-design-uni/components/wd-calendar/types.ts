/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2024-03-17 20:39:44
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-calendar/types.ts
 * 记得注释
 */
import type { PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { CalendarFormatter, CalendarTimeFilter, CalendarType } from '../wd-calendar-view/types'
import type { FormItemRule } from '../wd-form/types'

export const calendarProps = {
  ...baseProps,
  modelValue: makeRequiredProp([Number, Array, null] as PropType<number | number[] | null>),
  type: makeStringProp<CalendarType>('date'),
  // 最小日期，为 13 位时间戳
  minDate: makeNumberProp(new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()).getTime()),
  // 最大日期，为 13 位时间戳
  maxDate: makeNumberProp(new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate(), 23, 59, 59).getTime()),
  // 周起始天
  firstDayOfWeek: makeNumberProp(0),
  // 日期格式化函数
  formatter: Function as PropType<CalendarFormatter>,
  // type 为范围选择时有效，最大日期范围
  maxRange: Number,
  // type 为范围选择时有效，选择超出最大日期范围时的错误提示文案
  rangePrompt: String,
  // type 为范围选择时有效，是否允许选择同一天
  allowSameDay: makeBooleanProp(false),
  // 选中日期所使用的当日内具体时刻
  // string | Array<string>
  defaultTime: {
    type: [String, Array] as PropType<string | string[]>
  },
  // type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据
  timeFilter: Function as PropType<CalendarTimeFilter>,
  // type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改
  hideSecond: makeBooleanProp(false),
  label: String,
  labelWidth: String,
  useLabelSlot: makeBooleanProp(false),
  useDefaultSlot: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  placeholder: String,
  title: String,
  alignRight: makeBooleanProp(false),
  error: makeBooleanProp(false),
  required: makeBooleanProp(false),
  size: String,
  center: makeBooleanProp(false),
  closeOnClickModal: makeBooleanProp(true),
  zIndex: makeNumberProp(15),
  showConfirm: makeBooleanProp(true),
  confirmText: String,
  displayFormat: Function as PropType<CalendarDisplayFormat>,
  innerDisplayFormat: Function as PropType<CalendarInnerDisplayFormat>,
  ellipsis: makeBooleanProp(false),
  showTypeSwitch: makeBooleanProp(false),
  shortcuts: makeArrayProp<Record<string, any>>(),
  onShortcutsClick: Function as PropType<CalendarOnShortcutsClick>,
  safeAreaInsetBottom: makeBooleanProp(true),
  beforeConfirm: Function as PropType<CalendarBeforeConfirm>,
  prop: String,
  rules: makeArrayProp<FormItemRule>(),
  customViewClass: makeStringProp(''),
  customLabelClass: makeStringProp(''),
  customValueClass: makeStringProp('')
}

export type CalendarDisplayFormat = (value: number | number[], type: CalendarType) => string

export type CalendarInnerDisplayFormat = (value: number, rangeType: 'start' | 'end', type: CalendarType) => string

export type CalendarBeforeConfirmOption = {
  value: number | number[] | null
  resolve: (isPass: boolean) => void
}

export type CalendarBeforeConfirm = (option: CalendarBeforeConfirmOption) => void

export type CalendarOnShortcutsClickOption = {
  item: Record<string, any>
  index: number
}

export type CalendarOnShortcutsClick = (option: CalendarOnShortcutsClickOption) => number | number[]
