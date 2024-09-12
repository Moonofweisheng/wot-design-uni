<!--
 * @Author: weisheng
 * @Date: 2024-09-11 18:38:42
 * @LastEditTime: 2024-09-12 12:55:54
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-tabbar-item\wd-tabbar-item.vue
 * 记得注释
-->
<template>
  <view :class="`wd-tabbar-item ${customClass}`" :style="customStyle" @click="handleClick">
    <wd-badge v-bind="customBadgeProps">
      <view class="wd-tabbar-item__body">
        <slot name="icon" :active="active"></slot>
        <template v-if="!$slots.icon && icon">
          <wd-icon
            :name="icon"
            :custom-style="textStyle"
            :custom-class="`wd-tabbar-item__body-icon ${active ? 'is-active' : 'is-inactive'}`"
          ></wd-icon>
        </template>
        <text v-if="title" :style="textStyle" :class="`wd-tabbar-item__body-title ${active ? 'is-active' : 'is-inactive'}`">
          {{ title }}
        </text>
      </view>
    </wd-badge>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-tabbar-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import wdBadge from '../wd-badge/wd-badge.vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import { type CSSProperties, computed } from 'vue'
import { deepAssign, isDef, isUndefined, objToStyle, omitBy } from '../common/util'
import { useParent } from '../composables/useParent'
import { TABBAR_KEY } from '../wd-tabbar/types'
import { tabbarItemProps } from './types'
import type { BadgeProps } from '../wd-badge/types'

const props = defineProps(tabbarItemProps)

const { parent, index } = useParent(TABBAR_KEY)

const customBadgeProps = computed(() => {
  const badgeProps: Partial<BadgeProps> = deepAssign(
    isDef(props.badgeProps) ? omitBy(props.badgeProps, isUndefined) : {},
    omitBy(
      {
        max: props.max,
        isDot: props.isDot,
        modelValue: props.value
      },
      isUndefined
    )
  )
  if (!isDef(badgeProps.max)) {
    badgeProps.max = 99
  }
  return badgeProps
})

const textStyle = computed(() => {
  const style: CSSProperties = {}
  if (parent.value) {
    if (active.value && parent.value.props.activeColor) {
      style['color'] = parent.value.props.activeColor
    }
    if (!active.value && parent.value.props.inactiveColor) {
      style['color'] = parent.value.props.inactiveColor
    }
  }

  return `${objToStyle(style)}`
})

const active = computed(() => {
  const name = isDef(props.name) ? props.name : index.value
  if (parent.value) {
    if (parent.value.props.modelValue === name) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
})

/**
 * 点击tabbar选项
 */
function handleClick() {
  const name: string | number = isDef(props.name) ? props.name : index.value
  parent.value && parent.value.setChange({ name })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
