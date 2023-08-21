<template>
  <view :class="`wd-select-picker ${cell.border.value ? 'is-border' : ''} ${customClass}`">
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
          :class="`wd-select-picker__label ${required && 'is-required'} ${customLabelClass}`"
          :style="labelWidth ? 'min-width:' + labelWidth + ';max-width:' + labelWidth + ';' : ''"
        >
          <block v-if="label">{{ label }}</block>
          <slot v-else name="label"></slot>
        </view>
        <view
          :class="`wd-select-picker__value ${ellipsis && 'is-ellipsis'} ${customValueClass} ${
            showValue ? '' : 'wd-select-picker__value--placeholder'
          }`"
        >
          {{ showValue || placeholder || '请选择' }}
        </view>
        <wd-icon v-if="!disabled && !readonly" custom-class="wd-select-picker__arrow" name="arrow-right" />
      </view>
    </view>
    <wd-action-sheet
      :show="pickerShow"
      :duration="250"
      :title="title || '请选择'"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @close="close"
      custom-header-class="wd-select-picker__header"
    >
      <wd-search v-if="filterable" v-model="filterVal" :placeholder="filterPlaceholder" hide-cancel placeholder-left @change="handleFilterChange" />
      <view :class="`wd-select-picker__wrapper ${filterable ? 'is-filterable' : ''} ${loading ? 'is-loading' : ''} ${customContentClass}`">
        <!-- 多选 -->
        <wd-checkbox-group
          v-if="type === 'checkbox'"
          v-model="selectList"
          cell
          :size="selectSize"
          :checked-color="checkedColor"
          :min="min"
          :max="max"
          @change="handleChange"
        >
          <wd-checkbox v-for="item in filterColumns" :key="item[valueKey]" :modelValue="item[valueKey]" :disabled="item.disabled">
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
        </wd-checkbox-group>
        <!-- 单选 -->
        <wd-radio-group v-if="type === 'radio'" v-model="selectList" cell :size="selectSize" :checked-color="checkedColor" @change="handleChange">
          <wd-radio v-for="(item, index) in filterColumns" :key="index" :value="item[valueKey]" :disabled="item.disabled">
            <block v-if="filterable && filterVal">
              <block v-for="text in item[labelKey]" :key="text.label">
                <text :clsss="`${text.type === 'active' ? 'wd-select-picker__text-active' : ''}`">{{ text.label }}</text>
              </block>
            </block>
            <block v-else>
              {{ item[labelKey] }}
            </block>
          </wd-radio>
        </wd-radio-group>
        <view v-if="loading" class="wd-select-picker__loading" @touchmove="noop">
          <wd-loading :color="loadingColor" />
        </view>
      </view>
      <!-- 确认按钮 -->
      <view class="wd-select-picker__footer">
        <wd-button block size="large" @click="onConfirm" :disabled="loading">{{ confirmButtonText }}</wd-button>
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
import { onBeforeMount, ref, watch } from 'vue'
import { useCell } from '../mixins/useCell'
import { nextTick } from 'vue'
import { getType } from '../common/util'

type SelectPickerType = 'checkbox' | 'radio'

interface Props {
  customClass?: string
  customContentClass?: string
  customLabelClass?: string
  customValueClass?: string
  label?: string
  labelWidth: string
  disabled: boolean
  readonly: boolean
  placeholder: string
  title?: string
  alignRight: boolean
  error: boolean
  required: boolean
  useLabelSlot: boolean
  useDefaultSlot: boolean
  size?: string
  checkedColor: string
  min: number
  max: number
  selectSize?: string
  loading: boolean
  loadingColor: string
  closeOnClickModal: boolean
  modelValue: Array<number | boolean | string> | number | boolean | string
  columns: Array<Record<string, any>>
  type: SelectPickerType
  valueKey: string
  labelKey: string
  confirmButtonText: string
  // 外部展示格式化函数
  // eslint-disable-next-line @typescript-eslint/ban-types
  displayFormat?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeConfirm?: Function
  zIndex: number
  safeAreaInsetBottom: boolean
  filterable: boolean
  filterPlaceholder: string
  ellipsis: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customContentClass: '',
  customLabelClass: '',
  customValueClass: '',
  columns: () => [],
  type: 'checkbox',
  valueKey: 'value',
  labelKey: 'label',
  placeholder: '请选择',
  disabled: false,
  loading: false,
  loadingColor: '#4D80F0',
  readonly: false,
  confirmButtonText: '确认',
  labelWidth: '33%',
  error: false,
  required: false,
  alignRight: false,
  min: 0,
  max: 0,
  checkedColor: '#4D80F0',
  useDefaultSlot: false,
  useLabelSlot: false,
  closeOnClickModal: true,
  zIndex: 15,
  safeAreaInsetBottom: true,
  filterable: false,
  filterPlaceholder: '搜索',
  ellipsis: false
})

const pickerShow = ref<boolean>(false)
const selectList = ref<Array<number | boolean | string> | number | boolean | string>([])
const showValue = ref<string>('')
const isConfirm = ref<boolean>(false)
const lastSelectList = ref<Array<number | boolean | string>>([])
const filterVal = ref<string>('')
const filterColumns = ref<Array<Record<string, any>>>([])

const cell = useCell()

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === selectList.value) return
    selectList.value = valueFormat(newValue)
    lastSelectList.value = valueFormat(newValue)
    setShowValue(valueFormat(newValue))
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
    if (fn && getType(fn) !== 'function') {
      throw Error('The type of displayFormat must be Function')
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
    if (fn && getType(fn) !== 'function') {
      throw Error('The type of beforeConfirm must be Function')
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

const emit = defineEmits(['change', 'cancel', 'confirm', 'update:modelValue'])

function noop() {}

function getSelectedItem(value) {
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

function valueFormat(value) {
  return props.type === 'checkbox' ? Array.prototype.slice.call(value) : value
}

function handleChange({ value }) {
  selectList.value = value
  emit('change', { value })
}

function close() {
  pickerShow.value = false
  // 未确定选项时，数据还原复位
  if (!isConfirm.value) {
    selectList.value = valueFormat(lastSelectList.value)
  }
  emit('cancel')
}

function open() {
  if (props.disabled || props.readonly) return
  selectList.value = valueFormat(props.modelValue)
  pickerShow.value = true
  isConfirm.value = false
}

function onConfirm() {
  if (props.loading) {
    pickerShow.value = false
    emit('confirm')
    return
  }
  if (props.beforeConfirm) {
    props.beforeConfirm(selectList.value, (isPass) => {
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
    selectedItems = lastSelectList.value.map((item) => {
      return getSelectedItem(item)
    })
  } else {
    selectedItems = getSelectedItem(lastSelectList.value)
  }
  emit('update:modelValue', lastSelectList.value)
  emit('confirm', {
    value: lastSelectList.value,
    selectedItems
  })
  setShowValue(lastSelectList.value)
}

function setShowValue(value) {
  let showValueTemp: string = ''

  if (props.displayFormat) {
    showValueTemp = props.displayFormat(value, props.columns)
  } else {
    const { type, labelKey } = props
    if (type === 'checkbox') {
      const selectedItems = value.map((item) => {
        return getSelectedItem(item)
      })
      showValueTemp = selectedItems
        .map((item) => {
          return item[labelKey]
        })
        .join(', ')
    } else if (type === 'radio') {
      const selectedItem = getSelectedItem(value)
      showValueTemp = selectedItem[labelKey]
    } else {
      showValueTemp = value
    }
  }
  showValue.value = showValueTemp
}

function getFilterText(label, filterVal) {
  const reg = new RegExp(`(${filterVal})`, 'g')

  return label.split(reg).map((text) => {
    return {
      type: text === filterVal ? 'active' : 'normal',
      label: text
    }
  })
}

function handleFilterChange({ value }) {
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

function formatFilterColumns(columns, filterVal) {
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

defineExpose({
  close,
  open
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
