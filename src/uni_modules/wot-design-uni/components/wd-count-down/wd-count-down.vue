<template>
  <view :class="`wd-count-down ${customClass}`" :style="customStyle">
    <slot :current="current" v-if="$slots.default" />
    <block v-else>{{ timeText }}</block>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-count-down',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { watch, computed } from 'vue'
import { parseFormat } from './utils'
import { useCountDown } from '../composables/useCountDown'

interface Props {
  // 倒计时时长，单位毫秒
  time: number
  // 是否开启毫秒
  millisecond?: boolean
  // 格式化时间
  format?: string
  // 是否自动开始
  autoStart?: boolean
  // 自定义样式类
  customClass?: string
  // 自定义样式
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  format: 'HH:mm:ss',
  autoStart: true,
  millisecond: false,
  customClass: ''
})

const emit = defineEmits(['change', 'finish'])

const { start, pause, reset, current } = useCountDown({
  time: props.time,
  millisecond: props.millisecond,
  onChange: (current) => emit('change', current),
  onFinish: () => emit('finish')
})

const timeText = computed(() => parseFormat(props.format, current.value))

const resetTime = () => {
  reset(props.time)

  if (props.autoStart) {
    start()
  }
}

watch(() => props.time, resetTime, { immediate: true })

defineExpose({
  start,
  pause,
  reset: resetTime
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
