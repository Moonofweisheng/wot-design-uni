/*
 * @Author: weisheng
 * @Date: 2023-12-14 11:21:58
 * @LastEditTime: 2024-01-03 21:51:36
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-cell-group/types.ts
 * 记得注释
 */
import { type InjectionKey } from 'vue'

export type CelllGroupProvide = {
  props: {
    border?: boolean
  }
}

export const CELL_GROUP_KEY: InjectionKey<CelllGroupProvide> = Symbol('wd-cell-group')
