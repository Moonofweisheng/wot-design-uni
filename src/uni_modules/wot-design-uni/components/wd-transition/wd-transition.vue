<template>
  <view v-if="inited" :class="'wd-transition custom-class ' + classes" :style="style" @transitionend="onTransitionEnd">
    <slot />
  </view>
</template>
<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { isObj } from '../common/util'

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

type TransitionName =
  | 'fade'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'zoom-in'
  | 'zoom-out'

interface Props {
  show: boolean
  duration?: Record<string, number> | number
  name: TransitionName
  customStyle: string
  lazyRender: boolean
  // 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
  enterClass?: string
  // 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
  enterActiveClass?: string
  // 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。
  enterToClass?: string
  // 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
  leaveClass?: string
  // 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
  leaveActiveClass?: string
  // 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。
  leaveToClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  name: 'fade',
  duration: 300,
  lazyRender: true
})

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

const emit = defineEmits(['click', 'before-enter', 'enter', 'before-leave', 'leave', 'after-leave', 'after-enter'])

const style = computed(() => {
  return `-webkit-transition-duration:${currentDuration.value}ms;transition-duration:${currentDuration.value}ms;${
    display.value ? '' : 'display: none;'
  }${props.customStyle}`
})

onBeforeMount(() => {
  if (props.show) {
    enter()
  }
})

watch(
  () => props.show,
  (newVal) => {
    observerShow(newVal)
  }
)

function observerShow(value: boolean) {
  value ? enter() : leave()
}

function enter() {
  const classNames = getClassNames(props.name)
  const duration = isObj(props.duration) ? (props.duration as any).enter : props.duration
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
  const classNames = getClassNames(props.name)
  const duration = isObj(props.duration) ? (props.duration as any).leave : props.duration
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
  if (!props.show && display.value) {
    display.value = false
  }
}
</script>
<style lang="scss" scoped>
.wd-transition {
  transition-timing-function: ease;
}

.wd-fade-enter-active,
.wd-fade-leave-active {
  transition-property: opacity;
}

.wd-fade-enter,
.wd-fade-leave-to {
  opacity: 0;
}

.wd-fade-up-enter-active,
.wd-fade-up-leave-active,
.wd-fade-down-enter-active,
.wd-fade-down-leave-active,
.wd-fade-left-enter-active,
.wd-fade-left-leave-active,
.wd-fade-right-enter-active,
.wd-fade-right-enter-active {
  transition-property: opacity, transform;
}

.wd-fade-up-enter,
.wd-fade-up-leave-to {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}

.wd-fade-down-enter,
.wd-fade-down-leave-to {
  transform: translate3d(0, -100%, 0);
  opacity: 0;
}

.wd-fade-left-enter,
.wd-fade-left-leave-to {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}

.wd-fade-right-enter,
.wd-fade-right-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}

.wd-slide-up-enter-active,
.wd-slide-up-leave-active,
.wd-slide-down-enter-active,
.wd-slide-down-leave-active,
.wd-slide-left-enter-active,
.wd-slide-left-leave-active,
.wd-slide-right-enter-active,
.wd-slide-right-enter-active {
  transition-property: transform;
}

.wd-slide-up-enter,
.wd-slide-up-leave-to {
  transform: translate3d(0, 100%, 0);
}

.wd-slide-down-enter,
.wd-slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}

.wd-slide-left-enter,
.wd-slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.wd-slide-right-enter,
.wd-slide-right-leave-to {
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
  transform: scale(0.7);
}
</style>
