import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumericProp, makeStringProp, numericProp } from '../common/props'

export type DropMenuItemBeforeToggleOption = {
  // 操作状态：true 打开下拉菜单，false 关闭下拉菜单
  status: boolean
  // 回调函数，用于控制是否允许打开或关闭下拉菜单，true 允许打开或关闭，false 不允许打开或关闭
  resolve: (isPass: boolean) => void
}

export type DropMenuItemBeforeToggle = (option: DropMenuItemBeforeToggleOption) => void

export const dorpMenuItemProps = {
  ...baseProps,
  /**
   * DropMenuItem 左侧文字样式
   */
  customTitle: makeStringProp(''),
  /**
   * DropMenuItem 右侧 icon 样式
   */
  customIcon: makeStringProp(''),
  /**
   * 当前选中项对应选中的 value
   */
  modelValue: [String, Number],
  /**
   * 列表数据，对应数据结构 [{text: '标题', value: '0', tip: '提示文字'}]
   */
  options: makeArrayProp<Record<string, any>>(),
  /**
   * 禁用菜单
   */
  disabled: makeBooleanProp(false),
  /**
   * 选中的图标名称(可选名称在 wd-icon 组件中)
   */
  iconName: makeStringProp('check'),
  /**
   * 菜单标题
   */
  title: String,
  /**
   * 菜单图标
   */
  icon: makeStringProp('arrow-down'),
  /**
   * 菜单图标大小
   */
  iconSize: numericProp,
  /**
   * 自定义点击事件
   */
  beforeToggle: Function as PropType<DropMenuItemBeforeToggle>,
  /**
   * 选项对象中，value 对应的 key
   */
  valueKey: makeStringProp('value'),
  /**
   * 选项对象中，展示的文本对应的 key
   */
  labelKey: makeStringProp('label'),
  /**
   * 选项对象中，选项说明对应的 key
   */
  tipKey: makeStringProp('tip'),
  /**
   * 自定义下拉菜单popup样式类
   */
  customPopupClass: makeStringProp(''),
  /**
   * 自定义下拉菜单popup样式
   */
  customPopupStyle: makeStringProp(''),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   */
  rootPortal: makeBooleanProp(false)
}

export type DropMenuItemProps = ExtractPropTypes<typeof dorpMenuItemProps>

export type DropMenuItemExpose = {
  getShowPop: () => boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export type DropMenuItemInstance = ComponentPublicInstance<DropMenuItemProps, DropMenuItemExpose>
