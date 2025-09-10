<template>
  <view :class="`wd-calendar-view ${customClass}`">
    <!-- 季度选择面板 -->
    <quarter-panel
      v-if="type === 'quarter' || type === 'quarterrange'"
      ref="quarterPanelRef"
      :type="type"
      :value="modelValue"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      :max-range="maxRange"
      :range-prompt="rangePrompt"
      :allow-same-day="allowSameDay"
      :show-panel-title="showPanelTitle"
      :default-time="formatDefauleTime"
      :panel-height="panelHeight"
      @change="handleChange"
    />
    <year-panel
      v-else-if="type === 'month' || type === 'monthrange'"
      ref="yearPanelRef"
      :type="type"
      :value="modelValue"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      :max-range="maxRange"
      :range-prompt="rangePrompt"
      :allow-same-day="allowSameDay"
      :show-panel-title="showPanelTitle"
      :default-time="formatDefauleTime"
      :panel-height="panelHeight"
      @change="handleChange"
    />
    <month-panel
      v-else
      ref="monthPanelRef"
      :type="type"
      :value="modelValue"
      :min-date="minDate"
      :max-date="maxDate"
      :first-day-of-week="firstDayOfWeek"
      :formatter="formatter"
      :max-range="maxRange"
      :range-prompt="rangePrompt"
      :allow-same-day="allowSameDay"
      :show-panel-title="showPanelTitle"
      :default-time="formatDefauleTime"
      :panel-height="panelHeight"
      :immediate-change="immediateChange"
      :time-filter="timeFilter"
      :hide-second="hideSecond"
      @change="handleChange"
      @pickstart="handlePickStart"
      @pickend="handlePickEnd"
    />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-calendar-view',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getDefaultTime } from './utils'
import yearPanel from './yearPanel/year-panel.vue'
import MonthPanel from './monthPanel/month-panel.vue'
import QuarterPanel from './quarterPanel/quarter-panel.vue'
import { calendarViewProps, type CalendarViewExpose } from './types'

const props = defineProps(calendarViewProps)
const emit = defineEmits(['change', 'update:modelValue', 'pickstart', 'pickend'])
const formatDefauleTime = ref<number[][]>([])

const yearPanelRef = ref()
const monthPanelRef = ref()
const quarterPanelRef = ref()

watch(
  () => props.defaultTime,
  (newValue) => {
    formatDefauleTime.value = getDefaultTime(newValue)
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * 使当前日期或者选中日期滚动到可视区域
 */
function scrollIntoView() {
  const panel = getPanel()
  panel.scrollIntoView && panel.scrollIntoView()
}

function getPanel() {
  if (props.type.indexOf('quarter') > -1) {
    return quarterPanelRef.value
  } else if (props.type.indexOf('month') > -1) {
    return yearPanelRef.value
  } else {
    return monthPanelRef.value
  }
}

function handleChange({ value }: { value: number | number[] | null }) {
  emit('update:modelValue', value)
  emit('change', {
    value
  })
}
function handlePickStart() {
  emit('pickstart')
}
function handlePickEnd() {
  emit('pickend')
}

defineExpose<CalendarViewExpose>({
  scrollIntoView
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
