import VueComponent from '../common/component'

VueComponent({
  props: {
    name: {
      type: String,
      observer (val) {
        this.setData({
          isImageUrl: val.indexOf('/') > -1
        })
      }
    },
    color: String,
    size: String,
    customStyle: String
  }
})