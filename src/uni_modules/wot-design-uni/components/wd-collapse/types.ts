import { type ComponentPublicInstance, type InjectionKey } from 'vue'

export type CollapseToggleAllOptions =
  | boolean
  | {
      expanded?: boolean
      skipDisabled?: boolean
    }

export type CollapseInstance = ComponentPublicInstance<{
  toggleAll: (options?: boolean | CollapseToggleAllOptions) => void
}>

export type CollapseProvide = {
  props: {
    modelValue: string | Array<string> | boolean
    accordion?: boolean
    viewmore?: boolean
    useMoreSlot?: boolean
    lineNum?: number
  }
  toggle: (name: string, expanded: boolean) => void
}

export const COLLAPSE_KEY: InjectionKey<CollapseProvide> = Symbol('wd-collapse')
