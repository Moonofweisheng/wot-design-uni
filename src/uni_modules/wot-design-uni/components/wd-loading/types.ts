/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2024-07-18 22:09:12
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-loading/types.ts
 * 记得注释
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeNumericProp, makeStringProp } from '../common/props'

export type LoadingType = 'outline' | 'ring' // 提示信息加载状态类型

export const loadingProps = {
  ...baseProps,
  /**
   * 加载指示器类型，可选值：'outline' | 'ring'
   */
  type: makeStringProp<LoadingType>('ring'),
  /**
   * 设置加载指示器颜色
   */
  color: makeStringProp('#4D80F0'),
  /**
   * 设置加载指示器大小
   */
  size: makeNumericProp('')
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
