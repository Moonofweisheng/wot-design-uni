<template>
  <template v-if="sticky">
    <wd-sticky-box>
      <view
        :class="`wd-tabs ${customClass} ${slidableNum < items.length ? 'is-slide' : ''} ${mapNum < items.length && mapNum !== 0 ? 'is-map' : ''}`"
        :style="customStyle"
      >
        <wd-sticky :offset-top="offsetTop">
          <!--头部导航容器-->
          <view class="wd-tabs__nav wd-tabs__nav--sticky">
            <view class="wd-tabs__nav--wrap">
              <scroll-view :scroll-x="slidableNum < items.length" scroll-with-animation :scroll-left="scrollLeft">
                <view class="wd-tabs__nav-container">
                  <!--nav列表-->
                  <view
                    @click="handleSelect(index)"
                    v-for="(item, index) in items"
                    :key="index"
                    :class="`wd-tabs__nav-item  ${activeIndex === index ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''}`"
                    :style="activeIndex === index ? (color ? 'color:' + color : '') : inactiveColor ? 'color:' + inactiveColor : ''"
                  >
                    {{ item.title }}
                  </view>
                  <!--下划线-->
                  <view class="wd-tabs__line" :style="lineStyle"></view>
                </view>
              </scroll-view>
            </view>
            <!--map表-->
            <view class="wd-tabs__map" v-if="mapNum < items.length && mapNum !== 0">
              <view :class="`wd-tabs__map-btn  ${animating ? 'is-open' : ''}`" @click="toggleMap">
                <view :class="`wd-tabs__map-arrow  ${animating ? 'is-open' : ''}`">
                  <wd-icon name="arrow-down" />
                </view>
              </view>
              <view class="wd-tabs__map-header" :style="`${mapShow ? '' : 'display:none;'}  ${animating ? 'opacity:1;' : ''}`">
                {{ translate('all') }}
              </view>
              <view :class="`wd-tabs__map-body  ${animating ? 'is-open' : ''}`" :style="mapShow ? '' : 'display:none'">
                <view class="wd-tabs__map-nav-item" v-for="(item, index) in items" :key="index" @click="handleSelect(index)">
                  <view
                    :class="`wd-tabs__map-nav-btn ${activeIndex === index ? 'is-active' : ''}  ${item.disabled ? 'is-disabled' : ''}`"
                    :style="
                      activeIndex === index
                        ? color
                          ? 'color:' + color + ';border-color:' + color
                          : ''
                        : inactiveColor
                        ? 'color:' + inactiveColor
                        : ''
                    "
                  >
                    {{ item.title }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </wd-sticky>

        <!--标签页-->
        <view class="wd-tabs__container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
          <view :class="['wd-tabs__body', animated ? 'is-animated' : '']" :style="bodyStyle">
            <slot />
          </view>
        </view>

        <!--map表的阴影浮层-->
        <view class="wd-tabs__mask" :style="`${mapShow ? '' : 'display:none;'} ${animating ? 'opacity:1;' : ''}`" @click="toggleMap"></view>
      </view>
    </wd-sticky-box>
  </template>

  <template v-else>
    <view :class="`wd-tabs  ${customClass} ${slidableNum < items.length ? 'is-slide' : ''} ${mapNum < items.length && mapNum !== 0 ? 'is-map' : ''}`">
      <!--头部导航容器-->
      <view class="wd-tabs__nav">
        <view class="wd-tabs__nav--wrap">
          <scroll-view :scroll-x="slidableNum < items.length" scroll-with-animation :scroll-left="scrollLeft">
            <view class="wd-tabs__nav-container">
              <!--nav列表-->
              <view
                v-for="(item, index) in items"
                @click="handleSelect(index)"
                :key="index"
                :class="`wd-tabs__nav-item ${activeIndex === index ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''}`"
                :style="activeIndex === index ? (color ? 'color:' + color : '') : inactiveColor ? 'color:' + inactiveColor : ''"
              >
                {{ item.title }}
              </view>
              <!--下划线-->
              <view class="wd-tabs__line" :style="lineStyle"></view>
            </view>
          </scroll-view>
        </view>
        <!--map表-->
        <view class="wd-tabs__map" v-if="mapNum < items.length && mapNum !== 0">
          <view class="wd-tabs__map-btn" @click="toggleMap">
            <view :class="`wd-tabs__map-arrow ${animating ? 'is-open' : ''}`">
              <wd-icon name="arrow-down" />
            </view>
          </view>
          <view class="wd-tabs__map-header" :style="`${mapShow ? '' : 'display:none;'}  ${animating ? 'opacity:1;' : ''}`">
            {{ translate('all') }}
          </view>
          <view :class="`wd-tabs__map-body ${animating ? 'is-open' : ''}`" :style="mapShow ? '' : 'display:none'">
            <view class="wd-tabs__map-nav-item" v-for="(item, index) in items" :key="index" @click="handleSelect(index)">
              <view :class="`wd-tabs__map-nav-btn ${activeIndex === index ? 'is-active' : ''}  ${item.disabled ? 'is-disabled' : ''}`">
                {{ item.title }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <!--标签页-->
      <view class="wd-tabs__container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
        <view :class="['wd-tabs__body', animated ? 'is-animated' : '']" :style="bodyStyle">
          <slot />
        </view>
      </view>

      <!--map表的阴影浮层-->
      <view class="wd-tabs__mask" :style="`${mapShow ? '' : 'display:none;'}  ${animating ? 'opacity:1' : ''}`" @click="toggleMap"></view>
    </view>
  </template>
</template>
<script lang="ts">
export default {
  name: 'wd-tabs',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref, watch, nextTick, reactive } from 'vue'
import { debounce, getRect, isDef, isNumber, isString, objToStyle } from '../common/util'
import { useTouch } from '../composables/useTouch'
import { TABS_KEY, tabsProps } from './types'
import { useChildren } from '../composables/useChildren'
import { useTranslate } from '../composables/useTranslate'

const $item = '.wd-tabs__nav-item'
const $container = '.wd-tabs__nav-container'

const props = defineProps(tabsProps)
const emit = defineEmits(['change', 'disabled', 'click', 'update:modelValue'])

const { translate } = useTranslate('tabs')

// 选中值的索引，默认第一个
// const state = reactive({ activeIndex: 0 })
// navBar的下划线样式
const lineStyle = ref<string>('')

// map的开关
const mapShow = ref<boolean>(false)
// scroll-view偏移量
const scrollLeft = ref<number>(0)

// 是否动画中
const animating = ref<boolean>(false)

const inited = ref<boolean>(false)

const { proxy } = getCurrentInstance() as any

const touch = useTouch()

// 数据双向绑定 后续可优化为 defineModel 方式
const currentValue = ref()
watch(
  () => props.modelValue,
  (newValue) => {
    if (!isNumber(newValue) && !isString(newValue)) {
      console.error('[wot design] error(wd-tabs): the type of value should be number or string')
    }
    currentValue.value = newValue
  },
  {
    immediate: true
  }
)
watch(currentValue, (val) => {
  updateLineStyle()
  scrollIntoView()
  emit('change', {
    index: activeIndex.value,
    name: val
  })
  emit('update:modelValue', val)
})
const { children, linkChildren } = useChildren(TABS_KEY)
// tabs数据
const items = computed(() => {
  return children.map((child, index) => {
    return { disabled: child.disabled, title: child.title, name: isDef(child.name) ? child.name : index }
  })
})
const activeIndex = computed(() => {
  // 提前校验减少后续运算
  if (currentValue.value === undefined || items.value.length <= 0) {
    return 0
  }
  const index = items.value.findIndex((item) => item.name === currentValue.value)
  // name代表的索引超过了items的边界，自动用0兜底
  return Math.max(0, index)
})
linkChildren({
  state: {
    activeIndex
  }
})

const bodyStyle = computed(() => {
  if (!props.animated) {
    return ''
  }

  return objToStyle({
    left: -100 * activeIndex.value + '%',
    'transition-duration': props.duration + 'ms',
    '-webkit-transition-duration': props.duration + 'ms'
  })
})

/**
 * @description 修改选中的tab Index
 */
const setActive = debounce(
  function (value: number) {
    // 没有tab子元素，不执行任何操作
    if (items.value.length === 0) return
    // 被禁用，不执行任何操作
    if (items.value[value].disabled) return
    currentValue.value = items.value[value].name
  },
  100,
  { leading: false }
)

onMounted(() => {
  inited.value = true
  nextTick(() => {
    updateLineStyle(false)
    scrollIntoView()
  })
})

/**
 * @description nav map list 开关
 */
function toggleMap() {
  // 必须保证display和transition不在同一个帧
  if (mapShow.value) {
    animating.value = false
    setTimeout(() => {
      mapShow.value = false
    }, 300)
  } else {
    mapShow.value = true
    setTimeout(() => {
      animating.value = true
    }, 100)
  }
}

/**
 * @description 更新navBar underline的偏移量
 * @param {Boolean} animation 是否伴随动画
 */
function updateLineStyle(animation: boolean = true) {
  if (!inited.value) return
  const { lineWidth, lineHeight } = props
  getRect($item, true, proxy).then((rects) => {
    const rect = rects[activeIndex.value]
    const width = lineWidth
    let left = rects.slice(0, activeIndex.value).reduce((prev, curr) => prev + Number(curr.width), 0)
    left += (Number(rect.width) - width) / 2
    const transition = animation ? 'transition: width 300ms ease, transform 300ms ease;' : ''

    const lineStyleTemp = `
            height: ${lineHeight}px;
            width: ${width}px;
            transform: translateX(${left}px);
            ${transition}
          `
    // 防止重复绘制
    if (lineStyle.value !== lineStyleTemp) {
      lineStyle.value = lineStyleTemp
    }
  })
}

/**
 * @description scroll-view滑动到active的tab_nav
 */
function scrollIntoView() {
  if (!inited.value) return
  Promise.all([getRect($item, true, proxy), getRect($container, false, proxy)]).then(([navItemsRects, navRect]) => {
    // 选中元素
    const selectItem = navItemsRects[activeIndex.value]
    // 选中元素之前的节点的宽度总和
    const offsetLeft = (navItemsRects as any).slice(0, activeIndex.value).reduce((prev: any, curr: any) => prev + curr.width, 0)
    // scroll-view滑动到selectItem的偏移量
    const left = offsetLeft - ((navRect as any).width - Number(selectItem.width)) / 2
    if (left === scrollLeft.value) {
      scrollLeft.value = left + Math.random() / 10000
    } else {
      scrollLeft.value = left
    }
  })
}
/**
 * @description 单击tab的处理
 * @param index
 */
function handleSelect(index: number) {
  if (index === undefined) return
  const { name, disabled } = items.value[index]
  if (disabled) {
    emit('disabled', {
      index,
      name
    })
    return
  }
  mapShow.value && toggleMap()
  currentValue.value = name
  emit('click', {
    index,
    name
  })
}
/**
 * @description touch handle
 * @param event
 */
function onTouchStart(event: any) {
  if (!props.swipeable) return
  touch.touchStart(event)
}
function onTouchMove(event: any) {
  if (!props.swipeable) return
  touch.touchMove(event)
}
function onTouchEnd() {
  if (!props.swipeable) return
  const { direction, deltaX, offsetX } = touch
  const minSwipeDistance = 50
  if (direction.value === 'horizontal' && offsetX.value >= minSwipeDistance) {
    if (deltaX.value > 0 && activeIndex.value !== 0) {
      setActive(activeIndex.value - 1)
    } else if (deltaX.value < 0 && activeIndex.value !== items.value.length - 1) {
      setActive(activeIndex.value + 1)
    }
  }
}

defineExpose({
  setActive,
  scrollIntoView,
  updateLineStyle
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
