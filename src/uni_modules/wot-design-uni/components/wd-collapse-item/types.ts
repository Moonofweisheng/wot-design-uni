import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeRequiredProp } from '../common/props'

export type CollapseItemBeforeExpand = (name: string) => void

export const collapseItemProps = {
  ...baseProps,
  /**
   * 折叠栏的标题
   */
  title: String,
  /**
   * 禁用折叠栏
   */
  disabled: makeBooleanProp(false),
  /**
   * 折叠栏的标识符
   */
  name: makeRequiredProp(String),
  /**
   * 打开前的回调函数，返回 false 可以阻止打开，支持返回 Promise
   */
  beforeExpend: Function as PropType<CollapseItemBeforeExpand>
}

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>

export type CollapseItemExpose = {
  /**
   * 获取展开状态
   * @returns boolean
   */
  getExpanded: () => boolean
}

export type CollapseItemInstance = ComponentPublicInstance<CollapseItemProps, CollapseItemExpose>
