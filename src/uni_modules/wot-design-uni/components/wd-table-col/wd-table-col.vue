<template>
  <view
    :class="`wd-table-col ${fixed ? 'wd-table-col--fixed' : ''} ${isLastFixed && isDef(parent.scrollLeft) && parent.scrollLeft ? 'is-shadow' : ''}`"
    :style="columnStyle"
  >
    <view
      :class="`wd-table__cell ${stripe && isOdd(index) ? 'is-stripe' : ''} ${border ? 'is-border' : ''} is-${align}`"
      v-for="(row, index) in column"
      :key="index"
      :style="cellStyle"
      @click="handleRowClick(index)"
    >
      <slot name="value" v-if="$slots.value" :row="scope(index)"></slot>
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
import { type CSSProperties, computed, inject, onMounted } from 'vue'
import { addUnit, isDef, objToStyle, isOdd } from '../common/util'

type AlignType = 'left' | 'center' | 'right'

interface Props {
  // 列对应字段
  prop: string
  // 列对应字段标题
  label: string
  // 列宽度
  width?: number | string
  // 是否开启列排序
  sortable?: boolean
  // 是否固定本列
  fixed?: boolean
  // 列的对齐方式，可选值left,center,right
  align?: AlignType
}

const props = withDefaults(defineProps<Props>(), {
  sortable: false, // 是否开启列排序
  fixed: false, // 是否固定本列
  width: 100, // 列宽度，单位px
  align: 'left' // 列对齐方式
})

const parent = inject<any>('wdTable', { data: [] }) // table数据

// 是否开启斑马纹
const stripe = computed(() => {
  return parent.stripe || false
})

/**
 * 是否有边框
 */
const border = computed(() => {
  return parent.border || false
})

/**
 * 是否超出省略
 */
const ellipsis = computed(() => {
  return parent.ellipsis || false
})

/**
 * 是否最后一个固定元素
 */
const isLastFixed = computed(() => {
  let isLastFixed: boolean = false
  if (props.fixed && isDef(parent.columns)) {
    const columns = parent.columns.filter((column) => {
      return column.fixed
    })
    if (columns.length && columns[columns.length - 1].prop === props.prop) {
      isLastFixed = true
    }
  }
  return isLastFixed
})

const columnStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.width)) {
    // width存在且包含px则转成px
    style['width'] = addUnit(props.width)
  }
  if (props.fixed) {
    const columnIndex: number = parent.columns.findIndex((column) => {
      return column.prop === props.prop
    })
    if (columnIndex > 0) {
      let left: string | number = ''
      parent.columns.forEach((column, index) => {
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
})

const cellStyle = computed(() => {
  const rowHeight: string | number = parent.rowHeight || '80rpx' // 自定义行高
  const style: CSSProperties = {}
  if (isDef(rowHeight)) {
    // width存在且包含px则转成px
    style['height'] = addUnit(rowHeight)
  }
  if (props.fixed) {
    const columnIndex: number = parent.columns.findIndex((column) => {
      return column.prop === props.prop
    })
    if (columnIndex > 0) {
      let left: string | number = ''
      parent.columns.forEach((column, index) => {
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
})

// 行完整数据
const scope = computed(() => {
  return (index: number) => {
    return parent.data[index] || {}
  }
})

// 列数据
const column = computed(() => {
  let column: any[] = parent.data.map((item) => {
    return item[props.prop]
  })
  return column
})

onMounted(() => {
  parent.setColumns &&
    parent.setColumns({
      prop: props.prop,
      label: props.label,
      width: props.width,
      sortable: props.sortable,
      fixed: props.fixed,
      align: props.align,
      sortDirection: 0
    })
})

/**
 * 行点击事件
 * @param index 行下标
 */
function handleRowClick(index: number) {
  parent.setRowClick && parent.setRowClick(index)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
