import VueComponent from '../common/component'
import cell from '../mixins/cell'

VueComponent({
  externalClasses: ['custom-icon-class', 'custom-label-class', 'custom-value-class', 'custom-title-class'],
  behaviors: [cell],
  props: {
    title: String,
    value: String,
    icon: String,
    label: String,
    isLabel: String,
    isLink: {
      type: Boolean,
      value: false,
      observer: 'openClickAble'
    },
    to: String,
    replace: {
      type: Boolean,
      value: false
    },
    clickable: {
      type: Boolean,
      value: false
    },
    size: String,
    titleWidth: String,
    center: Boolean,
    required: Boolean,
    vertical: Boolean
  },
  relations: {
    '../cellGroup/index': {
      type: 'ancestor',
      linked(target) {
        this.parent = target
      },
      unlinked() {
        this.parent = null
      }
    }
  },
  methods: {
    /**
     * @description 开启点击反馈
     * @param {Boolean} clickAble - 触发订阅的实例本身
     */
    openClickAble(clickAble) {
      if (!clickAble) return
      this.setData({ clickable: true })
    },
    /**
     * @description 点击cell的handle
     */
    onClick() {
      const url = this.data.to
      if (url && this.data.isLink) {
        jd[this.data.replace ? 'redirectTo' : 'navigateTo']({ url })
      }
      if (this.data.clickable) {
        this.$emit('click')
      }
    }
  }
})
