import { type ComponentPublicInstance, type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp, numericProp } from '../common/props'

export type TabsProvide = {
  state: {
    activeIndex: number
    lineStyle: string // 激活项边框线样式
    inited: boolean // 是否初始化
    animating: boolean // 是否动画中
    mapShow: boolean // map的开关
    scrollLeft: number // scroll-view偏移量
  }
  props: Partial<TabsProps>
}

export type TabsSlidable = 'auto' | 'always'

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
   * 导航地图的标题
   */
  mapTitle: String,
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
   * 自动调整底部条宽度，设置了 lineWidth 后无效
   */
  autoLineWidth: makeBooleanProp(false),
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
  duration: makeNumberProp(300),
  /**
   * 是否开启滚动导航
   * 可选值：'auto' | 'always'
   * @default auto
   */
  slidable: makeStringProp<TabsSlidable>('auto')
}

export type TabsExpose = {
  // 修改选中的tab Index
  setActive: (value: number | string, init: boolean, setScroll: boolean) => void
  // scroll-view滑动到active的tab_nav
  scrollIntoView: () => void
  // 更新底部条样式
  updateLineStyle: (animation: boolean) => void
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export type TabsInstance = ComponentPublicInstance<TabsProps, TabsExpose>
