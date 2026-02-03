import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export type DragSortSortType = 'move' | 'swap'

export const dragSortProps = {
  ...baseProps,
  modelValue: makeRequiredProp(Array as PropType<any[]>),
  realtime: makeBooleanProp(false),
  scrollable: makeBooleanProp(false),
  edgeThreshold: makeNumberProp(50),
  scrollSpeed: makeNumberProp(10),
  scrollTop: makeNumberProp(0),
  feedback: makeBooleanProp(true),
  disabled: makeBooleanProp(false),
  scrollArea: Object as PropType<any>,
  longPressDuration: makeNumberProp(100),
  useDragHandle: makeBooleanProp(false),
  placeholderClass: makeStringProp(''),
  sortType: makeStringProp<DragSortSortType>('move'),
  strict: makeBooleanProp(false)
}

export type DragSortProps = ExtractPropTypes<typeof dragSortProps>

export type DragSortProvide = {
  props: DragSortProps
  isReady: Ref<boolean>
  draggedIndex: Ref<number>
  register: (index: number, helper: any, sortable: boolean) => void
  unregister: (index: number) => void
  onDragStart: (index: number, touch: any) => void
  onDragMove: (touch: any) => void
  onDragEnd: () => void
  getPosition: (index: number) => any
  getItemStyle: (index: number) => any
  getCurrentPosition: (index: number) => any
  componentId: string
}

export const DRAG_SORT_KEY: InjectionKey<DragSortProvide> = Symbol.for('wd-drag-sort')
