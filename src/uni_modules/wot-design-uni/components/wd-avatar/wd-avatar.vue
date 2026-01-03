<!--
 * @Author: North
 * @Date: 2026-01-01
 * @LastEditTime: 2026-01-01
 * @LastEditors: North
 * @Description: Avatar 头像组件，支持图片、文本或图标展示
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-avatar/wd-avatar.vue
-->
<template>
  <view v-if="isShow" :class="rootClass" :style="rootStyle" @click="handleClick">
    <!-- 默认插槽优先 -->
    <slot v-if="hasDefaultSlot"></slot>
    <!-- 图片 -->
    <wd-img v-else-if="src" :src="src" :width="imgSize" :height="imgSize" :mode="props.mode" custom-class="wd-avatar__img" @error="handleError" />
    <!-- 文本 -->
    <text v-else-if="text" class="wd-avatar__text">{{ text }}</text>
    <!-- 图标 -->
    <wd-icon v-else-if="icon" :name="icon" custom-class="wd-avatar__icon" />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-avatar',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, useSlots, type CSSProperties, ref } from 'vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import wdImg from '../wd-img/wd-img.vue'
import { addUnit, isDef, objToStyle } from '../common/util'
import { avatarProps, type AvatarSize } from './types'
import { useParent } from '../composables/useParent'
import { AVATAR_GROUP_KEY } from '../wd-avatar-group/types'

const props = defineProps(avatarProps)
const emit = defineEmits(['error', 'click'])
const slots = useSlots()

// _internal 用于 avatar-group 内部的溢出计数头像，跳过父组件上下文
const { parent, index } = props._internal ? { parent: null, index: ref(-1) } : useParent(AVATAR_GROUP_KEY)

const SIZE_MAP: Record<AvatarSize, number> = {
  large: 76,
  medium: 64,
  normal: 54,
  small: 48
}

/**
 * 是否显示该头像
 */
const isShow = computed(() => {
  if (!parent) {
    return true
  }
  // 在 avatar-group 中，根据 maxCount 判断
  const maxCount = parent.props.maxCount
  if (!isDef(maxCount)) {
    return true
  }
  const count = typeof maxCount === 'number' ? maxCount : parseInt(maxCount, 10)
  // 检查 count 是否为有效数字
  if (isNaN(count) || count <= 0) {
    return true
  }
  return index.value < count
})

/**
 * 获取实际尺寸
 * 在 avatar-group 中优先使用 parent 的 size
 */
const actualSize = computed(() => {
  if (parent && isDef(parent.props.size)) {
    return parent.props.size
  }
  return props.size
})

/**
 * 获取实际像素尺寸
 */
const imgSize = computed(() => {
  const size = actualSize.value
  if (!isDef(size)) {
    return SIZE_MAP.normal
  }

  if (typeof size === 'string' && size in SIZE_MAP) {
    return SIZE_MAP[size as AvatarSize]
  }

  return size
})

const hasDefaultSlot = computed(() => !!slots.default)

const rootClass = computed(() => {
  const classes = ['wd-avatar', props.customClass]

  // 形状类 - 在 avatar-group 中优先使用 parent 的 shape
  const shape = parent && isDef(parent.props.shape) ? parent.props.shape : props.shape
  classes.push(`wd-avatar--${shape}`)

  // 尺寸类仅预设尺寸
  const size = actualSize.value
  if (typeof size === 'string' && ['large', 'medium', 'normal', 'small'].includes(size)) {
    classes.push(`wd-avatar--${size}`)
  }

  // 在 avatar-group 中时，添加 item 类
  if (parent) {
    classes.push('wd-avatar-group__item')
  }

  return classes.join(' ')
})

/**
 * 根节点样式
 */
const rootStyle = computed(() => {
  const style: CSSProperties = {}

  let size = ''
  const sizeValue = actualSize.value
  if (typeof sizeValue === 'string' && sizeValue in SIZE_MAP) {
    size = addUnit(SIZE_MAP[sizeValue as AvatarSize])
  } else if (isDef(sizeValue)) {
    size = addUnit(sizeValue)
  }
  if (size) {
    style.width = size
    style.height = size
    style.fontSize = `calc(${size} * 0.45)`

    if (parent) {
      style['--wot-avatar-group-overlap' as any] = `calc(${size} * -0.22)`
    }
  }

  // 形状 - 在 avatar-group 中优先使用 parent 的 shape
  const shape = parent && isDef(parent.props.shape) ? parent.props.shape : props.shape
  if (shape === 'round') {
    style.borderRadius = '50%'
  }

  // 处理层叠效果的 z-index
  if (parent) {
    const cascading = parent.props.cascading
    if (cascading === 'left-up') {
      // 左侧在上，越后面越大
      style.zIndex = index.value + 1
    } else if (cascading === 'right-up') {
      // 右侧在上，越前面越大
      const maxCount = parent.props.maxCount
      let count = parent.children?.length ?? 0

      if (isDef(maxCount)) {
        const parsedCount = typeof maxCount === 'number' ? maxCount : parseInt(maxCount, 10)
        if (!isNaN(parsedCount) && parsedCount > 0) {
          count = parsedCount
        }
      }

      style.zIndex = count - index.value
    }
  }

  if (props.color) {
    style.color = props.color
  }

  if (props.bgColor) {
    style.backgroundColor = props.bgColor
    // 有背景色但无文字色时，默认白色
    if (!props.color) {
      style.color = '#fff'
    }
  }

  return `${objToStyle(style)} ${props.customStyle}`
})

const handleError = (event: any) => {
  emit('error', event)
}

const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
