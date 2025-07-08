<template>
  <wd-popup
    v-model="state.visible"
    :custom-style="customStyle"
    :position="state.position"
    :z-index="state.zIndex"
    :duration="250"
    :modal="false"
    :root-portal="state.rootPortal"
    @leave="onClosed"
    @enter="onOpened"
  >
    <view class="wd-notify" :class="[`wd-notify--${state.type}`]" :style="{ color: state.color, background: state.background }" @click="onClick">
      <slot>{{ state.message }}</slot>
    </view>
  </wd-popup>
</template>
<script lang="ts">
export default {
  name: 'wd-notify',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdPopup from '../wd-popup/wd-popup.vue'
import { inject, computed, watch, ref } from 'vue'
import { notifyProps, type NotifyProps } from './types'
import { getNotifyOptionKey } from '.'
import { addUnit, isFunction } from '../common/util'

const props = defineProps(notifyProps)
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'click', event: MouseEvent): void
  (e: 'closed'): void
  (e: 'opened'): void
}>()
const state = inject(getNotifyOptionKey(props.selector), ref<NotifyProps>(props))

const customStyle = computed(() => {
  const { safeHeight, position } = state.value
  let customStyle: string = ''
  switch (position) {
    case 'top':
      customStyle = `top: calc(var(--window-top) + ${addUnit(safeHeight || 0)})`
      break
    case 'bottom':
      customStyle = 'bottom: var(--window-bottom)'
      break
    default:
      break
  }
  return customStyle
})

const onClick = (event: MouseEvent) => {
  if (isFunction(state.value.onClick)) return state.value.onClick(event)
  emits('click', event)
}
const onClosed = () => {
  if (isFunction(state.value.onClosed)) return state.value.onClosed()
  emits('closed')
}
const onOpened = () => {
  if (isFunction(state.value.onOpened)) return state.value.onOpened()
  emits('opened')
}

watch(
  () => state.value.visible,
  (visible) => {
    emits('update:visible', visible as boolean)
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
