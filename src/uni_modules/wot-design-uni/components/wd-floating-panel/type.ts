import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeNumericProp, truthProp } from '../common/props'

export const floatingPanelProps = {
  ...baseProps,
  /**
   * 面板的显示高度
   */
  height: makeNumberProp(0),
  /**
   * 设置自定义锚点，默认值 [100, windowHeight * 0.6]
   */
  anchors: makeArrayProp<number>(),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   */
  safeAreaInsetBottom: makeBooleanProp(false),
  /**
   * 是否显示滚动条，默认值为 true
   */
  showScrollbar: truthProp,
  /**
   * 动画时长，单位毫秒，默认值为 300ms
   */
  duration: makeNumericProp(300),
  /**
   * 是否允许内容区容器拖拽，默认值为 true
   */
  contentDraggable: truthProp
}

export type FloatingPanelProps = ExtractPropTypes<typeof floatingPanelProps>
