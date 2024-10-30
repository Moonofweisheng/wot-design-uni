/*
 * @Author: PdxLook
 * @Date: 2024-10-30 10:14:34
 * @LastEditTime: 2024-10-30 10:48:34
 * @LastEditors: PdxLook
 * @Description: 定义了加载页面组件的 props 属性及其类型，用于控制加载页面的显示内容和样式。
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-loading-page/types.ts
 */

import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

/**
 * 定义加载页面组件的属性，包括文本内容、颜色和加载状态等。
 * 可通过传递不同的 props 值来自定义组件的显示效果。
 */
export const loadingPageProps = {
  // 继承通用属性，便于在多个组件中重复使用
  ...baseProps,

  // 提示内容：加载页面显示的文本，默认为“正在加载”
  loadingText: makeStringProp('正在加载'),

  // 是否加载中：布尔值，指示是否处于加载状态，默认值为 false
  loading: makeBooleanProp(false),

  // 背景颜色：加载页面的背景色，默认为白色（#ffffff）
  bgColor: makeStringProp('#ffffff'),

  // 字体颜色：加载文本的颜色，默认为浅灰色（#C8C8C8）
  color: makeStringProp('#C8C8C8'),

  // 字体大小：加载文本的字号大小，默认为 16px
  fontSize: makeStringProp('16px'),

  // 加载图标颜色：加载动画的颜色，默认为浅灰色（#C8C8C8）
  loadingColor: makeStringProp('#C8C8C8'),

  // 文字上方用于替换loading动画的图片：路径默认为空字符串；如有值，替换默认的加载动画
  loadingImage: makeStringProp('')
}

export type LoadingPageProps = ExtractPropTypes<typeof loadingPageProps>
