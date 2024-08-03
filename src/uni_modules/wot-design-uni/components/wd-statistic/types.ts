import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export const textProps = {
  ...baseProps,

  // 字体大小
  fontSize: makeNumberProp(16),

  // 文本颜色
  color: makeStringProp(''),

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
   * 从起始值到结束值数字变动的时间
   * 类型：number
   * 默认值：3000
   */
  duration: makeNumberProp(3000),

  /**
   * 是否自动播放
   * 类型：boolean
   * 默认值：true
   */
  autoplay: makeBooleanProp(true),

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
   * 是否隔一段时间数字跳动，这里的跳动是隔一段时间设置初始值
   * 类型：boolean
   * 默认值：false
   */
  isFrequent: makeBooleanProp(false),

  /**
   * 跳动间隔时间
   * 类型：number
   * 默认值：5000
   */
  frequentTime: makeNumberProp(5000),

  /**
   * 自定义根节点样式
   */
  customStyle: makeStringProp(''),

  /**
   * 自定义根节点样式类
   */
  customClass: makeStringProp('')
}

export type TextProps = ExtractPropTypes<typeof textProps>
