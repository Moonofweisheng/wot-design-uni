import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export const tableProps = {
  ...baseProps,
  data: makeRequiredProp(Array<Record<string, any>>), // 显示的数据
  border: makeBooleanProp(true), // 是否带有边框
  stripe: makeBooleanProp(true), // 是否为斑马纹 table
  height: makeStringProp('80vh'), // Table 的高度
  rowHeight: makeNumberProp(50), // 行高
  showHeader: makeBooleanProp(true), // 是否显示表头
  ellipsis: makeBooleanProp(true) // 是否超出2行隐藏
}

export type TableProps = ExtractPropTypes<typeof tableProps>
