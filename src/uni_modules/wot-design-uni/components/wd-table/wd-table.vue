<template>
  <view class="wd-table" :style="rootStyle">
    <scroll-view class="wd-table__header" :scroll-left="left" enable-flex="true" scroll-x>
      <view :class="`wd-table__cell ${column.fixed ? 'is-fixed' : ''}`" v-for="(column, index) in columns" :key="index">
        <text>{{ column.label }}</text>
      </view>
    </scroll-view>
    <scroll-view class="wd-table__body" scroll-x="true" scroll-y="true" enable-flex="true" @scroll="doScroll">
      <slot></slot>
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
import { computed, getCurrentInstance, nextTick, onMounted, provide, ref, watch } from 'vue'
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
  rowHeight: '80rpx'
})

// 监听数据源变化改变privide出去的$dataSource
watch(
  props,
  () => {
    $props.value = props
  },
  { deep: true }
)

const left = ref<number>(0) // scroll-view 滚动距离
const scrollWidth = ref<number | string>('auto') // 动态设置滚动宽度，兼容微信scroll-view中sticky失效的问题
const columns = ref<Array<Record<string, any>>>([]) // 数据列
const $props = ref<Props>(props)
const emit = defineEmits(['click', 'sort-method', 'row-click'])
const scroll = debounce(doScroll, 100, false) // 滚动事件

/**
 * 根节点样式
 */
const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (isDef(props.height)) {
    style['height'] = addUnit(props.height)
  }
  return objToStyle(style)
})

/**
 * 根节点样式
 */
const headerStyle = computed(() => {
  return (width: string | number) => {
    const style: Record<string, string | number> = {}
    if (isDef(width)) {
      style['width'] = addUnit(width)
    }

    return objToStyle(style)
  }
})

const { proxy } = getCurrentInstance() as any
onMounted(() => {
  nextTick(() => {
    getRect('.header-container', false, proxy).then((data: any) => {
      if (data && data.width) {
        scrollWidth.value = addUnit(data.width)
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
  left.value = event.detail.scrollLeft
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
