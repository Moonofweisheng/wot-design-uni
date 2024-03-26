<template>
  <view class="wd-media-preview">
    <wd-overlay :show="state.show" :z-index="state.zIndex" :lock-scroll="state.lockScroll" @click="handleClickModal" :customStyle="state.customStyle">
      哈哈
    </wd-overlay>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-media-preview',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { inject, reactive, ref, watch } from 'vue'
import { MediaPreviewProps, mediaPreviewProps } from './types'
import { previewDefaultOptionKey, defaultOptions } from './.'
import { deepMerge } from '../common/util'

const props = defineProps(mediaPreviewProps)

const previewOptionKey = props.selector ? previewDefaultOptionKey + props.selector : previewDefaultOptionKey
const previewOption = inject(previewOptionKey, ref<MediaPreviewProps>(defaultOptions)) // preview选项

const state = reactive({ ...props })

// 监听options变化展示
watch(
  () => previewOption.value,
  (newVal: MediaPreviewProps) => {
    reset(newVal)
  },
  {
    deep: true,
    immediate: true
  }
)

// 监听options变化展示
watch(
  () => props,
  () => {
    reset(previewOption.value || {})
  },
  {
    deep: true,
    immediate: true
  }
)

function handleClickModal() {
  previewOption.value.show = false
}

/**
 * 重置message选项值
 * @param option message选项值
 */
function reset(option: MediaPreviewProps) {
  option = deepMerge(props, option)
  for (const key in option) {
    state[key] = option[key]
  }
}
</script>

<style lang="scss" scoped></style>
