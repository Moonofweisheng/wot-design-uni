import { computed } from 'vue'
import dayjs from '../../dayjs'
import { isArray, isFunction, padZero } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import type { CalendarDayType, CalendarItem, CalendarTimeFilter, CalendarType } from './types'
const { translate } = useTranslate('calendar-view')

const weeks = computed(() => {
  return [
    translate('weeks.sun'),
    translate('weeks.mon'),
    translate('weeks.tue'),
    translate('weeks.wed'),
    translate('weeks.thu'),
    translate('weeks.fri'),
    translate('weeks.sat')
  ]
})

/**
 * 比较两个时间的日期是否相等
 * @param {timestamp} date1
 * @param {timestamp} date2
 */
export function compareDate(date1: number, date2: number | null) {
  const dateValue1 = new Date(date1)
  const dateValue2 = new Date(date2 || '')

  const year1 = dateValue1.getFullYear()
  const year2 = dateValue2.getFullYear()
  const month1 = dateValue1.getMonth()
  const month2 = dateValue2.getMonth()
  const day1 = dateValue1.getDate()
  const day2 = dateValue2.getDate()

  if (year1 === year2) {
    if (month1 === month2) {
      return day1 === day2 ? 0 : day1 > day2 ? 1 : -1
    }
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1
  }

  return year1 > year2 ? 1 : -1
}

/**
 * 判断是否是范围选择
 * @param {string} type
 */
export function isRange(type: CalendarType) {
  return type.indexOf('range') > -1
}

/**
 * 比较两个日期的月份是否相等
 * @param {timestamp} date1
 * @param {timestamp} date2
 */
export function compareMonth(date1: number, date2: number) {
  const dateValue1 = new Date(date1)
  const dateValue2 = new Date(date2)

  const year1 = dateValue1.getFullYear()
  const year2 = dateValue2.getFullYear()
  const month1 = dateValue1.getMonth()
  const month2 = dateValue2.getMonth()

  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1
  }

  return year1 > year2 ? 1 : -1
}

/**
 * 比较两个日期的年份是否一致
 * @param {timestamp} date1
 * @param {timestamp} date2
 */
export function compareYear(date1: number, date2: number) {
  const dateValue1 = new Date(date1)
  const dateValue2 = new Date(date2)

  const year1 = dateValue1.getFullYear()
  const year2 = dateValue2.getFullYear()

  return year1 === year2 ? 0 : year1 > year2 ? 1 : -1
}

/**
 * 获取一个月的最后一天
 * @param {number} year
 * @param {number} month
 */
export function getMonthEndDay(year: number, month: number) {
  return 32 - new Date(year, month - 1, 32).getDate()
}

/**
 * 格式化年月
 * @param {timestamp} date
 */
export function formatMonthTitle(date: number) {
  return dayjs(date).format(translate('monthTitle'))
}

/**
 * 根据下标获取星期
 * @param {number} index
 */
export function getWeekLabel(index: number) {
  if (index >= 7) {
    index = index % 7
  }

  return weeks.value[index]
}

/**
 * 格式化年份
 * @param {timestamp} date
 */
export function formatYearTitle(date: number) {
  return dayjs(date).format(translate('yearTitle'))
}

/**
 * 根据最小日期和最大日期获取这之间总共有几个月份
 * @param {timestamp} minDate
 * @param {timestamp} maxDate
 */
export function getMonths(minDate: number, maxDate: number) {
  const months: number[] = []
  const month = new Date(minDate)
  month.setDate(1)

  while (compareMonth(month.getTime(), maxDate) < 1) {
    months.push(month.getTime())
    month.setMonth(month.getMonth() + 1)
  }

  return months
}

/**
 * 根据最小日期和最大日期获取这之间总共有几年
 * @param {timestamp} minDate
 * @param {timestamp} maxDate
 */
export function getYears(minDate: number, maxDate: number) {
  const years: number[] = []
  const year = new Date(minDate)
  year.setMonth(0)
  year.setDate(1)

  while (compareYear(year.getTime(), maxDate) < 1) {
    years.push(year.getTime())
    year.setFullYear(year.getFullYear() + 1)
  }

  return years
}

/**
 * 获取一个日期所在周的第一天和最后一天
 * @param {timestamp} date
 */
export function getWeekRange(date: number, firstDayOfWeek: number) {
  if (firstDayOfWeek >= 7) {
    firstDayOfWeek = firstDayOfWeek % 7
  }

  const dateValue = new Date(date)
  dateValue.setHours(0, 0, 0, 0)
  const year = dateValue.getFullYear()
  const month = dateValue.getMonth()
  const day = dateValue.getDate()
  const week = dateValue.getDay()

  const weekStart = new Date(year, month, day - ((7 + week - firstDayOfWeek) % 7))
  const weekEnd = new Date(year, month, day + 6 - ((7 + week - firstDayOfWeek) % 7))

  return [weekStart.getTime(), weekEnd.getTime()]
}

/**
 * 获取日期偏移量
 * @param {timestamp} date1
 * @param {timestamp} date2
 */
export function getDayOffset(date1: number, date2: number) {
  return (date1 - date2) / (24 * 60 * 60 * 1000) + 1
}

/**
 * 获取偏移日期
 * @param {timestamp} date
 * @param {number} offset
 */
export function getDayByOffset(date: number, offset: number) {
  const dateValue = new Date(date)
  dateValue.setDate(dateValue.getDate() + offset)

  return dateValue.getTime()
}

export const getPrevDay = (date: number) => getDayByOffset(date, -1)
export const getNextDay = (date: number) => getDayByOffset(date, 1)

/**
 * 获取月份偏移量
 * @param {timestamp} date1
 * @param {timestamp} date2
 */
export function getMonthOffset(date1: number, date2: number) {
  const dateValue1 = new Date(date1)
  const dateValue2 = new Date(date2)

  const year1 = dateValue1.getFullYear()
  const year2 = dateValue2.getFullYear()
  let month1 = dateValue1.getMonth()
  const month2 = dateValue2.getMonth()

  month1 = (year1 - year2) * 12 + month1

  return month1 - month2 + 1
}

/**
 * 获取偏移月份
 * @param {timestamp} date
 * @param {number} offset
 */
export function getMonthByOffset(date: number, offset: number) {
  const dateValue = new Date(date)
  dateValue.setMonth(dateValue.getMonth() + offset)

  return dateValue.getTime()
}

/**
 * 获取默认时间，格式化为数组
 * @param {array|string|null} defaultTime
 */
export function getDefaultTime(defaultTime: string[] | string | null) {
  if (isArray(defaultTime)) {
    const startTime = (defaultTime[0] || '00:00:00').split(':').map((item: string) => {
      return parseInt(item)
    })
    const endTime = (defaultTime[1] || '00:00:00').split(':').map((item) => {
      return parseInt(item)
    })
    return [startTime, endTime]
  } else {
    const time = (defaultTime || '00:00:00').split(':').map((item) => {
      return parseInt(item)
    })

    return [time, time]
  }
}

/**
 * 根据默认时间获取日期
 * @param {timestamp} date
 * @param {array} defaultTime
 */
export function getDateByDefaultTime(date: number, defaultTime: number[]) {
  const dateValue = new Date(date)
  dateValue.setHours(defaultTime[0])
  dateValue.setMinutes(defaultTime[1])
  dateValue.setSeconds(defaultTime[2])

  return dateValue.getTime()
}

/**
 * 获取经过 iteratee 格式化后的长度为 n 的数组
 * @param {number} n
 * @param {function} iteratee
 */
const times = (n: number, iteratee: (index: number) => CalendarItem) => {
  let index: number = -1
  const result: CalendarItem[] = Array(n < 0 ? 0 : n)
  while (++index < n) {
    result[index] = iteratee(index)
  }
  return result
}

/**
 * 获取时分秒
 * @param {timestamp}} date
 */
const getTime = (date: number) => {
  const dateValue = new Date(date)
  return [dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds()]
}

/**
 * 根据最小最大日期获取时间数据，用于填入picker
 * @param {*} param0
 */
export function getTimeData({
  date,
  minDate,
  maxDate,
  isHideSecond,
  filter
}: {
  date: number
  minDate: number
  maxDate: number
  isHideSecond: boolean
  filter?: CalendarTimeFilter
}) {
  const compareMin = compareDate(date, minDate)
  const compareMax = compareDate(date, maxDate)

  let minHour = 0
  let maxHour = 23
  let minMinute = 0
  let maxMinute = 59
  let minSecond = 0
  let maxSecond = 59

  if (compareMin === 0) {
    const minTime = getTime(minDate)
    const currentTime = getTime(date)

    minHour = minTime[0]
    if (minTime[0] === currentTime[0]) {
      minMinute = minTime[1]

      if (minTime[1] === currentTime[1]) {
        minSecond = minTime[2]
      }
    }
  }

  if (compareMax === 0) {
    const maxTime = getTime(maxDate)
    const currentTime = getTime(date)

    maxHour = maxTime[0]
    if (maxTime[0] === currentTime[0]) {
      maxMinute = maxTime[1]

      if (maxTime[1] === currentTime[1]) {
        maxSecond = maxTime[2]
      }
    }
  }

  let columns: CalendarItem[][] = []
  let hours = times(24, (index) => {
    return {
      label: translate('hour', padZero(index)),
      value: index,
      disabled: index < minHour || index > maxHour
    }
  })
  let minutes = times(60, (index) => {
    return {
      label: translate('minute', padZero(index)),
      value: index,
      disabled: index < minMinute || index > maxMinute
    }
  })
  let seconds: CalendarItem[] = []
  if (filter && isFunction(filter)) {
    hours = filter({
      type: 'hour',
      values: hours
    })
    minutes = filter({
      type: 'minute',
      values: minutes
    })
  }

  if (!isHideSecond) {
    seconds = times(60, (index) => {
      return {
        label: translate('second', padZero(index)),
        value: index,
        disabled: index < minSecond || index > maxSecond
      }
    })
    if (filter && isFunction(filter)) {
      seconds = filter({
        type: 'second',
        values: seconds
      })
    }
  }

  columns = isHideSecond ? [hours, minutes] : [hours, minutes, seconds]

  return columns
}

/**
 * 获取当前是第几周
 * @param {timestamp} date
 */
export function getWeekNumber(date: number | Date) {
  date = new Date(date)
  date.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  // January 4 is always in week 1.
  const week = new Date(date.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
  return 1 + Math.round(((date.getTime() - week.getTime()) / 86400000 - 3 + ((week.getDay() + 6) % 7)) / 7)
}

export function getItemClass(monthType: CalendarDayType, value: number | null | (number | null)[], type: CalendarType) {
  const classList = ['is-' + monthType]

  if (type.indexOf('range') > -1 && isArray(value)) {
    if (!value || !value[1]) {
      classList.push('is-without-end')
    }
  }

  return classList.join(' ')
}
