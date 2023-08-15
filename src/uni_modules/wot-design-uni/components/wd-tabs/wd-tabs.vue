<template>
  <template v-if="sticky">
    <wd-sticky-box>
      <view
        :class="`wd-tabs ${customClass} ${slidableNum < items.length ? 'is-slide' : ''} ${mapNum < items.length && mapNum !== 0 ? 'is-map' : ''}`"
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
              <view class="wd-tabs__map-header" :style="`${mapShow ? '' : 'display:none;'}  ${animating ? 'opacity:1;' : ''}`">全部</view>
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
          <view class="wd-tabs__body">
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
          <view class="wd-tabs__map-header" :style="`${mapShow ? '' : 'display:none;'}  ${animating ? 'opacity:1;' : ''}`">全部</view>
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
        <view class="wd-tabs__body">
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
import { getCurrentInstance, onMounted, provide, ref, watch } from 'vue'
import { checkNumRange, debounce, getRect, getType } from '../common/util'
import { useTouch } from '../mixins/useTouch'

const $item = '.wd-tabs__nav-item'
const $container = '.wd-tabs__nav-container'

interface Props {
  customClass?: string
  // 绑定值
  modelValue: number
  // 标签数超过阈值可滑动
  slidableNum: number
  // 标签数超过阈值显示导航地图
  mapNum: number
  // 粘性布局
  sticky: boolean
  // 粘性布局吸顶位置
  offsetTop: number
  // 开启手势滑动
  swipeable: boolean
  // 底部条宽度，单位像素
  lineWidth: number
  // 底部条高度，单位像素
  lineHeight: number
  color?: string
  inactiveColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  modelValue: 0,
  slidableNum: 6,
  mapNum: 10,
  sticky: false,
  offsetTop: 0,
  swipeable: false,
  lineWidth: 19,
  lineHeight: 3
})

// 选中值的索引，默认第一个
const activeIndex = ref<number>(0)
// navBar的下划线样式
const lineStyle = ref<string>('')
// tabs数据
const items = ref<Record<string, any>[]>([])
// map的开关
const mapShow = ref<boolean>(false)
// 标签页偏移量
const bodyStyle = ref<string>('')
// scroll-view偏移量
const scrollLeft = ref<number>(0)

// 是否动画中
const animating = ref<boolean>(false)

const children: any[] = []

const inited = ref<boolean>(false)

const { proxy } = getCurrentInstance() as any

const touch = useTouch()

/**
 * @description 修改选中的tab Index
 * @param {String |Number } value - radio绑定的value或者tab索引，默认值0
 * @param {Boolean } init - 是否伴随初始化操作
 */
const setActive = debounce(function (value = 0, init = false) {
  // 没有tab子元素，不执行任何操作
  if (items.value.length === 0) return

  value = getActiveIndex(value)
  // 被禁用，不执行任何操作
  if (items.value[value].disabled) return
  activeIndex.value = value
  updateLineStyle(init === false)
  setActiveTab()
  scrollIntoView()
}, 100)

watch(
  () => props.modelValue,
  (newValue) => {
    if (getType(newValue) !== 'number' && getType(newValue) !== 'string') {
      console.error('[wot design] error(wd-tabs): the type of value should be number or string')
    }
    // 保证不为非空字符串，小于0的数字
    if ((newValue as any) === '' || newValue === undefined) {
      // eslint-disable-next-line quotes
      console.error("[wot design] error(wd-tabs): tabs's value cannot be null or undefined")
    }
    if (getType(newValue) === 'number' && newValue < 0) {
      // eslint-disable-next-line quotes
      console.error("[wot design] error(wd-tabs): tabs's value cannot be less than zero")
    }
    setActive && setActive(newValue)
  },
  {
    immediate: true,
    deep: true
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
  inited.value = true
  setActive(props.modelValue, true)
})

const emit = defineEmits(['change', 'disabled', 'click', 'update:modelValue'])

provide('tabs', {
  setActive,
  setChild,
  updateItems,
  children
})

/**
 * 设置子项
 * @param child
 */
function setChild(child) {
  const hasChild = children.findIndex((tab) => {
    return tab.$.uid === child.$.uid
  })
  if (hasChild <= -1) {
    children.push(child)
  } else {
    children[hasChild] = child
  }
  updateItems()

  // 提前设置好高亮的 tab，避免等到 mounted 时出现闪烁延迟问题
  if (getType(props.modelValue) === 'number' && props.modelValue >= items.value.length) {
    return
  }
  // 如果是字符串直接匹配，匹配不到用0兜底
  if (getType(props.modelValue) === 'string') {
    const index = items.value.findIndex((item) => item.name === props.modelValue)

    if (index === -1) return

    emit('update:modelValue', index)
  }
  children[props.modelValue].$.exposed.setShow(true, true)
}

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
 * @description 更新tab items
 */
function updateItems() {
  items.value = children.map((child) => {
    return { disabled: child.disabled, title: child.title, name: child.name }
  })
}
/**
 * @description 更新navBar underline的偏移量
 * @param {Boolean} animation 是否伴随动画
 */
function updateLineStyle(animation = true) {
  if (!inited.value) return
  // const { activeIndex, lineWidth, lineHeight, slidableNum, items } = this.data
  const { lineWidth, lineHeight } = props
  getRect($item, true, proxy).then((rects: any) => {
    const rect = rects[activeIndex.value]
    // const width = lineWidth || (slidableNum < items.length ? rect.width : (rect.width - 14))
    const width = lineWidth
    let left = rects.slice(0, activeIndex.value).reduce((prev, curr) => prev + curr.width, 0)
    left += (rect.width - width) / 2
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
 * @description 通过控制tab的active来展示选定的tab
 */
function setActiveTab() {
  if (!inited.value) return
  children.forEach((child, index) => {
    child.$.exposed.setShow(child.$.exposed.painted.value || index === activeIndex.value, index === activeIndex.value)
  })

  emit('change', {
    index: activeIndex.value,
    name: items.value[activeIndex.value].name
  })
  emit('update:modelValue', activeIndex.value)
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
    const offsetLeft = (navItemsRects as any).slice(0, activeIndex.value).reduce((prev, curr) => prev + curr.width, 0)
    // scroll-view滑动到selectItem的偏移量
    scrollLeft.value = offsetLeft - ((navRect as any).width - selectItem.width) / 2
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
function onTouchStart(event) {
  if (!props.swipeable) return
  touch.touchStart(event)
}
function onTouchMove(event) {
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
      setActive(activeIndex.value + 1)
    }
  }
}
function getActiveIndex(value) {
  // name代表的索引超过了items的边界，自动用0兜底
  if (getType(value) === 'number' && value >= items.value.length) {
    // eslint-disable-next-line prettier/prettier
    console.warn('[wot design] warning(wd-tabs): the type of tabs\' value is Number shouldn\'t be less than its children')
    value = 0
  }
  // 如果是字符串直接匹配，匹配不到用0兜底
  if (getType(value) === 'string') {
    const index = items.value.findIndex((item) => item.name === value)
    value = index === -1 ? 0 : index
  }

  return value
}

defineExpose({
  setActive,
  updateItems,
  scrollIntoView,
  updateLineStyle,
  children
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
