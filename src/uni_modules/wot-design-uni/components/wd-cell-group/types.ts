/*
 * @Author: weisheng
 * @Date: 2023-12-14 11:21:58
 * @LastEditTime: 2024-03-18 13:57:14
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-cell-group\types.ts
 * 记得注释
 */
import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp } from '../common/props'

export type CelllGroupProvide = {
  props: {
    border?: boolean
  }
}

export const CELL_GROUP_KEY: InjectionKey<CelllGroupProvide> = Symbol('wd-cell-group')

export const cellGroupProps = {
  ...baseProps,
  /**
   * 分组标题
   */
  title: String,
  /**
   * 分组右侧内容
   */
  value: String,
  /**
   * 分组启用插槽
   */
  useSlot: makeBooleanProp(false),
  /**
   * 是否展示边框线
   */
  border: makeBooleanProp(false)
}

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>
