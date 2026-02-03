import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { baseProps } from '../common/props'

export const dragHandleProps = {
  ...baseProps
}

export type DragHandleProps = ExtractPropTypes<typeof dragHandleProps>

export type DragHandleInstance = ComponentPublicInstance<DragHandleProps>
