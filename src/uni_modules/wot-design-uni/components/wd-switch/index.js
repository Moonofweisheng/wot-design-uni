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

})
