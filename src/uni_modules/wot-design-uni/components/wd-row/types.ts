import { type InjectionKey } from 'vue'
import { baseProps, makeNumberProp } from '../common/props'

export type RowProvide = {
  props: { gutter?: number }
}

export const ROW_KEY: InjectionKey<RowProvide> = Symbol('wd-row')

export const rowProps = {
  ...baseProps,
  /**
   * 列元素之间的间距（单位为px）
   */
  gutter: makeNumberProp(0)
}
