/*
 * @Author: weisheng
 * @Date: 2024-03-18 11:22:03
 * @LastEditTime: 2024-03-18 15:29:43
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-popup\types.ts
 * 记得注释
 */
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type PopupType = 'center' | 'top' | 'right' | 'bottom' | 'left'

export const popupProps = {
  ...baseProps,
  transition: String,
  /**
   * 关闭按钮
   */
  closable: makeBooleanProp(false),
  /**
   * 弹出框的位置
   */
  position: makeStringProp<PopupType>('center'),
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 动画持续时间
   */
  duration: {
    type: [Number, Boolean],
    default: 300
  },
  /**
   * 是否显示遮罩
   */
  modal: makeBooleanProp(true),
  /**
   * 设置层级
   */
  zIndex: makeNumberProp(10),
  /**
   * 是否当关闭时将弹出层隐藏（display: none)
   */
  hideWhenClose: makeBooleanProp(true),
  /**
   * 遮罩样式
   */
  modalStyle: makeStringProp(''),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   */
  safeAreaInsetBottom: makeBooleanProp(false),
  /**
   * 弹出层是否显示
   */
  modelValue: makeBooleanProp(false),
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   */
  lazyRender: makeBooleanProp(true),
  /**
   * 是否锁定滚动
   */
  lockScroll: makeBooleanProp(true)
}
