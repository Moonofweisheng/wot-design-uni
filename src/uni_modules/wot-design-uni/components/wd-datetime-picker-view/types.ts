import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export type DateTimeType = 'date' | 'year-month' | 'time' | 'datetime' | 'year'

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
  /**
   * 选中项，当 type 为 time 时，类型为字符串，否则为 时间戳
   */
  modelValue: makeRequiredProp([String, Number, Date]),
  /**
   * 加载中
   */
  loading: makeBooleanProp(false),
  /**
   * 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写
   */
  loadingColor: makeStringProp('#4D80F0'),
  /**
   * picker内部滚筒高
   */
  columnsHeight: makeNumberProp(217),
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  /**
   * 选择器类型，可选值：date / year-month / time
   */
  type: makeStringProp<DateTimeType>('datetime'),
  /**
   * 自定义过滤选项的函数，返回列的选项数组
   */
  filter: Function as PropType<DatetimePickerViewFilter>,
  /**
   * 自定义弹出层选项文案的格式化函数，返回一个字符串
   */
  formatter: Function as PropType<DatetimePickerViewFormatter>,
  /**
   * 自定义列的格式化函数
   */
  columnFormatter: Function as PropType<DatetimePickerViewColumnFormatter>,
  /**
   * 最小日期
   */
  minDate: makeNumberProp(new Date(new Date().getFullYear() - 10, 0, 1).getTime()),
  /**
   * 最大日期
   */
  maxDate: makeNumberProp(new Date(new Date().getFullYear() + 10, 11, 31).getTime()),
  /**
   * 最小小时，time类型时生效
   */
  minHour: makeNumberProp(0),
  /**
   * 最大小时，time类型时生效
   */
  maxHour: makeNumberProp(23),
  /**
   * 最小分钟，time类型时生效
   */
  minMinute: makeNumberProp(0),
  /**
   * 最大分钟，time类型时生效
   */
  maxMinute: makeNumberProp(59),
  /**
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: makeBooleanProp(false),
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
