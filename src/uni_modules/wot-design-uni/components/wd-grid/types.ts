/*
 * @Author: weisheng
 * @Date: 2023-12-14 11:21:58
 * @LastEditTime: 2024-03-15 21:34:02
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-grid/types.ts
 * 记得注释
 */
import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type GridProvide = {
  props: { clickable?: boolean; square?: boolean; column?: number; border?: boolean; bgColor?: string; gutter?: number }
}

export const GRID_KEY: InjectionKey<GridProvide> = Symbol('wd-grid')

export const gridProps = {
  ...baseProps,
  clickable: makeBooleanProp(false),
  square: makeBooleanProp(false),
  column: Number,
  border: makeBooleanProp(false),
  bgColor: makeStringProp(''),
  gutter: Number
}

export type GridProps = ExtractPropTypes<typeof gridProps>
