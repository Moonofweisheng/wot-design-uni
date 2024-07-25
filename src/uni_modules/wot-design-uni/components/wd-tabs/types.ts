import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp, numericProp } from '../common/props'

export type TabsProvide = {
  state: {
    activeIndex: number
  }
}

export const TABS_KEY: InjectionKey<TabsProvide> = Symbol('wd-tabs')

export const tabsProps = {
  ...baseProps,
  /**
   * 绑定值
   */
  modelValue: makeNumericProp(0),
  /**
   * 标签数超过阈值可滑动
   */
  slidableNum: makeNumberProp(6),
  /**
   * 标签数超过阈值显示导航地图
   */
  mapNum: makeNumberProp(10),
  /**
   * 粘性布局
   */
  sticky: makeBooleanProp(false),
  /**
   * 粘性布局吸顶位置
   */
  offsetTop: makeNumberProp(0),
  /**
   * 开启手势滑动
   */
  swipeable: makeBooleanProp(false),
  /**
   * 底部条宽度，单位像素
   */
  lineWidth: numericProp,
  /**
   * 底部条高度，单位像素
   */
  lineHeight: numericProp,
  /**
   * 颜色
   */
  color: makeStringProp(''),
  /**
   * 非活动状态颜色
   */
  inactiveColor: makeStringProp(''),
  /**
   * 是否开启切换标签内容时的过渡动画
   */
  animated: makeBooleanProp(false),
  /**
   * 切换动画过渡时间，单位毫秒
   */
  duration: makeNumberProp(300)
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
