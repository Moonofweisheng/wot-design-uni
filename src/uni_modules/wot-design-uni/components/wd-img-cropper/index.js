import VueComponent from '../common/component'

// 延时动画设置
let CHANGE_TIME = null
// 移动节流
let MOVE_THROTTLE = null
// 节流标志
let MOVE_THROTTLE_FLAG = true
// 图片设置尺寸,此值不变（记录最初设定的尺寸）
let INIT_IMGWIDTH = null
// 图片设置尺寸,此值不变（记录最初设定的尺寸）
let INIT_IMGHEIGHT = null
// 顶部裁剪框占比
const TOP_PERCENT = 0.85

VueComponent({
  props: {
    show: {
      type: Boolean,
      value: false,
      observer (val) {
        if (val) {
          INIT_IMGWIDTH = this.data.imgWidth
          INIT_IMGHEIGHT = this.data.imgHeight
          this.data.info = jd.getSystemInfoSync()
          const cutSize = this.data.info.windowWidth - this.data.offset * 2
          this.setData({
            cutWidth: cutSize,
            cutHeight: cutSize,
            cutTop: (this.data.info.windowHeight * TOP_PERCENT - cutSize) / 2,
            cutLeft: this.data.offset,
            canvasScale: this.data.exportScale,
            canvasHeight: cutSize,
            canvasWidth: cutSize
          })
          // 根据开发者设置的图片目标尺寸计算实际尺寸
          this.initImageSize()
          // 初始化canvas
          this.initCanvas()
          // 加载图片
          this.data.imgSrc && this.loadImg()
        } else {
          this.resetImg()
        }
      }
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    confirmButtonText: {
      type: String,
      value: '完成'
    },
    // 是否禁用旋转
    disabledRotate: Boolean,
    /** canvas绘图参数 start **/
    // canvasToTempFilePath —— fileType
    fileType: {
      type: String,
      value: 'png'
    },
    // canvasToTempFilePath —— quality
    quality: {
      type: Number,
      value: 1
    },
    // 设置导出图片尺寸
    exportScale: {
      type: Number,
      value: 2
    },
    /** canvas绘图参数 end **/
    // 图片源路径
    imgSrc: {
      type: null,
      value: '',
      observer (val) {
        val && this.loadImg()
      }
    },
    // 图片宽
    imgWidth: {
      type: null,
      value: null
    },
    // 图片高
    imgHeight: {
      type: null,
      value: null
    },
    // 最大缩放
    maxScale: {
      type: Number,
      value: 3
    },
    /** Watching Data **/
    // 旋转角度
    imgAngle: {
      type: Number,
      value: 0,
      observer (val) {
        if (val % 90) {
          this.setData({
            imgAngle: Math.round(val / 90) * 90
          })
        }
      }
    },
    // 是否开启动画
    isAnimation: {
      type: Boolean,
      value: false,
      observer (val) {
        // 开启过渡300毫秒之后自动关闭
        clearTimeout(CHANGE_TIME)
        if (val) {
          CHANGE_TIME = setTimeout(() => {
            this.setData({ isAnimation: false })
          }, 300)
        }
      }
    }
  },

  data: {
    // 裁剪框的宽高
    picWidth: 0,
    picHeight: 0,
    cutWidth: 0,
    cutHeight: 0,
    offset: 20,
    // 裁剪框的距顶距左
    cutLeft: 0,
    cutTop: 0,
    // canvas最终成像宽高
    canvasWidth: '',
    canvasHeight: '',
    canvasScale: 2,
    // 当前缩放大小
    imgScale: 1,
    // // 图片宽高
    // imgWidth: null,
    // imgHeight: null,
    // 图片中心轴点距左的距离
    imgLeft: jd.getSystemInfoSync().windowWidth / 2,
    imgTop: jd.getSystemInfoSync().windowHeight / 2 * TOP_PERCENT,
    // 是否移动中设置 同时控制背景颜色是否高亮
    IS_TOUCH_END: true,
    // 记录移动中的双指位置 [0][1]分别代表两根手指 [1]做待用参数
    movingPosRecord: [{
      x: '',
      y: ''
    }, {
      x: '',
      y: ''
    }],
    // 双指缩放时 两个坐标点斜边长度
    fingerDistance: ''
  },

  methods: {
    /**
     * @description 对外暴露：控制旋转角度
     * @param {Number} angle 角度
     */
    setRoate (angle) {
      if (!angle || this.data.disabledRotate) return
      this.setData({
        isAnimation: true,
        imgAngle: angle
      })
      // 设置旋转后需要判定旋转后宽高是否不符合贴边的标准
      this.detectImgPosIsEdge()
    },

    /**
     * @description 对外暴露：初始化图片的大小和角度以及距离
     */
    resetImg () {
      const { windowHeight, windowWidth } = jd.getSystemInfoSync()
      this.setData({
        imgScale: 1,
        imgAngle: 0,
        imgLeft: windowWidth / 2,
        imgTop: windowHeight / 2 * TOP_PERCENT
      })
    },

    /**
     * @description 加载图片资源文件，并初始化裁剪框内图片信息
     */
    loadImg () {
      if (!this.data.imgSrc) return

      jd.getImageInfo({
        src: this.data.imgSrc,
        success: (res) => {
          // 存储img图片信息
          this.data.imgInfo = res
          // 计算最后图片尺寸
          this.computeImgSize()
          // 初始化尺寸
          this.resetImg()
        },
        fail: () => {
          this.setData({ imgSrc: '' })
        }
      })
    },

    /**
     * @description 设置图片尺寸，使其有一边小于裁剪框尺寸
     * 1、图片宽或高 小于裁剪框，自动放大至一边与高平齐
     * 2、图片宽或高 大于裁剪框，自动缩小至一边与高平齐
     */
    computeImgSize () {
      let {
        picWidth,
        picHeight,
        imgInfo,
        cutWidth,
        cutHeight
      } = this.data
      if (!INIT_IMGHEIGHT && !INIT_IMGWIDTH) {
        // 没有设置宽高，写入图片的真实宽高
        picWidth = imgInfo.width
        picHeight = imgInfo.height
        /**
         * 设 a = imgWidth; b = imgHeight; x = cutWidth; y = cutHeight
         * 共有三种宽高比：1、a/b > x/y 2、a/b < x/y 3、a/b = x/y
         * 1、已知 b = y => a = a/b*y
         * 2、已知 a = x => b = b/a*x
         * 3、可用上方任意公式
         */
        if (picWidth / picHeight > cutWidth / cutHeight) {
          picHeight = cutHeight
          picWidth = imgInfo.width / imgInfo.height * cutHeight
        } else {
          picWidth = cutWidth
          picHeight = imgInfo.height / imgInfo.width * cutWidth
        }
      } else if (INIT_IMGHEIGHT && !INIT_IMGWIDTH) {
        picWidth = imgInfo.width / imgInfo.height * INIT_IMGHEIGHT
      } else if ((!INIT_IMGHEIGHT && INIT_IMGWIDTH) || (INIT_IMGHEIGHT && INIT_IMGWIDTH)) {
        picHeight = imgInfo.height / imgInfo.width * INIT_IMGWIDTH
      }

      this.setData({
        picWidth,
        picHeight
      })
    },

    /**
     * @description canvas 初始化
     */
    initCanvas () {
      if (!this.data.ctx) {
        this.data.ctx = jd.createCanvasContext('wd-img-cropper-canvas', this)
      }
    },

    /**
     * @description 图片初始化,处理宽高特殊单位
     */
    initImageSize () {
      // 处理宽高特殊单位 %>px
      if (INIT_IMGWIDTH && typeof INIT_IMGWIDTH === 'string' && INIT_IMGWIDTH.indexOf('%') !== -1) {
        const width = INIT_IMGWIDTH.replace('%', '')
        INIT_IMGWIDTH = this.data.info.windowWidth / 100 * width
        this.setData({
          picWidth: INIT_IMGWIDTH
        })
      } else if (INIT_IMGWIDTH && typeof INIT_IMGWIDTH === 'number') {
        this.setData({
          picWidth: INIT_IMGWIDTH
        })
      }
      if (INIT_IMGHEIGHT && typeof INIT_IMGHEIGHT === 'string' && INIT_IMGHEIGHT.indexOf('%') !== -1) {
        const height = this.data.imgHeight.replace('%', '')
        INIT_IMGHEIGHT = this.data.imgHeight = this.data.info.windowHeight / 100 * height
        this.setData({
          picWidth: INIT_IMGHEIGHT
        })
      } else if (INIT_IMGHEIGHT && typeof INIT_IMGHEIGHT === 'number') {
        this.setData({
          picWidth: INIT_IMGWIDTH
        })
      }
    },

    /**
     * @description 图片拖动边缘检测：检测移动或缩放时 是否触碰到图片边缘位置
     */
    detectImgPosIsEdge (scale) {
      const {
        cutLeft,
        cutTop,
        cutWidth,
        cutHeight,
        imgAngle
      } = this.data
      const imgScale = scale || this.data.imgScale
      let { picWidth, picHeight, imgLeft, imgTop } = this.data
      // 翻转后宽高切换
      if (imgAngle / 90 % 2) {
        picWidth = this.data.picHeight
        picHeight = this.data.picWidth
      }
      // 左
      imgLeft = picWidth * imgScale / 2 + cutLeft >= imgLeft ? imgLeft : picWidth * imgScale / 2 + cutLeft
      // 右
      imgLeft = cutLeft + cutWidth - picWidth * imgScale / 2 <= imgLeft ? imgLeft : cutLeft + cutWidth - picWidth * imgScale / 2
      // 上
      imgTop = picHeight * imgScale / 2 + cutTop >= imgTop ? imgTop : picHeight * imgScale / 2 + cutTop
      // 下
      imgTop = cutTop + cutHeight - picHeight * imgScale / 2 <= imgTop ? imgTop : cutTop + cutHeight - picHeight * imgScale / 2

      this.setData({
        imgLeft,
        imgTop,
        imgScale
      })
    },

    /**
     * @description 缩放边缘检测：检测移动或缩放时 是否触碰到图片边缘位置
     */
    detectImgScaleIsEdge () {
      const { cutHeight, cutWidth, imgAngle } = this.data
      let { picWidth, picHeight, imgScale } = this.data
      // 翻转后宽高切换
      if (imgAngle / 90 % 2) {
        picWidth = this.data.picHeight
        picHeight = this.data.picWidth
      }
      if (picWidth * imgScale < cutWidth) {
        imgScale = cutWidth / picWidth
      }
      if (picHeight * imgScale < cutHeight) {
        imgScale = cutHeight / picHeight
      }
      this.detectImgPosIsEdge(imgScale)
    },

    /**
     * @description 节流
     */
    throttle () {
      if (this.data.info.platform === 'android') {
        clearTimeout(MOVE_THROTTLE)
        MOVE_THROTTLE = setTimeout(() => {
          MOVE_THROTTLE_FLAG = true
        }, 1000 / 40)
      } else {
        !MOVE_THROTTLE_FLAG && (MOVE_THROTTLE_FLAG = true)
      }
    },

    /**
     * @description {图片区} 开始拖动
     */
    handleImgTouchStart (event) {
      // 如果处于在拖动中，背景为淡色展示全部，拖动结束则为 0.85 透明度
      this.setData({ IS_TOUCH_END: false })
      if (event.touches.length === 1) {
        // 单指拖动
        this.data.movingPosRecord[0] = {
          x: (event.touches[0].clientX - this.data.imgLeft),
          y: (event.touches[0].clientY - this.data.imgTop)
        }
      } else {
        // 以两指为坐标点 做直角三角形 a2 + b2 = c2
        const width = Math.abs(event.touches[1].clientX - event.touches[0].clientX)
        const height = Math.abs(event.touches[1].clientY - event.touches[0].clientY)
        this.data.fingerDistance = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
      }
    },

    /**
     * @description {图片区} 拖动中
     */
    handleImgTouchMove (event) {
      if (this.data.IS_TOUCH_END || !MOVE_THROTTLE_FLAG) return
      // 节流
      this.throttle()
      if (event.touches.length === 1) {
        // 单指拖动
        const { x, y } = this.data.movingPosRecord[0]
        const left = event.touches[0].clientX - x
        const top = event.touches[0].clientY - y
        this.data.imgLeft = left
        this.data.imgTop = top
        this.detectImgPosIsEdge()
        this.setData({
          imgLeft: this.data.imgLeft,
          imgTop: this.data.imgTop
        })
      } else {
        // 以两指为坐标点 做直角三角形 a2 + b2 = c2
        const width = Math.abs(event.touches[1].clientX - event.touches[0].clientX)
        const height = Math.abs(event.touches[1].clientY - event.touches[0].clientY)
        const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
        const scale = this.data.imgScale * (hypotenuse / this.data.fingerDistance)
        this.data.imgScale = Math.min(scale, this.data.maxScale)
        this.detectImgScaleIsEdge()
        this.data.fingerDistance = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
      }
    },

    /**
     * @description {图片区} 拖动结束
     */
    handleImgTouchEnd () {
      this.setData({ IS_TOUCH_END: true })
    },

    /**
     * @description 图片已加载完成
     */
    handleImgLoaded (res) {
      this.$emit('imgloaded', res)
    },

    /**
     * @description 图片加载失败
     */
    handleImgLoadError (err) {
      this.$emit('imgloaderror', err)
    },

    /**
     * @description 旋转图片
     */
    handleRotate () {
      this.setRoate(this.data.imgAngle - 90)
    },

    /**
     * @description 取消裁剪图片
     */
    handleCancel () {
      this.$emit('cancel')
      this.setData({
        show: false,
        imgSrc: ''
      })
    },

    /**
     * @description 完成裁剪
     */
    handleConfirm (event) {
      this.draw()
    },

    /**
     * @description canvas 绘制图片输出成文件类型
     */
    canvasToImage () {
      const _this = this
      const {
        fileType,
        quality,
        cutHeight,
        cutWidth,
        exportScale
      } = this.data
      jd.canvasToTempFilePath({
        width: cutWidth * exportScale,
        height: Math.round(cutHeight * exportScale),
        destWidth: cutWidth * exportScale,
        destHeight: Math.round(cutHeight * exportScale),
        fileType,
        quality,
        canvasId: 'wd-img-cropper-canvas',
        success (res) {
          _this.setData({
            show: false
          })
          _this.$emit('confirm', {
            tempFilePath: res.tempFilePath,
            width: cutWidth * exportScale,
            height: cutHeight * exportScale
          })
        },
        fail () {
          _this.setData({
            show: false
          })
        }
      }, this)
    },

    /**
     * @description canvas绘制，用canvas模拟裁剪框 对根据图片当前的裁剪信息进行模拟
     */
    draw () {
      if (!this.data.imgSrc) return
      const {
        imgSrc,
        picWidth,
        picHeight,
        imgLeft,
        imgTop,
        imgScale,
        imgAngle,
        cutLeft,
        cutTop,
        cutHeight,
        cutWidth,
        exportScale,
        disabledRotate
      } = this.data
      const draw = () => {
        // 图片真实大小
        const width = picWidth * imgScale * exportScale
        const height = picHeight * imgScale * exportScale
        // 取裁剪框和图片的交集
        const x = imgLeft - cutLeft
        const y = imgTop - cutTop
        // 如果直接使用canvas绘制的图片会有锯齿，因此需要*设备像素比
        // 设置（x, y）设置图片在canvas中的位置
        this.data.ctx.translate(x * exportScale, y * exportScale)
        // 设置 旋转角度
        if (!disabledRotate) {
          this.data.ctx.rotate(imgAngle * Math.PI / 180)
        }
        // drawImage 的 旋转是根据以当前图片的图片水平垂直方向为x、y轴，并在x y轴上移动
        this.data.ctx.drawImage(imgSrc, -width / 2, -height / 2, width, height)
        // 绘制图片
        this.data.ctx.draw(false, () => {
          this.canvasToImage()
        })
      }

      if (this.data.ctx.width !== cutWidth || this.data.ctx.height !== cutHeight) {
        this.setData({
          canvasHeight: cutHeight,
          canvasWidth: cutWidth
        }, () => {
          draw()
        })
      } else {
        draw()
      }
    },
    preventTouchMove () { }
  }
})