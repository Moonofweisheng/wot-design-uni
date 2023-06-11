import VueComponent from '../common/component'

VueComponent({
  behaviors: ['jd://form-field'],
  props: {
    useActionSlot: {
      type: Boolean,
      value: false
    },
    useLabelSlot: {
      type: Boolean,
      value: false
    },
    placeholder: String,
    cancelTxt: String,
    light: Boolean,
    hideCancel: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number,
      value: -1
    },
    value: {
      type: String,
      observer (s) {
        this.setData({ str: s })
      }
    },
    placeholderLeft: {
      type: Boolean,
      value: false
    }
  },
  data: {
    focus: false,
    str: '',
    showPlaceHolder: true,
    clearing: false
  },
  methods: {
    closeCover () {
      if (this.data.disabled) return
      this.requestAnimationFrame()
        .then(() => this.requestAnimationFrame())
        .then(() => this.requestAnimationFrame())
        .then(() => {
          this.setData({
            showPlaceHolder: false,
            focus: true
          })
        })
    },
    /**
     * @description input的input事件handle
     * @param value
     */
    inputValue ({ detail: { value } }) {
      this.setData({ str: value }, () => {
        this.$emit('change', {
          value
        })
      })
    },
    /**
     * @description 点击清空icon的handle
     */
    clearSearch () {
      this.data.clearing = true
      this.setData({ str: '' })
      this.requestAnimationFrame()
        .then(() => this.requestAnimationFrame())
        .then(() => {
          this.setData({
            showPlaceHolder: false
          })
          return this.requestAnimationFrame()
        })
        .then(() => {
          this.setData({ focus: true }, () => {
            this.$emit('clear')
            this.$emit('change', {
              value: ''
            })
          })
        })
    },
    /**
     * @description 点击搜索按钮时的handle
     * @param value
     */
    search ({ detail: { value } }) {
      // 组件触发search事件
      this.$emit('search', {
        value
      })
    },
    /**
     * @description 输入框聚焦时的handle
     */
    searchFocus () {
      if (this.data.clearing) {
        this.data.clearing = false
        return
      }
      this.setData({
        showPlaceHolder: false,
        focus: true
      },
      () => this.$emit('focus', {
        value: this.data.str
      })
      )
    },
    /**
     * @description 输入框失焦的handle
     */
    searchBlur () {
      if (this.data.clearing) return
      // 组件触发blur事件
      this.setData(
        { showPlaceHolder: !this.data.str },
        () => this.$emit('blur', {
          value: this.data.str
        })
      )
    },
    /**
     * @description 点击取消搜索按钮的handle
     */
    handleCancel () {
      // 组件触发cancel事件
      this.$emit('cancel', {
        value: this.data.str
      })
    }
  }
})