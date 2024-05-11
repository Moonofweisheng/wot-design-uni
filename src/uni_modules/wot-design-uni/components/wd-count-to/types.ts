import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export const countToProps = {
  ...baseProps,
  /**
   * 开始的数值
   */
  startVal: makeNumberProp(0),
  /**
   * 结束数值
   */
  endVal: makeRequiredProp(Number),
  /**
   * 是否自动开始
   */
  autoStart: makeBooleanProp(true),
  /**
   * 持续时间
   */
  duration: makeNumberProp(2000),
  /**
   * decimals 显示的小数位数
   */
  decimals: makeNumberProp(0),
  /**
   * 字体大小
   */
  fontSize: makeStringProp(''),
  /**
   * 字体颜色
   */
  fontColor: makeStringProp(''),
  /**
   * 是否加粗
   */
  isBold: makeBooleanProp(false),
  /**
   * 分隔符
   */
  separator: makeStringProp('')
}

export type CountToProps = ExtractPropTypes<typeof countToProps>
export type CountToInstance = ComponentPublicInstance<CountToProps, CountToProps>
