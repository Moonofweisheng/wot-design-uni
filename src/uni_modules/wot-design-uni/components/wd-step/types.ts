import type { PropType } from 'vue'
import { baseProps, makeBooleanProp } from '../common/props'

export type StepStatus = 'finished' | 'process' | 'error'

export const stepProps = {
  ...baseProps,
  title: String,
  description: String,
  icon: String,
  status: String as PropType<StepStatus>,
  iconSlot: makeBooleanProp(false),
  titleSlot: makeBooleanProp(false),
  descriptionSlot: makeBooleanProp(false)
}
