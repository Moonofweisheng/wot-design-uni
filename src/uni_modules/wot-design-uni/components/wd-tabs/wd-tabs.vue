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
              <scroll-view :scroll-x="slidableNum < items.length" scroll-with-animation :scroll-left="state.scrollLeft">
                <view class="wd-tabs__nav-container">
                  <!--nav列表-->
                  <view
                    @click="handleSelect(index)"
                    v-for="(item, index) in items"
                    :key="index"
                    :class="`wd-tabs__nav-item  ${state.activeIndex === index ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''}`"
                    :style="state.activeIndex === index ? (color ? 'color:' + color : '') : inactiveColor ? 'color:' + inactiveColor : ''"
                  >
                    {{ item.title }}
                  </view>
                  <!--下划线-->
                  <view class="wd-tabs__line" :style="state.lineStyle"></view>
                </view>
              </scroll-view>
            </view>
            <!--map表-->
            <view class="wd-tabs__map" v-if="mapNum < items.length && mapNum !== 0">
              <view :class="`wd-tabs__map-btn  ${state.animating ? 'is-open' : ''}`" @click="toggleMap">
                <view :class="`wd-tabs__map-arrow  ${state.animating ? 'is-open' : ''}`">
                  <wd-icon name="arrow-down" />
                </view>
              </view>
              <view class="wd-tabs__map-header" :style="`${state.mapShow ? '' : 'display:none;'}  ${state.animating ? 'opacity:1;' : ''}`">
                {{ translate('all') }}
              </view>
              <view :class="`wd-tabs__map-body  ${state.animating ? 'is-open' : ''}`" :style="state.mapShow ? '' : 'display:none'">
                <view class="wd-tabs__map-nav-item" v-for="(item, index) in items" :key="index" @click="handleSelect(index)">
                  <view
                    :class="`wd-tabs__map-nav-btn ${state.activeIndex === index ? 'is-active' : ''}  ${item.disabled ? 'is-disabled' : ''}`"
                    :style="
                      state.activeIndex === index
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
        <view
          class="wd-tabs__mask"
          :style="`${state.mapShow ? '' : 'display:none;'} ${state.animating ? 'opacity:1;' : ''}`"
          @click="toggleMap"
        ></view>
      </view>
    </wd-sticky-box>
  </template>

  <template v-else>
    <view :class="`wd-tabs  ${customClass} ${slidableNum < items.length ? 'is-slide' : ''} ${mapNum < items.length && mapNum !== 0 ? 'is-map' : ''}`">
      <!--头部导航容器-->
      <view class="wd-tabs__nav">
        <view class="wd-tabs__nav--wrap">
          <scroll-view :scroll-x="slidableNum < items.length" scroll-with-animation :scroll-left="state.scrollLeft">
            <view class="wd-tabs__nav-container">
              <!--nav列表-->
              <view
                v-for="(item, index) in items"
                @click="handleSelect(index)"
                :key="index"
                :class="`wd-tabs__nav-item ${state.activeIndex === index ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''}`"
                :style="state.activeIndex === index ? (color ? 'color:' + color : '') : inactiveColor ? 'color:' + inactiveColor : ''"
              >
                {{ item.title }}
              </view>
              <!--下划线-->
              <view class="wd-tabs__line" :style="state.lineStyle"></view>
            </view>
          </scroll-view>
        </view>
        <!--map表-->
        <view class="wd-tabs__map" v-if="mapNum < items.length && mapNum !== 0">
          <view class="wd-tabs__map-btn" @click="toggleMap">
            <view :class="`wd-tabs__map-arrow ${state.animating ? 'is-open' : ''}`">
              <wd-icon name="arrow-down" />
            </view>
          </view>
          <view class="wd-tabs__map-header" :style="`${state.mapShow ? '' : 'display:none;'}  ${state.animating ? 'opacity:1;' : ''}`">
            {{ translate('all') }}
          </view>
          <view :class="`wd-tabs__map-body ${state.animating ? 'is-open' : ''}`" :style="state.mapShow ? '' : 'display:none'">
            <view class="wd-tabs__map-nav-item" v-for="(item, index) in items" :key="index" @click="handleSelect(index)">
              <view :class="`wd-tabs__map-nav-btn ${state.activeIndex === index ? 'is-active' : ''}  ${item.disabled ? 'is-disabled' : ''}`">
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
      <view class="wd-tabs__mask" :style="`${state.mapShow ? '' : 'display:none;'}  ${state.animating ? 'opacity:1' : ''}`" @click="toggleMap"></view>
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
import { computed, getCurrentInstance, onMounted, ref, watch, nextTick, reactive, type CSSProperties } from 'vue'
import { addUnit, checkNumRange, debounce, getRect, isDef, isNumber, isString, objToStyle } from '../common/util'
import { useTouch } from '../composables/useTouch'
import { TABS_KEY, tabsProps } from './types'
import { useChildren } from '../composables/useChildren'
import { useTranslate } from '../composables/useTranslate'

const $item = '.wd-tabs__nav-item'
const $container = '.wd-tabs__nav-container'

const props = defineProps(tabsProps)
const emit = defineEmits(['change', 'disabled', 'click', 'update:modelValue'])

const { translate } = useTranslate('tabs')

const state = reactive({
  activeIndex: 0, // 选中值的索引，默认第一个
  lineStyle: 'display:none;', // 激活项边框线样式
  inited: false, // 是否初始化
  animating: false, // 是否动画中
  mapShow: false, // map的开关
  scrollLeft: 0 // scroll-view偏移量
})

// map的开关

const { children, linkChildren } = useChildren(TABS_KEY)
linkChildren({ state })

const { proxy } = getCurrentInstance() as any

const touch = useTouch()

// tabs数据
const items = computed(() => {
  return children.map((child, index) => {
    return { disabled: child.disabled, title: child.title, name: isDef(child.name) ? child.name : index }
  })
})

const bodyStyle = computed(() => {
  if (!props.animated) {
    return ''
  }

  return objToStyle({
    left: -100 * state.activeIndex + '%',
    'transition-duration': props.duration + 'ms',
    '-webkit-transition-duration': props.duration + 'ms'
  })
})

/**
 * @description 修改选中的tab Index
 * @param {String |Number } value - radio绑定的value或者tab索引，默认值0
 * @param {Boolean } init - 是否伴随初始化操作
 */
const setActive = debounce(
  function (value: number | string = 0, init: boolean = false, setScroll: boolean = true) {
    // 没有tab子元素，不执行任何操作
    if (items.value.length === 0) return

    value = getActiveIndex(value)
    // 被禁用，不执行任何操作
    if (items.value[value].disabled) return
    state.activeIndex = value
    if (setScroll) {
      updateLineStyle(init === false)
      scrollIntoView()
    }
    setActiveTab()
  },
  100,
  { leading: false }
)

watch(
  () => props.modelValue,
  (newValue) => {
    if (!isNumber(newValue) && !isString(newValue)) {
      console.error('[wot design] error(wd-tabs): the type of value should be number or string')
    }
    // 保证不为非空字符串，小于0的数字
    if (newValue === '' || !isDef(newValue)) {
      // eslint-disable-next-line quotes
      console.error("[wot design] error(wd-tabs): tabs's value cannot be '' null or undefined")
    }
    if (typeof newValue === 'number' && newValue < 0) {
      // eslint-disable-next-line quotes
      console.error("[wot design] error(wd-tabs): tabs's value cannot be less than zero")
    }
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    const index = getActiveIndex(newValue)
    setActive(newValue, false, index !== state.activeIndex)
  },
  {
    immediate: false,
    deep: true
  }
)

watch(
  () => children.length,
  () => {
    if (state.inited) {
      nextTick(() => {
        setActive(props.modelValue)
      })
    }
  }
)

watch(
  () => props.slidableNum,
  (newValue) => {
    checkNumRange(newValue, 'slidableNum')
  }
)

watch(
  () => props.mapNum,
  (newValue) => {
    checkNumRange(newValue, 'mapNum')
  }
)

onMounted(() => {
  state.inited = true
  nextTick(() => {
    setActive(props.modelValue, true)
  })
})

/**
 * @description nav map list 开关
 */
function toggleMap() {
  // 必须保证display和transition不在同一个帧
  if (state.mapShow) {
    state.animating = false
    setTimeout(() => {
      state.mapShow = false
    }, 300)
  } else {
    state.mapShow = true
    setTimeout(() => {
      state.animating = true
    }, 100)
  }
}

/**
 * @description 更新navBar underline的偏移量
 * @param {Boolean} animation 是否伴随动画
 */
function updateLineStyle(animation: boolean = true) {
  if (!state.inited) return
  const { lineWidth, lineHeight } = props
  getRect($item, true, proxy).then((rects) => {
    const lineStyle: CSSProperties = {}

    if (isDef(lineWidth)) {
      lineStyle.width = addUnit(lineWidth)
    }
    if (isDef(lineHeight)) {
      lineStyle.height = addUnit(lineHeight)
      lineStyle.borderRadius = `calc(${addUnit(lineHeight)} / 2)`
    }
    const rect = rects[state.activeIndex]
    let left = rects.slice(0, state.activeIndex).reduce((prev, curr) => prev + Number(curr.width), 0) + Number(rect.width) / 2
    lineStyle.transform = `translateX(${left}px) translateX(-50%)`
    if (animation) {
      lineStyle.transition = 'width 300ms ease, transform 300ms ease'
    }
    state.lineStyle = objToStyle(lineStyle)
  })
}
/**
 * @description 通过控制tab的active来展示选定的tab
 */
function setActiveTab() {
  if (!state.inited) return
  if (items.value[state.activeIndex].name !== props.modelValue) {
    emit('change', {
      index: state.activeIndex,
      name: items.value[state.activeIndex].name
    })
    emit('update:modelValue', items.value[state.activeIndex].name)
  }
}
/**
 * @description scroll-view滑动到active的tab_nav
 */
function scrollIntoView() {
  if (!state.inited) return
  Promise.all([getRect($item, true, proxy), getRect($container, false, proxy)]).then(([navItemsRects, navRect]) => {
    // 选中元素
    const selectItem = navItemsRects[state.activeIndex]
    // 选中元素之前的节点的宽度总和
    const offsetLeft = (navItemsRects as any).slice(0, state.activeIndex).reduce((prev: any, curr: any) => prev + curr.width, 0)
    // scroll-view滑动到selectItem的偏移量
    const left = offsetLeft - ((navRect as any).width - Number(selectItem.width)) / 2
    if (left === state.scrollLeft) {
      state.scrollLeft = left + Math.random() / 10000
    } else {
      state.scrollLeft = left
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
  state.mapShow && toggleMap()
  setActive(index)
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
    if (deltaX.value > 0 && state.activeIndex !== 0) {
      setActive(state.activeIndex - 1)
    } else if (deltaX.value < 0 && state.activeIndex !== items.value.length - 1) {
      setActive(state.activeIndex + 1)
      setActive(state.activeIndex + 1)
    }
  }
}
function getActiveIndex(value: number | string) {
  // name代表的索引超过了items的边界，自动用0兜底
  if (isNumber(value) && value >= items.value.length) {
    // eslint-disable-next-line prettier/prettier
    console.error('[wot design] warning(wd-tabs): the type of tabs\' value is Number shouldn\'t be less than its children')
    value = 0
  }
  // 如果是字符串直接匹配，匹配不到用0兜底
  if (isString(value)) {
    const index = items.value.findIndex((item) => item.name === value)
    value = index === -1 ? 0 : index
  }

  return value
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
