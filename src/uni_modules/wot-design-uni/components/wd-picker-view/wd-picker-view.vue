<template>
  <view :class="`wd-picker-view ${customClass}`" :style="customStyle">
    <view class="wd-picker-view__loading" v-if="loading">
      <wd-loading :color="loadingColor" />
    </view>
    <view :style="`height: ${columnsHeight - 20}px;`">
      <picker-view
        mask-class="wd-picker-view__mask"
        indicator-class="wd-picker-view__roller"
        :indicator-style="`height: ${itemHeight}px;`"
        :style="`height: ${columnsHeight - 20}px;`"
        :value="selectedIndex"
        :immediate-change="immediateChange"
        @change="onChange"
        @pickstart="onPickStart"
        @pickend="onPickEnd"
      >
        <picker-view-column v-for="(col, colIndex) in formatColumns" :key="colIndex" class="wd-picker-view-column">
          <view
            v-for="(row, rowIndex) in col"
            :key="rowIndex"
            :class="`wd-picker-view-column__item ${row['disabled'] ? 'wd-picker-view-column__item--disabled' : ''}  ${
              selectedIndex[colIndex] == rowIndex ? 'wd-picker-view-column__item--active' : ''
            }`"
            :style="`line-height: ${itemHeight}px;`"
          >
            {{ row[labelKey] }}
          </view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-picker-view',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { getCurrentInstance, ref, watch, nextTick } from 'vue'
import { deepClone, getType, isArray, isDef, isEqual, range } from '../common/util'
import { formatArray, pickerViewProps, type ColumnItem, type PickerViewExpose } from './types'

const props = defineProps(pickerViewProps)
const emit = defineEmits(['change', 'pickstart', 'pickend', 'update:modelValue'])

const formatColumns = ref<ColumnItem[][]>([]) // 格式化后的列数据
const itemHeight = ref<number>(35)
const selectedIndex = ref<Array<number>>([]) // 格式化之后，每列选中的下标集合

watch(
  [() => props.modelValue, () => props.columns],
  (newValue, oldValue) => {
    if (!isEqual(oldValue[1], newValue[1])) {
      formatColumns.value = formatArray(newValue[1], props.valueKey, props.labelKey)
    }
    if (!isEqual(oldValue[0], newValue[0]) && isDef(newValue[0])) {
      selectWithValue(newValue[0])
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const { proxy } = getCurrentInstance() as any

/**
 * 根据传入的value，寻找对应的索引，并传递给原生选择器。
 * 需要保证formatColumns先设置，之后会修改selectedIndex。
 * @param {String|Number|Boolean|Array<String|Number|Boolean|Array<any>>}value
 */
function selectWithValue(value: string | number | boolean | number[] | string[] | boolean[]) {
  if (formatColumns.value.length === 0) return

  // 使其默认选中首项
  if (value === '' || !isDef(value) || (isArray(value) && value.length === 0)) {
    value = formatColumns.value.map((col) => {
      return col[0][props.valueKey]
    })
  }
  const valueType = getType(value)
  const type = ['string', 'number', 'boolean', 'array']
  if (type.indexOf(valueType) === -1) console.error(`value must be one of ${type.toString()}`)

  /**
   * 1.单key转为Array<key>
   * 2.根据formatColumns的长度截取Array<String>，保证下面的遍历不溢出
   * 3.根据每列的key值找到选项中value为此key的下标并记录
   */
  value = isArray(value) ? value : [value as string]
  value = value.slice(0, formatColumns.value.length)

  let selected: number[] = deepClone(selectedIndex.value)
  value.forEach((target, col) => {
    let row = formatColumns.value[col].findIndex((row) => {
      return row[props.valueKey].toString() === target.toString()
    })
    row = row === -1 ? 0 : row
    selected = correctSelectedIndex(col, row, selected)
  })
  /** 根据formatColumns的长度去除selectWithIndex无用的部分。
   * 始终保持value、selectWithIndex、formatColumns长度一致
   */
  selectedIndex.value = selected.slice(0, value.length)
}

/**
 * 修正选中项的值
 * @param value 当前picker选择器选中的值
 * @param origin 原始选中的值
 */
function correctSelected(value: number[]) {
  let selected = deepClone(value)
  value.forEach((row, col) => {
    row = range(row, 0, formatColumns.value[col].length - 1)
    selected = correctSelectedIndex(col, row, selected)
  })
  return selected
}

/**
 * 修正选中项指定列行的值
 * @param columnIndex 列下标
 * @param rowIndex 行下标
 * @param selected 选中值列表
 */
function correctSelectedIndex(columnIndex: number, rowIndex: number, selected: number[]) {
  const col = formatColumns.value[columnIndex]
  if (!col || !col[rowIndex]) {
    throw Error(`The value to select with Col:${columnIndex} Row:${rowIndex} is incorrect`)
  }
  const select: number[] = deepClone(selected)
  select[columnIndex] = rowIndex

  // 被禁用的无法选中，选中距离它最近的未被禁用的
  if (col[rowIndex].disabled) {
    // 寻找值为0或最最近的未被禁用的节点的索引
    const prev = col
      .slice(0, rowIndex)
      .reverse()
      .findIndex((s) => !s.disabled)
    const next = col.slice(rowIndex + 1).findIndex((s) => !s.disabled)
    if (prev !== -1) {
      select[columnIndex] = rowIndex - 1 - prev
    } else if (next !== -1) {
      select[columnIndex] = rowIndex + 1 + next
    } else if (select[columnIndex] === undefined) {
      select[columnIndex] = 0
    }
  }
  return select
}

/**
 * 选择器选中项变化时触发
 * @param param0
 */
function onChange({ detail: { value } }: { detail: { value: number[] } }) {
  value = value.map((v: any) => {
    return Number(v || 0)
  })
  const index = getChangeDiff(value)
  // 先将picker选择器的值赋给selectedIndex，然后重新赋予修正后的值，防止两次操作修正结果一致时pikcer视图不刷新
  selectedIndex.value = deepClone(value)
  nextTick(() => {
    // 重新赋予修正后的值
    selectedIndex.value = correctSelected(value)
    if (props.columnChange) {
      // columnsChange 可能有异步操作，需要添加 resolve 进行回调通知，形参小于4个则为同步
      if (props.columnChange.length < 4) {
        props.columnChange(proxy.$.exposed, getSelects(), index || 0, () => {})
        handleChange(index || 0)
      } else {
        props.columnChange(proxy.$.exposed, getSelects(), index || 0, () => {
          // 如果selectedIndex只有一列，返回此项；如果是多项，返回所有选中项。
          handleChange(index || 0)
        })
      }
    } else {
      // 如果selectedIndex只有一列，返回此项；如果是多项，返回所有选中项。
      handleChange(index || 0)
    }
  })
}

/**
 * 获取选中项变化的列的下标
 * @param now 当前选中项值
 * @param origin 旧选中项值
 */
function getChangeColumn(now: number[], origin: number[]) {
  if (!now || !origin) return -1
  const index = now.findIndex((row, index) => row !== origin[index])
  return index
}

function getChangeDiff(value: number[]) {
  value = value.slice(0, formatColumns.value.length)

  // 保留选中前的
  const origin: number[] = deepClone(selectedIndex.value)
  // 存储赋值旧值，便于外部比较
  let selected: number[] = deepClone(selectedIndex.value)

  value.forEach((row, col) => {
    row = range(row, 0, formatColumns.value[col].length - 1)
    if (row === origin[col]) return
    selected = correctSelectedIndex(col, row, selected)
  })

  // 值变化的列
  const diffCol = getChangeColumn(selected, origin)
  if (diffCol === -1) return

  // 获取变化的的行
  const diffRow = selected[diffCol]

  // 如果selectedIndex只有一列，返回选中项的索引；如果是多项，返回选中项所在的列。
  return selected.length === 1 ? diffRow : diffCol
}

/**
 * 列更新
 * @param index 列下标
 */
function handleChange(index: number) {
  const value = getValues()

  // 避免多次触发change
  if (isEqual(value, props.modelValue)) return

  emit('update:modelValue', value)
  // 延迟一下，避免组件刚渲染时调用者的事件未初始化好
  setTimeout(() => {
    emit('change', {
      picker: proxy.$.exposed,
      value,
      index
    })
  }, 0)
}

/**
 * @description 获取所有列选中项，返回值为一个数组
 */
function getSelects() {
  const selects = selectedIndex.value.map((row, col) => formatColumns.value[col][row])
  // 单列选择器，则返回单项
  if (selects.length === 1) {
    return selects[0]
  }
  return selects
}

/**
 * 获取所有列的选中值
 * 如果values只有一项则将第一项返回
 */
function getValues() {
  const { valueKey } = props
  const values = selectedIndex.value.map((row, col) => {
    return formatColumns.value[col][row][valueKey]
  })

  if (values.length === 1) {
    return values[0]
  }
  return values
}

/**
 * 获取所有列选中项的label，返回值为一个数组
 */
function getLabels() {
  const { labelKey } = props
  return selectedIndex.value.map((row, col) => formatColumns.value[col][row][labelKey])
}

/**
 * 获取某一列的选中项下标
 * @param {Number} columnIndex 列的下标
 * @returns {Number} 下标
 */
function getColumnIndex(columnIndex: number) {
  return selectedIndex.value[columnIndex]
}

/**
 *  获取某一列的选项
 * @param {Number} columnIndex 列的下标
 * @returns {Array<{valueKey,labelKey}>} 当前列的集合
 */
function getColumnData(columnIndex: number) {
  return formatColumns.value[columnIndex]
}

/**
 * 设置列数据
 * @param columnIndex 列下标
 * @param data // 列数据
 * @param rowIndex // 行下标
 */
function setColumnData(columnIndex: number, data: Array<string | number | ColumnItem | Array<string | number | ColumnItem>>, rowIndex: number = 0) {
  formatColumns.value[columnIndex] = formatArray(data, props.valueKey, props.labelKey).reduce((acc, val) => acc.concat(val), [])
  selectedIndex.value = correctSelectedIndex(columnIndex, rowIndex, selectedIndex.value)
}

/**
 * 获取列数据
 */
function getColumnsData() {
  return deepClone(formatColumns.value)
}

/**
 * 获取选中数据
 */
function getSelectedIndex() {
  return selectedIndex.value
}

function onPickStart() {
  emit('pickstart')
}

function onPickEnd() {
  emit('pickend')
}

defineExpose<PickerViewExpose>({
  getSelects,
  getValues,
  setColumnData,
  getColumnsData,
  getColumnData,
  getColumnIndex,
  getLabels,
  getSelectedIndex
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
