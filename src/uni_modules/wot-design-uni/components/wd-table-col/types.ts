import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { makeBooleanProp, makeNumericProp, makeRequiredProp, makeStringProp } from '../common/props'

export type AlignType = 'left' | 'center' | 'right' // 列的对齐方式

export type SortDirection = 0 | 1 | -1 // 列的排序方向

export interface TableColumn {
  // 列对应字段
  prop: string
  // 列对应字段标题
  label: string
  // 列宽度
  width: string | number
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
  /**
   * 列对应字段
   */
  prop: makeRequiredProp(String),
  /**
   * 列对应字段标题
   */
  label: makeRequiredProp(String),
  /**
   * 列宽度，单位px
   */
  width: makeNumericProp(100),
  /**
   * 是否开启列排序
   */
  sortable: makeBooleanProp(false),
  /**
   * 是否固定本列
   */
  fixed: makeBooleanProp(false),
  /**
   * 列的对齐方式，可选值left,center,right
   */
  align: makeStringProp<AlignType>('left')
}

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>

export type TableColumnInstance = ComponentPublicInstance<TableColumnProps>
