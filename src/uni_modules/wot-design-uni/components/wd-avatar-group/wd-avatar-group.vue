<!--
 * @Author: North
 * @Date: 2026-01-01
 * @LastEditTime: 2026-01-01
 * @LastEditors: North
 * @Description: AvatarGroup 头像组组件，用于将多个头像组合展示
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-avatar-group/wd-avatar-group.vue
 * 记得注释
-->
<template>
  <view :class="rootClass" :style="customStyle">
    <slot></slot>
    <!-- 折叠头像 -->
    <view v-if="showCollapse" class="wd-avatar-group__item wd-avatar-group__collapse" :style="collapseStyle">
      <wd-avatar _internal :text="collapseText" :shape="props.shape" :size="props.size" bg-color="#ebedf0" color="#969799" />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-avatar-group',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'
import wdAvatar from '../wd-avatar/wd-avatar.vue'
import { avatarGroupProps, AVATAR_GROUP_KEY, type AvatarGroupProvide } from './types'
import { useChildren } from '../composables/useChildren'

const props = defineProps(avatarGroupProps)

const { children, linkChildren } = useChildren<any, AvatarGroupProvide>(AVATAR_GROUP_KEY)

linkChildren({ props })

/**
 * 根节点类名
 */
const rootClass = computed(() => {
  return `wd-avatar-group wd-avatar-group--${props.cascading} ${props.customClass}`
})

/**
 * 是否显示折叠头像
 */
const showCollapse = computed(() => {
  if (!props.maxCount) {
    return false
  }
  const maxCountValue = typeof props.maxCount === 'number' ? props.maxCount : parseInt(props.maxCount, 10)
  if (maxCountValue <= 0) {
    return false
  }
  return children.length > maxCountValue
})

/**
 * 剩余未显示的数量
 */
const restCount = computed(() => {
  if (!props.maxCount) {
    return 0
  }
  const maxCountValue = typeof props.maxCount === 'number' ? props.maxCount : parseInt(props.maxCount, 10)
  if (maxCountValue <= 0) {
    return 0
  }
  return Math.max(0, children.length - maxCountValue)
})

/**
 * 折叠头像文本
 */
const collapseText = computed(() => {
  return props.collapseAvatar || `+${restCount.value}`
})

/**
 * 折叠头像样式
 */
const collapseStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.cascading === 'left-up') {
    const maxCountValue = props.maxCount ? (typeof props.maxCount === 'number' ? props.maxCount : parseInt(props.maxCount, 10)) : children.length
    style.zIndex = maxCountValue + 1
  } else {
    style.zIndex = 0
  }
  return style
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
