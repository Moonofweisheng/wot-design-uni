<!--
 * @Author: 810505339
 * @Date: 2025-01-10 15:41:12
 * @LastEditors: 810505339
 * @LastEditTime: 2025-01-10 17:50:32
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-signature\wd-signature.vue
 * 记得注释
-->
<template>
  <view class="wd-signature">
    <view class="wd-signature__context">
      <canvas type="2d" :canvas-id="canvasId" :id="canvasId" @touchstart="startDrawing" @touchend="stopDrawing" @touchmove="draw" />
    </view>
    <view class="wd-signature__footer">
      <wd-button size="small" plain @click="clearCanvas">清空</wd-button>
      <wd-button size="small" @click="confirmSignature">确认</wd-button>
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
import { getCurrentInstance, onMounted, ref } from 'vue'
import { getRect, isArray, uuid } from '../common/util'
const { proxy } = getCurrentInstance() as any
const canvasId = ref<string>(`signature${uuid()}`) // canvas 组件的唯一标识符
const ctx = ref<UniApp.CanvasContext | null>(null) // canvas 上下文
const drawing = ref<boolean>(false) // 是否正在绘制
const delta = ref({
  x: 0,
  y: 0
})

/* 开始画线 */
const startDrawing = (e: any) => {
  drawing.value = true
  draw(e)
}
/* 结束画线 */
const stopDrawing = (e) => {
  drawing.value = false
}
// 初始化 canvas
const initCanvas = () => {
  getRect(`#${canvasId.value}`, true).then((rects) => {
    console.log(rects, 'rects')
    if (isArray(rects)) {
      const rect = rects[0]
      if (rect) {
        delta.value = {
          x: rect.left || 0,
          y: rect.top || 0
        }
      }
    }
  })
  ctx.value = uni.createCanvasContext(canvasId.value, proxy)
}

const setLine = () => {
  if (ctx.value) {
    ctx.value.setLineWidth(2)
    ctx.value.setStrokeStyle('#000000')
  }
}

// 清空 canvas
const clearCanvas = () => {
  ctx.value?.clearRect(0, 0, 300, 200)
}

// 确认签名
const confirmSignature = () => {}

//canvas划线
const draw = (e: any) => {
  if (!drawing.value) return
  if (!ctx.value) return
  setLine()
  const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - delta.value.x
  const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - delta.value.y
  console.log(x, y)
  ctx.value.lineTo(10, 10)
  ctx.value.moveTo(20, 20)
  ctx.value.stroke()
  ctx.value.draw()
}

onMounted(() => {
  initCanvas()
})
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
