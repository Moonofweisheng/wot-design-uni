import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export const imgCropperProps = {
  ...baseProps,
  modelValue: makeBooleanProp(false),
  cancelButtonText: String,
  confirmButtonText: String,
  // 是否禁用旋转
  disabledRotate: makeBooleanProp(false),
  /** canvas绘图参数 start **/
  // canvasToTempFilePath —— fileType
  fileType: makeStringProp('png'),
  // canvasToTempFilePath —— quality
  quality: makeNumberProp(1),
  // 设置导出图片尺寸
  exportScale: makeNumberProp(2),
  /** canvas绘图参数 end **/
  // 图片源路径
  imgSrc: makeStringProp(''),
  // 图片宽
  imgWidth: makeNumericProp(''),
  // 图片高
  imgHeight: makeNumericProp(''),
  // 最大缩放
  maxScale: makeNumberProp(3)
}
