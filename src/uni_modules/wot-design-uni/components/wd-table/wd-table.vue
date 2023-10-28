<template>
  <view :class="`wd-table-content ${border ? 'is-border' : ''}`">
    <view :class="`wd-table--fixed ${isShadow ? 'is-shadow' : ''}`" :style="fixedStyle" v-if="$slots.fixed">
      <view class="wd-table__header" v-if="showHeader">
        <view
          :class="`wd-table__cell ${border ? 'is-border' : ''} ${stripe ? 'is-stripe' : ''} is-${column.align}`"
          :style="headerCellStyle(column.width)"
          v-for="(column, index) in columns"
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
          <text v-else :class="`wd-table__value  ${ellipsis ? 'is-ellipsis' : ''}`">{{ column.label }}</text>
        </view>
      </view>

      <scroll-view class="wd-table__body" :style="fixedBodyStyle" :enable-flex="true" :throttle="false" :scroll-y="true" :scroll-top="scrollTop">
        <view style="display: inline-flex" id="fixed-body">
          <slot name="fixed"></slot>
        </view>
      </scroll-view>
    </view>
    <scroll-view class="wd-table" :style="wraperStyle" :scroll-x="true" :throttle="false" @scroll="handleWraperScroll">
      <view class="wd-table__header" id="table-header" :style="rowStyle" v-if="showHeader">
        <view
          :class="`wd-table__cell ${border ? 'is-border' : ''} ${stripe ? 'is-stripe' : ''} is-${column.align}`"
          :style="headerCellStyle(column.width)"
          v-for="(column, index) in columns"
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
      <scroll-view class="wd-table__body" :style="bodyStyle" :enable-flex="true" :throttle="false" :scroll-y="true" @scroll="handleBodyScroll">
        <view style="display: flex">
          <view :style="{ width: addUnit(fixedWidth) }"></view>
          <slot></slot>
        </view>
      </scroll-view>
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
import { type CSSProperties, computed, getCurrentInstance, nextTick, onMounted, provide, ref, watch, reactive } from 'vue'
import { addUnit, deepClone, getRect, isDef, objToStyle } from '../common/util'
import type { SortDirection, TableColumn } from '../wd-table-col/types'

const a = ref(0)

interface Props {
  // 显示的数据
  data: Array<any>
  // 是否带有边框
  border?: boolean
  // 是否为斑马纹 table
  stripe?: boolean
  // Table 的高度
  height?: string
  // 行高
  rowHeight?: number | string
  // 是否显示表头
  showHeader?: boolean
  // 是否超出2行隐藏
  ellipsis?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 显示的数据
  data: () => [],
  // table行是否为斑马纹
  stripe: false,
  border: true,
  // table高度
  height: '80vh',
  // 行高
  rowHeight: 50,
  // 是否显示表头
  showHeader: true,
  // 是否超出2行隐藏
  ellipsis: true
})

// 监听数据源变化改变privide出去的$dataSource
watch(
  () => props.data,
  (newValue) => {
    parentData.data = newValue
  },
  { deep: true }
)

const scrollTop = ref<number>(0) // scroll-view 滚动距离
const scrollWidth = ref<number | string>('auto') // 动态设置滚动宽度，兼容微信scroll-view中sticky失效的问题
const columns = ref<TableColumn[]>([]) // 数据列
const fixedWidth = ref<number | string>(0) // 固定列宽度
const isShadow = ref<boolean>(false) // 是否展示shadow

const parentData = reactive({
  data: props.data,
  stripe: props.stripe,
  border: props.border,
  height: props.height,
  rowHeight: props.rowHeight,
  showHeader: props.showHeader,
  ellipsis: props.ellipsis,
  setRowClick,
  setColumns
})

provide('wdTable', parentData)

const emit = defineEmits(['click', 'sort-method', 'row-click'])

/**
 * 容器样式
 */
const wraperStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.height)) {
    style['height'] = addUnit(props.height)
  }
  return objToStyle(style)
})

/**
 * 根节点样式
 */
const fixedStyle = computed(() => {
  const style: CSSProperties = {}
  if (fixedWidth.value) {
    style['width'] = addUnit(fixedWidth.value)
  }
  return objToStyle(style)
})

const rowStyle = computed(() => {
  const style: CSSProperties = {}
  let width: string | number = ''
  columns.value.forEach((column) => {
    width = width ? `${width} + ${addUnit(column.width)}` : addUnit(column.width)
  })
  style['width'] = `calc(${width})`
  return objToStyle(style)
})

const headerHeight = ref<string | number>(50) // 表格header高度

const fixedBodyStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.showHeader) {
    style['height'] = `calc(${props.height} - ${addUnit(headerHeight.value)})`
  }
  return `${objToStyle(style)}`
})

const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.showHeader) {
    style['height'] = `calc(${props.height} - ${addUnit(headerHeight.value)})`
  }
  return `${objToStyle(style)};${rowStyle.value}`
})

const { proxy } = getCurrentInstance() as any
onMounted(() => {
  nextTick(() => {
    if (props.showHeader) {
      getRect('#table-header', false, proxy).then((data: any) => {
        if (data && data.height) {
          headerHeight.value = data.height
        }
      })
    }
    getRect('#fixed-body', false, proxy).then((data: any) => {
      if (data && data.width) {
        fixedWidth.value = data.width
      }
    })
  })
})

/**
 * 设置列
 * @param column 列
 */
function setColumns(column: TableColumn) {
  columns.value = deepClone([...columns.value, column])
}

/**
 * 表头单元格样式
 */
function headerCellStyle(width?: string | number) {
  const style: CSSProperties = {}
  if (isDef(width)) {
    style['width'] = addUnit(width)
  }
  return objToStyle(style)
}

function handleSortChange(value: SortDirection, index: number) {
  columns.value[index].sortDirection = value
  columns.value.forEach((col, i) => {
    if (index != i) {
      col.sortDirection = 0
    }
  })
  emit('sort-method', columns.value[index])
}

/**
 * 滚动事件
 */
function handleBodyScroll(event) {
  if (!props.showHeader) {
    return
  }
  scrollTop.value = event.detail.scrollTop
  if (scrollWidth.value !== event.detail.scrollWidth) {
    scrollWidth.value = addUnit(event.detail.scrollWidth)
  }
}

/**
 * 滚动事件
 */
function handleWraperScroll(event) {
  if (event.detail.scrollLeft) {
    isShadow.value = true
  } else {
    isShadow.value = false
  }
}

function setRowClick(index: number) {
  emit('row-click', { rowIndex: index })
}
</script>

<!-- <script module="touch" lang="wxs">

function touchstart(event, ins) {
  console.log(event);
  console.log(ins);
}
function touchend(event, ins) {
  console.log(event);
  console.log(ins);
}

function transitionend(event, ins) {
  console.log(event);
  console.log(ins);
}

module.exports= {
  touchstart,
  touchend,
  transitionend
}
</script> -->
<style lang="scss" scoped>
@import './index.scss';

// scroll-view::-webkit-scrollbar {
//   display: none;
//   width: 0;
//   height: 0;
//   border-radius: 0;
//   background-color: transparent;
//   color: transparent;
// }
</style>
