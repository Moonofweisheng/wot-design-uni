<template>
  <view class="wd-tour" v-if="modelValue" :style="{ zIndex: zIndex }" @touchmove.stop.prevent="noop">
    <view class="wd-tour__mask" @click.stop="handleMask">
      <slot name="highlight" :elementInfo="highlightElementInfo">
        <view class="wd-tour__highlight" :style="highlightStyle"></view>
      </slot>
      <view class="wd-tour__popover" :style="popoverStyle">
        <slot name="content">
          <view class="wd-tour__info">
            <rich-text :nodes="currentStep.content"></rich-text>
          </view>
        </slot>

        <view class="wd-tour__buttons" v-if="showTourButtons">
          <!-- 上一步按钮 -->
          <view class="wd-tour__prev" v-if="currentIndex > 0" @click.stop="handlePrev">
            <slot name="prev">
              <view class="wd-tour__prev__default">{{ prevText }}</view>
            </slot>
          </view>

          <!-- 跳过按钮 -->
          <view class="wd-tour__skip" @click.stop="handleSkip">
            <slot name="skip" v-if="$slots.skip"></slot>
            <view class="wd-tour__skip__default" v-else>{{ skipText }}</view>
          </view>

          <!-- 下一步按钮 -->
          <view class="wd-tour__next" v-if="currentIndex !== steps.length - 1" @click.stop="handleNext">
            <slot name="next">
              <view class="wd-tour__next__default">
                {{ `${nextText}(${currentIndex + 1}/${steps.length})` }}
              </view>
            </slot>
          </view>

          <!-- 完成按钮 -->
          <view class="wd-tour__finish" v-if="currentIndex === steps.length - 1" @click.stop="handleFinish">
            <slot name="finish">
              <view class="wd-tour__finish__default">{{ finishText }}</view>
            </slot>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-tour',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import { tourProps } from './types'
// #ifdef H5
import useLockScroll from '../composables/useLockScroll'
// #endif

interface ElementRect {
  top: number
  left: number
  width: number
  height: number
  bottom?: number
  right?: number
}
const props = defineProps(tourProps)
const emit = defineEmits(['update:modelValue', 'update:current', 'change', 'prev', 'next', 'finish', 'skip', 'error'])
// #ifdef H5
const { lock, unlock } = useLockScroll(() => props.modelValue)
// #endif

// 响应式数据
const currentIndex = ref(0)
const elementInfo = ref({
  top: 0,
  left: 0,
  width: 0,
  height: 0
})
const windowHeight = ref(0)
const windowTop = ref(0)
const isUp = ref(1) // 判断元素位置，确定提示信息在该元素的上方还是下方
const oldscrollTop = ref(0) //记录上一次滚动位置
const statusBarHeight = ref(0)
const menuButtonInfo = ref(null as UniNamespace.GetMenuButtonBoundingClientRectRes | null)
const topOffset = ref(0)

// 计算属性
const currentStep = computed(() => {
  return props.steps[currentIndex.value] || {}
})
// 提取公共的默认样式函数
function getDefaultStyle() {
  return {
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '0',
    transition: props.duration + 'ms all',
    borderRadius: '0px',
    padding: '0px'
  }
}
// 提取公共的高亮样式计算函数
function calculateHighlightStyle(padding: number, boxShadow: string) {
  return {
    transition: props.duration + 'ms all,boxShadow 0s,height 0s,width 0s',
    borderRadius: props.borderRadius + 'px',
    padding: padding + 'px',
    boxShadow: boxShadow
  }
}
const highlightStyle = computed(() => {
  // 如果元素信息尚未获取到，返回空样式避免闪烁
  if (!elementInfo.value.width && !elementInfo.value.height) {
    return getDefaultStyle()
  }
  const padding = props.padding
  // 根据是否显示蒙版来设置阴影效果
  const boxShadow = props.mask ? `0 0 0 100vh ${props.maskColor}` : 'none'

  const baseStyle = calculateHighlightStyle(padding, boxShadow)
  return {
    ...baseStyle,
    top: elementInfo.value.top - padding + 'px',
    left: elementInfo.value.left - padding + 'px',
    height: elementInfo.value.height + 'px',
    width: elementInfo.value.width + 'px'
  }
})

const popoverStyle = computed(() => {
  const style: {
    transition: string
    position: string
    left: string
    transform: string
    maxWidth: string
    textAlign: string
    zIndex: number
    top?: string
    bottom?: string
  } = {
    transition: props.duration + 'ms all',
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '686rpx',
    textAlign: 'center',
    zIndex: props.zIndex + 1
  }
  const padding = props.padding
  if (isUp.value === 1) {
    // 提示在元素下方
    style.top = elementInfo.value.top + elementInfo.value.height + padding + Number(props.offset) + 'px'
  } else {
    // 提示在元素上方
    style.bottom = windowHeight.value + windowTop.value - elementInfo.value.top + padding + Number(props.offset) + 'px'
  }

  return style
})

const highlightElementInfo = computed(() => {
  const padding = props.padding
  const boxShadow = props.mask ? `0 0 0 100vh ${props.maskColor}` : 'none'
  // 如果元素信息尚未获取到，返回空样式避免闪烁
  if (!elementInfo.value.width && !elementInfo.value.height) {
    return getDefaultStyle()
  }

  const baseStyle = calculateHighlightStyle(padding, boxShadow)
  return {
    ...baseStyle,
    top: elementInfo.value.top - padding + 'px',
    left: elementInfo.value.left - padding + 'px',
    width: elementInfo.value.width + padding * 2 + 'px', // 加上左右padding
    height: elementInfo.value.height + padding * 2 + 'px' // 加上上下padding
  }
})
function noop() {}
// 方法
function updateElementInfo() {
  // 每次更新元素信息时重新获取系统信息，确保准确性
  updateSystemInfo()

  const element = currentStep.value.element
  if (!element) return
  try {
    const query = uni.createSelectorQuery()
    query
      .select(element)
      .boundingClientRect((res: any) => {
        if (!res) {
          console.error('无法找到元素:', element)
          emit('error', {
            message: '无法找到指定的引导元素',
            element: element
          })
          return
        }
        // 初始化元素信息
        initializeElementInfo(res)
        // 获取有效的页面边界
        const effectiveBoundaries = getEffectiveBoundaries()
        // 检查是否需要滚动
        const scrollNeeds = checkScrollNeeds(res, effectiveBoundaries)
        // 处理滚动逻辑
        handleScrolling(res, scrollNeeds, effectiveBoundaries)
        // 计算提示框显示位置
        calculateTipPosition(res, effectiveBoundaries)
      })
      .exec()
  } catch (error) {
    console.error('updateElementInfo error:', error)
  }
}

// 更新系统信息
function updateSystemInfo() {
  const sysInfo = uni.getSystemInfoSync()
  windowHeight.value = sysInfo.windowHeight
  windowTop.value = sysInfo.windowTop || 0
  statusBarHeight.value = sysInfo.statusBarHeight || 0
}

// 初始化元素信息
function initializeElementInfo(res: ElementRect) {
  elementInfo.value = res
  // 调整元素位置信息，加上窗口顶部偏移量
  elementInfo.value.top = res.top + windowTop.value
  elementInfo.value.bottom = res.bottom + windowTop.value
}
// 获取有效的页面边界（顶部和底部安全区域）
function getEffectiveBoundaries() {
  // 有效顶部边界初始化为窗口顶部 + 顶部偏移量
  let effectiveWindowTop = windowTop.value + Number(topOffset.value)
  // 有效底部边界为窗口高度
  let effectiveWindowBottom = windowHeight.value
  return {
    top: effectiveWindowTop,
    bottom: effectiveWindowBottom
  }
}
// 检查是否需要滚动
function checkScrollNeeds(res: ElementRect, boundaries: { top: number; bottom: number }) {
  // 判断元素是否被顶部遮挡（需要向上滚动）
  const needScrollUp = res.top < boundaries.top
  // 判断元素是否被底部遮挡（需要向下滚动）
  const needScrollDown = (res.bottom !== undefined ? res.bottom : 0) + Number(props.bottomSafetyOffset) > boundaries.bottom
  return {
    up: needScrollUp, //提示框往上走
    down: needScrollDown //提示框往下走
  }
}

// 处理滚动逻辑
function handleScrolling(res: ElementRect, scrollNeeds, boundaries: { top: number; bottom: number }) {
  if (scrollNeeds.up) {
    // 元素被顶部遮挡，需要提示框往上走，页面往下走
    scrollUp(res, boundaries)
  } else if (scrollNeeds.down) {
    // 元素被底部遮挡，需要提示框向下走，页面向上走
    scrollDown(res)
  }
}

// 向引导上滚动处理
function scrollUp(res: ElementRect, boundaries: { top: number; bottom: number }) {
  // 计算需要滚动的距离
  let scrollDistance = oldscrollTop.value + res.top - props.padding - boundaries.top
  // 更新元素位置信息（滚动后）
  elementInfo.value.top = boundaries.top + props.padding
  elementInfo.value.bottom = windowHeight.value - (boundaries.top + props.padding)
  uni.pageScrollTo({
    scrollTop: scrollDistance,
    duration: Number(props.duration),
    success: () => {
      // 更新已滚动距离
      oldscrollTop.value = scrollDistance
    }
  })
}

// 引导向下滚动处理
function scrollDown(res: ElementRect) {
  // 计算需要滚动的距离
  let scrollDistance = (res.bottom ?? 0) - windowHeight.value + props.padding + Number(props.bottomSafetyOffset)

  // 更新元素位置信息（滚动后）
  elementInfo.value.top = windowHeight.value - res.height - props.padding - Number(props.bottomSafetyOffset) // 应该是减去安全偏移量
  elementInfo.value.bottom = windowHeight.value - props.padding - Number(props.bottomSafetyOffset)

  uni.pageScrollTo({
    scrollTop: scrollDistance + oldscrollTop.value,
    duration: Number(props.duration),
    success: () => {
      // 更新已滚动距离
      oldscrollTop.value = scrollDistance + oldscrollTop.value
    }
  })
}

// 计算提示框显示位置（上方或下方）
function calculateTipPosition(res: ElementRect, boundaries: { top: number; bottom: number }) {
  // 计算导航区域总高度
  let totalNavHeight = statusBarHeight.value

  // #ifdef MP
  // 微信小程序平台考虑菜单按钮高度
  //   if (props.customNav) {
  //     // const menuBottom = this.menuButtonInfo.top + this.menuButtonInfo.height;
  //     const menuBottom = menuButtonInfo.value.top;
  //     totalNavHeight = Math.max(totalNavHeight, menuBottom);
  //   }
  // #endif
  // totalNavHeight = Math.max(totalNavHeight, topOffset.value);

  // 计算屏幕中心点位置
  const screenCenter = (windowHeight.value + totalNavHeight) / 2 + windowTop.value

  // 计算元素中心点位置
  const elementCenter = res.top + res.height / 2 + windowTop.value

  // 根据元素位置决定提示框显示在上方还是下方
  if (elementCenter < screenCenter) {
    isUp.value = 1 // 提示在元素下方
  } else {
    isUp.value = 0 // 提示在元素上方
  }
}

function handlePrev() {
  if (currentIndex.value > 0) {
    const oldIndex = currentIndex.value
    currentIndex.value--
    emit('prev', {
      oldCurrent: oldIndex,
      current: currentIndex.value,
      total: props.steps.length,
      isUp: isUp.value
    })
    emit('change', currentIndex.value)
  }
}

function handleNext() {
  if (currentIndex.value < props.steps.length - 1) {
    const oldIndex = currentIndex.value
    currentIndex.value++
    emit('next', {
      oldCurrent: oldIndex,
      current: currentIndex.value,
      total: props.steps.length,
      isUp: isUp.value
    })
    emit('change', currentIndex.value)
  } else {
    handleFinish()
  }
}

function handleFinish() {
  emit('finish', {
    current: currentIndex.value,
    total: props.steps.length
  })
  currentIndex.value = 0
  oldscrollTop.value = 0 // 重置滚动位置
  emit('update:modelValue', false)
}

function handleSkip() {
  emit('skip', {
    current: currentIndex.value,
    total: props.steps.length
  })
  currentIndex.value = 0
  oldscrollTop.value = 0 // 重置滚动位置
  emit('update:modelValue', false)
}
function handleMask() {
  if (props.clickMaskNext) {
    handleNext()
  }
}

watch(
  () => props.current,
  (newVal) => {
    currentIndex.value = newVal
  }
)
// 监听 currentIndex 变化，同步到父组件
watch(
  () => currentIndex.value,
  (newVal) => {
    nextTick(() => {
      setTimeout(() => {
        updateElementInfo()
      }, 50)
    })
    emit('update:current', newVal)
  }
)

// 监听 modelValue 变化，当组件显示时更新系统信息
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      // 组件显示时重置滚动位置并更新系统信息
      oldscrollTop.value = 0
      updateSystemInfo()
      nextTick(() => {
        setTimeout(() => {
          updateElementInfo()
          emit('update:current', currentIndex.value)
        }, 50)
      })
    }
  },
  {
    immediate: true
  }
)

// 初始化
// updateSystemInfo()

// 所有平台统一处理逻辑
if (props.customNav) {
  // 开启了自定义导航栏
  if (props.topSafetyOffset && Number(props.topSafetyOffset) > 0) {
    // 用户传入了顶部安全偏移量，优先使用用户设置的值
    topOffset.value = Number(props.topSafetyOffset)
  } else {
    // 未传入顶部偏移量
    // #ifdef MP
    // 微信小程序平台获取菜单按钮信息并使用其顶部位置
    menuButtonInfo.value = uni.getMenuButtonBoundingClientRect() || null
    topOffset.value = menuButtonInfo.value ? menuButtonInfo.value.top : 0
    // #endif
    // #ifndef MP
    // 非微信小程序平台默认为0
    topOffset.value = 0
    // #endif
  }
} else {
  // 未开启自定义导航栏，直接使用用户传入的顶部安全偏移量
  topOffset.value = Number(props.topSafetyOffset) || 0
}
defineExpose({
  handlePrev,
  handleNext,
  handleFinish,
  handleSkip
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
