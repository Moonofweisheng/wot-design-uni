/*
 * @Author: weisheng
 * @Date: 2024-06-03 23:43:43
 * @LastEditTime: 2024-06-06 22:03:57
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-slider/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export const sliderProps = {
  ...baseProps,

  /**
   * 自定义最小值的样式类名
   * 类型: string
   * 默认值: ''
   */
  customMinClass: makeStringProp(''),

  /**
   * 自定义最大值的样式类名
   * 类型: string
   * 默认值: ''
   */
  customMaxClass: makeStringProp(''),

  /**
   * 是否隐藏左右的最大最小值
   * 类型: boolean
   * 默认值: false
   */
  hideMinMax: makeBooleanProp(false),

  /**
   * 是否隐藏当前滑块值
   * 类型: boolean
   * 默认值: false
   */
  hideLabel: makeBooleanProp(false),

  /**
   * 是否禁用滑块
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),

  /**
   * 进度条未激活的背景颜色
   * 类型: string
   * 默认值: '#e5e5e5'
   */
  inactiveColor: makeStringProp('#e5e5e5'),

  /**
   * 进度条激活的背景颜色
   * 类型: string
   * 默认值: ''
   */
  activeColor: makeStringProp(''),

  /**
   * 滑块的最大值
   * 类型: number
   * 默认值: 100
   */
  max: makeNumberProp(100),

  /**
   * 滑块的最小值
   * 类型: number
   * 默认值: 0
   */
  min: makeNumberProp(0),

  /**
   * 滑块的步进值
   * 类型: number
   * 默认值: 1
   */
  step: makeNumberProp(1),

  /**
   * 滑块的值，如果为数组，则为双向滑块
   * 类型: number | number[]
   * 默认值: 0
   */
  modelValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0
  }
}

export type SliderExpose = {
  /**
   * 初始化slider宽度
   */
  initSlider: () => void
}

export type SliderInstance = ComponentPublicInstance<SliderExpose>
