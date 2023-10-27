<template>
  <view :class="`wd-table-col`" :style="rootStyle">
    <view
      :class="`wd-table__cell ${stripe && isOdd(index) ? 'is-stripe' : ''} ${border ? 'is-border' : ''} is-${align}`"
      v-for="(row, index) in column"
      :key="index"
      :style="rowStyle"
      @click="handleRowClick(index)"
    >
      <slot v-if="$slots.default" :row="scope(index)"></slot>
      <view class="cell" v-else>{{ row }}</view>
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
import { Ref, computed, inject, onMounted, ref } from 'vue'
import { addUnit, isDef, objToStyle, isOdd } from '../common/util'

type AlignType = 'left' | 'center' | 'right'

interface Props {
  // 列对应字段
  prop: string
  // 列对应字段标题
  label: string
  // 列宽度
  width?: number
  // 是否开启列排序
  sortable?: boolean
  // 是否高亮
  lightHigh?: boolean
  // 列的对齐方式，可选值left,center,right
  align?: AlignType
}

const props = withDefaults(defineProps<Props>(), {
  sortable: false, // 是否开启列排序
  lightHigh: false, // 是否高亮
  width: 100, // 列宽度，单位px
  align: 'left'
})

// eslint-disable-next-line @typescript-eslint/ban-types
const setColumns: Function = inject('setColumns') as Function // 设置列数据.
// eslint-disable-next-line @typescript-eslint/ban-types
const setRowClick: Function = inject('setRowClick') as Function
const $props = inject<Ref>('$props') || ref({}) // table数据

// 是否开启斑马纹
const stripe = computed(() => {
  return $props.value.stripe || false
})

/**
 * 是否有边框
 */
const border = computed(() => {
  return $props.value.border || false
})

/**
 * 根节点样式
 */
const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (isDef(props.width)) {
    // width存在且包含px则转成px
    style['width'] = addUnit(props.width)
  }

  return objToStyle(style)
})

const rowStyle = computed(() => {
  const rowHeight: string | number = $props.value.rowHeight || '80rpx' // 自定义行高
  const style: Record<string, string | number> = {}
  if (isDef(props.width)) {
    // width存在且包含px则转成px
    style['width'] = addUnit(props.width)
  }
  if (isDef(rowHeight)) {
    // width存在且包含px则转成px
    style['height'] = addUnit(rowHeight)
  }
  return objToStyle(style)
})

// 行完整数据
const scope = computed(() => {
  return (index: number) => {
    return $props.value.data[index] || {}
  }
})

// 列数据
const column = computed(() => {
  let column: any[] = $props.value.data.map((item) => {
    return item[props.prop]
  })
  return column
})

onMounted(() => {
  setColumns({
    prop: props.prop,
    label: props.label,
    width: props.width,
    sortable: props.sortable,
    lightHigh: props.lightHigh,
    align: props.align
  })
})

function handleRowClick(index: number) {
  setRowClick(index)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
