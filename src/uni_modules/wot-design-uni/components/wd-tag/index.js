import VueComponent from '../common/component'

VueComponent({
  props: {
    useIconSlot: {
      type: Boolean,
      value: false,
      observer: 'computeTagClass'
    },
    type: {
      type: String,
      observer (s) {
        if (!s) return
        // type: 'primary', 'danger', 'warning', 'success'
        const type = ['primary', 'danger', 'warning', 'success']
        if (type.indexOf(s) === -1) throw Error(`type must be one of ${type.toString()}`)
        this.computeTagClass()
      }
    },
    icon: {
      type: String,
      observer: 'computeTagClass'
    },
    closable: {
      type: Boolean,
      value: false
    },
    plain: {
      type: Boolean,
      observer: 'computeTagClass'
    },
    dynamic: {
      type: Boolean,
      value: false,
      observer: 'computeTagClass'
    },
    color: String,
    bgColor: String,
    round: {
      type: Boolean,
      value: false,
      observer: 'computeTagClass'
    },
    mark: {
      type: Boolean,
      value: false,
      observer: 'computeTagClass'
    }
  },
  data: {
    tagClass: '',
    dynamicValue: '',
    dynamicInput: false
  },
  observers: {
    'dynamicInput' () {
      this.computeTagClass()
    }
  },
  methods: {
    computeTagClass () {
      const { type, plain, round, mark, dynamic, dynamicInput, icon, useIconSlot } = this.data
      let tagClass = []
      type && tagClass.push(`is-${type}`)
      plain && tagClass.push('is-plain')
      round && tagClass.push('is-round')
      mark && tagClass.push('is-mark')
      dynamic && tagClass.push('is-dynamic')
      dynamicInput && tagClass.push('is-dynamic-input')
      if (icon || useIconSlot) tagClass.push('is-icon')
      tagClass = tagClass.join(' ')
      this.setData({ tagClass })
    },
    handleClick () {
      this.$emit('click')
    },
    handleClose () {
      this.$emit('close')
    },
    handleAdd () {
      this.setData({
        dynamicInput: true,
        dynamicValue: ''
      })
    },
    handleBlur () {
      this.setDynamicInput()
    },
    handleConfirm (event) {
      this.setDynamicInput()
      this.$emit('confirm', {
        value: event.detail.value
      })
    },
    setDynamicInput () {
      this.setData({
        dynamicInput: false
      })
    }
  }
})