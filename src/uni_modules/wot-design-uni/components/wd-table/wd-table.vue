<template>
  <view :class="`wd-table ${border ? 'is-border' : ''} ${customClass}`" :style="tableStyle">
    <scroll-view
      :enable-flex="true"
      :throttle="false"
      :scrollLeft="reactiveState.scrollLeft"
      :scroll-x="true"
      class="wd-table__header"
      @scroll="scroll"
      v-if="showHeader"
    >
      <view id="table-header" class="wd-table__content" :style="realWidthStyle" style="position: sticky; top: 0; z-index: 2">
        <view
          :class="`wd-table__cell ${border ? 'is-border' : ''} ${column.fixed ? 'is-fixed' : ''} ${stripe ? 'is-stripe' : ''} is-${column.align} ${
            isLastFixed(column) && reactiveState.scrollLeft ? 'is-shadow' : ''
          }`"
          :style="headerCellStyle(index)"
          v-for="(column, index) in reactiveState.columns"
          :key="index"
        >
          <wd-sort-button
            v-model="column.sortDirection"
            allow-reset
            :line="false"
            :title="column.label"
            @change="({ value }) => handleSortChange(value, index)"
            v-if="column.sortable"
          />
          <text v-else :class="`wd-table__value ${ellipsis ? 'is-ellipsis' : ''}`">{{ column.label }}</text>
        </view>
      </view>
    </scroll-view>
    <scroll-view
      class="wd-table__body"
      :style="bodyStyle"
      :enable-flex="true"
      :throttle="false"
      :scroll-x="true"
      @scroll="scroll"
      :scrollLeft="reactiveState.scrollLeft"
    >
      <view id="table-body" class="wd-table__content" :style="realWidthStyle">
        <slot></slot>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-table',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { type CSSProperties, computed, provide, watch, reactive } from 'vue'
import { addUnit, debounce, deepClone, isDef, objToStyle } from '../common/util'
import type { SortDirection, TableColumn } from '../wd-table-col/types'
import { tableProps } from './types'

const props = defineProps(tableProps)
const emit = defineEmits(['click', 'sort-method', 'row-click'])
const reactiveState = reactive({
  data: props.data,
  stripe: props.stripe,
  border: props.border,
  height: props.height,
  rowHeight: props.rowHeight,
  showHeader: props.showHeader,
  ellipsis: props.ellipsis,
  scrollLeft: 0,
  columns: [] as TableColumn[],
  setRowClick,
  setColumns
})

const scroll = debounce(handleScroll, 100, { leading: false }) // 滚动事件

provide('wdTable', reactiveState)

watch(
  () => props.data,
  (newValue) => {
    reactiveState.data = newValue
  },
  { deep: true }
)

watch(
  () => props.stripe,
  (newValue) => {
    reactiveState.stripe = newValue
  },
  { deep: true }
)

watch(
  () => props.border,
  (newValue) => {
    reactiveState.border = newValue
  },
  { deep: true }
)

watch(
  () => props.height,
  (newValue) => {
    reactiveState.height = newValue
  },
  { deep: true }
)

watch(
  () => props.rowHeight,
  (newValue) => {
    reactiveState.rowHeight = newValue
  },
  { deep: true }
)
watch(
  () => props.showHeader,
  (newValue) => {
    reactiveState.showHeader = newValue
  },
  { deep: true }
)

watch(
  () => props.ellipsis,
  (newValue) => {
    reactiveState.ellipsis = newValue
  },
  { deep: true }
)

/**
 * 容器样式
 */
const tableStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.height)) {
    style['max-height'] = addUnit(props.height)
  }
  return `${objToStyle(style)};${props.customStyle}`
})

const realWidthStyle = computed(() => {
  const style: CSSProperties = {
    display: 'flex'
  }
  let width: string | number = ''
  reactiveState.columns.forEach((column) => {
    width = width ? `${width} + ${addUnit(column.width)}` : addUnit(column.width)
  })
  style['width'] = `calc(${width})`
  return objToStyle(style)
})

const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.height)) {
    style['height'] = isDef(props.rowHeight) ? `calc(${props.data.length} * ${addUnit(props.rowHeight)})` : `calc(${props.data.length} * 50px)`
  }
  return `${objToStyle(style)};`
})

/**
 * 是否最后一个固定元素
 * @param column 列数据
 */
function isLastFixed(column: TableColumn) {
  let isLastFixed: boolean = false
  if (column.fixed && isDef(reactiveState.columns)) {
    const columns = reactiveState.columns.filter((column) => {
      return column.fixed
    })
    if (columns.length && columns[columns.length - 1].prop === column.prop) {
      isLastFixed = true
    }
  }
  return isLastFixed
}

/**
 * 设置列
 * @param column 列
 */
function setColumns(column: TableColumn) {
  reactiveState.columns = deepClone([...reactiveState.columns, column])
}

/**
 * 表头单元格样式
 */
function headerCellStyle(columnIndex: number) {
  const style: CSSProperties = {}
  if (isDef(reactiveState.columns[columnIndex].width)) {
    style['width'] = addUnit(reactiveState.columns[columnIndex].width)
  }
  if (reactiveState.columns[columnIndex].fixed) {
    if (columnIndex > 0) {
      let left: string | number = ''
      reactiveState.columns.forEach((column, index) => {
        if (index < columnIndex) {
          left = left ? `${left} + ${addUnit(column.width)}` : addUnit(column.width)
        }
      })
      style['left'] = `calc(${left})`
    } else {
      style['left'] = 0
    }
  }
  return objToStyle(style)
}

/**
 * 排序
 * @param value
 * @param index
 */
function handleSortChange(value: SortDirection, index: number) {
  reactiveState.columns[index].sortDirection = value
  reactiveState.columns.forEach((col, i) => {
    if (index != i) {
      col.sortDirection = 0
    }
  })
  emit('sort-method', reactiveState.columns[index])
}

/**
 * 滚动事件
 */
function handleScroll(event: any) {
  if (!props.showHeader) {
    return
  }
  reactiveState.scrollLeft = event.detail.scrollLeft
}

function setRowClick(index: number) {
  emit('row-click', { rowIndex: index })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
