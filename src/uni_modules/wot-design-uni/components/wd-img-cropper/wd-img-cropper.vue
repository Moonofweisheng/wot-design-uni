<template>
  <!-- 绘制的图片canvas -->
  <view v-if="modelValue" :class="`wd-img-cropper ${customClass}`" :style="customStyle" @touchmove="preventTouchMove">
    <!-- 展示在用户面前的裁剪框 -->
    <view class="wd-img-cropper__wrapper">
      <!-- 画出裁剪框 -->
      <view class="wd-img-cropper__cut">
        <!-- 上方阴影块 -->
        <view :class="`wd-img-cropper__cut--top ${IS_TOUCH_END ? '' : 'is-hightlight'}`" :style="`height: ${cutTop}px;`"></view>
        <view class="wd-img-cropper__cut--middle" :style="`height: ${cutHeight}px;`">
          <!-- 左侧阴影块 -->
          <view
            :class="`wd-img-cropper__cut--left ${IS_TOUCH_END ? '' : 'is-hightlight'}`"
            :style="`width: ${cutLeft}px; height: ${cutHeight}px;`"
          ></view>
          <!-- 裁剪框 -->
          <view class="wd-img-cropper__cut--body" :style="`width: ${cutWidth}px; height: ${cutHeight}px;`">
            <!-- 内部网格线 -->
            <view class="is-gridlines-x"></view>
            <view class="is-gridlines-y"></view>
            <!-- 裁剪窗体四个对角 -->
            <view class="is-left-top"></view>
            <view class="is-left-bottom"></view>
            <view class="is-right-top"></view>
            <view class="is-right-bottom"></view>
          </view>
          <!-- 右侧阴影块 -->
          <view :class="`wd-img-cropper__cut--right ${IS_TOUCH_END ? '' : 'is-hightlight'}`"></view>
        </view>

        <!-- 底部阴影块 -->
        <view :class="`wd-img-cropper__cut--bottom ${IS_TOUCH_END ? '' : 'is-hightlight'}`"></view>
      </view>
      <!-- 展示的传过来的图片: 控制图片的旋转角度(rotate)、缩放程度(imgScale)、移动位置(translate) -->
      <image
        :prop="isAnimation"
        :change:prop="animation ? animation.setAnimation : ''"
        class="wd-img-cropper__img"
        :src="imgSrc"
        :style="imageStyle"
        :lazy-load="false"
        @touchstart="handleImgTouchStart"
        @touchmove="handleImgTouchMove"
        @touchend="handleImgTouchEnd"
        @error="handleImgLoadError"
        @load="handleImgLoaded"
      />
    </view>
    <!-- 绘制的图片canvas -->
    <canvas
      :canvas-id="canvasId"
      :id="canvasId"
      class="wd-img-cropper__canvas"
      :disable-scroll="true"
      :style="`width: ${Number(canvasWidth) * canvasScale}px; height: ${Number(canvasHeight) * canvasScale}px;`"
    />
    <!-- 下方按钮 -->
    <view class="wd-img-cropper__footer">
      <wd-icon custom-class="wd-img-cropper__rotate" v-if="!disabledRotate" name="rotate" @click="handleRotate"></wd-icon>
      <view class="wd-img-cropper__footer--button">
        <view class="is-cancel" @click="handleCancel">{{ cancelButtonText || translate('cancel') }}</view>
        <wd-button size="small" :custom-style="buttonStyle" @click="handleConfirm">{{ confirmButtonText || translate('confirm') }}</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-img-cropper',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import wdButton from '../wd-button/wd-button.vue'
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { addUnit, objToStyle, uuid } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { imgCropperProps, type ImgCropperExpose } from './types'

const canvasId = ref<string>(`cropper${uuid()}`) // canvas 组件的唯一标识符

// 延时动画设置
let CHANGE_TIME: any | null = null
// 移动节流
let MOVE_THROTTLE: any | null = null
// 节流标志
let MOVE_THROTTLE_FLAG: boolean = true
// 图片设置尺寸,此值不变（记录最初设定的尺寸）
let INIT_IMGWIDTH: null | number | string = null
// 图片设置尺寸,此值不变（记录最初设定的尺寸）
let INIT_IMGHEIGHT: null | number | string = null
// 顶部裁剪框占比
const TOP_PERCENT = 0.85

const props = defineProps(imgCropperProps)
const emit = defineEmits(['imgloaded', 'imgloaderror', 'cancel', 'confirm', 'update:modelValue'])

const { translate } = useTranslate('img-cropper')

// 旋转角度
const imgAngle = ref<number>(0)
// 是否开启动画
const isAnimation = ref<boolean>(false)
// #ifdef MP-ALIPAY || APP-PLUS || H5
// hack 避免钉钉小程序、支付宝小程序、app抛出相关异常
const animation: any = null
// #endif

// 裁剪框的宽高
const picWidth = ref<number>(0)
const picHeight = ref<number>(0)
const cutWidth = ref<number>(0)
const cutHeight = ref<number>(0)
const offset = ref<number>(20)
// 裁剪框的距顶距左
const cutLeft = ref<number>(0)
const cutTop = ref<number>(0)
// canvas最终成像宽高
const canvasWidth = ref<string | number>('')
const canvasHeight = ref<string | number>('')
const canvasScale = ref<number>(2)
// 当前缩放大小
const imgScale = ref<number>(1)
// // 图片宽高
// imgWidth: null,
// imgHeight: null,
// 图片中心轴点距左的距离
const imgLeft = ref<number>(uni.getSystemInfoSync().windowWidth / 2)
const imgTop = ref<number>((uni.getSystemInfoSync().windowHeight / 2) * TOP_PERCENT)

const imgInfo = ref<UniApp.GetImageInfoSuccessData | null>(null)
const info = ref<UniApp.GetSystemInfoResult>(uni.getSystemInfoSync())

// 是否移动中设置 同时控制背景颜色是否高亮
const IS_TOUCH_END = ref<boolean>(true)
// 记录移动中的双指位置 [0][1]分别代表两根手指 [1]做待用参数
const movingPosRecord = ref<Record<string, string | number>[]>([
  {
    x: '',
    y: ''
  },
  {
    x: '',
    y: ''
  }
])
// 双指缩放时 两个坐标点斜边长度
const fingerDistance = ref<string | number>('')

const ctx = ref<UniApp.CanvasContext | null>(null)

const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      INIT_IMGWIDTH = props.imgWidth
      INIT_IMGHEIGHT = props.imgHeight
      info.value = uni.getSystemInfoSync()

      // 根据aspectRatio计算裁剪框尺寸
      const [widthRatio, heightRatio] = props.aspectRatio.split(':').map(Number)
      const tempCutWidth = info.value.windowWidth - offset.value * 2
      const tempCutHeight = (tempCutWidth * heightRatio) / widthRatio

      cutWidth.value = tempCutWidth
      cutHeight.value = tempCutHeight
      cutTop.value = (info.value.windowHeight * TOP_PERCENT - tempCutHeight) / 2
      cutLeft.value = offset.value

      canvasScale.value = props.exportScale
      canvasHeight.value = tempCutHeight
      canvasWidth.value = tempCutWidth

      // 根据开发者设置的图片目标尺寸计算实际尺寸
      initImageSize()
      // 初始化canvas
      initCanvas()
      // 加载图片
      props.imgSrc && loadImg()
    } else {
      resetImg()
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.imgSrc,
  (newValue) => {
    newValue && loadImg()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => imgAngle.value,
  (newValue) => {
    if (newValue % 90) {
      imgAngle.value = Math.round(newValue / 90) * 90
    }
  },
  {
    deep: true,
    immediate: true
  }
)
watch(
  () => isAnimation.value,
  (newValue) => {
    // 开启过渡300毫秒之后自动关闭
    CHANGE_TIME && clearTimeout(CHANGE_TIME)
    if (newValue) {
      CHANGE_TIME = setTimeout(() => {
        revertIsAnimation(false)
        clearTimeout(CHANGE_TIME)
      }, 300)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const buttonStyle = computed(() => {
  const style: Record<string, string | number> = {
    position: 'absolute',
    right: 0,
    // height: 32px;
    width: '56px',
    'border-radius': '16px',
    'font-size': '16px'
  }

  return objToStyle(style)
})

const imageStyle = computed(() => {
  const style: Record<string, string | number> = {
    width: picWidth.value ? addUnit(picWidth.value) : 'auto',
    height: picHeight.value ? addUnit(picHeight.value) : 'auto',
    transform: `translate(${addUnit(imgLeft.value - picWidth.value / 2)}, ${addUnit(imgTop.value - picHeight.value / 2)}) scale(${
      imgScale.value
    }) rotate(${imgAngle.value}deg)`,
    'transition-duration': (isAnimation.value ? 0.4 : 0) + 's'
  }
  return objToStyle(style)
})

/**
 * 逆转是否使用动画
 */
function revertIsAnimation(animation: boolean | { value: boolean }) {
  if (typeof animation === 'boolean') {
    isAnimation.value = animation
  } else {
    isAnimation.value = animation.value
  }
}

/**
 * 控制旋转角度
 * @param angle 角度
 */
function setRoate(angle: number) {
  if (!angle || props.disabledRotate) return
  revertIsAnimation(true)
  imgAngle.value = angle

  // 重新计算缩放比例
  let tempPicWidth = picWidth.value
  let tempPicHeight = picHeight.value

  // 旋转后宽高互换
  if ((angle / 90) % 2) {
    tempPicWidth = picHeight.value
    tempPicHeight = picWidth.value
  }

  // 计算新的缩放比例
  const widthRatio = cutWidth.value / tempPicWidth
  const heightRatio = cutHeight.value / tempPicHeight
  imgScale.value = Math.max(widthRatio, heightRatio)

  // 检测边缘位置
  detectImgPosIsEdge()
}

/**
 * 初始化图片的大小和角度以及距离
 */
function resetImg() {
  const { windowHeight, windowWidth } = uni.getSystemInfoSync()
  imgScale.value = 1
  imgAngle.value = 0
  imgLeft.value = windowWidth / 2
  imgTop.value = (windowHeight / 2) * TOP_PERCENT
}

/**
 *  加载图片资源文件，并初始化裁剪框内图片信息
 */
function loadImg() {
  if (!props.imgSrc) return

  uni.getImageInfo({
    src: props.imgSrc,
    success: (res) => {
      // 存储img图片信息
      imgInfo.value = res
      // 计算最后图片尺寸
      computeImgSize()
      // 初始化尺寸
      resetImg()
    },
    fail: () => {
      // this.setData({ imgSrc: '' })
    }
  })
}

/**
 *  设置图片尺寸，使其短边完全显示并填满裁剪框
 */
function computeImgSize() {
  let tempPicWidth: number = picWidth.value
  let tempPicHeight: number = picHeight.value

  if (!INIT_IMGHEIGHT && !INIT_IMGWIDTH) {
    // 计算图片与裁剪框的宽高比
    const imgRatio = imgInfo.value!.width / imgInfo.value!.height
    const cropRatio = cutWidth.value / cutHeight.value

    if (imgRatio > cropRatio) {
      // 图片更宽，以高度为准
      tempPicHeight = cutHeight.value
      tempPicWidth = tempPicHeight * imgRatio
    } else {
      // 图片更高，以宽度为准
      tempPicWidth = cutWidth.value
      tempPicHeight = tempPicWidth / imgRatio
    }
  } else if (INIT_IMGHEIGHT && !INIT_IMGWIDTH) {
    tempPicHeight = Number(INIT_IMGHEIGHT)
    tempPicWidth = (imgInfo.value!.width / imgInfo.value!.height) * tempPicHeight
  } else if ((!INIT_IMGHEIGHT && INIT_IMGWIDTH) || (INIT_IMGHEIGHT && INIT_IMGWIDTH)) {
    tempPicWidth = Number(INIT_IMGWIDTH)
    tempPicHeight = (imgInfo.value!.height / imgInfo.value!.width) * tempPicWidth
  }

  // 确保计算后的尺寸至少有一边等于裁剪框尺寸
  const widthRatio = cutWidth.value / tempPicWidth
  const heightRatio = cutHeight.value / tempPicHeight
  const scale = Math.max(widthRatio, heightRatio)

  picWidth.value = tempPicWidth
  picHeight.value = tempPicHeight
  // 设置初始缩放以适应裁剪框
  imgScale.value = scale
}

/**
 *  canvas 初始化
 */
function initCanvas() {
  if (!ctx.value) {
    ctx.value = uni.createCanvasContext(canvasId.value, proxy)
  }
}

/**
 *  图片初始化,处理宽高特殊单位
 */
function initImageSize() {
  // 处理宽高特殊单位 %>px
  if (INIT_IMGWIDTH && typeof INIT_IMGWIDTH === 'string' && INIT_IMGWIDTH.indexOf('%') !== -1) {
    const width: string = INIT_IMGWIDTH.replace('%', '')
    INIT_IMGWIDTH = (info.value.windowWidth / 100) * Number(width)
    picWidth.value = INIT_IMGWIDTH
  } else if (INIT_IMGWIDTH && typeof INIT_IMGWIDTH === 'number') {
    picWidth.value = INIT_IMGWIDTH
  }
  if (INIT_IMGHEIGHT && typeof INIT_IMGHEIGHT === 'string' && INIT_IMGHEIGHT.indexOf('%') !== -1) {
    const height = (props.imgHeight as string).replace('%', '')
    // INIT_IMGHEIGHT = this.data.imgHeight = (info.value.windowHeight / 100) * Number(height)
    INIT_IMGHEIGHT = (info.value.windowHeight / 100) * Number(height)
    picWidth.value = INIT_IMGHEIGHT
  } else if (INIT_IMGHEIGHT && typeof INIT_IMGHEIGHT === 'number') {
    picWidth.value = Number(INIT_IMGWIDTH)
  }
}

/**
 *  图片拖动边缘检测：检测移动或缩放时 是否触碰到图片边缘位置
 */
function detectImgPosIsEdge(scale?: number) {
  const currentScale = scale || imgScale.value
  let currentImgLeft = imgLeft.value
  let currentImgTop = imgTop.value
  let currentPicWidth = picWidth.value
  let currentPicHeight = picHeight.value

  // 翻转后宽高切换
  if ((imgAngle.value / 90) % 2) {
    currentPicWidth = picHeight.value
    currentPicHeight = picWidth.value
  }
  // 左
  currentImgLeft =
    (currentPicWidth * currentScale) / 2 + cutLeft.value >= currentImgLeft ? currentImgLeft : (currentPicWidth * imgScale.value) / 2 + cutLeft.value
  // 右
  currentImgLeft =
    cutLeft.value + cutWidth.value - (currentPicWidth * currentScale) / 2 <= currentImgLeft
      ? currentImgLeft
      : cutLeft.value + cutWidth.value - (currentPicWidth * currentScale) / 2
  // 上
  currentImgTop =
    (currentPicHeight * currentScale) / 2 + cutTop.value >= currentImgTop ? currentImgTop : (currentPicHeight * currentScale) / 2 + cutTop.value
  // 下
  currentImgTop =
    cutTop.value + cutHeight.value - (currentPicHeight * currentScale) / 2 <= currentImgTop
      ? currentImgTop
      : cutTop.value + cutHeight.value - (currentPicHeight * currentScale) / 2

  imgScale.value = currentScale
  imgTop.value = currentImgTop
  imgLeft.value = currentImgLeft
}

/**
 *  缩放边缘检测：检测移动或缩放时 是否触碰到图片边缘位置
 */
function detectImgScaleIsEdge() {
  let tempPicWidth = picWidth.value
  let tempPicHeight = picHeight.value
  let tempImgScale = imgScale.value

  // 翻转后宽高切换
  if ((imgAngle.value / 90) % 2) {
    tempPicWidth = picHeight.value
    tempPicHeight = picWidth.value
  }
  if (tempPicWidth * tempImgScale < cutWidth.value) {
    tempImgScale = cutWidth.value / tempPicWidth
  }
  if (tempPicHeight * tempImgScale < cutHeight.value) {
    tempImgScale = cutHeight.value / tempPicHeight
  }
  detectImgPosIsEdge(tempImgScale)
}

/**
 *  节流
 */
function throttle() {
  if (info.value.platform === 'android') {
    MOVE_THROTTLE && clearTimeout(MOVE_THROTTLE)
    MOVE_THROTTLE = setTimeout(() => {
      MOVE_THROTTLE_FLAG = true
    }, 1000 / 40)
  } else {
    !MOVE_THROTTLE_FLAG && (MOVE_THROTTLE_FLAG = true)
  }
}

/**
 *  {图片区} 开始拖动
 */
function handleImgTouchStart(event: any) {
  // 如果处于在拖动中，背景为淡色展示全部，拖动结束则为 0.85 透明度
  IS_TOUCH_END.value = false
  if (event.touches.length === 1) {
    // 单指拖动
    movingPosRecord.value[0] = {
      x: event.touches[0].clientX - imgLeft.value,
      y: event.touches[0].clientY - imgTop.value
    }
  } else {
    // 以两指为坐标点 做直角三角形 a2 + b2 = c2
    const width = Math.abs(event.touches[1].clientX - event.touches[0].clientX)
    const height = Math.abs(event.touches[1].clientY - event.touches[0].clientY)
    fingerDistance.value = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
  }
}

/**
 *  {图片区} 拖动中
 */
function handleImgTouchMove(event: any) {
  if (IS_TOUCH_END.value || !MOVE_THROTTLE_FLAG) return
  // 节流
  throttle()
  if (event.touches.length === 1) {
    // 单指拖动
    const { x, y } = movingPosRecord.value[0]
    const left = event.touches[0].clientX - Number(x)
    const top = event.touches[0].clientY - Number(y)
    imgLeft.value = left
    imgTop.value = top
    detectImgPosIsEdge()
  } else {
    // 以两指为坐标点 做直角三角形 a2 + b2 = c2
    const width = Math.abs(event.touches[1].clientX - event.touches[0].clientX)
    const height = Math.abs(event.touches[1].clientY - event.touches[0].clientY)
    const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
    const scale = imgScale.value * (hypotenuse / Number(fingerDistance.value))
    imgScale.value = Math.min(scale, props.maxScale)
    detectImgScaleIsEdge()
    fingerDistance.value = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
  }
}

/**
 *  {图片区} 拖动结束
 */
function handleImgTouchEnd() {
  IS_TOUCH_END.value = true
}

/**
 *  图片已加载完成
 */
function handleImgLoaded(res: any) {
  emit('imgloaded', res)
}

/**
 *  图片加载失败
 */
function handleImgLoadError(err: any) {
  emit('imgloaderror', err)
}

/**
 *  旋转图片
 */
function handleRotate() {
  setRoate(imgAngle.value - 90)
}

/**
 *  取消裁剪图片
 */
function handleCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

/**
 *  完成裁剪
 */
function handleConfirm() {
  draw()
}

/**
 *  canvas 绘制图片输出成文件类型
 */
function canvasToImage() {
  const { fileType, quality, exportScale } = props
  uni.canvasToTempFilePath(
    {
      width: cutWidth.value * exportScale,
      height: Math.round(cutHeight.value * exportScale),
      destWidth: cutWidth.value * exportScale,
      destHeight: Math.round(cutHeight.value * exportScale),
      fileType,
      quality,
      canvasId: canvasId.value,
      success: (res: any) => {
        const result = { tempFilePath: res.tempFilePath, width: cutWidth.value * exportScale, height: cutHeight.value * exportScale }
        // #ifdef MP-DINGTALK
        result.tempFilePath = res.filePath
        // #endif
        emit('confirm', result)
      },
      complete: () => {
        emit('update:modelValue', false)
      }
    },
    proxy
  )
}

/**
 *  canvas绘制，用canvas模拟裁剪框 对根据图片当前的裁剪信息进行模拟
 */
function draw() {
  if (!props.imgSrc) return
  const draw = () => {
    // 图片真实大小
    const width = picWidth.value * imgScale.value * props.exportScale
    const height = picHeight.value * imgScale.value * props.exportScale
    // 取裁剪框和图片的交集
    const x = imgLeft.value - cutLeft.value
    const y = imgTop.value - cutTop.value
    // 如果直接使用canvas绘制的图片会有锯齿，因此需要*设备像素比
    // 设置（x, y）设置图片在canvas中的位置
    ctx.value!.translate(x * props.exportScale, y * props.exportScale)
    // 设置 旋转角度
    if (!props.disabledRotate) {
      ctx.value!.rotate((imgAngle.value * Math.PI) / 180)
    }
    // drawImage 的 旋转是根据以当前图片的图片水平垂直方向为x、y轴，并在x y轴上移动
    ctx.value!.drawImage(props.imgSrc, -width / 2, -height / 2, width, height)

    ctx.value!.restore()

    // 绘制图片
    ctx.value!.draw(false, () => {
      canvasToImage()
    })
  }

  canvasHeight.value = cutHeight.value
  canvasWidth.value = cutWidth.value
  draw()
}
function preventTouchMove() {}

defineExpose<ImgCropperExpose>({
  revertIsAnimation,
  setRoate,
  resetImg
})
</script>

<!-- #ifdef MP-WEIXIN || MP-QQ  -->
<script module="animation" lang="wxs">

function setAnimation(newValue, oldValue, ownerInstance){
  if (newValue) {
    var id = ownerInstance.setTimeout(function() {
    ownerInstance.callMethod('revertIsAnimation',{value:false})
    ownerInstance.clearTimeout(id)
  },300)
  }

}

module.exports= {
  setAnimation:setAnimation,
}
</script>
<!-- #endif -->

<style lang="scss" scoped>
@import './index.scss';
</style>
