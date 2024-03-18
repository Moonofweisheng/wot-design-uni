import { type ComponentPublicInstance, type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type CollapseToggleAllOptions =
  | boolean
  | {
      expanded?: boolean
      skipDisabled?: boolean
    }

export type CollapseProvide = {
  props: Partial<CollapseProps>
  toggle: (name: string, expanded: boolean) => void
}

export const COLLAPSE_KEY: InjectionKey<CollapseProvide> = Symbol('wd-collapse')

export const collapseProps = {
  ...baseProps,
  customMoreSlotClass: makeStringProp(''),
  modelValue: {
    type: [String, Array, Boolean] as PropType<string | Array<string> | boolean>
  },
  accordion: makeBooleanProp(false),
  viewmore: makeBooleanProp(false),
  useMoreSlot: makeBooleanProp(false),
  lineNum: makeNumberProp(2)
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export type CollapseExpose = {
  toggleAll: (options?: boolean | CollapseToggleAllOptions) => void
}

export type CollapseInstance = ComponentPublicInstance<CollapseProps, CollapseExpose>
