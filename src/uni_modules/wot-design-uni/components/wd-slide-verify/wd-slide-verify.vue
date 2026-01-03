<template>
  <view :class="rootClass" :style="rootStyle" id="wdSlideVerifyRoot">
    <!-- 背景提示文字 -->
    <view class="wd-slide-verify__text">
      <slot name="text">
        <text class="wd-slide-verify__text-inner">
          {{ text }}
        </text>
      </slot>
    </view>

    <!-- 滑过区域 -->
    <view class="wd-slide-verify__track" :style="trackStyle">
      <view class="wd-slide-verify__track-text">
        <slot name="success-text">
          <text class="wd-slide-verify__track-text--success">
            {{ successText }}
          </text>
        </slot>
      </view>
    </view>

    <!-- 滑块 -->
    <view
      class="wd-slide-verify__button"
      @touchstart.prevent="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
      :style="buttonStyle"
    >
      <slot v-if="isPass" name="success-icon">
        <view class="wd-slide-verify__button-icon--success">
          <wd-icon :name="successIcon" :size="12" color="#fff" />
        </view>
      </slot>

      <slot v-else name="icon">
        <view class="wd-slide-verify__button-icon">
          <wd-icon :name="icon" :size="iconSize" />
        </view>
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-slide-verify',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref, computed, onBeforeUnmount, type CSSProperties } from 'vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import { slideVerifyProps } from './type'
import { useTouch } from '../composables/useTouch'
import { objToStyle } from '../common/util'

const props = defineProps(slideVerifyProps)
const emit = defineEmits(['success', 'fail'])

const touch = useTouch()

const rootClass = computed(() => {
  return [
    'wd-slide-verify',
    {
      'is-disabled': props.disabled,
      'is-success': isPass.value,
      'is-dragging': isDragging.value
    },
    props.customClass
  ]
})

const rootStyle = computed(() => {
  const style: CSSProperties = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    backgroundColor: props.backgroundColor
  }

  return `${objToStyle(style)}${props.customStyle}`
})

const buttonStyle = computed(() => {
  const size = props.height
  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    transform: `translate(${currentPosition.value}px, 0)`,
    transition: isResetting.value ? 'all 0.3s ease' : 'none',
    '--wd-slide-verify-button-size': `${size}px`
  }
  return objToStyle(style)
})

const trackStyle = computed(() => {
  const style: CSSProperties = {
    width: `${currentPosition.value}px`,
    backgroundColor: props.activeBackgroundColor,
    '--track-width': `${props.width}px`
  }
  return objToStyle(style)
})

/**
 * 从字符串或数字中解析出有效的数字。
 *
 * - 对于 number 类型，直接返回原值（可能包括 Infinity、-Infinity）。
 * - 对于 string 类型，使用 `parseFloat` 解析前缀中的数字。
 * - 当无法解析出有效数字（结果为 NaN）时，返回 0 作为安全默认值。
 *
 * 注意：后续使用该函数的逻辑（如 `maxPosition` 计算）会额外通过 `isFinite`
 * 等判断过滤掉 Infinity / 非法值，因此这里不会主动抛错，而是保证返回一个 number。
 */
const parseNumber = (value: string | number): number => {
  if (typeof value === 'number') return value
  const num = parseFloat(String(value))
  return isNaN(num) ? 0 : num
}

// 最大位置，避免超出了范围导致展示异常
const maxPosition = computed(() => {
  const width = parseNumber(props.width)
  const height = parseNumber(props.height)
  if (!isFinite(width) || !isFinite(height) || width <= 0 || height <= 0) {
    return 0
  }
  return Math.max(0, width - height)
})

// 完成状态判断
const isComplete = computed(() => {
  const distance = Math.abs(maxPosition.value - currentPosition.value)
  return distance <= Number(props.tolerance) // 容差范围内完成
})

// 位置状态
const currentPosition = ref<number>(0)
const startPosition = ref<number>(0)
// 成功状态
const isPass = ref<boolean>(false)
// 拖动状态
const isDragging = ref<boolean>(false)
// 回弹
const isResetting = ref(false)

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))
const updatePosition = (position: number) => {
  // 限制位置在允许范围内
  currentPosition.value = clamp(position, 0, maxPosition.value)
}

const isDisabled = computed(() => props.disabled || isPass.value)
const onTouchStart = (event: TouchEvent): void => {
  if (isDisabled.value || isDragging.value) return

  touch.touchStart(event)
  startPosition.value = currentPosition.value
  isDragging.value = true
}

const onTouchMove = (event: TouchEvent): void => {
  if (isDisabled.value || !isDragging.value) return

  touch.touchMove(event)
  updatePosition(startPosition.value + touch.deltaX.value)
}
// 控制回弹
const timer = ref<ReturnType<typeof setTimeout> | null>(null)

const onTouchEnd = (): void => {
  if (isDisabled.value || !isDragging.value) return
  isDragging.value = false

  if (isComplete.value) {
    // 完成
    updatePosition(maxPosition.value)
    isPass.value = true
    emit('success')
  } else {
    isResetting.value = true
    // 失败回到起点
    updatePosition(0)
    emit('fail')

    timer.value = setTimeout(() => {
      isResetting.value = false
    }, 300)
  }
}

onBeforeUnmount(() => {
  if (timer.value !== null) {
    clearTimeout(timer.value)
    timer.value = null
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
