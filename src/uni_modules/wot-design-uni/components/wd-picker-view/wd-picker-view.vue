<template>
  <view :class="`wd-picker-view ${customClass}`">
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
import { deepClone, getType, isEqual, range } from '../common/util'
import { ColumnItem, formatArray } from './type'

interface Props {
  customClass?: string
  // 加载中
  loading: boolean
  loadingColor: string
  // 选项总高度
  columnsHeight: number
  // 选项对象中，value对应的 key
  valueKey: string
  // 选项对象中，展示的文本对应的 key
  labelKey: string
  // 初始值
  modelValue: string | number | boolean | Array<string | number | boolean>
  // 选择器数据
  columns: Array<string | number | ColumnItem | Array<string | number | ColumnItem>>
  // 多级联动
  // eslint-disable-next-line @typescript-eslint/ban-types
  columnChange?: Function
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  loading: false,
  loadingColor: '#4D80F0',
  columnsHeight: 217,
  valueKey: 'value',
  labelKey: 'label',
  columns: () => []
})

// 格式化之后，用于render 列表的数据
const formatColumns = ref<Array<Array<Record<string, any>>>>([])
const itemHeight = ref<number>(35)
const selectedIndex = ref<Array<number>>([]) // 格式化之后，每列选中的下标集合
const preSelectedIndex = ref<Array<number>>([])

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (!isEqual(oldValue, newValue)) {
      selectWithValue(newValue)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columns,
  (newValue) => {
    // props初始化的时候格式化formatColumns交给value的observer来做
    formatColumns.value = formatArray(newValue, props.valueKey, props.labelKey)
    /**
     * 每次改变都要重置选中项
     * 1.选中每列的第一个
     * 2.原来的value再选一次
     */
    // this.data.formatColumns.forEach((no, col) => this.selectWithIndex(col, 0))
    selectWithValue(props.modelValue)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => selectedIndex.value,
  (newValue) => {
    if (isEqual(newValue, preSelectedIndex.value)) return
    if (!isEqual(getValues(), props.modelValue)) {
      handleChange(0)
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
    if (newValue && getType(newValue) !== 'function') {
      throw Error('The type of columnChange must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)
const { proxy } = getCurrentInstance() as any

const emit = defineEmits(['change', 'pickstart', 'pickend', 'update:modelValue'])

/**
 * @description 根据传入的value，寻找对应的索引，并传递给原生选择器。
 * 会保证formatColumns先设置，之后会修改selectedIndex。
 * @param {String|Number|Boolean|Array<String|Number|Boolean|Array<any>>}value
 */
function selectWithValue(value) {
  if (props.columns.length === 0) return

  // 使其默认选中首项
  if (value === '' || value === null || value === undefined || (getType(value) === 'array' && value.length === 0)) {
    value = formatColumns.value.map((col) => {
      return col[0][props.valueKey]
    })
  }
  const valueType = getType(value)
  const type = ['string', 'number', 'boolean', 'array']
  if (type.indexOf(valueType) === -1) throw Error(`value must be one of ${type.toString()}`)
  // 在props初始化的时候有可能会调用此函数，此时需要保证formatColumns已经被设置，关于此问题更多详情参考/ISSUE.md。
  if (formatColumns.value.length === 0) {
    formatColumns.value = formatArray(props.columns, props.valueKey, props.labelKey)
  }
  /**
   * 1.单key转为Array<key>
   * 2.根据formatColumns的长度截取Array<String>，保证下面的遍历不溢出
   * 3.根据每列的key值找到选项中value为此key的下标并记录
   */
  value = value instanceof Array ? value : [value]
  value = value.slice(0, formatColumns.value.length)

  if (value.length === 0) {
    value = formatColumns.value.map(() => 0)
  }

  let selected: number[] = deepClone(selectedIndex.value)
  value.forEach((target, col) => {
    let row = formatColumns.value[col].findIndex((row) => {
      return row[props.valueKey].toString() === target.toString()
    })
    row = row === -1 ? 0 : row
    selected = selectWithIndex(col, row)
  })
  /** 根据formatColumns的长度去除selectWithIndex无用的部分。
   * 始终保持value、selectWithIndex、formatColumns长度一致
   */
  selectedIndex.value = selected.slice(0, value.length)
}

/**
 * @description 根据传入的col,row，传递给原生选择器
 * @param {Number} columnIndex 要操作的列索引
 * @param {Number} rowIndex 要选中的行索引
 * @return {Boolean} 是否设置成功
 */
function selectWithIndex(columnIndex, rowIndex) {
  const col = formatColumns.value[columnIndex]
  if (!col || !col[rowIndex]) {
    throw Error(`The value to select with Col:${columnIndex} Row:${rowIndex} is correct`)
  }
  const select: number[] = deepClone(selectedIndex.value)
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
  } else {
    select[columnIndex] = rowIndex
  }
  selectedIndex.value = deepClone(select)
  return selectedIndex.value
}

/**
 * @description 滚动选中时更新选中的索引、触发change事件
 * @return {Number|Array<Number>}选中项的下标或者集合
 * @return {Object}实例本身
 */
function onChange({ detail: { value } }) {
  value = value.map((v) => {
    return Number(v || 0)
  })
  const index = getChangeDiff(value)
  selectedIndex.value = deepClone(value)

  nextTick(() => {
    // 执行多级联动
    if (props.columnChange) {
      // columnsChange 可能有异步操作，需要添加 resolve 进行回调通知，形参小于4个则为同步
      if (props.columnChange.length < 4) {
        props.columnChange(proxy.$.exposed, getSelects(), index)
        handleChange(index)
      } else {
        props.columnChange(proxy.$.exposed, getSelects(), index, () => {
          // 如果selectedIndex只有一列，返回此项；如果是多项，返回所有选中项。
          handleChange(index)
        })
      }
    } else {
      // 如果selectedIndex只有一列，返回此项；如果是多项，返回所有选中项。
      handleChange(index)
    }
  })
}

function getChangeIndex(now, origin) {
  if (!now || !origin) return
  const index = now.findIndex((row, index) => row !== origin[index])
  return index
}

function getChangeDiff(value: number[]) {
  // 小程序bug 1. 修改原生pickerView的columns，滑动触发change事件回传的数组长度为未改变columns之前的,并不会缩减
  // 小程序bug 2. 当点击速度过快时，会出现负数列项的操作，需要将value进行限制
  value = value.slice(0, formatColumns.value.length)

  // 保留选中前的
  const origin: number[] = deepClone(selectedIndex.value)
  // 存储赋值旧值，便于外部比较
  let selected: number[] = deepClone(selectedIndex.value)
  // 开始应用最新的值
  value.forEach((row, col) => {
    row = range(row, 0, formatColumns.value[col].length - 1)
    if (row === origin[col]) return
    selected = selectWithIndex(col, row)
  })
  selectedIndex.value = selected
  preSelectedIndex.value = origin

  // diff出变化的列
  // const diffCol = selectedIndex.findIndex((row, index) => row !== origin[index])
  const diffCol = getChangeIndex(selected, origin)
  if (diffCol === -1) return

  // 获取变化的的行
  const diffRow = selected[diffCol]

  // 如果selectedIndex只有一列，返回选中项的索引；如果是多项，返回选中项所在的列。
  return selected.length === 1 ? diffRow : diffCol
}

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
 * @description 获取所有列选中项的value，返回值为一个数组
 */
function getValues() {
  const { valueKey } = props
  const values = selectedIndex.value.map((row, col) => formatColumns.value[col][row][valueKey])

  if (values.length === 1) {
    return values[0]
  }
  return values
}

/**
 * @description 获取所有列选中项的label，返回值为一个数组
 * @return {Array} 每列选中的label
 */
function getLabels() {
  const { labelKey } = props
  return selectedIndex.value.map((row, col) => formatColumns.value[col][row][labelKey])
}

/**
 * @description 获取某一列的选中项下标
 * @param {Number} columnIndex 列的下标
 * @returns {Number} 下标
 */
function getColumnIndex(columnIndex) {
  return selectedIndex.value[columnIndex]
}

/**
 * @description 获取某一列的选项
 * @param {Number} columnIndex 列的下标
 * @returns {Array<{valueKey,labelKey}>} 当前列的集合
 */
function getColumnData(columnIndex) {
  return formatColumns.value[columnIndex]
}

/**
 * @description 获取某一列的选项
 * @param {Number} columnIndex 列的下标
 * @param {Array<原始值|Object>} 一维数组，元素仅限对象和原始值
 * @param {Number} jumpTo 更换列数据后停留的地点
 */
function setColumnData(columnIndex, data, jumpTo = 0) {
  /**
   * @注意 以下为pickerView的坑
   * 如果某一列(以下简称列)中有10个选项，而且当前选中第10项。
   * 如果此时把此列的选项修改后还剩下3个，那么选中项会由第10项滑落到第3项，同时出发change事件
   */
  // 为了防止上述情况发生，修改数据前先将当前列选中0
  selectedIndex.value = selectWithIndex(columnIndex, jumpTo)
  // 经过formatArray处理的数据会变成二维数组，一定要拍成一维的。
  // ps 小程序基础库v2.9.3才可以用flat
  formatColumns.value[columnIndex] = formatArray(data, props.valueKey, props.labelKey).reduce((acc, val) => acc.concat(val), [])
}

function getColumnsData() {
  return formatColumns.value.slice(0)
}

function onPickStart() {
  emit('pickstart')
}

function onPickEnd() {
  emit('pickend')
}

defineExpose({
  getSelects,
  getValues,
  setColumnData,
  getColumnsData,
  getColumnData,
  getColumnIndex,
  getLabels,
  selectedIndex
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
