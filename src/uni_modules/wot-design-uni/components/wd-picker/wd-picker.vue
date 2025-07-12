<template>
  <view
    :class="`wd-picker ${disabled ? 'is-disabled' : ''} ${size ? 'is-' + size : ''} ${alignRight ? 'is-align-right' : ''} ${
      error ? 'is-error' : ''
    } ${customClass}`"
    :style="customStyle"
  >
    <wd-cell
      v-if="!$slots.default"
      :title="label"
      :value="showValue ? showValue : placeholder || translate('placeholder')"
      :required="required"
      :size="size"
      :title-width="labelWidth"
      :prop="prop"
      :rules="rules"
      :clickable="!disabled && !readonly"
      :value-align="alignRight ? 'right' : 'left'"
      :custom-class="`wd-picker__cell ${disabled && 'is-disabled'} ${readonly && 'is-readonly'} ${error && 'is-error'} ${
        !showValue ? 'wd-picker__cell--placeholder' : ''
      }`"
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
      <template #right-icon>
        <wd-icon v-if="showArrow" custom-class="wd-picker__arrow" name="arrow-right" />
        <view v-else-if="showClear" @click.stop="handleClear">
          <wd-icon custom-class="wd-picker__clear" name="error-fill" />
        </view>
      </template>
    </wd-cell>
    <view v-else @click="showPopup">
      <slot></slot>
    </view>
    <wd-popup
      v-model="popupShow"
      position="bottom"
      :hide-when-close="false"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :root-portal="rootPortal"
      @close="onCancel"
      custom-class="wd-picker__popup"
    >
      <view class="wd-picker__wraper">
        <view class="wd-picker__toolbar" @touchmove="noop">
          <view class="wd-picker__action wd-picker__action--cancel" @click="onCancel">
            {{ cancelButtonText || translate('cancel') }}
          </view>
          <view v-if="title" class="wd-picker__title">{{ title }}</view>
          <view :class="`wd-picker__action ${isLoading ? 'is-loading' : ''}`" @click="onConfirm">
            {{ confirmButtonText || translate('done') }}
          </view>
        </view>
        <wd-picker-view
          ref="pickerViewWd"
          :custom-class="customViewClass"
          v-model="pickerValue"
          :columns="displayColumns"
          :loading="isLoading"
          :loading-color="loadingColor"
          :columns-height="columnsHeight"
          :value-key="valueKey"
          :label-key="labelKey"
          :immediate-change="immediateChange"
          @change="pickerViewChange"
          @pickstart="onPickStart"
          @pickend="onPickEnd"
          :column-change="columnChange"
        />
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-picker',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import wdPopup from '../wd-popup/wd-popup.vue'
import wdPickerView from '../wd-picker-view/wd-picker-view.vue'
import wdCell from '../wd-cell/wd-cell.vue'
import { getCurrentInstance, onBeforeMount, ref, watch, computed, onMounted, nextTick } from 'vue'
import { deepClone, defaultDisplayFormat, getType, isArray, isDef, isFunction } from '../common/util'
import { type ColumnItem, formatArray, type PickerViewInstance } from '../wd-picker-view/types'
import { FORM_KEY, type FormItemRule } from '../wd-form/types'
import { useParent } from '../composables/useParent'
import { useTranslate } from '../composables/useTranslate'
import { pickerProps, type PickerExpose } from './types'
const { translate } = useTranslate('picker')

const props = defineProps(pickerProps)
const emit = defineEmits(['confirm', 'open', 'cancel', 'clear', 'update:modelValue'])

const pickerViewWd = ref<PickerViewInstance | null>(null)

const innerLoading = ref<boolean>(false) // 内部控制是否loading

// 弹出层是否显示
const popupShow = ref<boolean>(false)
// 选定后展示的选中项
const showValue = ref<string>('')
const pickerValue = ref<string | number | boolean | string[] | number[] | boolean[]>('')
const displayColumns = ref<Array<string | number | ColumnItem | Array<string | number | ColumnItem>>>([]) // 传入 pickerView 的columns
const resetColumns = ref<Array<string | number | ColumnItem | Array<string | number | ColumnItem>>>([]) // 保存之前的 columns，当取消时，将数据源回滚，避免多级联动数据源不正确的情况
const isPicking = ref<boolean>(false) // 判断pickview是否还在滑动中
const hasConfirmed = ref<boolean>(false) // 判断用户是否点击了确认按钮

const isLoading = computed(() => {
  return props.loading || innerLoading.value
})

watch(
  () => props.displayFormat,
  (fn) => {
    if (fn && !isFunction(fn)) {
      console.error('The type of displayFormat must be Function')
    }
    if (pickerViewWd.value && pickerViewWd.value.getSelectedIndex().length !== 0) {
      handleShowValueUpdate(props.modelValue)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    pickerValue.value = newValue
    // 获取初始选中项,并展示初始选中文案
    handleShowValueUpdate(newValue)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columns,
  (newValue) => {
    displayColumns.value = deepClone(newValue)
    resetColumns.value = deepClone(newValue)
    if (newValue.length === 0) {
      // 当 columns 变为空时，清空 pickerValue 和 showValue
      pickerValue.value = isArray(props.modelValue) ? [] : ''
      showValue.value = ''
    } else {
      // 非空时正常更新显示值
      handleShowValueUpdate(props.modelValue)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columnChange,
  (newValue) => {
    if (newValue && !isFunction(newValue)) {
      console.error('The type of columnChange must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

// 是否展示清除按钮
const showClear = computed(() => {
  return props.clearable && !props.disabled && !props.readonly && showValue.value.length > 0
})

// 是否展示箭头
const showArrow = computed(() => {
  return !props.disabled && !props.readonly && !showClear.value
})

const { proxy } = getCurrentInstance() as any

onMounted(() => {
  handleShowValueUpdate(props.modelValue)
})

onBeforeMount(() => {
  displayColumns.value = deepClone(props.columns)
  resetColumns.value = deepClone(props.columns)
})

/**
 * 值变更时更新显示内容
 * @param value
 */
function handleShowValueUpdate(value: string | number | Array<string | number>) {
  // 获取初始选中项,并展示初始选中文案
  if ((isArray(value) && value.length > 0) || (isDef(value) && !isArray(value) && value !== '')) {
    if (pickerViewWd.value) {
      nextTick(() => {
        setShowValue(pickerViewWd.value!.getSelects())
      })
    } else {
      setShowValue(getSelects(value)!)
    }
  } else {
    showValue.value = ''
  }
}

/**
 * @description 根据传入的value，picker组件获取当前cell展示值。
 * @param {String|Number|Array<String|Number|Array<any>>}value
 */
function getSelects(value: string | number | Array<string | number | Array<any>>) {
  const formatColumns = formatArray(props.columns, props.valueKey, props.labelKey)
  if (props.columns.length === 0) return

  // 使其默认选中首项
  if (value === '' || !isDef(value) || (isArray(value) && value.length === 0)) {
    return
  }
  const valueType = getType(value)
  const type = ['string', 'number', 'boolean', 'array']
  if (type.indexOf(valueType) === -1) return []
  /**
   * 1.单key转为Array<key>
   * 2.根据formatColumns的长度截取Array<String>，保证下面的遍历不溢出
   * 3.根据每列的key值找到选项中value为此key的下标并记录
   */
  value = isArray(value) ? value : [value]
  value = value.slice(0, formatColumns.length)

  if (value.length === 0) {
    value = formatColumns.map(() => 0)
  }
  let selected: number[] = []
  value.forEach((target, col) => {
    let row = formatColumns[col].findIndex((row) => {
      return row[props.valueKey].toString() === target.toString()
    })
    row = row === -1 ? 0 : row
    selected.push(row)
  })

  const selects = selected.map((row, col) => formatColumns[col][row])
  // 单列选择器，则返回单项
  if (selects.length === 1) {
    return selects[0]
  }
  return selects
}

// 对外暴露方法，打开弹框
function open() {
  showPopup()
}
// 对外暴露方法，关闭弹框
function close() {
  onCancel()
}
/**
 * 展示popup
 */
function showPopup() {
  if (props.disabled || props.readonly) return

  emit('open')
  popupShow.value = true
  pickerValue.value = props.modelValue
  displayColumns.value = resetColumns.value
}

/**
 * 点击取消按钮触发。关闭popup，触发cancel事件。
 */
function onCancel() {
  popupShow.value = false
  emit('cancel')
  let timmer = setTimeout(() => {
    clearTimeout(timmer)
    isDef(pickerViewWd.value) && pickerViewWd.value.resetColumns(resetColumns.value)
  }, 300)
}
/**
 * 点击确定按钮触发。展示选中值，触发cancel事件。
 */
function onConfirm() {
  if (isLoading.value) return

  // 如果当前还在滑动且未停止下来，则锁住先不确认，等滑完再自动确认，避免pickview值未更新
  if (isPicking.value) {
    hasConfirmed.value = true
    return
  }

  const { beforeConfirm } = props
  if (beforeConfirm && isFunction(beforeConfirm)) {
    beforeConfirm(
      pickerValue.value,
      (isPass: boolean) => {
        isPass && handleConfirm()
      },
      proxy.$.exposed
    )
  } else {
    handleConfirm()
  }
}
function handleConfirm() {
  if (isLoading.value || props.disabled) {
    popupShow.value = false
    return
  }

  const selects = pickerViewWd.value!.getSelects()
  const values = pickerViewWd.value!.getValues()
  // 获取当前的数据源，并设置给 resetColumns，用于取消时可以回退数据源
  const columns = pickerViewWd.value!.getColumnsData()
  popupShow.value = false
  resetColumns.value = deepClone(columns)
  emit('update:modelValue', values)

  setShowValue(selects)
  emit('confirm', {
    value: values,
    selectedItems: selects
  })
}
/**
 * 初始change事件
 * @param event
 */
function pickerViewChange({ value }: any) {
  pickerValue.value = value
}
/**
 * 设置展示值
 * @param  items
 */
function setShowValue(items: ColumnItem | ColumnItem[]) {
  // 避免值为空时调用自定义展示函数
  if ((isArray(items) && !items.length) || !items) return

  const { valueKey, labelKey } = props
  showValue.value = (props.displayFormat || defaultDisplayFormat)(items, { valueKey, labelKey })
}
function noop() {}
function onPickStart() {
  isPicking.value = true
}
function onPickEnd() {
  isPicking.value = false

  if (hasConfirmed.value) {
    hasConfirmed.value = false
    onConfirm()
  }
}

/**
 * 外部设置是否loading
 * @param loading 是否loading
 */
function setLoading(loading: boolean) {
  innerLoading.value = loading
}

function handleClear() {
  const clearValue = isArray(pickerValue.value) ? [] : ''
  emit('update:modelValue', clearValue)
  emit('clear')
}

defineExpose<PickerExpose>({
  close,
  open,
  setLoading
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
