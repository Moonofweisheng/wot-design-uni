import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type TabsProvide = {
  state: {
    activeIndex: number
  }
}

export const TABS_KEY: InjectionKey<TabsProvide> = Symbol('wd-tabs')

export const tabsProps = {
  ...baseProps,
  modelValue: makeNumberProp(0), // 绑定值
  slidableNum: makeNumberProp(6), // 标签数超过阈值可滑动
  mapNum: makeNumberProp(10), // 标签数超过阈值显示导航地图
  sticky: makeBooleanProp(false), // 粘性布局
  offsetTop: makeNumberProp(0), // 粘性布局吸顶位置
  swipeable: makeBooleanProp(false), // 开启手势滑动
  lineWidth: makeNumberProp(19), // 底部条宽度，单位像素
  lineHeight: makeNumberProp(3), // 底部条高度，单位像素
  color: makeStringProp(''), // 颜色
  inactiveColor: makeStringProp(''), // 非活动状态颜色
  animated: makeBooleanProp(false), // 是否开启切换标签内容时的过渡动画
  duration: makeNumberProp(300) // 切换动画过渡时间，单位毫秒
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
