<template>
  <view :class="`wd-video-preview ${customClass}`" :style="customStyle" v-if="showPopup">
    <video
      class="wd-video-preview__video"
      v-if="previdewVideo.url"
      :controls="true"
      :poster="previdewVideo.poster"
      :title="previdewVideo.title"
      play-btn-position="center"
      :enableNative="true"
      :src="previdewVideo.url"
      :enable-progress-gesture="false"
    ></video>

    <wd-icon name="close-circle" size="48px" :custom-class="`wd-video-preview__close`" @click="close" />
  </view>
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
import { reactive, ref } from 'vue'
import { videoPreviewProps, type PreviewVideo, type VideoPreviewExpose } from './types'
defineProps(videoPreviewProps)

const showPopup = ref<boolean>(false)
const previdewVideo = reactive<PreviewVideo>({ url: '', poster: '', title: '' })

function open(video: PreviewVideo) {
  showPopup.value = true
  previdewVideo.url = video.url
  previdewVideo.poster = video.poster
  previdewVideo.title = video.title
}

function close() {
  showPopup.value = false
}

function handleClosed() {
  previdewVideo.url = ''
  previdewVideo.poster = ''
  previdewVideo.title = ''
}

defineExpose<VideoPreviewExpose>({
  open,
  close
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
