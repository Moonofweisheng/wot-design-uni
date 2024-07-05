<template>
  <view class="wd-month-panel">
    <view v-if="showPanelTitle" class="wd-month-panel__title">
      {{ title }}
    </view>
    <view class="wd-month-panel__weeks">
      <view v-for="item in 7" :key="item" class="wd-month-panel__week">{{ weekLabel(item + firstDayOfWeek) }}</view>
    </view>
    <scroll-view
      :class="`wd-month-panel__container ${!!timeType ? 'wd-month-panel__container--time' : ''}`"
      :style="`height: ${scrollHeight}px`"
      scroll-y
      @scroll="monthScroll"
      :scroll-top="scrollTop"
    >
      <view v-for="(item, index) in months" :key="index" :id="`month${index}`">
        <month
          :type="type"
          :date="item.date"
          :value="value"
          :min-date="minDate"
          :max-date="maxDate"
          :first-day-of-week="firstDayOfWeek"
          :formatter="formatter"
          :max-range="maxRange"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          @change="handleDateChange"
        />
      </view>
    </scroll-view>
    <view v-if="timeType" class="wd-month-panel__time">
      <view v-if="type === 'datetimerange'" class="wd-month-panel__time-label">
        <view class="wd-month-panel__time-text">{{ timeType === 'start' ? translate('startTime') : translate('endTime') }}</view>
      </view>
      <view class="wd-month-panel__time-picker">
        <wd-picker-view
          v-if="timeData.length"
          v-model="timeValue"
          :columns="timeData"
          :columns-height="125"
          :immediate-change="immediateChange"
          @change="handleTimeChange"
          @pickstart="handlePickStart"
          @pickend="handlePickEnd"
        />
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
import { computed, ref, watch, onMounted } from 'vue'
import { debounce, isArray, isEqual, isNumber, requestAnimationFrame } from '../../common/util'
import { compareMonth, formatMonthTitle, getMonthEndDay, getMonths, getTimeData, getWeekLabel } from '../utils'
import Month from '../month/month.vue'
import { monthPanelProps, type MonthInfo, type MonthPanelTimeType, type MonthPanelExpose } from './types'
import { useTranslate } from '../../composables/useTranslate'
import type { CalendarItem } from '../types'

const props = defineProps(monthPanelProps)
const emit = defineEmits(['change', 'pickstart', 'pickend'])

const { translate } = useTranslate('calendar-view')

const scrollTop = ref<number>(0) // 滚动位置
const scrollIndex = ref<number>(0) // 当前显示的月份索引
const timeValue = ref<number[]>([]) // 当前选中的时分秒

const timeType = ref<MonthPanelTimeType>('') // 当前时间类型，是开始还是结束
const innerValue = ref<string | number | (number | null)[]>('') // 内部保存一个值，用于判断新老值，避免监听器触发

const handleChange = debounce((value) => {
  emit('change', {
    value
  })
}, 50)

// 时间picker的列数据
const timeData = computed<Array<CalendarItem[]>>(() => {
  let timeColumns: Array<CalendarItem[]> = []
  if (props.type === 'datetime' && isNumber(props.value)) {
    const date = new Date(props.value)
    date.setHours(timeValue.value[0])
    date.setMinutes(timeValue.value[1])
    date.setSeconds(props.hideSecond ? 0 : timeValue.value[2])
    const dateTime = date.getTime()
    timeColumns = getTime(dateTime) || []
  } else if (isArray(props.value) && props.type === 'datetimerange') {
    const [start, end] = props.value!
    const dataValue = timeType.value === 'start' ? start : end
    const date = new Date(dataValue || '')
    date.setHours(timeValue.value[0])
    date.setMinutes(timeValue.value[1])
    date.setSeconds(props.hideSecond ? 0 : timeValue.value[2])
    const dateTime = date.getTime()
    const finalValue = [start, end]
    if (timeType.value === 'start') {
      finalValue[0] = dateTime
    } else {
      finalValue[1] = dateTime
    }
    timeColumns = getTime(finalValue, timeType.value) || []
  }
  return timeColumns
})

// 标题
const title = computed(() => {
  return formatMonthTitle(months.value[scrollIndex.value].date)
})

// 周标题
const weekLabel = computed(() => {
  return (index: number) => {
    return getWeekLabel(index - 1)
  }
})

// 滚动区域的高度
const scrollHeight = computed(() => {
  const scrollHeight: number = timeType.value ? (props.panelHeight || 378) - 125 : props.panelHeight || 378
  return scrollHeight
})

// 月份日期和月份高度
const months = computed<MonthInfo[]>(() => {
  return getMonths(props.minDate, props.maxDate).map((month) => {
    const offset = (7 + new Date(month).getDay() - props.firstDayOfWeek) % 7
    const totalDay = getMonthEndDay(new Date(month).getFullYear(), new Date(month).getMonth() + 1)
    return {
      height: (offset + totalDay > 35 ? 64 * 6 : 64 * 5) + 45,
      date: month
    }
  })
})

watch(
  () => props.type,
  (val) => {
    if (
      (val === 'datetime' && props.value) ||
      (val === 'datetimerange' && isArray(props.value) && props.value && props.value.length > 0 && props.value[0])
    ) {
      setTime(props.value, 'start')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.value,
  (val) => {
    if (isEqual(val, innerValue.value)) return

    if ((props.type === 'datetime' && val) || (props.type === 'datetimerange' && val && isArray(val) && val.length > 0 && val[0])) {
      setTime(val, 'start')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

onMounted(() => {
  scrollIntoView()
})

/**
 * 使当前日期或者选中日期滚动到可视区域
 */
function scrollIntoView() {
  requestAnimationFrame(() => {
    let activeDate: number | null = 0
    if (isArray(props.value)) {
      activeDate = props.value![0]
    } else if (isNumber(props.value)) {
      activeDate = props.value
    }

    if (!activeDate) {
      activeDate = Date.now()
    }

    let top: number = 0
    for (let index = 0; index < months.value.length; index++) {
      if (compareMonth(months.value[index].date, activeDate) === 0) {
        break
      }
      top += months.value[index] ? Number(months.value[index].height) : 0
    }
    scrollTop.value = 0
    requestAnimationFrame(() => {
      scrollTop.value = top
    })
  })
}
/**
 * 获取时间 picker 的数据
 * @param {timestamp|array} value 当前时间
 * @param {string} type 类型，是开始还是结束
 */
function getTime(value: number | (number | null)[], type?: string) {
  if (props.type === 'datetime') {
    return getTimeData({
      date: value as number,
      minDate: props.minDate,
      maxDate: props.maxDate,
      filter: props.timeFilter,
      isHideSecond: props.hideSecond
    })
  } else {
    if (type === 'start' && isArray(props.value)) {
      return getTimeData({
        date: (value as Array<number>)[0],
        minDate: props.minDate,
        maxDate: props.value[1] ? props.value[1] : props.maxDate,
        filter: props.timeFilter,
        isHideSecond: props.hideSecond
      })
    } else {
      return getTimeData({
        date: (value as Array<number>)[1],
        minDate: (value as Array<number>)[0],
        maxDate: props.maxDate,
        filter: props.timeFilter,
        isHideSecond: props.hideSecond
      })
    }
  }
}
/**
 * 获取 date 的时分秒
 * @param {timestamp} date 时间
 * @param {string} type 类型，是开始还是结束
 */
function getTimeValue(date: number | (number | null)[], type: MonthPanelTimeType) {
  let dateValue: Date = new Date()
  if (props.type === 'datetime') {
    dateValue = new Date(date as number)
  } else if (isArray(date)) {
    if (type === 'start') {
      dateValue = new Date(date[0] || '')
    } else {
      dateValue = new Date(date[1] || '')
    }
  }

  const hour = dateValue.getHours()
  const minute = dateValue.getMinutes()
  const second = dateValue.getSeconds()
  return props.hideSecond ? [hour, minute] : [hour, minute, second]
}

function setTime(value: number | (number | null)[], type?: MonthPanelTimeType) {
  if (isArray(value) && value[0] && value[1] && type === 'start' && timeType.value === 'start') {
    type = 'end'
  }
  timeType.value = type || ''
  timeValue.value = getTimeValue(value, type || '')
}
function handleDateChange({ value, type }: { value: number | (number | null)[]; type?: MonthPanelTimeType }) {
  if (!isEqual(value, props.value)) {
    // 内部保存一个值，用于判断新老值，避免监听器触发
    innerValue.value = value
    handleChange(value)
  }
  // datetime 和 datetimerange 类型，需要计算 timeData 并做展示
  if (props.type.indexOf('time') > -1) {
    setTime(value, type)
  }
}
function handleTimeChange({ value }: { value: any[] }) {
  if (!props.value) {
    return
  }
  if (props.type === 'datetime' && isNumber(props.value)) {
    const date = new Date(props.value)
    date.setHours(value[0])
    date.setMinutes(value[1])
    date.setSeconds(props.hideSecond ? 0 : value[2])
    const dateTime = date.getTime()
    handleChange(dateTime)
  } else if (isArray(props.value) && props.type === 'datetimerange') {
    const [start, end] = props.value!
    const dataValue = timeType.value === 'start' ? start : end
    const date = new Date(dataValue || '')
    date.setHours(value[0])
    date.setMinutes(value[1])
    date.setSeconds(props.hideSecond ? 0 : value[2])
    const dateTime = date.getTime()

    if (dateTime === dataValue) return

    const finalValue = [start, end]
    if (timeType.value === 'start') {
      finalValue[0] = dateTime
    } else {
      finalValue[1] = dateTime
    }
    innerValue.value = finalValue // 内部保存一个值，用于判断新老值，避免监听器触发
    handleChange(finalValue)
  }
}
function handlePickStart() {
  emit('pickstart')
}
function handlePickEnd() {
  emit('pickend')
}

const monthScroll = (event: { detail: { scrollTop: number } }) => {
  if (months.value.length <= 1) {
    return
  }
  const scrollTop = Math.max(0, event.detail.scrollTop)
  doSetSubtitle(scrollTop)
}

/**
 * 设置小标题
 * scrollTop 滚动条位置
 */
function doSetSubtitle(scrollTop: number) {
  let height: number = 0 // 月份高度和
  for (let index = 0; index < months.value.length; index++) {
    height = height + months.value[index].height
    if (scrollTop < height + 45) {
      scrollIndex.value = index
      return
    }
  }
}

defineExpose<MonthPanelExpose>({
  scrollIntoView
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
