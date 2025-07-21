<template>
  <view :class="`wd-datetime-picker ${customClass}`" :style="customStyle">
    <wd-cell
      v-if="!$slots.default"
      :title="label"
      :required="required"
      :size="size"
      :title-width="labelWidth"
      :prop="prop"
      :rules="rules"
      :clickable="!disabled && !readonly"
      :value-align="alignRight ? 'right' : 'left'"
      :custom-class="`wd-datetime-picker__cell ${disabled && 'is-disabled'} ${readonly && 'is-readonly'} ${error && 'is-error'}`"
      :custom-style="customStyle"
      :custom-title-class="customLabelClass"
      :custom-value-class="customValueClass"
      :ellipsis="ellipsis"
      :use-title-slot="!!$slots.label"
      @click="showPopup"
    >
      <template v-if="$slots.label" #title>
        <slot name="label"></slot>
      </template>
      <template #default>
        <template v-if="region">
          <view v-if="isArray(showValue)">
            <text :class="showValue[0] ? '' : 'wd-datetime-picker__placeholder'">
              {{ showValue[0] ? showValue[0] : placeholder || translate('placeholder') }}
            </text>
            {{ translate('to') }}
            <text :class="showValue[1] ? '' : 'wd-datetime-picker__placeholder'">
              {{ showValue[1] ? showValue[1] : placeholder || translate('placeholder') }}
            </text>
          </view>
          <view v-else class="wd-datetime-picker__cell-placeholder">
            {{ placeholder || translate('placeholder') }}
          </view>
        </template>
        <view v-else :class="showValue ? '' : 'wd-datetime-picker__placeholder'">
          {{ showValue ? showValue : placeholder || translate('placeholder') }}
        </view>
      </template>
      <template #right-icon>
        <wd-icon v-if="showArrow" custom-class="wd-datetime-picker__arrow" name="arrow-right" />
        <view v-else-if="showClear" @click.stop="handleClear">
          <wd-icon custom-class="wd-datetime-picker__clear" name="error-fill" />
        </view>
      </template>
    </wd-cell>
    <view v-else @click="showPopup">
      <slot></slot>
    </view>
    <!--弹出层，picker-view 在隐藏时修改值，会触发多次change事件，从而导致所有列选中第一项，因此picker在关闭时不隐藏 -->
    <wd-popup
      v-model="popupShow"
      position="bottom"
      :hide-when-close="false"
      :close-on-click-modal="closeOnClickModal"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :z-index="zIndex"
      :root-portal="rootPortal"
      @close="onCancel"
      custom-class="wd-datetime-picker__popup"
    >
      <view class="wd-datetime-picker__wraper">
        <!--toolBar-->
        <view class="wd-datetime-picker__toolbar" @touchmove="noop">
          <!--取消按钮-->
          <view class="wd-datetime-picker__action wd-datetime-picker__action--cancel" @click="onCancel">
            {{ cancelButtonText || translate('cancel') }}
          </view>
          <!--标题-->
          <view v-if="title" class="wd-datetime-picker__title">{{ title }}</view>
          <!--确定按钮-->
          <view :class="`wd-datetime-picker__action ${loading || isLoading ? 'is-loading' : ''}`" @click="onConfirm">
            {{ confirmButtonText || translate('confirm') }}
          </view>
        </view>
        <!-- 区域选择tab展示 -->
        <view v-if="region" class="wd-datetime-picker__region-tabs">
          <view :class="`wd-datetime-picker__region ${showStart ? 'is-active' : ''} `" @click="tabChange">
            <view>{{ translate('start') }}</view>
            <view class="wd-datetime-picker__region-time">{{ showTabLabel[0] }}</view>
          </view>
          <view :class="`wd-datetime-picker__region ${showStart ? '' : 'is-active'}`" @click="tabChange">
            <view>{{ translate('end') }}</view>
            <view class="wd-datetime-picker__region-time">{{ showTabLabel[1] }}</view>
          </view>
        </view>
        <!--datetimePickerView-->
        <view :class="showStart ? 'wd-datetime-picker__show' : 'wd-datetime-picker__hidden'">
          <wd-datetime-picker-view
            :custom-class="customViewClass"
            ref="datetimePickerView"
            :type="type"
            v-model="innerValue"
            :loading="loading || isLoading"
            :loading-color="loadingColor"
            :columns-height="columnsHeight"
            :value-key="valueKey"
            :label-key="labelKey"
            :formatter="formatter"
            :filter="filter"
            :column-formatter="isArray(modelValue) ? startColumnFormatter : undefined"
            :max-hour="maxHour"
            :min-hour="minHour"
            :max-date="maxDate"
            :min-date="minDate"
            :max-minute="maxMinute"
            :min-minute="minMinute"
            :use-second="useSecond"
            :min-second="minSecond"
            :max-second="maxSecond"
            :immediate-change="immediateChange"
            @change="onChangeStart"
            @pickstart="onPickStart"
            @pickend="onPickEnd"
          />
        </view>
        <view :class="showStart ? 'wd-datetime-picker__hidden' : 'wd-datetime-picker__show'">
          <wd-datetime-picker-view
            :custom-class="customViewClass"
            ref="datetimePickerView1"
            :type="type"
            v-model="endInnerValue"
            :loading="loading || isLoading"
            :loading-color="loadingColor"
            :columns-height="columnsHeight"
            :value-key="valueKey"
            :label-key="labelKey"
            :formatter="formatter"
            :filter="filter"
            :column-formatter="isArray(modelValue) ? endColumnFormatter : undefined"
            :max-hour="maxHour"
            :min-hour="minHour"
            :max-date="maxDate"
            :min-date="minDate"
            :max-minute="maxMinute"
            :min-minute="minMinute"
            :use-second="useSecond"
            :min-second="minSecond"
            :max-second="maxSecond"
            :immediate-change="immediateChange"
            @change="onChangeEnd"
            @pickstart="onPickStart"
            @pickend="onPickEnd"
          />
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-datetime-picker',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdPopup from '../wd-popup/wd-popup.vue'
import wdDatetimePickerView from '../wd-datetime-picker-view/wd-datetime-picker-view.vue'
import wdCell from '../wd-cell/wd-cell.vue'
import { computed, getCurrentInstance, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue'
import { deepClone, isArray, isDef, isEqual, isFunction, padZero } from '../common/util'
import { type DatetimePickerViewInstance, type DatetimePickerViewColumnType, type DatetimePickerViewExpose } from '../wd-datetime-picker-view/types'
import { useTranslate } from '../composables/useTranslate'
import { datetimePickerProps, type DatetimePickerExpose } from './types'
import dayjs from '../../dayjs'
import { getPickerValue } from '../wd-datetime-picker-view/util'

const props = defineProps(datetimePickerProps)
const emit = defineEmits(['change', 'open', 'toggle', 'cancel', 'confirm', 'clear', 'update:modelValue'])

const { translate } = useTranslate('datetime-picker')

const datetimePickerView = ref<DatetimePickerViewInstance>()
const datetimePickerView1 = ref<DatetimePickerViewInstance>()

const showValue = ref<string | Date | Array<string | Date>>('')
const popupShow = ref<boolean>(false)
const showStart = ref<boolean>(true)
const region = ref<boolean>(false)
const showTabLabel = ref<string[]>([])
const innerValue = ref<string | number>('')
const endInnerValue = ref<string | number>('')

const isPicking = ref<boolean>(false) // 判断pickview是否还在滑动中
const hasConfirmed = ref<boolean>(false) // 判断用户是否点击了确认按钮

const isLoading = ref<boolean>(false) // 加载
const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (isEqual(val, oldVal)) return

    if (isArray(val)) {
      region.value = true
      innerValue.value = deepClone(getDefaultInnerValue(true))
      endInnerValue.value = deepClone(getDefaultInnerValue(true, true))
    } else {
      // 每次value更新时都需要刷新整个列表
      innerValue.value = deepClone(getDefaultInnerValue())
    }
    nextTick(() => {
      setShowValue(false, false, true)
    })
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.displayFormat,
  (fn) => {
    if (fn && !isFunction(fn)) {
      console.error('The type of displayFormat must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)
watch(
  () => props.filter,
  (fn) => {
    if (fn && !isFunction(fn)) {
      console.error('The type of filter must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)
watch(
  () => props.formatter,
  (fn) => {
    if (fn && !isFunction(fn)) {
      console.error('The type of formatter must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)
watch(
  () => props.beforeConfirm,
  (fn) => {
    if (fn && !isFunction(fn)) {
      console.error('The type of beforeConfirm must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)
watch(
  () => props.displayFormatTabLabel,
  (fn) => {
    if (fn && !isFunction(fn)) {
      console.error('The type of displayFormatTabLabel must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.defaultValue,
  (val) => {
    if (isArray(val) || region.value) {
      innerValue.value = deepClone(getDefaultInnerValue(true))
      endInnerValue.value = deepClone(getDefaultInnerValue(true, true))
    } else {
      innerValue.value = deepClone(getDefaultInnerValue())
    }
  },
  {
    deep: true,
    immediate: true
  }
)

// 是否展示清除按钮
const showClear = computed(() => {
  return (
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    ((!isArray(showValue.value) && showValue.value) || (isArray(showValue.value) && (showValue.value[0] || showValue.value[1])))
  )
})

// 是否展示箭头
const showArrow = computed(() => {
  return !props.disabled && !props.readonly && !showClear.value
})

/**
 * @description 处理时间边界值判断
 * @param isStart 是否是开始时间
 * @param columnType 当前列类型
 * @param value 当前值
 * @param currentArray 当前完整选择的数组
 * @param boundary 边界值数组
 * @returns 是否超出边界
 */
function handleBoundaryValue(
  isStart: boolean,
  columnType: DatetimePickerViewColumnType,
  value: number,
  currentArray: number[],
  boundary: number[]
): boolean {
  const { type, useSecond } = props
  switch (type) {
    case 'datetime': {
      const [year, month, date, hour, minute, second] = boundary
      if (columnType === 'year') {
        return isStart ? value > year : value < year
      }
      if (columnType === 'month' && currentArray[0] === year) {
        return isStart ? value > month : value < month
      }
      if (columnType === 'date' && currentArray[0] === year && currentArray[1] === month) {
        return isStart ? value > date : value < date
      }
      if (columnType === 'hour' && currentArray[0] === year && currentArray[1] === month && currentArray[2] === date) {
        return isStart ? value > hour : value < hour
      }
      if (columnType === 'minute' && currentArray[0] === year && currentArray[1] === month && currentArray[2] === date && currentArray[3] === hour) {
        return isStart ? value > minute : value < minute
      }
      if (
        useSecond &&
        columnType === 'second' &&
        currentArray[0] === year &&
        currentArray[1] === month &&
        currentArray[2] === date &&
        currentArray[3] === hour &&
        currentArray[4] === minute
      ) {
        return isStart ? value > second : value < second
      }
      break
    }
    case 'year-month': {
      const [year, month] = boundary
      if (columnType === 'year') {
        return isStart ? value > year : value < year
      }
      if (columnType === 'month' && currentArray[0] === year) {
        return isStart ? value > month : value < month
      }
      break
    }
    case 'year': {
      const [year] = boundary
      if (columnType === 'year') {
        return isStart ? value > year : value < year
      }
      break
    }
    case 'date': {
      const [year, month, date] = boundary
      if (columnType === 'year') {
        return isStart ? value > year : value < year
      }
      if (columnType === 'month' && currentArray[0] === year) {
        return isStart ? value > month : value < month
      }
      if (columnType === 'date' && currentArray[0] === year && currentArray[1] === month) {
        return isStart ? value > date : value < date
      }
      break
    }
    case 'time': {
      const [hour, minute, second] = boundary
      if (columnType === 'hour') {
        return isStart ? value > hour : value < hour
      }
      if (columnType === 'minute' && currentArray[0] === hour) {
        return isStart ? value > minute : value < minute
      }
      if (useSecond && columnType === 'second' && currentArray[0] === hour && currentArray[1] === minute) {
        return isStart ? value > second : value < second
      }
      break
    }
  }
  return false
}

function startColumnFormatter(picker: DatetimePickerViewExpose) {
  return customColumnFormatter(picker, 'start')
}

function endColumnFormatter(picker: DatetimePickerViewExpose) {
  return customColumnFormatter(picker, 'end')
}

/**
 * @description 自定义列项筛选规则
 */
const customColumnFormatter = (picker: DatetimePickerViewExpose, pickerType: 'start' | 'end') => {
  if (!picker) return []

  const { type } = props
  const startSymbol = pickerType === 'start'
  const { formatter } = props
  const start = picker.correctValue(innerValue.value)
  const end = picker.correctValue(endInnerValue.value)
  const currentValue = startSymbol ? getPickerValue(start, type, props.useSecond) : getPickerValue(end, type, props.useSecond)
  const boundary = startSymbol ? getPickerValue(end, type, props.useSecond) : getPickerValue(start, type, props.useSecond)
  const columns = picker.getOriginColumns()
  return columns.map((column, _) => {
    return column.values.map((value) => {
      const disabled = handleBoundaryValue(startSymbol, column.type, value, currentValue, boundary)
      return {
        label: formatter ? formatter(column.type, padZero(value)) : padZero(value),
        value,
        disabled
      }
    })
  })
}

onBeforeMount(() => {
  const { modelValue: value } = props
  if (isArray(value)) {
    region.value = true
    innerValue.value = deepClone(getDefaultInnerValue(true))
    endInnerValue.value = deepClone(getDefaultInnerValue(true, true))
  } else {
    innerValue.value = deepClone(getDefaultInnerValue())
  }
})

onMounted(() => {
  setShowValue(false, false, true)
})

/**
 * @description 根据传入的picker，picker组件获取当前cell展示值。
 */
function getSelects(picker: 'before' | 'after') {
  let value = picker === 'before' ? innerValue.value : endInnerValue.value
  let selected: number[] = []
  if (value) {
    selected = getPickerValue(value, props.type, props.useSecond)
  }

  let selects = selected.map((value) => {
    return {
      [props.labelKey]: padZero(value),
      [props.valueKey]: value
    }
  })
  return selects
}

function noop() {}

function getDefaultInnerValue(isRegion?: boolean, isEnd?: boolean): string | number {
  const { modelValue: value, defaultValue, maxDate, minDate, type } = props
  if (isRegion) {
    const index = isEnd ? 1 : 0
    const targetValue = isArray(value) ? (value[index] as string) : ''
    const targetDefault = isArray(defaultValue) ? (defaultValue[index] as string) : ''
    const maxValue = type === 'time' ? dayjs(maxDate).format('HH:mm') : maxDate
    const minValue = type === 'time' ? dayjs(minDate).format('HH:mm') : minDate
    return targetValue || targetDefault || (isEnd ? maxValue : minValue)
  } else {
    return isDef(value || defaultValue) ? (value as string) || (defaultValue as string) : ''
  }
}

// 对外暴露接口，打开弹框
function open() {
  showPopup()
}

// 对外暴露接口，关闭弹框
function close() {
  onCancel()
}

function showPopup() {
  if (props.disabled || props.readonly) return

  emit('open')
  if (region.value) {
    popupShow.value = true
    showStart.value = true
    innerValue.value = deepClone(getDefaultInnerValue(true, false))
    endInnerValue.value = deepClone(getDefaultInnerValue(true, true))
  } else {
    popupShow.value = true
    innerValue.value = deepClone(getDefaultInnerValue())
  }
  setShowValue(true, false, true)
}

/**
 * @description 区域选择时tab标签切换时触发
 */
function tabChange() {
  showStart.value = !showStart.value
  // 列项刷新多级联动挂载到datetimepickerView
  const picker = showStart.value ? datetimePickerView.value : datetimePickerView1.value
  picker!.setColumns(picker!.updateColumns())

  emit('toggle', showStart.value ? innerValue.value : endInnerValue.value)
}

/**
 * @description datetimePickerView change 事件
 */
function onChangeStart({ value }: { value: number | string }) {
  if (!datetimePickerView.value) return
  if (region.value && !datetimePickerView1.value) return

  if (region.value) {
    // 区间选择才需要处理边界值
    // 区间选择才需要处理边界值
    const currentArray = getPickerValue(value, props.type, props.useSecond)
    const boundaryArray = getPickerValue(endInnerValue.value, props.type, props.useSecond)

    const columns = datetimePickerView.value.getOriginColumns()

    // 检查是否有任何列超出边界
    const needsAdjust = columns.some((column, index) => {
      return handleBoundaryValue(true, column.type, currentArray[index], currentArray, boundaryArray)
    })

    innerValue.value = deepClone(needsAdjust ? endInnerValue.value : value)

    nextTick(() => {
      showTabLabel.value = [setTabLabel(), deepClone(showTabLabel.value[1])]
      emit('change', {
        value: [innerValue.value, endInnerValue.value]
      })
      // 更新两个picker的列
      datetimePickerView.value && datetimePickerView.value.setColumns(datetimePickerView.value.updateColumns())
      datetimePickerView1.value && datetimePickerView1.value.setColumns(datetimePickerView1.value.updateColumns())
    })
  } else {
    // 非区间选择直接设置值即可
    innerValue.value = deepClone(value)
    emit('change', {
      value: innerValue.value
    })
  }
}

/**
 * @description 区域选择 下方 datetimePickerView change 事件
 */
function onChangeEnd({ value }: { value: number | string }) {
  if (!datetimePickerView.value || !datetimePickerView1.value) return

  const currentArray = getPickerValue(value, props.type)
  const boundaryArray = getPickerValue(innerValue.value, props.type)
  const columns = datetimePickerView1.value.getOriginColumns()

  // 检查是否有任何列超出边界
  const needsAdjust = columns.some((column, index) => {
    return handleBoundaryValue(false, column.type, currentArray[index], currentArray, boundaryArray)
  })

  endInnerValue.value = deepClone(needsAdjust ? innerValue.value : value)

  nextTick(() => {
    showTabLabel.value = [deepClone(showTabLabel.value[0]), setTabLabel(1)]
    emit('change', {
      value: [innerValue.value, endInnerValue.value]
    })
    // 更新两个picker的列
    datetimePickerView.value && datetimePickerView.value.setColumns(datetimePickerView.value.updateColumns())
    datetimePickerView1.value && datetimePickerView1.value.setColumns(datetimePickerView1.value.updateColumns())
  })
}

/**
 * @description 点击取消按钮触发。关闭popup，触发cancel事件。
 */
function onCancel() {
  popupShow.value = false
  setTimeout(() => {
    if (region.value) {
      innerValue.value = deepClone(getDefaultInnerValue(true))
      endInnerValue.value = deepClone(getDefaultInnerValue(true, true))
    } else {
      innerValue.value = deepClone(getDefaultInnerValue())
    }
  }, 200)

  emit('cancel')
}

/** picker触发confirm事件，同步触发confirm事件 */
function onConfirm() {
  if (props.loading || isLoading.value) return

  // 如果当前还在滑动且未停止下来，则锁住先不确认，等滑完再自动确认，避免pickview值未更新
  if (isPicking.value) {
    hasConfirmed.value = true
    return
  }

  const { beforeConfirm } = props
  if (beforeConfirm) {
    beforeConfirm(
      region.value ? [innerValue.value, endInnerValue.value] : innerValue.value,
      (isPass: boolean) => {
        isPass && handleConfirm()
      },
      proxy.$.exposed
    )
  } else {
    handleConfirm()
  }
}

function onPickStart() {
  isPicking.value = true
}

function onPickEnd() {
  isPicking.value = false

  // 延迟一会，因为组件层级嵌套过多，日期的计算时间也较长
  setTimeout(() => {
    if (hasConfirmed.value) {
      hasConfirmed.value = false
      onConfirm()
    }
  }, 50)
}

function handleConfirm() {
  if (props.loading || isLoading.value || props.disabled) {
    popupShow.value = false
    return
  }
  const value = region.value ? [innerValue.value, endInnerValue.value] : innerValue.value
  popupShow.value = false
  emit('update:modelValue', value)
  emit('confirm', {
    value
  })
  setShowValue(false, true)
}

/**
 * @description 设置区域选择 tab 标签展示值
 * @param {Number} index 索引标志位，有三个有效值; 0(默认):上方picker索引; 1:下方picker索引;
 * @return {String} showTabLabel
 */
function setTabLabel(index: number = 0) {
  if (region.value) {
    let items: Record<string, any>[] = []
    if (index === 0) {
      items = ((datetimePickerView.value ? datetimePickerView.value!.getSelects() : undefined) ||
        (innerValue.value && getSelects('before'))) as Record<string, any>[]
    } else {
      items = ((datetimePickerView1.value ? datetimePickerView1.value!.getSelects() : undefined) ||
        (endInnerValue.value && getSelects('after'))) as Record<string, any>[]
    }
    return defaultDisplayFormat(items, true)
  } else {
    return ''
  }
}

/**
 * @description 设置展示值
 * @param {Boolean} tab 是否修改tab展示值（尽在区域选择情况下生效）
 * @param {Boolean} isConfirm 是否提交当前修改
 */
function setShowValue(tab: boolean = false, isConfirm: boolean = false, beforeMount: boolean = false) {
  if (region.value) {
    const items = beforeMount
      ? (innerValue.value && getSelects('before')) || []
      : (datetimePickerView.value && datetimePickerView.value.getSelects && datetimePickerView.value.getSelects()) || []

    const endItems = beforeMount
      ? (endInnerValue.value && getSelects('after')) || []
      : (datetimePickerView1.value && datetimePickerView1.value.getSelects && datetimePickerView1.value.getSelects()) || []

    showValue.value = tab
      ? showValue.value
      : [
          (props.modelValue as (string | number)[])[0] || isConfirm ? defaultDisplayFormat(items as Record<string, any>[]) : '',
          (props.modelValue as (string | number)[])[1] || isConfirm ? defaultDisplayFormat(endItems as Record<string, any>[]) : ''
        ]
    showTabLabel.value = [defaultDisplayFormat(items as Record<string, any>[], true), defaultDisplayFormat(endItems as Record<string, any>[], true)]
  } else {
    const items = beforeMount
      ? (innerValue.value && getSelects('before')) || []
      : (datetimePickerView.value && datetimePickerView.value.getSelects && datetimePickerView.value.getSelects()) || []

    showValue.value = deepClone(props.modelValue || isConfirm ? defaultDisplayFormat(items as Record<string, any>[]) : '')
  }
}

/**
 * @description 设置展示值
 * @param {Object} items 获取到的选中项 包含 { value, label }
 * @param {Boolean} tabLabel 当前返回的是否是展示tab上的标签
 * @return {String} showValue / showTabLabel
 */
function defaultDisplayFormat(items: Record<string, any>[], tabLabel: boolean = false) {
  if (items.length === 0) return ''

  if (tabLabel && props.displayFormatTabLabel) {
    return props.displayFormatTabLabel(items)
  }

  if (props.displayFormat) {
    return props.displayFormat(items)
  }

  // 如果使用了自定义的的formatter，defaultDisplayFormat无效
  if (props.formatter) {
    const typeMaps = {
      year: ['year'],
      datetime: props.useSecond ? ['year', 'month', 'date', 'hour', 'minute', 'second'] : ['year', 'month', 'date', 'hour', 'minute'],
      date: ['year', 'month', 'date'],
      time: props.useSecond ? ['hour', 'minute', 'second'] : ['hour', 'minute'],
      'year-month': ['year', 'month']
    }

    return items
      .map((item, index) => {
        return props.formatter!(typeMaps[props.type][index], item.value)
      })
      .join('')
  }

  switch (props.type) {
    case 'year':
      return items[0].label
    case 'date':
      return `${items[0].label}-${items[1].label}-${items[2].label}`
    case 'year-month':
      return `${items[0].label}-${items[1].label}`
    case 'time':
      return props.useSecond ? `${items[0].label}:${items[1].label}:${items[2].label}` : `${items[0].label}:${items[1].label}`
    case 'datetime':
      return props.useSecond
        ? `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}:${items[5].label}`
        : `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}`
  }
}

function setLoading(loading: boolean) {
  isLoading.value = loading
}

function handleClear() {
  emit('clear')
  emit('update:modelValue', '')
  setShowValue(false, true)
}

defineExpose<DatetimePickerExpose>({
  open,
  close,
  setLoading
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
