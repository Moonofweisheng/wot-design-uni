import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp, makeArrayProp } from '../common/props'

export interface TourStep {
  /**
   * 需要高亮的元素选择器
   */
  element: string
  /**
   * 引导文字内容
   */
  content: string
}

export const tourProps = {
  ...baseProps,

  /**
   * 是否显示引导组件，使用 v-model 绑定
   * 类型：boolean
   * 默认值：false
   */
  modelValue: makeBooleanProp(false),

  /**
   * 引导步骤列表
   * 类型：array
   * 默认值：[]
   */
  steps: makeArrayProp<TourStep>(),
  /**
   * 引导框的current
   * 类型：number
   * 默认值：0
   */
  current: makeNumberProp(0),

  /**
   * 蒙版是否显示
   * 类型：boolean
   * 默认值：true
   */
  mask: makeBooleanProp(true),

  /**
   * 蒙版颜色（支持 rgba 格式）
   * 类型：string
   * 默认值：'rgba(0, 0, 0, 0.5)'
   */
  maskColor: makeStringProp('rgba(0, 0, 0, 0.5)'),

  /**
   * 引导框与高亮元素之间的间距
   * 类型：number
   * 默认值：20
   */
  offset: makeNumberProp(20),

  /**
   * 动画持续时间（毫秒）
   * 类型：number
   * 默认值：300
   */
  duration: makeNumberProp(300),

  /**
   * 高亮区域的圆角大小
   * 类型：number
   * 默认值：8
   */
  borderRadius: makeNumberProp(8),

  /**
   * 高亮区域的内边距
   * 类型：number
   * 默认值：8
   */
  padding: makeNumberProp(8),

  /**
   * 上一步按钮文字
   */
  prevText: makeStringProp('上一步'),

  /**
   * 下一步按钮文字
   */
  nextText: makeStringProp('下一步'),

  /**
   * 跳过按钮文字
   */
  skipText: makeStringProp('跳过'),

  /**
   * 完成按钮文字
   */
  finishText: makeStringProp('完成'),

  /**
   * 安全偏移量，用于滚动计算时确保元素周围有足够的空间
   * 类型：number
   * 默认值：100
   */
  bottomSafetyOffset: makeNumberProp(100),

  /**
   * 顶部安全偏移量，用于滚动计算时确保元素周围有足够的空间
   * 类型：number
   * 默认值：0
   */
  topSafetyOffset: makeNumberProp(0),

  /**
   * 是否自定义顶部导航栏
   * 类型：boolean
   * 默认值：false
   */
  customNav: makeBooleanProp(false),

  /**
   * 点击蒙版是否可以下一步
   * 类型：boolean
   * 默认值：false
   */
  clickMaskNext: makeBooleanProp(false),

  /**
   * 高亮区域样式
   * 类型：object
   * 默认值：{}
   */
  highlightStyle: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },

  /**
   * 引导框的层级
   * 类型：number
   * 默认值：999998
   */
  zIndex: makeNumberProp(999998),

  /**
   * 是否显示引导按钮
   * 类型：boolean
   * 默认值：true
   */
  showTourButtons: makeBooleanProp(true)
}

export type TourProps = typeof tourProps
