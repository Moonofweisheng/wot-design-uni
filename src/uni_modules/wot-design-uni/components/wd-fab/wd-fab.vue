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
      <wd-button @click="handleClick" custom-class="wd-fab__trigger" round :type="type" :disabled="disabled">
        <wd-icon custom-class="wd-fab__icon" :name="isActive ? activeIcon : inactiveIcon"></wd-icon>
      </wd-button>
    </view>
    <wd-transition
      :enter-class="`wd-fab__transition-enter--${fabDirection}`"
      enter-active-class="wd-fab__transition-enter-active"
      :leave-to-class="`wd-fab__transition-leave-to--${fabDirection}`"
      leave-active-class="wd-fab__transition-leave-active"
      :custom-class="`wd-fab__actions wd-fab__actions--${fabDirection}`"
      :show="isActive"
      :duration="300"
      name=""
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
import { type CSSProperties, computed, ref, watch, inject, getCurrentInstance, onBeforeUnmount, onMounted, nextTick } from 'vue'
import { getRect, isDef, isH5, objToStyle } from '../common/util'
import { type Queue, queueKey } from '../composables/useQueue'
import { closeOther, pushToQueue, removeFromQueue } from '../common/clickoutside'
import { fabProps, type FabExpose } from './types'
import { reactive } from 'vue'

const props = defineProps(fabProps)
const emit = defineEmits(['update:active'])
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
const fabSize = ref<number>(56)
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
    fabSize.value = trigerInfo.width || 56
  } catch (error) {
    console.log(error)
  }

  const { top = 16, left = 16, right = 16, bottom = 16 } = props.gap
  screen.width = sysInfo.windowWidth
  screen.height = isH5 ? sysInfo.windowTop + sysInfo.windowHeight : sysInfo.windowHeight
  bounding.minTop = isH5 ? sysInfo.windowTop + top : top
  bounding.minLeft = left
  bounding.maxLeft = screen.width - fabSize.value - right
  bounding.maxTop = screen.height - fabSize.value - bottom
}

function initPosition() {
  const pos = props.position
  const { minLeft, minTop, maxLeft, maxTop } = bounding
  if (pos === 'left-top') {
    top.value = minTop
    left.value = minLeft
  } else if (pos === 'right-top') {
    top.value = minTop
    left.value = maxLeft
  } else if (pos === 'left-bottom') {
    top.value = maxTop
    left.value = minLeft
  } else if (pos === 'right-bottom') {
    top.value = maxTop
    left.value = maxLeft
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
  const fabCenterX = left.value + fabSize.value / 2
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
  return `${objToStyle(style)};${props.customStyle}`
})

onMounted(() => {
  if (queue && queue.pushToQueue) {
    queue.pushToQueue(proxy)
  } else {
    pushToQueue(proxy)
  }

  nextTick(async () => {
    await getBounding()
    initPosition()
    inited.value = true
  })
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
