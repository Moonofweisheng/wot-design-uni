<template>
  <view class="wd-puzzle-captcha" :class="rootClass" :style="props.customStyle">
    <view class="wd-puzzle-captcha__header">
      <text class="wd-puzzle-captcha__title">{{ titleText }}</text>
      <text class="wd-puzzle-captcha__description">{{ descriptionText }}</text>
    </view>

    <view class="wd-puzzle-captcha__operation" :class="operationClass">
      <view class="wd-puzzle-captcha__main" :style="mainStyle">
        <image v-if="state.image" class="wd-puzzle-captcha__image" :src="state.image"></image>

        <image v-if="state.puzzle" class="wd-puzzle-captcha__puzzle" :style="puzzleStyle" :src="state.puzzle"></image>

        <!-- #ifdef MP-WEIXIN -->
        <canvas :id="canvasId" class="wd-puzzle-captcha__canvas" :style="canvasStyle" type="2d"></canvas>
        <!-- #endif -->

        <!-- #ifndef MP-WEIXIN -->
        <canvas :id="canvasId" class="wd-puzzle-captcha__canvas" :style="canvasStyle" :canvas-id="canvasId"></canvas>
        <!-- #endif -->
      </view>

      <view class="wd-puzzle-captcha__footer">
        <view class="wd-puzzle-captcha__track">
          <view :id="trackId" class="wd-puzzle-captcha__track__inner">
            <view
              :id="trackerId"
              class="wd-puzzle-captcha__tracker"
              :style="trackerStyle"
              @touchstart.prevent="onTouchStart"
              @touchmove.prevent="onTouchMove"
              @touchend="onTouchEnd"
            >
              <wd-icon :name="props.trackerIcon"></wd-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, reactive, getCurrentInstance, onMounted, watch } from 'vue'
// #ifdef MP-WEIXIN
import { canvas2dAdapter } from '../common/canvasHelper'
// #endif
import { addUnit, uuid, getRect, getSystemInfo } from '../common/util'
import { useTouch, useTranslate } from '../composables'
import WdIcon from '../wd-icon/wd-icon.vue'
import type { PuzzleCaptchaStatus, PuzzleCaptchaExpose, PuzzleCaptchaTrackItem, PuzzleCaptchaShape } from './types'
import { puzzleCaptchaProps } from './types'

type Coordinate = [number, number]
type CanvasImage = HTMLImageElement | UniApp.GetImageInfoSuccessData

const props = defineProps(puzzleCaptchaProps)

const emit = defineEmits(['update-image', 'success', 'fail'])

const instance = getCurrentInstance()!

const touch = reactive(useTouch())

const { translate } = useTranslate('puzzleCaptcha')

const PUZZLE_BOUNDARY = 8
const PUZZLE_SPACING = 10
const PUZZLE_BORDER_WIDTH = 1

const RESET_DURATION = 300

const canvasId = `canvas-${uuid()}`
const trackId = `track-${uuid()}`
const trackerId = `tracker-${uuid()}`

const state = reactive({
  // 状态
  status: 'pending' as PuzzleCaptchaStatus,
  // 背景图片
  image: null as string | null,
  // 拼图图片
  puzzle: null as string | null,
  // 拼图 X 坐标
  puzzleX: PUZZLE_BOUNDARY,
  // 拼图 Y 坐标
  puzzleY: 0,
  // 滑块 X 坐标
  trackerX: 0,
  // 是否正在重置
  resetting: false
})

const shallowState = {
  // 拼图缺口坐标
  puzzle: [0, 0] as Coordinate,
  // 滑块轨道宽度
  trackWidth: 0,
  // 滑块宽度
  trackerWidth: 0,
  // 滑动行为记录
  tracks: [] as PuzzleCaptchaTrackItem[]
}

const canvasState = {
  node: null as any,
  context: null as UniApp.CanvasContext | null
}

const rootClass = computed(() => {
  return [
    {
      [`is-${state.status}`]: true,
      'is-disabled': props.disabled
    },
    props.customClass
  ]
})

const operationClass = computed(() => {
  return {
    'is-shake': state.status === 'fail'
  }
})

const mainStyle = computed<CSSProperties>(() => {
  return {
    width: addUnit(props.imageWidth),
    height: addUnit(props.imageHeight)
  }
})

const canvasStyle = computed<CSSProperties>(() => {
  return {
    width: addUnit(props.imageWidth),
    height: addUnit(props.imageHeight)
  }
})

const puzzleStyle = computed<CSSProperties>(() => {
  return {
    width: addUnit(parseNumber(props.puzzleWidth) + PUZZLE_BORDER_WIDTH * 2),
    height: addUnit(parseNumber(props.puzzleHeight) + PUZZLE_BORDER_WIDTH * 2),
    transform: `translate3d(${state.puzzleX - PUZZLE_BORDER_WIDTH}px, ${state.puzzleY - PUZZLE_BORDER_WIDTH}px, 0)`,
    transition: state.resetting ? `transform ${RESET_DURATION}ms ease-in` : 'none'
  }
})

const trackerStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate3d(${state.trackerX}px, 0, 0)`,
    transition: state.resetting ? `transform ${RESET_DURATION}ms ease-in` : 'none'
  }
})

const titleText = computed(() => {
  return props.title || translate('title')
})

const placeholderText = computed(() => {
  return props.placeholder || translate('placeholder')
})

const innerSuccessText = computed(() => {
  return props.successText || translate('successText')
})

const innerFailText = computed(() => {
  return props.failText || translate('failText')
})

const descriptionText = computed(() => {
  switch (state.status) {
    case 'success':
      return innerSuccessText.value
    case 'fail':
      return innerFailText.value
    default:
      return placeholderText.value
  }
})

function parseNumber(value: number | string) {
  return Number(value)
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max))
}

function updateRect() {
  Promise.all([getRect(`#${trackId}`, false, instance.proxy), getRect(`#${trackerId}`, false, instance.proxy)]).then(([track, tracker]) => {
    shallowState.trackWidth = track.width || 0
    shallowState.trackerWidth = tracker.width || 0
  })
}

function getCanvasContext(): Promise<UniApp.CanvasContext> {
  return new Promise((resolve) => {
    const dpr = getSystemInfo().pixelRatio

    // #ifdef MP-WEIXIN
    getRect(`#${canvasId}`, false, instance.proxy, true).then((res) => {
      // @ts-expect-error whatever
      const { width, height, node } = res

      canvasState.node = node
      canvasState.context = canvas2dAdapter(node.getContext('2d'))

      canvasState.node.width = width! * dpr
      canvasState.node.height = height! * dpr
      canvasState.context.scale(dpr, dpr)

      resolve(canvasState.context)
    })
    // #endif

    // #ifndef MP-WEIXIN
    canvasState.node = null
    canvasState.context = uni.createCanvasContext(canvasId, instance.proxy)

    resolve(canvasState.context)
    // #endif
  })
}

function createCanvasImage(url: string): Promise<CanvasImage> {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    const image = canvasState.node!.createImage()
    image.src = url
    image.onload = () => {
      resolve(image)
    }
    image.onerror = reject
    // #endif

    // #ifndef MP-WEIXIN
    uni.getImageInfo({
      src: url,
      success(res) {
        resolve(res)
      },
      fail: reject
    })
    // #endif
  })
}

function drawCanvasImage(
  context: UniApp.CanvasContext,
  image: CanvasImage,
  objectFit: 'scaleToFill' | 'aspectFill',
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number
) {
  if (objectFit === 'aspectFill') {
    const aw = (dw * sh) / dh
    const ah = (dh * sw) / dw

    if ((sw <= sh && sh >= ah) || (sw > sh && sw < aw)) {
      const tw = sw
      const th = ah
      const tx = 0
      const ty = (sh - th) / 2

      // @ts-expect-error whatever
      context.drawImage(image.path || image, tx, ty, tw, th, dx, dy, dw, dh)
    } else {
      const tw = aw
      const th = sh
      const tx = (sw - tw) / 2
      const ty = 0

      // @ts-expect-error whatever
      context.drawImage(image.path || image, tx, ty, tw, th, dx, dy, dw, dh)
    }
    return
  }

  // @ts-expect-error whatever
  context.drawImage(image.path || image, sx, sy, sw, sh, dx, dy, dw, dh)
}

function drawCanvasPuzzle(
  context: UniApp.CanvasContext,
  x: number,
  y: number,
  width: number,
  height: number,
  shape: PuzzleCaptchaShape,
  clip: boolean,
  afterClip?: () => void
) {
  context.save()

  context.beginPath()

  // FIXME 图形绘制不正确
  switch (shape) {
    case 'puzzle': {
      const radius = Math.min(width, height) / 4
      context.moveTo(x, y + radius)
      context.arcTo(x, y, x + radius, y, radius)
      context.lineTo(x + width - radius, y)
      context.arcTo(x + width, y, x + width, y + radius, radius)
      context.lineTo(x + width, y + height - radius)
      context.arcTo(x + width, y + height, x + width - radius, y + height, radius)
      context.lineTo(x + radius, y + height)
      context.arcTo(x, y + height, x, y + height - radius, radius)
      break
    }
    case 'rect': {
      context.rect(x, y, width, height)
      break
    }
    case 'triangle': {
      context.moveTo(x + width / 2, y)
      context.lineTo(x + width, y + height)
      context.lineTo(x, y + height)
      break
    }
    case 'shield': {
      const midX = x + width / 2
      context.moveTo(x, y)
      context.lineTo(x + width, y)
      context.lineTo(midX + width / 4, y + height * 0.75)
      context.quadraticCurveTo(midX, y + height, midX - width / 4, y + height * 0.75)
      context.lineTo(x, y + height * 0.75)
      break
    }
  }

  context.closePath()

  if (!clip) {
    context.setFillStyle('rgba(0, 0, 0, 0.4)')
    context.fill()
  }

  context.setLineWidth(PUZZLE_BORDER_WIDTH)
  context.setStrokeStyle('#ffffff')
  context.stroke()

  if (clip) {
    context.clip()
  }

  if (typeof afterClip === 'function') {
    afterClip()
  }

  context.restore()
}

function drawCanvas(context: UniApp.CanvasContext): Promise<void> {
  return new Promise((resolve) => {
    context.draw(false, () => {
      resolve()
    })
  })
}

function createPuzzle(imageWidth: number, imageHeight: number, puzzleWidth: number, puzzleHeight: number, exclude?: Coordinate): Coordinate {
  const limit = {
    t: PUZZLE_BOUNDARY,
    r: imageWidth - puzzleWidth - PUZZLE_BOUNDARY * 2,
    b: imageHeight - puzzleHeight - PUZZLE_BOUNDARY * 2,
    l: puzzleWidth + PUZZLE_BOUNDARY * 2
  }

  if (exclude == null) {
    // eslint-disable-next-line prettier/prettier
    return [
      Math.floor(Math.random() * (limit.r - limit.l) + limit.l),
      Math.floor(Math.random() * (limit.b - limit.t) + limit.t)
    ]
  }

  const [exX, exY] = exclude

  const ban = {
    t: Math.max(limit.t, exY - PUZZLE_SPACING),
    r: Math.min(limit.r, exX + puzzleWidth + PUZZLE_SPACING),
    b: Math.min(limit.b, exY + puzzleHeight + PUZZLE_SPACING),
    l: Math.max(limit.l, exX - PUZZLE_SPACING)
  }

  const areas = [
    { x: limit.l, y: limit.t, w: limit.r - limit.l, h: ban.t - limit.t },
    { x: ban.r, y: ban.t, w: limit.r - ban.r, h: ban.b - ban.t },
    { x: limit.l, y: ban.b, w: limit.r - limit.l, h: limit.b - ban.b },
    { x: limit.l, y: ban.t, w: ban.l - limit.l, h: ban.b - ban.t }
  ].filter((a) => a.w > puzzleWidth && a.h > puzzleHeight)

  const total = areas.reduce((s, a) => s + a.w * a.h, 0)

  let r = Math.random() * total

  for (const a of areas) {
    const area = a.w * a.h

    if (r <= area) {
      // eslint-disable-next-line prettier/prettier
      return [
        Math.floor(a.x + Math.random() * a.w),
        Math.floor(a.y + Math.random() * a.h)
      ]
    }

    r -= area
  }

  return [limit.l, limit.t]
}

async function generate() {
  if (!props.imageUrl) {
    return
  }

  const context = await getCanvasContext()

  const imageWidth = parseNumber(props.imageWidth)
  const imageHeight = parseNumber(props.imageHeight)

  context.clearRect(0, 0, imageWidth, imageHeight)

  const image = await createCanvasImage(props.imageUrl)
  drawCanvasImage(context, image, 'aspectFill', 0, 0, image.width, image.height, 0, 0, imageWidth, imageHeight)

  const puzzleWidth = parseNumber(props.puzzleWidth)
  const puzzleHeight = parseNumber(props.puzzleHeight)

  shallowState.puzzle = createPuzzle(imageWidth, imageHeight, puzzleWidth, puzzleHeight)

  state.puzzleX = PUZZLE_BOUNDARY
  state.puzzleY = shallowState.puzzle[1]

  drawCanvasPuzzle(context, shallowState.puzzle[0], shallowState.puzzle[1], puzzleWidth, puzzleHeight, props.puzzleShape, false)

  if (props.decoyMode) {
    const decoy = createPuzzle(imageWidth, imageHeight, puzzleWidth, puzzleHeight, shallowState.puzzle)

    drawCanvasPuzzle(context, decoy[0], decoy[1], puzzleWidth, puzzleHeight, props.puzzleShape, false)
  }

  await drawCanvas(context)

  const { tempFilePath: imagePath } = await uni.canvasToTempFilePath({
    canvasId: canvasId,
    canvas: canvasState.node,
    quality: 1
  })
  state.image = imagePath

  context.clearRect(0, 0, imageWidth, imageHeight)

  drawCanvasPuzzle(context, shallowState.puzzle[0], shallowState.puzzle[1], puzzleWidth, puzzleHeight, props.puzzleShape, true, () => {
    drawCanvasImage(context, image, 'aspectFill', 0, 0, image.width, image.height, 0, 0, imageWidth, imageHeight)
  })

  await drawCanvas(context)

  const { tempFilePath: puzzlePath } = await uni.canvasToTempFilePath({
    canvasId: canvasId,
    canvas: canvasState.node,
    x: shallowState.puzzle[0] - PUZZLE_BORDER_WIDTH,
    y: shallowState.puzzle[1] - PUZZLE_BORDER_WIDTH,
    width: puzzleWidth + PUZZLE_BORDER_WIDTH * 2,
    height: puzzleHeight + PUZZLE_BORDER_WIDTH * 2,
    quality: 1
  })
  state.puzzle = puzzlePath
}

function verify() {
  state.status = 'verifying'

  // TODO 校验拼图是否正确
}

function reset(update = false) {
  if (update) {
    emit('update-image')
  }

  state.status = 'pending'
  state.puzzleX = PUZZLE_BOUNDARY
  state.trackerX = 0
  state.resetting = true

  setTimeout(() => {
    state.resetting = false
  }, RESET_DURATION)
}

function onTouchStart(event: TouchEvent) {
  if (props.disabled || state.status !== 'pending' || state.resetting) {
    return
  }

  touch.touchStart(event)

  state.status = 'dragging'

  updateRect()

  shallowState.tracks = []

  if (props.strictMode) {
    shallowState.tracks.push({
      type: 'down',
      x: state.puzzleX,
      y: 0,
      t: Date.now()
    })
  }
}

function onTouchMove(event: TouchEvent) {
  if (props.disabled || state.status !== 'dragging' || state.resetting) {
    return
  }

  touch.touchMove(event)

  const trackerLimit = shallowState.trackWidth - shallowState.trackerWidth
  const puzzleLimit = parseNumber(props.imageWidth) - parseNumber(props.puzzleWidth) - PUZZLE_BOUNDARY * 2

  state.trackerX = clamp(touch.deltaX, 0, trackerLimit)
  state.puzzleX = PUZZLE_BOUNDARY + clamp(touch.deltaX * (puzzleLimit / trackerLimit), 0, puzzleLimit)

  if (props.strictMode) {
    shallowState.tracks.push({
      type: 'move',
      x: state.puzzleX,
      y: touch.deltaY,
      t: Date.now()
    })
  }
}

function onTouchEnd() {
  if (props.disabled || state.status !== 'dragging' || state.resetting) {
    return
  }

  if (props.strictMode) {
    shallowState.tracks.push({
      type: 'up',
      x: state.puzzleX,
      y: touch.deltaY,
      t: Date.now()
    })
  }

  verify()
}

watch(
  () => props.imageUrl,
  () => {
    generate()
  }
)

onMounted(() => {
  generate()
})

defineExpose<PuzzleCaptchaExpose>({
  reset
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
