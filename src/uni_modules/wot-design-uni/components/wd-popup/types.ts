/*
 * @Author: weisheng
 * @Date: 2024-03-18 11:22:03
 * @LastEditTime: 2025-07-06 21:00:04
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-popup/types.ts
 * 记得注释
 */
import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import type { TransitionName } from '../wd-transition/types'

export type PopupType = 'center' | 'top' | 'right' | 'bottom' | 'left'

export const popupProps = {
  ...baseProps,
  /**
   * 动画类型，参见 wd-transition 组件的name
   * 类型：string
   * 可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in
   */
  transition: String as PropType<TransitionName>,
  /**
   * 关闭按钮
   * 类型：boolean
   * 默认值：false
   */
  closable: makeBooleanProp(false),
  /**
   * 弹出框的位置
   * 类型：string
   * 默认值：center
   * 可选值：center / top / right / bottom / left
   */
  position: makeStringProp<PopupType>('center'),
  /**
   * 点击遮罩是否关闭
   * 类型：boolean
   * 默认值：true
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 动画持续时间
   * 类型：number | boolean
   * 默认值：300
   */
  duration: {
    type: [Number, Boolean],
    default: 300
  },
  /**
   * 是否显示遮罩
   * 类型：boolean
   * 默认值：true
   */
  modal: makeBooleanProp(true),
  /**
   * 设置层级
   * 类型：number
   * 默认值：10
   */
  zIndex: makeNumberProp(10),
  /**
   * 是否当关闭时将弹出层隐藏（display: none)
   * 类型：boolean
   * 默认值：true
   */
  hideWhenClose: makeBooleanProp(true),
  /**
   * 遮罩样式
   * 类型：string
   * 默认值：''
   */
  modalStyle: makeStringProp(''),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   * 类型：boolean
   * 默认值：false
   */
  safeAreaInsetBottom: makeBooleanProp(false),
  /**
   * 弹出层是否显示
   */
  modelValue: makeBooleanProp(false),
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   * 类型：boolean
   * 默认值：true
   */
  lazyRender: makeBooleanProp(true),
  /**
   * 是否锁定滚动
   * 类型：boolean
   * 默认值：true
   */
  lockScroll: makeBooleanProp(true),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   * 类型：boolean
   * 默认值：false
   */
  rootPortal: makeBooleanProp(false)
}
