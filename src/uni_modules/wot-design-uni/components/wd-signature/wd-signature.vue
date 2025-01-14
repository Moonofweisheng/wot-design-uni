<!--
 * @Author: 810505339
 * @Date: 2025-01-10 15:41:12
 * @LastEditors: 810505339
 * @LastEditTime: 2025-01-11 22:53:54
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-signature\wd-signature.vue
 * 记得注释
-->
<template>
  <view class="wd-signature">
    <view class="wd-signature__context">
      <!-- #ifdef MP-WEIXIN -->
      <canvas
        :style="canvasStyle"
        :canvas-id="canvasId"
        :id="canvasId"
        @touchstart="startDrawing"
        @touchend="stopDrawing"
        @touchmove="draw"
        type="2d"
      />
      <!-- #endif  -->
      <!-- #ifndef MP-WEIXIN -->
      <canvas
        :height="height"
        :width="width"
        :style="canvasStyle"
        :canvas-id="canvasId"
        :id="canvasId"
        @touchstart="startDrawing"
        @touchend="stopDrawing"
        @touchmove="draw"
      />
      <!-- #endif  -->
    </view>
    <view class="wd-signature__footer">
      <slot name="footer" :clear="clear" :confirm="confirmSignature">
        <wd-button size="small" plain @click="clear">{{ clearText }}</wd-button>
        <wd-button size="small" @click="confirmSignature">{{ confirmText }}</wd-button>
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
import { computed, getCurrentInstance, onBeforeMount, onMounted, ref, watch, defineExpose } from 'vue'
import { addUnit, objToStyle, uuid } from '../common/util'
import { signatureProps, type SignatureExpose } from './types'
// #ifdef MP-WEIXIN
import { canvas2dAdapter } from '../common/canvasHelper'
// #endif
const props = defineProps(signatureProps)
const emit = defineEmits(['clear', 'confirm', 'touchstart', 'touchend'])
const { proxy } = getCurrentInstance() as any
const canvasId = ref<string>(`signature${uuid()}`) // canvas 组件的唯一标识符
let canvas: null = null //canvas对象 微信小程序生成图片必须传入
let ctx: UniApp.CanvasContext | null = null // canvas上下文
const drawing = ref<boolean>(false) // 是否正在绘制
const pixelRatio = ref<number>(1) // 像素比
const canvasDom = ref({
  w: 0,
  h: 0
})
watch(
  () => props.penColor,
  () => {
    setLine()
  },
  {
    immediate: true
  }
)

watch(
  () => props.lineWidth,
  () => {
    setLine()
  },
  {
    immediate: true
  }
)

const canvasStyle = computed(() => {
  const style = {
    height: addUnit(props.height),
    width: addUnit(props.width)
  }
  return `${objToStyle(style)};`
})

/* 开始画线 */
const startDrawing = (e: TouchEvent) => {
  drawing.value = true
  setLine()
  emit('touchstart', e)
  draw(e)
}
/* 结束画线 */
const stopDrawing = (e: TouchEvent) => {
  drawing.value = false
  if (ctx) ctx.beginPath()
  emit('touchend', e)
}
// 初始化 canvas
const initCanvas = () => {
  getContext()
}

// 清空 canvas
const clear = () => {
  const { w, h } = canvasDom.value
  if (ctx) {
    ctx.clearRect(0, 0, w, h)
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
  if (!drawing.value) return
  if (props.disabled) return
  if (!ctx) return
  const { x, y } = e.touches[0]
  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.draw(true) //是否记住上一次画线
  ctx.moveTo(x, y)
}

onMounted(() => {
  initCanvas()
})
onBeforeMount(() => {
  pixelRatio.value = uni.getSystemInfoSync().pixelRatio
})
/**
 * 获取canvas上下文
 */
function getContext() {
  return new Promise<UniApp.CanvasContext>((resolve) => {
    if (ctx) {
      return resolve(ctx)
    }
    uni
      .createSelectorQuery()
      .in(proxy)
      .select(`#${canvasId.value}`)
      .node((res) => {
        if (res && res.node) {
          const canvasInstance = res.node
          // #ifndef MP-WEIXIN
          ctx = uni.createCanvasContext(canvasId.value, proxy)
          // #endif
          // #ifdef MP-WEIXIN
          ctx = canvas2dAdapter(canvasInstance.getContext('2d') as CanvasRenderingContext2D)
          canvasInstance.width = props.width * pixelRatio.value
          canvasInstance.height = props.height * pixelRatio.value
          ctx.scale(pixelRatio.value, pixelRatio.value)
          // #endif
          canvas = canvasInstance
          canvasDom.value = {
            w: canvasInstance.width,
            h: canvasInstance.height
          }
          resolve(ctx)
        }
      })
      .exec()
  })
}
/* 设置线段 */
function setLine() {
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
  const { w, h } = canvasDom.value
  try {
    uni.canvasToTempFilePath(
      {
        width: w * exportScale,
        height: h * exportScale,
        destWidth: w * exportScale,
        destHeight: h * exportScale,
        fileType,
        quality,
        canvasId: canvasId.value,
        canvas: canvas,
        success: (res: any) => {
          const result = { tempFilePath: res.tempFilePath, width: (w * exportScale) / pixelRatio.value, height: (h * exportScale) / pixelRatio.value }
          // #ifdef MP-DINGTALK
          result.tempFilePath = res.filePath
          // #endif
          emit('confirm', result)
        },
        fail: (error) => {
          console.error(error)
        }
      },
      proxy
    )
  } catch (error) {
    console.error(error)
  }
}

defineExpose<SignatureExpose>({
  clear,
  confirm: confirmSignature
})
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
