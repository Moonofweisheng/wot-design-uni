import VueComponent from '../common/component'

VueComponent({
  externalClasses: [
    'custom-title-class',
    'custom-content-class',
    'custom-footer-class'
  ],
  props: {
    title: String,
    type: String
  }
})