/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2024-03-18 15:32:11
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-progress\types.ts
 * 记得注释
 */
import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../common/props'

export type ProgressStatus = 'success' | 'danger' // 状态类型

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
    type: [String, Array, Object] as PropType<string | string[] | Record<string, any>[]>,
    default: 'linear-gradient(315deg, rgba(81,124,240,1) 0%,rgba(118,158,245,1) 100%)'
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
