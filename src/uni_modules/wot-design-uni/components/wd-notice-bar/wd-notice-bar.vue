<template>
  <view v-if="show" :class="`wd-notice-bar ${customClass} ${noticeBarClass}`" :style="`color: ${color}; background: ${backgroundColor};`">
    <wd-icon v-if="prefix" custom-class="wd-notice-bar__prefix" size="18px" :name="prefix"></wd-icon>
    <slot v-else name="prefix"></slot>
    <view class="wd-notice-bar__wrap">
      <view class="wd-notice-bar__content" :animation="animation" @transitionend="animationEnd">
        {{ text }}
        <slot></slot>
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

const $wrap = '.wd-notice-bar__wrap'
const $content = '.wd-notice-bar__content'

type NoticeBarType = 'warning' | 'info' | 'danger' | ''
interface Props {
  customClass?: string
  text?: string
  type: NoticeBarType
  scrollable: boolean
  delay: number
  speed: number
  closable: boolean
  wrapable: boolean
  prefix?: string
  color?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  type: 'warning',
  scrollable: true,
  delay: 1,
  speed: 50,
  closable: false,
  wrapable: false
})

const firstPlay = ref<boolean>(true)
const wrapWidth = ref<number>(0)
const contentWidth = ref<number>(0)
const show = ref<boolean>(true)
const duration = ref<number>(0)
const animation = ref<string>('')
const noticeBarClass = ref<string>('')

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
    nextTick(() => {
      scroll()
    })
  },
  { deep: true, immediate: true }
)

onBeforeMount(() => {
  computedClass()
})

const emit = defineEmits(['close'])

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

function initAnimation(duration, delay, translate) {
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
    const [wrapRect, contentRect] = rects as UniApp.NodeInfo[]
    if (!wrapRect || !contentRect || !wrapRect.width || !contentRect.width) return

    const wrapWidthTemp = wrapRect.width
    const contentWidthTemp = contentRect.width
    if (props.scrollable && contentWidthTemp > wrapWidthTemp) {
      animation.value = initAnimation((contentWidthTemp / props.speed) * 1000, props.delay * 1000, -contentWidthTemp)
      wrapWidth.value = wrapWidthTemp
      contentWidth.value = contentWidthTemp
    }
  })
}

function animationEnd() {
  animation.value = initAnimation(0, 0, wrapWidth.value)
  const timer = setTimeout(() => {
    animation.value = initAnimation(((wrapWidth.value + contentWidth.value) / props.speed) * 1000, 0, -contentWidth.value)
    clearTimeout(timer)
  }, 20)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
