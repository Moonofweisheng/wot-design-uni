import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../common/props'

export const stepsProps = {
  ...baseProps,
  active: makeNumberProp(0),
  vertical: makeBooleanProp(false),
  dot: makeBooleanProp(false),
  space: String,
  alignCenter: makeBooleanProp(false)
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>

export type StepsProvide = {
  props: Partial<StepsProps>
}

export const STEPS_KEY: InjectionKey<StepsProvide> = Symbol('wd-steps')
