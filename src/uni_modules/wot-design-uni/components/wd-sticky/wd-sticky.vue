<template>
  <view :style="`${rootStyle};display: inline-block;`">
    <view :class="`wd-sticky ${customClass}`" :style="stickyStyle" :id="styckyId">
      <view class="wd-sticky__container" :style="containerStyle">
        <wd-resize @resize="handleResize" custom-style="display: inline-block;">
          <slot />
        </wd-resize>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-sticky',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdResize from '../wd-resize/wd-resize.vue'
import { computed, getCurrentInstance, reactive, ref, type CSSProperties } from 'vue'
import { addUnit, getRect, objToStyle, pause, uuid } from '../common/util'
import { stickyProps } from './types'
import { useParent } from '../composables/useParent'
import { STICKY_BOX_KEY } from '../wd-sticky-box/types'

const props = defineProps(stickyProps)
const styckyId = ref<string>(`wd-sticky${uuid()}`)
const observerList = ref<UniApp.IntersectionObserver[]>([])

const stickyState = reactive({
  position: 'absolute',
  boxLeaved: false,
  top: 0,
  height: 0,
  width: 0,
  state: ''
})

const { parent: stickyBox } = useParent(STICKY_BOX_KEY)

const { proxy } = getCurrentInstance() as any

const rootStyle = computed(() => {
  const style: CSSProperties = {
    'z-index': props.zIndex,
    height: addUnit(stickyState.height),
    width: addUnit(stickyState.width)
  }
  if (!stickyState.boxLeaved) {
    style['position'] = 'relative'
  }
  return `${objToStyle(style)}${props.customStyle}`
})

const stickyStyle = computed(() => {
  const style: CSSProperties = {
    'z-index': props.zIndex,
    height: addUnit(stickyState.height),
    width: addUnit(stickyState.width)
  }
  if (!stickyState.boxLeaved) {
    style['position'] = 'relative'
  }
  return `${objToStyle(style)}`
})

const containerStyle = computed(() => {
  const style: CSSProperties = {
    position: stickyState.position as 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed',
    top: addUnit(stickyState.top)
  }
  return objToStyle(style)
})

const innerOffsetTop = computed(() => {
  let top: number = 0
  // #ifdef H5
  // H5端，导航栏为普通元素，需要将组件移动到导航栏的下边沿
  // H5的导航栏高度为44px
  top = 44
  // #endif

  return top + props.offsetTop
})

/**
 * 清除对当前组件的监听
 */
function clearObserver() {
  while (observerList.value.length !== 0) {
    observerList.value.pop()!.disconnect()
  }
}
/**
 * 添加对当前组件的监听
 */
function createObserver() {
  const observer = uni.createIntersectionObserver(proxy, { thresholds: [0, 0.5] })
  observerList.value.push(observer)
  return observer
}
/**
 *  当前内容高度发生变化时重置监听
 */
async function handleResize(detail: any) {
  stickyState.width = detail.width
  stickyState.height = detail.height
  await pause()
  observerContentScroll()
  if (!stickyBox || !stickyBox.observerForChild) return
  stickyBox.observerForChild(proxy)
}
/**
 *  监听吸顶元素滚动事件
 */
function observerContentScroll() {
  if (stickyState.height === 0 && stickyState.width === 0) return
  const offset = innerOffsetTop.value + stickyState.height
  clearObserver()
  createObserver()
    .relativeToViewport({
      top: -offset
    })
    .observe(`#${styckyId.value}`, (result) => {
      handleRelativeTo(result)
    })
  getRect(`#${styckyId.value}`, false, proxy).then((res) => {
    // #ifdef H5
    // H5端，查询节点信息未计算导航栏高度
    res.bottom = Number(res.bottom) + 44
    // #endif
    if (Number(res.bottom) <= offset) handleRelativeTo({ boundingClientRect: res })
  })
}
/**
 * @description 根据位置进行吸顶
 */
function handleRelativeTo({ boundingClientRect }: any) {
  // sticky 高度大于或等于 wd-sticky-box，使用 wd-sticky-box 无任何意义
  if (stickyBox && stickyBox.boxStyle && stickyState.height >= stickyBox.boxStyle.height) {
    stickyState.position = 'absolute'
    stickyState.top = 0
    return
  }

  let isStycky = boundingClientRect.top <= innerOffsetTop.value
  // #ifdef H5 || APP-PLUS
  isStycky = boundingClientRect.top < innerOffsetTop.value
  // #endif

  if (isStycky) {
    stickyState.state = 'sticky'
    stickyState.boxLeaved = false
    stickyState.position = 'fixed'
    stickyState.top = innerOffsetTop.value
  } else {
    stickyState.state = 'normal'
    stickyState.boxLeaved = false
    stickyState.position = 'absolute'
    stickyState.top = 0
  }
}

/**
 * 设置位置
 * @param setboxLeaved
 * @param setPosition
 * @param setTop
 */
function setPosition(boxLeaved: boolean, position: string, top: number) {
  stickyState.boxLeaved = boxLeaved
  stickyState.position = position
  stickyState.top = top
}

defineExpose({
  setPosition,
  stickyState,
  offsetTop: props.offsetTop
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
