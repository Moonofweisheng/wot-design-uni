<template>
  <view
    :class="`wd-floating-panel ${customClass} ${safeAreaInsetBottom ? 'is-safe' : ''}`"
    :style="rootStyle"
    @touchstart.passive="handleTouchStart"
    @touchmove.passive="handleTouchMove"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchEnd"
  >
    <view :class="`wd-floating-panel__header`">
      <view :class="`wd-floating-panel__header-bar`"></view>
    </view>

    <scroll-view
      :class="`wd-floating-panel__content`"
      data-id="content"
      :show-scrollbar="showScrollbar"
      scroll-y
      @touchmove.stop.prevent="handleTouchMove"
    >
      <slot />
    </scroll-view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-floating-panel',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch, type CSSProperties } from 'vue'
import { floatingPanelProps } from './type'
import { addUnit, closest, objToStyle } from '../common/util'
import { useTouch } from '../composables/useTouch'

const touch = useTouch()

const props = defineProps(floatingPanelProps)
const emit = defineEmits(['update:height', 'height-change'])

const DAMP = 0.2 // 阻尼系数
let startY: number // 起始位置
const height = ref<number>(props.height) // 当前高度
const windowHeight = ref<number>(0)
const dragging = ref<boolean>(false) // 是否正在拖拽

const boundary = computed(() => ({
  min: props.anchors[0] ? props.anchors[0] : 100,
  max: props.anchors[props.anchors.length - 1] ? props.anchors[props.anchors.length - 1] : Math.round(windowHeight.value * 0.6)
}))

const anchors = computed(() => (props.anchors.length >= 2 ? props.anchors : [boundary.value.min, boundary.value.max]))

const rootStyle = computed(() => {
  const style: CSSProperties = {
    height: addUnit(boundary.value.max),
    transform: `translateY(calc(100% + ${addUnit(-height.value)}))`,
    transition: !dragging.value ? `transform ${props.duration}ms cubic-bezier(0.18, 0.89, 0.32, 1.28)` : 'none'
  }

  return `${objToStyle(style)};${props.customStyle}`
})

const handleTouchStart = (event: TouchEvent) => {
  touch.touchStart(event)
  dragging.value = true
  startY = -height.value
}

const handleTouchMove = (event: TouchEvent) => {
  const target = event.currentTarget as any
  if (target.dataset.id == 'content') {
    if (!props.contentDraggable) return
  }
  touch.touchMove(event)
  const moveY = touch.deltaY.value + startY
  height.value = -ease(moveY)
}

const handleTouchEnd = () => {
  dragging.value = false
  height.value = closest(anchors.value, height.value)

  if (height.value !== -startY) {
    emit('height-change', { height: height.value })
  }
}

const ease = (y: number) => {
  const absDistance = Math.abs(y)
  const { min, max } = boundary.value

  if (absDistance > max) {
    return -(max + (absDistance - max) * DAMP)
  }

  if (absDistance < min) {
    return -(min - (min - absDistance) * DAMP)
  }

  return y
}

watch(
  () => height.value,
  (value) => {
    emit('update:height', value)
  }
)

watch(
  boundary,
  () => {
    height.value = closest(anchors.value, height.value)
  },
  { immediate: true }
)

onBeforeMount(() => {
  const { windowHeight: _windowHeight } = uni.getSystemInfoSync()
  windowHeight.value = _windowHeight
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
