/* eslint-disable no-useless-return */
import VueComponent from '../common/component'
import touch from '../mixins/touch'

const $slider = '.wd-slider'
// 存放右滑轮中的所有属性
const rightSlider = {}
VueComponent({
  externalClasses: [
    'custom-min-class',
    'custom-max-class'
  ],
  behaviros: ['jd://form-field'],
  data: {
    showRight: false,
    barStyle: 'width: 0; height: 3px',
    barHeight: '3px',
    leftNewValue: 0,
    rightNewValue: 0,
    rightBarPercent: 0,
    leftBarPercent: 0
  },
  mixins: [touch()],
  props: {
    hideMinMax: Boolean,
    hideLabel: Boolean,
    disabled: {
      type: Boolean,
      value: false
    },
    inactiveColor: {
      type: String,
      value: '#e5e5e5'
    },
    activeColor: {
      type: String,
      value: ''
    },
    max: {
      type: Number,
      value: 100,
      observer (newValue) {
        if (newValue < 0) {
          this.setData({ max: 100 })
          console.warn('[wot design] warning(wd-slider): max value must be greater than 0')
        } else if (newValue <= this.data.min) {
          this.setData({ max: 100 })
          console.warn('[wot design] warning(wd-slider): max value must be greater than min value')
        }
      }
    },
    min: {
      type: Number,
      value: 0,
      observer (newValue) {
        if (newValue < 0) {
          this.setData({ min: 0 })
          console.warn('[wot design] warning(wd-slider): min value must be greater than 0')
        } else if (newValue >= this.data.max) {
          this.setData({ min: 0 })
          console.warn('[wot design] warning(wd-slider): min value must be less than max value')
        }
      }
    },
    step: {
      type: Number,
      value: 1,
      observer (newValue) {
        if (newValue <= 0) {
          this.setData({ step: 1 })
          console.warn('[wot design] warning(wd-slider): step must be greater than 0')
        }
      }
    },
    value: {
      type: null,
      value: 0,
      observer (newValue, oldValue) {
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (newValue === null || newValue === undefined) {
          this.setData({ value: oldValue })
          console.warn('[wot design] warning(wd-slider): value can\'t be null or undefined')
        } else if (this.checkType(newValue) === 'Array' && newValue.length !== 2) {
          throw Error('[wot design] warning(wd-slider): value must be dyadic array')
        } else if (this.checkType(newValue) !== 'Number' && this.checkType(newValue) !== 'Array') {
          this.setData({ value: oldValue })
          console.warn('[wot design] warning(wd-slider): value must be dyadic array Or Number')
        }
        this.currentValue = newValue
        // 动态传值后修改
        if (this.checkType(newValue) === 'Array') {
          if (this.equal(newValue, oldValue)) return
          this.setData({ showRight: true })
          const { leftBarPercent, rightBarPercent } = this.data
          if (leftBarPercent < rightBarPercent) {
            this.leftBarSlider(newValue[0])
            this.rightBarSlider(newValue[1])
          } else {
            this.leftBarSlider(newValue[1])
            this.rightBarSlider(newValue[0])
          }
        } else {
          if (newValue === oldValue) return
          this.leftBarSlider(newValue)
        }
      }
    }
  },
  mounted () {
    this.getRect($slider).then(rect => {
      if (!rect || !rect.width) return
      // trackWidth: 轨道全长
      this.trackWidth = rect.width
      // trackLeft: 轨道距离左侧的距离
      this.trackLeft = rect.left
    })
  },
  methods: {
    onTouchStart (event) {
      const { disabled, leftBarPercent, value, rightBarPercent } = this.data
      if (disabled) return
      this.touchStart(event)
      this.startValue = this.checkType(value) !== 'Array'
        ? this.format(value)
        : (leftBarPercent < rightBarPercent ? this.format(value[0]) : this.format(value[1]))
      this.$emit('dragstart', {
        value: this.currentValue
      })
    },
    onTouchMove (event) {
      const { disabled, max, min } = this.data
      if (disabled) return
      this.touchMove(event)
      // 移动间距 this.deltaX 就是向左(-)向右(+)
      const diff = this.deltaX / this.trackWidth * (max - min)
      this.newValue = this.startValue + diff
      // 左滑轮滑动控制
      this.leftBarSlider(this.newValue)
      this.$emit('dragmove', {
        value: this.currentValue
      })
    },
    onTouchEnd () {
      if (this.data.disabled) return
      this.$emit('dragend', {
        value: this.currentValue
      })
    },
    // 右边滑轮滑动状态监听
    onTouchStartRight (event) {
      if (this.data.disabled) return
      const { leftBarPercent, rightBarPercent, value } = this.data
      // 右滑轮移动时数据绑定
      this.touchStart.call(rightSlider, event)
      // 记录开始数据值
      rightSlider.startValue = leftBarPercent < rightBarPercent ? this.format(value[1]) : this.format(value[0])
      this.$emit('dragstart', {
        value: this.currentValue
      })
    },
    onTouchMoveRight (event) {
      if (this.data.disabled) return
      const { max, min } = this.data
      this.touchMove.call(rightSlider, event)
      // 移动间距 this.deltaX 就是向左向右
      const diff = rightSlider.deltaX / this.trackWidth * (max - min)
      rightSlider.newValue = this.format(rightSlider.startValue + diff)
      // 右滑轮滑动控制
      this.rightBarSlider(rightSlider.newValue)
      this.$emit('dragmove', {
        value: this.currentValue
      })
    },
    onTouchEndRight () {
      if (this.data.disabled) return
      this.$emit('dragend', {
        value: this.currentValue
      })
    },
    /**
     * 控制右侧滑轮滑动， value校验
     * @param {Number} value 当前滑轮绑定值
     */
    rightBarSlider (value) {
      const { min, max } = this.data
      value = this.format(value)
      const rightBarPercent = (value - min) / (max - min) * 100
      this.setData({
        rightNewValue: value,
        rightBarPercent: this.format(rightBarPercent)
      })
      this.styleControl()
    },
    /**
     * 控制左滑轮滑动，更新渲染数据，对 value 进行校验取整
     * @param {Number} value 当前滑轮绑定值
     */
    leftBarSlider (value) {
      const { min, max, showRight } = this.data
      value = this.format(value)
      // 把 value 转换成百分比
      const percent = (value - min) / (max - min) * 100
      if (!showRight) {
        this.setData({
          value,
          leftNewValue: value,
          leftBarPercent: percent,
          barStyle: `width: ${percent}%; height: ${this.data.barHeight};`
        })
      } else {
        this.setData({
          leftNewValue: value,
          leftBarPercent: percent
        })
        this.styleControl()
      }
    },
    // 样式控制
    styleControl () {
      const { leftNewValue, rightNewValue } = this.data
      const { leftBarPercent, rightBarPercent } = this.data
      // 左右滑轮距离左边最短为当前激活条所处位置
      const barLeft = leftBarPercent < rightBarPercent
        ? [leftBarPercent, rightBarPercent]
        : [rightBarPercent, leftBarPercent]
      // 通过左右滑轮的间距控制 激活条宽度 barLeft[1] - barLeft[0]
      const barStyle = `width: ${barLeft[1] - barLeft[0]}%; height: ${this.data.barHeight}; left: ${barLeft[0]}%`
      this.currentValue = leftNewValue < rightNewValue
        ? [leftNewValue, rightNewValue]
        : [rightNewValue, leftNewValue]
      this.setData({ barStyle })
    },
    // 将pos转化为value
    pos2Value (pos) {
      const { max, min, step } = this.data
      const percent = pos / this.trackWidth
      const value = percent * (max - min) + min
      const res = min + Math.floor((value - min) / step) * step
      return res
    },
    checkType (value) {
      return Object.prototype.toString.call(value).slice(8, -1)
    },
    equal (arr1, arr2) {
      let i = 0
      arr1.forEach((item, index) => {
        item === arr2[index] && i++
      })
      return (i === 2)
    },
    format (value) {
      const { max, min, step } = this.data
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step
    }
  }
})