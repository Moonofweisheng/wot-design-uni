import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
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

  /**
   * 自定义箭头内容
   * 类型：string
   */
  customArrow: makeStringProp(''),

  /**
   * 自定义弹出内容
   * 类型：string
   */
  customPop: makeStringProp(''),

  /**
   * 是否显示Tooltip箭头
   * 类型：boolean
   * 默认值：true
   */
  visibleArrow: makeBooleanProp(true),

  /**
   * 显示的内容，也可以通过`slot#content`传入
   * 类型：string | Array<Record<string, any>>
   * 默认值：无（根据传入值而定）
   */
  content: {
    type: [String, Array] as PropType<string | Array<Record<string, any>>>
  },

  /**
   * Tooltip的出现位置
   * 类型：string
   * 可选值：top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
   * 默认值：'bottom'
   */
  placement: makeStringProp<PlacementType>('bottom'),

  /**
   * 出现位置的偏移量
   * 类型：number
   * 默认值：0
   */
  // offset: makeNumberProp(0),
  offset: {
    // 需要支持数字、数组、对象类型
    type: [Number, Array, Object] as PropType<number | Array<number> | Record<'x' | 'y', number>>,
    default: 0
  },

  /**
   * 是否使用slot来传入content内容
   * 类型：boolean
   * 默认值：false
   */
  useContentSlot: makeBooleanProp(false),

  /**
   * Tooltip是否可用
   * 类型：boolean
   * 默认值：false
   */
  disabled: makeBooleanProp(false),

  /**
   * 是否显示Tooltip内部的关闭按钮
   * 类型：boolean
   * 默认值：false
   */
  showClose: makeBooleanProp(false),

  /**
   * Tooltip的状态是否可见，通过v-model绑定
   * 类型：boolean
   * 默认值：false
   */
  modelValue: makeBooleanProp(false)
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>

export type TooltipExpose = {
  // 打开tooltip
  open: () => void
  // 关闭tooltip
  close: () => void
}

export type TooltipInstance = ComponentPublicInstance<TooltipProps, TooltipExpose>
