<template>
  <view :class="`wd-circle ${customClass}`" :style="customStyle">
    <!-- #ifdef MP-WEIXIN -->
    <canvas :style="canvasStyle" :id="canvasId" :canvas-id="canvasId" type="2d"></canvas>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <canvas :width="canvasSize" :height="canvasSize" :style="canvasStyle" :id="canvasId" :canvas-id="canvasId"></canvas>
    <!-- #endif -->

    <view v-if="!text" class="wd-circle__text">
      <!-- 自定义提示内容 -->
      <slot></slot>
    </view>

    <text v-else class="wd-circle__text">
      {{ text }}
    </text>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-circle',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { addUnit, isObj, objToStyle, uuid } from '../common/util'
import { circleProps } from './types'
import { canvas2dAdapter } from '../common/canvasHelper'

// 大于等于0且小于等于100
function format(rate: number) {
  return Math.min(Math.max(rate, 0), 100)
}
// 结束角度
const PERIMETER = 2 * Math.PI
// 开始角度
const BEGIN_ANGLE = -Math.PI / 2
const STEP = 1

const props = defineProps(circleProps)

const progressColor = ref<string | CanvasGradient>('') // 进度条颜色

const currentValue = ref<number>(0) // 当前值
const interval = ref<any>(null) // 定时器
const pixelRatio = ref<number>(1) // 像素比
const canvasId = ref<string>(`wd-circle${uuid()}`) // canvasId
let ctx: UniApp.CanvasContext | null = null

// canvas渲染大小
const canvasSize = computed(() => {
  let size = props.size
  // #ifdef MP-ALIPAY
  size = size * pixelRatio.value
  // #endif

  return size
})

// 进度条宽度
const sWidth = computed(() => {
  let sWidth = props.strokeWidth
  // #ifdef MP-ALIPAY
  sWidth = sWidth * pixelRatio.value
  // #endif
  return sWidth
})

// Circle 样式
const canvasStyle = computed(() => {
  const style = {
    width: addUnit(props.size),
    height: addUnit(props.size)
  }
  return `${objToStyle(style)};`
})

// 监听目标数值变化
watch(
  () => props.modelValue,
  () => {
    reRender()
  },
  { immediate: true }
)

// 监听Circle大小变化
watch(
  () => props.size,
  () => {
    let timer = setTimeout(() => {
      drawCircle(currentValue.value)
      clearTimeout(timer)
    }, 50)
  },
  { immediate: false }
)

// 监听进度条颜色变化
watch(
  () => props.color,
  () => {
    drawCircle(currentValue.value)
  },
  { immediate: false, deep: true }
)

onBeforeMount(() => {
  pixelRatio.value = uni.getSystemInfoSync().pixelRatio
})

onMounted(() => {
  currentValue.value = props.modelValue
  drawCircle(currentValue.value)
})

onUnmounted(() => {
  clearTimeInterval()
})

const { proxy } = getCurrentInstance() as any
/**
 * 获取canvas上下文
 */
function getContext() {
  return new Promise<UniApp.CanvasContext>((resolve) => {
    if (ctx) {
      return resolve(ctx)
    }
    // #ifndef MP-WEIXIN
    ctx = uni.createCanvasContext(canvasId.value, proxy)
    resolve(ctx)
    // #endif
    // #ifdef MP-WEIXIN
    uni
      .createSelectorQuery()
      .in(proxy)
      .select(`#${canvasId.value}`)
      .node((res) => {
        if (res && res.node) {
          const canvas = res.node
          ctx = canvas2dAdapter(canvas.getContext('2d') as CanvasRenderingContext2D)
          canvas.width = props.size * pixelRatio.value
          canvas.height = props.size * pixelRatio.value
          ctx.scale(pixelRatio.value, pixelRatio.value)
          resolve(ctx)
        }
      })
      .exec()
    // #endif
  })
}

/**
 * 设置canvas
 */
function presetCanvas(context: any, strokeStyle: string | CanvasGradient, beginAngle: number, endAngle: number, fill?: string) {
  let width = sWidth.value
  const position = canvasSize.value / 2
  if (!fill) {
    width = width / 2
  }
  const radius = position - width / 2
  context.strokeStyle = strokeStyle
  context.setStrokeStyle(strokeStyle)
  context.setLineWidth(width)
  context.setLineCap(props.strokeLinecap)

  context.beginPath()
  context.arc(position, position, radius, beginAngle, endAngle, !props.clockwise)
  context.stroke()
  if (fill) {
    context.setLineWidth(width)
    context.setFillStyle(fill)
    context.fill()
  }
}
/**
 * 渲染管道
 */
function renderLayerCircle(context: UniApp.CanvasContext) {
  presetCanvas(context, props.layerColor, 0, PERIMETER, props.fill)
}

/**
 * 渲染进度条
 */
function renderHoverCircle(context: UniApp.CanvasContext, formatValue: number) {
  // 结束角度
  const progress = PERIMETER * (formatValue / 100)
  const endAngle = props.clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress)

  // 设置进度条颜色
  if (isObj(props.color)) {
    const LinearColor = context.createLinearGradient(canvasSize.value, 0, 0, 0)
    Object.keys(props.color)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, (props.color as Record<string, any>)[key]))
    progressColor.value = LinearColor
  } else {
    progressColor.value = props.color
  }
  presetCanvas(context, progressColor.value, BEGIN_ANGLE, endAngle)
}

/**
 * 渲染圆点
 * 进度值为0时渲染一个圆点
 */
function renderDot(context: UniApp.CanvasContext) {
  const strokeWidth = sWidth.value // 管道宽度=小圆点直径
  const position = canvasSize.value / 2 // 坐标
  // 设置进度条颜色
  if (isObj(props.color)) {
    const LinearColor = context.createLinearGradient(canvasSize.value, 0, 0, 0)
    Object.keys(props.color)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, (props.color as Record<string, any>)[key]))
    progressColor.value = LinearColor
  } else {
    progressColor.value = props.color
  }
  context.beginPath()
  context.arc(position, strokeWidth / 4, strokeWidth / 4, 0, PERIMETER)
  context.setFillStyle(progressColor.value)
  context.fill()
}

/**
 * 画圆
 */
function drawCircle(currentValue: number) {
  getContext().then((context) => {
    context.clearRect(0, 0, canvasSize.value, canvasSize.value)
    renderLayerCircle(context)

    const formatValue = format(currentValue)
    if (formatValue !== 0) {
      renderHoverCircle(context, formatValue)
    } else {
      renderDot(context)
    }
    context.draw()
  })
}

/**
 * Circle组件渲染
 * 当前进度值变化时重新渲染Circle组件
 */
function reRender() {
  // 动画通过定时器渲染
  if (props.speed <= 0 || props.speed > 1000) {
    drawCircle(props.modelValue)
    return
  }
  clearTimeInterval()
  currentValue.value = currentValue.value || 0
  const run = () => {
    interval.value = setTimeout(() => {
      if (currentValue.value !== props.modelValue) {
        if (Math.abs(currentValue.value - props.modelValue) < STEP) {
          currentValue.value = props.modelValue
        } else if (currentValue.value < props.modelValue) {
          currentValue.value += STEP
        } else {
          currentValue.value -= STEP
        }
        drawCircle(currentValue.value)
        run()
      } else {
        clearTimeInterval()
      }
    }, 1000 / props.speed)
  }
  run()
}
/**
 * 清除定时器
 */
function clearTimeInterval() {
  interval.value && clearTimeout(interval.value)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
