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
          <view :class="`wd-calendar__range-label-item ${!calendarValue || !calendarValue[0] ? 'is-placeholder' : ''}`" style="text-align: right">
            {{ rangeLabel[0] }}
          </view>
          <view class="wd-calendar__range-sperator">/</view>
          <view :class="`wd-calendar__range-label-item ${!calendarValue || !calendarValue[1] ? 'is-placeholder' : ''}`">
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
import { deepClone, isArray, isEqual, padZero } from '../common/util'
import { getWeekNumber, isRange } from '../wd-calendar-view/utils'
import { useCell } from '../composables/useCell'
import { FORM_KEY, type FormItemRule } from '../wd-form/types'
import { useParent } from '../composables/useParent'
import { useTranslate } from '../composables/useTranslate'
const { translate } = useTranslate('calendar')

const defaultDisplayFormat = (value, type) => {
  switch (type) {
    case 'date':
      return dayjs(value).format('YYYY-MM-DD')
    case 'dates':
      return value
        .map((item) => {
          return dayjs(item).format('YYYY-MM-DD')
        })
        .join(', ')
    case 'daterange':
      return `${value[0] ? dayjs(value[0]).format('YYYY-MM-DD') : translate('startTime')} ${translate('to')} ${
        value[1] ? dayjs(value[1]).format('YYYY-MM-DD') : translate('endTime')
      }`
    case 'datetime':
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    case 'datetimerange':
      return `${value[0] ? dayjs(value[0]).format(translate('timeFormat')) : translate('startTime')} ${translate('to')}\n${
        value[1] ? dayjs(value[1]).format(translate('timeFormat')) : translate('endTime')
      }`
    case 'week': {
      const year = new Date(value).getFullYear()
      const week = getWeekNumber(value)
      return translate('weekFormat', year, padZero(week))
    }
    case 'weekrange': {
      const year1 = new Date(value[0]).getFullYear()
      const week1 = getWeekNumber(value[0])
      const year2 = new Date(value[1]).getFullYear()
      const week2 = getWeekNumber(value[1])
      return `${value[0] ? translate('weekFormat', year1, padZero(week1)) : translate('startWeek')} - ${
        value[1] ? translate('weekFormat', year2, padZero(week2)) : translate('endWeek')
      }`
    }
    case 'month':
      return dayjs(value).format('YYYY / MM')
    case 'monthrange':
      return `${value[0] ? dayjs(value[0]).format('YYYY / MM') : translate('startMonth')} ${translate('to')} ${
        value[1] ? dayjs(value[1]).format('YYYY / MM') : translate('endMonth')
      }`
  }
}

const formatRange = (value, rangeType, type) => {
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

type CalendarType = 'date' | 'dates' | 'datetime' | 'week' | 'month' | 'daterange' | 'datetimerange' | 'weekrange' | 'monthrange'

interface Props {
  customClass?: string
  customViewClass?: string
  customLabelClass?: string
  customValueClass?: string
  modelValue: null | number | Array<number>
  type?: CalendarType
  minDate?: number
  maxDate?: number
  firstDayOfWeek?: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter?: Function
  maxRange?: number
  rangePrompt?: string
  allowSameDay?: boolean
  defaultTime?: string | Array<string>
  // eslint-disable-next-line @typescript-eslint/ban-types
  timeFilter?: Function
  hideSecond?: boolean
  label?: string
  labelWidth?: string
  useLabelSlot?: boolean
  useDefaultSlot?: boolean
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  title?: string
  alignRight?: boolean
  error?: boolean
  required?: boolean
  size?: string
  center?: boolean
  closeOnClickModal?: boolean
  zIndex?: number
  showConfirm?: boolean
  confirmText?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  displayFormat?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  innerDisplayFormat?: Function
  ellipsis?: boolean
  showTypeSwitch?: boolean
  shortcuts?: Array<Record<string, any>>
  // eslint-disable-next-line @typescript-eslint/ban-types
  onShortcutsClick?: Function
  safeAreaInsetBottom?: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeConfirm?: Function
  prop?: string
  rules?: FormItemRule[]
}
const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customViewClass: '',
  customLabelClass: '',
  customValueClass: '',
  type: 'date',
  minDate: new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()).getTime(),
  maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate(), 23, 59, 59).getTime(),
  firstDayOfWeek: 0,
  allowSameDay: false,
  hideSecond: false,
  useLabelSlot: false,
  useDefaultSlot: false,
  disabled: false,
  readonly: false,
  alignRight: false,
  error: false,
  required: false,
  center: false,
  closeOnClickModal: true,
  zIndex: 15,
  showConfirm: true,
  ellipsis: false,
  showTypeSwitch: false,
  shortcuts: () => [],
  safeAreaInsetBottom: true,
  rules: () => []
})

const pickerShow = ref<boolean>(false)
const calendarValue = ref<null | number | number[]>(null)
const lastCalendarValue = ref<null | number | number[]>(null)
const panelHeight = ref<number>(338)
const confirmBtnDisabled = ref<boolean>(true)
const showValue = ref<string>('')
const currentTab = ref<number>(0)
const lastTab = ref<number>(0)
const currentType = ref<CalendarType>('date')
const lastCurrentType = ref<CalendarType>('date')
const inited = ref<boolean>(false)
const rangeLabel = ref<Array<string>>([])

const cell = useCell()

const calendarView = ref()
const calendarTabs = ref()

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (isEqual(val, oldVal)) return
    calendarValue.value = deepClone(val)
    confirmBtnDisabled.value = getConfirmBtnStatus(val)
    setShowValue()

    if (props.type.indexOf('range') > -1) {
      setInnerLabel()
    }
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

    setShowValue()

    if (props.type.indexOf('range') > -1) {
      setInnerLabel()
    }
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
  return (type) => {
    return isRange(type)
  }
})

const emit = defineEmits(['cancel', 'change', 'update:modelValue', 'confirm'])

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
  scrollIntoView()

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
  scrollIntoView()
  setTimeout(() => {
    calendarValue.value = deepClone(lastCalendarValue.value)
    currentTab.value = lastTab.value
    currentType.value = lastCurrentType.value
    confirmBtnDisabled.value = getConfirmBtnStatus(lastCalendarValue.value)
  }, 250)
  emit('cancel')
}
function handleTypeChange({ index }) {
  const tabs = ['date', 'week', 'month']
  const rangeTabs = ['daterange', 'weekrange', 'monthrange']
  const type = props.type.indexOf('range') > -1 ? rangeTabs[index] : tabs[index]

  currentTab.value = index
  currentType.value = type as CalendarType
}
function getConfirmBtnStatus(value) {
  let confirmBtnDisabled = false
  // 范围选择未选择满，或者多日期选择未选择日期，按钮置灰不可点击
  if (
    (props.type.indexOf('range') > -1 && (!value[0] || !value[1] || !value)) ||
    (props.type === 'dates' && (value.length === 0 || !value)) ||
    !value
  ) {
    confirmBtnDisabled = true
  }

  return confirmBtnDisabled
}
function handleChange({ value }) {
  calendarValue.value = deepClone(value)
  confirmBtnDisabled.value = getConfirmBtnStatus(value)

  emit('change', {
    value
  })

  if (props.type.indexOf('range') > -1) {
    setInnerLabel()
  }

  if (!props.showConfirm && !confirmBtnDisabled.value) {
    handleConfirm()
  }
}
function handleConfirm() {
  if (props.beforeConfirm) {
    props.beforeConfirm({
      value: calendarValue.value,
      resolve: (isPass) => {
        isPass && onConfirm()
      }
    })
  } else {
    onConfirm()
  }
}
function onConfirm() {
  pickerShow.value = false
  emit('update:modelValue', calendarValue.value)
  emit('confirm', {
    value: calendarValue.value
  })
  setShowValue()
}
function setInnerLabel() {
  const [start, end] = deepClone(isArray(calendarValue.value) ? calendarValue.value : [])
  rangeLabel.value = [start, end].map((item, index) => {
    return (props.innerDisplayFormat || formatRange)(item, index === 0 ? 'start' : 'end', currentType.value)
  })
}
function setShowValue() {
  if ((!(calendarValue.value instanceof Array) && calendarValue.value) || (calendarValue.value instanceof Array && calendarValue.value.length)) {
    showValue.value = (props.displayFormat || defaultDisplayFormat)(calendarValue.value, currentType.value)
  } else {
    showValue.value = ''
  }
}
function handleShortcutClick(index) {
  if (props.onShortcutsClick && typeof props.onShortcutsClick === 'function') {
    calendarValue.value = deepClone(
      props.onShortcutsClick({
        item: props.shortcuts[index],
        index
      })
    )
    confirmBtnDisabled.value = getConfirmBtnStatus(calendarValue.value)

    if (props.type.indexOf('range') > -1) {
      setInnerLabel()
    }
  }

  if (!props.showConfirm) {
    handleConfirm()
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
