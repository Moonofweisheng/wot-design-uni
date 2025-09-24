<template>
  <view :class="`wd-rate ${customClass}`" :style="customStyle" @touchmove="onTouchMove">
    <view
      v-for="(rate, index) in rateList"
      :key="index"
      :data-index="index"
      :style="{ 'margin-right': index == rateList.length - 1 ? 0 : space }"
      class="wd-rate__item"
    >
      <wd-icon
        custom-class="wd-rate__item-star"
        :name="isActive(rate) ? activeIcon : icon"
        :size="size"
        :custom-style="rate === '100%' ? iconActiveStyle : iconStyle"
        @click="handleClick(index, false)"
      />
      <view v-if="props.allowHalf" class="wd-rate__item-half" @click.stop="handleClick(index, true)">
        <wd-icon
          custom-class="wd-rate__item-star"
          :name="isActive(rate) ? activeIcon : icon"
          :size="size"
          :custom-style="rate !== '0' ? iconActiveStyle : iconStyle"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-rate',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { rateProps } from './types'
import { getRect } from '../common/util'
const { proxy } = getCurrentInstance() as any

const props = defineProps(rateProps)
const emit = defineEmits(['update:modelValue', 'change'])

const rateList = ref<Array<string>>([])
const activeValue = ref<string>('')

const iconStyle = computed(() => {
  return `background:${props.color};`
})

const iconActiveStyle = computed(() => {
  return `background:${props.disabled ? props.disabledColor : activeValue.value};`
})

watch(
  () => props.activeColor,
  (newVal) => {
    if (Array.isArray(newVal) && !newVal.length) {
      console.error('activeColor cannot be an empty array')
    }
    computeActiveValue()
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  [() => props.num, () => props.modelValue],
  () => {
    computeRateList()
  },
  {
    immediate: true,
    deep: true
  }
)

// 当前选项是否为激活状态
const isActive = (rate: string) => {
  return rate !== '0'
}

/**
 * @description 计算当前应当展示的rate数量
 */
function computeRateList() {
  const { modelValue, num, allowHalf } = props
  // value和num都准备好才能计算
  if (modelValue === null || !num) return
  if (typeof modelValue !== 'number') {
    console.error('[wot ui] error(wd-rate): the value of wd-rate should be a number')
    return
  }
  const tempRateList: string[] = []
  const fullLength = Math.floor(modelValue)
  for (let i = 0; i < num; i++) {
    if (i < fullLength) {
      tempRateList.push('100%')
    } else if (i === fullLength && allowHalf && modelValue % 1 !== 0) {
      tempRateList.push('50%')
    } else {
      tempRateList.push('0')
    }
  }
  rateList.value = tempRateList
  computeActiveValue()
}
/**
 * @description 计算当前应当展示的rate颜色
 */
function computeActiveValue() {
  const { activeColor, modelValue, num } = props
  let tempActiveValue: string = ''
  if (Array.isArray(activeColor) && activeColor.length) {
    tempActiveValue = Number(modelValue) <= num * 0.6 || !activeColor[1] ? activeColor[0] : activeColor[1]
  } else {
    tempActiveValue = activeColor as string
  }
  activeValue.value = tempActiveValue
}

/**
 * @description 处理点击事件
 * @param index 点击的索引
 * @param isHalf 是否为半星
 */
function handleClick(index: number, isHalf: boolean) {
  const { readonly, disabled, clearable, allowHalf, modelValue } = props
  if (readonly || disabled) return
  let value = isHalf ? index + 0.5 : index + 1
  // 点击清空逻辑：当点击的值与当前modelValue相等且等于最小值时允许清空
  if (clearable) {
    const minValue = allowHalf ? 0.5 : 1
    if (value === modelValue && value === minValue) {
      value = 0
    }
  }
  updateValue(value)
}

/**
 * @description 设置评分值并触发事件
 */
function updateValue(value: number) {
  emit('update:modelValue', value)
  emit('change', {
    value
  })
}

async function onTouchMove(event: TouchEvent) {
  const { clientX } = event.touches[0]
  const rateItems = await getRect('.wd-rate__item', true, proxy)
  const targetIndex = Array.from(rateItems).findIndex((rect) => {
    return clientX >= rect.left! && clientX <= rect.right!
  })
  if (targetIndex !== -1) {
    const target = rateItems[targetIndex]
    const itemWidth = target.width!
    const isHalf = props.allowHalf && clientX - target.left! < itemWidth / 2
    const value = isHalf ? targetIndex + 0.5 : targetIndex + 1
    if (value >= 0.5) {
      const value = isHalf ? targetIndex + 0.5 : targetIndex + 1
      updateValue(value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
