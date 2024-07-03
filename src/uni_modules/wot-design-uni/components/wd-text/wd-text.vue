<template>
  <view>
    <text @click="handleClick" :class="rootClass" :style="rootStyle">
      {{ formattedText }}
    </text>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-text',
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
import { dayjs } from '@/uni_modules/wot-design-uni'
import { textProps } from './types'

const props = defineProps({
  ...textProps
})
const emit = defineEmits(['click'])

const textClass = ref<string>('')

// 合并 watch 逻辑
watch(
  () => ({
    type: props.type,
    text: props.text,
    mode: props.mode,
    call: props.call,
    color: props.color,
    bold: props.bold,
    lines: props.lines,
    format: props.format
  }),
  ({ type }) => {
    // type 验证
    if (type && !['primary', 'error', 'warning', 'success', 'default'].includes(type)) {
      console.error(`type must be one of ${type.toString()}`)
    }
    computeTextClass()
  },
  { deep: true, immediate: true }
)

const rootClass = computed(() => {
  return `wd-text ${props.customClass} ${textClass.value}`
})

const rootStyle = computed(() => {
  const rootStyle: Record<string, any> = {}
  if (props.color) {
    rootStyle['color'] = props.color
  }
  if (props.size) {
    rootStyle['font-size'] = `${props.size}`
  }
  if (props.lineHeight) {
    rootStyle['line-height'] = `${props.lineHeight}`
  }
  return `${objToStyle(rootStyle)};${props.customStyle}`
})

function computeTextClass() {
  const { type, color, bold, lines } = props
  let textClassList: string[] = []
  if (!color) {
    textClassList.push(`is-${type}`)
  }
  if (lines != null) {
    textClassList.push(`is-lines-${lines}`)
  }
  bold && textClassList.push('is-bold')
  textClass.value = textClassList.join(' ')
}

// 格式化文本函数
function formatText(text: string, format: boolean, mode: string): string {
  if (format) {
    if (mode === 'phone') {
      return text.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    } else if (mode === 'name') {
      return text.replace(/^(.).*(.)$/, '$1**$2')
    } else {
      throw new Error('mode must be one of phone or name for encryption')
    }
  }
  return text
}

const formattedText = computed(() => {
  if (props.mode === 'date') {
    return dayjs(Number(props.text)).format('YYYY-MM-DD')
  }
  return formatText(props.text, props.format, props.mode)
})

function handleClick(event: any) {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
