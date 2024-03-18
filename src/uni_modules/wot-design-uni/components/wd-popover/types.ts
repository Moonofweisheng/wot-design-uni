import type { PropType } from 'vue'
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
  // 是否显示 popover 箭头
  visibleArrow: makeBooleanProp(true),
  // 显示内容
  content: [String, Object] as PropType<string | Record<string, any>[]>,
  placement: makeStringProp<PlacementType>('bottom'),
  offset: makeNumberProp(0),
  useContentSlot: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  showClose: makeBooleanProp(false),
  modelValue: makeBooleanProp(false),
  mode: makeStringProp<PopoverMode>('normal')
}
