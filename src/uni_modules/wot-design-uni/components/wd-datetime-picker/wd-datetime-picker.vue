<template>
  <view
    :class="`wd-picker ${disabled ? 'is-disabled' : ''} ${size ? 'is-' + size : ''}  ${cell.border.value ? 'is-border' : ''} ${
      alignRight ? 'is-align-right' : ''
    } ${error ? 'is-error' : ''} ${customClass}`"
    :style="customStyle"
  >
    <!--文案-->
    <view class="wd-picker__field" @click="showPopup">
      <slot v-if="useDefaultSlot"></slot>
      <view v-else :class="['wd-picker__cell', customCellClass]">
        <view
          v-if="label || useLabelSlot"
          :class="`wd-picker__label ${customLabelClass} ${isRequired ? 'is-required' : ''}`"
          :style="labelWidth ? 'min-width:' + labelWidth + ';max-width:' + labelWidth + ';' : ''"
        >
          <block v-if="label">{{ label }}</block>
          <slot v-else name="label"></slot>
        </view>
        <view class="wd-picker__body">
          <view class="wd-picker__value-wraper">
            <view :class="`wd-picker__value ${customValueClass}`">
              <template v-if="region">
                <view v-if="isArray(showValue)">
                  <text :class="showValue[0] ? '' : 'wd-picker__placeholder'">
                    {{ showValue[0] ? showValue[0] : placeholder || translate('placeholder') }}
                  </text>
                  {{ translate('to') }}
                  <text :class="showValue[1] ? '' : 'wd-picker__placeholder'">
                    {{ showValue[1] ? showValue[1] : placeholder || translate('placeholder') }}
                  </text>
                </view>
                <view v-else class="wd-picker__placeholder">
                  {{ placeholder || translate('placeholder') }}
                </view>
              </template>
              <view v-else :class="showValue ? '' : 'wd-picker__placeholder'">
                {{ showValue ? showValue : placeholder || translate('placeholder') }}
              </view>
            </view>
            <wd-icon v-if="!disabled && !readonly" custom-class="wd-picker__arrow" name="arrow-right" />
          </view>
          <view v-if="errorMessage" class="wd-picker__error-message">{{ errorMessage }}</view>
        </view>
      </view>
    </view>
    <!--弹出层，picker-view 在隐藏时修改值，会触发多次change事件，从而导致所有列选中第一项，因此picker在关闭时不隐藏 -->
    <wd-popup
      v-model="popupShow"
      position="bottom"
      :hide-when-close="false"
      :close-on-click-modal="closeOnClickModal"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :z-index="zIndex"
      @close="onCancel"
      custom-class="wd-picker__popup"
    >
      <view class="wd-picker__wraper">
        <!--toolBar-->
        <view class="wd-picker__toolbar" @touchmove="noop">
          <!--取消按钮-->
          <view class="wd-picker__action wd-picker__action--cancel" @click="onCancel">
            {{ cancelButtonText || translate('cancel') }}
          </view>
          <!--标题-->
          <view v-if="title" class="wd-picker__title">{{ title }}</view>
          <!--确定按钮-->
          <view :class="`wd-picker__action ${loading || isLoading ? 'is-loading' : ''}`" @click="onConfirm">
            {{ confirmButtonText || translate('confirm') }}
          </view>
        </view>
        <!-- 区域选择tab展示 -->
        <view v-if="region" class="wd-picker__region-tabs">
          <view :class="`wd-picker__region ${showStart ? 'is-active' : ''} `" @click="tabChange">
            <view>{{ translate('start') }}</view>
            <view class="wd-picker__region-time">{{ showTabLabel[0] }}</view>
          </view>
          <view :class="`wd-picker__region ${showStart ? '' : 'is-active'}`" @click="tabChange">
            <view>{{ translate('end') }}</view>
            <view class="wd-picker__region-time">{{ showTabLabel[1] }}</view>
          </view>
        </view>
        <!--datetimePickerView-->
        <view :class="showStart ? 'wd-picker__show' : 'wd-picker__hidden'">
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
            :column-formatter="isArray(modelValue) ? customColumnFormatter : undefined"
            :max-hour="maxHour"
            :min-hour="minHour"
            :max-date="maxDate"
            :min-date="minDate"
            :max-minute="maxMinute"
            :min-minute="minMinute"
            :start-symbol="true"
            :immediate-change="immediateChange"
            @change="onChangeStart"
            @pickstart="onPickStart"
            @pickend="onPickEnd"
          />
        </view>
        <view :class="showStart ? 'wd-picker__hidden' : 'wd-picker__show'">
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
            :column-formatter="isArray(modelValue) ? customColumnFormatter : undefined"
            :max-hour="maxHour"
            :min-hour="minHour"
            :max-date="maxDate"
            :min-date="minDate"
            :max-minute="maxMinute"
            :min-minute="minMinute"
            :start-symbol="false"
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
import { computed, getCurrentInstance, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue'
import { deepClone, isArray, isDef, isEqual, isFunction, padZero } from '../common/util'
import { useCell } from '../composables/useCell'
import {
  getPickerValue,
  type DatetimePickerViewInstance,
  type DatetimePickerViewColumnFormatter,
  type DatetimePickerViewColumnType
} from '../wd-datetime-picker-view/types'
import { FORM_KEY, type FormItemRule } from '../wd-form/types'
import { useParent } from '../composables/useParent'
import { useTranslate } from '../composables/useTranslate'
import { datetimePickerProps, type DatetimePickerExpose } from './types'

const props = defineProps(datetimePickerProps)
const emit = defineEmits(['change', 'open', 'toggle', 'cancel', 'confirm', 'update:modelValue'])

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

const cell = useCell()

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

/**
 * @description 自定义列项筛选规则，对每列单项进行禁用校验，最终返回传入PickerView的columns数组
 * @param {Component} picker datetimePickerView对象
 * @return {Array} columns
 */
const customColumnFormatter: DatetimePickerViewColumnFormatter = (picker) => {
  if (!picker) {
    return []
  }
  const { type } = props
  const { startSymbol, formatter } = picker
  // 校准上下方picker的value值，与内部innerValue对应
  const start = picker.correctValue(innerValue.value)
  const end = picker.correctValue(endInnerValue.value)

  /**
   * 如果是上方picekr 那么将下方picker的值作为下边界
   * 如果是下方picekr 那么将上方picker的值作为上边界
   */
  const currentValue = startSymbol ? picker.getPickerValue(start, type) : picker.getPickerValue(end, type)
  const boundary = startSymbol ? picker.getPickerValue(end, type) : picker.getPickerValue(start, type)
  // 获取当前picekr中的源列数组
  const columns = picker.getOriginColumns()

  // 此时index是最外层知道当前的索引即可得到当前是哪个时间段
  return columns.map((column, cIndex) => {
    return column.values.map((value) => {
      const disabled = columnDisabledRules(startSymbol, columns, cIndex, value, currentValue, boundary)
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
    selected = getPickerValue(value, props.type)
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
  const { modelValue: value, defaultValue } = props

  if (isRegion) {
    if (isEnd) {
      return (
        (isArray(value) ? (value[1] as string) : '') || (defaultValue && isArray(defaultValue) ? (defaultValue[1] as string) : '') || props.maxDate
      )
    } else {
      return (
        (isArray(value) ? (value[0] as string) : '') || (defaultValue && isArray(defaultValue) ? (defaultValue[0] as string) : '') || props.minDate
      )
    }
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

/**
 * @description 展示popup，小程序有个bug，在picker-view弹出时设置value，会触发change事件，而且会将picker-view的value多次触发change重置为第一项
 */
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
  innerValue.value = deepClone(value)
  if (region.value) {
    showTabLabel.value = [setTabLabel(), deepClone(showTabLabel.value[1])]
    emit('change', {
      value: [value, endInnerValue.value]
    })
    datetimePickerView.value && datetimePickerView.value.setColumns(datetimePickerView.value.updateColumns())
    datetimePickerView1.value && datetimePickerView1.value.setColumns(datetimePickerView1.value.updateColumns())
  } else {
    emit('change', {
      value: innerValue.value
    })
  }
}

/**
 * @description 区域选择 下方 datetimePickerView change 事件
 */
function onChangeEnd({ value }: { value: number | string }) {
  endInnerValue.value = deepClone(value)
  showTabLabel.value = [deepClone(showTabLabel.value[0]), setTabLabel(1)]
  emit('change', {
    value: [innerValue.value, value]
  })
  datetimePickerView.value && datetimePickerView.value.setColumns(datetimePickerView.value.updateColumns())
  datetimePickerView1.value && datetimePickerView1.value.setColumns(datetimePickerView1.value.updateColumns())
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
    /**
     * 不建议使用 this.picker.picker.getLabels() 拉取
     * 在初始展示时，需要使用模拟 nextTick 来等待内部 pickerView 渲染后labels才可得到format后的labels
     * 但使用模拟nextTick会造成页面延迟展示问题，对用户感知来讲不友好，因此不适用该方法
     */
    const typeMaps = {
      year: ['year'],
      datetime: ['year', 'month', 'date', 'hour', 'minute'],
      date: ['year', 'month', 'date'],
      time: ['hour', 'minute'],
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
      return `${items[0].label}:${items[1].label}`
    case 'datetime':
      return `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}`
  }
}

/**
 * @description 区域选择time禁用规则，根据传入的位置标志以及日期类型 返回该节点是否禁用
 * @param {Boolean} isStart 时间段类型 true：start | false：end
 * @param {Array} column 当前遍历到的列数组
 * @param {Number} cindex 外层column的索引（对应每一个类型）
 * @param {Number / String} value 遍历到的当前值
 * @param {Array} currentValue 当前选中的值 this.pickerValue
 * @param {Array} boundary 当前变量的限制值，决定禁用的边界值
 * @return {Boolean} disabled
 */
function columnDisabledRules(
  isStart: boolean,
  columns: {
    type: DatetimePickerViewColumnType
    values: number[]
  }[],
  cIndex: number,
  value: number,
  currentValue: number[],
  boundary: number[]
) {
  const { type } = props
  // 0年 1月 2日 3時 4分
  // startPicker 除最小值外 还需要有一个时间限制, endPicker 时间选择后, startPicker 的 添加一个时间限制boundary min->boundary
  // endPicker 除最小值外 还需要有一个时间限制, startPicker 时间选择后, endPicker 的 添加一个时间限制boundary boundary->max
  const column = columns[cIndex]
  // 根据当前选择年确认 ranges[0][0] minYear ranges[0][1] maxYear 以此类推
  if (type === 'datetime') {
    const year = boundary[0]
    const month = boundary[1]
    const date = boundary[2]
    const hour = boundary[3]
    const minute = boundary[4]

    if (column.type === 'year') {
      return isStart ? value > year : value < year
    }
    if (column.type === 'month' && currentValue[0] === year) {
      return isStart ? value > month : value < month
    }
    if (column.type === 'date' && currentValue[0] === year && currentValue[1] === month) {
      return isStart ? value > date : value < date
    }
    if (column.type === 'hour' && currentValue[0] === year && currentValue[1] === month && currentValue[2] === date) {
      return isStart ? value > hour : value < hour
    }
    if (column.type === 'minute' && currentValue[0] === year && currentValue[1] === month && currentValue[2] === date && currentValue[3] === hour) {
      return isStart ? value > minute : value < minute
    }
  } else if (type === 'year-month') {
    const year = boundary[0]
    const month = boundary[1]

    if (column.type === 'year') {
      return isStart ? value > year : value < year
    }
    if (column.type === 'month' && currentValue[0] === year) {
      return isStart ? value > month : value < month
    }
  } else if (type === 'year') {
    const year = boundary[0]

    if (column.type === 'year') {
      return isStart ? value > year : value < year
    }
  } else if (type === 'date') {
    const year = boundary[0]
    const month = boundary[1]
    const date = boundary[2]

    if (column.type === 'year') {
      return isStart ? value > year : value < year
    }
    if (column.type === 'month' && currentValue[0] === year) {
      return isStart ? value > month : value < month
    }
    if (column.type === 'date' && currentValue[0] === year && currentValue[1] === month) {
      return isStart ? value > date : value < date
    }
  } else if (type === 'time') {
    const hour = boundary[0]
    const minute = boundary[1]

    if (column.type === 'hour') {
      return isStart ? value > hour : value < hour
    }
    if (column.type === 'minute' && currentValue[0] === hour) {
      return isStart ? value > minute : value < minute
    }
  }

  return false
}

function setLoading(loading: boolean) {
  isLoading.value = loading
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
