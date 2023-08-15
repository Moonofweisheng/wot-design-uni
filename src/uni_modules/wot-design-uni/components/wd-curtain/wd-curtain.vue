<template>
  <view>
    <wd-popup
      v-model="show"
      transition="zoom-in"
      position="center"
      :close-on-click-modal="closeOnClickModal"
      :hide-when-close="hideWhenClose"
      @beforeenter="beforeenter"
      @enter="enter"
      @afterenter="afterenter"
      @beforeleave="beforeleave"
      @leave="leave"
      @afterleave="afterleave"
      @close="close"
      @closed="closed"
      @clickmodal="clickModal"
      :custom-class="`wd-curtain ${customClass}`"
    >
      <view class="wd-curtain__content">
        <image :src="src" class="wd-curtain__content-img" :style="imgStyle" @click="clickImage" @error="imgErr" @load="imgLoad"></image>
        <wd-icon name="close-outline" size="24px" :custom-class="`wd-curtain__content-close ${closePosition}`" @click="close" />
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
type ClosePosition = 'inset' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
interface Props {
  customClass?: string
  value: boolean
  closePosition: ClosePosition
  src?: string
  to?: string
  width?: number
  closeOnClickModal: boolean
  hideWhenClose: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  value: false,
  closePosition: 'inset',
  closeOnClickModal: false,
  hideWhenClose: true
})

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

const emit = defineEmits([
  'beforeenter',
  'enter',
  'afterenter',
  'beforeleave',
  'leave',
  'afterleave',
  'close',
  'closed',
  'clickmodal',
  'load',
  'error',
  'click'
])

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
}

function close() {
  show.value = false
  emit('close')
}

function closed() {
  emit('closed')
}

function clickModal() {
  emit('clickmodal')
}

function imgLoad(event) {
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
