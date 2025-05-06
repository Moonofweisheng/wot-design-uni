import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp, numericProp } from '../common/props'
import type { BadgeProps, BadgeType } from '../wd-badge/types'

export type LinkType = 'navigateTo' | 'switchTab' | 'reLaunch' | 'redirectTo'

export const gridItemProps = {
  ...baseProps,
  /**
   * GridItem 下方文字样式
   */
  customText: makeStringProp(''),
  /**
   * GridItem 上方 icon 样式
   */
  customIcon: makeStringProp(''),
  /**
   * 图标名称，可选值见 wd-icon 组件
   */
  icon: makeStringProp(''),
  /**
   * 图标大小
   */
  iconSize: makeStringProp('26px'),
  /**
   * 文字
   */
  text: String,
  /**
   * 点击后跳转的链接地址
   */
  url: String,
  /**
   * 页面跳转方式, 参考微信小程序路由文档，可选值：navigateTo / switchTab / reLaunch
   */
  linkType: makeStringProp<LinkType>('navigateTo'),
  /**
   * 是否开启 GridItem 内容插槽
   */
  useSlot: makeBooleanProp(false),
  /**
   * 是否开启 GridItem icon 插槽
   */
  useIconSlot: makeBooleanProp(false),
  /**
   * 是否开启 GridItem text 内容插槽
   */
  useTextSlot: makeBooleanProp(false),
  /**
   * 是否显示图标右上角小红点
   */
  isDot: {
    type: Boolean,
    default: undefined
  },
  /**
   * 图标右上角显示的 badge 类型，可选值：primary / success / warning / danger / info
   */
  type: String as PropType<BadgeType>,
  /**
   * 图标右上角 badge 显示值
   */
  value: numericProp,
  /**
   * 图标右上角 badge 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型
   */
  max: Number,
  /**
   * 徽标属性，透传给 Badge 组件
   */
  badgeProps: Object as PropType<Partial<BadgeProps>>
}

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>
