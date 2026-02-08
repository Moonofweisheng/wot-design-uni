<template>
  <view :class="`wd-qr-code ${customClass}`" :style="customStyle" @click="onClick">
    <!-- #ifdef MP-WEIXIN -->
    <!-- 微信小程序使用 Canvas 2D -->
    <canvas type="2d" :id="canvasId" :style="{ width: size + 'px', height: size + 'px' }" />
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <!-- 其他平台使用旧版 Canvas -->
    <canvas :canvas-id="canvasId" :style="{ width: size + 'px', height: size + 'px' }" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch, getCurrentInstance, toRaw, nextTick } from 'vue'
import { uuid, addUnit, objToStyle } from '../common/util'
import { qrCodeProps } from './types'
import { generateQRCode, QRErrorCorrectLevel } from './qrcode'
// #ifdef MP-WEIXIN
import { canvas2dAdapter } from '../common/canvasHelper'
// #endif

const props = defineProps(qrCodeProps)
const emit = defineEmits(['error', 'click'])
const instance = getCurrentInstance()

/** Canvas ID，用于标识画布元素 */
const canvasId = ref(props.canvasId || `wd-qr-code-${uuid()}`)
/** Canvas 节点对象（微信小程序 2D 模式） */
const canvasNode = ref<any>(null)
/** 设备像素比，用于高清绘制 */
const pixelRatio = ref(1)
/** Canvas 上下文对象 */
const canvasCtx = ref<any>(null)
/** 标记 Canvas 是否已初始化完成 */
const isCanvasReady = ref(false)

/**
 * 计算自定义类名
 * @returns {string} 拼接后的类名字符串
 */
const customClass = computed(() => {
  return props.customClass ? props.customClass : ''
})

/**
 * 计算自定义样式
 * 尝试解析 JSON 字符串为对象，失败则返回空字符串
 * @returns {string} 样式字符串
 */
const customStyle = computed(() => {
  const style = props.customStyle

  // 如果是空值，返回空字符串
  if (!style) {
    return ''
  }

  // 如果是对象，转换为字符串
  if (typeof style === 'object') {
    return objToStyle(style)
  }

  // 如果是字符串，直接使用（已经是 CSS 样式字符串）
  if (typeof style === 'string') {
    // 尝试检测是否是 JSON 字符串
    const trimmed = style.trim()
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const styleObj = JSON.parse(trimmed)
        return objToStyle(styleObj)
      } catch (e) {
        // JSON 解析失败，但仍可能是有效的 CSS 字符串（如 {color: red} 这种非标准写法）
        console.warn('customStyle looks like JSON but parse failed, using as CSS string')
        return style
      }
    }
    // 普通 CSS 字符串，直接使用
    return style
  }

  return ''
})

/** 组件挂载时初始化 Canvas */
onMounted(() => {
  // 使用 nextTick 确保 DOM 已渲染
  nextTick(() => {
    initCanvas()
  })
})

/**
 * 监听所有影响二维码绘制的属性变化
 * 当任何属性改变时，重新绘制二维码
 */
watch(
  [
    () => props.text,
    () => props.size,
    () => props.correctLevel,
    () => props.colorDark,
    () => props.colorLight,
    () => props.margin,
    () => props.logo,
    () => props.logoWidth,
    () => props.logoHeight,
    () => props.dotType,
    () => props.dotScale,
    () => props.enableGradient,
    () => props.gradientColor,
    () => props.gradientColors,
    () => props.gradientDirection,
    () => props.logoBackgroundColor,
    () => props.logoRadius,
    () => props.logoBorderColor,
    () => props.logoBorderWidth,
    () => props.backgroundImage
  ],
  () => {
    if (isCanvasReady.value) {
      draw()
    }
  },
  { deep: true }
)

/**
 * 初始化 Canvas
 * 微信小程序：获取 Canvas 2D 节点，设置 DPR 缩放
 * 其他平台：直接绘制
 */
function initCanvas() {
  // #ifdef MP-WEIXIN
  const query = uni.createSelectorQuery().in(instance)
  query
    .select(`#${canvasId.value}`)
    .fields({ node: true, size: true })
    .exec((res) => {
      if (res[0] && res[0].node) {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          emit('error', new Error('Failed to get canvas context'))
          return
        }

        // 获取设备像素比，实现高清绘制
        const dpr = uni.getWindowInfo ? uni.getWindowInfo().pixelRatio : uni.getSystemInfoSync().pixelRatio
        pixelRatio.value = dpr

        // 设置 Canvas 实际尺寸（物理像素）
        canvas.width = props.size * dpr
        canvas.height = props.size * dpr

        // 缩放上下文，使绘制坐标与 CSS 像素对应
        ctx.scale(dpr, dpr)

        // 保存节点和上下文
        canvasNode.value = canvas
        // 使用适配器包装上下文，统一 API
        canvasCtx.value = canvas2dAdapter ? canvas2dAdapter(ctx) : ctx
        isCanvasReady.value = true

        // 初始化完成后绘制
        draw()
      } else {
        emit('error', new Error('Canvas node not found'))
      }
    })
  // #endif

  // #ifndef MP-WEIXIN
  // 非微信平台直接标记就绪并绘制
  isCanvasReady.value = true
  draw()
  // #endif
}

/**
 * 绘制二维码主函数
 * 1. 生成二维码矩阵数据
 * 2. 绘制背景
 * 3. 绘制二维码点阵
 * 4. 绘制 Logo
 */
async function draw() {
  if (!props.text) return

  // 等待 Canvas 初始化完成
  if (!isCanvasReady.value) {
    console.warn('Canvas not ready yet')
    return
  }

  // 生成二维码矩阵数据
  let modules
  try {
    const errorCorrectLevel = QRErrorCorrectLevel[props.correctLevel as keyof typeof QRErrorCorrectLevel] || QRErrorCorrectLevel.H
    const result = generateQRCode(props.text, {
      errorCorrectLevel
    })
    modules = result.modules
  } catch (error) {
    emit('error', error)
    return
  }
  // 计算每个码点的尺寸
  const tileW = (props.size - props.margin * 2) / modules.length
  const tileH = (props.size - props.margin * 2) / modules.length

  // 获取或创建绘制上下文
  let ctx = canvasCtx.value

  // #ifndef MP-WEIXIN
  // 非微信平台每次重新创建上下文
  if (!ctx) {
    ctx = uni.createCanvasContext(canvasId.value, instance)
    canvasCtx.value = ctx
  }
  // #endif

  if (!ctx) {
    emit('error', new Error('Canvas context not available'))
    return
  }

  try {
    // 清空画布
    ctx.clearRect(0, 0, props.size, props.size)

    // 绘制背景色
    ctx.fillStyle = props.colorLight
    ctx.fillRect(0, 0, props.size, props.size)

    // 绘制背景图片（如果存在）
    if (props.backgroundImage) {
      try {
        await drawImage(ctx, props.backgroundImage, 0, 0, props.size, props.size)
      } catch (err) {
        console.error('Background image draw failed:', err)
      }
    }

    // 设置前景色（纯色或渐变）
    if (props.enableGradient) {
      let grad
      if (props.gradientDirection === 'horizontal') {
        grad = ctx.createLinearGradient(0, 0, props.size, 0)
      } else if (props.gradientDirection === 'vertical') {
        grad = ctx.createLinearGradient(0, 0, 0, props.size)
      } else if (props.gradientDirection === 'diagonal') {
        grad = ctx.createLinearGradient(0, 0, props.size, props.size)
      } else if (typeof props.gradientDirection === 'number') {
        // 计算任意角度的渐变坐标
        const angle = (props.gradientDirection * Math.PI) / 180
        const center = props.size / 2
        // 计算渐变线长度（覆盖整个正方形）
        const r = (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle))) * center
        const x0 = center - Math.cos(angle) * r
        const y0 = center - Math.sin(angle) * r
        const x1 = center + Math.cos(angle) * r
        const y1 = center + Math.sin(angle) * r
        grad = ctx.createLinearGradient(x0, y0, x1, y1)
      } else {
        grad = ctx.createLinearGradient(0, 0, props.size, props.size)
      }

      if (props.gradientColors && props.gradientColors.length > 0) {
        // 使用颜色列表
        const len = props.gradientColors.length
        props.gradientColors.forEach((color, index) => {
          grad.addColorStop(index / (len - 1), color)
        })
      } else {
        // 使用默认的双色渐变
        grad.addColorStop(0, props.colorDark)
        grad.addColorStop(1, props.gradientColor)
      }
      ctx.fillStyle = grad
    } else {
      ctx.fillStyle = props.colorDark
    }

    /**
     * 检查指定位置是否有码点（用于 liquid 样式的连接判断）
     * @param {number} r - 行索引
     * @param {number} c - 列索引
     * @returns {boolean} 是否有码点
     */
    const hasModule = (r: number, c: number) => {
      return r >= 0 && r < modules.length && c >= 0 && c < modules[r].length && modules[r][c]
    }

    // 绘制二维码点阵
    for (let row = 0; row < modules.length; row++) {
      for (let col = 0; col < modules[row].length; col++) {
        if (modules[row][col]) {
          // 计算码点位置
          const x = Math.ceil(col * tileW) + props.margin
          const y = Math.ceil(row * tileH) + props.margin
          const w = Math.ceil((col + 1) * tileW) - Math.ceil(col * tileW)
          const h = Math.ceil((row + 1) * tileH) - Math.ceil(row * tileH)

          // 应用缩放比例
          const sw = w * props.dotScale
          const sh = h * props.dotScale
          const sx = x + (w - sw) / 2
          const sy = y + (h - sh) / 2

          // 根据样式类型绘制不同形状
          if (props.dotType === 'dots') {
            // 圆点样式
            ctx.beginPath()
            ctx.arc(sx + sw / 2, sy + sh / 2, sw / 2, 0, Math.PI * 2)
            ctx.fill()
          } else if (props.dotType === 'rounded') {
            // 圆角矩形样式
            const r = sw * 0.25
            drawRoundedRect(ctx, sx, sy, sw, sh, r)
            ctx.fill()
          } else if (props.dotType === 'liquid') {
            // 液态连接样式
            const r = sw * 0.5
            const top = hasModule(row - 1, col)
            const bottom = hasModule(row + 1, col)
            const left = hasModule(row, col - 1)
            const right = hasModule(row, col + 1)

            // 根据邻居决定圆角大小
            const tl = !top && !left ? r : 0
            const tr = !top && !right ? r : 0
            const br = !bottom && !right ? r : 0
            const bl = !bottom && !left ? r : 0

            drawRoundedRect(ctx, sx, sy, sw, sh, [tl, tr, br, bl])
            ctx.fill()
          } else {
            // 默认方块样式
            ctx.fillRect(sx, sy, sw, sh)
          }
        }
      }
    }

    // 绘制 Logo（如果存在）
    if (props.logo) {
      try {
        await drawLogo(ctx)
      } catch (err) {
        console.error('Logo draw failed:', err)
        emit('error', err)
      }
    }

    // 非微信平台需要手动触发绘制
    // #ifndef MP-WEIXIN
    ctx.draw(true)
    // #endif
  } catch (error) {
    emit('error', error)
  }
}

/**
 * 点击事件处理
 * @param {Event} e - 点击事件对象
 */
function onClick(e: Event) {
  emit('click', e)
}

/**
 * 绘制圆角矩形路径
 * @param {any} ctx - Canvas 上下文
 * @param {number} x - 左上角 x 坐标
 * @param {number} y - 左上角 y 坐标
 * @param {number} w - 宽度
 * @param {number} h - 高度
 * @param {number|number[]} r - 圆角半径，可以是单个值或四个值数组 [tl, tr, br, bl]
 */
function drawRoundedRect(ctx: any, x: number, y: number, w: number, h: number, r: number | number[]) {
  const [tl, tr, br, bl] = Array.isArray(r) ? r : [r, r, r, r]
  ctx.beginPath()
  ctx.moveTo(x + tl, y)
  ctx.lineTo(x + w - tr, y)
  ctx.arc(x + w - tr, y + tr, tr, 1.5 * Math.PI, 0)
  ctx.lineTo(x + w, y + h - br)
  ctx.arc(x + w - br, y + h - br, br, 0, 0.5 * Math.PI)
  ctx.lineTo(x + bl, y + h)
  ctx.arc(x + bl, y + h - bl, bl, 0.5 * Math.PI, Math.PI)
  ctx.lineTo(x, y + tl)
  ctx.arc(x + tl, y + tl, tl, Math.PI, 1.5 * Math.PI)
  ctx.closePath()
}

/**
 * 通用图片绘制函数
 * @param {any} ctx - Canvas 上下文
 * @param {string} src - 图片路径
 * @param {number} x - 绘制位置 x
 * @param {number} y - 绘制位置 y
 * @param {number} w - 绘制宽度
 * @param {number} h - 绘制高度
 * @returns {Promise<void>}
 */
async function drawImage(ctx: any, src: string, x: number, y: number, w: number, h: number): Promise<void> {
  // #ifdef MP-WEIXIN
  // 微信小程序优先使用 createImage
  if (canvasNode.value && canvasNode.value.createImage) {
    try {
      await drawImageWithCreateImage(ctx, src, x, y, w, h)
      return
    } catch (err) {
      console.warn('createImage failed, try fallback:', err)
    }
  }
  // #endif

  // 备选方案：使用 uni.getImageInfo
  try {
    await drawImageWithGetImageInfo(ctx, src, x, y, w, h)
  } catch (err) {
    console.warn('getImageInfo failed:', err)
    // 最终备选：直接绘制（可能失败）
    ctx.drawImage(src, x, y, w, h)
    // #ifndef MP-WEIXIN
    ctx.draw(true)
    // #endif
  }
}

/**
 * 绘制 Logo 主函数
 * 包含背景、边框和 Logo 图片的绘制
 * @param {any} ctx - Canvas 上下文
 * @returns {Promise<void>}
 */
async function drawLogo(ctx: any): Promise<void> {
  // 计算 Logo 尺寸和位置（居中）
  const logoWidth = props.logoWidth || props.size * 0.2
  const logoHeight = props.logoHeight || logoWidth
  const logoX = (props.size - logoWidth) / 2
  const logoY = (props.size - logoHeight) / 2

  // #ifdef MP-WEIXIN
  // 微信小程序优先使用 createImage
  if (canvasNode.value && canvasNode.value.createImage) {
    try {
      await drawLogoWithCreateImage(ctx, logoX, logoY, logoWidth, logoHeight)
      return
    } catch (err) {
      console.warn('createImage failed, try fallback:', err)
    }
  }
  // #endif

  // 备选方案：使用 uni.getImageInfo
  try {
    await drawLogoWithGetImageInfo(ctx, logoX, logoY, logoWidth, logoHeight)
  } catch (err) {
    console.warn('getImageInfo failed:', err)
    // 最终备选：直接绘制
    try {
      drawLogoContent(ctx, props.logo, logoX, logoY, logoWidth, logoHeight)
      // #ifndef MP-WEIXIN
      ctx.draw(true)
      // #endif
    } catch (e) {
      console.error('Fallback draw failed:', e)
    }
  }
}

/**
 * 使用 Canvas 2D createImage 加载并绘制图片
 * @param {any} ctx - Canvas 上下文
 * @param {string} src - 图片路径
 * @param {number} x - 绘制位置 x
 * @param {number} y - 绘制位置 y
 * @param {number} w - 绘制宽度
 * @param {number} h - 绘制高度
 * @returns {Promise<void>}
 */
function drawImageWithCreateImage(ctx: any, src: string, x: number, y: number, w: number, h: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const canvas = toRaw(canvasNode.value)
    const img = canvas.createImage()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.drawImage(img, x, y, w, h)
      resolve()
    }
    img.onerror = (err: any) => reject(new Error(`Image load failed: ${err}`))

    handleImageSrc(img, src)
  })
}

/**
 * 使用 uni.getImageInfo 加载并绘制图片
 * @param {any} ctx - Canvas 上下文
 * @param {string} src - 图片路径
 * @param {number} x - 绘制位置 x
 * @param {number} y - 绘制位置 y
 * @param {number} w - 绘制宽度
 * @param {number} h - 绘制高度
 * @returns {Promise<void>}
 */
function drawImageWithGetImageInfo(ctx: any, src: string, x: number, y: number, w: number, h: number): Promise<void> {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: src,
      success: (res) => {
        ctx.drawImage(res.path, x, y, w, h)
        // #ifndef MP-WEIXIN
        ctx.draw(true)
        // #endif
        resolve()
      },
      fail: reject
    })
  })
}

/**
 * 处理图片路径，区分本地文件、网络文件和 base64
 * @param {any} img - Image 对象
 * @param {string} src - 原始路径
 */
function handleImageSrc(img: any, src: string) {
  // 网络图片、临时文件、base64 直接使用
  if (src.startsWith('wxfile://') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    img.src = src
  } else {
    // #ifdef MP-WEIXIN
    // 检查是否为本地文件
    const fs = wx.getFileSystemManager()
    try {
      fs.accessSync(src)
      img.src = src
    } catch {
      // 非本地文件，尝试直接加载
      img.src = src
    }
    // #endif
    // #ifndef MP-WEIXIN
    img.src = src
    // #endif
  }
}

/**
 * 使用 createImage 绘制 Logo（包含背景和边框）
 * @param {any} ctx - Canvas 上下文
 * @param {number} x - Logo 位置 x
 * @param {number} y - Logo 位置 y
 * @param {number} w - Logo 宽度
 * @param {number} h - Logo 高度
 * @returns {Promise<void>}
 */
function drawLogoWithCreateImage(ctx: any, x: number, y: number, w: number, h: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const canvas = toRaw(canvasNode.value)
    const img = canvas.createImage()

    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        drawLogoContent(ctx, img, x, y, w, h)
        resolve()
      } catch (err) {
        reject(err)
      }
    }

    img.onerror = (err: any) => {
      reject(new Error(`Image load failed: ${err}`))
    }

    handleImageSrc(img, props.logo)
  })
}

/**
 * 绘制 Logo 内容（背景、边框、图片）
 * @param {any} ctx - Canvas 上下文
 * @param {any} img - Image 对象或路径
 * @param {number} x - 位置 x
 * @param {number} y - 位置 y
 * @param {number} w - 宽度
 * @param {number} h - 高度
 */
function drawLogoContent(ctx: any, img: any, x: number, y: number, w: number, h: number) {
  // Logo 背景区域（包含 padding）
  const padding = 4
  const boxX = x - padding
  const boxY = y - padding
  const boxW = w + padding * 2
  const boxH = h + padding * 2
  const radius = props.logoRadius || 0
  const borderW = props.logoBorderWidth || 0
  const bgColor = props.logoBackgroundColor || '#ffffff'
  const borderColor = props.logoBorderColor || 'transparent'

  // 绘制背景
  if (bgColor || borderW > 0) {
    drawRoundedRect(ctx, boxX, boxY, boxW, boxH, radius)
    if (bgColor) {
      ctx.fillStyle = bgColor
      ctx.fill()
    }
    if (borderW > 0) {
      ctx.lineWidth = borderW
      ctx.strokeStyle = borderColor
      ctx.stroke()
    }
  }

  // 绘制 Logo 图片，使用 clip 实现圆角裁剪
  ctx.save()
  if (radius > 0) {
    // 裁剪区域为图片区域，圆角大小根据外框圆角和 padding 计算，保持同心圆效果
    const innerRadius = Math.max(0, radius - padding)
    drawRoundedRect(ctx, x, y, w, h, innerRadius)
    ctx.clip()
  }
  ctx.drawImage(img, x, y, w, h)
  ctx.restore()
}

/**
 * 使用 getImageInfo 绘制 Logo
 * @param {any} ctx - Canvas 上下文
 * @param {number} x - Logo 位置 x
 * @param {number} y - Logo 位置 y
 * @param {number} w - Logo 宽度
 * @param {number} h - Logo 高度
 * @returns {Promise<void>}
 */
function drawLogoWithGetImageInfo(ctx: any, x: number, y: number, w: number, h: number): Promise<void> {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: props.logo,
      success: (res) => {
        try {
          drawLogoContent(ctx, res.path, x, y, w, h)
          // #ifndef MP-WEIXIN
          ctx.draw(true)
          // #endif
          resolve()
        } catch (e) {
          reject(e)
        }
      },
      fail: reject
    })
  })
}

/**
 * 导出二维码图片
 * @returns {Promise<string>} 图片临时路径
 */
function exportImage(): Promise<string> {
  return new Promise((resolve, reject) => {
    const options: any = {
      canvasId: canvasId.value,
      width: props.size,
      height: props.size,
      // 导出高清图
      destWidth: props.size * pixelRatio.value,
      destHeight: props.size * pixelRatio.value,
      success: (res: any) => {
        resolve(res.tempFilePath)
      },
      fail: (err: any) => {
        console.error('exportImage fail:', err)
        reject(err)
      }
    }

    // #ifdef MP-WEIXIN
    // 微信小程序 Canvas 2D 需要传入 canvas 节点
    if (canvasNode.value) {
      options.canvas = toRaw(canvasNode.value)
    }
    // #endif

    uni.canvasToTempFilePath(options, instance)
  })
}

// 暴露方法给父组件
defineExpose({
  exportImage
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
