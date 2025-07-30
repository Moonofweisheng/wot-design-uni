/*
 * @Author: Solo Coding
 * @Date: 2024-12-19
 * @LastEditTime: 2024-12-19
 * @LastEditors: Solo Coding
 * @Description: PullRefresh 下拉刷新组件类型定义
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-pull-refresh/types.ts
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, makeNumericProp } from '../common/props'

export type PullRefreshStatus = 'normal' | 'pulling' | 'loosing' | 'loading' | 'success'

export type ScrollMode = 'scroll-view' | 'page'

export const pullRefreshProps = {
  ...baseProps,
  /**
   * 是否处于加载中状态
   */
  modelValue: makeBooleanProp(false),
  /**
   * 是否禁用下拉刷新
   */
  disabled: makeBooleanProp(false),
  /**
   * 下拉过程提示文案
   */
  pullingText: makeStringProp('下拉即可刷新...'),
  /**
   * 释放过程提示文案
   */
  loosingText: makeStringProp('释放即可刷新...'),
  /**
   * 加载过程提示文案
   */
  loadingText: makeStringProp('加载中...'),
  /**
   * 刷新成功提示文案
   */
  successText: makeStringProp(''),
  /**
   * 刷新成功提示展示时长(ms)
   */
  successDuration: makeNumericProp(300),
  /**
   * 动画时长(ms)
   */
  animationDuration: makeNumericProp(300),
  /**
   * 顶部内容高度
   */
  headHeight: makeNumericProp(50),
  /**
   * 触发下拉刷新的距离
   */
  pullDistance: makeNumericProp(''),
  /**
   * 滚动模式：scroll-view(局部滚动) | page(页面滚动)
   */
  scrollMode: makeStringProp<ScrollMode>('page'),
  /**
   * scroll-view 模式下的固定高度
   */
  height: makeNumericProp(400)
}

export type PullRefreshProps = ExtractPropTypes<typeof pullRefreshProps>
