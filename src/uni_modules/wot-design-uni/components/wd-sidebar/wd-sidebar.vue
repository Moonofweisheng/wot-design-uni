<template>
  <view :class="`wd-sidebar ${customClass}`" :style="customStyle">
    <slot></slot>
    <view class="wd-sidebar__padding"></view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-sidebar',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { type ComponentPublicInstance, reactive, provide, watch } from 'vue'

interface Props {
  modelValue?: number | string
  // 自定义样式
  customStyle?: string
  // 自定义样式类
  customClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  customStyle: '',
  customClass: ''
})

const parentData = reactive({
  value: props.modelValue,
  children: [] as ComponentPublicInstance[],
  setChild,
  removeChild,
  setChange
})

watch(
  () => props.modelValue,
  (newValue) => {
    parentData.value = newValue
  }
)

provide('wdSidebar', parentData)
const emit = defineEmits(['change', 'update:modelValue'])

/**
 * 设置子项
 * @param child
 */
function setChild(child: ComponentPublicInstance) {
  const hasChild = parentData.children.indexOf(child)
  if (hasChild === -1) {
    parentData.children.push(child)
  } else {
    parentData.children[hasChild] = child
  }
}

/**
 * 移除子项
 * @param child
 */
function removeChild(child: ComponentPublicInstance) {
  parentData.children = parentData.children.filter((c) => {
    return c !== child
  })
}

/**
 * 子项状态变更
 * @param child 子项
 */
function setChange(value: number | string, label: string) {
  emit('update:modelValue', value)
  parentData.value = value
  emit('change', { value, label })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
