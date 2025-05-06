<template>
  <view
    @touchmove.stop.prevent="handleTouchMove"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    :class="`wd-fab ${customClass}`"
    :style="rootStyle"
    @click.stop=""
  >
    <view @click.stop="" :style="{ visibility: inited ? 'visible' : 'hidden' }" id="trigger">
      <slot name="trigger" v-if="$slots.trigger"></slot>
      <wd-button v-else @click="handleClick" custom-class="wd-fab__trigger" round :type="type" :disabled="disabled">
        <wd-icon custom-class="wd-fab__icon" :name="isActive ? activeIcon : inactiveIcon"></wd-icon>
      </wd-button>
    </view>
    <wd-transition
      v-if="expandable"
      :enter-class="`wd-fab__transition-enter--${fabDirection}`"
      enter-active-class="wd-fab__transition-enter-active"
      :leave-to-class="`wd-fab__transition-leave-to--${fabDirection}`"
      leave-active-class="wd-fab__transition-leave-active"
      :custom-class="`wd-fab__actions wd-fab__actions--${fabDirection}`"
      :show="isActive"
      :duration="300"
    >
      <slot></slot>
    </wd-transition>
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
import wdButton from '../wd-button/wd-button.vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import wdTransition from '../wd-transition/wd-transition.vue'
import { type CSSProperties, computed, ref, watch, inject, getCurrentInstance, onBeforeUnmount, onMounted, nextTick } from 'vue'
import { getRect, isDef, isH5, objToStyle } from '../common/util'
import { type Queue, queueKey } from '../composables/useQueue'
import { closeOther, pushToQueue, removeFromQueue } from '../common/clickoutside'
import { fabProps, type FabExpose } from './types'
import { reactive } from 'vue'
import { useRaf } from '../composables/useRaf'

const props = defineProps(fabProps)
const emit = defineEmits(['update:active', 'click'])
const inited = ref<boolean>(false) // 是否初始化完成
const isActive = ref<boolean>(false) // 是否激活状态
const queue = inject<Queue | null>(queueKey, null)
const { proxy } = getCurrentInstance() as any

watch(
  () => props.active,
  (newValue) => {
    isActive.value = newValue
  },
  { immediate: true, deep: true }
)

watch(
  () => isActive.value,
  (newValue) => {
    if (newValue) {
      if (queue && queue.closeOther) {
        queue.closeOther(proxy)
      } else {
        closeOther(proxy)
      }
    }
  }
)

const fabDirection = ref(props.direction)

watch(
  () => props.direction,
  (direction) => (fabDirection.value = direction)
)

watch(
  () => props.position,
  () => initPosition()
)

const top = ref<number>(0)
const left = ref<number>(0)
const screen = reactive({ width: 0, height: 0 })
const fabSize = reactive({ width: 56, height: 56 })
const bounding = reactive({
  minTop: 0,
  minLeft: 0,
  maxTop: 0,
  maxLeft: 0
})

async function getBounding() {
  const sysInfo = uni.getSystemInfoSync()
  try {
    const trigerInfo = await getRect('#trigger', false, proxy)
    fabSize.width = trigerInfo.width || 56
    fabSize.height = trigerInfo.height || 56
  } catch (error) {
    console.log(error)
  }

  const { top = 16, left = 16, right = 16, bottom = 16 } = props.gap
  screen.width = sysInfo.windowWidth
  screen.height = isH5 ? sysInfo.windowTop + sysInfo.windowHeight : sysInfo.windowHeight
  bounding.minTop = isH5 ? sysInfo.windowTop + top : top
  bounding.minLeft = left
  bounding.maxLeft = screen.width - fabSize.width - right
  bounding.maxTop = screen.height - fabSize.height - bottom
}

function initPosition() {
  const pos = props.position
  const { minLeft, minTop, maxLeft, maxTop } = bounding
  const centerY = (maxTop + minTop) / 2
  const centerX = (maxLeft + minLeft) / 2

  switch (pos) {
    case 'left-top':
      top.value = minTop
      left.value = minLeft
      break
    case 'right-top':
      top.value = minTop
      left.value = maxLeft
      break
    case 'left-bottom':
      top.value = maxTop
      left.value = minLeft
      break
    case 'right-bottom':
      top.value = maxTop
      left.value = maxLeft
      break
    case 'left-center':
      top.value = centerY
      left.value = minLeft
      break
    case 'right-center':
      top.value = centerY
      left.value = maxLeft
      break
    case 'top-center':
      top.value = minTop
      left.value = centerX
      break
    case 'bottom-center':
      top.value = maxTop
      left.value = centerX
      break
  }
}

// 按下时坐标相对于元素的偏移量
const touchOffset = reactive({ x: 0, y: 0 })
const attractTransition = ref<boolean>(false)
function handleTouchStart(e: TouchEvent) {
  if (props.draggable === false) return

  const touch = e.touches[0]
  touchOffset.x = touch.clientX - left.value
  touchOffset.y = touch.clientY - top.value
  attractTransition.value = false
}

function handleTouchMove(e: TouchEvent) {
  if (props.draggable === false) return

  const touch = e.touches[0]
  const { minLeft, minTop, maxLeft, maxTop } = bounding
  let x = touch.clientX - touchOffset.x
  let y = touch.clientY - touchOffset.y

  if (x < minLeft) x = minLeft
  else if (x > maxLeft) x = maxLeft

  if (y < minTop) y = minTop
  else if (y > maxTop) y = maxTop

  top.value = y
  left.value = x
}

function handleTouchEnd() {
  if (props.draggable === false) return

  const screenCenterX = screen.width / 2
  const fabCenterX = left.value + fabSize.width / 2
  attractTransition.value = true
  if (fabCenterX < screenCenterX) {
    left.value = bounding.minLeft
    fabDirection.value = 'right'
  } else {
    left.value = bounding.maxLeft
    fabDirection.value = 'left'
  }
}

const rootStyle = computed(() => {
  const style: CSSProperties = {
    top: top.value + 'px',
    left: left.value + 'px',
    transition: attractTransition.value ? 'all ease 0.3s' : 'none'
  }
  if (isDef(props.zIndex)) {
    style['z-index'] = props.zIndex
  }
  return `${objToStyle(style)}${props.customStyle}`
})

onMounted(() => {
  if (queue && queue.pushToQueue) {
    queue.pushToQueue(proxy)
  } else {
    pushToQueue(proxy)
  }

  const { start } = useRaf(async () => {
    await getBounding()
    initPosition()
    inited.value = true
  })
  start()
})

onBeforeUnmount(() => {
  if (queue && queue.removeFromQueue) {
    queue.removeFromQueue(proxy)
  } else {
    removeFromQueue(proxy)
  }
})

function handleClick() {
  if (props.disabled) {
    return
  }
  if (!props.expandable) {
    emit('click')
    return
  }
  isActive.value = !isActive.value
  emit('update:active', isActive.value)
}

function open() {
  isActive.value = true
  emit('update:active', true)
}

function close() {
  isActive.value = false
  emit('update:active', false)
}

defineExpose<FabExpose>({
  open,
  close
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
