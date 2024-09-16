import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

/**
 * 引导类型： step分步骤 card卡片
 */
export type TTourType = 'step' | 'card'

/**
 * 数据配置参数
 */
export interface IStepOptions {
  /**
   * 引导目标元素，可以是元素选择器，也可以是元素对象
   */
  target: Element | string
  /**
   *引导内容
   */
  content?: string
  /**
   * 自定义内容样式
   */
  contentStyle?: Record<any, any>
  /**
   * 自定义引导样式
   */
  popupStyle?: Record<any, any>
}

/**
 * 节点信息参数
 */

export interface IRect<T extends number | string> {
  width?: T
  height?: T
  top?: T
  right?: T
  bottom?: T
  left?: T
  maxWidth?: any
}

export const tourOptions = {
  ...baseProps,

  /**
   * 是否显示步骤引导
   * 类型：boolean
   */
  modelValue: makeBooleanProp(false),
  /**
   * 引导类型，step步骤引导 card卡片引导，默认为 step
   * 类型：string
   */
  type: {
    type: String as PropType<TTourType>,
    default: 'step'
  },
  /**
   * 引导数据配置
   * 类型：Array<IStepOptions>
   */
  steps: {
    type: Array as PropType<IStepOptions[]>,
    default: () => []
  },
  /**
   * 当前步骤，默认为0
   * 类型：number
   */
  current: makeNumberProp(0),
  /**
   * 上一步引导标题
   * 类型：string
   */
  nextStepTxt: makeStringProp('下一步'),
  /**
   * 下一步引导标题
   * 类型：string
   */
  prevStepTxt: makeStringProp('上一步'),
  /**
   * 完成引导标题
   * 类型：string
   */
  completeTxt: makeStringProp('完成'),
  /**
   * 是否显示上一步按钮
   * 类型：boolean
   */
  showPrevStep: makeBooleanProp(true),
  /**
   * 遮罩层是否显示，默认为true
   * 类型：boolean
   */
  mask: makeBooleanProp(true),

  /**
   * 内容框是否显示指示箭头
   */
  arrow: makeBooleanProp(true),

  /**
   * 是否显示关闭按钮
   */
  showClose: makeBooleanProp(true),
  /**
   * 点击遮罩层是否关闭
   */
  closeOnClickOverlay: makeBooleanProp(true),
  /**
   * 背景色
   */
  bgColor: makeStringProp('#fff'),
  /**
   * 步骤进度
   */
  showProgress: makeBooleanProp(true)
}
