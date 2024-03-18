import { baseProps, makeBooleanProp, makeStringProp, numericProp } from '../common/props'

export const imgProps = {
  ...baseProps,
  customImage: makeStringProp(''),
  /**
   * 图片链接
   */
  src: String,
  /**
   * 是否显示为圆形
   */
  round: makeBooleanProp(false),
  /**
   * 填充模式：'top left' / 'top right' / 'bottom left' / 'bottom right' / 'right' / 'left' / 'center' / 'bottom' / 'top' / 'heightFix' / 'widthFix' / 'aspectFill' / 'aspectFit' / 'scaleToFill'
   */
  mode: makeStringProp('scaleToFill'),
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
  radius: numericProp
}
