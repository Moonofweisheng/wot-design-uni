<template>
  <view style="position: relative; overflow: hidden">
    <view class="wd-table--fixed" :style="fixedStyle">
      <view class="wd-table__header" v-if="showHeader">
        <view
          :class="`wd-table__cell ${column.fixed ? 'is-fixed' : ''}`"
          :style="headerCellStyle(column.width)"
          v-for="(column, index) in columns"
          :key="index"
        >
          <text>{{ column.label }}</text>
        </view>
      </view>

      <scroll-view class="wd-table__body" :style="fixedBodyStyle" :enable-flex="true" :scroll-y="true" :scroll-top="scrollTop">
        <view id="fixed-body" style="display: inline-block"><slot name="fixed"></slot></view>
      </scroll-view>
    </view>
    <scroll-view class="wd-table" :style="rootStyle" :scroll-x="true">
      <view class="wd-table__header" :style="rowStyle" v-if="showHeader">
        <view
          :class="`wd-table__cell ${column.fixed ? 'is-fixed' : ''}`"
          :style="headerCellStyle(column.width)"
          v-for="(column, index) in columns"
          :key="index"
        >
          <text>{{ column.label }}</text>
        </view>
      </view>
      <scroll-view class="wd-table__body" :style="bodyStyle" :enable-flex="true" :throttle="false" :scroll-y="true" @scroll="doScroll">
        <view :style="{ width: addUnit(fixedWidth), display: 'inline-block' }"></view>
        <slot></slot>
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
import { type CSSProperties, computed, getCurrentInstance, nextTick, onMounted, provide, ref, watch } from 'vue'
import { addUnit, debounce, deepClone, getRect, isDef, objToStyle } from '../common/util'

interface Props {
  // 显示的数据
  data: Array<any>
  // 是否带有边框
  bordered?: boolean
  // 是否为斑马纹 table
  stripe?: boolean
  // Table 的高度
  height?: string
  // 行高
  rowHeight?: number | string
  // 是否显示表头
  showHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 显示的数据
  data: () => [],
  // table行是否为斑马纹
  stripe: false,
  bordered: true,
  // table高度
  height: '80vh',
  // 行高
  rowHeight: '80rpx',
  // 是否显示表头
  showHeader: true
})

// 监听数据源变化改变privide出去的$dataSource
watch(
  props,
  () => {
    $props.value = props
  },
  { deep: true }
)

const scrollTop = ref<number>(0) // scroll-view 滚动距离
const scrollWidth = ref<number | string>('auto') // 动态设置滚动宽度，兼容微信scroll-view中sticky失效的问题
const columns = ref<Array<Record<string, any>>>([]) // 数据列
const $props = ref<Props>(props)
const emit = defineEmits(['click', 'sort-method', 'row-click'])
const fixedWidth = ref<number | string>(0) // 固定列宽度

/**
 * 根节点样式
 */
const rootStyle = computed(() => {
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

const headerHeight = ref<string | number>('80rpx') // 表格header高度

const fixedBodyStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.showHeader) {
    style['height'] = `calc(${props.height} - ${headerHeight.value})`
  }
  return `${objToStyle(style)}`
})

const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.showHeader) {
    style['height'] = `calc(${props.height} - ${headerHeight.value})`
  }
  return `${objToStyle(style)};${rowStyle.value}`
})

const { proxy } = getCurrentInstance() as any
onMounted(() => {
  nextTick(() => {
    getRect('#fixed-body', false, proxy).then((data: any) => {
      console.log(data)
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
function setColumns(column: Record<string, any>) {
  columns.value = deepClone([...columns.value, column])
}

/**
 * 表头单元格样式
 */
function headerCellStyle(width?: string | number) {
  const style: Record<string, string | number> = {}
  if (isDef(width)) {
    style['width'] = addUnit(width)
  }
  return objToStyle(style)
}

/**
 * 排序事件
 */
function doSort(column, index) {
  if (column.sortDirection === 'asc') {
    columns.value[index].sortDirection = 'desc'
  } else if (columns.value[index].sortDirection === 'desc') {
    columns.value[index].sortDirection = ''
  } else {
    columns.value[index].sortDirection = 'asc'
  }
  columns.value.forEach((col, i) => {
    if (index != i) {
      col.sortDirection = ''
    }
  })
  emit('sort-method', columns.value[index])
}
/**
 * 滚动事件
 */
function doScroll(event) {
  if (!props.showHeader) {
    return
  }
  scrollTop.value = event.detail.scrollTop
  if (scrollWidth.value !== event.detail.scrollWidth) {
    scrollWidth.value = addUnit(event.detail.scrollWidth)
  }
}

function setRowClick(index: number) {
  emit('row-click', { rowIndex: index })
}

provide('$props', $props) // 行高provide
provide('setRowClick', setRowClick)
provide('setColumns', setColumns)
</script>
<style lang="scss" scoped>
@import './index.scss';

scroll-view::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  border-radius: 0;
  background-color: transparent;
  color: transparent;
}
</style>
