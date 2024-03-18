import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'
import type { BadgeProps, BadgeType } from '../wd-badge/types'

export type LinkType = 'navigateTo' | 'switchTab' | 'reLaunch' | 'redirectTo'

export const gridItemProps = {
  ...baseProps,
  customText: makeStringProp(''),
  customIcon: makeStringProp(''),
  icon: makeStringProp(''),
  iconSize: makeStringProp('26px'),
  text: String,
  url: String,
  linkType: makeStringProp<LinkType>('navigateTo'),
  useSlot: makeBooleanProp(false),
  useIconSlot: makeBooleanProp(false),
  useTextSlot: makeBooleanProp(false),
  // badge属性
  isDot: Boolean,
  type: String as PropType<BadgeType>,
  value: Number,
  max: Number,
  // 徽标属性，透传给 Badge 组件
  badgeProps: Object as PropType<Partial<BadgeProps>>
}

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>
