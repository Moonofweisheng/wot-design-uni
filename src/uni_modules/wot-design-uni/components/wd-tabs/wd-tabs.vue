<template>
  <template v-if="sticky">
    <wd-sticky-box>
      <view
        :class="`wd-tabs ${customClass} ${innerSlidable ? 'is-slide' : ''} ${mapNum < children.length && mapNum !== 0 ? 'is-map' : ''}`"
        :style="customStyle"
      >
        <wd-sticky :offset-top="offsetTop">
          <view class="wd-tabs__nav wd-tabs__nav--sticky">
            <view class="wd-tabs__nav--wrap">
              <scroll-view :scroll-x="innerSlidable" scroll-with-animation :scroll-left="state.scrollLeft">
                <view class="wd-tabs__nav-container">
                  <view
                    @click="handleSelect(index)"
                    v-for="(item, index) in children"
                    :key="index"
                    :class="`wd-tabs__nav-item  ${state.activeIndex === index ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''}`"
                    :style="state.activeIndex === index ? (color ? 'color:' + color : '') : inactiveColor ? 'color:' + inactiveColor : ''"
                  >
                    <wd-badge v-if="item.badgeProps" v-bind="item.badgeProps">
                      <text class="wd-tabs__nav-item-text">{{ item.title }}</text>
                    </wd-badge>
                    <text v-else class="wd-tabs__nav-item-text">{{ item.title }}</text>

                    <view class="wd-tabs__line wd-tabs__line--inner" v-if="state.activeIndex === index && state.useInnerLine"></view>
                  </view>
                  <view class="wd-tabs__line" :style="state.lineStyle"></view>
                </view>
              </scroll-view>
            </view>
            <view class="wd-tabs__map" v-if="mapNum < children.length && mapNum !== 0">
              <view :class="`wd-tabs__map-btn  ${state.animating ? 'is-open' : ''}`" @click="toggleMap">
                <view :class="`wd-tabs__map-arrow  ${state.animating ? 'is-open' : ''}`">
                  <wd-icon name="arrow-down" />
                </view>
              </view>
              <view class="wd-tabs__map-header" :style="`${state.mapShow ? '' : 'display:none;'}  ${state.animating ? 'opacity:1;' : ''}`">
                {{ mapTitle || translate('all') }}
              </view>
              <view :class="`wd-tabs__map-body  ${state.animating ? 'is-open' : ''}`" :style="state.mapShow ? '' : 'display:none'">
                <view class="wd-tabs__map-nav-item" v-for="(item, index) in children" :key="index" @click="handleSelect(index)">
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

        <view class="wd-tabs__container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
          <view :class="['wd-tabs__body', animated ? 'is-animated' : '']" :style="bodyStyle">
            <slot />
          </view>
        </view>

        <view
          class="wd-tabs__mask"
          :style="`${state.mapShow ? '' : 'display:none;'} ${state.animating ? 'opacity:1;' : ''}`"
          @click="toggleMap"
        ></view>
      </view>
    </wd-sticky-box>
  </template>

  <template v-else>
    <view :class="`wd-tabs ${customClass} ${innerSlidable ? 'is-slide' : ''} ${mapNum < children.length && mapNum !== 0 ? 'is-map' : ''}`">
      <view class="wd-tabs__nav">
        <view class="wd-tabs__nav--wrap">
          <scroll-view :scroll-x="innerSlidable" scroll-with-animation :scroll-left="state.scrollLeft">
            <view class="wd-tabs__nav-container">
              <view
                v-for="(item, index) in children"
                @click="handleSelect(index)"
                :key="index"
                :class="`wd-tabs__nav-item ${state.activeIndex === index ? 'is-active' : ''} ${item.disabled ? 'is-disabled' : ''}`"
                :style="state.activeIndex === index ? (color ? 'color:' + color : '') : inactiveColor ? 'color:' + inactiveColor : ''"
              >
                <wd-badge custom-class="wd-tabs__nav-item-badge" v-if="item.badgeProps" v-bind="item.badgeProps">
                  <text class="wd-tabs__nav-item-text">{{ item.title }}</text>
                </wd-badge>
                <text v-else class="wd-tabs__nav-item-text">{{ item.title }}</text>
                <view class="wd-tabs__line wd-tabs__line--inner" v-if="state.activeIndex === index && state.useInnerLine"></view>
              </view>
              <view class="wd-tabs__line" :style="state.lineStyle"></view>
            </view>
          </scroll-view>
        </view>
        <view class="wd-tabs__map" v-if="mapNum < children.length && mapNum !== 0">
          <view class="wd-tabs__map-btn" @click="toggleMap">
            <view :class="`wd-tabs__map-arrow ${state.animating ? 'is-open' : ''}`">
              <wd-icon name="arrow-down" />
            </view>
          </view>
          <view class="wd-tabs__map-header" :style="`${state.mapShow ? '' : 'display:none;'}  ${state.animating ? 'opacity:1;' : ''}`">
            {{ mapTitle || translate('all') }}
          </view>
          <view :class="`wd-tabs__map-body ${state.animating ? 'is-open' : ''}`" :style="state.mapShow ? '' : 'display:none'">
            <view class="wd-tabs__map-nav-item" v-for="(item, index) in children" :key="index" @click="handleSelect(index)">
              <view :class="`wd-tabs__map-nav-btn ${state.activeIndex === index ? 'is-active' : ''}  ${item.disabled ? 'is-disabled' : ''}`">
                {{ item.title }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="wd-tabs__container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
        <view :class="['wd-tabs__body', animated ? 'is-animated' : '']" :style="bodyStyle">
          <slot />
        </view>
      </view>

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
import wdIcon from '../wd-icon/wd-icon.vue'
import wdSticky from '../wd-sticky/wd-sticky.vue'
import wdStickyBox from '../wd-sticky-box/wd-sticky-box.vue'
import { computed, getCurrentInstance, onMounted, watch, nextTick, reactive, type CSSProperties, type ComponentInstance } from 'vue'
import { addUnit, checkNumRange, debounce, getRect, isDef, isNumber, isString, objToStyle } from '../common/util'
import { useTouch } from '../composables/useTouch'
import { TABS_KEY, tabsProps, type TabsExpose } from './types'
import { useChildren } from '../composables/useChildren'
import { useTranslate } from '../composables/useTranslate'

const $item = '.wd-tabs__nav-item'
const $itemText = '.wd-tabs__nav-item-text'
const $container = '.wd-tabs__nav-container'

const props = defineProps(tabsProps)
const emit = defineEmits(['change', 'disabled', 'click', 'update:modelValue'])

const { translate } = useTranslate('tabs')

const state = reactive({
  activeIndex: 0, // 选中值的索引，默认第一个
  lineStyle: 'display:none;', // 激活项边框线样式
  useInnerLine: false, // 是否使用内部激活项边框线，当外部激活下划线未成功渲染时显示内部定位的
  inited: false, // 是否初始化
  animating: false, // 是否动画中
  mapShow: false, // map的开关
  scrollLeft: 0 // scroll-view偏移量
})

const { children, linkChildren } = useChildren(TABS_KEY)
linkChildren({ state, props })

const { proxy } = getCurrentInstance() as any

const touch = useTouch()

const innerSlidable = computed(() => {
  return props.slidable === 'always' || children.length > props.slidableNum
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

const getTabName = (tab: ComponentInstance<any>, index: number) => {
  return isDef(tab.name) ? tab.name : index
}

/**
 * 更新激活项
 * @param value 激活值
 * @param init 是否已初始化
 * @param setScroll // 是否设置scroll-view滚动
 */
const updateActive = (value: number | string = 0, init: boolean = false, setScroll: boolean = true) => {
  // 没有tab子元素，不执行任何操作
  if (children.length === 0) return

  value = getActiveIndex(value)
  // 被禁用，不执行任何操作
  if (children[value].disabled) return
  state.activeIndex = value
  if (setScroll) {
    updateLineStyle(init === false)
    scrollIntoView()
  }
  setActiveTab()
}

/**
 * @description 修改选中的tab Index
 * @param {String |Number } value - radio绑定的value或者tab索引，默认值0
 * @param {Boolean } init - 是否伴随初始化操作
 */
const setActive = debounce(updateActive, 100, { leading: true })

watch(
  () => props.modelValue,
  (newValue) => {
    if (!isNumber(newValue) && !isString(newValue)) {
      console.error('[wot ui] error(wd-tabs): the type of value should be number or string')
    }
    // 保证不为非空字符串，小于0的数字
    if (newValue === '' || !isDef(newValue)) {
      // eslint-disable-next-line quotes
      console.error("[wot ui] error(wd-tabs): tabs's value cannot be '' null or undefined")
    }
    if (typeof newValue === 'number' && newValue < 0) {
      // eslint-disable-next-line quotes
      console.error("[wot ui] error(wd-tabs): tabs's value cannot be less than zero")
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
    updateActive(props.modelValue, true)
    state.useInnerLine = true
  })
})

function toggleMap() {
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
 * 更新 underline的偏移量
 * @param animation 是否开启动画
 */
async function updateLineStyle(animation: boolean = true) {
  if (!state.inited) return
  const { autoLineWidth, lineWidth, lineHeight } = props
  try {
    const lineStyle: CSSProperties = {}
    if (isDef(lineWidth)) {
      lineStyle.width = addUnit(lineWidth)
    } else {
      if (autoLineWidth) {
        const textRects = await getRect($itemText, true, proxy)
        const textWidth = Number(textRects[state.activeIndex].width)
        lineStyle.width = addUnit(textWidth)
      }
    }
    if (isDef(lineHeight)) {
      lineStyle.height = addUnit(lineHeight)
      lineStyle.borderRadius = `calc(${addUnit(lineHeight)} / 2)`
    }
    const rects = await getRect($item, true, proxy)
    const rect = rects[state.activeIndex]
    let left = rects.slice(0, state.activeIndex).reduce((prev, curr) => prev + Number(curr.width), 0) + Number(rect.width) / 2
    if (left) {
      lineStyle.transform = `translateX(${left}px) translateX(-50%)`
      if (animation) {
        lineStyle.transition = 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);'
      }
      state.useInnerLine = false
      state.lineStyle = objToStyle(lineStyle)
    }
  } catch (error) {
    console.error('[wot ui] error(wd-tabs): update line style failed', error)
  }
}

function setActiveTab() {
  if (!state.inited) return
  const name = getTabName(children[state.activeIndex], state.activeIndex)
  if (name !== props.modelValue) {
    emit('change', {
      index: state.activeIndex,
      name: name
    })
    emit('update:modelValue', name)
  }
}

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
  const { disabled } = children[index]
  const name = getTabName(children[index], index)

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
    } else if (deltaX.value < 0 && state.activeIndex !== children.length - 1) {
      setActive(state.activeIndex + 1)
    }
  }
}
function getActiveIndex(value: number | string) {
  // name代表的索引超过了children长度的边界，自动用0兜底
  if (isNumber(value) && value >= children.length) {
    // eslint-disable-next-line prettier/prettier
    console.error('[wot ui] warning(wd-tabs): the type of tabs\' value is Number shouldn\'t be less than its children')
    value = 0
  }
  // 如果是字符串直接匹配，匹配不到用0兜底
  if (isString(value)) {
    const index = children.findIndex((item) => item.name === value)
    value = index === -1 ? 0 : index
  }

  return value
}

defineExpose<TabsExpose>({
  setActive,
  scrollIntoView,
  updateLineStyle
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
