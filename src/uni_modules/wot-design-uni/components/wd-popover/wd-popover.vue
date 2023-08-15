<template>
  <view :class="`wd-popover ${customClass}`" id="popover" @click.stop="popover.noop">
    <!-- TODO 插槽情况监听会有问题 待调整， 用于为渲染获取宽高的元素 -->
    <view class="wd-popover__pos wd-popover__hidden" id="pos">
      <view :class="`wd-popover__container ${customPop}`">
        <view v-if="!useContentSlot && mode === 'normal'" class="wd-popover__inner">
          {{ content }}
        </view>
        <view v-if="!useContentSlot && mode === 'menu' && typeof content === 'object'" class="wd-popover__menu">
          <view v-for="(item, index) in content" :key="index" class="wd-popover__menu-inner" @click="menuClick(index)">
            <wd-icon v-if="item.iconClass" :name="item.iconClass" custom-class="wd-popover__icon" />
            <text>{{ item.content }}</text>
          </view>
        </view>
      </view>
    </view>
    <wd-transition :show="modelValue" name="fade" :duration="200">
      <view class="wd-popover__pos" :style="popover.popStyle.value">
        <view :class="`wd-popover__container ${customPop}`">
          <view
            v-if="props.visibleArrow"
            :class="`wd-popover__arrow ${popover.arrowClass.value} ${customArrow}`"
            :style="popover.arrowStyle.value"
          ></view>
          <!-- 普通模式 -->
          <view v-if="!useContentSlot && mode === 'normal'" class="wd-popover__inner">
            {{ content }}
          </view>
          <!-- 列表模式 -->
          <view v-if="!useContentSlot && mode === 'menu'" class="wd-popover__menu">
            <view
              v-for="(item, index) in content"
              :key="index"
              class="wd-popover__menu-inner"
              @click="menuClick(index)"
              :style="index === 0 ? 'border-top: none' : ''"
            >
              <wd-icon v-if="item.iconClass" :name="item.iconClass" custom-class="wd-popover__icon" />
              <view style="display: inline-block">{{ item.content }}</view>
            </view>
          </view>
          <!-- 用户自定义样式 -->
          <slot name="content" v-else />
        </view>
        <wd-icon v-if="showClose" name="close" custom-class="wd-popover__close-icon" @click="toggle"></wd-icon>
      </view>
    </wd-transition>
    <view @click="toggle" class="wd-popover__target" id="target">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-popover',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, watch } from 'vue'
import { usePopover } from '../mixins/usePopover'
import { closeOther, pushToQueue, removeFromQueue } from '../common/clickoutside'

type PlacementType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

type PopoverMode = 'menu' | 'normal'

interface Props {
  customArrow?: string
  customPop?: string
  customClass?: string
  // 是否显示 popover 箭头
  visibleArrow: boolean
  // 显示内容
  content: string | Record<string, any>[]
  placement: PlacementType
  offset: number
  useContentSlot: boolean
  disabled: boolean
  showClose: boolean
  modelValue: boolean
  mode: PopoverMode
}
const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customPop: '',
  customArrow: '',
  visibleArrow: true,
  placement: 'bottom',
  content: '',
  offset: 0,
  useContentSlot: false,
  disabled: false,
  showClose: false,
  modelValue: false,
  mode: 'normal'
})

const selector: string = 'popover'
const emit = defineEmits(['update:modelValue', 'menuclick', 'change', 'open', 'close'])
const { proxy } = getCurrentInstance() as any

watch(
  () => props.content,
  (newVal) => {
    const { mode } = props
    // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
    if (newVal === null || newVal === undefined) {
      // eslint-disable-next-line prettier/prettier
        throw Error('value can\'t be null or undefined')
    }
    if (selector === 'popover' && mode === 'normal' && typeof newVal !== 'string') {
      throw Error('The value type must be a string type in normal mode')
    } else if (selector === 'popover' && mode === 'menu' && popover.checkType(newVal) !== 'Array') {
      throw Error('The value type must be a Array type in menu mode')
    }
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      popover.control(props.placement, props.offset)
      closeOther(proxy)
    }
    popover.showStyle.value = newValue ? 'display: inline-block;' : 'display: none;'
    emit('change', { show: newValue })
    emit(`${newValue ? 'open' : 'close'}`)
  }
)

onMounted(() => {
  popover.init(props.placement, props.visibleArrow, selector)
})

onBeforeMount(() => {
  pushToQueue(proxy)
  popover.showStyle.value = props.modelValue ? 'opacity: 1;' : 'opacity: 0;'
})

onBeforeUnmount(() => {
  removeFromQueue(proxy)
})

const popover = usePopover()

function menuClick(index: number) {
  emit('update:modelValue', false)
  emit('menuclick', {
    item: props.content[index],
    index
  })
}

function toggle() {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}

function open() {
  emit('update:modelValue', true)
}

function close() {
  emit('update:modelValue', false)
}

defineExpose({
  open,
  close
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
