<template>
  <view>
    <wd-picker-view
      :custom-class="customClass"
      ref="datePickerview"
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
  </view>
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
import { getCurrentInstance, onBeforeMount, onMounted, ref, watch } from 'vue'
import { debounce, getType, isDef, padZero, range } from '../common/util'
import { DateTimeType, getPickerValue } from './type'

// 本地时间戳
/** @description 判断时间戳是否合法 */
const isValidDate = (date) => isDef(date) && !Number.isNaN(date)
/**
 * @description 生成n个元素，并使用iterator接口进行填充
 * @param n
 * @param iteratee
 * @return {any[]}
 */
const times = (n, iteratee) => {
  let index = -1
  const length = n < 0 ? 0 : n
  const result = Array(length)
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
const getMonthEndDay = (year, month) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

interface Props {
  customClass?: string
  // 选中项，当 type 为 time 时，类型为字符串，否则为 Date
  modelValue: string | number | Date
  // PickerView的Props 开始
  // 加载中
  loading: boolean
  loadingColor: string
  // 选项总高度
  columnsHeight: number
  // 选项对象中，value对应的 key
  valueKey: string
  // 选项对象中，展示的文本对应的 key
  labelKey: string
  // PickerView的Props 结束
  // 时间选择器的类型
  type: DateTimeType
  // 自定义过滤选项的函数，返回列的选项数组
  // eslint-disable-next-line @typescript-eslint/ban-types
  filter?: Function
  // 自定义弹出层选项文案的格式化函数，返回一个字符串
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter?: Function
  // 自定义列筛选条件
  // eslint-disable-next-line @typescript-eslint/ban-types
  columnFormatter?: Function
  // 最小日期 20(x-10)年1月1日
  minDate: number
  // 最大日期 20(x+10)年1月1日
  maxDate: number
  // 最小小时
  minHour: number
  // 最大小时
  maxHour: number
  // 最小分钟
  minMinute: number
  // 最大分钟
  maxMinute: number
  startSymbol: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  // PickerView的Props 开始
  // 加载中
  loading: false,
  loadingColor: '#4D80F0',
  // 选项总高度
  columnsHeight: 217,
  // 选项对象中，value对应的 key
  valueKey: 'value',
  // 选项对象中，展示的文本对应的 key
  labelKey: 'label',
  type: 'datetime',
  minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
  maxDate: new Date(new Date().getFullYear() + 10, 11, 31).getTime(),
  minHour: 0,
  maxHour: 23,
  minMinute: 0,
  maxMinute: 59,
  startSymbol: false
})

// pickerview
const datePickerview = ref()
// 内部保持时间戳的
const innerValue = ref<null | number>(null)
// 传递给pickerView的columns的数据
const columns = ref<Array<string | number>>([])
// 传递给pickerView的value的数据
const pickerValue = ref<string | number | boolean | Array<string | number | boolean>>([])
// 自定义组件是否已经调用created hook
const created = ref<boolean>(false)

const { proxy } = getCurrentInstance() as any

/**
 * @description updateValue 防抖函数的占位符
 */
const updateValue = debounce(() => {
  // 只有等created hook初始化数据之后，observer才能执行此操作
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
    const type = ['date', 'year-month', 'time', 'datetime']
    if (type.indexOf(target) === -1) {
      throw Error(`type must be one of ${type}`)
    }
    // 每次type更新时都需要刷新整个列表
    updateValue()
  },
  { deep: true, immediate: true }
)

watch(
  () => props.filter,
  (fn) => {
    if (fn && getType(fn) !== 'function') {
      throw Error('The type of filter must be Function')
    }
    updateValue()
  },
  { deep: true, immediate: true }
)

watch(
  () => props.formatter,
  (fn) => {
    if (fn && getType(fn) !== 'function') {
      throw Error('The type of formatter must be Function')
    }
    updateValue()
  },
  { deep: true, immediate: true }
)

watch(
  () => props.columnFormatter,
  (fn) => {
    if (fn && getType(fn) !== 'function') {
      throw Error('The type of columnFormatter must be Function')
    }
    updateValue()
  },
  { deep: true, immediate: true }
)

watch(
  [
    () => props.minDate,
    () => props.maxDate,
    () => props.minHour,
    () => props.maxHour,
    () => props.minMinute,
    () => props.minMinute,
    () => props.maxMinute
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

// onMounted(() => {
//   // 手动进行一次render
//   const innerValue = correctValue(props.modelValue)
//   updateColumnValue(innerValue)
// })

const emit = defineEmits(['change', 'pickstart', 'pickend', 'update:modelValue'])

/** pickerView触发change事件，同步修改pickerValue */
function onChange({ value }) {
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
function updateColumns() {
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
function setColumns(columnList) {
  columns.value = columnList
}

/**
 * @description 根据getRanges得到的范围计算所有的列的数据
 * @return {{values: any[], type: String}[]} 年
 */
function getOriginColumns() {
  const { filter } = props
  return getRanges().map(({ type, range }) => {
    let values = times(range[1] - range[0] + 1, (index) => {
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
function getRanges() {
  if (props.type === 'time') {
    return [
      {
        type: 'hour',
        range: [props.minHour, props.maxHour]
      },
      {
        type: 'minute',
        range: [props.minMinute, props.maxMinute]
      }
    ]
  }

  const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = getBoundary('max', innerValue.value)
  const { minYear, minDate, minMonth, minHour, minMinute } = getBoundary('min', innerValue.value)

  const result = [
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

  if (props.type === 'date') result.splice(3, 2)
  if (props.type === 'year-month') result.splice(2, 3)
  return result
}

/**
 * @description 修正时间入参，判定是否为规范时间类型
 * @param {String | Number} value
 * @return {String | Number} innerValue
 */
function correctValue(value) {
  const isDateType = props.type !== 'time'

  if (isDateType && !isValidDate(value)) {
    // 是Date类型，但入参不可用，使用最小时间戳代替
    value = props.minDate
  } else if (!isDateType && !value) {
    // 非Date类型，无入参，使用最小小时代替
    value = `${padZero(props.minHour)}:00`
  }

  // 当type为time时
  if (!isDateType) {
    // 非Date类型，直接走此逻辑
    let [hour, minute] = value.split(':')
    hour = padZero(range(hour, props.minHour, props.maxHour))
    minute = padZero(range(minute, props.minMinute, props.maxMinute))
    return `${hour}:${minute}`
  }

  // date type
  value = Math.min(Math.max(value, props.minDate), props.maxDate)

  return value
}

/**
 * @description 根据时间戳，计算所有选项的范围
 * @param {'min'|'max'} type 类型
 * @param {Number} innerValue 时间戳
 */
function getBoundary(type, innerValue) {
  const value = new Date(innerValue)
  const boundary = new Date(props[`${type}Date`])
  const year = boundary.getFullYear()
  let month = 1
  let date = 1
  let hour = 0
  let minute = 0

  if (type === 'max') {
    month = 12
    date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1)
    hour = 23
    minute = 59
  }

  if (value.getFullYear() === year) {
    month = boundary.getMonth() + 1
    if (value.getMonth() + 1 === month) {
      date = boundary.getDate()
      if (value.getDate() === date) {
        hour = boundary.getHours()
        if (value.getHours() === hour) {
          minute = boundary.getMinutes()
        }
      }
    }
  }
  return {
    [`${type}Year`]: year,
    [`${type}Month`]: month,
    [`${type}Date`]: date,
    [`${type}Hour`]: hour,
    [`${type}Minute`]: minute
  }
}

/**
 * @description 根据传入的value以及type，初始化innerValue，期间会使用format格式化数据
 * @param value
 * @return {Array}
 */
function updateColumnValue(value) {
  const values = getPickerValue(value, props.type)
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
  const { type } = props
  let values: Array<number> = []
  let innerValue = ''
  values = datePickerview.value.getValues()
  if (type === 'time') {
    innerValue = `${padZero(values[0])}:${padZero(values[1])}`
    return innerValue
  }

  // 处理年份 索引位0
  const year = values[0] && parseInt(String(values[0]))

  // 处理月 索引位1
  const month = values[1] && parseInt(String(values[1]))

  const maxDate = getMonthEndDay(year, month)

  // 处理 date 日期 索引位2
  let date: string | number = 1
  if (type !== 'year-month') {
    date = (values[2] && parseInt(String(values[2]))) > maxDate ? maxDate : values[2] && parseInt(String(values[2]))
  }

  // 处理 时分 索引位3，4
  let hour = 0
  let minute = 0

  if (type === 'datetime') {
    hour = values[3] && parseInt(String(values[3]))
    minute = values[4] && parseInt(String(values[4]))
  }
  const value = new Date(year, month - 1, date, hour, minute)

  innerValue = correctValue(value)
  return innerValue
}

/**
 * @description 选中项改变，多级联动
 */
function columnChange(picker) {
  // time 和 year-mouth 无需联动
  if (props.type === 'time' || props.type === 'year-month') {
    return
  }
  /** 重新计算年月日时分秒，修正时间。 */
  const values = picker.getValues()
  const year = values[0]
  const month = values[1]
  const maxDate = getMonthEndDay(year, month)
  let date = values[2]
  date = date > maxDate ? maxDate : date
  let hour = 0
  let minute = 0
  if (props.type === 'datetime') {
    hour = values[3]
    minute = values[4]
  }
  const value = new Date(year, month - 1, date, hour, minute)
  /** 根据计算选中项的时间戳，重新计算所有的选项列表 */
  // 更新选中时间戳
  innerValue.value = correctValue(value)
  // 根据innerValue获取最新的时间表，重新生成对应的数据源
  const newColumns = updateColumns().slice(0, 3)
  // 深拷贝联动之前的选中项
  const selectedIndex = picker.selectedIndex.value.slice(0)
  /**
   * 选中年会修改对应的年份的月数，和月份对应的日期。
   * 选中月，会修改月份对应的日数
   */

  newColumns.forEach((columns, index) => {
    const nextColumnIndex = index + 1
    const nextColumnData = newColumns[nextColumnIndex]
    // `日`不控制任何其它列
    if (index === 2) return
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
  return datePickerview.value && datePickerview.value.getSelects ? datePickerview.value.getSelects() : undefined
}

defineExpose({
  updateColumns,
  setColumns,
  getSelects,
  correctValue,
  getPickerValue,
  getOriginColumns,
  formatter: props.formatter,
  startSymbol: props.startSymbol
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
