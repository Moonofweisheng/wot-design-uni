import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export type DateTimeType = 'date' | 'year-month' | 'time' | 'datetime'

/**
 * @description 根据传入的值和类型，获取当前的选项数组，便于传入 pickerView
 * @param value
 * @param type picker类型
 * @return {Array} pickerValue
 */
export function getPickerValue(value: string | number, type: DateTimeType) {
  const values: number[] = []
  const date = new Date(value)
  if (type === 'time') {
    const pair = String(value).split(':')
    values.push(parseInt(pair[0]), parseInt(pair[1]))
  } else {
    values.push(date.getFullYear(), date.getMonth() + 1)
    if (type === 'date') {
      values.push(date.getDate())
    } else if (type === 'datetime') {
      values.push(date.getDate(), date.getHours(), date.getMinutes())
    }
  }
  return values
}

export const datetimePickerViewProps = {
  ...baseProps,
  modelValue: makeRequiredProp([String, Number, Date]),
  loading: makeBooleanProp(false),
  loadingColor: makeStringProp('#4D80F0'),
  columnsHeight: makeNumberProp(217),
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  type: makeStringProp<DateTimeType>('datetime'),
  filter: Function as PropType<DatetimePickerViewFilter>,
  formatter: Function as PropType<DatetimePickerViewFormatter>,
  columnFormatter: Function as PropType<DatetimePickerViewColumnFormatter>,
  minDate: makeNumberProp(new Date(new Date().getFullYear() - 10, 0, 1).getTime()),
  maxDate: makeNumberProp(new Date(new Date().getFullYear() + 10, 11, 31).getTime()),
  minHour: makeNumberProp(0),
  maxHour: makeNumberProp(23),
  minMinute: makeNumberProp(0),
  maxMinute: makeNumberProp(59),
  startSymbol: makeBooleanProp(false)
}

export type DatetimePickerViewColumnType = 'year' | 'month' | 'date' | 'hour' | 'minute'

export type DatetimePickerViewOption = {
  label: string
  value: number
}

export type DatetimePickerViewFilter = (type: DatetimePickerViewColumnType, values: number[]) => number[]

export type DatetimePickerViewFormatter = (type: string, value: string) => string

export type DatetimePickerViewColumnFormatter = (picker: DatetimePickerViewInstance) => DatetimePickerViewOption[][]

export type DatetimePickerViewProps = ExtractPropTypes<typeof datetimePickerViewProps>

export type DatetimePickerViewExpose = {
  updateColumns: () => DatetimePickerViewOption[][]
  setColumns: (columnList: DatetimePickerViewOption[][]) => void
  getSelects: () => Record<string, any> | Record<string, any>[] | undefined
  correctValue: (value: string | number) => string | number
  getPickerValue: (value: string | number, type: DateTimeType) => number[]
  getOriginColumns: () => {
    type: DatetimePickerViewColumnType
    values: number[]
  }[]
}

export type DatetimePickerViewInstance = ComponentPublicInstance<DatetimePickerViewProps, DatetimePickerViewExpose>
