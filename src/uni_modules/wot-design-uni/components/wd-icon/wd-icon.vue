<!--
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2023-08-14 23:31:08
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-icon\wd-icon.vue
 * 记得注释
-->
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

interface Props {
  name: string
  color?: string
  size?: string
  customStyle?: string
  customClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  customStyle: '',
  customClass: ''
})

const isImageUrl = ref<boolean>(false)

watch(
  () => props.name,
  (val) => {
    isImageUrl.value = val.indexOf('/') > -1
  }
)

const rootClass = computed(() => {
  return `wd-icon ${props.customClass} ${isImageUrl.value ? 'wd-icon--image' : 'wd-icon-' + props.name}`
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

const emit = defineEmits(['click'])

function handleClick(e) {
  emit('click', e)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
