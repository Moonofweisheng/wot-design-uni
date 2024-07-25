<template>
  <view>
    <wd-popup
      v-model="show"
      transition="zoom-in"
      position="center"
      :close-on-click-modal="closeOnClickModal"
      :hide-when-close="hideWhenClose"
      @before-enter="beforeenter"
      @enter="enter"
      @after-enter="afterenter"
      @before-leave="beforeleave"
      @leave="leave"
      @after-leave="afterleave"
      @close="close"
      @click-modal="clickModal"
      :custom-class="`wd-curtain ${customClass}`"
      :custom-style="customStyle"
    >
      <view class="wd-curtain__content">
        <image :src="src" class="wd-curtain__content-img" :style="imgStyle" @click="clickImage" @error="imgErr" @load="imgLoad"></image>
        <wd-icon name="close-outline" :custom-class="`wd-curtain__content-close ${closePosition}`" @click="close" />
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-curtain',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { curtainProps } from './types'

const props = defineProps(curtainProps)

const emit = defineEmits([
  'beforeenter',
  'enter',
  'afterenter',
  'beforeleave',
  'leave',
  'afterleave',
  'close',
  'closed',
  'click-modal',
  'load',
  'error',
  'click'
])

const show = ref<boolean>(false)
const imgSucc = ref<boolean>(true)
const imgStyle = ref<string>('')
const imgScale = ref<number>(1)

watch(
  () => props.value,
  () => {
    computedShowImg()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.width,
  () => {
    computeImgStyle()
  },
  {
    deep: true,
    immediate: true
  }
)

function computedShowImg() {
  if (props.value && imgSucc.value) {
    show.value = true
  } else {
    show.value = false
    close()
  }
}

function computeImgStyle() {
  let style = ''
  if (props.width) {
    style += `width: ${props.width}px ;`
    style += `height: ${props.width / imgScale.value}px`
  }
  imgStyle.value = style
}

function beforeenter() {
  emit('beforeenter')
}

function enter() {
  emit('enter')
}
function afterenter() {
  emit('afterenter')
}

function beforeleave() {
  emit('beforeleave')
}

function leave() {
  emit('leave')
}

function afterleave() {
  emit('afterleave')
  emit('closed')
}

function close() {
  show.value = false
  emit('close')
}

function clickModal() {
  emit('click-modal')
}

function imgLoad(event: any) {
  const { height, width } = event.detail
  imgScale.value = width / height
  imgSucc.value = true
  computeImgStyle()
  emit('load')
}
function imgErr() {
  imgSucc.value = false
  emit('error')
}

function clickImage() {
  if (props.to) {
    uni.navigateTo({
      url: props.to
    })
  }
  emit('click')
  close()
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
