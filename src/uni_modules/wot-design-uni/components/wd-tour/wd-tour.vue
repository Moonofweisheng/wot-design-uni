<template>
  <view class="wd-tour" v-if="modelValue" :style="rootStyle" @touchmove.stop.prevent="noop">
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
import { ref, computed, watch, nextTick, type CSSProperties } from 'vue'
import { addUnit, getRect, getSystemInfo, isDef, objToStyle } from '../common/util'
import { tourProps, type TourEmits } from './types'
import { useRaf } from '../composables/useRaf'
import { useTranslate } from '../composables/useTranslate'

const props = defineProps(tourProps)
const emit = defineEmits<TourEmits>()
const { translate } = useTranslate('tour')

const prevText = computed(() => {
  return isDef(props.prevText) ? props.prevText : translate('prev')
})

const nextText = computed(() => {
  return isDef(props.nextText) ? props.nextText : translate('next')
})

const skipText = computed(() => {
  return isDef(props.skipText) ? props.skipText : translate('skip')
})

const finishText = computed(() => {
  return isDef(props.finishText) ? props.finishText : translate('finish')
})

const currentIndex = ref<number>(0) // 当前步骤索引
const elementInfo = ref<UniApp.NodeInfo>({
  top: 0,
  left: 0,
  width: 0,
  height: 0
}) // 元素信息
const windowHeight = ref<number>(0) // 窗口高度
const windowTop = ref<number>(0) // 窗口顶部位置
const isElementInTop = ref<boolean>(true) // 判断元素位置，确定提示信息在该元素的上方还是下方，true为上方，false为下方
const lastScrollTop = ref<number>(0) //记录上一次滚动位置
const statusBarHeight = ref<number>(0) // 状态栏高度
const menuButtonInfo = ref(null as UniNamespace.GetMenuButtonBoundingClientRectRes | null)
const topOffset = ref<number>(0) // 顶部偏移量

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.zIndex)) {
    style.zIndex = props.zIndex
  }
  return objToStyle(style)
})

// 计算属性
const currentStep = computed(() => {
  return props.steps[currentIndex.value] || {}
})
// 提取公共的默认样式函数
function getDefaultStyle(): CSSProperties {
  return {
    transition: props.duration + 'ms all'
  }
}
// 提取公共的高亮样式计算函数
function calculateHighlightStyle(padding: number, boxShadow: string): CSSProperties {
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
  const stepPadding = Number(isDef(currentStep.value.padding) ? currentStep.value.padding : props.padding)
  // 根据是否显示蒙版来设置阴影效果
  const boxShadow = props.mask ? `0 0 0 100vh ${props.maskColor}` : 'none'

  const baseStyle = calculateHighlightStyle(stepPadding, boxShadow)
  const styleObj = {
    ...baseStyle,
    top: addUnit((elementInfo.value.top || 0) - stepPadding),
    left: addUnit((elementInfo.value.left || 0) - stepPadding),
    height: addUnit(elementInfo.value.height || 0),
    width: addUnit(elementInfo.value.width || 0)
  }
  return objToStyle([{ ...styleObj }, props.highlightStyle])
})

const popoverStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.zIndex)) {
    style.zIndex = props.zIndex + 1
    style.transitionDuration = props.duration + 'ms'
  }
  const stepPadding = Number(isDef(currentStep.value.offset) ? currentStep.value.offset : props.offset)
  const placement = isDef(currentStep.value.placement) ? currentStep.value.placement : 'auto'
  const down = placement === 'bottom' || (placement === 'auto' && isElementInTop.value)
  if (down) {
    // 提示在元素下方
    style.top = addUnit((elementInfo.value.top || 0) + (elementInfo.value.height || 0) + Number(stepPadding))
  } else {
    // 提示在元素上方
    style.bottom = addUnit(windowHeight.value + windowTop.value - (elementInfo.value.top || 0) + Number(stepPadding))
  }

  return objToStyle(style)
})

const highlightElementInfo = computed(() => {
  const stepPadding = Number(isDef(currentStep.value.padding) ? currentStep.value.padding : props.padding)
  const boxShadow = props.mask ? `0 0 0 100vh ${props.maskColor}` : 'none'
  // 如果元素信息尚未获取到，返回空样式避免闪烁
  if (!elementInfo.value.width && !elementInfo.value.height) {
    return getDefaultStyle()
  }

  const baseStyle = calculateHighlightStyle(stepPadding, boxShadow)
  return {
    ...baseStyle,
    top: addUnit((elementInfo.value.top || 0) - stepPadding),
    left: addUnit((elementInfo.value.left || 0) - stepPadding),
    width: addUnit(elementInfo.value.width || 0) + stepPadding * 2,
    height: addUnit(elementInfo.value.height || 0) + stepPadding * 2
  }
})
function noop() {}
// 方法
async function updateElementInfo() {
  updateSystemInfo()
  const element = currentStep.value.element
  if (!element) return
  try {
    const res = (await getRect(element, false, props.scope)) as UniApp.NodeInfo | null
    if (!res) {
      console.error('无法找到元素:', element)
      emit('error', {
        message: '无法找到指定的引导元素',
        element: element
      })
      if (props.missingStrategy === 'skip') {
        handleNext()
      } else if (props.missingStrategy === 'hide') {
        emit('update:modelValue', false)
      }
      return
    }
    initializeElementInfo(res)
    const effectiveBoundaries = getEffectiveBoundaries()
    const scrollNeeds = checkScrollNeeds(res, effectiveBoundaries)
    handleScrolling(res, scrollNeeds, effectiveBoundaries)
    calculateTipPosition(res, effectiveBoundaries)
  } catch (error) {
    console.error('updateElementInfo error:', error)
    emit('error', {
      message: '无法找到指定的引导元素',
      element: element
    })
  }
}

// 更新系统信息
function updateSystemInfo() {
  const sysInfo = getSystemInfo()
  windowHeight.value = sysInfo.windowHeight
  windowTop.value = sysInfo.windowTop || 0
  statusBarHeight.value = sysInfo.statusBarHeight || 0
}

// 初始化元素信息
function initializeElementInfo(res: UniApp.NodeInfo) {
  elementInfo.value = res
  // 调整元素位置信息，加上窗口顶部偏移量
  elementInfo.value.top = (res.top || 0) + windowTop.value
  elementInfo.value.bottom = ((res.bottom !== undefined ? res.bottom : (res.top || 0) + (res.height || 0)) as number) + windowTop.value
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
function checkScrollNeeds(res: UniApp.NodeInfo, boundaries: { top: number; bottom: number }) {
  // 判断元素是否被顶部遮挡（需要向上滚动）
  const needScrollUp = Number(res.top) < boundaries.top
  // 判断元素是否被底部遮挡（需要向下滚动）
  const needScrollDown = (res.bottom !== undefined ? res.bottom : 0) + Number(props.bottomSafetyOffset) > boundaries.bottom
  return {
    up: needScrollUp, //提示框往上走
    down: needScrollDown //提示框往下走
  }
}

// 处理滚动逻辑
function handleScrolling(res: UniApp.NodeInfo, scrollNeeds: { up: boolean; down: boolean }, boundaries: { top: number; bottom: number }) {
  if (scrollNeeds.up) {
    // 元素被顶部遮挡，需要提示框往上走，页面往下走
    scrollUp(res, boundaries)
  } else if (scrollNeeds.down) {
    // 元素被底部遮挡，需要提示框向下走，页面向上走
    scrollDown(res)
  }
}

// 向引导上滚动处理
function scrollUp(res: UniApp.NodeInfo, boundaries: { top: number; bottom: number }) {
  // 计算需要滚动的距离
  let scrollDistance = lastScrollTop.value + Number(res.top) - props.padding - boundaries.top
  // 更新元素位置信息（滚动后）
  elementInfo.value.top = boundaries.top + props.padding
  elementInfo.value.bottom = windowHeight.value - (boundaries.top + props.padding)
  uni.pageScrollTo({
    scrollTop: scrollDistance,
    duration: Number(props.duration),
    success: () => {
      // 更新已滚动距离
      lastScrollTop.value = scrollDistance
    }
  })
}

// 引导向下滚动处理
function scrollDown(res: UniApp.NodeInfo) {
  // 计算需要滚动的距离
  let scrollDistance = Number(res.bottom) - windowHeight.value + props.padding + Number(props.bottomSafetyOffset)

  // 更新元素位置信息（滚动后）
  elementInfo.value.top = windowHeight.value - Number(res.bottom) - props.padding - Number(props.bottomSafetyOffset) // 应该是减去安全偏移量
  elementInfo.value.bottom = windowHeight.value - props.padding - Number(props.bottomSafetyOffset)

  uni.pageScrollTo({
    scrollTop: scrollDistance + lastScrollTop.value,
    duration: Number(props.duration),
    success: () => {
      // 更新已滚动距离
      lastScrollTop.value = scrollDistance + lastScrollTop.value
    }
  })
}

// 计算提示框显示位置（上方或下方）
function calculateTipPosition(res: UniApp.NodeInfo, boundaries: { top: number; bottom: number }) {
  // 计算导航区域总高度
  let totalNavHeight = statusBarHeight.value
  // 计算屏幕中心点位置
  const screenCenter = (windowHeight.value + totalNavHeight) / 2 + windowTop.value

  // 计算元素中心点位置
  const elementCenter = Number(res.top) + Number(res.height) / 2 + windowTop.value

  // 根据元素位置决定提示框显示在上方还是下方
  if (elementCenter < screenCenter) {
    isElementInTop.value = true
  } else {
    isElementInTop.value = false
  }
}

function handlePrev() {
  if (currentIndex.value > 0) {
    const oldIndex = currentIndex.value
    currentIndex.value--
    emit('prev', {
      prevCurrent: oldIndex,
      current: currentIndex.value,
      total: props.steps.length,
      isElementInTop: isElementInTop.value
    })
    emit('change', { current: currentIndex.value })
  }
}

function handleNext() {
  if (currentIndex.value < props.steps.length - 1) {
    const oldIndex = currentIndex.value
    currentIndex.value++
    emit('next', {
      prevCurrent: oldIndex,
      current: currentIndex.value,
      total: props.steps.length,
      isElementInTop: isElementInTop.value
    })
    emit('change', { current: currentIndex.value })
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
  lastScrollTop.value = 0 // 重置滚动位置
  emit('update:modelValue', false)
}

function handleSkip() {
  emit('skip', {
    current: currentIndex.value,
    total: props.steps.length
  })
  currentIndex.value = 0
  lastScrollTop.value = 0 // 重置滚动位置
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
    const raf = useRaf(updateElementInfo)
    nextTick(() => {
      raf.start()
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
      lastScrollTop.value = 0
      updateSystemInfo()
      const raf = useRaf(() => {
        updateElementInfo()
        emit('update:current', currentIndex.value)
      })
      nextTick(() => {
        raf.start()
      })
    }
  },
  {
    immediate: true
  }
)

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
