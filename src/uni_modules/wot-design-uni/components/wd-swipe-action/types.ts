import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type SwipeActionStatus = 'left' | 'close' | 'right'

// 点击关闭按钮、滑动关闭按钮、通过控制value关闭按钮
export type SwipeActionReason = 'click' | 'swipe' | 'value'

export type SwipeActionPosition = SwipeActionStatus | 'inside'

export type SwipeActionBeforeClose = (reason: SwipeActionReason, position: SwipeActionPosition) => void

export const swipeActionProps = {
  ...baseProps,

  /**
   * 滑动按钮的状态，使用v-model进行双向绑定。
   * 可选值为：'left'（左滑）、'close'（关闭状态）、'right'（右滑）。
   * 类型：string
   * 默认值：'close'
   */
  modelValue: makeStringProp<SwipeActionStatus>('close'),

  /**
   * 是否禁用滑动操作。
   * 类型：boolean
   * 默认值：false
   */
  disabled: makeBooleanProp(false),

  /**
   * 在关闭滑动按钮前调用的钩子函数。
   * 可以在此函数中执行一些关闭前的操作，如确认提示等。
   * 类型：function
   * 默认值：无
   */
  beforeClose: Function as PropType<SwipeActionBeforeClose>
}

export type SwipeActionProps = ExtractPropTypes<typeof swipeActionProps>
