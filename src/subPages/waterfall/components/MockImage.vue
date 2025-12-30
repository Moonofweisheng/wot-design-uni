<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  url: string
  meta: {
    width: number
    height: number
  }
  mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' // 图片裁剪模式，默认 aspectFill
  errorRate?: number // 错误率，0-1 之间，默认 0.3
  loadDelay?: { min: number; max: number } // 加载延迟范围，默认 50-300ms
}>()

const emit = defineEmits<{
  load: [
    event: {
      detail: {
        width: number
        height: number
      }
      type: 'load' | 'error'
    }
  ]
  error: [
    event: {
      detail: {
        width: number
        height: number
      }
      type: 'error'
    }
  ]
}>()

const internalWidth = ref(320)
const internalHeight = ref(240)
const isError = ref(false)
const isLoaded = ref(false)

const currWidth = computed(() => internalWidth.value)
const currHeight = computed(() => internalHeight.value)

const paddingTop = computed(() => `${(currHeight.value / currWidth.value) * 100}%`)

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

onMounted(() => {
  const errorRate = props.errorRate ?? 0.3
  const willError = Math.random() < errorRate
  const delay = props.loadDelay || { min: 50, max: 1500 }

  setTimeout(() => {
    internalWidth.value = props.meta.width
    internalHeight.value = props.meta.height
    isError.value = willError
    isLoaded.value = true

    if (willError) {
      // 加载失败：只触发 error 事件
      const errorEvent = {
        detail: {
          width: props.meta.width,
          height: props.meta.height
        },
        type: 'error' as const
      }
      emit('error', errorEvent)
    } else {
      // 加载成功：只触发 load 事件
      emit('load', {
        detail: {
          width: props.meta.width,
          height: props.meta.height
        },
        type: 'load'
      })
    }
  }, random(delay.min, delay.max))
})
</script>

<template>
  <view
    class="container"
    :style="{
      paddingTop
    }"
  >
    <view v-if="!isLoaded" class="item loading">
      <text class="loading-text">加载中...</text>
    </view>
    <view v-else-if="isError" class="item error">
      <text class="error-icon">✕</text>
      <text class="error-text">加载失败</text>
    </view>
    <image v-else class="item image" :mode="props.mode || 'aspectFill'" :src="url" />
  </view>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: inherit;
}

.item {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading {
  background-color: #f3f4f6;

  .loading-text {
    font-size: 14px;
    color: #9ca3af;
  }
}

.error {
  background-color: #fee2e2;

  .error-icon {
    font-size: 32px;
    color: #ef4444;
    margin-bottom: 8px;
  }

  .error-text {
    font-size: 14px;
    color: #dc2626;
  }
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
