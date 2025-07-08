<template>
  <view class="wd-curtain-wrapper">
    <wd-popup
      v-model="modelValue"
      transition="zoom-in"
      position="center"
      :close-on-click-modal="closeOnClickModal"
      :hide-when-close="hideWhenClose"
      :z-index="zIndex"
      :root-portal="rootPortal"
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
        <slot name="close">
          <wd-icon
            name="close-outline"
            :custom-class="`wd-curtain__content-close ${closePosition} ${customCloseClass}`"
            :custom-style="customCloseStyle"
            @click="close"
          />
        </slot>
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
import wdIcon from '../wd-icon/wd-icon.vue'
import wdPopup from '../wd-popup/wd-popup.vue'
import { computed, ref, watch } from 'vue'
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
  'click',
  'update:modelValue'
])

const modelValue = ref(props.modelValue || props.value)

watch(
  () => props.modelValue,
  (newVal) => {
    modelValue.value = newVal
  }
)

watch(
  () => props.value,
  (newVal) => {
    modelValue.value = newVal
  }
)

watch(modelValue, (newVal) => {
  emit('update:modelValue', newVal)
  if (!newVal) {
    emit('close')
  }
})

const imgSucc = ref<boolean>(true)
const imgScale = ref<number>(1)

const imgStyle = computed(() => {
  let style = ''
  if (props.width) {
    style += `width: ${props.width}px ;`
    style += `height: ${props.width / imgScale.value}px`
  }
  return style
})

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
  modelValue.value = false
}

function clickModal() {
  emit('click-modal')
}

function imgLoad(event: any) {
  const { height, width } = event.detail
  imgScale.value = width / height
  imgSucc.value = true
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
