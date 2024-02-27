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
const $item = '.wd-segmented__item'

type SegmentedType = 'large' | 'middle' | 'small'

interface SegmentedOption {
  value: string | number // 选中值
  disabled?: boolean // 是否禁用
  payload?: any // 更多数据
}

/**
 * 分段器信息
 */
interface SegmentedInfo {
  height: number
  width: number
}

interface Props {
  // 当前选中的值
  value: string | number
  // 是否禁用
  disabled?: boolean
  // 控件尺寸
  size?: SegmentedType
  // 数据集合
  options: string[] | number[] | SegmentedOption[]
  // 切换选项时是否振动
  vibrateShort?: boolean
  // 自定义样式
  customStyle?: string
  // 自定义样式类
  customClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: 'middle',
  options: () => [],
  vibrateShort: false,
  disabled: false,
  customStyle: '',
  customClass: ''
})

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
  getRect('.wd-segmented__item', false, proxy).then((rect: any) => {
    if (rect) {
      sectionItemInfo.height = rect.height
      sectionItemInfo.width = rect.width
      updateCurrentIndex()
      updateActiveStyle()
    }
  })
})

const emit = defineEmits(['update:value', 'change'])

/**
 * @description 更新滑块偏移量
 *
 */
function updateActiveStyle() {
  getRect($item, true, proxy).then((rects: any) => {
    const rect = rects[activeIndex.value]
    let left = rects.slice(0, activeIndex.value).reduce((prev, curr) => prev + curr.width, 0)
    left += (rect.width - sectionItemInfo.width) / 2
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
    emit('change', { value })
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
  emit('change', { value })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
