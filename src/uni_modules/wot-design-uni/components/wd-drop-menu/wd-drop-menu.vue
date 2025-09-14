<template>
  <view :style="customStyle" :class="`wd-drop-menu ${customClass}`" @click.stop.prevent="noop" :id="dropMenuId">
    <wd-overlay
      :show="overlayVisible"
      :duration="duration"
      :z-index="12"
      :custom-style="modalStyle"
      @click="handleClickOverlay"
      @touchmove="noop"
      v-if="modal"
    />

    <!-- #ifdef MP-DINGTALK -->
    <view :id="dropMenuId">
      <!-- #endif -->
      <view class="wd-drop-menu__list">
        <view
          v-for="(child, index) in children"
          :key="index"
          @click="toggle(child)"
          :class="`wd-drop-menu__item ${child.disabled ? 'is-disabled' : ''} ${child.$.exposed!.getShowPop() ? 'is-active' : ''}`"
        >
          <view class="wd-drop-menu__item-title">
            <view class="wd-drop-menu__item-title-text">{{ getDisplayTitle(child) }}</view>
            <wd-icon :name="child.icon" :size="child.iconSize" custom-class="wd-drop-menu__arrow" />
          </view>
        </view>
      </view>
      <slot />
      <!-- #ifdef MP-DINGTALK -->
    </view>
    <!-- #endif -->
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-drop-menu',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onBeforeMount, ref, watch } from 'vue'
import { closeOther } from '../common/clickoutside'
import { type Queue, queueKey } from '../composables/useQueue'
import { getRect, uuid } from '../common/util'
import { useChildren } from '../composables/useChildren'
import { DROP_MENU_KEY, dropMenuProps } from './types'
import wdOverlay from '../wd-overlay/wd-overlay.vue'

const props = defineProps(dropMenuProps)
const queue = inject<Queue | null>(queueKey, null)
const dropMenuId = ref<string>(`dropMenuId${uuid()}`)
const offset = ref<number>(0)
const windowHeight = ref<number>(0)
const modalStyle = computed(() => {
  return props.direction === 'down'
    ? `top: calc(var(--window-top) + ${offset.value}px); bottom: 0;`
    : `top: 0; bottom: calc(var(--window-bottom) + ${offset.value}px)`
})

const { proxy } = getCurrentInstance() as any

const { linkChildren, children } = useChildren(DROP_MENU_KEY)

const showOverlay = computed(() => {
  return children.some((child) => child.$.exposed!.getShowPop())
})

const overlayVisible = ref(false)
let overlayTimer: ReturnType<typeof setTimeout> | null

// 延迟关闭遮罩层，避免闪烁
// 小程序中，即使先 fold 再 closeOther 也会有闪烁，使用延迟关闭遮罩层处理
watch(showOverlay, (newVal) => {
  if (overlayTimer) {
    clearTimeout(overlayTimer)
  }
  if (newVal) {
    overlayVisible.value = true
  } else {
    overlayTimer = setTimeout(() => {
      overlayVisible.value = false
      overlayTimer = null
    }, 16)
  }
})

linkChildren({ props, fold, offset })

watch(
  () => props.direction,
  (newValue) => {
    if (!['up', 'down'].includes(newValue)) {
      // eslint-disable-next-line quotes
      console.error("[wot ui] warning(wd-drop-menu): direction must be 'up' or 'down'")
    }
  },
  { deep: true, immediate: true }
)

onBeforeMount(() => {
  windowHeight.value = uni.getSystemInfoSync().windowHeight
})

function noop() {}

function getDisplayTitle(child: any) {
  const { title, modelValue, options, valueKey, labelKey } = child

  if (title) {
    return title
  }
  for (let i = 0, len = options.length; i < len; i++) {
    if (modelValue === options[i][valueKey]) {
      return options[i][labelKey]
    }
  }
  console.error('[wot-design] warning(wd-drop-menu-item): no value is matched in the options option.')
}

function toggle(child: any) {
  // 点击当前 menu, 关闭其他 menu
  if (child && !child.disabled) {
    if (queue && queue.closeOther) {
      queue.closeOther(child)
    } else {
      closeOther(child)
    }
    fold(child)
  }
}

/**
 * 控制菜单内容是否展开
 */
function fold(child: any) {
  getRect(`#${dropMenuId.value}`, false, proxy).then((rect) => {
    if (!rect) return
    const { top, bottom } = rect
    if (props.direction === 'down') {
      offset.value = Number(bottom)
    } else {
      offset.value = windowHeight.value - Number(top)
    }
    child.$.exposed!.toggle()
  })
}

function handleClickOverlay() {
  if (props.closeOnClickModal) {
    // 关闭所有打开的菜单项
    children.forEach((child) => {
      child.$.exposed!.close()
    })
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
