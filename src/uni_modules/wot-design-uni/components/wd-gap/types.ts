import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export const gapProps = {
  ...baseProps,
  /**
   * 背景颜色
   */
  bgColor: makeStringProp('transparent'),
  /**
   * 是否开启底部安全区
   */
  safeAreaBottom: makeBooleanProp(false),
  /**
   * 高度
   */
  height: makeNumericProp(15)
}
