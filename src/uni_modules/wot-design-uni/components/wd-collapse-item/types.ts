import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeRequiredProp, makeStringProp } from '../common/props'

export type CollapseItemBeforeExpand = (name: string) => boolean | Promise<unknown>

export const collapseItemProps = {
  ...baseProps,
  /**
   * 自定义折叠栏内容容器样式类名
   */
  customBodyClass: makeStringProp(''),
  /**
   * 自定义折叠栏内容容器样式
   */
  customBodyStyle: makeStringProp(''),
  /**
   * 折叠栏的标题, 可通过 slot 传递自定义内容
   */
  title: makeStringProp(''),
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
  /**
   * 更新展开状态
   */
  updateExpand: () => Promise<void>
}

export type CollapseItemInstance = ComponentPublicInstance<CollapseItemProps, CollapseItemExpose>
