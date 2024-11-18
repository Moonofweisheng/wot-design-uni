/*
 * @Author: weisheng
 * @Date: 2024-01-05 18:03:27
 * @LastEditTime: 2024-11-18 23:27:55
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-sidebar/types.ts
 * 记得注释
 */
import { type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'
import { baseProps, makeNumericProp } from '../common/props'

export type SidebarProvide = {
  props: Partial<SidebarProps>
  setChange: (value: number | string, label: string) => void
}

export const SIDEBAR_KEY: InjectionKey<SidebarProvide> = Symbol('wd-sidebar')

/**
 * Sidebar切换前的选项接口
 */
export type SidebarBeforeChangeOption = {
  // 目标值
  value: number | string
  resolve: (pass: boolean) => void
}

/**
 * Sidebar切换前的钩子函数类型
 * @param option 切换选项
 */
export type SidebarBeforeChange = (option: SidebarBeforeChangeOption) => void

export const sidebarProps = {
  ...baseProps,
  /**
   * 当前导航项的索引
   */
  modelValue: makeNumericProp(0),
  /**
   * 在改变前执行的函数
   */
  beforeChange: Function as PropType<SidebarBeforeChange>
}

export type SidebarProps = ExtractPropTypes<typeof sidebarProps>
