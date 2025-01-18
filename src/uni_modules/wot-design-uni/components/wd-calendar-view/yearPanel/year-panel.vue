<template>
  <view class="wd-year-panel">
    <view v-if="showPanelTitle" class="wd-year-panel__title">{{ title }}</view>
    <scroll-view class="wd-year-panel__container" :style="`height: ${scrollHeight}px`" scroll-y @scroll="yearScroll" :scroll-top="scrollTop">
      <view v-for="(item, index) in years" :key="index" :id="`year${index}`">
        <year
          :type="type"
          :date="item.date"
          :value="value"
          :min-date="minDate"
          :max-date="maxDate"
          :max-range="maxRange"
          :formatter="formatter"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          :showTitle="index !== 0"
          @change="handleDateChange"
        />
      </view>
    </scroll-view>
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
import { computed, ref, onMounted } from 'vue'
import { compareYear, formatYearTitle, getYears } from '../utils'
import { isArray, isNumber, pause } from '../../common/util'
import Year from '../year/year.vue'
import { yearPanelProps, type YearInfo, type YearPanelExpose } from './types'

const props = defineProps(yearPanelProps)
const emit = defineEmits(['change'])

const scrollTop = ref<number>(0) // 滚动位置
const scrollIndex = ref<number>(0) // 当前显示的年份索引

// 滚动区域的高度
const scrollHeight = computed(() => {
  const scrollHeight: number = props.panelHeight + (props.showPanelTitle ? 26 : 16)
  return scrollHeight
})

// 年份信息
const years = computed<YearInfo[]>(() => {
  return getYears(props.minDate, props.maxDate).map((year, index) => {
    return {
      date: year,
      height: index === 0 ? 200 : 245
    }
  })
})

// 标题
const title = computed(() => {
  return formatYearTitle(years.value[scrollIndex.value].date)
})

onMounted(() => {
  scrollIntoView()
})

async function scrollIntoView() {
  await pause()
  let activeDate: number | null = null
  if (isArray(props.value)) {
    activeDate = props.value![0]
  } else if (isNumber(props.value)) {
    activeDate = props.value
  }

  if (!activeDate) {
    activeDate = Date.now()
  }

  let top: number = 0
  for (let index = 0; index < years.value.length; index++) {
    if (compareYear(years.value[index].date, activeDate) === 0) {
      break
    }
    top += years.value[index] ? Number(years.value[index].height) : 0
  }
  scrollTop.value = 0
  if (top > 0) {
    await pause()
    scrollTop.value = top + 45
  }
}

const yearScroll = (event: { detail: { scrollTop: number } }) => {
  if (years.value.length <= 1) {
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
  for (let index = 0; index < years.value.length; index++) {
    height = height + years.value[index].height
    if (scrollTop < height) {
      scrollIndex.value = index
      return
    }
  }
}

function handleDateChange({ value }: { value: number[] }) {
  emit('change', {
    value
  })
}

defineExpose<YearPanelExpose>({
  scrollIntoView
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
