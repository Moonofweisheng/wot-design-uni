import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
import { makeArrayProp, makeBooleanProp, makeStringProp } from '../common/props'

type SkeletonTheme = 'text' | 'avatar' | 'paragraph' | 'image'
type SkeletonAnimation = 'gradient' | 'flashed'
export type SkeletonRowColObj = {
  [key: string]: any
  type?: 'rect' | 'circle' | 'text'
  size?: string | number
  width?: string | number
  height?: string | number
  margin?: string | number
  background?: string
  marginLeft?: string | number
  marginRight?: string | number
  borderRadius?: string | number
  backgroundColor?: string
}
export type SkeletonRowCol = number | SkeletonRowColObj | Array<SkeletonRowColObj>
export type SkeletonThemeVars = {
  notifyPadding?: string
  notifyFontSize?: string
  notifyTextColor?: string
  notifyLineHeight?: number | string
  notifyDangerBackground?: string
  notifyPrimaryBackground?: string
  notifySuccessBackground?: string
  notifyWarningBackground?: string
}
export const skeletonProps = {
  /**
   * 骨架图风格，有基础、头像组合等两大类
   */
  theme: makeStringProp<SkeletonTheme>('text'),
  /**
   * 用于设置行列数量、宽度高度、间距等。
   * @example
   * 【示例一】，`[1, 1, 2]` 表示输出三行骨架图，第一行一列，第二行一列，第三行两列。
   * 【示例二】，`[1, 1, { width: '100px' }]` 表示自定义第三行的宽度为 `100px`。
   * 【示例三】，`[1, 2, [{ width, height }, { width, height, marginLeft }]]` 表示第三行有两列，且自定义宽度、高度和间距
   */
  rowCol: makeArrayProp<SkeletonRowCol>(),
  /**
   * 是否为加载状态，如果是则显示骨架图，如果不是则显示加载完成的内容
   * @default true
   */
  loading: makeBooleanProp(true),
  /**
   * 动画效果，有「渐变加载动画」和「闪烁加载动画」两种。值为空则表示没有动画
   */
  animation: {
    type: String as PropType<SkeletonAnimation>,
    default: ''
  },
  // 自定义类名
  customClass: {
    type: [String, Array, Object],
    default: ''
  },
  // 自定义样式
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default() {
      return {}
    }
  }
}

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
