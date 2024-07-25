<template>
  <view :class="`wd-segmented ${customClass}`" :style="customStyle">
    <view
      :class="`wd-segmented__item is-${size} ${state.activeIndex === index ? 'is-active' : ''} ${
        disabled || (isObj(option) ? option.disabled : false) ? 'is-disabled' : ''
      }`"
      @click="handleClick(option, index)"
      v-for="(option, index) in options"
      :key="index"
    >
      <view class="wd-segmented__item-label">
        <slot name="label" v-if="$slots.label" :option="isObj(option) ? option : { value: option }"></slot>
        <template v-else>
          {{ isObj(option) ? option.value : option }}
        </template>
      </view>
    </view>
    <view :class="`wd-segmented__item--active ${activeDisabled ? 'is-disabled' : ''}`" :style="state.activeStyle"></view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-segmented',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, watch } from 'vue'
import { requestAnimationFrame, getRect, isObj, objToStyle, addUnit } from '../common/util'
import type { CSSProperties } from 'vue'
import { segmentedProps, type SegmentedOption } from './types'
const $item = '.wd-segmented__item'

const props = defineProps(segmentedProps)
const emit = defineEmits(['update:value', 'change', 'click'])

const state = reactive({
  activeIndex: 0, // 选中项
  activeStyle: '' // 选中样式
})

const activeDisabled = computed(() => {
  return props.disabled || (props.options[0] && isObj(props.options[0]) ? props.options[0].disabled : false)
})

watch(
  () => props.value,
  () => {
    updateCurrentIndex()
    updateActiveStyle()
    if (props.vibrateShort) {
      uni.vibrateShort({})
    }
  },
  {
    immediate: false
  }
)

const { proxy } = getCurrentInstance() as any

onMounted(() => {
  updateCurrentIndex()
  requestAnimationFrame(() => {
    updateActiveStyle(false)
  })
})

/**
 * 更新滑块偏移量
 *
 */
function updateActiveStyle(animation: boolean = true) {
  getRect($item, true, proxy).then((rects) => {
    const rect = rects[state.activeIndex]
    const style: CSSProperties = {
      position: 'absolute',
      width: addUnit(rect.width!),
      'z-index': 0
    }
    const left = rects.slice(0, state.activeIndex).reduce((prev, curr) => prev + Number(curr.width), 0)
    if (left) {
      style.transform = `translateX(${left}px)`
    }
    if (animation) {
      style.transition = 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)'
    }
    state.activeStyle = objToStyle(style)
  })
}

/**
 * 更新当前下标
 */
function updateCurrentIndex() {
  const index = props.options.findIndex((option: string | number | SegmentedOption) => {
    const value = isObj(option) ? option.value : option
    return value == props.value
  })
  if (index >= 0) {
    state.activeIndex = index
  } else {
    const value = isObj(props.options[0]) ? props.options[0].value : props.options[0]
    emit('update:value', value)
    emit('change', isObj(props.options[0]) ? props.options[0] : { value })
  }
}

function handleClick(option: string | number | SegmentedOption, index: number) {
  const disabled = props.disabled || (isObj(option) ? option.disabled : false)
  if (disabled) {
    return
  }
  const value = isObj(option) ? option.value : option
  state.activeIndex = index
  updateActiveStyle()
  emit('update:value', value)
  emit('change', isObj(option) ? option : { value })
  emit('click', isObj(option) ? option : { value })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
