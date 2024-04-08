<template>
  <view :class="`wd-popover ${customClass}`" :style="customStyle" id="popover" @click.stop="popover.noop">
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
    <wd-transition custom-class="wd-popover__pos" :custom-style="popover.popStyle.value" :show="modelValue" name="fade" :duration="200">
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
            <wd-icon v-if="typeof item === 'object' && item.iconClass" :name="item.iconClass" custom-class="wd-popover__icon" />
            <view style="display: inline-block">{{ typeof item === 'object' && item.content ? item.content : '' }}</view>
          </view>
        </view>
        <!-- 用户自定义样式 -->
        <slot name="content" v-else />
      </view>
      <wd-icon v-if="showClose" name="close" custom-class="wd-popover__close-icon" @click="toggle"></wd-icon>
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
import { getCurrentInstance, inject, onBeforeMount, onBeforeUnmount, onMounted, watch } from 'vue'
import { usePopover } from '../composables/usePopover'
import { closeOther, pushToQueue, removeFromQueue } from '../common/clickoutside'
import { type Queue, queueKey } from '../composables/useQueue'
import { popoverProps, type PopoverExpose } from './types'
import { isArray } from '../common/util'

const props = defineProps(popoverProps)
const emit = defineEmits(['update:modelValue', 'menuclick', 'change', 'open', 'close'])

const queue = inject<Queue | null>(queueKey, null)

const selector: string = 'popover'
const { proxy } = getCurrentInstance() as any

watch(
  () => props.content,
  (newVal) => {
    const { mode } = props
    if (selector === 'popover' && mode === 'normal' && typeof newVal !== 'string') {
      console.error('The value type must be a string type in normal mode')
    } else if (selector === 'popover' && mode === 'menu' && !isArray(newVal)) {
      console.error('The value type must be a Array type in menu mode')
    }
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      popover.control(props.placement, props.offset)
      if (queue && queue.closeOther) {
        queue.closeOther(proxy)
      } else {
        closeOther(proxy)
      }
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
  if (queue && queue.pushToQueue) {
    queue.pushToQueue(proxy)
  } else {
    pushToQueue(proxy)
  }
  popover.showStyle.value = props.modelValue ? 'opacity: 1;' : 'opacity: 0;'
})

onBeforeUnmount(() => {
  if (queue && queue.removeFromQueue) {
    queue.removeFromQueue(proxy)
  } else {
    removeFromQueue(proxy)
  }
})

const popover = usePopover()

function menuClick(index: number) {
  emit('update:modelValue', false)
  emit('menuclick', {
    item: (props.content as Array<Record<string, any>>)[index],
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

defineExpose<PopoverExpose>({
  open,
  close
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
