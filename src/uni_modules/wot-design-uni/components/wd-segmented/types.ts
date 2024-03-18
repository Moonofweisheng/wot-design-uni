import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeRequiredProp, makeStringProp } from '../common/props'

export type SegmentedType = 'large' | 'middle' | 'small'

export interface SegmentedOption {
  value: string | number // 选中值
  disabled?: boolean // 是否禁用
  payload?: any // 更多数据
}

/**
 * 分段器信息
 */
export interface SegmentedInfo {
  height: number
  width: number
}

export const segmentedProps = {
  ...baseProps,
  value: makeRequiredProp([String, Number]),
  disabled: makeBooleanProp(false),
  size: makeStringProp<SegmentedType>('middle'),
  options: {
    type: Array as PropType<string[] | number[] | SegmentedOption[]>,
    required: true,
    default: () => []
  },
  vibrateShort: makeBooleanProp(false)
}
