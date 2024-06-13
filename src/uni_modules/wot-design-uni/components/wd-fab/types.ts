import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import type { PropType } from 'vue'

export type FabType = 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default'
export type FabPosition = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom'
export type FabDirection = 'top' | 'right' | 'bottom' | 'left'
export type FabGap = Partial<Record<FabDirection, number>>
export const fabProps = {
  ...baseProps,
  /**
   * 是否激活
   */
  active: makeBooleanProp(false),
  /**
   * 类型，可选值为 default primary info success warning error
   */
  type: makeStringProp<FabType>('primary'),
  /**
   * 悬浮按钮位置，可选值为 left-top right-top left-bottom right-bottom
   */
  position: makeStringProp<FabPosition>('right-bottom'),
  /**
   * 悬浮按钮菜单弹出方向，可选值为 top bottom left right
   */
  direction: makeStringProp<FabDirection>('top'),
  /**
   * 是否禁用
   */
  disabled: makeBooleanProp(false),
  /**
   * 悬浮按钮未展开时的图标
   */
  inactiveIcon: makeStringProp('add'),
  /**
   * 悬浮按钮展开时的图标
   */
  activeIcon: makeStringProp('close'),
  /**
   * 自定义悬浮按钮层级
   */
  zIndex: makeNumberProp(99),
  /**
   * 是否可拖动
   */
  draggable: makeBooleanProp(false),
  gap: {
    type: Object as PropType<FabGap>,
    default: () => ({})
  }
}

export type FabProps = ExtractPropTypes<typeof fabProps>

export type FabExpose = {
  // 展开菜单
  open: () => void
  // 收起菜单
  close: () => void
}

export type FabInstance = ComponentPublicInstance<FabProps, FabExpose>
