/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2024-03-15 22:11:25
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-loading/types.ts
 * 记得注释
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeNumericProp, makeStringProp } from '../common/props'

// 'circle-outline' | 'circle-ring' 废弃
export type LoadingType = 'outline' | 'ring' | 'circle-outline' | 'circle-ring' // 提示信息加载状态类型

export const loadingProps = {
  ...baseProps,
  type: makeStringProp<LoadingType>('ring'),
  color: makeStringProp('#4D80F0'),
  size: makeNumericProp('32px')
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
