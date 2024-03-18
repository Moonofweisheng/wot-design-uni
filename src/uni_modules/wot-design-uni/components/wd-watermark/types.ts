import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export const watermarkProps = {
  ...baseProps,
  /**
   * 显示内容
   */
  content: makeStringProp(''),
  /**
   * 显示图片的地址，支持网络图片和base64（钉钉小程序仅支持网络图片）
   */
  image: makeStringProp(''),
  /**
   * 图片高度
   */
  imageHeight: makeNumberProp(100),
  /**
   * 图片高度
   */
  imageWidth: makeNumberProp(100),
  /**
   * X轴间距，单位px
   */
  gutterX: makeNumberProp(0),
  /**
   * Y轴间距，单位px
   */
  gutterY: makeNumberProp(0),
  /**
   * canvas画布宽度，单位px
   */
  width: makeNumberProp(100),
  /**
   * canvas画布高度，单位px
   */
  height: makeNumberProp(100),
  /**
   * 是否为全屏水印
   */
  fullScreen: makeBooleanProp(true),
  /**
   * 水印字体颜色
   */
  color: makeStringProp('#8c8c8c'),
  /**
   * 水印字体大小，单位px
   */
  size: makeNumberProp(14),
  /**
   * 水印字体样式（仅微信和h5支持），可能的值：normal、italic、oblique
   */
  fontStyle: makeStringProp('normal'),
  /**
   * 水印字体的粗细（仅微信和h5支持）
   */
  fontWeight: makeNumericProp('normal'),
  /**
   * 水印字体系列（仅微信和h5支持）
   */
  fontFamily: makeStringProp('PingFang SC'),
  /**
   * 水印旋转角度
   */
  rotate: makeNumberProp(-25),
  /**
   * 自定义层级
   */
  zIndex: makeNumberProp(1100),
  /**
   * 自定义透明度，取值 0~1
   */
  opacity: makeNumberProp(0.5)
}

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>
