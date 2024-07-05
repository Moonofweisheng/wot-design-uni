<template>
  <view :class="`wd-select-picker ${cell.border.value ? 'is-border' : ''} ${customClass}`" :style="customStyle">
    <view class="wd-select-picker__field" @click="open">
      <slot v-if="useDefaultSlot"></slot>
      <view
        v-else
        :class="`wd-select-picker__cell ${disabled && 'is-disabled'} ${readonly && 'is-readonly'} ${alignRight && 'is-align-right'} ${
          error && 'is-error'
        } ${size && 'is-' + size}`"
      >
        <view
          v-if="label || useLabelSlot"
          :class="`wd-select-picker__label ${isRequired && 'is-required'} ${customLabelClass}`"
          :style="labelWidth ? 'min-width:' + labelWidth + ';max-width:' + labelWidth + ';' : ''"
        >
          <block v-if="label">{{ label }}</block>
          <slot v-else name="label"></slot>
        </view>
        <view class="wd-select-picker__body">
          <view class="wd-select-picker__value-wraper">
            <view
              :class="`wd-select-picker__value ${ellipsis && 'is-ellipsis'} ${customValueClass} ${
                showValue ? '' : 'wd-select-picker__value--placeholder'
              }`"
            >
              {{ showValue || placeholder || translate('placeholder') }}
            </view>
            <wd-icon v-if="!disabled && !readonly" custom-class="wd-select-picker__arrow" name="arrow-right" />
          </view>

          <view v-if="errorMessage" class="wd-select-picker__error-message">{{ errorMessage }}</view>
        </view>
      </view>
    </view>
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :title="title || translate('title')"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
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
                    <text :clsss="`${text.type === 'active' ? 'wd-select-picker__text-active' : ''}`">{{ text.label }}</text>
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
import { getCurrentInstance, onBeforeMount, ref, watch, nextTick, computed } from 'vue'
import { useCell } from '../composables/useCell'
import { getRect, isArray, isDef, isFunction, requestAnimationFrame } from '../common/util'
import { useParent } from '../composables/useParent'
import { FORM_KEY, type FormItemRule } from '../wd-form/types'
import { useTranslate } from '../composables/useTranslate'
import { selectPickerProps, type SelectPickerExpose } from './types'

const { translate } = useTranslate('select-picker')

const props = defineProps(selectPickerProps)
const emit = defineEmits(['change', 'cancel', 'confirm', 'update:modelValue', 'open', 'close'])

const pickerShow = ref<boolean>(false)
const selectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const isConfirm = ref<boolean>(false)
const lastSelectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const filterVal = ref<string>('')
const filterColumns = ref<Array<Record<string, any>>>([])
const scrollTop = ref<number | null>(0) // 滚动位置
const cell = useCell()

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

onBeforeMount(() => {
  selectList.value = valueFormat(props.modelValue)
  filterColumns.value = props.columns
})

const { proxy } = getCurrentInstance() as any

function setScrollIntoView() {
  let wraperSelector: string = ''
  let selectorPromise: Promise<UniApp.NodeInfo | UniApp.NodeInfo[]>[] = []
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
    requestAnimationFrame().then(() => {
      requestAnimationFrame().then(() => {
        Promise.all([getRect('.wd-select-picker__wrapper', false, proxy), getRect(wraperSelector, false, proxy), ...selectorPromise])
          .then((res: any[]) => {
            if (isDef(res) && isArray(res)) {
              const scrollView = res[0]
              const wraper = res[1]
              const target = res.slice(2) || []
              if (isDef(wraper) && isDef(scrollView)) {
                const index = target.findIndex((item) => {
                  return item.top >= scrollView.top && item.bottom <= scrollView.bottom
                })
                if (index < 0) {
                  scrollTop.value = -1
                  nextTick(() => {
                    scrollTop.value = Math.max(0, target[0].top - wraper.top - scrollView.height / 2)
                  })
                }
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
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

defineExpose<SelectPickerExpose>({
  close,
  open
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
