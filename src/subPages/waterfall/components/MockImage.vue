<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  meta: {
    width: number
    height: number
  }
}>()

const emit = defineEmits<{
  (
    e: 'load',
    event: {
      detail: {
        width: number
        height: number
      }
      type: 'load' | 'error'
    }
  ): void
}>()

const internalWidth = ref(320)
const internalHeight = ref(240)

const currWidth = computed(() => internalWidth.value)
const currHeight = computed(() => internalHeight.value)

const paddingTop = computed(() => `${(currHeight.value / currWidth.value) * 100}%`)

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

onMounted(() => {
  setTimeout(() => {
    internalWidth.value = props.meta.width
    internalHeight.value = props.meta.height
    emit('load', {
      detail: {
        width: props.meta.width,
        height: props.meta.height
      },
      type: Math.random() > 0.5 ? 'load' : 'error'
    })
  }, random(50, 700))
})
</script>

<template>
  <view
    class="container"
    :style="{
      paddingTop
    }"
  >
    <view class="item">
      <text>{{ meta.width }}</text>
      <text>x</text>
      <text>{{ meta.height }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  box-sizing: border-box;
}

.item {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
}
</style>
