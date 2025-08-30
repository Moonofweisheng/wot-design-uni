import type { PropType } from 'vue'
import { baseProps } from '../common/props'

export interface GuideStep {
  /**
   * 需要高亮的元素选择器
   */
  element: string
  /**
   * 引导文字内容
   */
  content: string
}

export const guideProps = {
  ...baseProps,
  /**
   * 是否显示引导组件，使用 v-model 绑定
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  /**
   * 引导步骤列表
   */
  steps: {
    type: Array as PropType<GuideStep[]>,
    default: () => []
  },
  /**
   * 引导框的current
   */
  current: {
    type: Number,
    default: 0
  },
  /**
   * 蒙版是否显示
   */
  mask: {
    type: Boolean,
    default: true
  },
  /**
   * 蒙版颜色（支持 rgba 格式）
   */
  maskColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.5)'
  },
  /**
   * 引导框与高亮元素之间的间距
   */
  offset: {
    type: Number,
    default: 20
  },
  /**
   * 动画持续时间（毫秒）
   */
  duration: {
    type: Number,
    default: 300
  },
  /**
   * 高亮区域的圆角大小
   */
  borderRadius: {
    type: Number,
    default: 8
  },
  /**
   * 高亮区域的内边距
   */
  padding: {
    type: Number,
    default: 10
  },
  /**
   * 上一步按钮文字
   */
  prevText: {
    type: String,
    default: '上一步'
  },
  /**
   * 下一步按钮文字
   */
  nextText: {
    type: String,
    default: '下一步'
  },
  /**
   * 跳过按钮文字
   */
  skipText: {
    type: String,
    default: '跳过'
  },
  /**
   * 完成按钮文字
   */
  finishText: {
    type: String,
    default: '完成'
  },
  /**
   * 安全偏移量，用于滚动计算时确保元素周围有足够的空间
   */
  bottomSafetyOffset: {
    type: Number,
    default: 100
  },
  /**
   * 顶部安全偏移量，用于滚动计算时确保元素周围有足够的空间
   */
  topSafetyOffset: {
    type: Number,
    default: 0
  },
  /**
   * 是否自定义顶部导航栏
   */
  customNav: {
    type: Boolean,
    default: false
  },
  /**
   * 点击蒙版是否可以下一步
   */
  clickMaskNext: {
    type: Boolean,
    default: false
  },
  /**
   * 高亮区域样式
   */
  highlightStyle: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  /**
   * 引导框的层级
   */
  zIndex: {
    type: Number,
    default: 999998
  },
  /**
   * 是否显示引导按钮
   */
  showGuideButtons: {
    type: Boolean,
    default: true
  }
}

export type GuideProps = typeof guideProps
