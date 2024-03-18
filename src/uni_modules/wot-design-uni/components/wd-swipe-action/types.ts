import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type SwipeActionStatus = 'left' | 'close' | 'right'

// 点击关闭按钮、滑动关闭按钮、通过控制value关闭按钮
export type SwipeActionReason = 'click' | 'swipe' | 'value'

export type SwipeActionPosition = SwipeActionStatus | 'inside'

export type SwipeActionBeforeClose = (reason: SwipeActionReason, position: SwipeActionPosition) => void

export const swipeActionProps = {
  ...baseProps,
  beforeClose: Function as PropType<SwipeActionBeforeClose>, // 关闭前的钩子
  disabled: makeBooleanProp(false), // 禁用
  modelValue: makeStringProp<SwipeActionStatus>('close') // 使用 makeStringProp 工具函数
}

export type SwipeActionProps = ExtractPropTypes<typeof swipeActionProps>
