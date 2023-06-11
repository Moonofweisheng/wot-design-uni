import VueComponent from '../common/component'
import popover from '../mixins/popover'

VueComponent({
  mixins: [popover()],
  data: {
    selector: 'popover'
  },
  props: {
    // menu || normal
    mode: {
      type: String,
      value: 'normal'
    },
    content: null
  },
  methods: {
    menuClick (event) {
      const { index } = event.currentTarget.dataset
      this.setData({ show: false })
      this.$emit('menuclick', {
        item: this.data.content[index],
        index
      })
    }
  }
})