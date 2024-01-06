import { type InjectionKey } from 'vue'

export type StepsProvide = {
  props: { active?: number; vertical?: boolean; dot?: boolean; space?: string; alignCenter?: boolean }
}

export const STEPS_KEY: InjectionKey<StepsProvide> = Symbol('wd-steps')
