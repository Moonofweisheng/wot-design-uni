import { baseProps, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export const backtopProps = {
  ...baseProps,
  /**
   * 页面滚动距离
   */
  scrollTop: makeRequiredProp(Number),
  /**
   * 距离顶部多少距离时显示
   */
  top: makeNumberProp(300),
  /**
   * 返回顶部滚动时间
   */
  duration: makeNumberProp(100),
  /**
   * 层级
   */
  zIndex: makeNumberProp(10),
  /**
   * icon样式
   */
  iconStyle: makeStringProp(''),
  /**
   * 形状
   */
  shape: makeStringProp('circle'),
  /**
   * 距离屏幕底部距离
   */
  bottom: makeNumberProp(100),
  /**
   * 距离屏幕右边距离
   */
  right: makeNumberProp(20)
}
