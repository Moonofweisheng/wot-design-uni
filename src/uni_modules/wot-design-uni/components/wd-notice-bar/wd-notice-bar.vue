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
        <template v-if="isVertical">
          <slot v-for="(item, i) in textArray" :key="item" name="vertical" :item="item" :index="i">
            <view>{{ item }}</view>
          </slot>
          <slot v-if="textArray.length > 1" name="vertical" :item="textArray[0]" :index="0">
            <view>{{ textArray[0] }}</view>
          </slot>
        </template>
        <slot v-else>{{ currentText }}</slot>
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
const verticalIndex = ref(0)
const isHorizontal = computed(() => props.direction === 'horizontal')
const isVertical = computed(() => props.direction === 'vertical')

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
  const { type, wrapable, scrollable, direction } = props

  let noticeBarClasses: string[] = []
  type && noticeBarClasses.push(`is-${type}`)

  if (isHorizontal.value) {
    !wrapable && !scrollable && noticeBarClasses.push('wd-notice-bar--ellipse')
  } else {
    noticeBarClasses.push('wd-notice-bar--ellipse')
  }

  wrapable && !scrollable && noticeBarClasses.push('wd-notice-bar--wrap')
  noticeBarClass.value = noticeBarClasses.join(' ')
}
function handleClose() {
  show.value = false
  emit('close')
}

function initAnimation({ duration, delay, translate }: { duration: number; delay: number; translate: number }) {
  const ani = uni
    .createAnimation({
      duration,
      delay
    })
    [isHorizontal.value ? 'translateX' : 'translateY'](translate)
  ani.step()
  return ani.export()
}

function queryRect() {
  return Promise.all([getRect($wrap, false, proxy), getRect($content, false, proxy)])
}

async function verticalAnimate(height: number) {
  const translate = -(height / (textArray.value.length + 1)) * (currentIndex.value + 1)

  animation.value = initAnimation({
    duration: props.speed * 1000,
    delay: props.delay * 1000,
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
        duration: (contentRect.width / props.speed) * 1000,
        delay: props.delay * 1000,
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
          duration: ((wrapWidth.value + contentRect.width) / props.speed) * 1000,
          delay: props.delay * 1000,
          translate: -contentRect.width
        })
      } else {
        verticalAnimate(contentRect.height)
      }
    })

    clearTimeout(timer)
  }, 20)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
