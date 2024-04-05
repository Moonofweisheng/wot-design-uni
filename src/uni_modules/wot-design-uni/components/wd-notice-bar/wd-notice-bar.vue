<template>
  <view
    v-if="show"
    :class="`wd-notice-bar ${customClass} ${noticeBarClass}`"
    :style="`color: ${color}; background: ${backgroundColor};${customStyle}`"
  >
    <wd-icon v-if="prefix" custom-class="wd-notice-bar__prefix" size="18px" :name="prefix"></wd-icon>
    <slot v-else name="prefix"></slot>
    <view class="wd-notice-bar__wrap">
      <view class="wd-notice-bar__content" :animation="animation" @transitionend="animationEnd">
        <slot>{{ currentText }}</slot>
      </view>
    </view>
    <wd-icon v-if="closable" custom-class="wd-notice-bar__suffix" size="18px" name="close-bold" @click="handleClose"></wd-icon>
    <slot v-else name="suffix"></slot>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-notice-bar',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import { getRect } from '../common/util'
import { getCurrentInstance } from 'vue'
import { nextTick } from 'vue'
import { noticeBarProps } from './types'
import { computed } from 'vue'

const $wrap = '.wd-notice-bar__wrap'
const $content = '.wd-notice-bar__content'

const props = defineProps(noticeBarProps)

const wrapWidth = ref<number>(0)
const show = ref<boolean>(true)
const animation = ref<string>('')
const noticeBarClass = ref<string>('')
const currentIndex = ref(0)
const textArray = computed(() => (Array.isArray(props.text) ? props.text : [props.text]))
const currentText = computed(() => textArray.value[currentIndex.value])

const { proxy } = getCurrentInstance() as any
watch(
  [() => props.type, () => props.scrollable, () => props.wrapable],
  () => {
    computedClass()
  },
  { deep: true, immediate: true }
)

watch(
  [() => props.text],
  () => {
    nextTick(() => scroll())
  },
  { deep: true, immediate: true }
)

onBeforeMount(() => {
  computedClass()
})

const emit = defineEmits(['close', 'next'])

function computedClass() {
  const { type, wrapable, scrollable } = props
  let noticeBarClasses: string[] = []
  type && noticeBarClasses.push(`is-${type}`)
  !wrapable && !scrollable && noticeBarClasses.push('wd-notice-bar--ellipse')
  wrapable && !scrollable && noticeBarClasses.push('wd-notice-bar--wrap')
  noticeBarClass.value = noticeBarClasses.join(' ')
}
function handleClose() {
  show.value = false
  emit('close')
}

function initAnimation(duration: number, delay: number, translate: number) {
  const ani = uni
    .createAnimation({
      duration,
      delay
    })
    .translateX(translate)
  ani.step()
  return ani.export()
}

function scroll() {
  Promise.all([getRect($wrap, false, proxy), getRect($content, false, proxy)]).then((rects) => {
    const [wrapRect, contentRect] = rects
    if (!wrapRect || !contentRect || !wrapRect.width || !contentRect.width) return

    const wrapWidthTemp = wrapRect.width
    const contentWidthTemp = contentRect.width
    if (props.scrollable) {
      animation.value = initAnimation((contentWidthTemp / props.speed) * 1000, props.delay * 1000, -contentWidthTemp)
      wrapWidth.value = wrapWidthTemp
    }
  })
}

function next() {
  if (currentIndex.value >= textArray.value.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }
  emit('next', currentIndex.value)
}

function animationEnd() {
  animation.value = initAnimation(0, 0, wrapWidth.value)

  const timer = setTimeout(() => {
    next() // 更换下一条文本

    nextTick(() => {
      // 因为文本会发生变化，所以contentWidth每一次都需要查询
      getRect($content, false, proxy).then((rect) => {
        if (!rect) return
        animation.value = initAnimation(((wrapWidth.value + rect.width!) / props.speed) * 1000, props.delay * 1000, -rect.width!)
      })
    })

    clearTimeout(timer)
  }, 20)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
