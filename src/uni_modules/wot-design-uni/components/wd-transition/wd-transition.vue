<template>
  <view v-if="inited" :class="rootClass" :style="style" @transitionend="onTransitionEnd" @click="handleClick">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-transition',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { isObj, isPromise, requestAnimationFrame } from '../common/util'
import { transitionProps } from './types'
import { AbortablePromise } from '../common/AbortablePromise'

const getClassNames = (name?: string) => {
  if (!name) {
    return {
      enter: `${props.enterClass} ${props.enterActiveClass}`,
      'enter-to': `${props.enterToClass} ${props.enterActiveClass}`,
      leave: `${props.leaveClass} ${props.leaveActiveClass}`,
      'leave-to': `${props.leaveToClass} ${props.leaveActiveClass}`
    }
  }

  return {
    enter: `wd-${name}-enter wd-${name}-enter-active`,
    'enter-to': `wd-${name}-enter-to wd-${name}-enter-active`,
    leave: `wd-${name}-leave wd-${name}-leave-active`,
    'leave-to': `wd-${name}-leave-to wd-${name}-leave-active`
  }
}

const props = defineProps(transitionProps)
const emit = defineEmits(['click', 'before-enter', 'enter', 'before-leave', 'leave', 'after-leave', 'after-enter'])

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
// 用于控制enter和leave的顺序执行
const enterPromise = ref<AbortablePromise<void> | null>(null)

// 动画进入的生命周期
const enterLifeCyclePromises = ref<AbortablePromise<unknown> | null>(null)

// 动画离开的生命周期
const leaveLifeCyclePromises = ref<AbortablePromise<unknown> | null>(null)

const style = computed(() => {
  return `-webkit-transition-duration:${currentDuration.value}ms;transition-duration:${currentDuration.value}ms;${
    display.value ? '' : 'display: none;'
  }${props.customStyle}`
})

const rootClass = computed(() => {
  return `wd-transition ${props.customClass}  ${classes.value}`
})

onBeforeMount(() => {
  if (props.show) {
    enter()
  }
})

watch(
  () => props.show,
  (newVal) => {
    handleShow(newVal)
  },
  { deep: true }
)

function handleClick() {
  emit('click')
}

function handleShow(value: boolean) {
  if (value) {
    handleAbortPromise()
    enter()
  } else {
    leave()
  }
}
/**
 * 取消所有的promise
 */
function handleAbortPromise() {
  isPromise(enterPromise.value) && enterPromise.value.abort()
  isPromise(enterLifeCyclePromises.value) && enterLifeCyclePromises.value.abort()
  isPromise(leaveLifeCyclePromises.value) && leaveLifeCyclePromises.value.abort()
  enterPromise.value = null
  enterLifeCyclePromises.value = null
  leaveLifeCyclePromises.value = null
}

function enter() {
  enterPromise.value = new AbortablePromise(async (resolve) => {
    try {
      const classNames = getClassNames(props.name)
      const duration = isObj(props.duration) ? (props.duration as any).enter : props.duration
      status.value = 'enter'
      emit('before-enter')
      enterLifeCyclePromises.value = requestAnimationFrame()
      await enterLifeCyclePromises.value
      emit('enter')
      classes.value = classNames.enter
      currentDuration.value = duration
      enterLifeCyclePromises.value = requestAnimationFrame()
      await enterLifeCyclePromises.value
      inited.value = true
      display.value = true
      enterLifeCyclePromises.value = requestAnimationFrame()
      await enterLifeCyclePromises.value
      enterLifeCyclePromises.value = null
      transitionEnded.value = false
      classes.value = classNames['enter-to']
      resolve()
    } catch (error) {
      /**
       *
       */
    }
  })
}
async function leave() {
  if (!enterPromise.value) {
    transitionEnded.value = false
    return onTransitionEnd()
  }
  try {
    await enterPromise.value
    if (!display.value) return
    const classNames = getClassNames(props.name)
    const duration = isObj(props.duration) ? (props.duration as any).leave : props.duration
    status.value = 'leave'
    emit('before-leave')
    currentDuration.value = duration
    leaveLifeCyclePromises.value = requestAnimationFrame()
    await leaveLifeCyclePromises.value
    emit('leave')
    classes.value = classNames.leave
    leaveLifeCyclePromises.value = requestAnimationFrame()
    await leaveLifeCyclePromises.value
    transitionEnded.value = false
    classes.value = classNames['leave-to']
    leaveLifeCyclePromises.value = setPromise(currentDuration.value)
    await leaveLifeCyclePromises.value
    leaveLifeCyclePromises.value = null
    onTransitionEnd()
    enterPromise.value = null
  } catch (error) {
    /**
     *
     */
  }
}

/**
 * 定时器promise化
 * @param duration 持续时间ms
 */
function setPromise(duration: number) {
  return new AbortablePromise<void>((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, duration)
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
@import './index.scss';
</style>
