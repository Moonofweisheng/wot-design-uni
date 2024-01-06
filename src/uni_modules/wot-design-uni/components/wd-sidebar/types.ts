/*
 * @Author: weisheng
 * @Date: 2024-01-05 18:03:27
 * @LastEditTime: 2024-01-05 18:08:28
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-sidebar/types.ts
 * 记得注释
 */
import { type InjectionKey } from 'vue'

export type SidebarProvide = {
  props: {
    modelValue?: number | string
  }
  setChange: (value: number | string, label: string) => void
}

export const SIDEBAR_KEY: InjectionKey<SidebarProvide> = Symbol('wd-sidebar')
