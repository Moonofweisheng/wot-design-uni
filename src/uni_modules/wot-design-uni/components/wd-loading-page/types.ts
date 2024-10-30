/*
 * @Author: PdxLook
 * @Date: 2024-10-30 10:14:34
 * @LastEditTime: 2024-10-30 10:14:34
 * @LastEditors: PdxLook
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-loading-page/types.ts
 * 记得注释
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type LoadingType = 'outline' | 'ring' // 提示信息加载状态类型

export const loadingPageProps = {
  ...baseProps,
  // 提示内容
  loadingText: makeStringProp('正在加载'),

  // 是否加载中
  loading: makeBooleanProp(false),

  // 背景颜色
  bgColor: makeStringProp('#ffffff'),

  // 字体颜色
  color: makeStringProp('#C8C8C8'),

  // 字体大小
  fontSize: makeStringProp('16px'),

  // 加载图标颜色
  loadingColor: makeStringProp('#C8C8C8'),

  // 文字上方用于替换loading动画的图片
  loadingImage: makeStringProp('')
}

export type LoadingPageProps = ExtractPropTypes<typeof loadingPageProps>
