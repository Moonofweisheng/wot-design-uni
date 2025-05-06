import { baseProps, makeBooleanProp, makeStringProp, numericProp } from '../common/props'
export type ImageMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

export const imgProps = {
  ...baseProps,
  customImage: makeStringProp(''),
  /**
   * 图片链接
   */
  src: String,
  /**
   * 预览图片链接
   */
  previewSrc: String,
  /**
   * 是否显示为圆形
   */
  round: makeBooleanProp(false),
  /**
   * 填充模式：'top left' / 'top right' / 'bottom left' / 'bottom right' / 'right' / 'left' / 'center' / 'bottom' / 'top' / 'heightFix' / 'widthFix' / 'aspectFill' / 'aspectFit' / 'scaleToFill'
   */
  mode: makeStringProp<ImageMode>('scaleToFill'),
  /**
   * 是否懒加载
   */
  lazyLoad: makeBooleanProp(false),
  /**
   * 宽度，默认单位为px
   */
  width: numericProp,
  /**
   * 高度，默认单位为px
   */
  height: numericProp,
  /**
   * 圆角大小，默认单位为px
   */
  radius: numericProp,
  /**
   * 是否允许预览
   */
  enablePreview: makeBooleanProp(false),
  /**
   * 开启长按图片显示识别小程序码菜单，仅在微信小程序平台有效
   */
  showMenuByLongpress: makeBooleanProp(false)
}
