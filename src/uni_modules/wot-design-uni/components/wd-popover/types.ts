import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type PlacementType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export type PopoverMode = 'menu' | 'normal'

export const popoverProps = {
  ...baseProps,
  customArrow: makeStringProp(''),
  customPop: makeStringProp(''),
  /**
   * 是否显示 popover 箭头
   */
  visibleArrow: makeBooleanProp(true),
  /**
   * 显示的内容，也可以通过 slot#content 传入
   */
  content: [String, Object] as PropType<string | Record<string, any>[]>,
  /**
   * 指定 popover 的放置位置：top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end
   */
  placement: makeStringProp<PlacementType>('bottom'),
  /**
   * 偏移量
   */
  offset: makeNumberProp(0),
  /**
   * 是否使用内容插槽
   */
  useContentSlot: makeBooleanProp(false),
  /**
   * 是否禁用 popover
   */
  disabled: makeBooleanProp(false),
  /**
   * 是否显示关闭按钮
   */
  showClose: makeBooleanProp(false),
  /**
   * 控制 popover 的显示状态
   */
  modelValue: makeBooleanProp(false),
  /**
   * 当前显示的模式，决定内容的展现形式，可选值：normal（普通模式）/ menu（菜单模式）
   */
  mode: makeStringProp<PopoverMode>('normal')
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export type PopoverExpose = {
  // 打开popover
  open: () => void
  // 关闭popover
  close: () => void
}
