<template>
  <text @click="handleClick" :class="rootClass" :style="rootStyle">{{ mode === 'date' ? dayjs(Number(text)).format('YYYY-MM-DD') : text }}</text>
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

const props = defineProps(textProps)
const emit = defineEmits(['click'])

const textClass = ref<string>('')

watch(
  [() => props.type, () => props.text, () => props.mode, () => props.call, () => props.color, () => props.bold, () => props.lines],
  () => {
    computeTextClass()
  },
  { deep: true, immediate: true }
)

watch(
  () => props.type,
  (newValue) => {
    if (!newValue) return
    // type: 'primary', 'error', 'warning', 'success', 'default'
    const type = ['primary', 'error', 'warning', 'success', 'default']
    if (type.indexOf(newValue) === -1) console.error(`type must be one of ${type.toString()}`)
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
  const { type, text, mode, call, color, bold, lines } = props
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

function handleClick(event: any) {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
