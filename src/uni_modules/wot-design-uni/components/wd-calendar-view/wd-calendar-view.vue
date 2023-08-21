<template>
  <view :class="`wd-calendar-view ${customClass}`">
    <year-panel
      v-if="type === 'month' || type === 'monthrange'"
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

type CalendarType = 'date' | 'dates' | 'datetime' | 'week' | 'month' | 'daterange' | 'datetimerange' | 'weekrange' | 'monthrange'

interface Props {
  customClass?: string
  // 选中值，为 13 位时间戳或时间戳数组
  modelValue: number | Array<number> | null
  // 日期类型
  type: CalendarType
  // 最小日期，为 13 位时间戳
  minDate: number
  // 最大日期，为 13 位时间戳
  maxDate: number
  // 周起始天
  firstDayOfWeek: number
  // 日期格式化函数
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter?: Function
  // type 为范围选择时有效，最大日期范围
  maxRange?: number
  // type 为范围选择时有效，选择超出最大日期范围时的错误提示文案
  rangePrompt?: string
  // type 为范围选择时有效，是否允许选择同一天
  allowSameDay: boolean
  // 是否展示面板标题，自动计算当前滚动的日期月份
  showPanelTitle: boolean
  // 选中日期所使用的当日内具体时刻
  defaultTime: string | Array<string>
  // 可滚动面板的高度
  panelHeight: number
  // type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据
  // eslint-disable-next-line @typescript-eslint/ban-types
  timeFilter?: Function
  // type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改
  hideSecond: boolean
}
const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  type: 'date',
  minDate: new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()).getTime(),
  maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate(), 23, 59, 59).getTime(),
  firstDayOfWeek: 0,
  allowSameDay: false,
  showPanelTitle: true,
  defaultTime: '00:00:00',
  panelHeight: 378,
  hideSecond: false
})

const formatDefauleTime = ref<number[]>([])

const yearPanelRef = ref()
const monthPanelRef = ref()

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

const emit = defineEmits(['change', 'update:modelValue', 'pickstart', 'pickend'])

// 对外暴露方法
function scrollIntoView() {
  const panel = getPanel()
  panel.scrollIntoView && panel.scrollIntoView()
}

function getPanel() {
  return props.type.indexOf('month') > -1 ? yearPanelRef.value : monthPanelRef.value
}

function handleChange({ value }) {
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

defineExpose({
  scrollIntoView
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
