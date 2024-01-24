<template>
  <view :class="`wd-radio-group  ${customClass} ${cell && shape === 'button' ? 'is-button' : ''}`">
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-radio-group',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { watch } from 'vue'
import { useChildren } from '../composables/useChildren'
import { RADIO_GROUP_KEY } from './types'

type RadioShape = 'dot' | 'button' | 'check'
interface Props {
  customClass?: string
  modelValue?: string | number | boolean
  shape?: RadioShape
  checkedColor?: string
  disabled?: boolean
  cell?: boolean
  size?: string
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  shape: 'check',
  size: '',
  disabled: false,
  inline: false,
  cell: false
})

const { linkChildren, children } = useChildren(RADIO_GROUP_KEY)

linkChildren({ props, updateValue })

watch(
  () => props.shape,
  (newValue) => {
    // type: 'dot', 'button', 'check'
    const type = ['check', 'dot', 'button']
    if (type.indexOf(newValue) === -1) console.error(`shape must be one of ${type.toString()}`)
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['change', 'update:modelValue'])

/**
 * @description 处理radio子节点通知
 */
function updateValue(value: string | number | boolean) {
  emit('update:modelValue', value)
  emit('change', {
    value
  })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
