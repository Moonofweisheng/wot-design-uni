<template>
  <view :class="`wd-table ${border ? 'is-border' : ''} ${customClass}`" :style="tableStyle">
    <template v-if="fixedHeader">
      <scroll-view
        :enable-flex="true"
        :throttle="false"
        :scrollLeft="state.scrollLeft"
        :scroll-x="true"
        class="wd-table__header"
        @scroll="scroll"
        v-if="showHeader"
      >
        <view id="table-header" class="wd-table__content wd-table__content--header" :style="realWidthStyle">
          <view
            :class="`wd-table__cell ${border ? 'is-border' : ''} ${column.fixed ? 'is-fixed' : ''} ${stripe ? 'is-stripe' : ''} is-${column.align} ${
              getIsLastFixed(column) && state.scrollLeft ? 'is-shadow' : ''
            }`"
            :style="getCellStyle(index)"
            v-for="(column, index) in children"
            :key="index"
          >
            <wd-sort-button
              v-model="column.$.exposed!.sortDirection.value"
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
        :scrollLeft="state.scrollLeft"
      >
        <view id="table-body" class="wd-table__content" :style="realWidthStyle">
          <wd-table-col
            v-if="index !== false"
            :prop="indexColumn.prop"
            :label="indexColumn.label"
            :width="indexColumn.width"
            :sortable="indexColumn.sortable"
            :fixed="indexColumn.fixed"
            :align="indexColumn.align"
          >
            <template #value="{ index }">
              <text>{{ index + 1 }}</text>
            </template>
          </wd-table-col>
          <slot></slot>
        </view>
      </scroll-view>
    </template>
    <!-- 非固定表头时使用单个scroll-view -->
    <template v-else>
      <scroll-view class="wd-table__wrapper" :enable-flex="true" :throttle="false" :scroll-x="true" @scroll="scroll" :scrollLeft="state.scrollLeft">
        <view class="wd-table__inner" :style="realWidthStyle">
          <!-- 表头部分 -->
          <view v-if="showHeader" class="wd-table__header-row">
            <view
              v-for="(column, index) in children"
              :key="index"
              :class="`wd-table__cell ${border ? 'is-border' : ''} ${column.fixed ? 'is-fixed' : ''} ${stripe ? 'is-stripe' : ''} is-${
                column.align
              } ${getIsLastFixed(column) && state.scrollLeft ? 'is-shadow' : ''}`"
              :style="getCellStyle(index)"
            >
              <wd-sort-button
                v-if="column.sortable"
                v-model="column.$.exposed!.sortDirection.value"
                allow-reset
                :line="false"
                :title="column.label"
                @change="({ value }) => handleSortChange(value, index)"
              />
              <text v-else :class="`wd-table__value ${ellipsis ? 'is-ellipsis' : ''}`">{{ column.label }}</text>
            </view>
          </view>

          <!-- 表格内容部分 -->
          <view class="wd-table__content" :style="bodyStyle">
            <wd-table-col
              v-if="index !== false"
              :prop="indexColumn.prop"
              :label="indexColumn.label"
              :width="indexColumn.width"
              :sortable="indexColumn.sortable"
              :fixed="indexColumn.fixed"
              :align="indexColumn.align"
            >
              <template #value="{ index }">
                <text>{{ index + 1 }}</text>
              </template>
            </wd-table-col>
            <slot></slot>
          </view>
        </view>
      </scroll-view>
    </template>
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
import wdTableCol from '../wd-table-col/wd-table-col.vue'
import wdSortButton from '../wd-sort-button/wd-sort-button.vue'
import { type CSSProperties, computed, reactive, ref } from 'vue'
import { addUnit, debounce, isDef, isObj, objToStyle, uuid } from '../common/util'
import type { SortDirection, TableColumn, TableColumnInstance, TableColumnProps } from '../wd-table-col/types'
import { TABLE_KEY, tableProps, type TableProvide } from './types'
import WdTableCol from '../wd-table-col/wd-table-col.vue'
import { useTranslate } from '../composables/useTranslate'
import { useChildren } from '../composables/useChildren'

const { translate } = useTranslate('tableCol')

const props = defineProps(tableProps)
const emit = defineEmits(['sort-method', 'row-click'])

const state = reactive({
  scrollLeft: 0
})

const { linkChildren, children } = useChildren<TableColumnInstance, TableProvide>(TABLE_KEY)

linkChildren({ props, state, rowClick, getIsLastFixed, getFixedStyle })

const indexUUID = uuid()
const indexColumn = ref<TableColumnProps>({
  prop: indexUUID,
  label: translate('indexLabel'),
  width: '100rpx',
  sortable: false,
  fixed: false,
  align: 'left',
  ...(isObj(props.index) ? props.index : {})
})

const scroll = debounce(handleScroll, 100, { leading: false }) // 滚动事件

/**
 * 容器样式
 */
const tableStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.height)) {
    style['max-height'] = addUnit(props.height)
  }
  return `${objToStyle(style)}${props.customStyle}`
})

const realWidthStyle = computed(() => {
  const style: CSSProperties = {
    display: 'flex'
  }
  let width: string | number = ''
  children.forEach((child) => {
    width = width ? `${width} + ${addUnit(child.width)}` : addUnit(child.width)
  })
  style['width'] = `calc(${width})`
  return objToStyle(style)
})

const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.height)) {
    style['height'] = isDef(props.rowHeight) ? `calc(${props.data.length} * ${addUnit(props.rowHeight)})` : `calc(${props.data.length} * 50px)`
  }
  return `${objToStyle(style)}`
})

/**
 * 是否最后一个固定元素
 * @param column 列数据
 */
function getIsLastFixed(column: { fixed: boolean; prop: string }) {
  let isLastFixed: boolean = false
  if (column.fixed && isDef(children)) {
    const columns = children.filter((child) => {
      return child.fixed
    })
    if (columns.length && columns[columns.length - 1].prop === column.prop) {
      isLastFixed = true
    }
  }
  return isLastFixed
}

/**
 * 表头单元格样式
 */
function getCellStyle(columnIndex: number) {
  let style: CSSProperties = {}
  if (isDef(children[columnIndex].width)) {
    style['width'] = addUnit(children[columnIndex].width)
  }
  if (children[columnIndex].fixed) {
    style = getFixedStyle(columnIndex, style)
  }
  return objToStyle(style)
}

/**
 * 获取固定列样式
 * @param columnIndex
 */
function getFixedStyle(columnIndex: number, style: CSSProperties) {
  if (columnIndex > 0) {
    let left: string | number = ''
    children.forEach((column, index) => {
      if (index < columnIndex) {
        left = left ? `${left} + ${addUnit(column.width)}` : addUnit(column.width)
      }
    })
    style['left'] = `calc(${left})`
  } else {
    style['left'] = 0
  }
  return style
}

/**
 * 排序
 * @param value
 * @param index
 */
function handleSortChange(value: SortDirection, index: number) {
  children[index].$.exposed!.sortDirection.value = value
  children.forEach((col, i) => {
    if (index != i) {
      col.$.exposed!.sortDirection.value = 0
    }
  })
  const column: TableColumn = {
    // 列对应字段
    prop: children[index].prop,
    // 列对应字段标题
    label: children[index].label,
    // 列宽度
    width: children[index].width,
    // 是否开启列排序
    sortable: children[index].sortable,
    // 列的对齐方式，可选值left,center,right
    align: children[index].align,
    // 列的排序方向
    sortDirection: value,
    // 是否i固定列
    fixed: children[index].fixed
  }
  emit('sort-method', column)
}

/**
 * 滚动事件
 */
function handleScroll(event: any) {
  state.scrollLeft = event.detail.scrollLeft
}

function rowClick(index: number) {
  emit('row-click', { rowIndex: index })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
