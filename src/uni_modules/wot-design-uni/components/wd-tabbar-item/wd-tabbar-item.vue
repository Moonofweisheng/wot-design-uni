<template>
  <view class="wd-tabbar-item" :style="customStyle" @click="handleClick">
    <wd-badge :modelValue="value" v-bind="badgeProps" :is-dot="isDot" :max="max">
      <view class="wd-tabbar-item__body">
        <slot name="icon" :active="active"></slot>
        <template v-if="!$slots.icon && icon">
          <wd-icon :name="icon" size="20px" :custom-style="textStyle" :custom-class="active ? 'is-active' : 'is-inactive'"></wd-icon>
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
import { type CSSProperties, computed } from 'vue'
import { isDef, objToStyle } from '../common/util'
import { useParent } from '../composables/useParent'
import { TABBAR_KEY } from '../wd-tabbar/types'

type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
interface BadgeProps {
  modelValue?: number | string | null
  bgColor?: string
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: BadgeType
  top?: number
  right?: number
  customClass?: string
  customStyle?: string
}

interface Props {
  // 自定义样式类
  customClass?: string
  // 自定义样式
  customStyle?: string
  // 标签页的标题
  title?: string
  // 唯一标识符
  name?: string | number
  // 图标
  icon?: string
  // 徽标显示值
  value?: number | string | null
  // 是否点状徽标
  isDot?: boolean
  // 徽标最大值
  max?: number
  // 徽标属性，透传给 Badge 组件
  badgeProps?: BadgeProps
}

const props = withDefaults(defineProps<Props>(), {
  max: 99,
  customClass: '',
  customStyle: ''
})

const { parent: tabbar, index } = useParent(TABBAR_KEY)

const textStyle = computed(() => {
  const style: CSSProperties = {}
  if (tabbar) {
    if (active.value && tabbar.props.activeColor) {
      style['color'] = tabbar.props.activeColor
    }
    if (!active.value && tabbar.props.inactiveColor) {
      style['color'] = tabbar.props.inactiveColor
    }
  }

  return `${objToStyle(style)}`
})

const active = computed(() => {
  const name = isDef(props.name) ? props.name : index.value
  if (tabbar) {
    if (tabbar.props.modelValue === name) {
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
  tabbar && tabbar.setChange({ name })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
