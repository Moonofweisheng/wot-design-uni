<template>
  <view :class="`wd-tooltip ${customClass}`" :style="customStyle" id="tooltip" @click.stop="popover.noop">
    <!-- 用于为渲染获取宽高的元素 -->
    <view class="wd-tooltip__pos wd-tooltip__hidden" id="pos">
      <view class="wd-tooltip__container custom-pop">
        <view v-if="!useContentSlot" class="wd-tooltip__inner">{{ content }}</view>
      </view>
    </view>
    <wd-transition :show="modelValue" name="fade">
      <view class="wd-tooltip__pos" :style="popover.popStyle.value">
        <view class="wd-tooltip__container custom-pop">
          <view v-if="visibleArrow" :class="`wd-tooltip__arrow ${popover.arrowClass.value} ${customArrow}`" :style="popover.arrowStyle.value"></view>
          <!-- 普通模式 -->
          <view v-if="!useContentSlot" class="wd-tooltip__inner">{{ content }}</view>
          <!-- 用户自定义样式 -->
          <slot name="content" v-else />
        </view>
        <wd-icon v-if="showClose" name="close" class="wd-tooltip__close-icon" @click="toggle"></wd-icon>
      </view>
    </wd-transition>
    <view @click="toggle" class="wd-tooltip__target" id="target">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-tooltip',
  options: {
    addGlobalClass: true,
    virtualHost: true,
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

interface Props {
  customStyle: string
  customArrow: string
  customPop: string
  customClass: string
  // 是否显示 popover 箭头
  visibleArrow: boolean
  // 显示内容
  content?: Record<string, any>[] | string
  placement: PlacementType
  offset: number
  useContentSlot: boolean
  disabled: boolean
  showClose: boolean
  modelValue: boolean
}
const props = withDefaults(defineProps<Props>(), {
  customStyle: '',
  customClass: '',
  customPop: '',
  customArrow: '',
  visibleArrow: true,
  placement: 'bottom',
  offset: 0,
  useContentSlot: false,
  disabled: false,
  showClose: false,
  modelValue: false
})

const popover = usePopover()

const selector: string = 'tooltip'
const emit = defineEmits(['update:modelValue', 'menuclick', 'change', 'open', 'close'])
const { proxy } = getCurrentInstance() as any

watch(
  () => props.content,
  (newVal) => {
    // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
    if (newVal === null || newVal === undefined) {
      // eslint-disable-next-line prettier/prettier
        throw Error('value can\'t be null or undefined')
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

function toggle(event) {
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
