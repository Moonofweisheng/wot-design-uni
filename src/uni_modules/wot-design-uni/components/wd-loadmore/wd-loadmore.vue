<template>
  <view :class="['wd-loadmore', customClass]" @click="reload">
    <wd-divider v-if="state === 'finished'">{{ finishedText }}</wd-divider>
    <block v-if="state === 'error'">
      <block v-if="errorText">
        {{ errorText }}
      </block>
      <block v-else>
        <text class="wd-loadmore__text">加载失败</text>
        <text class="wd-loadmore__text is-light">点击重试</text>
        <wd-icon name="refresh" size="16px" custom-class="wd-loadmore__refresh" />
      </block>
    </block>
    <block v-if="state === 'loading'">
      <wd-loading size="16px" custom-class="wd-loadmore__loading" />
      <text class="wd-loadmore__text">{{ loadingText }}</text>
    </block>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-loadmore',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'

type LoadMoreState = 'loading' | 'error' | 'finished'

interface Props {
  customClass?: string
  state?: LoadMoreState
  loadingText?: string
  finishedText?: string
  errorText?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  loadingText: '正在努力加载中...',
  finishedText: '已加载完毕',
  errorText: ''
})

const showText = ref<string>('')
const currentState = ref<LoadMoreState | null>(null)

watch(
  () => props.state,
  (newValue) => {
    if (!newValue) return
    const state = ['loading', 'error', 'finished']
    if (state.indexOf(newValue) === -1) throw Error(`state must be one of ${state.toString()}`)
    switch (newValue) {
      case 'loading':
        showText.value = props.loadingText
        break
      case 'error':
        showText.value = props.errorText
        break
      case 'finished':
        showText.value = props.finishedText
        break
      default:
        break
    }
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['reload'])

function reload() {
  if (props.state !== 'error') return
  currentState.value = 'loading'
  emit('reload')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
