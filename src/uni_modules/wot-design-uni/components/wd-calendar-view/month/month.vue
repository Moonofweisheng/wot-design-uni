<template>
  <view>
    <wd-toast selector="wd-month" />
    <view class="month">
      <view class="wd-month">
        <view class="wd-month__title" v-if="showTitle">{{ monthTitle(date) }}</view>
        <view class="wd-month__days">
          <view
            v-for="(item, index) in days"
            :key="index"
            :class="`wd-month__day ${item.disabled ? 'is-disabled' : ''} ${item.isLastRow ? 'is-last-row' : ''} ${
              item.type ? dayTypeClass(item.type) : ''
            }`"
            :style="index === 0 ? firstDayStyle : ''"
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
import wdToast from '../../wd-toast/wd-toast.vue'
import { computed, ref, watch, type CSSProperties } from 'vue'
import {
  compareDate,
  formatMonthTitle,
  getDateByDefaultTime,
  getDayByOffset,
  getDayOffset,
  getItemClass,
  getMonthEndDay,
  getNextDay,
  getPrevDay,
  getWeekRange
} from '../utils'
import { useToast } from '../../wd-toast'
import { deepClone, isArray, isFunction, objToStyle } from '../../common/util'
import { useTranslate } from '../../composables/useTranslate'
import type { CalendarDayItem, CalendarDayType } from '../types'
import { monthProps } from './types'

const props = defineProps(monthProps)
const emit = defineEmits(['change'])

const { translate } = useTranslate('calendar-view')

const days = ref<Array<CalendarDayItem>>([])

const toast = useToast('wd-month')

const offset = computed(() => {
  const firstDayOfWeek = props.firstDayOfWeek >= 7 ? props.firstDayOfWeek % 7 : props.firstDayOfWeek
  const offset = (7 + new Date(props.date).getDay() - firstDayOfWeek) % 7
  return offset
})

const dayTypeClass = computed(() => {
  return (monthType: CalendarDayType) => {
    return getItemClass(monthType, props.value, props.type)
  }
})

const monthTitle = computed(() => {
  return (date: number) => {
    return formatMonthTitle(date)
  }
})

const firstDayStyle = computed(() => {
  const dayStyle: CSSProperties = {}
  dayStyle.marginLeft = `${(100 / 7) * offset.value}%`
  return objToStyle(dayStyle)
})

const isLastRow = (date: number) => {
  const currentDate = new Date(date)
  const currentDay = currentDate.getDate()
  const daysInMonth = getMonthEndDay(currentDate.getFullYear(), currentDate.getMonth() + 1)
  const totalDaysShown = offset.value + daysInMonth
  const totalRows = Math.ceil(totalDaysShown / 7)
  return Math.ceil((offset.value + currentDay) / 7) === totalRows
}
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

function setDays() {
  const dayList: Array<CalendarDayItem> = []
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
    let type: CalendarDayType = getDayType(date, value as number | number[] | null)
    if (!type && compareDate(date, Date.now()) === 0) {
      type = 'current'
    }
    const dayObj = getFormatterDate(date, day, type)
    dayList.push(dayObj)
  }
  days.value = dayList
}
function getDayType(date: number, value: number | number[] | null): CalendarDayType {
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
function getDateType(date: number): CalendarDayType {
  if (props.value && compareDate(date, props.value as number) === 0) {
    return 'selected'
  }
  return ''
}

function getDatesType(date: number): CalendarDayType {
  const { value } = props
  let type: CalendarDayType = ''

  if (!isArray(value)) return type
  const isSelected = (day: number) => {
    return value.some((item) => compareDate(day, item) === 0)
  }

  if (isSelected(date)) {
    const prevDay = getPrevDay(date)
    const nextDay = getNextDay(date)
    const prevSelected = isSelected(prevDay)
    const nextSelected = isSelected(nextDay)
    if (prevSelected && nextSelected) {
      type = 'multiple-middle'
    } else if (prevSelected) {
      type = 'end'
    } else if (nextSelected) {
      type = 'start'
    } else {
      type = 'multiple-selected'
    }
  }

  return type
}
function getDatetimeType(date: number, value: number | number[] | null) {
  const [startDate, endDate] = isArray(value) ? value : []

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
function getWeektimeType(date: number, value: number | number[] | null) {
  const [startDate, endDate] = isArray(value) ? value : []

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
    return getWeekRange(props.value as number, props.firstDayOfWeek)
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
function getDate(date: number, isEnd: boolean = false) {
  date = props.defaultTime && props.defaultTime.length > 0 ? getDateByDefaultTime(date, isEnd ? props.defaultTime[1] : props.defaultTime[0]) : date

  if (date < props.minDate) return props.minDate

  if (date > props.maxDate) return props.maxDate

  return date
}

function handleDateChange(date: CalendarDayItem) {
  if (date.disabled) return

  if (date.type !== 'selected') {
    emit('change', {
      value: getDate(date.date),
      type: 'start'
    })
  }
}
function handleDatesChange(date: CalendarDayItem) {
  if (date.disabled) return
  const currentValue = deepClone(isArray(props.value) ? props.value : [])
  const dateIndex = currentValue.findIndex((item) => item && compareDate(item, date.date) === 0)
  const value = dateIndex === -1 ? [...currentValue, getDate(date.date)] : currentValue.filter((_, index) => index !== dateIndex)
  emit('change', { value })
}

function handleDateRangeChange(date: CalendarDayItem) {
  if (date.disabled) return

  let value: (number | null)[] = []
  let type: CalendarDayType = ''
  const [startDate, endDate] = deepClone(isArray(props.value) ? props.value : [])
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
        msg: props.rangePrompt || translate('rangePrompt', props.maxRange)
      })
    } else {
      value = [startDate, getDate(date.date, true)]
    }
  } else if (props.type === 'datetimerange' && startDate && endDate) {
    // 时间范围类型，且有开始时间和结束时间，需要支持重新点击开始日期和结束日期可以重新修改时间
    if (compare === 0) {
      type = 'start'
      value = props.value as number[]
    } else if (compareDate(date.date, endDate) === 0) {
      type = 'end'
      value = props.value as number[]
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
function handleWeekChange(date: CalendarDayItem) {
  const [weekStart] = getWeekRange(date.date, props.firstDayOfWeek)

  // 周的第一天如果是禁用状态，则不可选中
  if (getFormatterDate(weekStart, new Date(weekStart).getDate()).disabled) return

  emit('change', {
    value: getDate(weekStart) + 24 * 60 * 60 * 1000
  })
}
function handleWeekRangeChange(date: CalendarDayItem) {
  const [weekStartDate] = getWeekRange(date.date, props.firstDayOfWeek)

  // 周的第一天如果是禁用状态，则不可选中
  if (getFormatterDate(weekStartDate, new Date(weekStartDate).getDate()).disabled) return

  let value: (number | null)[] = []
  const [startDate, endDate] = deepClone(isArray(props.value) ? props.value : [])
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
function getFormatterDate(date: number, day: string | number, type?: CalendarDayType) {
  let dayObj: CalendarDayItem = {
    date: date,
    text: day,
    topInfo: '',
    bottomInfo: '',
    type,
    disabled: compareDate(date, props.minDate) === -1 || compareDate(date, props.maxDate) === 1,
    isLastRow: isLastRow(date)
  }
  if (props.formatter) {
    if (isFunction(props.formatter)) {
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
