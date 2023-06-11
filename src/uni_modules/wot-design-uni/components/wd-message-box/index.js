import VueComponent from '../common/component'

VueComponent({
  props: {
    useSlot: {
      type: Boolean,
      value: false
    },
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    title: String,
    showCancelButton: {
      type: Boolean,
      value: false
    },
    show: {
      type: Boolean,
      value: false,
      observer: 'resetErr'
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    confirmButtonText: String,
    cancelButtonText: String,
    zIndex: {
      type: Number,
      value: 99
    },
    lazyRender: {
      type: Boolean,
      value: true
    }
  },
  data: {
    msg: '',
    type: 'alert',
    inputType: 'text',
    inputValue: '',
    inputPlaceholder: '',
    inputPattern: '',
    inputValidate: '',
    showErr: false,
    inputError: '',
    onConfirm: '',
    onCancel: ''
  },
  methods: {
    /**
     * @description 关闭消息框的统一主调 handle
     * @param {'cancel' | 'confirm'} action
     */
    toggleModal ({ currentTarget: el }) {
      const { action } = el.dataset
      // closeOnClickModal为false，此时点击蒙层没任何效果
      if (action === 'modal' && !this.data.closeOnClickModal) {
        return
      }
      // prompt类型的弹窗 文案没有通过校验，点击了确定按钮没有任何效果
      if (this.data.type === 'prompt' && action === 'confirm' && !this.validate()) {
        return
      }
      this.setData({ show: false })
      const { onConfirm, onCancel } = this.data

      switch (action) {
      case 'confirm':
        onConfirm(action)
        break
      case 'cancel':
        onCancel(action)
        break
      default:
        onCancel('modal')
        break
      }
    },
    /**
     * @description 如果存在校验规则行为，则进行判断校验是否通过规则。默认不存在校验直接铜鼓。
     * @return {Boolean} 是否通过校验
     */
    validate () {
      const { inputPattern, inputValidate, inputValue } = this.data
      if (inputPattern && !inputPattern.test(inputValue)) {
        this.setData({ showErr: true })
        return false
      }
      if (typeof inputValidate === 'function') {
        const validateResult = inputValidate(inputValue)
        if (!validateResult) {
          this.setData({ showErr: true })
          return false
        }
      }
      this.setData({ showErr: false })
      return true
    },
    /**
     * @description show关闭时，销毁错误提示
     * @param val
     */
    resetErr (val) {
      if (val === false) {
        this.setData({ showErr: false })
      }
    },
    inputValChange ({ detail }) {
      const { value } = detail
      if (value === '') {
        this.setData({ showErr: false })
        return
      }
      this.setData({
        inputValue: value
      })
    }
  }
})