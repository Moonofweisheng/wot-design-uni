<template>
  <!--强制设置高宽，防止元素坍塌-->
  <!--在使用 wd-sticky-box 时，某些情况下 wd-sticky__container 的 'position：absolute' 需要相对于 wd-sticky-box-->
  <view :class="`wd-sticky ${props.customClass}`" :style="rootStyle" :id="uuid">
    <!--吸顶容器-->
    <view class="wd-sticky__container" :style="containerStyle">
      <!--监听元素尺寸变化-->
      <wd-resize @resize="resizeHandler" custom-style="display: inline-block;">
        <!--需要吸顶的内容-->
        <slot />
      </wd-resize>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, inject, ref } from 'vue'
import { addUnit, getRect, objToStyle } from '../common/util'

interface Props {
  customStyle?: string
  customClass?: string
  zIndex: number
  offsetTop: number
}

const props = withDefaults(defineProps<Props>(), {
  customStyle: '',
  customClass: '',
  zIndex: 1,
  offsetTop: 0
})

const openBox = ref<boolean>(false)
const position = ref<string>('absolute')
const top = ref<number>(0)
const height = ref<number>(0)
const width = ref<number>(0)
const observerList = ref<UniApp.IntersectionObserver[]>([])
const state = ref<string>('')
const uuid = ref<string>(`${Math.random()}`)

const parent: any = inject('sticky-box')
const { proxy } = getCurrentInstance() as any
const instance = getCurrentInstance() as any

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {
    'z-index': props.zIndex,
    height: addUnit(height.value),
    width: addUnit(width.value)
  }
  if (!openBox.value) {
    style['position'] = 'relative'
  }
  return `${objToStyle(style)};${props.customStyle}`
})

const containerStyle = computed(() => {
  const style: Record<string, string | number> = {
    position: position.value,
    top: addUnit(top.value)
  }
  return objToStyle(style)
})

/**
 * @description 清除无用的 viewport 观察者
 */
function clearObserver() {
  while (observerList.value.length !== 0) {
    observerList.value.pop()!.disconnect()
  }
}
/**
 * @description 创建新的 viewport 观察者
 */
function createObserver() {
  const observer = uni.createIntersectionObserver(instance)
  observerList.value.push(observer)
  return observer
}
/**
 * @description 监听到吸顶元素尺寸大小变化时，立即重新模拟吸顶
 */
function resizeHandler(detail) {
  // 当吸顶内容处于absolute、fixed时，为了防止父容器坍塌，需要手动设置父容器高宽。
  width.value = detail.width
  height.value = detail.height
  // // 如果和 wd-sticky-box 配套使用，吸顶逻辑交由 wd-sticky-box 进行处理
  observerContentScroll()
  if (!parent) return
  parent.observerForChild({
    uid: proxy.$.uid,
    openBox,
    position,
    top,
    height,
    width,
    state,
    offsetTop: props.offsetTop
  })
}
/**
 * @description 模拟吸顶逻辑
 */
function observerContentScroll() {
  // 视图在 render tree 中未呈现，吸顶无任何意义。
  if (height.value === 0 && width.value === 0) return
  const offset = props.offsetTop + height.value
  clearObserver()
  createObserver()
    .relativeToViewport({
      top: -offset // viewport上边界往下拉
    })
    .observe(`#${uuid.value}`, scrollHandler)
  getRect('.wd-sticky', false, proxy).then((res: any) => {
    // 当 wd-sticky 位于 viewport 外部时不会触发 observe，此时根据位置手动修复位置。
    if (res.bottom <= offset) scrollHandler({ boundingClientRect: res })
  })
}
/**
 * @description 根据位置进行吸顶
 */
function scrollHandler({ boundingClientRect }) {
  // sticky 高度大于或等于 wd-sticky-box，使用 wd-sticky-box 无任何意义
  if (parent && height.value >= parent.height.value) {
    position.value = 'absolute'
    top.value = 0
    return
  }
  // boundingClientRect : 目标节点各个边在 viewport 中的坐标
  if (boundingClientRect.top <= props.offsetTop) {
    state.value = 'sticky'
    // 开始吸顶，固定到顶部
    openBox.value = false
    position.value = 'fixed'
    top.value = props.offsetTop
  } else if (boundingClientRect.top > props.offsetTop) {
    state.value = 'normal'
    // 完全展示，结束吸顶
    openBox.value = false
    position.value = 'absolute'
    top.value = 0
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
