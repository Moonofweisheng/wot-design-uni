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

export const tooltipProps = {
  ...baseProps,
  customArrow: makeStringProp(''),
  customPop: makeStringProp(''),
  visibleArrow: makeBooleanProp(true),
  content: {
    type: [String, Array<Record<string, any>>] as PropType<string | Array<Record<string, any>>>
  },
  placement: makeStringProp<PlacementType>('bottom'),
  offset: makeNumberProp(0),
  useContentSlot: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  showClose: makeBooleanProp(false),
  modelValue: makeBooleanProp(false)
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
