/*
 * @Author: weisheng
 * @Date: 2024-03-15 11:36:12
 * @LastEditTime: 2024-03-18 15:36:59
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-table\types.ts
 * 记得注释
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export const tableProps = {
  ...baseProps,
  /**
   * 显示的数据
   */
  data: makeRequiredProp(Array<Record<string, any>>),
  /**
   * 是否带有边框
   */
  border: makeBooleanProp(true),
  /**
   * 是否为斑马纹 table
   */
  stripe: makeBooleanProp(true),
  /**
   * Table 的高度
   */
  height: makeStringProp('80vh'),
  /**
   * 行高
   */
  rowHeight: makeNumberProp(50),
  /**
   * 是否显示表头
   */
  showHeader: makeBooleanProp(true),
  /**
   * 是否超出2行隐藏
   */
  ellipsis: makeBooleanProp(true)
}

export type TableProps = ExtractPropTypes<typeof tableProps>
