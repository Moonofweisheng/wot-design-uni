<!--
 * @Author: weisheng
 * @Date: 2024-06-30 23:09:04
 * @LastEditTime: 2024-07-01 13:04:16
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-video-preview/wd-video-preview.vue
 * 记得注释
-->
<template>
  <wd-popup v-model="showPopup">
    <video v-if="videoUrl" :src="videoUrl"></video>
  </wd-popup>
</template>

<script lang="ts">
export default {
  name: 'wd-video-preview',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { videoPreviewProps, type VideoPreviewExpose } from './types'
const props = defineProps(videoPreviewProps)

const showPopup = ref<boolean>(false)
const videoUrl = ref<string>('')

function open(url: string) {
  videoUrl.value = url
  showPopup.value = true
}

function close() {
  showPopup.value = false
}

defineExpose<VideoPreviewExpose>({
  open,
  close
})
</script>
<style lang="scss" scoped>
// @import './index.scss';
</style>
