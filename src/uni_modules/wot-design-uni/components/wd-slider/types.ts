import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

/**
 * 滑块值类型 - 单滑块为数字，双滑块为数组
 */
export type SliderValue = number | number[]

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
    type: [Number, Array] as PropType<SliderValue>,
    default: 0
  }
}

/**
 * 滑块拖动事件参数
 */
export interface SliderDragEvent {
  /**
   * 当前滑块的值
   * 单滑块模式为数字，双滑块模式为数组
   */
  value: SliderValue
}

/**
 * 滑块组件事件类型定义
 */
export type SliderEmits = {
  /**
   * 开始拖动滑块时触发
   */
  dragstart: [event: SliderDragEvent]

  /**
   * 拖动滑块过程中触发
   */
  dragmove: [event: SliderDragEvent]

  /**
   * 结束拖动滑块时触发
   */
  dragend: [event: SliderDragEvent]

  /**
   * 更新滑块值时触发，用于v-model绑定
   */
  'update:modelValue': [value: SliderValue]
}

export type SliderExpose = {
  /**
   * 初始化slider宽度
   */
  initSlider: () => void
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>

export type SliderInstance = ComponentPublicInstance<SliderProps, SliderExpose>
