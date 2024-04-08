<template>
  <view :class="`wd-segmented ${customClass}`" :style="customStyle">
    <view
      :class="`wd-segmented__item is-${size} ${activeIndex === index ? 'is-active' : ''} ${
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
    <view :class="`wd-segmented__item--active ${activeDisabled ? 'is-disabled' : ''}`" :style="activeStyle"></view>
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
import { computed, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import { addUnit, getRect, isObj, objToStyle } from '../common/util'
import type { CSSProperties } from 'vue'
import { segmentedProps, type SegmentedInfo, type SegmentedOption } from './types'
const $item = '.wd-segmented__item'

const props = defineProps(segmentedProps)
const emit = defineEmits(['update:value', 'change'])

const sectionItemInfo = reactive<SegmentedInfo>({
  width: 0,
  height: 0
})

const activeIndex = ref<number>(0) // 选中项
const activeStyle = ref<string>('') // 选中样式

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
  getRect('.wd-segmented__item', false, proxy).then((rect) => {
    if (rect) {
      sectionItemInfo.height = Number(rect.height)
      sectionItemInfo.width = Number(rect.width)
      updateCurrentIndex()
      updateActiveStyle()
    }
  })
})

/**
 * @description 更新滑块偏移量
 *
 */
function updateActiveStyle() {
  getRect($item, true, proxy).then((rects) => {
    const rect = rects[activeIndex.value]
    let left = rects.slice(0, activeIndex.value).reduce((prev, curr) => prev + Number(curr.width), 0)
    left += (Number(rect.width) - sectionItemInfo.width) / 2
    const transition = 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)'
    const style: CSSProperties = {
      position: 'absolute',
      width: addUnit(sectionItemInfo.width),
      transition: transition,
      transform: `translateX(${left}px)`,
      'z-index': 0
    }
    // 防止重复绘制
    if (activeStyle.value !== objToStyle(style)) {
      activeStyle.value = objToStyle(style)
    }
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
    activeIndex.value = index
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
  activeIndex.value = index
  updateActiveStyle()
  emit('update:value', value)
  emit('change', isObj(option) ? option : { value })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
