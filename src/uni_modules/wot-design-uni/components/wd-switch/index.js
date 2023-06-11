import VueComponent from '../common/component'
import { getType } from '../common/util'

VueComponent({
  behaviors: ['jd://form-field'],
  props: {
    value: null,
    disabled: Boolean,
    activeValue: {
      type: null,
      value: true
    },
    inactiveValue: {
      type: null,
      value: false
    },
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: '28px'
    },
    beforeChange: null
  },
  methods: {
    switchValue () {
      if (this.data.disabled) return

      const newVal = this.data.value === this.data.activeValue ? this.data.inactiveValue : this.data.activeValue

      if (this.data.beforeChange && getType(this.data.beforeChange) === 'function') {
        this.data.beforeChange({
          value: newVal,
          resolve: (pass) => {
            if (pass) {
              this.setData({
                value: newVal
              })
              this.$emit('change', {
                value: newVal
              })
            }
          }
        })
      } else {
        this.setData({
          value: newVal
        })
        this.$emit('change', {
          value: newVal
        })
      }
    }
  },
  attached () {
    if ([this.data.activeValue, this.data.inactiveValue].indexOf(this.data.value) === -1) {
      this.$emit('change', {
        value: this.data.inactiveValue
      })
    }
  }
})