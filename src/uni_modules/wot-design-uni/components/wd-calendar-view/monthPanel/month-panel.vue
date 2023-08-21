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
      <view v-for="(item, index) in months(minDate, maxDate)" :key="index" :id="`month${index}`">
        <month
          class="month"
          :type="type"
          :date="item.date"
          :data-date="item.date"
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
        <view class="wd-month-panel__time-text">{{ timeType === 'start' ? '开始' : '结束' }}</view>
      </view>
      <view class="wd-month-panel__time-picker">
        <wd-picker-view
          v-if="timeData.length"
          v-model="timeValue"
          :columns="timeData"
          :columns-height="125"
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
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { debounce, getType, isEqual } from '../../common/util'
import { compareMonth, formatMonthTitle, getMonthEndDay, getMonths, getTimeData, getWeekLabel } from '../utils'
import Month from '../month/month.vue'
import { MonthInfo } from './type'

interface Props {
  type: string
  value: Array<number> | number | null
  minDate: number
  maxDate: number
  firstDayOfWeek: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter?: Function
  maxRange?: number
  rangePrompt?: string
  allowSameDay: boolean
  showPanelTitle: boolean
  defaultTime: Array<number>
  panelHeight: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  timeFilter?: Function
  hideSecond: boolean
}
const props = withDefaults(defineProps<Props>(), {
  allowSameDay: false,
  showPanelTitle: false,
  hideSecond: false
})

const title = ref<string>('')
const scrollTop = ref<number>(0) // 滚动位置
const timeValue = ref<Array<string>>([])
const timeData = ref<Array<string | string[]>>([])
const timeType = ref<string>('') // 当前时间类型，是开始还是结束
const innerValue = ref<string | number[]>('') // 内部保存一个值，用于判断新老值，避免监听器触发

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
const months = computed(() => {
  return (minDate: number, maxDate: number): MonthInfo[] => {
    let months = getMonths(minDate, maxDate).map((month) => {
      const offset = (7 + new Date(month).getDay() - props.firstDayOfWeek) % 7
      const totalDay = getMonthEndDay(new Date(month).getFullYear(), new Date(month).getMonth() + 1)
      return {
        height: (offset + totalDay > 35 ? 64 * 6 : 64 * 5) + 45,
        date: month
      }
    })
    return months
  }
})

watch(
  () => props.type,
  (val) => {
    if (
      (val === 'datetime' && props.value) ||
      (val === 'datetimerange' && typeof props.value === 'object' && props.value && props.value.length > 0 && props.value[0])
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

    if ((props.type === 'datetime' && val) || (props.type === 'datetimerange' && val && typeof val === 'object' && val.length > 0 && val[0])) {
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

const emit = defineEmits(['change', 'pickstart', 'pickend'])

const handleChange = debounce((value) => {
  emit('change', {
    value
  })
}, 50)

function scrollIntoView() {
  setTimeout(() => {
    let activeDate
    const type = getType(props.value)
    if (type === 'array') {
      activeDate = props.value![0]
    } else if (type === 'number') {
      activeDate = props.value
    }

    if (!activeDate) {
      activeDate = Date.now()
    }

    const monthsInfo = months.value(props.minDate, props.maxDate)

    let top: number = 0
    for (let index = 0; index < monthsInfo.length; index++) {
      if (compareMonth(monthsInfo[index].date, activeDate) === 0) {
        break
      }
      top += monthsInfo[index] ? Number(monthsInfo[index].height) : 0
    }
    scrollTop.value = 0
    nextTick(() => {
      scrollTop.value = top
    })
  }, 50)
}
/**
 * 获取时间 picker 的数据
 * @param {timestamp|array} value 当前时间
 * @param {string} type 类型，是开始还是结束
 */
function getTime(value, type?: string) {
  if (!props.value) {
    return []
  }
  if (props.type === 'datetime') {
    return getTimeData({
      date: value,
      minDate: props.minDate,
      maxDate: props.maxDate,
      filter: props.timeFilter,
      isHideSecond: props.hideSecond
    })
  } else {
    if (type === 'start' && typeof props.value === 'object') {
      return getTimeData({
        date: value[0],
        minDate: props.minDate,
        maxDate: props.value[1] ? props.value[1] : props.maxDate,
        filter: props.timeFilter,
        isHideSecond: props.hideSecond
      })
    } else {
      return getTimeData({
        date: value[1],
        minDate: value[0],
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
function getTimeValue(date, type) {
  if (props.type === 'datetime') {
    date = new Date(date)
  } else {
    if (type === 'start') {
      date = new Date(date[0])
    } else {
      date = new Date(date[1])
    }
  }

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return props.hideSecond ? [hour, minute] : [hour, minute, second]
}
function setTime(value, type) {
  if (getType(value) === 'array' && value[0] && value[1] && type === 'start' && timeType.value === 'start') {
    type = 'end'
  }

  timeData.value = getTime(value, type) || []
  timeValue.value = getTimeValue(value, type)
  timeType.value = type
}
function handleDateChange({ value, type }) {
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
function handleTimeChange({ value }) {
  if (!props.value) {
    return
  }
  if (props.type === 'datetime' && typeof props.value === 'number') {
    const date = new Date(props.value)
    date.setHours(value[0])
    date.setMinutes(value[1])
    date.setSeconds(props.hideSecond ? 0 : value[2])
    const dateTime = date.getTime()
    timeData.value = getTime(dateTime) || []
    timeValue.value = value
    handleChange(dateTime)
  } else if (typeof props.value === 'object') {
    const [start, end] = props.value!
    const dataValue = timeType.value === 'start' ? start : end
    const date = new Date(dataValue)
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

    timeData.value = getTime(finalValue, timeType.value) || []
    timeValue.value = value
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
  const monthsInfo = months.value(props.minDate, props.maxDate)
  if (monthsInfo.length <= 1) {
    return
  }
  const scrollTop = Math.max(0, event.detail.scrollTop)
  doSetSubtitle(scrollTop, monthsInfo)
}

/**
 * 设置小标题
 * scrollTop 滚动条位置
 */
function doSetSubtitle(scrollTop: number, monthsInfo: MonthInfo[]) {
  let height: number = 0 // 月份高度和
  for (let index = 0; index < monthsInfo.length; index++) {
    height = height + monthsInfo[index].height
    if (scrollTop < height + 45) {
      title.value = formatMonthTitle(monthsInfo[index].date)
      return
    }
  }
}

defineExpose({
  scrollIntoView
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
