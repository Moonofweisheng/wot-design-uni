import type { PropType, ExtractPropTypes } from 'vue'

export type NotifyMessage = string | number
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
  type: {
    type: String as PropType<NotifyType>,
    default: 'danger'
  },
  /**
   * 字体颜色
   */
  color: {
    type: String,
    default: ''
  },
  /**
   * 将组件的 z-index 层级设置为一个固定值
   */
  zIndex: {
    type: Number,
    default: 99
  },
  /**
   * 显示
   */
  visible: {
    type: Boolean,
    default: false
  },
  /**
   * 展示文案，支持通过\n换行
   */
  message: {
    type: [Number, String] as PropType<NotifyMessage>,
    default: ''
  },
  /**
   * 指定唯一标识
   */
  selector: {
    type: String,
    default: ''
  },
  /**
   * 展示时长(ms)，值为 0 时，notify 不会消失
   */
  duration: {
    type: Number,
    default: 3000
  },
  /**
   * 弹出位置，可选值为 top bottom
   */
  position: {
    type: String as PropType<NotifyPosition>,
    default: 'top'
  },
  /**
   * 顶部安全高度（
   */
  safeHeight: {
    type: Number
  },
  /**
   * 背景颜色
   */
  background: {
    type: String,
    default: ''
  }
}
