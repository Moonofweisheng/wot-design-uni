/*
 * @Author: weisheng
 * @Date: 2023-12-14 11:21:58
 * @LastEditTime: 2024-01-03 21:37:58
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-grid/types.ts
 * 记得注释
 */
import { type InjectionKey } from 'vue'

export type GridProvide = {
  props: { clickable?: boolean; square?: boolean; column?: number; border?: boolean; bgColor?: string; gutter?: number }
}

export const GRID_KEY: InjectionKey<GridProvide> = Symbol('wd-grid')
