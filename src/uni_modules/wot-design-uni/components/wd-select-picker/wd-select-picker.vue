<template>
  <view :class="`wd-select-picker ${customClass}`" :style="customStyle">
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
      :custom-class="`wd-select-picker__cell ${disabled && 'is-disabled'} ${readonly && 'is-readonly'} ${error && 'is-error'} ${
        showValue ? '' : 'wd-select-picker__cell--placeholder'
      }`"
      :custom-style="customStyle"
      :custom-title-class="customLabelClass"
      :custom-value-class="customValueClass"
      :ellipsis="ellipsis"
      :use-title-slot="!!$slots.label"
      @click="open"
    >
      <template v-if="$slots.label" #title>
        <slot name="label"></slot>
      </template>
      <template #right-icon>
        <wd-icon v-if="showArrow" custom-class="wd-select-picker__arrow" name="arrow-right" />
        <view v-else-if="showClear" @click.stop="handleClear">
          <wd-icon custom-class="wd-select-picker__clear" name="error-fill" />
        </view>
      </template>
    </wd-cell>
    <view v-else @click="open">
      <slot></slot>
    </view>
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :title="title || translate('title')"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :root-portal="rootPortal"
      @close="close"
      @opened="scrollIntoView ? setScrollIntoView() : ''"
      custom-header-class="wd-select-picker__header"
    >
      <wd-search
        v-if="filterable"
        v-model="filterVal"
        :placeholder="filterPlaceholder || translate('filterPlaceholder')"
        hide-cancel
        placeholder-left
        @change="handleFilterChange"
      />
      <scroll-view
        :class="`wd-select-picker__wrapper ${filterable ? 'is-filterable' : ''} ${loading ? 'is-loading' : ''} ${customContentClass}`"
        :scroll-y="!loading"
        :scroll-top="scrollTop"
        :scroll-with-animation="true"
      >
        <!-- 多选 -->
        <view v-if="type === 'checkbox' && isArray(selectList)" id="wd-checkbox-group">
          <wd-checkbox-group v-model="selectList" cell :size="selectSize" :checked-color="checkedColor" :min="min" :max="max" @change="handleChange">
            <view v-for="item in filterColumns" :key="item[valueKey]" :id="'check' + item[valueKey]">
              <wd-checkbox :modelValue="item[valueKey]" :disabled="item.disabled">
                <block v-if="filterable && filterVal">
                  <block v-for="text in item[labelKey]" :key="text.label">
                    <text v-if="text.type === 'active'" class="wd-select-picker__text-active">{{ text.label }}</text>
                    <block v-else>{{ text.label }}</block>
                  </block>
                </block>
                <block v-else>
                  {{ item[labelKey] }}
                </block>
              </wd-checkbox>
            </view>
          </wd-checkbox-group>
        </view>
        <!-- 单选 -->
        <view v-if="type === 'radio' && !isArray(selectList)" id="wd-radio-group">
          <wd-radio-group v-model="selectList" cell :size="selectSize" :checked-color="checkedColor" @change="handleChange">
            <view v-for="(item, index) in filterColumns" :key="index" :id="'radio' + item[valueKey]">
              <wd-radio :value="item[valueKey]" :disabled="item.disabled">
                <block v-if="filterable && filterVal">
                  <block v-for="text in item[labelKey]" :key="text.label">
                    <text :class="`${text.type === 'active' ? 'wd-select-picker__text-active' : ''}`">{{ text.label }}</text>
                  </block>
                </block>
                <block v-else>
                  {{ item[labelKey] }}
                </block>
              </wd-radio>
            </view>
          </wd-radio-group>
        </view>
        <view v-if="loading" class="wd-select-picker__loading" @touchmove="noop">
          <wd-loading :color="loadingColor" />
        </view>
      </scroll-view>
      <!-- 确认按钮 -->
      <view v-if="showConfirm" class="wd-select-picker__footer">
        <wd-button block size="large" @click="onConfirm" :disabled="loading">{{ confirmButtonText || translate('confirm') }}</wd-button>
      </view>
    </wd-action-sheet>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-select-picker',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdActionSheet from '../wd-action-sheet/wd-action-sheet.vue'
import wdCheckbox from '../wd-checkbox/wd-checkbox.vue'
import wdCheckboxGroup from '../wd-checkbox-group/wd-checkbox-group.vue'
import wdRadio from '../wd-radio/wd-radio.vue'
import wdRadioGroup from '../wd-radio-group/wd-radio-group.vue'
import wdButton from '../wd-button/wd-button.vue'
import wdLoading from '../wd-loading/wd-loading.vue'
import wdCell from '../wd-cell/wd-cell.vue'

import { getCurrentInstance, onBeforeMount, ref, watch, nextTick, computed } from 'vue'
import { getRect, isArray, isDef, isFunction, pause } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { selectPickerProps, type SelectPickerExpose } from './types'

const { translate } = useTranslate('select-picker')

const props = defineProps(selectPickerProps)
const emit = defineEmits(['change', 'cancel', 'confirm', 'clear', 'update:modelValue', 'open', 'close'])

const pickerShow = ref<boolean>(false)
const selectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const isConfirm = ref<boolean>(false)
const lastSelectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const filterVal = ref<string>('')
const filterColumns = ref<Array<Record<string, any>>>([])
const scrollTop = ref<number>(0) // 滚动位置

const showValue = computed(() => {
  const value = valueFormat(props.modelValue)
  let showValueTemp: string = ''

  if (props.displayFormat) {
    showValueTemp = props.displayFormat(value, props.columns)
  } else {
    const { type, labelKey } = props
    if (type === 'checkbox') {
      const selectedItems = (isArray(value) ? value : []).map((item) => {
        return getSelectedItem(item)
      })
      showValueTemp = selectedItems
        .map((item) => {
          return item[labelKey]
        })
        .join(', ')
    } else if (type === 'radio') {
      const selectedItem = getSelectedItem(value as string | number | boolean)
      showValueTemp = selectedItem[labelKey]
    } else {
      showValueTemp = value as string
    }
  }
  return showValueTemp
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === selectList.value) return
    selectList.value = valueFormat(newValue)
    lastSelectList.value = valueFormat(newValue)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columns,
  (newValue) => {
    if (props.filterable && filterVal.value) {
      formatFilterColumns(newValue, filterVal.value)
    } else {
      filterColumns.value = newValue
    }
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

onBeforeMount(() => {
  selectList.value = valueFormat(props.modelValue)
  filterColumns.value = props.columns
})

const { proxy } = getCurrentInstance() as any

async function setScrollIntoView() {
  let wraperSelector: string = ''
  let selectorPromise: Promise<UniApp.NodeInfo>[] = []
  if (isDef(selectList.value) && selectList.value !== '' && !isArray(selectList.value)) {
    wraperSelector = '#wd-radio-group'
    selectorPromise = [getRect(`#radio${selectList.value}`, false, proxy)]
  } else if (isArray(selectList.value) && selectList.value.length > 0) {
    selectList.value.forEach((value) => {
      selectorPromise.push(getRect(`#check${value}`, false, proxy))
    })
    wraperSelector = '#wd-checkbox-group'
  }
  if (wraperSelector) {
    await pause(2000 / 30)
    Promise.all([getRect('.wd-select-picker__wrapper', false, proxy), getRect(wraperSelector, false, proxy), ...selectorPromise]).then((res) => {
      if (isDef(res) && isArray(res)) {
        const scrollView = res[0]
        const wraper = res[1]
        const target = res.slice(2) || []
        if (isDef(wraper) && isDef(scrollView)) {
          const index = target.findIndex((item) => {
            return item.bottom! > scrollView.top! && item.top! < scrollView.bottom!
          })
          if (index < 0) {
            scrollTop.value = -1
            nextTick(() => {
              scrollTop.value = Math.max(0, target[0].top! - wraper.top! - scrollView.height! / 2)
            })
          }
        }
      }
    })
  }
}

function noop() {}

function getSelectedItem(value: string | number | boolean) {
  const { valueKey, labelKey, columns } = props

  const selecteds = columns.filter((item) => {
    return item[valueKey] === value
  })

  if (selecteds.length > 0) {
    return selecteds[0]
  }

  return {
    [valueKey]: value,
    [labelKey]: ''
  }
}

function valueFormat(value: string | number | boolean | (string | number | boolean)[]) {
  return props.type === 'checkbox' ? (isArray(value) ? value : []) : value
}

function handleChange({ value }: { value: string | number | boolean | (string | number | boolean)[] }) {
  selectList.value = value
  emit('change', { value })
  if (props.type === 'radio' && !props.showConfirm) {
    onConfirm()
  }
}

function close() {
  pickerShow.value = false
  // 未确定选项时，数据还原复位
  if (!isConfirm.value) {
    selectList.value = valueFormat(lastSelectList.value)
  }
  emit('cancel')
  emit('close')
}

function open() {
  if (props.disabled || props.readonly) return
  selectList.value = valueFormat(props.modelValue)
  pickerShow.value = true
  isConfirm.value = false
  emit('open')
}

function onConfirm() {
  if (props.loading) {
    pickerShow.value = false
    emit('confirm')
    emit('close')
    return
  }
  if (props.beforeConfirm) {
    props.beforeConfirm(selectList.value, (isPass: boolean) => {
      isPass && handleConfirm()
    })
  } else {
    handleConfirm()
  }
}

function handleConfirm() {
  isConfirm.value = true
  pickerShow.value = false
  lastSelectList.value = valueFormat(selectList.value)
  let selectedItems: Record<string, any> = {}
  if (props.type === 'checkbox') {
    selectedItems = (isArray(lastSelectList.value) ? lastSelectList.value : []).map((item) => {
      return getSelectedItem(item)
    })
  } else {
    selectedItems = getSelectedItem(lastSelectList.value as string | number | boolean)
  }
  emit('update:modelValue', lastSelectList.value)
  emit('confirm', {
    value: lastSelectList.value,
    selectedItems
  })
  emit('close')
}

function getFilterText(label: string, filterVal: string) {
  const reg = new RegExp(`(${filterVal})`, 'g')

  return label.split(reg).map((text) => {
    return {
      type: text === filterVal ? 'active' : 'normal',
      label: text
    }
  })
}

function handleFilterChange({ value }: { value: string }) {
  if (value === '') {
    filterColumns.value = []
    filterVal.value = value
    nextTick(() => {
      filterColumns.value = props.columns
    })
  } else {
    filterVal.value = value
    formatFilterColumns(props.columns, value)
  }
}

function formatFilterColumns(columns: Record<string, any>[], filterVal: string) {
  const filterColumnsTemp = columns.filter((item) => {
    return item[props.labelKey].indexOf(filterVal) > -1
  })

  const formatFilterColumns = filterColumnsTemp.map((item) => {
    return {
      ...item,
      [props.labelKey]: getFilterText(item[props.labelKey], filterVal)
    }
  })
  filterColumns.value = []
  nextTick(() => {
    filterColumns.value = formatFilterColumns
  })
}

const showConfirm = computed(() => {
  return (props.type === 'radio' && props.showConfirm) || props.type === 'checkbox'
})

// 是否展示清除按钮
const showClear = computed(() => {
  return props.clearable && !props.disabled && !props.readonly && showValue.value.length
})

function handleClear() {
  emit('update:modelValue', props.type === 'checkbox' ? [] : '')
  emit('clear')
}

// 是否展示箭头
const showArrow = computed(() => {
  return !props.disabled && !props.readonly && !showClear.value
})

defineExpose<SelectPickerExpose>({
  close,
  open
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
