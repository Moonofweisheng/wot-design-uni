/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2024-03-15 23:09:15
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-progress/types.ts
 * 记得注释
 */
import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../common/props'

export type ProgressStatus = 'success' | 'danger' // 状态类型

export const progressProps = {
  ...baseProps,
  percentage: makeNumberProp(0),
  hideText: makeBooleanProp(false),
  color: {
    type: [String, Array, Object] as PropType<string | string[] | Record<string, any>[]>,
    default: 'linear-gradient(315deg, rgba(81,124,240,1) 0%,rgba(118,158,245,1) 100%)'
  },
  duration: makeNumberProp(30),
  status: String as PropType<ProgressStatus>
}
