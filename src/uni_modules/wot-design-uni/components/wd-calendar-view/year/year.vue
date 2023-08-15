<template>
  <wd-toast selector="wd-year" />

  <view class="wd-year year" :data-date="date">
    <view class="wd-year__title">{{ yearTitle(date) }}</view>
    <view class="wd-year__months">
      <view
        v-for="(item, index) in months"
        :key="index"
        :class="`wd-year__month ${item.disabled ? 'is-disabled' : ''} ${item.type ? itemClass(item.type, value, type) : ''}`"
        @click="handleDateClick(index)"
      >
        <view class="wd-year__month-top">{{ item.topInfo }}</view>
        <view class="wd-year__month-text">{{ item.text }}月</view>
        <view class="wd-year__month-bottom">{{ item.bottomInfo }}</view>
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
import { deepClone, getType } from '../../common/util'
import { compareMonth, formatYearTitle, getDateByDefaultTime, getItemClass, getMonthByOffset, getMonthOffset } from '../utils'
import { useToast } from '../../wd-toast'

interface Props {
  type: string
  date: number
  value: null | number | Array<number>
  minDate: number
  maxDate: number
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
const toast = useToast('wd-year')

const months = ref<Record<string, any>[]>([])

const itemClass = computed(() => {
  return (monthType, value, type) => {
    return getItemClass(monthType, value, type)
  }
})

const yearTitle = computed(() => {
  return (date) => {
    return formatYearTitle(date)
  }
})

const emit = defineEmits(['change'])

watch(
  [() => props.type, () => props.date, () => props.value, () => props.minDate, () => props.maxDate, () => props.formatter],
  () => {
    setMonths()
  },
  {
    deep: true,
    immediate: true
  }
)

function setMonths() {
  const monthList: Record<string, any>[] = []
  const date = new Date(props.date)
  const year = date.getFullYear()

  const value = props.value
  const valueType = getType(value)

  if (props.type.indexOf('range') > -1 && value && valueType !== 'array') {
    console.error('[wot-design] value should be array when type is range')
    return
  }

  for (let month = 0; month < 12; month++) {
    const date = new Date(year, month, 1).getTime()
    let type = getMonthType(date)
    if (!type && compareMonth(date, Date.now()) === 0) {
      type = 'current'
    }
    const monthObj = getFormatterDate(date, month, type)
    monthList.push(monthObj)
  }

  months.value = deepClone(monthList)
}
function getMonthType(date) {
  if (props.type === 'monthrange' && typeof props.value === 'object') {
    const [startDate, endDate] = props.value || []

    if (startDate && compareMonth(date, startDate) === 0) {
      if (endDate && compareMonth(startDate, endDate) === 0) {
        return 'same'
      }
      return 'start'
    } else if (endDate && compareMonth(date, endDate) === 0) {
      return 'end'
    } else if (startDate && endDate && compareMonth(date, startDate) === 1 && compareMonth(date, endDate) === -1) {
      return 'middle'
    } else {
      return ''
    }
  } else {
    if (props.value && compareMonth(date, props.value) === 0) {
      return 'selected'
    } else {
      return ''
    }
  }
}
function handleDateClick(index) {
  const date = months.value[index]

  if (date.disabled) return

  switch (props.type) {
    case 'month':
      handleMonthChange(date)
      break
    case 'monthrange':
      handleMonthRangeChange(date)
      break
    default:
      handleMonthChange(date)
  }
}
function getDate(date) {
  return props.defaultTime && props.defaultTime.length > 0 ? getDateByDefaultTime(date, props.defaultTime[0]) : date
}
function handleMonthChange(date) {
  if (date.type !== 'selected') {
    emit('change', {
      value: getDate(date.date)
    })
  }
}
function handleMonthRangeChange(date) {
  let value
  const [startDate, endDate] = typeof props.value === 'object' ? props.value || [] : []
  const compare = compareMonth(date.date, startDate)

  // 禁止选择同个日期
  if (!props.allowSameDay && !endDate && compare === 0) return

  if (startDate && !endDate && compare > -1) {
    if (props.maxRange && getMonthOffset(date.date, startDate) > props.maxRange) {
      const maxEndDate = getMonthByOffset(startDate, props.maxRange - 1)
      value = [startDate, getDate(maxEndDate)]
      toast.show({
        msg: props.rangePrompt || `选择月份不能超过${props.maxRange}个月`
      })
    } else {
      value = [startDate, getDate(date.date)]
    }
  } else {
    value = [getDate(date.date), null]
  }
  emit('change', {
    value
  })
}
function getFormatterDate(date, month, type) {
  let monthObj = {
    date: date,
    text: month + 1,
    topInfo: '',
    bottomInfo: '',
    type,
    disabled: compareMonth(date, props.minDate) === -1 || compareMonth(date, props.maxDate) === 1
  }
  if (props.formatter) {
    if (getType(props.formatter) === 'function') {
      monthObj = props.formatter(monthObj)
    } else {
      console.error('[wot-design] error(wd-calendar-view): the formatter prop of wd-calendar-view should be a function')
    }
  }

  return monthObj
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
