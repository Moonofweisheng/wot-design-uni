import { type InjectionKey } from 'vue'
import { baseProps, makeNumberProp } from '../common/props'

export type RowProvide = {
  props: { gutter?: number }
}

export const ROW_KEY: InjectionKey<RowProvide> = Symbol('wd-row')

export const rowProps = {
  ...baseProps,
  gutter: makeNumberProp(0)
}
