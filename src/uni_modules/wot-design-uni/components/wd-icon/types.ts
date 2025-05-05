import { baseProps, makeRequiredProp, makeStringProp, numericProp } from '../common/props'

export const iconProps = {
  ...baseProps,
  /**
   * 使用的图标名字，可以使用链接图片
   */
  name: makeRequiredProp(String),
  /**
   * 图标的颜色
   */
  color: String,
  /**
   * 图标的字体大小
   */
  size: numericProp,
  /**
   * 类名前缀，用于使用自定义图标
   */
  classPrefix: makeStringProp('wd-icon')
}
