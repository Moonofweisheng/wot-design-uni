<template>
  <view v-if="show" :class="`wd-notice-bar ${customClass} ${noticeBarClass}`" :style="rootStyle">
    <wd-icon v-if="prefix" custom-class="wd-notice-bar__prefix" :name="prefix"></wd-icon>
    <slot v-else name="prefix"></slot>
    <view class="wd-notice-bar__wrap">
      <view class="wd-notice-bar__content" :style="animation" @transitionend="animationEnd" @click="handleClick">
        <template v-if="isVertical">
          <view v-for="item in textArray" :key="item">{{ item }}</view>
          <view v-if="textArray.length > 1">{{ textArray[0] }}</view>
        </template>
        <slot v-else>{{ currentText }}</slot>
      </view>
    </view>
    <wd-icon v-if="closable" custom-class="wd-notice-bar__suffix" name="close-bold" @click="handleClose"></wd-icon>
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
import { ref, watch, nextTick, computed, getCurrentInstance, type CSSProperties } from 'vue'
import { getRect, isArray, isDef, objToStyle } from '../common/util'
import { noticeBarProps } from './types'

const $wrap = '.wd-notice-bar__wrap'
const $content = '.wd-notice-bar__content'

const props = defineProps(noticeBarProps)
const emit = defineEmits(['close', 'next', 'click'])

const wrapWidth = ref<number>(0)
const show = ref<boolean>(true)
const animation = ref<string>('')
const currentIndex = ref(0)
const textArray = computed(() => (Array.isArray(props.text) ? props.text : [props.text]))
const currentText = computed(() => textArray.value[currentIndex.value])
const verticalIndex = ref(0)
const isHorizontal = computed(() => props.direction === 'horizontal')
const isVertical = computed(() => props.direction === 'vertical')

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.color)) {
    style.color = props.color
  }

  if (isDef(props.backgroundColor)) {
    style.background = props.backgroundColor
  }

  return `${objToStyle(style)};${props.customStyle}`
})
const noticeBarClass = computed(() => {
  const { type, wrapable, scrollable } = props

  let noticeBarClasses: string[] = []
  type && noticeBarClasses.push(`is-${type}`)

  if (isHorizontal.value) {
    !wrapable && !scrollable && noticeBarClasses.push('wd-notice-bar--ellipse')
  } else {
    noticeBarClasses.push('wd-notice-bar--ellipse')
  }

  wrapable && !scrollable && noticeBarClasses.push('wd-notice-bar--wrap')
  return noticeBarClasses.join(' ')
})

const { proxy } = getCurrentInstance() as any

watch(
  [() => props.text],
  () => {
    nextTick(() => scroll())
  },
  { deep: true, immediate: true }
)

function handleClose() {
  show.value = false
  emit('close')
}

function initAnimation({ duration, delay, translate }: { duration: number; delay: number; translate: number }) {
  const style: CSSProperties = {
    transitionProperty: 'all',
    transitionDelay: `${delay}s`,
    transitionDuration: `${duration}s`,
    transform: `${props.direction === 'vertical' ? 'translateY' : 'translateX'}(${translate}px)`,
    transitionTimingFunction: 'linear'
  }

  return objToStyle(style)
}

function queryRect() {
  return Promise.all([getRect($wrap, false, proxy), getRect($content, false, proxy)])
}

async function verticalAnimate(height: number) {
  const translate = -(height / (textArray.value.length + 1)) * (currentIndex.value + 1)
  animation.value = initAnimation({
    duration: height / (textArray.value.length + 1) / props.speed,
    delay: props.delay,
    translate
  })
}

async function scroll() {
  const [wrapRect, contentRect] = await queryRect()
  if (!wrapRect.width || !contentRect.width || !contentRect.height) return

  wrapWidth.value = wrapRect.width

  if (isHorizontal.value) {
    if (props.scrollable) {
      animation.value = initAnimation({
        duration: contentRect.width / props.speed,
        delay: props.delay,
        translate: -contentRect.width
      })
    }
  } else {
    if (textArray.value.length > 1) {
      verticalAnimate(contentRect.height)
    }
  }
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
  if (isHorizontal.value) {
    animation.value = initAnimation({
      duration: 0,
      delay: 0,
      translate: wrapWidth.value + 1 // +1容错空间，防止露出来一丢丢
    })
  } else {
    if (++verticalIndex.value >= textArray.value.length) {
      verticalIndex.value = 0
      animation.value = initAnimation({
        duration: 0,
        delay: 0,
        translate: 0
      })
    }
  }

  const timer = setTimeout(() => {
    next() // 更换下一条文本

    nextTick(async () => {
      // 因为文本会发生变化，所以每一次都需要查询
      const [_, contentRect] = await queryRect()
      if (!contentRect.width || !contentRect.height) return

      if (isHorizontal.value) {
        animation.value = initAnimation({
          duration: (wrapWidth.value + contentRect.width) / props.speed,
          delay: props.delay,
          translate: -contentRect.width
        })
      } else {
        verticalAnimate(contentRect.height)
      }
    })

    clearTimeout(timer)
  }, 20)
}

function handleClick() {
  const result = isArray(props.text)
    ? {
        index: currentIndex.value,
        text: props.text[currentIndex.value]
      }
    : {
        index: 0,
        text: props.text
      }
  emit('click', result)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
