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
      :style="`height: ${!!timeType ? (panelHeight || 378) - 125 : panelHeight || 378}px`"
      scroll-y
      :scroll-into-view="scrollIntoViewValue"
    >
      <view v-for="(item, index) in months(minDate, maxDate)" :key="index" :id="`month${index}`">
        <month
          class="month"
          :type="type"
          :date="item"
          :data-date="item"
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
          :show-picker="showPicker"
          @change="handleTimeChange"
          @pickstart="handlePickStart"
          @pickend="handlePickEnd"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { debounce, getType, isEqual } from '../../common/util'
import { compareMonth, formatMonthTitle, getMonths, getTimeData, getWeekLabel } from '../utils'
import Month from '../month/month.vue'

interface Props {
  type: string
  value: Array<number> | number | null
  minDate: number
  maxDate: number
  firstDayOfWeek: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter: Function
  maxRange: number
  rangePrompt: string
  allowSameDay: boolean
  showPanelTitle: boolean
  defaultTime: Array<number>
  panelHeight: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  timeFilter: Function
  hideSecond: boolean
  // 是否展示picker（兼容支付宝和钉钉）
  showPicker: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showPicker: true,
  allowSameDay: false,
  showPanelTitle: false,
  hideSecond: false
})

const title = ref<string>('')
const scrollIntoViewValue = ref<string>('')
const timeValue = ref<Array<string>>([])
const timeData = ref<Array<string | string[]>>([])
const timeType = ref<string>('') // 当前时间类型，是开始还是结束
const innerValue = ref<string | number[]>('') // 内部保存一个值，用于判断新老值，避免监听器触发

let contentObserver: null | UniApp.IntersectionObserver = null
const instance = getCurrentInstance() as any

const weekLabel = computed(() => {
  return (index: number) => {
    return getWeekLabel(index)
  }
})

const months = computed(() => {
  return (minDate, maxDate) => {
    return getMonths(minDate, maxDate)
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
  initRect()
  scrollIntoView()
})

const emit = defineEmits(['change', 'pickstart', 'pickend'])

const handleChange = debounce((value) => {
  emit('change', {
    value
  })
}, 50)

function initRect(thresholds = [0, 0.7, 0.8, 0.9, 1]) {
  if (!props.showPanelTitle) return

  if (contentObserver != null) {
    contentObserver.disconnect()
  }

  contentObserver = uni.createIntersectionObserver(instance, {
    thresholds,
    observeAll: true,
    dataset: true
  } as any)

  contentObserver.relativeTo('.wd-month-panel__container')
  contentObserver.observe('.month', (res: any) => {
    if (res.boundingClientRect.top <= res.relativeRect.top) {
      title.value = formatMonthTitle(res.dataset.date)
    }
  })
}
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

    const months = getMonths(props.minDate, props.maxDate)

    months.some((month, index) => {
      if (compareMonth(month, activeDate) === 0) {
        scrollIntoViewValue.value = `month${index}`
        return true
      }
      return false
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

  nextTick(() => {
    initRect([0, 0.58, 0.69, 0.83, 1])
  })
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

defineExpose({
  initRect,
  scrollIntoView
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
