import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../common/props'

export const overlayProps = {
  ...baseProps,
  /**
   * 是否展示遮罩层
   */
  show: makeBooleanProp(false),
  /**
   * 动画时长，单位毫秒
   */
  duration: {
    type: [Object, Number, Boolean] as PropType<Record<string, number> | number | boolean>,
    default: 300
  },
  /**
   * 是否锁定滚动
   */
  lockScroll: makeBooleanProp(true),
  /**
   * 层级
   */
  zIndex: makeNumberProp(10)
}
