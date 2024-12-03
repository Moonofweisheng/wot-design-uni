<template>
  <view :class="`wd-calendar ${customClass}`">
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :close-on-click-modal="closeOnClickModal"
      :hide-when-close="false"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @close="handlePickerClose"
      @closed="handlePickerClosed"
      @opened="handlePickerOpened"
    >
      <view class="wd-calendar__header">
        <view v-if="!showTypeSwitch && shortcuts.length === 0" class="wd-calendar__title">{{ title || translate('title') }}</view>
        <view v-if="showTypeSwitch" class="wd-calendar__tabs">
          <wd-tabs ref="tabsRef" v-model="currentTab" @change="handleTypeChange">
            <wd-tab :title="translate('day')" :name="translate('day')" />
            <wd-tab :title="translate('week')" :name="translate('week')" />
            <wd-tab :title="translate('month')" :name="translate('month')" />
          </wd-tabs>
        </view>
        <view v-if="shortcuts.length > 0" class="wd-calendar__shortcuts">
          <wd-tag
            v-for="(item, index) in shortcuts"
            :key="index"
            custom-class="wd-calendar__tag"
            type="primary"
            plain
            round
            @click="handleShortcutClick(index)"
          >
            {{ item.text }}
          </wd-tag>
        </view>
        <wd-icon custom-class="wd-calendar__close" name="add" @click="close" />
      </view>
      <view :class="`wd-calendar__view  ${currentType.indexOf('range') > -1 ? 'is-range' : ''} ${showConfirm ? 'is-show-confirm' : ''}`">
        <view v-if="range(type)" :class="`wd-calendar__range-label ${type === 'monthrange' ? 'is-monthrange' : ''}`">
          <view
            :class="`wd-calendar__range-label-item ${!calendarValue || !isArray(calendarValue) || !calendarValue[0] ? 'is-placeholder' : ''}`"
            style="text-align: right"
          >
            {{ rangeLabel[0] }}
          </view>
          <view class="wd-calendar__range-sperator">/</view>
          <view :class="`wd-calendar__range-label-item ${!calendarValue || !isArray(calendarValue) || !calendarValue[1] ? 'is-placeholder' : ''}`">
            {{ rangeLabel[1] }}
          </view>
        </view>
        <wd-calendar-view
          ref="calendarViewRef"
          v-model="calendarValue"
          :type="currentType"
          :min-date="minDate"
          :max-date="maxDate"
          :first-day-of-week="firstDayOfWeek"
          :formatter="formatter"
          :panel-height="panelHeight"
          :max-range="maxRange"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          :time-filter="timeFilter"
          :hide-second="hideSecond"
          :show-panel-title="!range(type)"
          :immediate-change="immediateChange"
          @change="handleChange"
        />
      </view>
      <view v-if="showConfirm" class="wd-calendar__confirm">
        <wd-button block :disabled="confirmBtnDisabled" @click="handleConfirm">{{ confirmText || translate('confirm') }}</wd-button>
      </view>
    </wd-action-sheet>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-calendar',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import wdCalendarView from '../wd-calendar-view/wd-calendar-view.vue'
import wdActionSheet from '../wd-action-sheet/wd-action-sheet.vue'
import wdButton from '../wd-button/wd-button.vue'
import { ref, computed, watch } from 'vue'
import { dayjs } from '../common/dayjs'
import { deepClone, isArray, isEqual, padZero } from '../common/util'
import { getWeekNumber, isRange } from '../wd-calendar-view/utils'
import { useTranslate } from '../composables/useTranslate'
import { calendarProps, type CalendarExpose } from './types'
import type { CalendarType, CalendarViewInstance } from '../wd-calendar-view/types'
import type { TabsInstance } from '../wd-tabs/types'
const { translate } = useTranslate('calendar')

const formatRange = (value: number, rangeType: 'start' | 'end', type: CalendarType) => {
  switch (type) {
    case 'daterange':
      if (!value) {
        return rangeType === 'end' ? translate('endTime') : translate('startTime')
      }
      return dayjs(value).format(translate('dateFormat'))
    case 'datetimerange':
      if (!value) {
        return rangeType === 'end' ? translate('endTime') : translate('startTime')
      }
      return dayjs(value).format(translate('timeFormat'))
    case 'weekrange': {
      if (!value) {
        return rangeType === 'end' ? translate('endWeek') : translate('startWeek')
      }
      const date = new Date(value)
      const year = date.getFullYear()
      const week = getWeekNumber(value)
      return translate('weekFormat', year, padZero(week))
    }
    case 'monthrange':
      if (!value) {
        return rangeType === 'end' ? translate('endMonth') : translate('startMonth')
      }
      return dayjs(value).format(translate('monthFormat'))
  }
}

const props = defineProps(calendarProps)
const emit = defineEmits(['cancel', 'change', 'update:modelValue', 'confirm', 'open', 'update:visible', 'close'])

const pickerShow = ref<boolean>(false)
const calendarValue = ref<null | number | number[]>(null)
const lastCalendarValue = ref<null | number | number[]>(null)
const panelHeight = ref<number>(338)
const confirmBtnDisabled = computed(() => {
  return getConfirmBtnStatus(calendarValue.value)
})
const currentTab = ref<number>(0)
const lastTab = ref<number>(0)
const currentType = ref<CalendarType>('date')
const lastCurrentType = ref<CalendarType>()
const calendarViewRef = ref<CalendarViewInstance>() // 日历组件实例
const tabsRef = ref<TabsInstance>() // tabs组件实例

const rangeLabel = computed(() => {
  const [start, end] = deepClone(isArray(calendarValue.value) ? calendarValue.value : [])
  return [start, end].map((item, index) => {
    return (props.innerDisplayFormat || formatRange)(item, index === 0 ? 'start' : 'end', currentType.value)
  })
})

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (isEqual(val, oldVal)) return
    calendarValue.value = deepClone(val)
  },
  {
    immediate: true
  }
)

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      open()
    } else {
      close()
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.type,
  (newValue) => {
    if (props.showTypeSwitch) {
      const tabs = ['date', 'week', 'month']
      const rangeTabs = ['daterange', 'weekrange', 'monthrange']

      const index = newValue.indexOf('range') > -1 ? rangeTabs.indexOf(newValue) || 0 : tabs.indexOf(newValue)
      currentTab.value = index
    }
    panelHeight.value = props.showConfirm ? 338 : 400
    currentType.value = deepClone(newValue)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.showConfirm,
  (val) => {
    panelHeight.value = val ? 338 : 400
  },
  {
    deep: true,
    immediate: true
  }
)

const range = computed(() => {
  return (type: CalendarType) => {
    return isRange(type)
  }
})

function scrollIntoView() {
  calendarViewRef.value && calendarViewRef.value && calendarViewRef.value!.scrollIntoView()
}

// 对外暴露方法
function open() {
  pickerShow.value = true
  lastCalendarValue.value = deepClone(calendarValue.value)
  lastTab.value = currentTab.value
  lastCurrentType.value = currentType.value
  requestAnimationFrame(() => {
    scrollIntoView()
  })
}

/**
 * 弹出框打开后
 */
function handlePickerOpened() {
  if (props.showTypeSwitch && tabsRef.value) {
    tabsRef.value.scrollIntoView()
    tabsRef.value.updateLineStyle(false)
  }
}

// 对外暴露方法
function close() {
  pickerShow.value = false
}

/**
 * 弹出框关闭时
 */
function handlePickerClose() {
  emit('update:visible', false)
  emit('close')
}

/**
 * 弹出框关闭后
 */
function handlePickerClosed() {
  calendarValue.value = deepClone(lastCalendarValue.value)
  currentTab.value = lastTab.value
  currentType.value = lastCurrentType.value || 'date'
  scrollIntoView()
}

function handleTypeChange({ index }: { index: number }) {
  const tabs: CalendarType[] = ['date', 'week', 'month']
  const rangeTabs: CalendarType[] = ['daterange', 'weekrange', 'monthrange']
  const type = props.type.indexOf('range') > -1 ? rangeTabs[index] : tabs[index]
  currentTab.value = index
  currentType.value = type
}

function getConfirmBtnStatus(value: number | number[] | null) {
  let disabled = false
  // 范围选择未选择满，或者多日期选择未选择日期，按钮置灰不可点击
  if (
    (props.type.indexOf('range') > -1 && (!isArray(value) || !value[0] || !value[1] || !value)) ||
    (props.type === 'dates' && (!isArray(value) || value.length === 0 || !value)) ||
    !value
  ) {
    disabled = true
  }

  return disabled
}

function handleChange({ value }: { value: number | number[] | null }) {
  calendarValue.value = deepClone(value)
  emit('change', {
    value
  })

  if (!props.showConfirm && !confirmBtnDisabled.value) {
    handleConfirm()
  }
}

function handleConfirm() {
  if (props.beforeConfirm) {
    props.beforeConfirm({
      value: calendarValue.value,
      resolve: (isPass: boolean) => {
        isPass && onConfirm()
      }
    })
  } else {
    onConfirm()
  }
}
function onConfirm() {
  pickerShow.value = false
  lastCurrentType.value = currentType.value
  lastCalendarValue.value = deepClone(calendarValue.value)
  lastTab.value = currentTab.value
  emit('update:modelValue', calendarValue.value)
  emit('confirm', {
    value: calendarValue.value
  })
  emit('update:visible', false)
}

function handleShortcutClick(index: number) {
  if (props.onShortcutsClick && typeof props.onShortcutsClick === 'function') {
    calendarValue.value = deepClone(
      props.onShortcutsClick({
        item: props.shortcuts[index],
        index
      })
    )
  }
  if (!props.showConfirm) {
    handleConfirm()
  }
}

defineExpose<CalendarExpose>({
  close,
  open
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
