<!--
 * @Author: weisheng
 * @Date: 2023-04-05 21:32:56
 * @LastEditTime: 2025-04-28 19:41:17
 * @LastEditors: weisheng
 * @Description: 水印组件
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-watermark/wd-watermark.vue
 * 记得注释
-->
<template>
  <view :class="rootClass" :style="rootStyle">
    <canvas
      v-if="!canvasOffScreenable && showCanvas"
      type="2d"
      :style="{ height: canvasHeight + 'px', width: canvasWidth + 'px', visibility: 'hidden' }"
      :canvas-id="canvasId"
      :id="canvasId"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-watermark',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onMounted, ref, watch, nextTick, type CSSProperties } from 'vue'
import { addUnit, buildUrlWithParams, isBase64Image, objToStyle, uuid } from '../common/util'
import { watermarkProps } from './types'

const props = defineProps(watermarkProps)

watch(
  () => props,
  () => {
    doReset()
  },
  { deep: true }
)

const canvasId = ref<string>(`water${uuid()}`) // canvas 组件的唯一标识符
const waterMarkUrl = ref<string>('') // canvas生成base64水印
const canvasOffScreenable = ref<boolean>(uni.canIUse('createOffscreenCanvas') && Boolean(uni.createOffscreenCanvas)) // 是否可以使用离屏canvas
const pixelRatio = ref<number>(uni.getSystemInfoSync().pixelRatio) // 像素比
const canvasHeight = ref<number>((props.height + props.gutterY) * pixelRatio.value) // canvas画布高度
const canvasWidth = ref<number>((props.width + props.gutterX) * pixelRatio.value) // canvas画布宽度
const showCanvas = ref<boolean>(true) // 是否展示canvas

/**
 * 水印css类
 */
const rootClass = computed(() => {
  let classess: string = 'wd-watermark'
  if (props.fullScreen) {
    classess = `${classess} is-fullscreen`
  }
  return `${classess} ${props.customClass}`
})

/**
 * 水印样式
 */
const rootStyle = computed(() => {
  const style: CSSProperties = {
    opacity: props.opacity,
    backgroundSize: addUnit(props.width + props.gutterX)
  }
  if (waterMarkUrl.value) {
    style['backgroundImage'] = `url('${waterMarkUrl.value}')`
  }
  return `${objToStyle(style)}${props.customStyle}`
})

onMounted(() => {
  doInit()
})

function doReset() {
  showCanvas.value = true
  canvasHeight.value = (props.height + props.gutterY) * pixelRatio.value
  canvasWidth.value = (props.width + props.gutterX) * pixelRatio.value
  nextTick(() => {
    doInit()
  })
}

function doInit() {
  // #ifdef H5
  // h5使用document.createElement创建canvas，不用展示canvas标签
  showCanvas.value = false
  // #endif
  const { width, height, color, size, fontStyle, fontWeight, fontFamily, content, rotate, gutterX, gutterY, image, imageHeight, imageWidth } = props

  // 创建水印
  createWaterMark(width, height, color, size, fontStyle, fontWeight, fontFamily, content, rotate, gutterX, gutterY, image, imageHeight, imageWidth)
}

/**
 * 创建水印图片
 * @param width canvas宽度
 * @param height canvas高度
 * @param color canvas字体颜色
 * @param size canvas字体大小
 * @param fontStyle canvas字体样式
 * @param fontWeight canvas字体字重
 * @param fontFamily canvas字体系列
 * @param content canvas内容
 * @param rotate 倾斜角度
 * @param gutterX X轴间距
 * @param gutterY Y轴间距
 * @param image canvas图片
 * @param imageHeight canvas图片高度
 * @param imageWidth canvas图片宽度
 */
function createWaterMark(
  width: number,
  height: number,
  color: string,
  size: number,
  fontStyle: string,
  fontWeight: number | string,
  fontFamily: string,
  content: string,
  rotate: number,
  gutterX: number,
  gutterY: number,
  image: string,
  imageHeight: number,
  imageWidth: number
) {
  const canvasHeight = (height + gutterY) * pixelRatio.value
  const canvasWidth = (width + gutterX) * pixelRatio.value
  const contentWidth = width * pixelRatio.value
  const contentHeight = height * pixelRatio.value
  const fontSize = size * pixelRatio.value
  // #ifndef H5
  if (canvasOffScreenable.value) {
    createOffscreenCanvas(
      canvasHeight,
      canvasWidth,
      contentWidth,
      contentHeight,
      rotate,
      fontSize,
      fontFamily,
      fontStyle,
      fontWeight,
      color,
      content,
      image,
      imageHeight,
      imageWidth
    )
  } else {
    createCanvas(canvasHeight, contentWidth, rotate, fontSize, color, content, image, imageHeight, imageWidth)
  }
  // #endif
  // #ifdef H5
  createH5Canvas(
    canvasHeight,
    canvasWidth,
    contentWidth,
    contentHeight,
    rotate,
    fontSize,
    fontFamily,
    fontStyle,
    fontWeight,
    color,
    content,
    image,
    imageHeight,
    imageWidth
  )
  // #endif
}

/**
 * 创建离屏canvas
 * @param canvasHeight canvas高度
 * @param canvasWidth canvas宽度
 * @param contentWidth 内容宽度
 * @param contentHeight 内容高度
 * @param rotate 内容倾斜角度
 * @param fontSize 字体大小
 * @param fontFamily 字体系列
 * @param fontStyle 字体样式
 * @param fontWeight 字体字重
 * @param color 字体颜色
 * @param content 内容
 * @param image canvas图片
 * @param imageHeight canvas图片高度
 * @param imageWidth canvas图片宽度
 */
function createOffscreenCanvas(
  canvasHeight: number,
  canvasWidth: number,
  contentWidth: number,
  contentHeight: number,
  rotate: number,
  fontSize: number,
  fontFamily: string,
  fontStyle: string,
  fontWeight: string | number,
  color: string,
  content: string,
  image: string,
  imageHeight: number,
  imageWidth: number
) {
  // 创建离屏canvas
  const canvas: any = uni.createOffscreenCanvas({ height: canvasHeight, width: canvasWidth, type: '2d' })
  const ctx: any = canvas.getContext('2d')
  if (ctx) {
    if (image) {
      const img = canvas.createImage() as HTMLImageElement
      drawImageOffScreen(ctx, img, image, imageHeight, imageWidth, rotate, contentWidth, contentHeight, canvas)
    } else {
      drawTextOffScreen(ctx, content, contentWidth, contentHeight, rotate, fontSize, fontFamily, fontStyle, fontWeight, color, canvas)
    }
  } else {
    console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
  }
}

/**
 * 非H5创建canvas
 * 不支持创建离屏canvas时调用
 * @param contentHeight 内容高度
 * @param contentWidth 内容宽度
 * @param rotate 内容倾斜角度
 * @param fontSize 字体大小
 * @param color 字体颜色
 * @param content 内容
 * @param image canvas图片
 * @param imageHeight canvas图片高度
 * @param imageWidth canvas图片宽度
 */
function createCanvas(
  contentHeight: number,
  contentWidth: number,
  rotate: number,
  fontSize: number,
  color: string,
  content: string,
  image: string,
  imageHeight: number,
  imageWidth: number
) {
  const ctx = uni.createCanvasContext(canvasId.value)
  if (ctx) {
    if (image) {
      drawImageOnScreen(ctx, image, imageHeight, imageWidth, rotate, contentWidth, contentHeight)
    } else {
      drawTextOnScreen(ctx, content, contentWidth, rotate, fontSize, color)
    }
  } else {
    console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
  }
}

/**
 * h5创建canvas
 * @param canvasHeight canvas高度
 * @param canvasWidth canvas宽度
 * @param contentWidth 水印内容宽度
 * @param contentHeight 水印内容高度
 * @param rotate 水印内容倾斜角度
 * @param fontSize 水印字体大小
 * @param fontFamily 水印字体系列
 * @param fontStyle 水印字体样式
 * @param fontWeight 水印字体字重
 * @param color 水印字体颜色
 * @param content 水印内容
 */
function createH5Canvas(
  canvasHeight: number,
  canvasWidth: number,
  contentWidth: number,
  contentHeight: number,
  rotate: number,
  fontSize: number,
  fontFamily: string,
  fontStyle: string,
  fontWeight: string | number,
  color: string,
  content: string,
  image: string,
  imageHeight: number,
  imageWidth: number
) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.setAttribute('width', `${canvasWidth}px`)
  canvas.setAttribute('height', `${canvasHeight}px`)
  if (ctx) {
    if (image) {
      const img = new Image()
      drawImageOffScreen(ctx, img, image, imageHeight, imageWidth, rotate, contentWidth, contentHeight, canvas)
    } else {
      drawTextOffScreen(ctx, content, contentWidth, contentHeight, rotate, fontSize, fontFamily, fontStyle, fontWeight, color, canvas)
    }
  } else {
    console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
  }
}

/**
 * 绘制离屏文字canvas
 * @param ctx canvas上下文
 * @param content 水印内容
 * @param contentWidth 水印宽度
 * @param contentHeight 水印高度
 * @param rotate 水印内容倾斜角度
 * @param fontSize 水印字体大小
 * @param fontFamily 水印字体系列
 * @param fontStyle 水印字体样式
 * @param fontWeight 水印字体字重
 * @param color 水印字体颜色
 * @param canvas canvas实例
 */
function drawTextOffScreen(
  ctx: CanvasRenderingContext2D,
  content: string,
  contentWidth: number,
  contentHeight: number,
  rotate: number,
  fontSize: number,
  fontFamily: string,
  fontStyle: string,
  fontWeight: string | number,
  color: string,
  canvas: HTMLCanvasElement
) {
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.translate(contentWidth / 2, contentWidth / 2)
  ctx.rotate((Math.PI / 180) * rotate)
  ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px/${contentHeight}px ${fontFamily}`
  ctx.fillStyle = color
  ctx.fillText(content, 0, 0)
  ctx.restore()
  waterMarkUrl.value = canvas.toDataURL()
}

/**
 * 绘制在屏文字canvas
 * @param ctx canvas上下文
 * @param content 水印内容
 * @param contentWidth 水印宽度
 * @param rotate 水印内容倾斜角度
 * @param fontSize 水印字体大小
 * @param color 水印字体颜色
 */
function drawTextOnScreen(ctx: UniApp.CanvasContext, content: string, contentWidth: number, rotate: number, fontSize: number, color: string) {
  ctx.setTextBaseline('middle')
  ctx.setTextAlign('center')
  ctx.translate(contentWidth / 2, contentWidth / 2)
  ctx.rotate((Math.PI / 180) * rotate)
  ctx.setFillStyle(color)
  ctx.setFontSize(fontSize)
  ctx.fillText(content, 0, 0)
  ctx.restore()
  ctx.draw()
  // #ifdef MP-DINGTALK
  // 钉钉小程序的canvasToTempFilePath接口与其他平台不一样
  ;(ctx as any).toTempFilePath({
    success(res: any) {
      showCanvas.value = false
      waterMarkUrl.value = res.filePath
    }
  })
  // #endif
  // #ifndef MP-DINGTALK
  uni.canvasToTempFilePath({
    canvasId: canvasId.value,
    success: (res) => {
      showCanvas.value = false
      waterMarkUrl.value = res.tempFilePath
    }
  })
  // #endif
}

/**
 * 绘制离屏图片canvas
 * @param ctx canvas上下文
 * @param img 水印图片对象
 * @param image 水印图片地址
 * @param imageHeight 水印图片高度
 * @param imageWidth 水印图片宽度
 * @param rotate 水印内容倾斜角度
 * @param contentWidth 水印宽度
 * @param contentHeight 水印高度
 * @param canvas canvas实例
 */
async function drawImageOffScreen(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  image: string,
  imageHeight: number,
  imageWidth: number,
  rotate: number,
  contentWidth: number,
  contentHeight: number,
  canvas: HTMLCanvasElement
) {
  ctx.translate(contentWidth / 2, contentHeight / 2)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  img.crossOrigin = 'anonymous'
  img.referrerPolicy = 'no-referrer'

  if (isBase64Image(image)) {
    img.src = image
  } else {
    img.src = buildUrlWithParams(image, {
      timestamp: `${new Date().getTime()}`
    })
  }
  img.onload = () => {
    ctx.drawImage(
      img,
      (-imageWidth * pixelRatio.value) / 2,
      (-imageHeight * pixelRatio.value) / 2,
      imageWidth * pixelRatio.value,
      imageHeight * pixelRatio.value
    )
    ctx.restore()
    waterMarkUrl.value = canvas.toDataURL()
  }
}

/**
 * 绘制在屏图片canvas
 * @param ctx canvas上下文
 * @param image 水印图片地址
 * @param imageHeight 水印图片高度
 * @param imageWidth 水印图片宽度
 * @param rotate 水印内容倾斜角度
 * @param contentWidth 水印宽度
 * @param contentHeight 水印高度
 */
function drawImageOnScreen(
  ctx: UniApp.CanvasContext,
  image: string,
  imageHeight: number,
  imageWidth: number,
  rotate: number,
  contentWidth: number,
  contentHeight: number
) {
  ctx.translate(contentWidth / 2, contentHeight / 2)
  ctx.rotate((Math.PI / 180) * Number(rotate))

  ctx.drawImage(
    image,
    (-imageWidth * pixelRatio.value) / 2,
    (-imageHeight * pixelRatio.value) / 2,
    imageWidth * pixelRatio.value,
    imageHeight * pixelRatio.value
  )
  ctx.restore()
  ctx.draw(false, () => {
    // #ifdef MP-DINGTALK
    // 钉钉小程序的canvasToTempFilePath接口与其他平台不一样
    ;(ctx as any).toTempFilePath({
      success(res: any) {
        showCanvas.value = false
        waterMarkUrl.value = res.filePath
      }
    })
    // #endif
    // #ifndef MP-DINGTALK
    uni.canvasToTempFilePath({
      canvasId: canvasId.value,
      success: (res) => {
        showCanvas.value = false
        waterMarkUrl.value = res.tempFilePath
      }
    })
    // #endif
  })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
