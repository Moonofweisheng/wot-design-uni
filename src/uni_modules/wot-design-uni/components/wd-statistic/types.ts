import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, makeNumberProp } from '../common/props'

export const statisticProps = {
  ...baseProps,

  /**
   * 字体大小
   * 类型：number
   * 默认值：30
   */
  fontSize: makeNumberProp(30),

  /**
   * 字体颜色
   * 类型：string
   * 默认值：''
   */
  color: makeStringProp(''),

  /**
   * 起始值
   * 类型：String, Number
   * 默认值：0
   */
  startVal: {
    type: [String, Number] as PropType<string | number>,
    default: 0
  },

  /**
   * 最终值
   * 类型：String, Number
   * 默认值：2024
   */
  endVal: {
    type: [String, Number] as PropType<string | number>,
    default: 2024
  },

  /**
   * 从起始值到结束值数字变动的时间
   * 类型：Number
   * 默认值：3000
   */
  duration: makeNumberProp(3000),

  /**
   * 保留的小数位数
   * 类型：Number
   * 默认值：0
   */
  decimals: makeNumberProp(0),

  /**
   * 是否自动播放
   * 类型：boolean
   * 默认值：true
   */
  autoplay: makeBooleanProp(true),

  /**
   * 上了三位数分割的符号
   * 类型：string
   * 默认值：','
   */
  separator: makeStringProp(','),

  /**
   * 前缀
   * 类型：string
   * 默认值：''
   */
  prefix: makeStringProp(''),

  /**
   * 后缀
   * 类型：string
   * 默认值：''
   */
  suffix: makeStringProp(''),

  /**
   * 小数点分割符号
   * 类型：string
   * 默认值：'.'
   */
  decimal: makeStringProp('.')
}

export type TagProps = ExtractPropTypes<typeof statisticProps>
