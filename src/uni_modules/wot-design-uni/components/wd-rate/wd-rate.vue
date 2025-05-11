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
        @click="changeRate(index, false)"
      />
      <view v-if="props.allowHalf" class="wd-rate__item-half" @click.stop="changeRate(index, true)">
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
 * @description 点击icon触发组件的change事件
 */
function changeRate(index: number, isHalf: boolean) {
  if (props.readonly || props.disabled) return
  const value = isHalf ? index + 0.5 : index + 1
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
      changeRate(targetIndex, isHalf)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
