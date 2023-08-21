<template>
  <wd-toast selector="wd-month" />
  <view class="month" :data-date="date">
    <view class="wd-month">
      <view class="wd-month__title">{{ monthTitle(date) }}</view>
      <view class="wd-month__days">
        <view
          v-for="(item, index) in days"
          :key="index"
          :class="`wd-month__day ${item.disabled ? 'is-disabled' : ''} ${item.type ? itemClass(item.type, value, type) : ''}`"
          :style="firstDayStyle(index, item.date, firstDayOfWeek)"
          @click="handleDateClick(index)"
        >
          <view class="wd-month__day-container">
            <view class="wd-month__day-top">{{ item.topInfo }}</view>
            <view class="wd-month__day-text">
              {{ item.text }}
            </view>
            <view class="wd-month__day-bottom">{{ item.bottomInfo }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import {
  compareDate,
  formatMonthTitle,
  getDateByDefaultTime,
  getDayByOffset,
  getDayOffset,
  getFirstDayStyle,
  getItemClass,
  getMonthEndDay,
  getWeekRange
} from '../utils'
import { useToast } from '../../wd-toast'
import { deepClone, getType } from '../../common/util'

interface Props {
  type: string
  date: number
  value: null | number | Array<number>
  minDate: number
  maxDate: number
  firstDayOfWeek: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter?: Function
  maxRange?: number
  rangePrompt?: string
  allowSameDay: boolean
  defaultTime: Array<number>
}
const props = withDefaults(defineProps<Props>(), {
  allowSameDay: false
})

const days = ref<Array<Record<string, any>>>([])

const itemClass = computed(() => {
  return (monthType, value, type) => {
    return getItemClass(monthType, value, type)
  }
})

const monthTitle = computed(() => {
  return (date) => {
    return formatMonthTitle(date)
  }
})
const firstDayStyle = computed(() => {
  return (index: number, date: number, firstDayOfWeek: number) => {
    return getFirstDayStyle(index, date, firstDayOfWeek)
  }
})

watch(
  [() => props.type, () => props.date, () => props.value, () => props.minDate, () => props.maxDate, () => props.formatter],
  () => {
    setDays()
  },
  {
    deep: true,
    immediate: true
  }
)

const toast = useToast('wd-month')

const emit = defineEmits(['change'])

function setDays() {
  const dayList: Array<Record<string, any>> = []
  const date = new Date(props.date)
  const year = date.getFullYear()
  const month = date.getMonth()
  const totalDay = getMonthEndDay(year, month + 1)
  let value = props.value
  if ((props.type === 'week' || props.type === 'weekrange') && value) {
    value = getWeekValue()
  }

  for (let day = 1; day <= totalDay; day++) {
    const date = new Date(year, month, day).getTime()
    let type = getDayType(date, value)
    if (!type && compareDate(date, Date.now()) === 0) {
      type = 'current'
    }
    const dayObj = getFormatterDate(date, day, type)
    dayList.push(dayObj)
  }
  days.value = dayList
}
function getDayType(date, value) {
  switch (props.type) {
    case 'date':
    case 'datetime':
      return getDateType(date)
    case 'dates':
      return getDatesType(date)
    case 'daterange':
    case 'datetimerange':
      return getDatetimeType(date, value)
    case 'week':
      return getWeektimeType(date, value)
    case 'weekrange':
      return getWeektimeType(date, value)
    default:
      return getDateType(date)
  }
}
function getDateType(date) {
  if (props.value && compareDate(date, props.value) === 0) {
    return 'selected'
  }

  return ''
}

function getDatesType(date) {
  if (!props.value) return ''

  let type = ''

  ;(props.value as any).some((item) => {
    if (compareDate(date, item) === 0) {
      type = 'selected'

      return true
    }

    return false
  })

  return type
}
function getDatetimeType(date, value) {
  const [startDate, endDate] = value || []

  if (startDate && compareDate(date, startDate) === 0) {
    if (props.allowSameDay && endDate && compareDate(startDate, endDate) === 0) {
      return 'same'
    }
    return 'start'
  } else if (endDate && compareDate(date, endDate) === 0) {
    return 'end'
  } else if (startDate && endDate && compareDate(date, startDate) === 1 && compareDate(date, endDate) === -1) {
    return 'middle'
  } else {
    return ''
  }
}
function getWeektimeType(date, value) {
  const [startDate, endDate] = value || []

  if (startDate && compareDate(date, startDate) === 0) {
    return 'start'
  } else if (endDate && compareDate(date, endDate) === 0) {
    return 'end'
  } else if (startDate && endDate && compareDate(date, startDate) === 1 && compareDate(date, endDate) === -1) {
    return 'middle'
  } else {
    return ''
  }
}
function getWeekValue() {
  if (props.type === 'week') {
    return getWeekRange(props.value, props.firstDayOfWeek)
  } else {
    const [startDate, endDate] = (props.value as any) || []

    if (startDate) {
      const firstWeekRange = getWeekRange(startDate, props.firstDayOfWeek)

      if (endDate) {
        const endWeekRange = getWeekRange(endDate, props.firstDayOfWeek)

        return [firstWeekRange[0], endWeekRange[1]]
      } else {
        return firstWeekRange
      }
    }

    return []
  }
}
function handleDateClick(index: number) {
  const date = days.value[index]

  switch (props.type) {
    case 'date':
    case 'datetime':
      handleDateChange(date)
      break
    case 'dates':
      handleDatesChange(date)
      break
    case 'daterange':
    case 'datetimerange':
      handleDateRangeChange(date)
      break
    case 'week':
      handleWeekChange(date)
      break
    case 'weekrange':
      handleWeekRangeChange(date)
      break
    default:
      handleDateChange(date)
  }
}
function getDate(date, isEnd: boolean = false) {
  date = props.defaultTime && props.defaultTime.length > 0 ? getDateByDefaultTime(date, isEnd ? props.defaultTime[1] : props.defaultTime[0]) : date

  if (date < props.minDate) return props.minDate

  if (date > props.maxDate) return props.maxDate

  return date
}

function handleDateChange(date) {
  if (date.disabled) return

  if (date.type !== 'selected') {
    emit('change', {
      value: getDate(date.date),
      type: 'start'
    })
  }
}
function handleDatesChange(date) {
  if (date.disabled) return

  const value = deepClone(props.value || [])
  if (date.type !== 'selected') {
    value.push(getDate(date.date))
  } else {
    value.splice(value.indexOf(date.date), 1)
  }
  emit('change', {
    value
  })
}
function handleDateRangeChange(date) {
  if (date.disabled) return

  let value
  let type
  const [startDate, endDate] = deepClone(props.value || [])
  const compare = compareDate(date.date, startDate)

  // 禁止选择同个日期
  if (!props.allowSameDay && compare === 0 && (props.type === 'daterange' || props.type === 'datetimerange') && !endDate) {
    return
  }

  if (startDate && !endDate && compare > -1) {
    // 不能选择超过最大范围的日期
    if (props.maxRange && getDayOffset(date.date, startDate) > props.maxRange) {
      const maxEndDate = getDayByOffset(startDate, props.maxRange - 1)
      value = [startDate, getDate(maxEndDate, true)]
      toast.show({
        msg: props.rangePrompt || `选择天数不能超过${props.maxRange}天`
      })
    } else {
      value = [startDate, getDate(date.date, true)]
    }
  } else if (props.type === 'datetimerange' && startDate && endDate) {
    // 时间范围类型，且有开始时间和结束时间，需要支持重新点击开始日期和结束日期可以重新修改时间
    if (compare === 0) {
      type = 'start'
      value = props.value
    } else if (compareDate(date.date, endDate) === 0) {
      type = 'end'
      value = props.value
    } else {
      value = [getDate(date.date), null]
    }
  } else {
    value = [getDate(date.date), null]
  }

  emit('change', {
    value,
    type: type || (value[1] ? 'end' : 'start')
  })
}
function handleWeekChange(date) {
  const [weekStart] = getWeekRange(date.date, props.firstDayOfWeek)

  // 周的第一天如果是禁用状态，则不可选中
  if (getFormatterDate(weekStart, new Date(weekStart).getDate()).disabled) return

  emit('change', {
    value: getDate(weekStart) + 24 * 60 * 60 * 1000
  })
}
function handleWeekRangeChange(date) {
  const [weekStartDate] = getWeekRange(date.date, props.firstDayOfWeek)

  // 周的第一天如果是禁用状态，则不可选中
  if (getFormatterDate(weekStartDate, new Date(weekStartDate).getDate()).disabled) return

  let value
  const [startDate, endDate] = deepClone(props.value || [])
  const [startWeekStartDate] = startDate ? getWeekRange(startDate, props.firstDayOfWeek) : []
  const compare = compareDate(weekStartDate, startWeekStartDate)

  if (startDate && !endDate && compare > -1) {
    if (!props.allowSameDay && compare === 0) return

    value = [getDate(startWeekStartDate) + 24 * 60 * 60 * 1000, getDate(weekStartDate) + 24 * 60 * 60 * 1000]
  } else {
    value = [getDate(weekStartDate) + 24 * 60 * 60 * 1000, null]
  }

  emit('change', {
    value
  })
}
function getFormatterDate(date, day, type?: string) {
  let dayObj = {
    date: date,
    text: day,
    topInfo: '',
    bottomInfo: '',
    type,
    disabled: compareDate(date, props.minDate) === -1 || compareDate(date, props.maxDate) === 1
  }
  if (props.formatter) {
    if (getType(props.formatter) === 'function') {
      dayObj = props.formatter(dayObj)
    } else {
      console.error('[wot-design] error(wd-calendar-view): the formatter prop of wd-calendar-view should be a function')
    }
  }

  return dayObj
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
