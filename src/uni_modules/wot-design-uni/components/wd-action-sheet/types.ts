import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeRequiredProp, makeStringProp } from '../common/props'

export type Action = {
  // 选项名称
  name: string
  // 描述信息
  subname: string
  // 颜色
  color: string
  // 禁用
  disabled: boolean
  // 加载中状态
  loading: boolean
}

export type Panel = {
  // 图片地址
  iconUrl: string
  // 标题内容
  title: string
}

export const actionSheetProps = {
  ...baseProps,
  customHeaderClass: makeStringProp(''),
  modelValue: { ...makeBooleanProp(false), ...makeRequiredProp(Boolean) },
  actions: makeArrayProp<Action>(),
  panels: makeArrayProp<Panel | Panel[]>(),
  title: String,
  cancelText: String,
  closeOnClickAction: Boolean,
  closeOnClickModal: Boolean,
  duration: Number,
  zIndex: Number,
  lazyRender: Boolean,
  safeAreaInsetBottom: Boolean
}

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>
