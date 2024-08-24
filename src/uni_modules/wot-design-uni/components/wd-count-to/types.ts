import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import type { TextType } from '../wd-text/types'

export const countToProps = {
  ...baseProps,

  // 字体大小
  fontSize: makeNumberProp(16),

  // 文本颜色
  color: makeStringProp(''),
  /**
   * 主题类型
   * 类型：string
   * 可选值：'default' /'primary' / 'error' / 'warning' / 'success'
   * 默认值：'default'
   */
  type: makeStringProp<TextType>('default'),
  /**
   * 起始值
   * 类型：number
   * 默认值：0
   */
  startVal: makeNumberProp(0),

  /**
   * 最终值
   * 类型：number
   * 默认值：2021
   */
  endVal: makeNumberProp(2024),

  /**
   * 从起始值到结束值数字变动的时间，单位毫秒
   * 类型：number
   * 默认值：3000
   */
  duration: makeNumberProp(3000),
  /**
   * 是否自动开始
   * 类型：boolean
   * 默认值：true
   */
  autoStart: makeBooleanProp(true),
  /**
   * 保留的小数位数
   * 类型：number
   * 默认值：0
   * 校验：大于等于0
   */
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value: number) {
      return value >= 0
    }
  },

  // 小数点
  decimal: makeStringProp('.'),

  // 三位三位的隔开效果
  separator: makeStringProp(','),

  /**
   * 前缀
   * 类型：string
   * 默认值：''
   * @example '¥' 人民币前缀
   */
  prefix: makeStringProp(''),

  /**
   * 后缀
   * 类型：string
   * 默认值：''
   */
  suffix: makeStringProp(''),

  /**
   * 是否具有连贯性
   * 类型：boolean
   * 默认值：true
   */
  useEasing: makeBooleanProp(true),

  /**
   * 自定义根节点样式
   */
  customStyle: makeStringProp(''),

  /**
   * 自定义根节点样式类
   */
  customClass: makeStringProp('')
}

export type CountDownProps = ExtractPropTypes<typeof countToProps>

export type CountUpExpose = {
  /**
   * 开始倒计时
   */
  start: () => void
  /**
   * 暂停倒计时
   */
  pause: () => void
  /**
   * 重设倒计时，若 auto-start 为 true，重设后会自动开始倒计时
   */
  reset: () => void
}

export type CountToInstance = ComponentPublicInstance<CountDownProps, CountUpExpose>
