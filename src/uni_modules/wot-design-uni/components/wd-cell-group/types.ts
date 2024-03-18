/*
 * @Author: weisheng
 * @Date: 2023-12-14 11:21:58
 * @LastEditTime: 2024-03-15 21:09:24
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-cell-group/types.ts
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
  title: String,
  value: String,
  useSlot: makeBooleanProp(false),
  border: makeBooleanProp(false)
}

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>
