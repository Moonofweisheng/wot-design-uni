<template>
  <view :class="`wd-fab ${customClass}`" :style="customStyle">
    <wd-button custom-class="wd-fab__trigger" round :type="type" @click="handleClick">
      <wd-icon custom-class="wd-fab__icon" :name="active ? activeIcon : inactiveIcon"></wd-icon>
    </wd-button>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-fab',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'

type FabType = 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default'
type FabPosition = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom'
type FabDirection = 'top' | 'right' | 'bottom' | 'left'

interface Props {
  // 类型，可选值为 default primary info success warning error
  type?: FabType
  // 悬浮按钮位置，可选值为 left-top right-top left-bottom right-bottom
  position?: FabPosition
  // 悬浮按钮菜单弹出方向，可选值为 top bottom left right
  direction?: FabDirection
  // 悬浮按钮未展开时的图标
  inactiveIcon?: string
  // 悬浮按钮展开时的图标
  activeIcon?: string
  // 自定义悬浮按钮层级
  zIndex?: number
  customClass?: string
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  position: 'right-bottom',
  direction: 'top',
  inactiveIcon: 'add',
  activeIcon: 'close',
  zIndex: 99,
  customClass: '',
  customStyle: ''
})

const active = ref<boolean>(false)

function handleClick() {
  active.value = !active.value
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
