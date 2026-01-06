/**
 * @Author: North
 * @Date: 2026-01-06
 * @LastEditTime: 2026-01-06
 * @LastEditors: North
 * @Description: Week Date 周日期组件类型定义
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-week-date/types.ts
 */

import type { PropType } from 'vue'
import { baseProps, makeNumericProp, makeRequiredProp, makeStringProp } from '../common/props'

export type WeekStart = 0 | 1

export type WeekDateItem = {
  /** 完整日期字符串，格式为 YYYY-MM-DD */
  fullDate: string
  /** 日期，格式为 DD */
  date: string
  /** 星期标签，如 '一'、'二' */
  week: string
  /** 是否为选中日期 */
  isActive: boolean
  /** 是否为禁用日期 */
  isDisabled: boolean
}

export type WeekChangeEvent = {
  /** 当前周的日期字符串，格式为 YYYY-MM-DD */
  date: string
  /** 切换类型 'prev'（上一周） 'next'（下一周） */
  type: 'prev' | 'next'
}

export const weekDateProps = {
  ...baseProps,
  /**
   * 双向绑定值
   */
  modelValue: makeRequiredProp([Number, String, Date] as PropType<number | string | Date>),

  /**
   * 周起始日
   * 0: 周日
   * 1: 周一
   * @default 1
   */
  weekStart: makeNumericProp<WeekStart>(1),

  /**
   * 选中形状，可选值为 square、circle
   * @default square
   */
  shape: makeStringProp<'square' | 'circle'>('square'),

  /**
   * 禁用日期函数，参数为日期对象，返回值为布尔值，返回 true 则表示该日期被禁用
   */
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    default: undefined
  }
}
