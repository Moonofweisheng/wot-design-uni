import type { Ref } from 'vue'
import type { InjectionKey } from 'vue'
import type { ExtractPropTypes } from 'vue'

export type AnchorIndex = number | string

export interface AnchorItem {
  top: number
  index: AnchorIndex
}

export const indexBarProps = {}

export type IndexBarProps = ExtractPropTypes<typeof indexBarProps>

export const indexBarInjectionKey = 'wdIndexBar' as unknown as InjectionKey<{
  anchorList: Ref<AnchorItem[]>
}>
