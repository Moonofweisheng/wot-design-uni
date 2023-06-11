import VueComponent from '../common/component'

VueComponent({
  externalClasses: ['custom-header-class'],
  props: {
    show: Boolean,
    actions: {
      type: Array,
      value: []
    },
    panels: {
      type: Array,
      value: [],
      observer: 'computedValue'
    },
    title: String,
    cancelText: String,
    closeOnClickAction: {
      type: Boolean,
      value: true
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    duration: {
      type: Number,
      value: 200
    },
    zIndex: {
      type: Number,
      value: 10
    },
    lazyRender: {
      type: Boolean,
      value: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  data() {
    return {
      formatPanels: []
    }
  },
  methods: {
    isArray() {
      return this.data.panels.length && !(this.data.panels[0] instanceof Array)
    },
    computedValue() {
      this.setData({
        formatPanels: this.isArray() ? [this.data.panels] : this.data.panels
      })
    },
    select(event) {
      const { rowIndex, colIndex, type } = event.currentTarget.dataset
      if (type === 'action') {
        this.$emit('select', {
          item: this.data.actions[rowIndex],
          index: rowIndex
        })
      } else if (this.isArray()) {
        this.$emit('select', {
          item: this.data.panels[colIndex],
          index: colIndex
        })
      } else {
        this.$emit('select', {
          item: this.data.panels[rowIndex][colIndex],
          rowIndex,
          colIndex
        })
      }
      this.close()
    },
    handleClickModal() {
      this.$emit('clickmodal')
      if (this.data.closeOnClickModal) {
        this.close()
      }
    },
    handleCancel() {
      this.$emit('cancel')
      this.close()
    },
    close() {
      this.$emit('close')
    },
    handleOpen() {
      this.$emit('open')
    },
    handleOpened() {
      this.$emit('opened')
    },
    handleClosed() {
      this.$emit('closed')
    }
  }
})
