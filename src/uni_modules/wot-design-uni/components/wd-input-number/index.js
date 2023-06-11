import VueComponent from '../common/component'
import { debounce, getType } from '../common/util'

VueComponent({
  data: {
    minDisabled: false,
    maxDisabled: false
  },

  behaviors: ['jd://form-field'],

  props: {
    value: {
      type: null,
      observer (value, oldValue) {
        this.splitDisabled(value)
      }
    },
    min: {
      type: Number,
      value: 1,
      observer: 'updateBoundary'
    },
    max: {
      type: Number,
      value: Number.MAX_SAFE_INTEGER,
      observer: 'updateBoundary'
    },
    step: {
      type: Number,
      value: 1
    },
    stepStrictly: Boolean,
    precision: {
      type: Number,
      value: 0
    },
    disabled: {
      type: Boolean,
      observer (val) {
        this.setData({
          minDisabled: val,
          maxDisabled: val
        })
      }
    },
    withoutInput: Boolean,
    inputWidth: String,
    allowNull: Boolean,
    placeholder: String
  },

  methods: {
    updateBoundary () {
      const _this = this
      debounce(function () {
        const value = _this.formatValue(_this.data.value)
        _this.setValue(value)
        _this.splitDisabled(value)
      }, 30)()
    },

    splitDisabled (value) {
      const { disabled, min, max, step } = this.data
      this.setData({
        minDisabled: disabled || value <= min || this.changeStep(value, -step) < min,
        maxDisabled: disabled || value >= max || this.changeStep(value, step) > max
      })
    },

    toPrecision (value) {
      return parseFloat(Math.round(value * Math.pow(10, this.data.precision)) / Math.pow(10, this.data.precision)).toFixed(this.data.precision)
    },

    getPrecision (value) {
      if (value === undefined) return 0
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    },

    toStrictlyStep (value) {
      const stepPrecision = this.getPrecision(this.data.step)
      const precisionFactory = Math.pow(10, stepPrecision)
      return Math.round(value / this.data.step) * precisionFactory * this.data.step / precisionFactory
    },

    setValue (value, change = true) {
      const type = getType(value)

      if (this.data.allowNull && (type === 'null' || type === 'undefined' || value === '')) {
        this.dispatchChangeEvent(value, change)
        return
      }

      if (this.data.stepStrictly) {
        value = this.toStrictlyStep(value)
      }
      if ((value || value === 0) && this.data.precision !== undefined) {
        value = this.toPrecision(value)
      }
      if (value > this.data.max) value = this.toPrecision(this.data.max)
      if (value < this.data.min) value = this.toPrecision(this.data.min)

      this.dispatchChangeEvent(value, change)
    },

    changeStep (val, step) {
      val = Number(val)

      if (isNaN(val)) {
        return this.data.min
      }

      const precisionFactory = Math.pow(10, this.data.precision)
      return this.toPrecision((val * precisionFactory + step * precisionFactory) / precisionFactory)
    },

    sub () {
      if (this.data.minDisabled) return

      const newValue = this.changeStep(this.data.value, -this.data.step)
      this.dispatchChangeEvent(newValue)
    },

    add () {
      if (this.data.maxDisabled) return

      const newValue = this.changeStep(this.data.value, this.data.step)
      this.dispatchChangeEvent(newValue)
    },

    handleInput (event) {
      const value = event.detail.value || ''
      this.dispatchChangeEvent(value)
    },

    handleFocus (event) {
      this.$emit('focus', event.detail)
    },

    handleBlur () {
      const value = this.formatValue(this.data.value)
      this.setValue(value)
      this.$emit('blur', {
        value
      })
    },

    dispatchChangeEvent (value, change = true) {
      this.setData({ value })
      change && this.$emit('change', { value })
    },

    formatValue (value) {
      const type = getType(value)

      if (this.data.allowNull && (type === 'null' || type === 'undefined' || value === '')) {
        return ''
      }

      value = Number(value)

      if (isNaN(value)) {
        value = this.data.min
      }

      if (this.data.stepStrictly) {
        value = this.toStrictlyStep(value)
      }

      if (this.data.precision !== undefined) {
        value = value.toFixed(this.data.precision)
      }

      return value
    }
  },

  created () {
    this.dispatchChangeEvent(this.formatValue(this.data.value))
  }
})