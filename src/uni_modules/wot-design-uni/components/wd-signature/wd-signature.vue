<template>
  <view class="wd-signature">
    <view class="wd-signature__content" :style="canvasStyle">
      <!-- #ifdef MP-WEIXIN -->
      <canvas
        class="wd-signature__content-canvas"
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
      <slot name="footer" :clear="clear" :confirm="confirmSignature">
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
import { signatureProps, type SignatureExpose, type SignatureResult } from './types'
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

  return `${objToStyle(style)};`
})

const disableScroll = computed(() => props.disableScroll)

/* 开始画线 */
const startDrawing = (e: TouchEvent) => {
  e.preventDefault()
  drawing.value = true
  setLine()
  emit('start', e)
  draw(e)
}

/* 结束画线 */
const stopDrawing = (e: TouchEvent) => {
  e.preventDefault()
  drawing.value = false
  const { ctx } = canvasState
  if (ctx) ctx.beginPath()
  emit('end', e)
}

// 初始化 canvas
const initCanvas = () => {
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
  const { canvasWidth, canvasHeight, ctx } = canvasState
  if (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    if (isDef(props.backgroundColor)) {
      ctx.setFillStyle(props.backgroundColor)
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    }
    ctx.draw()
  }
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
  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.draw(true) //是否记住上一次画线
  ctx.moveTo(x, y)
  emit('signing', e)
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
      if (canvasRect && canvasRect.node) {
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
    ctx.setLineWidth(props.lineWidth)
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

defineExpose<SignatureExpose>({
  clear,
  confirm: confirmSignature
})
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
