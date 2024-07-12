import type { ExtractPropTypes } from 'vue'
import { baseProps, makeNumberProp, makeStringProp } from '../common/props'
export type directionType = 'up' | 'down' | 'bottom' | 'top'

export const cubicBezierProps = {
  ...baseProps,
  /**
   * 屏幕宽度[总宽度] px
   */
  windowWidth: makeNumberProp(375),
  /**
   * 屏幕高度[总高度] px
   */
  windowHeight: makeNumberProp(667),
  /**
   *  * 小球宽度
   */
  width: makeStringProp('40rpx'),
  /**
   *  * 小球高度
   */
  height: makeStringProp('40rpx'),
  /**
   *  * 动画小球背景颜色
   */
  backgroundColor: makeStringProp('#f84a2b'),
  /**
   *  * 小球 left
   */
  left: makeStringProp('0'),
  /**
   *  * 小球 top
   */
  top: makeStringProp('0'),
  /**
   *  * 括号中为position必传值（根据自身需求可以改位置） //up-右上，down-右下, bottom-左下，top-左上
   */
  direction:  makeStringProp<directionType>('down'),
  /**
   *  * 根据方向传值，终点的坐标点，一般为元素中心位置（根据自身需求可以改位置）
   */
  position: {
    type: Object,
    default () {
    	return {
    		top: 50,
    		bottom: 60,
    		left: 75,
    		right: 30
    	};
    }
  },
  /**
   *  * 列表中索引 index
   */
  index: makeNumberProp(0),
 
}

export type cubicBezierProps = ExtractPropTypes<typeof cubicBezierProps>
