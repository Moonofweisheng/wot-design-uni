import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export const imgCropperProps = {
  ...baseProps,
  /**
   * 打开图片裁剪组件
   */
  modelValue: makeBooleanProp(false),
  /**
   * 取消按钮文案
   */
  cancelButtonText: String,
  /**
   * 确认按钮文案
   */
  confirmButtonText: String,
  /**
   * 是否禁用旋转
   */
  disabledRotate: makeBooleanProp(false),
  /** canvas绘图参数 start **/
  /**
   * 目标文件的类型，wx.canvasToTempFilePath属性介绍
   */
  fileType: makeStringProp('png'),
  /**
   * 生成的图片质量 wx.canvasToTempFilePath属性介绍
   */
  quality: makeNumberProp(1),
  /**
   * 设置导出图片尺寸
   */
  exportScale: makeNumberProp(2),
  /** canvas绘图参数 end **/
  /**
   * 图片源路径
   */
  imgSrc: makeStringProp(''),
  /**
   * 图片宽
   */
  imgWidth: makeNumericProp(''),
  /**
   * 图片高
   */
  imgHeight: makeNumericProp(''),
  /**
   * 最大缩放
   */
  maxScale: makeNumberProp(3)
}

export type ImgCropperProps = ExtractPropTypes<typeof imgCropperProps>

export type ImgCropperExpose = {
  /**
   * 逆转是否使用动画
   */
  revertIsAnimation: (animation: boolean) => void
}
