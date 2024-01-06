import { type InjectionKey, type Ref } from 'vue'

type DropDirction = 'up' | 'down'

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
