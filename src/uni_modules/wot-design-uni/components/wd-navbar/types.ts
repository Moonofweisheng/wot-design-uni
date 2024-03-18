import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../common/props'

export const navbarProps = {
  ...baseProps,
  /**
   * 标题文字
   */
  title: String,
  /**
   * 左侧文案
   */
  leftText: String,
  /**
   * 右侧文案
   */
  rightText: String,
  /**
   * 是否显示左侧箭头
   */
  leftArrow: makeBooleanProp(false),
  /**
   * 是否显示下边框
   */
  bordered: makeBooleanProp(true),
  /**
   * 是否固定到顶部
   */
  fixed: makeBooleanProp(false),
  /**
   * 固定在顶部时，是否在标签位置生成一个等高的占位元素
   */
  placeholder: makeBooleanProp(false),
  /**
   * 导航栏 z-index
   */
  zIndex: makeNumberProp(500),
  /**
   * 是否开启顶部安全区适配
   */
  safeAreaInsetTop: makeBooleanProp(false),
  /**
   * 是否禁用左侧按钮，禁用时透明度降低，且无法点击
   */
  leftDisabled: makeBooleanProp(false),
  /**
   * 是否禁用右侧按钮，禁用时透明度降低，且无法点击
   */
  rightDisabled: makeBooleanProp(false)
}

export type NavbarProps = ExtractPropTypes<typeof navbarProps>
