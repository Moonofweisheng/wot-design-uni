import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

// 进度条端点的形状，可选值为 "butt" | "round" | "square"
export type StrokeLinecapType = 'butt' | 'round' | 'square'

export const circleProps = {
  ...baseProps,
  /**
   * 当前进度
   */
  modelValue: makeNumberProp(0),
  /**
   * 圆环直径，默认单位为 px
   */
  size: makeNumberProp(100),
  /**
   * 进度条颜色，传入对象格式可以定义渐变色
   */
  color: {
    type: [String, Object] as PropType<string | Record<string, string>>,
    default: '#4d80f0'
  },
  /**
   * 轨道颜色
   */
  layerColor: makeStringProp('#EBEEF5'),
  /**
   * 填充颜色
   */
  fill: String,
  /**
   * 动画速度（单位为 rate/s）
   */
  speed: makeNumberProp(50),
  /**
   * 文字
   */
  text: String,
  /**
   * 进度条宽度 单位px
   */
  strokeWidth: makeNumberProp(10),
  /**
   * 进度条端点的形状，可选值为 "butt" | "round" | "square"
   */
  strokeLinecap: makeStringProp<StrokeLinecapType>('round'),
  /**
   * 是否顺时针增加
   */
  clockwise: makeBooleanProp(true)
}

export type CircleProps = ExtractPropTypes<typeof circleProps>
