<template>
  <view @click="handleClick" :class="rootClass" :style="rootStyle">
    <image v-if="isImageUrl" class="wd-icon__image" :src="name"></image>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-icon',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { objToStyle } from '../common/util'
import { iconProps } from './types'

const props = defineProps(iconProps)
const emit = defineEmits(['click'])

const isImageUrl = ref<boolean>(false)

watch(
  () => props.name,
  (val) => {
    isImageUrl.value = val.indexOf('/') > -1
  },
  { deep: true, immediate: true }
)

const rootClass = computed(() => {
  const prefix = props.classPrefix
  return `${prefix} ${props.customClass} ${isImageUrl.value ? 'wd-icon--image' : prefix + '-' + props.name}`
})

const rootStyle = computed(() => {
  const style: Record<string, any> = {}
  if (props.color) {
    style['color'] = props.color
  }
  if (props.size) {
    style['font-size'] = props.size
  }
  return `${objToStyle(style)}; ${props.customStyle}`
})

function handleClick(event: any) {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
