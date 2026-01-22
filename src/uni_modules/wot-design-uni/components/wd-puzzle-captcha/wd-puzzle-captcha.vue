<template>
  <view class="wd-puzzle-captcha" :class="rootClass" :style="props.customStyle">
    <view class="wd-puzzle-captcha__header">
      <view class="wd-puzzle-captcha__profile">
        <text class="wd-puzzle-captcha__title">{{ titleText }}</text>
        <text class="wd-puzzle-captcha__description">{{ descriptionText }}</text>
      </view>

      <view class="wd-puzzle-captcha__actions">
        <view v-if="refreshVisible" class="wd-puzzle-captcha__action" @tap="refresh()">
          <wd-icon name="refresh"></wd-icon>
        </view>

        <view v-if="props.closable" class="wd-puzzle-captcha__action" @tap="close()">
          <wd-icon name="close"></wd-icon>
        </view>
      </view>
    </view>

    <view class="wd-puzzle-captcha__operation" :class="operationClass">
      <view class="wd-puzzle-captcha__main" :style="mainStyle">
        <image v-if="state.image" class="wd-puzzle-captcha__image" :src="state.image"></image>

        <image v-if="state.puzzle" class="wd-puzzle-captcha__puzzle" :style="puzzleStyle" :src="state.puzzle"></image>

        <view v-if="innerLoading || state.status === 'error'" class="wd-puzzle-captcha__mask">
          <wd-loading v-if="innerLoading"></wd-loading>

          <wd-icon v-else name="close-circle"></wd-icon>
        </view>

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
              <wd-icon :name="innerTrackerIcon"></wd-icon>
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
import WdLoading from '../wd-loading/wd-loading.vue'
import type { PuzzleCaptchaStatus, PuzzleCaptchaExpose, PuzzleCaptchaTrackItem, PuzzleCaptchaShape } from './types'
import { puzzleCaptchaProps } from './types'

type Coordinate = [number, number]
type CanvasImage = HTMLImageElement | UniApp.GetImageInfoSuccessData

const props = defineProps(puzzleCaptchaProps)

const emit = defineEmits(['update-image', 'success', 'fail', 'close'])

const instance = getCurrentInstance()!

const touch = reactive(useTouch())

const { translate } = useTranslate('puzzleCaptcha')

// 拼图边界
const PUZZLE_BOUNDARY = 8
// 拼图间距
const PUZZLE_SPACING = 10
// 拼图边框大小
const PUZZLE_BORDER_WIDTH = 1

// 失败动画时长
const FAIL_DURATION = 400
// 重置动画时长
const RESET_DURATION = 300

const canvasId = `canvas-${uuid()}`
const trackId = `track-${uuid()}`
const trackerId = `tracker-${uuid()}`

const state = reactive({
  // 状态
  status: 'loading' as PuzzleCaptchaStatus,
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
  tracks: [] as PuzzleCaptchaTrackItem[],
  // 失败次数
  failCount: 0
}

const canvasState = {
  node: null as any,
  context: null as UniApp.CanvasContext | null
}

const innerLoading = computed(() => {
  return props.loading || state.status === 'loading'
})

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
    width: addUnit(props.puzzleWidth),
    height: addUnit(props.puzzleHeight),
    transform: `translate3d(${state.puzzleX}px, ${state.puzzleY}px, 0)`,
    transition: state.resetting ? `transform ${RESET_DURATION}ms ease-in` : 'none'
  }
})

const trackerStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate3d(${state.trackerX}px, 0, 0)`,
    transition: state.resetting ? `transform ${RESET_DURATION}ms ease-in` : 'none'
  }
})

const innerTrackerIcon = computed(() => {
  return state.status === 'success' ? props.successIcon : props.trackerIcon
})

const refreshVisible = computed(() => {
  if (props.refreshable === false) {
    return false
  }

  return state.status !== 'success'
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

  const sw = width - PUZZLE_BORDER_WIDTH * 2
  const sh = height - PUZZLE_BORDER_WIDTH * 2

  const tl: Coordinate = [x + PUZZLE_BORDER_WIDTH, y + PUZZLE_BORDER_WIDTH]
  const tr: Coordinate = [x + sw, y + PUZZLE_BORDER_WIDTH]
  const br: Coordinate = [x + sw, y + sh]
  const bl: Coordinate = [x + PUZZLE_BORDER_WIDTH, y + sh]

  switch (shape) {
    case 'puzzle': {
      const radius = Math.min(sw, sh) / 3 / 2

      const sw2 = sw - radius
      const sh2 = sh - radius

      const tl2: Coordinate = [tl[0], tl[1] + radius]
      const tr2: Coordinate = [tr[0] - radius, tr[1] + radius]
      const br2: Coordinate = [br[0] - radius, br[1]]
      const bl2: Coordinate = [bl[0], bl[1]]

      const tw = (sw2 - radius * 2) / 2
      const th = (sh2 - radius * 2) / 2

      context.moveTo(tl2[0], tl2[1])
      context.lineTo(tl2[0] + tw, tl2[1])
      context.arc((tl2[0] + tr2[0]) / 2, tl2[1], radius, Math.PI, 0)
      context.lineTo(tr2[0], tr2[1])
      context.lineTo(tr2[0], tr2[1] + th)
      context.arc(tr2[0], (tr2[1] + br2[1]) / 2, radius, -Math.PI / 2, Math.PI / 2)
      context.lineTo(br2[0], br2[1])
      context.lineTo(bl2[0], bl2[1])
      context.lineTo(bl2[0], bl2[1] - th)
      context.arc(bl2[0], (tl2[1] + bl2[1]) / 2, radius, Math.PI / 2, -Math.PI / 2, true)
      break
    }
    case 'shield': {
      const dt = sh * 0.2

      /* eslint-disable prettier/prettier */
      context.moveTo(tl[0], tl[1] + dt)
      context.quadraticCurveTo(
        (tl[0] + (tl[0] + tr[0]) / 2) / 2 + dt * 0.3,
        (tl[1] + dt + tl[1]) / 2 + dt * 0.3,
        (tl[0] + tr[0]) / 2,
        tl[1]
      )
      context.quadraticCurveTo(
        (tr[0] + (tl[0] + tr[0]) / 2) / 2 - dt * 0.3,
        (tr[1] + dt + tl[1]) / 2 + dt * 0.3,
        tr[0],
        tr[1] + dt
      )
      context.quadraticCurveTo(
        (tr[0] + (bl[0] + br[0]) / 2) / 2 + dt,
        (tr[1] + dt + br[1]) / 2 + dt,
        (bl[0] + br[0]) / 2,
        br[1]
      )
      context.quadraticCurveTo(
        (tl[0] + (bl[0] + br[0]) / 2) / 2 - dt,
        (tl[1] + dt + br[1]) / 2 + dt,
        tl[0],
        tl[1] + dt
      )
      /* eslint-enable prettier/prettier */
      break
    }
    case 'rect': {
      context.rect(tl[0], tl[1], sw, sh)
      break
    }
    case 'triangle': {
      context.moveTo(tl[0] + sw / 2, tl[1])
      context.lineTo(br[0], br[1])
      context.lineTo(bl[0], bl[1])
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
  if (clip) {
    context.setShadow(0, 0, 4, 'rgba(0, 0, 0, 0.4)')
  }
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
  const minX = puzzleWidth + PUZZLE_BOUNDARY * 2
  const minY = PUZZLE_BOUNDARY
  const maxX = imageWidth - puzzleWidth - PUZZLE_BOUNDARY * 2
  const maxY = imageHeight - puzzleHeight - PUZZLE_BOUNDARY * 2

  if (exclude == null) {
    // eslint-disable-next-line prettier/prettier
    return [
      Math.floor(Math.random() * (maxX - minX) + minX),
      Math.floor(Math.random() * (maxY - minY) + minY)
    ]
  }

  const [exX, exY] = exclude

  const ranges: [number, number][] = []

  if (exY - PUZZLE_SPACING > minY) {
    ranges.push([minY, exY - PUZZLE_SPACING])
  }
  if (exY + PUZZLE_SPACING < maxY) {
    ranges.push([exY + PUZZLE_SPACING, maxY])
  }

  const areas: { x0: number; y0: number; x1: number; y1: number }[] = []

  for (const [y0, y1] of ranges) {
    const overlapY = y0 < exY + puzzleHeight + PUZZLE_SPACING && y1 > exY - PUZZLE_SPACING

    if (!overlapY) {
      areas.push({ x0: minX, x1: maxX, y0, y1 })
    } else {
      const leftX = exX - PUZZLE_SPACING
      const rightX = exX + puzzleWidth + PUZZLE_SPACING

      if (leftX > minX) {
        areas.push({ x0: minX, x1: leftX, y0, y1 })
      }
      if (rightX < maxX) {
        areas.push({ x0: rightX, x1: maxX, y0, y1 })
      }
    }
  }

  const candidates = areas
    .map((item) => ({
      ...item,
      w: item.x1 - item.x0,
      h: item.y1 - item.y0
    }))
    .filter((item) => item.w > 0 && item.h > 0)

  if (candidates.length === 0) {
    return [minX, minY]
  }

  const total = candidates.reduce((sum, item) => sum + item.w * item.h, 0)

  let r = Math.random() * total

  for (const item of candidates) {
    const area = item.w * item.h

    if (r < area) {
      // eslint-disable-next-line prettier/prettier
      return [
        Math.floor(item.x0 + Math.random() * item.w),
        Math.floor(item.y0 + Math.random() * item.h)
      ]
    }

    r -= area
  }

  return [minX, minY]
}

async function generate() {
  if (!props.imageUrl) {
    return
  }

  state.status = 'loading'

  try {
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
      x: shallowState.puzzle[0],
      y: shallowState.puzzle[1],
      width: puzzleWidth,
      height: puzzleHeight,
      quality: 1
    })
    state.puzzle = puzzlePath

    state.status = 'pending'
  } catch (error) {
    console.error('[wot ui] error(wd-puzzle-captcha): failed to generate puzzle', error)

    state.status = 'error'
  }
}

function verifyTouchTracks(tracks: PuzzleCaptchaTrackItem[]) {
  if (tracks.length < 3) {
    // 轨迹点过少
    return false
  }

  const first = tracks[0]
  const last = tracks[tracks.length - 1]

  if (first.type !== 'down' || last.type !== 'up') {
    // 轨迹结构异常
    return false
  }

  const duration = last.t - first.t

  if (duration < 200) {
    // 操作耗时过短
    return false
  }

  const moves = tracks.slice(1, -1)

  if (new Set(moves.map((item) => Math.round(item.y))).size <= 2) {
    // Y 轴几乎无变化
    return false
  }

  const deltas = moves.slice(1).map((item, index) => Math.abs(item.y - moves[index].y))
  const average = deltas.reduce((s, d) => s + d, 0) / deltas.length

  const variance = deltas.reduce((s, d) => s + Math.pow(d - average, 2), 0) / deltas.length

  if (variance < 0.01) {
    // Y 轴变化方差过小
    return false
  }

  return true
}

function verify() {
  state.status = 'verifying'

  if (props.strictMode) {
    if (!verifyTouchTracks(shallowState.tracks)) {
      fail()
      return
    }
  }

  if (Math.abs(state.puzzleX - shallowState.puzzle[0]) <= parseNumber(props.tolerance)) {
    success()
  } else {
    fail()
  }
}

function success() {
  emit('success')

  state.status = 'success'

  shallowState.failCount = 0
}

function fail() {
  emit('fail')

  state.status = 'fail'

  shallowState.failCount += 1

  setTimeout(() => {
    if (shallowState.failCount >= parseNumber(props.retryCount)) {
      shallowState.failCount = 0
      reset(true)
    } else {
      reset()
    }
  }, FAIL_DURATION)
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

function refresh() {
  if (innerLoading.value) {
    return
  }

  reset(true)
}

function onTouchStart(event: TouchEvent) {
  if (props.disabled || state.status !== 'pending' || innerLoading.value || state.resetting) {
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
  if (props.disabled || state.status !== 'dragging' || innerLoading.value || state.resetting) {
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
  if (props.disabled || state.status !== 'dragging' || innerLoading.value || state.resetting) {
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

function close() {
  emit('close')
}

watch(
  // eslint-disable-next-line prettier/prettier
  () => [
    props.imageUrl,
    props.imageWidth,
    props.imageHeight,
    props.puzzleShape,
    props.puzzleWidth,
    props.puzzleHeight,
    props.decoyMode
  ],
  async () => {
    await generate()
    reset()
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
