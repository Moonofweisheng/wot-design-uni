<template>
  <wd-modal
    v-if="modal"
    :show="modelValue"
    :z-index="zIndex"
    :duration="duration"
    :custom-style="modalStyle"
    @click="handleClickModal"
    @touchmove="noop"
  />
  <view v-if="!lazyRender || inited" :class="rootClass" :style="style" @transitionend="onTransitionEnd">
    <slot />
    <wd-icon v-if="closable" class="wd-popup__close" name="add" @click="close" />
  </view>
</template>
<script lang="ts">
export default {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
  options: {
    virtualHost: true
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { isObj } from '../common/util'

interface Props {
  transition: string
  closable: boolean
  position: string
  closeOnClickModal: boolean
  duration: number | boolean
  modal: boolean
  zIndex: number
  hideWhenClose: boolean
  modalStyle: string
  safeAreaInsetBottom: boolean
  modelValue: boolean
  customStyle: string
  lazyRender: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'center',
  closeOnClickModal: true,
  modal: true,
  closable: false,
  duration: 300,
  zIndex: 10,
  hideWhenClose: true,
  lazyRender: true,
  safeAreaInsetBottom: false,
  modelValue: false
})

const getClassNames = (name) => {
  if (!name) {
    return {
      enter: 'enter-class enter-active-class',
      'enter-to': 'enter-to-class enter-active-class',
      leave: 'leave-class leave-active-class',
      'leave-to': 'leave-to-class leave-active-class'
    }
  }

  return {
    enter: `wd-${name}-enter wd-${name}-enter-active`,
    'enter-to': `wd-${name}-enter-to wd-${name}-enter-active`,
    leave: `wd-${name}-leave wd-${name}-leave-active`,
    'leave-to': `wd-${name}-leave-to wd-${name}-leave-active`
  }
}

const requestAnimationFrame = (cb = () => void 0) => {
  return new Promise((resolve, reject) => {
    uni
      .createSelectorQuery()
      .selectViewport()
      .boundingClientRect()
      .exec(() => {
        resolve(true)
        cb()
      })
  })
}

// 初始化是否完成
const inited = ref<boolean>(false)
// 是否显示
const display = ref<boolean>(false)
// 当前动画状态
const status = ref<string>('')
// 动画是否结束
const transitionEnded = ref<boolean>(false)
// 动画持续时间
const currentDuration = ref<number>(300)
// 类名
const classes = ref<string>('')

const safeBottom = ref<number>(0)

const name = ref<string>('') // 动画名

const emit = defineEmits([
  'update:modelValue',
  'click',
  'before-enter',
  'enter',
  'before-leave',
  'leave',
  'after-leave',
  'after-enter',
  'clickmodal',
  'close'
])

const style = computed(() => {
  return `z-index: ${props.zIndex}; padding-bottom: ${safeBottom.value}px; -webkit-transition-duration: ${
    currentDuration.value
  }ms; transition-duration: ${currentDuration.value}ms; ${display.value || !props.hideWhenClose ? '' : 'display: none;'} ${props.customStyle}`
})

const rootClass = computed(() => {
  return `wd-popup wd-popup--${props.position} ${props.customClass || ''} ${classes.value || ''}`
})

onBeforeMount(() => {
  if (props.modelValue) {
    enter()
  }
})

watch(
  () => props.modelValue,
  (newVal) => {
    observermodelValue(newVal)
  },
  { deep: true, immediate: true }
)

function observermodelValue(value: boolean) {
  value ? enter() : leave()
}

function enter() {
  const classNames = getClassNames(props.transition || props.position)
  const duration = props.transition === 'none' ? 0 : isObj(props.duration) ? (props.duration as any).enter : props.duration
  status.value = 'enter'
  emit('before-enter')

  requestAnimationFrame(() => {
    emit('enter')
    classes.value = classNames.enter
    currentDuration.value = duration
    requestAnimationFrame(() => {
      inited.value = true
      display.value = true
      requestAnimationFrame(() => {
        transitionEnded.value = false
        classes.value = classNames['enter-to']
      })
    })
  })
}
function leave() {
  if (!display.value) return
  const classNames = getClassNames(props.transition || props.position)
  const duration = props.transition === 'none' ? 0 : isObj(props.duration) ? (props.duration as any).leave : props.duration
  status.value = 'leave'
  emit('before-leave')

  requestAnimationFrame(() => {
    emit('leave')
    classes.value = classNames.leave
    currentDuration.value = duration

    requestAnimationFrame(() => {
      transitionEnded.value = false
      setTimeout(() => onTransitionEnd(), currentDuration.value)
      classes.value = classNames['leave-to']
    })
  })
}

function onTransitionEnd() {
  if (transitionEnded.value) return

  transitionEnded.value = true
  if (status.value === 'leave') {
    // 离开后触发
    emit('after-leave')
  } else if (status.value === 'enter') {
    // 进入后触发
    emit('after-enter')
  }
  if (!props.modelValue && display.value) {
    display.value = false
  }
}

function handleClickModal() {
  emit('clickmodal')
  if (props.closeOnClickModal) {
    close()
  }
}

function close() {
  emit('close')
  emit('update:modelValue', false)
}
function noop() {}
</script>
<style lang="scss" scoped>
@import './../common/abstracts/_mixin.scss';
@import './../common/abstracts/variable.scss';
@import '../wd-modal/index.scss';

@include b(popup) {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  background: #fff;

  @include e(close) {
    position: absolute;
    top: 10px;
    right: 10px;
    color: $-popup-close-color;
    font-size: $-popup-close-size;
    transform: rotate(-45deg);
  }
  @include m(center) {
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  @include m(left) {
    top: 0;
    bottom: 0;
    left: 0;
  }
  @include m(right) {
    top: 0;
    right: 0;
    bottom: 0;
  }
  @include m(top) {
    top: 0;
    left: 0;
    right: 0;
  }
  @include m(bottom) {
    right: 0;
    bottom: 0;
    left: 0;
  }
}

.wd-center-enter-active,
.wd-center-leave-active {
  transition-property: opacity;
}

.wd-center-enter,
.wd-center-leave-to {
  opacity: 0;
}

.wd-top-enter-active,
.wd-top-leave-active,
.wd-bottom-enter-active,
.wd-bottom-leave-active,
.wd-left-enter-active,
.wd-left-leave-active,
.wd-right-enter-active,
.wd-right-enter-active {
  transition-property: transform;
}

.wd-top-enter,
.wd-top-leave-to {
  transform: translate3d(0, -100%, 0);
}

.wd-bottom-enter,
.wd-bottom-leave-to {
  transform: translate3d(0, 100%, 0);
}

.wd-left-enter,
.wd-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.wd-right-enter,
.wd-right-leave-to {
  transform: translate3d(100%, 0, 0);
}

.wd-zoom-in-enter-active,
.wd-zoom-in-leave-active {
  transition-property: opacity, transform;
  transform-origin: center center;
}

.wd-zoom-in-enter,
.wd-zoom-in-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
</style>
