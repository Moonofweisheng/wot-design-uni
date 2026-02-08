import { baseProps, makeNumberProp, makeStringProp, makeArrayProp } from '../common/props'

export const qrCodeProps = {
  ...baseProps,
  /** 二维码内容 */
  text: makeStringProp(''),
  /** 二维码大小 */
  size: makeNumberProp(200),
  /** 二维码纠错级别 */
  correctLevel: makeStringProp('H'), // L, M, Q, H
  /** 二维码暗色 */
  colorDark: makeStringProp('#000000'),
  /** 二维码亮色 */
  colorLight: makeStringProp('#FFFFFF'),
  /** 二维码外边距 */
  margin: makeNumberProp(0),
  /** 二维码 Logo */
  logo: makeStringProp(''),
  /** Logo 宽度 */
  logoWidth: makeNumberProp(70),
  /** Logo 高度 */
  logoHeight: makeNumberProp(70),
  /** 二维码 Canvas ID */
  canvasId: makeStringProp(''),
  /** 二维码点类型
   * square: 方点
   * dots: 圆点
   * rounded: 圆角点
   * liquid: 液体点
   */
  dotType: makeStringProp('square'), // square, dots, rounded, liquid
  /** 二维码点缩放比例 */
  dotScale: makeNumberProp(1),
  /** 是否启用渐变 */
  enableGradient: { type: Boolean, default: false },
  /** 二维码渐变结束色 */
  gradientColor: makeStringProp('#000000'), // 渐变结束色
  /** 二维码渐变颜色列表，优先级高于 colorDark 和 gradientColor */
  gradientColors: makeArrayProp<string>(),
  /** 二维码渐变方向
   * diagonal: 对角线
   * horizontal: 水平
   * vertical: 垂直
   * number: 角度，如 45
   */
  gradientDirection: { type: [String, Number], default: 'diagonal' },
  /** 二维码 Logo 背景色 */
  logoBackgroundColor: makeStringProp('#FFFFFF'),
  /** 二维码 Logo 圆角 */
  logoRadius: makeNumberProp(0),
  /** 二维码 Logo 边框颜色 */
  logoBorderColor: makeStringProp(''), // 默认为透明或跟随背景
  /** 二维码 Logo 边框宽度 */
  logoBorderWidth: makeNumberProp(0),
  backgroundImage: makeStringProp('')
}
