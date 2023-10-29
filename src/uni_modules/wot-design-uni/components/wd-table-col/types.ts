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
