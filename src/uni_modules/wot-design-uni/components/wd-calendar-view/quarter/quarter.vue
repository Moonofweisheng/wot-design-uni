<template>
  <wd-toast selector="wd-year" />

  <view class="wd-year year">
    <view class="wd-year__title" v-if="showTitle">{{ yearTitle(date) }}</view>

    <view class="wd-year__quarters">
      <view
        v-for="(item, index) in quarters"
        :key="index"
        :class="`wd-year__quarter ${item.disabled ? 'is-disabled' : ''} ${item.isLastRow ? 'is-last-row' : ''} ${
          item.type ? quarterTypeClass(item.type) : ''
        }`"
        @click="handleDateClick(index)"
      >
        <view class="wd-year__quarter-top">{{ item.topInfo }}</view>
        <view class="wd-year__quarter-text">{{ getQuarterLabel(item.date) }}</view>
        <view class="wd-year__quarter-bottom">{{ item.bottomInfo }}</view>
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
import { computed, ref, watch } from 'vue'
import { deepClone, isArray, isFunction } from '../../common/util'
import { compareQuarter, formatYearTitle, getDateByDefaultTime, getItemClass, getQuarterByOffset, getQuarterOffset } from '../utils'
import { useToast } from '../../wd-toast'
import { useTranslate } from '../../composables/useTranslate'
import dayjs from '../../../dayjs'

import { quarterProps } from './types'
import type { CalendarDayItem, CalendarDayType } from '../types'

const props = defineProps(quarterProps)
const emit = defineEmits(['change'])

const toast = useToast('wd-year')
const { translate } = useTranslate('calendar-view')

const quarters = ref<CalendarDayItem[]>([])
const quarterTypeClass = computed(() => {
  return (quarterType: CalendarDayType) => {
    return getItemClass(quarterType, props.value, props.type)
  }
})

const yearTitle = computed(() => {
  return (date: number) => {
    return formatYearTitle(date)
  }
})

watch(
  [() => props.type, () => props.date, () => props.value, () => props.minDate, () => props.maxDate, () => props.formatter],
  () => {
    setQuarters()
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * 获取季度的格式化标签
 * @param {number} date - 时间戳
 * @returns {string} 格式化后的季度字符串，例如 "2023-Q2"
 */
function getQuarterLabel(date: number): string {
  // 使用 Day.js 处理传入的时间戳
  const dateObj = dayjs(date)

  // 获取季度数字 (1-4)
  const quarterNum = dateObj.quarter()

  return `Q${quarterNum}`
}

function setQuarters() {
  const quarterList: CalendarDayItem[] = []
  const date = new Date(props.date)
  const year = date.getFullYear()
  const value = props.value

  if (props.type.indexOf('range') > -1 && value && !isArray(value)) {
    console.error('[wot-design] value should be array when type is range')
    return
  }

  for (let quarter = 0; quarter < 4; quarter++) {
    // 计算季度的起始月份：Q1=0(1月), Q2=3(4月), Q3=6(7月), Q4=9(10月)
    const quarterStartMonth = quarter * 3
    const quarterStartDate = new Date(year, quarterStartMonth, 1).getTime()

    let type: CalendarDayType = getQuarterType(quarterStartDate)

    if (!type && compareQuarter(quarterStartDate, Date.now()) === 0) {
      type = 'current'
    }

    const quarterObj = getFormatterDate(quarterStartDate, quarter, type)
    quarterList.push(quarterObj)
  }

  quarters.value = deepClone(quarterList)
}
function getQuarterType(date: number) {
  if (props.type === 'quarterrange' && isArray(props.value)) {
    const [startDate, endDate] = props.value || []

    if (startDate && compareQuarter(date, startDate) === 0) {
      if (endDate && compareQuarter(startDate, endDate) === 0) {
        return 'same'
      }
      return 'start'
    } else if (endDate && compareQuarter(date, endDate) === 0) {
      return 'end'
    } else if (startDate && endDate && compareQuarter(date, startDate) === 1 && compareQuarter(date, endDate) === -1) {
      return 'middle'
    } else {
      return ''
    }
  } else {
    if (props.value && compareQuarter(date, props.value as number) === 0) {
      return 'selected'
    } else {
      return ''
    }
  }
}
function handleDateClick(index: number) {
  const date = quarters.value[index]

  if (date.disabled) return

  switch (props.type) {
    case 'quarter':
      handleQuarterChange(date)
      break
    case 'quarterrange':
      handleQuarterRangeChange(date)
      break
    default:
      handleQuarterChange(date)
  }
}
function getDate(date: number) {
  return props.defaultTime && props.defaultTime.length > 0 ? getDateByDefaultTime(date, props.defaultTime[0]) : date
}
function handleQuarterChange(date: CalendarDayItem) {
  if (date.type !== 'selected') {
    emit('change', {
      value: getDate(date.date)
    })
  }
}
function handleQuarterRangeChange(date: CalendarDayItem) {
  let value: (number | null)[] = []
  const [startDate, endDate] = isArray(props.value) ? props.value || [] : []
  const compare = compareQuarter(date.date, startDate!)

  // 禁止选择同个季度
  if (!props.allowSameDay && !endDate && compare === 0) return

  if (startDate && !endDate && compare > -1) {
    if (props.maxRange && getQuarterOffset(date.date, startDate) > props.maxRange) {
      const maxEndDate = getQuarterByOffset(startDate, props.maxRange - 1)
      value = [startDate, getDate(maxEndDate)]
      toast.show({
        msg: props.rangePrompt || translate('rangePromptQuarter', props.maxRange)
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

function getFormatterDate(date: number, quarter: number, type?: CalendarDayType) {
  let quarterObj: CalendarDayItem = {
    date: date,
    text: `Q${quarter + 1}`, // 改为显示季度文本，如 Q1, Q2, Q3, Q4
    topInfo: '',
    bottomInfo: '',
    type,
    disabled: compareQuarter(date, props.minDate) === -1 || compareQuarter(date, props.maxDate) === 1,
    isLastRow: quarter >= 2 // 季度索引 0-3，每行2个，所以最后一行是索引2和3
  }

  if (props.formatter) {
    if (isFunction(props.formatter)) {
      quarterObj = props.formatter(quarterObj)
    } else {
      console.error('[wot-design] error(wd-calendar-view): the formatter prop of wd-calendar-view should be a function')
    }
  }

  return quarterObj
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
