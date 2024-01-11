<template>
  <view :class="`wd-circle ${customClass}`">
    <canvas :width="canvasSize" :height="canvasSize" :style="style" :id="canvasId" :canvas-id="canvasId"></canvas>
    <view v-if="!text" class="wd-circle__text">
      <!-- 自定义提示内容 -->
      <slot></slot>
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <cover-view v-else class="wd-circle__text">
      {{ text }}
    </cover-view>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <!-- eslint-disable-next-line vue/valid-v-else -->
    <text v-else class="wd-circle__text">
      {{ text }}
    </text>
    <!-- #endif -->
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
// Circle 环形进度条
import { computed, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { addUnit, isObj, objToStyle, uuid } from '../common/util'

// 大于等于0且小于等于100
function format(rate: number) {
  return Math.min(Math.max(rate, 0), 100)
}
// 结束角度
const PERIMETER = 2 * Math.PI
// 开始角度
const BEGIN_ANGLE = -Math.PI / 2
const STEP = 1
// 进度条端点的形状，可选值为 "butt" | "round" | "square"
type StrokeLinecapType = 'butt' | 'round' | 'square'
interface Props {
  // 当前进度
  modelValue: number
  // 自定义class
  customClass?: string
  // 自定义style
  customStyle?: string
  // 圆环直径，默认单位为 px
  size?: number
  // 进度条颜色，传入对象格式可以定义渐变色
  color?: string | Record<string, string>
  // 轨道颜色
  layerColor?: string
  // 填充颜色
  fill?: string
  // 动画速度（单位为 rate/s）
  speed?: number
  // 文字
  text?: string
  // 进度条宽度 单位px
  strokeWidth?: number
  // 进度条端点的形状，可选值为 "butt" | "round" | "square"
  strokeLinecap?: StrokeLinecapType
  // 是否顺时针增加
  clockwise?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 当前进度
  modelValue: 0,
  // 自定义class
  customClass: '',
  // 自定义style
  customStyle: '',
  // 圆环直径，默认单位为 px
  size: 100,
  // 进度条颜色，传入对象格式可以定义渐变色
  color: '#4d80f0',
  // 轨道颜色
  layerColor: '#EBEEF5',
  // 动画速度（单位为 rate/s）
  speed: 50,
  // 进度条宽度 默认单位px
  strokeWidth: 10,
  // 进度条端点的形状
  strokeLinecap: 'round',
  // 是否顺时针增加
  clockwise: true
})

const progressColor = ref<string | CanvasGradient>('') // 进度条颜色
const pixel = ref<number>(1) // 设备像素比
const currentValue = ref<number>(0) // 当前值
const interval = ref<any>(null) // 定时器
const canvasId = ref<string>(uuid()) // canvasId
let ctx: UniApp.CanvasContext | null = null
// canvas渲染大小
const canvasSize = computed(() => {
  return props.size * pixel.value
})

// Circle 样式
const style = computed(() => {
  const style = {
    width: addUnit(props.size),
    height: addUnit(props.size)
  }
  return `${objToStyle(style)}; ${props.customStyle}`
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

// 监听轨道颜色变化
watch(
  () => props.layerColor,
  () => {
    drawCircle(currentValue.value)
  },
  { immediate: false }
)

// 监听轨道宽度
watch(
  () => props.strokeWidth,
  () => {
    drawCircle(currentValue.value)
  },
  { immediate: false }
)

// 监听轨道展示方向
watch(
  () => props.clockwise,
  () => {
    drawCircle(currentValue.value)
  },
  { immediate: false }
)

// #ifdef MP-ALIPAY
onBeforeMount(() => {
  pixel.value = uni.getSystemInfoSync().pixelRatio
})
// #endif

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
  if (!ctx) {
    ctx = uni.createCanvasContext(canvasId.value, proxy)
  }
  return Promise.resolve(ctx)
}

/**
 * 设置canvas
 */
function presetCanvas(context: any, strokeStyle: string | CanvasGradient, beginAngle: number, endAngle: number, fill?: string) {
  const canvasSize = props.size * pixel.value
  let strokeWidth = props.strokeWidth * pixel.value
  const position = canvasSize / 2
  if (!fill) {
    strokeWidth = strokeWidth / 2
  }
  const radius = position - strokeWidth / 2
  context.strokeStyle = strokeStyle
  context.setLineWidth(strokeWidth)
  context.setLineCap(props.strokeLinecap)

  context.beginPath()
  context.arc(position, position, radius, beginAngle, endAngle, !props.clockwise)
  context.stroke()
  if (fill) {
    context.setLineWidth(strokeWidth)
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
  const canvasSize = props.size * pixel.value
  // 结束角度
  const progress = PERIMETER * (formatValue / 100)
  const endAngle = props.clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress)

  // 设置进度条颜色
  if (isObj(props.color)) {
    const LinearColor = context.createLinearGradient(canvasSize, 0, 0, 0)
    Object.keys(props.color)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, props.color[key]))
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
  const canvasSize = props.size * pixel.value
  const strokeWidth = props.strokeWidth * pixel.value // 管道宽度=小圆点直径
  const position = canvasSize / 2 // 坐标
  // 设置进度条颜色
  if (isObj(props.color)) {
    const LinearColor = context.createLinearGradient(canvasSize, 0, 0, 0)
    Object.keys(props.color)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, props.color[key]))
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
  const canvasSize = props.size * pixel.value
  getContext().then((context) => {
    context.clearRect(0, 0, canvasSize, canvasSize)
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
