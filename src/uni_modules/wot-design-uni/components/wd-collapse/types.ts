import { type ComponentPublicInstance, type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type CollapseToggleAllOptions =
  | boolean
  | {
      expanded?: boolean
      skipDisabled?: boolean
    }

export type CollapseProvide = {
  props: Partial<CollapseProps>
  toggle: (name: string, expanded: boolean) => void
}

export const COLLAPSE_KEY: InjectionKey<CollapseProvide> = Symbol('wd-collapse')

export const collapseProps = {
  ...baseProps,
  /**
   * 查看更多模式下的插槽外部自定义样式
   */
  customMoreSlotClass: makeStringProp(''),
  /**
   * 绑定值
   */
  modelValue: {
    type: [String, Array, Boolean] as PropType<string | Array<string> | boolean>
  },
  /**
   * 手风琴模式
   */
  accordion: makeBooleanProp(false),
  /**
   * 查看更多的折叠面板
   */
  viewmore: makeBooleanProp(false),
  /**
   * 查看更多的自定义插槽使用标志
   */
  useMoreSlot: makeBooleanProp(false),
  /**
   * 查看更多的折叠面板，收起时的显示行数
   */
  lineNum: makeNumberProp(2)
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export type CollapseExpose = {
  /**
   * 切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换
   * @param options 面板状态
   */
  toggleAll: (options?: CollapseToggleAllOptions) => void
}

export type CollapseInstance = ComponentPublicInstance<CollapseProps, CollapseExpose>
