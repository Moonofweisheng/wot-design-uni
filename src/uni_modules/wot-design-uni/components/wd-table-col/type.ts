import type { ExtractPropTypes } from 'vue'
import { makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

type AlignType = 'left' | 'center' | 'right' // 列的对齐方式

export type SortDirection = 0 | 1 | -1 // 列的排序方向

export interface TableColumn {
  // 列对应字段
  prop: string
  // 列对应字段标题
  label: string
  // 列宽度
  width: string
  // 是否开启列排序
  sortable?: boolean
  // 列的对齐方式，可选值left,center,right
  align?: AlignType
  // 列的排序方向
  sortDirection: SortDirection
  // 是否i固定列
  fixed?: boolean
}

export const tableColumnProps = {
  prop: makeRequiredProp(String), // 列对应字段
  label: makeRequiredProp(String), // 列对应字段标题
  width: makeNumberProp(100), // 列宽度，单位px
  sortable: makeBooleanProp(false), // 是否开启列排序
  fixed: makeBooleanProp(false), // 是否固定本列
  align: makeStringProp<AlignType>('left') // 列的对齐方式，可选值left,center,right
}

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>
