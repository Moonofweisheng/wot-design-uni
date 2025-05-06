<template>
  <view class="wd-signature">
    <view class="wd-signature__content">
      <!-- #ifdef MP-WEIXIN -->
      <canvas
        class="wd-signature__content-canvas"
        :style="canvasStyle"
        :width="canvasState.canvasWidth"
        :height="canvasState.canvasHeight"
        :canvas-id="canvasId"
        :id="canvasId"
        :disable-scroll="disableScroll"
        @touchstart="startDrawing"
        @touchend="stopDrawing"
        @touchmove="draw"
        type="2d"
      />
      <!-- #endif  -->
      <!-- #ifndef MP-WEIXIN -->
      <canvas
        class="wd-signature__content-canvas"
        :canvas-id="canvasId"
        :style="canvasStyle"
        :width="canvasState.canvasWidth"
        :height="canvasState.canvasHeight"
        :id="canvasId"
        :disable-scroll="disableScroll"
        @touchstart="startDrawing"
        @touchend="stopDrawing"
        @touchmove="draw"
      />
      <!-- #endif  -->
    </view>
    <view class="wd-signature__footer">
      <slot
        name="footer"
        :clear="clear"
        :confirm="confirmSignature"
        :current-step="currentStep"
        :revoke="revoke"
        :restore="restore"
        :can-undo="lines.length > 0"
        :can-redo="redoLines.length > 0"
        :history-list="lines"
      >
        <block v-if="enableHistory">
          <wd-button size="small" plain @click="revoke" :disabled="lines.length <= 0">
            {{ revokeText || translate('revokeText') }}
          </wd-button>
          <wd-button size="small" plain @click="restore" :disabled="redoLines.length <= 0">
            {{ restoreText || translate('restoreText') }}
          </wd-button>
        </block>
        <wd-button size="small" plain @click="clear">{{ clearText || translate('clearText') }}</wd-button>
        <wd-button size="small" @click="confirmSignature">{{ confirmText || translate('confirmText') }}</wd-button>
      </slot>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-signature',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, getCurrentInstance, onBeforeMount, onMounted, reactive, ref, watch, type CSSProperties } from 'vue'
import { addUnit, getRect, isDef, objToStyle, uuid } from '../common/util'
import { signatureProps, type SignatureExpose, type SignatureResult, type Point, type Line } from './types'
import { useTranslate } from '../composables/useTranslate'
// #ifdef MP-WEIXIN
import { canvas2dAdapter } from '../common/canvasHelper'
// #endif

const props = defineProps(signatureProps)
const emit = defineEmits(['start', 'end', 'signing', 'confirm', 'clear'])
const { translate } = useTranslate('signature')
const { proxy } = getCurrentInstance() as any
const canvasId = ref<string>(`signature${uuid()}`) // canvas 组件的唯一标识符
let canvas: null = null //canvas对象 微信小程序生成图片必须传入
const drawing = ref<boolean>(false) // 是否正在绘制
const pixelRatio = ref<number>(1) // 像素比

const canvasState = reactive({
  canvasWidth: 0,
  canvasHeight: 0,
  ctx: null as UniApp.CanvasContext | null // canvas上下文
})

watch(
  () => props.penColor,
  () => {
    setLine()
  }
)

watch(
  () => props.lineWidth,
  () => {
    setLine()
  }
)

const canvasStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.width)) {
    style.width = addUnit(props.width)
  }

  if (isDef(props.height)) {
    style.height = addUnit(props.height)
  }

  return `${objToStyle(style)}`
})

const disableScroll = computed(() => props.disableScroll)
const enableHistory = computed(() => props.enableHistory)

const lines = ref<Line[]>([]) // 保存所有线条
const redoLines = ref<Line[]>([]) // 保存撤销的线条
const currentLine = ref<Line>() // 当前正在绘制的线
const currentStep = ref(0) // 当前步骤

// 添加计算笔画宽度的方法
function calculateLineWidth(speed: number): number {
  if (!props.pressure) return props.lineWidth

  const minSpeed = props.minSpeed || 1.5
  const limitedSpeed = Math.min(minSpeed * 10, Math.max(minSpeed, speed))
  const addWidth = ((props.maxWidth - props.minWidth) * (limitedSpeed - minSpeed)) / minSpeed
  const lineWidth = Math.max(props.maxWidth - addWidth, props.minWidth)
  return Math.min(lineWidth, props.maxWidth)
}

/* 获取默认笔画宽度 */
const getDefaultLineWidth = () => {
  if (props.pressure) {
    // 在压感模式下，使用最大和最小宽度的平均值作为默认值
    return (props.maxWidth + props.minWidth) / 2
  }
  return props.lineWidth
}

/* 开始画线 */
const startDrawing = (e: any) => {
  e.preventDefault()
  drawing.value = true
  setLine()
  emit('start', e)

  // 创建新线条，同时保存当前的所有绘制参数
  const { x, y } = e.touches[0]
  currentLine.value = {
    points: [
      {
        x,
        y,
        t: Date.now() // 使用 t 替换 width
      }
    ],
    color: props.penColor,
    width: getDefaultLineWidth(),
    backgroundColor: props.backgroundColor,
    isPressure: props.pressure // 添加笔锋模式标记
  }

  // 清空重做记录
  redoLines.value = []
  draw(e)
}

/* 结束画线 */
const stopDrawing = (e: TouchEvent) => {
  e.preventDefault()
  drawing.value = false
  if (currentLine.value) {
    // 保存完整的线条信息，包括所有点的参数
    lines.value.push({
      ...currentLine.value,
      points: currentLine.value.points.map((point) => ({
        ...point,
        t: point.t,
        speed: point.speed,
        distance: point.distance,
        lineWidth: point.lineWidth,
        lastX1: point.lastX1,
        lastY1: point.lastY1,
        lastX2: point.lastX2,
        lastY2: point.lastY2,
        isFirstPoint: point.isFirstPoint
      }))
    })
    currentStep.value = lines.value.length
  }
  currentLine.value = undefined
  const { ctx } = canvasState
  if (ctx) ctx.beginPath()
  emit('end', e)
}

/**
 * 初始化 canvas
 * @param forceUpdate 是否强制更新
 */
const initCanvas = (forceUpdate: boolean = false) => {
  // 如果不是强制更新，且已经初始化过 canvas，则不再重复初始化
  if (!forceUpdate && canvasState.canvasHeight && canvasState.canvasWidth) {
    return
  }
  getContext().then(() => {
    const { ctx } = canvasState
    if (ctx && isDef(props.backgroundColor)) {
      ctx.setFillStyle(props.backgroundColor)
      ctx.fillRect(0, 0, canvasState.canvasWidth, canvasState.canvasHeight)
      ctx.draw()
    }
  })
}

// 清空 canvas
const clear = () => {
  lines.value = []
  redoLines.value = []
  currentStep.value = 0
  clearCanvas()
  emit('clear')
}

// 确认签名
const confirmSignature = () => {
  canvasToImage()
}

//canvas划线
const draw = (e: any) => {
  e.preventDefault()
  const { ctx } = canvasState

  if (!drawing.value || props.disabled || !ctx) return
  const { x, y } = e.touches[0]

  const point: Point = {
    x,
    y,
    t: Date.now()
  }

  if (currentLine.value) {
    const points = currentLine.value.points
    const prePoint = points[points.length - 1]

    if (prePoint.t === point.t || (prePoint.x === x && prePoint.y === y)) {
      return
    }

    // 计算点的速度和距离
    point.distance = Math.sqrt(Math.pow(point.x - prePoint.x, 2) + Math.pow(point.y - prePoint.y, 2))
    point.speed = point.distance / (point.t - prePoint.t || 0.1)

    if (props.pressure) {
      point.lineWidth = calculateLineWidth(point.speed)
      // 处理线宽变化率限制
      if (points.length >= 2) {
        const prePoint2 = points[points.length - 2]
        if (prePoint2.lineWidth && prePoint.lineWidth) {
          const rate = (point.lineWidth - prePoint.lineWidth) / prePoint.lineWidth
          const maxRate = 0.2 // 最大变化率20%
          if (Math.abs(rate) > maxRate) {
            const per = rate > 0 ? maxRate : -maxRate
            point.lineWidth = prePoint.lineWidth * (1 + per)
          }
        }
      }
    }

    points.push(point)

    // 非笔锋模式直接使用线段连接
    if (!props.pressure) {
      ctx.beginPath()
      ctx.moveTo(prePoint.x, prePoint.y)
      ctx.lineTo(point.x, point.y)
      ctx.stroke()
      ctx.draw(true)
    } else if (points.length >= 2) {
      // 笔锋模式使用贝塞尔曲线
      drawSmoothLine(prePoint, point)
    }
  }

  emit('signing', e)
}

/* 重绘整个画布 */
const redrawCanvas = () => {
  const { ctx } = canvasState
  if (!ctx) return

  // 清除画布并设置背景
  if (isDef(props.backgroundColor)) {
    ctx.setFillStyle(props.backgroundColor)
    ctx.fillRect(0, 0, canvasState.canvasWidth, canvasState.canvasHeight)
  } else {
    ctx.clearRect(0, 0, canvasState.canvasWidth, canvasState.canvasHeight)
  }

  // 如果没有线条，只需要清空画布
  if (lines.value.length === 0) {
    ctx.draw()
    return
  }

  // 收集所有绘制操作，最后一次性 draw
  lines.value.forEach((line) => {
    if (!line.points.length) return

    ctx.setStrokeStyle(line.color)
    ctx.setLineJoin('round')
    ctx.setLineCap('round')

    if (line.isPressure && props.pressure) {
      // 笔锋模式的重绘
      line.points.forEach((point, index) => {
        if (index === 0) return
        const prePoint = line.points[index - 1]
        const dis_x = point.x - prePoint.x
        const dis_y = point.y - prePoint.y
        const distance = Math.sqrt(dis_x * dis_x + dis_y * dis_y)

        if (distance <= 2) {
          point.lastX1 = point.lastX2 = prePoint.x + dis_x * 0.5
          point.lastY1 = point.lastY2 = prePoint.y + dis_y * 0.5
        } else {
          const speed = point.speed || 0
          const minSpeed = props.minSpeed || 1.5
          const speedFactor = Math.max(0.1, Math.min(0.9, speed / (minSpeed * 10)))

          point.lastX1 = prePoint.x + dis_x * (0.2 + speedFactor * 0.3)
          point.lastY1 = prePoint.y + dis_y * (0.2 + speedFactor * 0.3)
          point.lastX2 = prePoint.x + dis_x * (0.8 - speedFactor * 0.3)
          point.lastY2 = prePoint.y + dis_y * (0.8 - speedFactor * 0.3)
        }

        const lineWidth = point.lineWidth || line.width
        if (typeof prePoint.lastX1 === 'number') {
          ctx.setLineWidth(lineWidth)
          ctx.beginPath()
          ctx.moveTo(prePoint.lastX2!, prePoint.lastY2!)
          ctx.quadraticCurveTo(prePoint.x, prePoint.y, point.lastX1, point.lastY1)
          ctx.stroke()

          if (!prePoint.isFirstPoint) {
            ctx.beginPath()
            ctx.moveTo(prePoint.lastX1!, prePoint.lastY1!)
            ctx.quadraticCurveTo(prePoint.x, prePoint.y, prePoint.lastX2!, prePoint.lastY2!)
            ctx.stroke()
          }
        } else {
          point.isFirstPoint = true
        }
      })
    } else {
      // 非笔锋模式的重绘
      ctx.setLineWidth(line.width)
      line.points.forEach((point, index) => {
        if (index === 0) return
        const prePoint = line.points[index - 1]
        ctx.beginPath()
        ctx.moveTo(prePoint.x, prePoint.y)
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
      })
    }
  })

  // 所有线条绘制完成后，一次性更新画布
  ctx.draw()
}

// 修改撤销功能
const revoke = () => {
  if (!lines.value.length) return
  const step = Math.min(props.step, lines.value.length)
  const removedLines = lines.value.splice(lines.value.length - step)
  redoLines.value.push(...removedLines)
  currentStep.value = Math.max(0, currentStep.value - step)
  redrawCanvas()
}

// 修改恢复功能
const restore = () => {
  if (!redoLines.value.length) return
  const step = Math.min(props.step, redoLines.value.length)
  const restoredLines = redoLines.value.splice(redoLines.value.length - step)
  lines.value.push(...restoredLines)
  currentStep.value = Math.min(lines.value.length, currentStep.value + step)
  redrawCanvas()
}

// 添加平滑线条绘制方法
function drawSmoothLine(prePoint: Point, point: Point) {
  const { ctx } = canvasState
  if (!ctx) return

  // 计算两点间距离
  const dis_x = point.x - prePoint.x
  const dis_y = point.y - prePoint.y
  const distance = Math.sqrt(dis_x * dis_x + dis_y * dis_y)

  if (distance <= 2) {
    // 对于非常近的点，直接使用中点
    point.lastX1 = point.lastX2 = prePoint.x + dis_x * 0.5
    point.lastY1 = point.lastY2 = prePoint.y + dis_y * 0.5
  } else {
    // 根据点的速度计算控制点的偏移程度
    const speed = point.speed || 0
    const minSpeed = props.minSpeed || 1.5
    const speedFactor = Math.max(0.1, Math.min(0.9, speed / (minSpeed * 10)))

    // 计算控制点
    point.lastX1 = prePoint.x + dis_x * (0.2 + speedFactor * 0.3)
    point.lastY1 = prePoint.y + dis_y * (0.2 + speedFactor * 0.3)
    point.lastX2 = prePoint.x + dis_x * (0.8 - speedFactor * 0.3)
    point.lastY2 = prePoint.y + dis_y * (0.8 - speedFactor * 0.3)
  }

  // 计算线宽
  const lineWidth = point.lineWidth || props.lineWidth

  // 绘制贝塞尔曲线
  if (typeof prePoint.lastX1 === 'number') {
    // 设置线宽
    ctx.setLineWidth(lineWidth)
    // 绘制第一段曲线
    ctx.beginPath()
    ctx.moveTo(prePoint.lastX2!, prePoint.lastY2!)
    ctx.quadraticCurveTo(prePoint.x, prePoint.y, point.lastX1, point.lastY1)
    ctx.stroke()

    if (!prePoint.isFirstPoint) {
      // 绘制连接段曲线
      ctx.beginPath()
      ctx.moveTo(prePoint.lastX1!, prePoint.lastY1!)
      ctx.quadraticCurveTo(prePoint.x, prePoint.y, prePoint.lastX2!, prePoint.lastY2!)
      ctx.stroke()
    }

    // 批量更新绘制内容
    ctx.draw(true)
  } else {
    point.isFirstPoint = true
  }
}

onMounted(() => {
  initCanvas()
})

onBeforeMount(() => {
  // #ifdef MP
  pixelRatio.value = uni.getSystemInfoSync().pixelRatio
  // #endif
})

/**
 * 获取canvas上下文
 */
function getContext() {
  return new Promise<UniApp.CanvasContext>((resolve) => {
    const { ctx } = canvasState

    if (ctx) {
      return resolve(ctx)
    }
    // #ifndef MP-WEIXIN
    getRect(`#${canvasId.value}`, false, proxy).then((canvasRect) => {
      setcanvasState(canvasRect.width!, canvasRect.height!)
      canvasState.ctx = uni.createCanvasContext(canvasId.value, proxy)
      if (canvasState.ctx) {
        canvasState.ctx.scale(pixelRatio.value, pixelRatio.value)
      }
      resolve(canvasState.ctx)
    })
    // #endif
    // #ifdef MP-WEIXIN

    getRect(`#${canvasId.value}`, false, proxy, true).then((canvasRect: any) => {
      if (canvasRect && canvasRect.node && canvasRect.width && canvasRect.height) {
        const canvasInstance = canvasRect.node
        canvasState.ctx = canvas2dAdapter(canvasInstance.getContext('2d') as CanvasRenderingContext2D)
        canvasInstance.width = canvasRect.width * pixelRatio.value
        canvasInstance.height = canvasRect.height * pixelRatio.value
        canvasState.ctx.scale(pixelRatio.value, pixelRatio.value)
        canvas = canvasInstance
        setcanvasState(canvasRect.width, canvasRect.height)
        resolve(canvasState.ctx)
      }
    })
    // #endif
  })
}

/**
 * 设置 canvasState
 */
function setcanvasState(width: number, height: number) {
  canvasState.canvasHeight = height * pixelRatio.value
  canvasState.canvasWidth = width * pixelRatio.value
}

/* 设置线段 */
function setLine() {
  const { ctx } = canvasState
  if (ctx) {
    ctx.setLineWidth(getDefaultLineWidth()) // 使用新的默认宽度
    ctx.setStrokeStyle(props.penColor)
    ctx.setLineJoin('round')
    ctx.setLineCap('round')
  }
}

/**
 *  canvas 绘制图片输出成文件类型
 */
function canvasToImage() {
  const { fileType, quality, exportScale } = props
  const { canvasWidth, canvasHeight } = canvasState
  uni.canvasToTempFilePath(
    {
      width: canvasWidth * exportScale,
      height: canvasHeight * exportScale,
      destWidth: canvasWidth * exportScale,
      destHeight: canvasHeight * exportScale,
      fileType,
      quality,
      canvasId: canvasId.value,
      canvas: canvas,
      success: (res) => {
        const result: SignatureResult = {
          tempFilePath: res.tempFilePath,
          width: (canvasWidth * exportScale) / pixelRatio.value,
          height: (canvasHeight * exportScale) / pixelRatio.value,
          success: true
        }
        // #ifdef MP-DINGTALK
        result.tempFilePath = (res as any).filePath
        // #endif
        emit('confirm', result)
      },
      fail: () => {
        const result: SignatureResult = {
          tempFilePath: '',
          width: (canvasWidth * exportScale) / pixelRatio.value,
          height: (canvasHeight * exportScale) / pixelRatio.value,
          success: false
        }
        emit('confirm', result)
      }
    },
    proxy
  )
}

function clearCanvas() {
  const { canvasWidth, canvasHeight, ctx } = canvasState
  if (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    if (isDef(props.backgroundColor)) {
      ctx.setFillStyle(props.backgroundColor)
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    }
    ctx.draw()
  }
}

defineExpose<SignatureExpose>({
  init: initCanvas,
  clear,
  confirm: confirmSignature,
  restore,
  revoke
})
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
