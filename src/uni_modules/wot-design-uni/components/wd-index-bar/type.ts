import type { InjectionKey } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { makeBooleanProp } from '../common/props'

export type AnchorIndex = number | string

export const indexBarProps = {
  /**
   * @description 索引是否吸顶
   */
  sticky: makeBooleanProp(false)
}

export type IndexBarProps = ExtractPropTypes<typeof indexBarProps>

export type InderBarProvide = {
  props: { sticky?: boolean }
  anchorState: {
    activeIndex: AnchorIndex | null // 当前激活的索引
  }
}

export const indexBarInjectionKey: InjectionKey<InderBarProvide> = Symbol('wd-index-bar')
