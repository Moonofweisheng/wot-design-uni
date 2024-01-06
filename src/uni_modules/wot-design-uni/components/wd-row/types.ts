import { type InjectionKey } from 'vue'

export type RowProvide = {
  props: { gutter?: number }
}

export const ROW_KEY: InjectionKey<RowProvide> = Symbol('wd-row')
