/*
 * @Author: weisheng
 * @Date: 2024-03-18 11:22:03
 * @LastEditTime: 2024-11-24 23:04:55
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-segmented/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeRequiredProp, makeStringProp } from '../common/props'

export type SegmentedType = 'large' | 'middle' | 'small'

export interface SegmentedOption {
  value: string | number // 选中值
  disabled?: boolean // 是否禁用
  payload?: any // 更多数据
}

export const segmentedProps = {
  ...baseProps,

  /**
   * 当前选中的值
   * 类型: string | number
   * 最低版本: 0.1.23
   */
  value: makeRequiredProp([String, Number]),

  /**
   * 是否禁用分段器
   * 类型: boolean
   * 默认值: false
   * 最低版本: 0.1.23
   */
  disabled: makeBooleanProp(false),

  /**
   * 控件尺寸
   * 类型: string
   * 可选值: 'large' | 'middle' | 'small'
   * 默认值: 'middle'
   * 最低版本: 0.1.23
   */
  size: makeStringProp<SegmentedType>('middle'),

  /**
   * 数据集合
   * 类型: string[] | number[] | SegmentedOption[]
   * 必需: 是
   * 默认值: []
   * 最低版本: 0.1.23
   */
  options: {
    type: Array as PropType<string[] | number[] | SegmentedOption[]>,
    required: true,
    default: () => []
  },

  /**
   * 切换选项时是否振动
   * 类型: boolean
   * 默认值: false
   * 最低版本: 0.1.23
   */
  vibrateShort: makeBooleanProp(false)
}

export type SegmentedExpose = {
  /**
   * 更新滑块偏移量
   * @param animation 是否开启动画，默认开启
   */
  updateActiveStyle: (animation?: boolean) => void
}

export type SegmentedProps = ExtractPropTypes<typeof segmentedProps>

export type SegmentedInstance = ComponentPublicInstance<SegmentedProps, SegmentedExpose>
