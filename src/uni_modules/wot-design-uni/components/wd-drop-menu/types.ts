import { type ExtractPropTypes, type InjectionKey, type Ref } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type DropDirction = 'up' | 'down'

export type DropMenuProvide = {
  props: Partial<DropMenuProps>
  fold: (child?: any) => void
  offset: Ref<number>
}

export const DROP_MENU_KEY: InjectionKey<DropMenuProvide> = Symbol('wd-drop-menu')

export const dropMenuProps = {
  ...baseProps,
  /**
   * 弹框层级
   */
  zIndex: makeNumberProp(12),
  /**
   * 菜单展开方向，可选值为up 或 down
   */
  direction: makeStringProp<DropDirction>('down'),
  /**
   * 是否展示蒙层
   */
  modal: makeBooleanProp(true),
  /**
   * 是否点击蒙层时关闭
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 菜单展开收起动画时间，单位 ms
   */
  duration: makeNumberProp(200)
}

export type DropMenuProps = ExtractPropTypes<typeof dropMenuProps>
