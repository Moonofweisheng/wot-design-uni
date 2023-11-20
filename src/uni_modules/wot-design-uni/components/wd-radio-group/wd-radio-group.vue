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
import { getCurrentInstance, provide, watch } from 'vue'
import { isDef } from '../common/util'

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
  checkedColor: '#4D80F0',
  disabled: false,
  inline: false,
  cell: false
})

const children: any[] = [] // 子组件
const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (isDef(oldValue)) {
      // radioGroup绑定的value变化，，立即切换到此value对应的radio
      changeSelect(newValue)
    }
  },
  { deep: true, immediate: true }
)

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
 * 设置子项
 * @param child
 */
function setChild(child) {
  const hasChild = children.findIndex((radio) => {
    return radio.$.uid === child.$.uid
  })
  if (hasChild <= -1) {
    children.push(child)
  } else {
    children[hasChild] = child
  }
}

/**
 * 修改选中的radio
 * @param value - radio绑定的value
 * @param old - 老节点，默认为已经被选中的节点
 */
function changeSelect(value) {
  // 没有radio子元素，不执行任何操作
  if (!children || children.length === 0 || value === null) {
    return
  }
  children.forEach((child) => {
    child.$.exposed.setChecked(child.value === value)
  })
}
/**
 * @description 处理radio子节点通知
 */
function handleClick(value) {
  emit('update:modelValue', value)
  emit('change', {
    value
  })
}

defineExpose({
  setChild,
  handleClick,
  changeSelect,
  children
})

provide('radioGroup', proxy)
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
