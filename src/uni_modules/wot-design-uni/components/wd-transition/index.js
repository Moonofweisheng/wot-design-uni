import VueComponent from '../common/component'
import transition from '../mixins/transition'

VueComponent({
  mixins: [transition()],
  externalClasses: [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class'
  ]
})