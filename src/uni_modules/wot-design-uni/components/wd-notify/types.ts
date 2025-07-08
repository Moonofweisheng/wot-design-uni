import type { PropType, ExtractPropTypes } from 'vue'
import { makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export type NotifyType = 'primary' | 'success' | 'danger' | 'warning'
export type NotifyPosition = 'top' | 'bottom'
export type NotifyProps = Omit<Partial<ExtractPropTypes<typeof notifyProps>>, 'selector'> & {
  onClick?: (event: MouseEvent) => void
  onClosed?: () => void
  onOpened?: () => void
}
export type NotifyThemeVars = {
  notifyPadding?: string
  notifyFontSize?: string
  notifyTextColor?: string
  notifyLineHeight?: number | string
  notifyDangerBackground?: string
  notifyPrimaryBackground?: string
  notifySuccessBackground?: string
  notifyWarningBackground?: string
}
export const notifyProps = {
  /**
   * 类型，可选值为 primary success danger warning
   */
  type: makeStringProp<NotifyType>('danger'),
  /**
   * 字体颜色
   */
  color: makeStringProp(''),
  /**
   * 将组件的 z-index 层级设置为一个固定值
   */
  zIndex: makeNumberProp(99),
  /**
   * 显示
   */
  visible: makeBooleanProp(false),
  /**
   * 展示文案，支持通过\n换行
   */
  message: makeNumericProp(''),
  /**
   * 指定唯一标识
   */
  selector: makeStringProp(''),
  /**
   * 展示时长(ms)，值为 0 时，notify 不会消失
   */
  duration: makeNumberProp(3000),
  /**
   * 弹出位置，可选值为 top bottom
   */
  position: makeStringProp<NotifyPosition>('top'),
  /**
   * 顶部安全高度（
   */
  safeHeight: Number,
  /**
   * 背景颜色
   */
  background: makeStringProp(''),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   */
  rootPortal: makeBooleanProp(false)
}
