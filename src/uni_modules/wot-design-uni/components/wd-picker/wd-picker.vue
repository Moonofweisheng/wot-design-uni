<template>
  <view :class="`wd-picker ${customClass}`" :style="customStyle">
    <wd-popup
      v-model="popupShow"
      position="bottom"
      :hide-when-close="false"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @leave="handlePickerClose"
      @after-leave="handlePickerClosed"
      custom-class="wd-picker__popup"
    >
      <view class="wd-picker__wraper">
        <view class="wd-picker__toolbar" @touchmove="noop">
          <view class="wd-picker__action wd-picker__action--cancel" @click="close">
            {{ cancelButtonText || translate('cancel') }}
          </view>
          <view v-if="title" class="wd-picker__title">{{ title }}</view>
          <view :class="`wd-picker__action ${isLoading ? 'is-loading' : ''}`" @click="onConfirm">
            {{ confirmButtonText || translate('done') }}
          </view>
        </view>
        <wd-picker-view
          ref="pickerViewRef"
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
import wdPopup from '../wd-popup/wd-popup.vue'
import wdPickerView from '../wd-picker-view/wd-picker-view.vue'
import { getCurrentInstance, onBeforeMount, ref, watch, computed } from 'vue'
import { deepClone, isDef, isFunction } from '../common/util'
import { type ColumnItem, type PickerViewInstance } from '../wd-picker-view/types'
import { useTranslate } from '../composables/useTranslate'
import { pickerProps, type PickerExpose } from './types'
const { translate } = useTranslate('picker')

const props = defineProps(pickerProps)
const emit = defineEmits(['confirm', 'open', 'cancel', 'update:modelValue', 'update:visible', 'close'])

const pickerViewRef = ref<PickerViewInstance | null>(null)

const innerLoading = ref<boolean>(false) // 内部控制是否loading

// 弹出层是否显示
const popupShow = ref<boolean>(false)
// 选定后展示的选中项
const pickerValue = ref<string | number | boolean | string[] | number[] | boolean[]>('')
const displayColumns = ref<Array<string | number | ColumnItem | Array<string | number | ColumnItem>>>([]) // 传入 pickerView 的columns
const resetColumns = ref<Array<string | number | ColumnItem | Array<string | number | ColumnItem>>>([]) // 保存之前的 columns，当取消时，将数据源回滚，避免多级联动数据源不正确的情况
const isPicking = ref<boolean>(false) // 判断pickview是否还在滑动中
const hasConfirmed = ref<boolean>(false) // 判断用户是否点击了确认按钮

const isLoading = computed(() => {
  return props.loading || innerLoading.value
})

watch(
  () => props.modelValue,
  (newValue) => {
    pickerValue.value = newValue
  },
  {
    deep: true,
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
  () => props.columns,
  (newValue) => {
    displayColumns.value = deepClone(newValue)
    resetColumns.value = deepClone(newValue)
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

const { proxy } = getCurrentInstance() as any

onBeforeMount(() => {
  displayColumns.value = deepClone(props.columns)
  resetColumns.value = deepClone(props.columns)
})

// 打开弹框
function open() {
  emit('open')
  popupShow.value = true
  pickerValue.value = props.modelValue
  displayColumns.value = resetColumns.value
}
// 关闭弹框
function close() {
  popupShow.value = false
}

/**
 * 弹出框关闭后
 */
function handlePickerClosed() {
  let timer = setTimeout(() => {
    clearTimeout(timer)
    isDef(pickerViewRef.value) && pickerViewRef.value.resetColumns(resetColumns.value)
  }, 300)
}

/**
 * 弹出框关闭时
 */
function handlePickerClose() {
  emit('update:visible', false)
  emit('close')
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
  if (isLoading.value) {
    popupShow.value = false
    return
  }

  const selects = pickerViewRef.value!.getSelects()
  const values = pickerViewRef.value!.getValues()
  // 获取当前的数据源，并设置给 resetColumns，用于取消时可以回退数据源
  const columns = pickerViewRef.value!.getColumnsData()
  popupShow.value = false
  resetColumns.value = deepClone(columns)
  emit('update:modelValue', values)
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

defineExpose<PickerExpose>({
  close,
  open,
  setLoading
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
