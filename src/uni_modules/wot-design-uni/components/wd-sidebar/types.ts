/*
 * @Author: weisheng
 * @Date: 2024-01-05 18:03:27
 * @LastEditTime: 2024-03-18 15:52:37
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-sidebar\types.ts
 * 记得注释
 */
import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeNumericProp } from '../common/props'

export type SidebarProvide = {
  props: Partial<SidebarProps>
  setChange: (value: number | string, label: string) => void
}

export const SIDEBAR_KEY: InjectionKey<SidebarProvide> = Symbol('wd-sidebar')

export const sidebarProps = {
  ...baseProps,
  /**
   * 当前导航项的索引
   */
  modelValue: makeNumericProp(0)
}

export type SidebarProps = ExtractPropTypes<typeof sidebarProps>
