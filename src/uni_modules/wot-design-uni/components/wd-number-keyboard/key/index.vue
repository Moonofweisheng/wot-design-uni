<template>
  <view :class="`wd-key-wrapper ${wider ? 'wd-key-wrapper--wider' : ''}`" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <view :class="keyClass">
      <wd-loading custom-class="wd-key--loading-icon" v-if="props.loading" />
      <template v-if="type === 'delete'">
        <template v-if="text">
          {{ text }}
        </template>
        <wd-icon v-else name="keyboard-delete" size="22px"></wd-icon>
      </template>
      <template v-else-if="type === 'extra'">
        <template v-if="text">
          {{ text }}
        </template>
        <wd-icon v-else name="keyboard-collapse" size="22px"></wd-icon>
      </template>
      <template v-else>{{ text }}</template>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-key',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useTouch } from '../../composables/useTouch'

type KeyType = '' | 'delete' | 'extra' | 'close'

interface Props {
  type?: KeyType
  text?: number | string
  wider?: boolean
  large?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: '',
  text: '',
  wider: false,
  large: false,
  loading: false
})

const touch = useTouch()
const active = ref<boolean>(false)

const keyClass = computed(() => {
  return `wd-key ${props.large ? 'wd-key--large' : ''} ${props.type === 'delete' ? 'wd-key--delete' : ''} ${
    props.type === 'close' ? 'wd-key--close' : ''
  }`
})

const emit = defineEmits(['press'])

function onTouchStart(event: TouchEvent) {
  touch.touchStart(event)
  active.value = true
}

function onTouchMove(event: TouchEvent) {
  touch.touchMove(event)
  if (touch.direction.value) {
    active.value = false
  }
}

function onTouchEnd() {
  if (active.value) {
    active.value = false
    emit('press', props.text, props.type)
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
