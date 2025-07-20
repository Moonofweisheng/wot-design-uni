<template>
  <wd-picker-view
    ref="datePickerview"
    :custom-class="customClass"
    :custom-style="customStyle"
    :immediate-change="immediateChange"
    v-model="pickerValue"
    :columns="columns"
    :columns-height="columnsHeight"
    :columnChange="columnChange"
    :loading="loading"
    :loading-color="loadingColor"
    @change="onChange"
    @pickstart="onPickStart"
    @pickend="onPickEnd"
  ></wd-picker-view>
</template>
<script lang="ts">
export default {
  name: 'wd-datetime-picker-view',
  virtualHost: true,
  addGlobalClass: true,
  styleIsolation: 'shared'
}
</script>

<script lang="ts" setup>
import wdPickerView from '../wd-picker-view/wd-picker-view.vue'
import { getCurrentInstance, onBeforeMount, ref, watch } from 'vue'
import { debounce, isDef, padZero, range, isArray, isString } from '../common/util'
import { datetimePickerViewProps, type DatetimePickerViewColumnType, type DatetimePickerViewOption, type DatetimePickerViewExpose } from './types'
import type { PickerViewInstance } from '../wd-picker-view/types'
import { getPickerValue } from './util'

// 本地时间戳
/** @description 判断时间戳是否合法 */
const isValidDate = (date: string | number | Date) => isDef(date) && !Number.isNaN(date)
/**
 * @description 生成n个元素，并使用iterator接口进行填充
 * @param n
 * @param iteratee
 * @return {any[]}
 */
const times = (n: number, iteratee: (index: number) => number) => {
  let index: number = -1
  const length = n < 0 ? 0 : n
  const result: number[] = Array(length)
  while (++index < n) {
    result[index] = iteratee(index)
  }
  return result
}
/**
 * @description 获取某年某月有多少天
 * @param {Number} year
 * @param {Number} month
 * @return {Number} day
 */
const getMonthEndDay = (year: number, month: number) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

const props = defineProps(datetimePickerViewProps)
const emit = defineEmits(['change', 'pickstart', 'pickend', 'update:modelValue'])

// pickerview
const datePickerview = ref<PickerViewInstance>()
// 内部保持时间戳的
const innerValue = ref<null | string | number>(null)
// 传递给pickerView的columns的数据
const columns = ref<DatetimePickerViewOption[][]>([])
// 传递给pickerView的value的数据
const pickerValue = ref<string | number | boolean | string[] | number[] | boolean[]>([])
// 是否已经初始化
const created = ref<boolean>(false)

const { proxy } = getCurrentInstance() as any

/**
 * @description updateValue 防抖函数的占位符
 */
const updateValue = debounce(() => {
  if (!created.value) return
  const val = correctValue(props.modelValue)
  const isEqual = val === innerValue.value
  if (!isEqual) {
    updateColumnValue(val)
  } else {
    columns.value = updateColumns()
  }
}, 50)

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (val === oldVal) return
    // 外部传入值更改时 更新picker数据
    const value = correctValue(val)
    updateColumnValue(value)
  },
  { deep: true, immediate: true }
)

watch(
  () => props.type,
  (target) => {
    const type = ['date', 'year-month', 'time', 'datetime', 'year']
    if (type.indexOf(target) === -1) {
      console.error(`type must be one of ${type}`)
    }
  },
  { deep: true, immediate: true }
)

watch(
  [
    () => props.type,
    () => props.filter,
    () => props.formatter,
    () => props.columnFormatter,
    () => props.minDate,
    () => props.maxDate,
    () => props.minHour,
    () => props.maxHour,
    () => props.minMinute,
    () => props.maxMinute,
    () => props.minSecond,
    () => props.maxSecond,
    () => props.useSecond
  ],
  () => {
    updateValue()
  },
  {
    deep: true,
    immediate: true
  }
)

onBeforeMount(() => {
  // 初始化完毕，打开observer触发render的开关
  created.value = true
  const innerValue = correctValue(props.modelValue)
  updateColumnValue(innerValue)
})

/** pickerView触发change事件，同步修改pickerValue */
function onChange({ value }: { value: string | string[] }) {
  // 更新pickerView的value
  pickerValue.value = value
  // pickerValue => innerValue
  const result = updateInnerValue()
  emit('update:modelValue', result)
  // 这个地方的value返回的是picker数组，实际上在此处我们应该返回 change 的是 value date类型的值
  emit('change', {
    value: result,
    picker: proxy.$.exposed
  })
}

/**
 * @description 使用formatter格式化getOriginColumns的结果
 * @return {Array<Array<Number>>} 用于传入picker的columns
 */
function updateColumns(): DatetimePickerViewOption[][] {
  const { formatter, columnFormatter } = props
  if (columnFormatter) {
    return columnFormatter(proxy.$.exposed)
  } else {
    return getOriginColumns().map((column) => {
      return column.values.map((value) => {
        return {
          label: formatter ? formatter(column.type, padZero(value)) : padZero(value),
          value
        }
      })
    })
  }
}

/**
 * 设置数据列
 * @param columnList 数据列
 */
function setColumns(columnList: DatetimePickerViewOption[][]) {
  columns.value = columnList
}

/**
 * @description 根据getRanges得到的范围计算所有的列的数据
 * @return {{values: any[], type: String}[]} 年
 */
function getOriginColumns() {
  const { filter } = props
  return getRanges().map(({ type, range }) => {
    let values = times(range[1] - range[0] + 1, (index: number) => {
      return range[0] + index
    })

    if (filter) {
      values = filter(type, values)
    }

    return {
      type,
      values
    }
  })
}

/**
 * @description 根据时间戳生成年月日时分的边界范围
 * @return {Array<{type:String,range:Array<Number>}>}
 */
function getRanges(): Array<{ type: DatetimePickerViewColumnType; range: number[] }> {
  if (props.type === 'time') {
    const result: Array<{ type: DatetimePickerViewColumnType; range: number[] }> = [
      {
        type: 'hour',
        range: [props.minHour, props.maxHour]
      },
      {
        type: 'minute',
        range: [props.minMinute, props.maxMinute]
      }
    ]
    if (props.useSecond) {
      result.push({
        type: 'second',
        range: [props.minSecond, props.maxSecond]
      })
    }
    return result
  }

  const { maxYear, maxDate, maxMonth, maxHour, maxMinute, maxSecond } = getBoundary('max', innerValue.value as number)
  const { minYear, minDate, minMonth, minHour, minMinute, minSecond } = getBoundary('min', innerValue.value as number)

  const result: Array<{ type: DatetimePickerViewColumnType; range: number[] }> = [
    {
      type: 'year',
      range: [minYear, maxYear]
    },
    {
      type: 'month',
      range: [minMonth, maxMonth]
    },
    {
      type: 'date',
      range: [minDate, maxDate]
    },
    {
      type: 'hour',
      range: [minHour, maxHour]
    },
    {
      type: 'minute',
      range: [minMinute, maxMinute]
    }
  ]

  if (props.type === 'datetime' && props.useSecond) {
    result.push({
      type: 'second',
      range: [minSecond, maxSecond]
    })
  }

  if (props.type === 'date') result.splice(3, 2)
  if (props.type === 'year-month') result.splice(2, 3)
  if (props.type === 'year') result.splice(1, 4)
  return result
}

/**
 * @description 修正时间入参，判定是否为规范时间类型
 * @param {String | Number} value
 * @return {String | Number} innerValue
 */
function correctValue(value: string | number | Date): string | number {
  const isDateType = props.type !== 'time'
  if (isDateType && !isValidDate(value)) {
    // 是Date类型，但入参不可用，使用最小时间戳代替
    value = props.minDate
  } else if (!isDateType && !value) {
    // 非Date类型，无入参，使用最小小时代替
    value = props.useSecond ? `${padZero(props.minHour)}:00:00` : `${padZero(props.minHour)}:00`
  }

  // 当type为time时
  if (!isDateType) {
    // 非Date类型，直接走此逻辑
    let [hour, minute, second = '00'] = (isString(value) ? value : value.toString()).split(':')
    hour = padZero(range(Number(hour), props.minHour, props.maxHour))
    minute = padZero(range(Number(minute), props.minMinute, props.maxMinute))
    if (props.useSecond) {
      second = padZero(range(Number(second), props.minSecond, props.maxSecond))
      return `${hour}:${minute}:${second}`
    }
    return `${hour}:${minute}`
  }

  // date type
  value = Math.min(Math.max(Number(value), props.minDate), props.maxDate)

  return value
}

/**
 * @description 根据时间戳，计算所有选项的范围
 * @param {'min'|'max'} type 类型
 * @param {Number} innerValue 时间戳
 */
function getBoundary(type: 'min' | 'max', innerValue: number) {
  const value = new Date(innerValue)
  const boundary = new Date(props[`${type}Date`])
  const year = boundary.getFullYear()
  let month: number = 1
  let date: number = 1
  let hour: number = 0
  let minute: number = 0
  let second: number = 0

  if (type === 'max') {
    month = 12
    date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1)
    hour = 23
    minute = 59
    second = 59
  }

  if (value.getFullYear() === year) {
    month = boundary.getMonth() + 1
    if (value.getMonth() + 1 === month) {
      date = boundary.getDate()
      if (value.getDate() === date) {
        hour = boundary.getHours()
        if (value.getHours() === hour) {
          minute = boundary.getMinutes()
          if (value.getMinutes() === minute) {
            second = boundary.getSeconds()
          }
        }
      }
    }
  }
  return {
    [`${type}Year`]: year,
    [`${type}Month`]: month,
    [`${type}Date`]: date,
    [`${type}Hour`]: hour,
    [`${type}Minute`]: minute,
    [`${type}Second`]: second
  }
}

/**
 * @description 根据传入的value以及type，初始化innerValue，期间会使用format格式化数据
 * @param value
 * @return {Array}
 */
function updateColumnValue(value: string | number) {
  const values = getPickerValue(value, props.type, props.useSecond)
  // 更新pickerView的value,columns
  if (props.modelValue !== value) {
    emit('update:modelValue', value)
    emit('change', {
      value,
      picker: proxy.$.exposed
    })
  }
  innerValue.value = value
  columns.value = updateColumns()
  pickerValue.value = values
}

/**
 * @description 根据当前的选中项 处理innerValue
 * @return {date} innerValue
 */
function updateInnerValue() {
  const { type, useSecond } = props
  let innerValue: string | number = ''
  const pickerVal = datePickerview.value?.getValues() || []
  const values = isArray(pickerVal) ? pickerVal : [pickerVal]

  if (type === 'time') {
    if (useSecond) {
      innerValue = `${padZero(values[0])}:${padZero(values[1])}:${padZero(values[2])}`
    } else {
      innerValue = `${padZero(values[0])}:${padZero(values[1])}`
    }
    return innerValue
  }

  // 处理年份 索引位0
  const year = values[0] && parseInt(values[0])

  // 处理月 索引位1
  const month = type === 'year' ? 1 : values[1] && parseInt(values[1])

  const maxDate = getMonthEndDay(Number(year), Number(month))

  // 处理 date 日期 索引位2
  let date: string | number = 1
  if (type !== 'year-month' && type !== 'year') {
    date = (Number(values[2]) && parseInt(String(values[2]))) > maxDate ? maxDate : values[2] && parseInt(String(values[2]))
  }

  // 处理 时分秒 索引位3，4，5
  let hour = 0
  let minute = 0
  let second = 0

  if (type === 'datetime') {
    hour = Number(values[3]) && parseInt(values[3])
    minute = Number(values[4]) && parseInt(values[4])
    if (useSecond) {
      second = Number(values[5]) && parseInt(values[5])
    }
  }
  const value = new Date(Number(year), Number(month) - 1, Number(date), hour, minute, second).getTime()

  innerValue = correctValue(value)
  return innerValue
}

/**
 * @description 选中项改变，多级联动
 */
function columnChange(picker: PickerViewInstance) {
  // time year-mouth year 无需联动
  if (props.type === 'time' || props.type === 'year-month' || props.type === 'year') {
    return
  }
  /** 重新计算年月日时分秒，修正时间。 */
  const values = picker.getValues() as string[]
  const year = Number(values[0])
  const month = Number(values[1])
  const maxDate = getMonthEndDay(year, month)
  let date = Number(values[2])
  date = date > maxDate ? maxDate : date
  let hour: number = 0
  let minute: number = 0
  let second: number = 0
  if (props.type === 'datetime') {
    hour = Number(values[3])
    minute = Number(values[4])
    if (props.useSecond) {
      second = Number(values[5])
    }
  }
  const value = new Date(year, month - 1, date, hour, minute, second).getTime()
  /** 根据计算选中项的时间戳，重新计算所有的选项列表 */
  // 更新选中时间戳
  innerValue.value = correctValue(value)

  // 根据innerValue获取最新的时间表，重新生成对应的数据源
  const newColumns = updateColumns()
  // 深拷贝联动之前的选中项
  const selectedIndex = picker.getSelectedIndex().slice(0)
  /**
   * 选中年会修改对应的年份的月数，和月份对应的日期。
   * 选中月，会修改月份对应的日数
   */
  newColumns.forEach((_columns, index) => {
    const nextColumnIndex = index + 1
    const nextColumnData = newColumns[nextColumnIndex]
    if (nextColumnIndex > newColumns.length - 1) return
    picker.setColumnData(
      nextColumnIndex,
      nextColumnData,
      selectedIndex[nextColumnIndex] <= nextColumnData.length - 1 ? selectedIndex[nextColumnIndex] : 0
    )
  })
}
function onPickStart() {
  emit('pickstart')
}
function onPickEnd() {
  emit('pickend')
}

function getSelects() {
  const pickerVal = datePickerview.value?.getSelects()
  if (pickerVal == null) return undefined
  if (isArray(pickerVal)) return pickerVal
  return [pickerVal]
}

defineExpose<DatetimePickerViewExpose>({
  updateColumns,
  setColumns,
  getSelects,
  correctValue,
  getOriginColumns
})
</script>
