<template>
  <view :class="`wd-calendar ${customClass}`">
    <template v-if="withCell">
      <wd-cell
        v-if="!$slots.default"
        :title="label"
        :value="showValue || placeholder || translate('placeholder')"
        :required="required"
        :size="size"
        :title-width="labelWidth"
        :prop="prop"
        :rules="rules"
        :clickable="!disabled && !readonly"
        :value-align="alignRight ? 'right' : 'left'"
        :center="center"
        :custom-class="`wd-calendar__cell ${disabled && 'is-disabled'} ${readonly && 'is-readonly'} ${error && 'is-error'} ${
          !showValue ? 'wd-calendar__cell--placeholder' : ''
        }`"
        :custom-style="customStyle"
        :custom-title-class="customLabelClass"
        :custom-value-class="customValueClass"
        :ellipsis="ellipsis"
        :use-title-slot="!!$slots.label"
        @click="open"
      >
        <template #title v-if="$slots.label">
          <slot name="label"></slot>
        </template>

        <template #right-icon>
          <wd-icon v-if="showArrow" custom-class="wd-calendar__arrow" name="arrow-right" />
          <view v-else-if="showClear" @click.stop="handleClear">
            <wd-icon custom-class="wd-calendar__clear" name="error-fill" />
          </view>
        </template>
      </wd-cell>
      <view v-else @click="open">
        <slot></slot>
      </view>
    </template>
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :close-on-click-modal="closeOnClickModal"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :z-index="zIndex"
      :root-portal="rootPortal"
      @close="close"
    >
      <view class="wd-calendar__header">
        <view v-if="!showTypeSwitch && shortcuts.length === 0" class="wd-calendar__title">{{ title || translate('title') }}</view>
        <view v-if="showTypeSwitch" class="wd-calendar__tabs">
          <wd-tabs ref="calendarTabs" v-model="currentTab" @change="handleTypeChange">
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
      <view
        v-if="inited"
        :class="`wd-calendar__view  ${currentType.indexOf('range') > -1 ? 'is-range' : ''} ${showConfirm ? 'is-show-confirm' : ''}`"
      >
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
          ref="calendarView"
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
import wdCell from '../wd-cell/wd-cell.vue'
import { ref, computed, watch } from 'vue'
import dayjs from '../../dayjs'
import { deepClone, isArray, isEqual, padZero, pause } from '../common/util'
import { getWeekNumber, isRange } from '../wd-calendar-view/utils'
import { FORM_KEY, type FormItemRule } from '../wd-form/types'
import { useParent } from '../composables/useParent'
import { useTranslate } from '../composables/useTranslate'
import { calendarProps, type CalendarExpose } from './types'
import type { CalendarType } from '../wd-calendar-view/types'
const { translate } = useTranslate('calendar')

const defaultDisplayFormat = (value: number | number[], type: CalendarType): string => {
  switch (type) {
    case 'date':
      return dayjs(value as number).format('YYYY-MM-DD')
    case 'dates':
      return (value as number[])
        .map((item) => {
          return dayjs(item).format('YYYY-MM-DD')
        })
        .join(', ')
    case 'daterange':
      return `${(value as number[])[0] ? dayjs((value as number[])[0]).format('YYYY-MM-DD') : translate('startTime')} ${translate('to')} ${
        (value as number[])[1] ? dayjs((value as number[])[1]).format('YYYY-MM-DD') : translate('endTime')
      }`
    case 'datetime':
      return dayjs(value as number).format('YYYY-MM-DD HH:mm:ss')
    case 'datetimerange':
      return `${(value as number[])[0] ? dayjs((value as number[])[0]).format(translate('timeFormat')) : translate('startTime')} ${translate(
        'to'
      )}\n${(value as number[])[1] ? dayjs((value as number[])[1]).format(translate('timeFormat')) : translate('endTime')}`
    case 'week': {
      const date = new Date(value as number)
      const year = date.getFullYear()
      const week = getWeekNumber(value as number)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay() + 1)
      const weekEnd = new Date(date)
      weekEnd.setDate(date.getDate() + (7 - date.getDay()))
      const adjustedYear = weekEnd.getFullYear() > year ? weekEnd.getFullYear() : year
      return translate('weekFormat', adjustedYear, padZero(week))
    }
    case 'weekrange': {
      const date1 = new Date((value as number[])[0])
      const date2 = new Date((value as number[])[1])
      const year1 = date1.getFullYear()
      const year2 = date2.getFullYear()
      const week1 = getWeekNumber((value as number[])[0])
      const week2 = getWeekNumber((value as number[])[1])
      const weekStart1 = new Date(date1)
      weekStart1.setDate(date1.getDate() - date1.getDay() + 1)
      const weekEnd1 = new Date(date1)
      weekEnd1.setDate(date1.getDate() + (7 - date1.getDay()))
      const weekStart2 = new Date(date2)
      weekStart2.setDate(date2.getDate() - date2.getDay() + 1)
      const weekEnd2 = new Date(date2)
      weekEnd2.setDate(date2.getDate() + (7 - date2.getDay()))
      const adjustedYear1 = weekEnd1.getFullYear() > year1 ? weekEnd1.getFullYear() : year1
      const adjustedYear2 = weekEnd2.getFullYear() > year2 ? weekEnd2.getFullYear() : year2
      return `${(value as number[])[0] ? translate('weekFormat', adjustedYear1, padZero(week1)) : translate('startWeek')} - ${
        (value as number[])[1] ? translate('weekFormat', adjustedYear2, padZero(week2)) : translate('endWeek')
      }`
    }
    case 'month':
      return dayjs(value as number).format('YYYY / MM')
    case 'monthrange':
      return `${(value as number[])[0] ? dayjs((value as number[])[0]).format('YYYY / MM') : translate('startMonth')} ${translate('to')} ${
        (value as number[])[1] ? dayjs((value as number[])[1]).format('YYYY / MM') : translate('endMonth')
      }`
  }
}

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
const emit = defineEmits(['cancel', 'change', 'update:modelValue', 'confirm', 'open', 'clear'])

const pickerShow = ref<boolean>(false)
const calendarValue = ref<null | number | number[]>(null)
const lastCalendarValue = ref<null | number | number[]>(null)
const panelHeight = ref<number>(338)
const confirmBtnDisabled = ref<boolean>(true)
const currentTab = ref<number>(0)
const lastTab = ref<number>(0)
const currentType = ref<CalendarType>('date')
const lastCurrentType = ref<CalendarType>()
const inited = ref<boolean>(false)
const calendarView = ref()
const calendarTabs = ref()

const rangeLabel = computed(() => {
  const [start, end] = deepClone(isArray(calendarValue.value) ? calendarValue.value : [])
  return [start, end].map((item, index) => {
    return (props.innerDisplayFormat || formatRange)(item, index === 0 ? 'start' : 'end', currentType.value)
  })
})

const showValue = computed(() => {
  if ((!isArray(props.modelValue) && props.modelValue) || (isArray(props.modelValue) && props.modelValue.length)) {
    return (props.displayFormat || defaultDisplayFormat)(props.modelValue, lastCurrentType.value || currentType.value)
  } else {
    return ''
  }
})

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (isEqual(val, oldVal)) return
    calendarValue.value = deepClone(val)
    confirmBtnDisabled.value = getConfirmBtnStatus(val)
  },
  {
    immediate: true
  }
)

watch(
  () => props.type,
  (newValue, oldValue) => {
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

// 是否展示清除按钮
const showClear = computed(() => {
  return props.clearable && !props.disabled && !props.readonly && showValue.value.length > 0
})

// 是否展示箭头
const showArrow = computed(() => {
  return !props.disabled && !props.readonly && !showClear.value
})

function handleClear() {
  emit('clear')
  emit('update:modelValue', null)
}

function scrollIntoView() {
  calendarView.value && calendarView.value && calendarView.value.$.exposed.scrollIntoView()
}
// 对外暴露方法
async function open() {
  const { disabled, readonly } = props

  if (disabled || readonly) return

  inited.value = true
  pickerShow.value = true
  lastCalendarValue.value = deepClone(calendarValue.value)
  lastTab.value = currentTab.value
  lastCurrentType.value = currentType.value
  // 等待渲染完毕
  await pause()
  scrollIntoView()
  setTimeout(() => {
    if (props.showTypeSwitch) {
      calendarTabs.value.scrollIntoView()
      calendarTabs.value.updateLineStyle(false)
    }
  }, 250)
  emit('open')
}
// 对外暴露方法
function close() {
  pickerShow.value = false
  setTimeout(() => {
    calendarValue.value = deepClone(lastCalendarValue.value)
    currentTab.value = lastTab.value
    currentType.value = lastCurrentType.value || 'date'
    confirmBtnDisabled.value = getConfirmBtnStatus(lastCalendarValue.value)
  }, 250)
  emit('cancel')
}
function handleTypeChange({ index }: { index: number }) {
  const tabs = ['date', 'week', 'month']
  const rangeTabs = ['daterange', 'weekrange', 'monthrange']
  const type = props.type.indexOf('range') > -1 ? rangeTabs[index] : tabs[index]
  currentTab.value = index
  currentType.value = type as CalendarType
}
function getConfirmBtnStatus(value: number | number[] | null) {
  let confirmBtnDisabled = false
  // 范围选择未选择满，或者多日期选择未选择日期，按钮置灰不可点击
  if (
    (props.type.indexOf('range') > -1 && (!isArray(value) || !value[0] || !value[1] || !value)) ||
    (props.type === 'dates' && (!isArray(value) || value.length === 0 || !value)) ||
    !value
  ) {
    confirmBtnDisabled = true
  }

  return confirmBtnDisabled
}
function handleChange({ value }: { value: number | number[] | null }) {
  calendarValue.value = deepClone(value)
  confirmBtnDisabled.value = getConfirmBtnStatus(value)

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
  emit('update:modelValue', calendarValue.value)
  emit('confirm', {
    value: calendarValue.value,
    type: currentType.value
  })
}

function handleShortcutClick(index: number) {
  if (props.onShortcutsClick && typeof props.onShortcutsClick === 'function') {
    calendarValue.value = deepClone(
      props.onShortcutsClick({
        item: props.shortcuts[index],
        index
      })
    )
    confirmBtnDisabled.value = getConfirmBtnStatus(calendarValue.value)
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
