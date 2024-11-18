<template>
  <view :class="`wd-col-picker ${customClass}`" :style="customStyle">
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :title="title || translate('title')"
      :close-on-click-modal="closeOnClickModal"
      :hideWhenClose="false"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @opened="handlePickerOpened"
      @close="handlePickerClose"
      @closed="handlePickerClosed"
    >
      <wd-tabs ref="tabs" v-model="currentCol" :animated="animated" slidable="always">
        <wd-tab v-for="(col, colIndex) in innerColumns" :key="colIndex" :title="`${currentColumn[colIndex] || translate('select')}`" :name="colIndex">
          <view class="wd-col-picker__list-container">
            <view class="wd-col-picker__list">
              <view
                v-for="(item, index) in col"
                :key="index"
                :class="`wd-col-picker__list-item ${innerValue[colIndex] && item[valueKey] === innerValue[colIndex] && 'is-selected'} ${
                  item.disabled && 'is-disabled'
                }`"
                @click="chooseItem(colIndex, index)"
              >
                <view>
                  <view class="wd-col-picker__list-item-label">{{ item[labelKey] }}</view>
                  <view v-if="item[tipKey]" class="wd-col-picker__list-item-tip">{{ item[tipKey] }}</view>
                </view>
                <wd-icon custom-class="wd-col-picker__checked" name="check"></wd-icon>
              </view>
              <view v-if="loading" class="wd-col-picker__loading">
                <wd-loading :color="loadingColor" />
              </view>
            </view>
          </view>
        </wd-tab>
      </wd-tabs>
    </wd-action-sheet>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-col-picker',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import wdLoading from '../wd-loading/wd-loading.vue'
import wdActionSheet from '../wd-action-sheet/wd-action-sheet.vue'
import { ref, watch, nextTick } from 'vue'
import { deepClone, isArray, isBoolean, isDef, isEqual } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { colPickerProps, type ColPickerExpose, type ColPickerOption } from './types'
import type { TabsInstance } from '../wd-tabs/types'

const { translate } = useTranslate('col-picker')
const tabs = ref<TabsInstance>()

const props = defineProps(colPickerProps)
const emit = defineEmits(['close', 'update:modelValue', 'update:visible', 'confirm'])
const innerValue = ref(props.modelValue) // 当前选择值
const innerColumns = ref<ColPickerOption[][]>(props.columns) // 全部列数据
const currentColumn = ref<ColPickerOption[]>([]) // 当前展示列数据
const animated = ref<boolean>(false) // 是否开启切换动画 弹窗打开后开启

const pickerShow = ref<boolean>(false)
const currentCol = ref<number>(0)
const loading = ref<boolean>(false)
const lastSelectList = ref<ColPickerOption[][]>([])
const lastPickerColSelected = ref<(string | number)[]>([])
const isCompleting = ref<boolean>(false)

watch(() => props.modelValue, updateInnerValue)

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
  (newValue, oldValue) => {
    if (newValue.length && !isArray(newValue[0])) {
      console.error('[wot design] error(wd-col-picker): the columns props of wd-col-picker should be a two-dimensional array')
      return
    }
    if (newValue.length === 0 && !oldValue) return
    innerColumns.value = deepClone(newValue)
    currentColumn.value = innerValue.value.map((item, colIndex) => {
      return getSelectedItem(item, colIndex, innerColumns.value)[props.labelKey]
    })
    lastSelectList.value = deepClone(innerColumns.value)
  },
  {
    immediate: true,
    deep: true
  }
)

// 打开弹框
function open() {
  updateInnerValue()
  pickerShow.value = true
  lastPickerColSelected.value = deepClone(innerValue.value)
  lastSelectList.value = deepClone(innerColumns.value)
}
// 关闭弹框
function close() {
  pickerShow.value = false
}

function updateInnerValue() {
  if (isEqual(props.modelValue, innerValue.value)) return
  innerValue.value = props.modelValue
  handleAutoComplete()
}

/**
 * 弹出框打开后
 */
function handlePickerOpened() {
  if (isDef(tabs.value)) {
    tabs.value?.updateLineStyle(false)
    animated.value = true
  }
}

/**
 * 弹出框关闭时
 */
function handlePickerClose() {
  emit('update:visible', false)
  emit('close')
}

/**
 * 弹出框关闭后
 */
function handlePickerClosed() {
  animated.value = false
  setTimeout(() => {
    innerColumns.value = lastSelectList.value.slice(0)
    innerValue.value = lastPickerColSelected.value.slice(0)
    currentColumn.value = lastPickerColSelected.value.map((item, colIndex) => {
      return getSelectedItem(item, colIndex, lastSelectList.value)[props.labelKey]
    })
    currentCol.value = lastSelectList.value.length - 1
    if (isDef(tabs.value)) {
      tabs.value.updateLineStyle(false)
    }
  }, 250)
}

function getSelectedItem(value: string | number, colIndex: number, innerColumns: ColPickerOption[][]) {
  const { valueKey, labelKey } = props
  if (innerColumns[colIndex]) {
    const selecteds = innerColumns[colIndex].filter((item) => {
      return item[valueKey] === value
    })

    if (selecteds.length > 0) {
      return selecteds[0]
    }
  }

  return {
    [valueKey]: value,
    [labelKey]: ''
  }
}

function chooseItem(colIndex: number, index: number) {
  const item = innerColumns.value[colIndex][index]
  if (item.disabled) return

  const newPickerColSelected = innerValue.value.slice(0, colIndex)
  newPickerColSelected.push(item[props.valueKey])
  innerValue.value = newPickerColSelected
  innerColumns.value = innerColumns.value.slice(0, colIndex + 1)
  currentColumn.value = newPickerColSelected.map((item, colIndex) => {
    return getSelectedItem(item, colIndex, innerColumns.value)[props.labelKey]
  })
  handleColChange(colIndex, item, index)
}

function handleColChange(colIndex: number, item: ColPickerOption, index: number, callback?: () => void) {
  loading.value = true
  const { columnChange, beforeConfirm } = props
  columnChange &&
    columnChange({
      selectedItem: item,
      index: colIndex,
      rowIndex: index,
      resolve: (nextColumn: ColPickerOption[]) => {
        if (!isArray(nextColumn)) {
          console.error('[wot design] error(wd-col-picker): the data of each column of wd-col-picker should be an array')
          return
        }
        innerColumns.value[colIndex + 1] = nextColumn
        loading.value = false
        nextTick(() => {
          currentCol.value = colIndex + 1
        })
        if (typeof callback === 'function') {
          isCompleting.value = false
          currentColumn.value = innerValue.value.map((item, colIndex) => {
            return getSelectedItem(item, colIndex, innerColumns.value)[props.labelKey]
          })
          callback()
        }
      },
      finish: (isOk?: boolean) => {
        // 每设置展示数据回显
        if (typeof callback === 'function') {
          loading.value = false
          isCompleting.value = false
          return
        }
        if (isBoolean(isOk) && !isOk) {
          loading.value = false
          return
        }

        if (beforeConfirm) {
          beforeConfirm(
            innerValue.value,
            innerValue.value.map((item, colIndex) => {
              return getSelectedItem(item, colIndex, innerColumns.value)
            }),
            (isPass: boolean) => {
              if (isPass) {
                onConfirm()
              } else {
                loading.value = false
              }
            }
          )
        } else {
          onConfirm()
        }
      }
    })
}
function onConfirm() {
  loading.value = false
  pickerShow.value = false
  lastPickerColSelected.value = deepClone(innerValue.value)
  lastSelectList.value = deepClone(innerColumns.value)
  emit('update:modelValue', innerValue.value)
  emit('confirm', {
    value: innerValue.value,
    selectedItems: innerValue.value.map((item, colIndex) => {
      return getSelectedItem(item, colIndex, innerColumns.value)
    })
  })
  emit('update:visible', false)
}

// 递归列数据补齐
function diffColumns(colIndex: number) {
  // colIndex 为 -1 时，item 为空对象，>=0 时则具有 value 属性
  const item = colIndex === -1 ? {} : { [props.valueKey]: props.modelValue[colIndex] }
  handleColChange(colIndex, item, -1, () => {
    // 如果 columns 长度还小于 value 长度，colIndex + 1，继续递归补齐
    if (innerColumns.value.length < props.modelValue.length) {
      diffColumns(colIndex + 1)
    }
  })
}
function handleAutoComplete() {
  if (props.autoComplete) {
    // 如果 columns 数组长度为空，或者长度小于 value 的长度，自动触发 columnChange 来补齐数据
    if (innerColumns.value.length < props.modelValue.length || innerColumns.value.length === 0) {
      // isCompleting 是否在自动补全，锁操作
      if (!isCompleting.value) {
        // 如果 columns 长度为空，则传入的 colIndex 为 -1
        const colIndex = innerColumns.value.length === 0 ? -1 : innerColumns.value.length - 1
        diffColumns(colIndex)
      }
      isCompleting.value = true
    }
  }
}

defineExpose<ColPickerExpose>({
  close,
  open
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
