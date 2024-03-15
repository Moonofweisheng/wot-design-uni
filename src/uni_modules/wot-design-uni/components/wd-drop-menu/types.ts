import { type ExtractPropTypes, type InjectionKey, type Ref } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type DropDirction = 'up' | 'down'

export type DropMenuProvide = {
  props: {
    zIndex?: number
    direction?: DropDirction
    modal?: boolean
    closeOnClickModal?: boolean
    duration?: number
  }
  fold: (child?: any) => void
  offset: Ref<number>
}

export const DROP_MENU_KEY: InjectionKey<DropMenuProvide> = Symbol('wd-drop-menu')

export const dropMenuProps = {
  ...baseProps,
  zIndex: makeNumberProp(12),
  direction: makeStringProp<DropDirction>('down'),
  modal: makeBooleanProp(true),
  closeOnClickModal: makeBooleanProp(true),
  duration: makeNumberProp(200)
}

export type DropMenuProps = ExtractPropTypes<typeof dropMenuProps>
