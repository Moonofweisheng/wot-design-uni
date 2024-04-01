import type { PropType } from 'vue'
import { baseProps, makeBooleanProp } from '../common/props'

export type StepStatus = 'finished' | 'process' | 'error'

export const stepProps = {
  ...baseProps,

  /**
   * 步骤标题，如果没有则使用默认文案。
   * 当只有标题而没有描述时，标题的字号会小2号。
   * 类型: string
   */
  title: String,

  /**
   * 步骤描述。
   * 类型: string
   */
  description: String,

  /**
   * 步骤图标。
   * 类型: string
   */
  icon: String,

  /**
   * 步骤状态，可选值为 'finished'（已完成）、'process'（进行中）、'error'（出错）。
   * 类型: string
   */
  status: String as PropType<StepStatus>
}
