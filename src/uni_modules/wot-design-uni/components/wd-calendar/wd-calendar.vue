<template>
  <view :class="`wd-calendar ${cell.border.value ? 'is-border' : ''} ${customClass}`">
    <view class="wd-calendar__field" @click="open">
      <slot v-if="useDefaultSlot"></slot>
      <view
        v-else
        :class="`wd-calendar__cell ${disabled ? 'is-disabled' : ''} ${readonly ? 'is-readonly' : ''} ${alignRight ? 'is-align-right' : ''} ${
          error ? 'is-error' : ''
        } ${size ? 'is-' + size : ''} ${center ? 'is-center' : ''}`"
      >
        <view
          v-if="label || useLabelSlot"
          :class="`wd-calendar__label ${isRequired ? 'is-required' : ''} ${customLabelClass}`"
          :style="labelWidth ? 'min-width:' + labelWidth + ';max-width:' + labelWidth + ';' : ''"
        >
          <block v-if="label">{{ label }}</block>
          <slot v-else name="label"></slot>
        </view>
        <view class="wd-calendar__body">
          <view class="wd-calendar__value-wraper">
            <view
              :class="`wd-calendar__value ${ellipsis ? 'is-ellipsis' : ''} ${customValueClass} ${showValue ? '' : 'wd-calendar__value--placeholder'}`"
            >
              {{ showValue || placeholder || translate('placeholder') }}
            </view>
            <wd-icon v-if="!disabled && !readonly" custom-class="wd-calendar__arrow" name="arrow-right" />
          </view>
          <view v-if="errorMessage" class="wd-calendar__error-message">{{ errorMessage }}</view>
        </view>
      </view>
    </view>
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :close-on-click-modal="closeOnClickModal"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :z-index="zIndex"
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
import { ref, computed, watch } from 'vue'
import { dayjs } from '../common/dayjs'
import { deepClone, isArray, isEqual, padZero, requestAnimationFrame } from '../common/util'
import { getWeekNumber, isRange } from '../wd-calendar-view/utils'
import { useCell } from '../composables/useCell'
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
      const year = new Date(value as number).getFullYear()
      const week = getWeekNumber(value as number)
      return translate('weekFormat', year, padZero(week))
    }
    case 'weekrange': {
      const year1 = new Date((value as number[])[0]).getFullYear()
      const week1 = getWeekNumber((value as number[])[0])
      const year2 = new Date((value as number[])[1]).getFullYear()
      const week2 = getWeekNumber((value as number[])[1])
      return `${(value as number[])[0] ? translate('weekFormat', year1, padZero(week1)) : translate('startWeek')} - ${
        (value as number[])[1] ? translate('weekFormat', year2, padZero(week2)) : translate('endWeek')
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
const emit = defineEmits(['cancel', 'change', 'update:modelValue', 'confirm'])

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
const cell = useCell()
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

const { parent: form } = useParent(FORM_KEY)

// 表单校验错误信息
const errorMessage = computed(() => {
  if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
    return form.errorMessages[props.prop]
  } else {
    return ''
  }
})

// 是否展示必填
const isRequired = computed(() => {
  let formRequired = false
  if (form && form.props.rules) {
    const rules = form.props.rules
    for (const key in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
        formRequired = rules[key].some((rule: FormItemRule) => rule.required)
      }
    }
  }
  return props.required || props.rules.some((rule) => rule.required) || formRequired
})

const range = computed(() => {
  return (type: CalendarType) => {
    return isRange(type)
  }
})

function scrollIntoView() {
  calendarView.value && calendarView.value && calendarView.value.$.exposed.scrollIntoView()
}
// 对外暴露方法
function open() {
  const { disabled, readonly } = props

  if (disabled || readonly) return

  inited.value = true
  pickerShow.value = true
  lastCalendarValue.value = deepClone(calendarValue.value)
  lastTab.value = currentTab.value
  lastCurrentType.value = currentType.value
  requestAnimationFrame(() => {
    scrollIntoView()
  })

  setTimeout(() => {
    if (props.showTypeSwitch) {
      calendarTabs.value.scrollIntoView()
      calendarTabs.value.updateLineStyle(false)
    }
  }, 250)
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
    value: calendarValue.value
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
