<template>
  <view :class="`wd-checkbox-group ${shape === 'button' && cell ? 'is-button' : ''} ${customClass}`" :style="customStyle">
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-checkbox-group',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { watch } from 'vue'
import { checkNumRange, deepClone } from '../common/util'
import { useChildren } from '../composables/useChildren'
import { CHECKBOX_GROUP_KEY, checkboxGroupProps } from './types'

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(['change', 'update:modelValue'])

const { linkChildren } = useChildren(CHECKBOX_GROUP_KEY)

linkChildren({ props, changeSelectState })

watch(
  () => props.modelValue,
  (newValue) => {
    // 传入的value数组中包括重复的元素，这种情况非法。
    if (new Set(newValue).size !== newValue.length) {
      // eslint-disable-next-line quotes
      console.error("checkboxGroup's bound value includes same value")
    }
    if (newValue.length < props.min) {
      // eslint-disable-next-line quotes
      console.error("checkboxGroup's bound value's length can't be less than min")
    }
    if (props.max !== 0 && newValue.length > props.max) {
      // eslint-disable-next-line quotes
      console.error("checkboxGroup's bound value's length can't be large than max")
    }
    // 每次value变化都会触发重新匹配选中项
  },
  { deep: true, immediate: true }
)

watch(
  () => props.shape,
  (newValue) => {
    const type = ['circle', 'square', 'button']
    if (type.indexOf(newValue) === -1) console.error(`shape must be one of ${type.toString()}`)
  },
  { deep: true, immediate: true }
)

watch(
  () => props.min,
  (newValue) => {
    checkNumRange(newValue, 'min')
  },
  { deep: true, immediate: true }
)

watch(
  () => props.max,
  (newValue) => {
    checkNumRange(newValue, 'max')
  },
  { deep: true, immediate: true }
)

/**
 * @description 子节点通知父节点修改子节点选中状态
 * @param {any} value 子组件的标识符
 */
function changeSelectState(value: string | number | boolean) {
  const temp: (string | number | boolean)[] = deepClone(props.modelValue)
  const index = temp.indexOf(value)
  if (index > -1) {
    // 已经选中，则从 value 列表中删除子节点的标识符。
    temp.splice(index, 1)
  } else {
    // 之前未选中，则现在把加子节点的标识符加到 value 列表中。
    temp.push(value)
  }
  emit('update:modelValue', temp)

  emit('change', {
    value: temp
  })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
