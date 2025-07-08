<template>
  <wd-root-portal v-if="rootPortal">
    <view class="wd-popup-wrapper">
      <wd-overlay
        v-if="modal"
        :show="modelValue"
        :z-index="zIndex"
        :lock-scroll="lockScroll"
        :duration="duration"
        :custom-style="modalStyle"
        @click="handleClickModal"
        @touchmove="noop"
      />
      <wd-transition
        :lazy-render="lazyRender"
        :custom-class="rootClass"
        :custom-style="style"
        :duration="duration"
        :show="modelValue"
        :name="transitionName"
        :destroy="hideWhenClose"
        @before-enter="emit('before-enter')"
        @enter="emit('enter')"
        @after-enter="emit('after-enter')"
        @before-leave="emit('before-leave')"
        @leave="emit('leave')"
        @after-leave="emit('after-leave')"
      >
        <slot />
        <wd-icon v-if="closable" custom-class="wd-popup__close" name="add" @click="close" />
      </wd-transition>
    </view>
  </wd-root-portal>

  <!-- 非传送模式 -->
  <view v-else class="wd-popup-wrapper">
    <wd-overlay
      v-if="modal"
      :show="modelValue"
      :z-index="zIndex"
      :lock-scroll="lockScroll"
      :duration="duration"
      :custom-style="modalStyle"
      @click="handleClickModal"
      @touchmove="noop"
    />
    <wd-transition
      :lazy-render="lazyRender"
      :custom-class="rootClass"
      :custom-style="style"
      :duration="duration"
      :show="modelValue"
      :name="transitionName"
      :destroy="hideWhenClose"
      @before-enter="emit('before-enter')"
      @enter="emit('enter')"
      @after-enter="emit('after-enter')"
      @before-leave="emit('before-leave')"
      @leave="emit('leave')"
      @after-leave="emit('after-leave')"
    >
      <slot />
      <wd-icon v-if="closable" custom-class="wd-popup__close" name="add" @click="close" />
    </wd-transition>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-popup',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import wdOverlay from '../wd-overlay/wd-overlay.vue'
import wdTransition from '../wd-transition/wd-transition.vue'
import wdRootPortal from '../wd-root-portal/wd-root-portal.vue'
import { popupProps } from './types'
import type { TransitionName } from '../wd-transition/types'

const props = defineProps(popupProps)
const emit = defineEmits([
  'update:modelValue',
  'before-enter',
  'enter',
  'before-leave',
  'leave',
  'after-leave',
  'after-enter',
  'click-modal',
  'close'
])

/**
 * 弹出位置
 */
const transitionName = computed<TransitionName | TransitionName[]>(() => {
  if (props.transition) {
    return props.transition
  }
  if (props.position === 'center') {
    return ['zoom-in', 'fade']
  }
  if (props.position === 'left') {
    return 'slide-left'
  }
  if (props.position === 'right') {
    return 'slide-right'
  }
  if (props.position === 'bottom') {
    return 'slide-up'
  }
  if (props.position === 'top') {
    return 'slide-down'
  }
  return 'slide-up'
})

const safeBottom = ref<number>(0)

const style = computed(() => {
  return `z-index:${props.zIndex}; padding-bottom: ${safeBottom.value}px;${props.customStyle}`
})

const rootClass = computed(() => {
  return `wd-popup wd-popup--${props.position} ${!props.transition && props.position === 'center' ? 'is-deep' : ''} ${props.customClass || ''}`
})

onBeforeMount(() => {
  if (props.safeAreaInsetBottom) {
    const { safeArea, screenHeight, safeAreaInsets } = uni.getSystemInfoSync()

    if (safeArea) {
      // #ifdef MP-WEIXIN
      safeBottom.value = screenHeight - (safeArea!.bottom || 0)
      // #endif
      // #ifndef MP-WEIXIN
      safeBottom.value = safeAreaInsets ? safeAreaInsets.bottom : 0
      // #endif
    } else {
      safeBottom.value = 0
    }
  }
})

function handleClickModal() {
  emit('click-modal')
  if (props.closeOnClickModal) {
    close()
  }
}

function close() {
  emit('close')
  emit('update:modelValue', false)
}
function noop() {}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
