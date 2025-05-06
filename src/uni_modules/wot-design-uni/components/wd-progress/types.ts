/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2024-11-30 00:01:23
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-progress/types.ts
 * 记得注释
 */
import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../common/props'

export type ProgressStatus = 'success' | 'danger' | 'warning' // 状态类型

export type ProgressColor = {
  color: string // 颜色
  percentage: number // 百分比
}

export const progressProps = {
  ...baseProps,
  /**
   * 进度数值，最大值100
   */
  percentage: makeNumberProp(0),
  /**
   * 是否隐藏进度条上的文字，默认值为false
   */
  hideText: makeBooleanProp(false),
  /**
   * 进度条颜色
   */
  color: {
    type: [String, Array] as PropType<string | string[] | ProgressColor[]>
  },
  /**
   * 进度增加1%所需毫秒数
   */
  duration: makeNumberProp(30),
  /**
   * 进度条状态
   */
  status: String as PropType<ProgressStatus>
}
