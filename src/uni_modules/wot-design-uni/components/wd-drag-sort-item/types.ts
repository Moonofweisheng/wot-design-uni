import type { ComponentPublicInstance, ExtractPropTypes, InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeRequiredProp } from '../common/props'

export const dragSortItemProps = {
  ...baseProps,
  index: makeRequiredProp(Number),
  disabled: makeBooleanProp(false),
  sortable: makeBooleanProp(true)
}

export type DragSortItemProps = ExtractPropTypes<typeof dragSortItemProps>

export type DragSortItemInstance = ComponentPublicInstance<DragSortItemProps>

export type DragSortItemProvide = {
  onHandleTouch: (e: any) => void
}

export const DRAG_SORT_ITEM_KEY: InjectionKey<DragSortItemProvide> = Symbol('wd-drag-sort-item')
