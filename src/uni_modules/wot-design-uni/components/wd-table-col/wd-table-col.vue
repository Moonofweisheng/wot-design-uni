<template>
  <view
    :class="`wd-table-col ${fixed ? 'wd-table-col--fixed' : ''} ${isLastFixed && isDef(table) && table.state.scrollLeft ? 'is-shadow' : ''}`"
    :style="columnStyle"
  >
    <view
      :class="`wd-table__cell ${stripe && isOdd(index) ? 'is-stripe' : ''} ${border ? 'is-border' : ''} is-${align}`"
      v-for="(row, index) in column"
      :key="index"
      :style="cellStyle"
      @click="handleRowClick(index)"
    >
      <slot name="value" v-if="$slots.value" :row="getScope(index)" :index="index"></slot>
      <text :class="`wd-table__value ${ellipsis ? 'is-ellipsis' : ''}`" v-else>{{ row }}</text>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-table-col',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { type CSSProperties, computed, ref } from 'vue'
import { addUnit, isDef, objToStyle, isOdd, isFunction } from '../common/util'
import { tableColumnProps, type SortDirection } from './types'
import { useParent } from '../composables/useParent'
import { TABLE_KEY } from '../wd-table/types'

const props = defineProps(tableColumnProps)

const { parent: table, index: columnIndex } = useParent(TABLE_KEY)

const sortDirection = ref<SortDirection>(0) // 排序方向

// 是否开启斑马纹
const stripe = computed(() => {
  if (isDef(table)) {
    return table.props.stripe
  } else {
    return false
  }
})

/**
 * 是否有边框
 */
const border = computed(() => {
  if (isDef(table)) {
    return table.props.border
  } else {
    return false
  }
})

/**
 * 是否超出省略
 */
const ellipsis = computed(() => {
  if (isDef(table)) {
    return table.props.ellipsis
  } else {
    return false
  }
})

/**
 * 是否最后一个固定元素
 */
const isLastFixed = computed(() => {
  let isLastFixed: boolean = false
  if (props.fixed && isDef(table)) {
    isLastFixed = table.getIsLastFixed(props)
  }
  return isLastFixed
})

/**
 * 列样式
 */
const columnStyle = computed(() => {
  let style: CSSProperties = {}
  if (isDef(props.width)) {
    style['width'] = addUnit(props.width)
  }
  if (props.fixed && isDef(table) && isFunction(table.getFixedStyle)) {
    style = table.getFixedStyle(columnIndex.value, style)
  }
  return style
})

/**
 * 单元格样式
 */
const cellStyle = computed(() => {
  let style: CSSProperties = {}
  const rowHeight: string | number = isDef(table) && isDef(table.props) ? table.props.rowHeight : 50 // 自定义行高
  if (isDef(rowHeight)) {
    style['height'] = addUnit(rowHeight)
  }
  if (props.fixed && isDef(table) && isFunction(table.getFixedStyle)) {
    style = table.getFixedStyle(columnIndex.value, style)
  }
  return objToStyle(style)
})

// 列数据
const column = computed(() => {
  if (!isDef(table) || !isDef(table.props) || !isDef(table.props.data) || !Array.isArray(table.props.data)) {
    return []
  }

  const column: any[] = table.props.data.map((item) => {
    return item[props.prop]
  })
  return column
})

/**
 * 行点击事件
 * @param index 行下标
 */
function handleRowClick(index: number) {
  if (!isDef(table)) {
    return
  }
  isFunction(table.rowClick) && table.rowClick(index)
}

// 行数据
function getScope(index: number) {
  if (!isDef(table) || !isDef(table.props) || !isDef(table.props.data) || !Array.isArray(table.props.data)) {
    return {}
  }
  return table.props.data[index] || {}
}

defineExpose({ sortDirection: sortDirection })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
