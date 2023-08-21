<template>
  <view :class="`wd-rate ${customClass}`">
    <view
      v-for="(rate, index) in rateList"
      :key="index"
      :data-index="index"
      :style="{ 'margin-right': index == rateList.length - 1 ? 0 : space }"
      class="wd-rate__item"
      @click="changeRate(index)"
    >
      <view class="wd-rate__item-star" :style="{ width: size, height: size }">
        <wd-icon :name="icon" :size="size" :custom-style="iconStyle" />
      </view>
      <view class="wd-rate__item-star wd-rate__item-star--active" :style="{ width: rate, height: size }">
        <wd-icon :name="activeIcon" :size="size" :custom-style="iconActiveStyle" />
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
import { computed, ref, watch } from 'vue'

interface Props {
  customClass?: string
  num: number
  modelValue: string | number | null
  readonly: boolean
  size: string
  space: string
  color: string
  activeColor: string | Array<string>
  icon: string
  activeIcon: string
  disabled: boolean
  disabledColor: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  num: 5,
  modelValue: null,
  readonly: false,
  size: '16px',
  space: '4px',
  color: '#E8E8E8',
  activeColor: 'linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)',
  icon: 'star-on',
  activeIcon: 'star-on',
  disabled: false,
  disabledColor: 'linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%)'
})

const rateList = ref<Array<string>>([])
const activeValue = ref<string>('')
const emit = defineEmits(['update:modelValue', 'change'])

const iconStyle = computed(() => {
  return `background:${props.color}; -webkit-background-clip: text; color: transparent`
})

const iconActiveStyle = computed(() => {
  return `background:${props.disabled ? props.disabledColor : activeValue.value}; -webkit-background-clip: text; color: transparent`
})

watch(
  () => props.activeColor,
  (newVal) => {
    if (Array.isArray(newVal) && !newVal.length) {
      throw Error('activeColor cannot be an empty array')
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

/**
 * @description 计算当前应当展示的rate数量
 */
function computeRateList() {
  const { modelValue, num } = props
  // value和num都准备好才能计算
  if (modelValue === null || !num) return
  if (typeof modelValue !== 'number') {
    console.error('[Wot Design] error(wd-rate): the value of wd-rate should be a number')
    return
  }
  const tempRateList: string[] = []
  const fullLength = Math.ceil(modelValue) - 1
  for (let i = 0; i < num; i++) {
    if (i < fullLength) {
      tempRateList.push('100%')
    } else if (i === fullLength) {
      const rate = modelValue - fullLength > 0.5 ? 1 : 0.5
      tempRateList.push(rate * 100 + '%')
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
 * @param Event
 */
function changeRate(index: number) {
  if (props.readonly || props.disabled) return
  emit('update:modelValue', index + 1)
  emit('change', {
    value: index + 1
  })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
