import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeStringProp } from '../common/props'

export const slideVerifyProps = {
  ...baseProps,
  /**
   * 滑动条宽度(单位:px)
   * @default 300
   */
  width: makeNumericProp(300),

  /**
   * 滑块高度(单位:px)
   * @default 40
   */
  height: makeNumericProp(40),

  /**
   * 容错范围(单位:px),距离终点多少距离内视为验证通过
   * @default 10
   */
  tolerance: makeNumericProp(10),

  /**
   * 提示文字
   * @default '向右滑动验证'
   */
  text: makeStringProp(''),

  /**
   * 验证成功提示文字
   * @default '验证通过'
   */
  successText: makeStringProp(''),

  /**
   * 是否禁用
   * @default false
   */
  disabled: makeBooleanProp(false),

  /**
   * 背景颜色
   * @default '#F5F7FA'
   */
  backgroundColor: makeStringProp('#F5F7FA'),

  /**
   * 激活时的背景颜色
   * @default '#49C75F'
   */
  activeBackgroundColor: makeStringProp('#49C75F'),

  /**
   * 滑块图标名称
   * @default 'a-chevron-rightdouble'
   */
  icon: makeStringProp('a-chevron-rightdouble'),

  /**
   * 成功图标名称
   * @default 'check'
   */
  successIcon: makeStringProp('check'),

  /**
   * 图标大小(单位:px)
   * @default 20
   */
  iconSize: makeNumericProp(20),

  /**
   * 成功图标大小(单位:px)
   * @default 12
   */
  successIconSize: makeNumericProp(12)
}

export type SlideVerifyProps = ExtractPropTypes<typeof slideVerifyProps>

export type SlideVerifyExpose = {
  /**
   * 重置验证组件到初始状态
   */
  reset: () => void
}

export type SlideVerifyInstance = ComponentPublicInstance<SlideVerifyProps, SlideVerifyExpose>
