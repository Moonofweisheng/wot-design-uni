/*
 * @Author: weisheng
 * @Date: 2025-01-25 23:46:29
 * @LastEditTime: 2025-02-13 13:16:45
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-curtain/types.ts
 * 记得注释
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type ClosePosition = 'inset' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export const curtainProps = {
  ...baseProps,
  /**
   * 绑定值，展示/关闭幕帘
   * @deprecated 请使用 modelValue
   */
  value: makeBooleanProp(false),
  /**
   * 绑定值，展示/关闭幕帘
   */
  modelValue: makeBooleanProp(false),
  /**
   * 关闭按钮位置，可选值：inset / top / bottom / top-left / top-right / bottom-left / bottom-right
   */
  closePosition: makeStringProp<ClosePosition>('inset'),
  /**
   * 幕帘图片地址，必须使用网络地址
   */
  src: String,
  /**
   * 幕帘图片点击链接
   */
  to: String,
  /**
   * 幕帘图片宽度
   */
  width: Number,
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickModal: makeBooleanProp(false),
  /**
   * 是否当关闭时将弹出层隐藏（display: none)
   */
  hideWhenClose: makeBooleanProp(true),
  /**
   * 设置层级
   * 类型：number
   * 默认值：10
   */
  zIndex: makeNumberProp(10),
  /**
   * 自定义关闭按钮的类名
   * 类型：string
   * 默认值：''
   */
  customCloseClass: makeStringProp(''),
  /**
   * 自定义关闭按钮的样式
   * 类型：string
   * 默认值：''
   */
  customCloseStyle: makeStringProp(''),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   */
  rootPortal: makeBooleanProp(false)
}

export type CurtainProps = ExtractPropTypes<typeof curtainProps>
