import VueComponent from '../../../common/component'
import { getYears, compareYear, formatYearTitle } from '../../utils'
import { getType } from '../../../common/util'

VueComponent({
  props: {
    type: String,
    value: {
      type: [null, Number, Array]
    },
    minDate: Number,
    maxDate: Number,
    formatter: null,
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    showPanelTitle: Boolean,
    defaultTime: Array,
    panelHeight: Number
  },
  data: {
    title: '',
    scrollIntoView: ''
  },
  mounted () {
    this.initRect()
    this.scrollIntoView()
  },
  methods: {
    initRect (thresholds = [0, 0.15, 0.7, 0.8, 0.9, 1]) {
      if (!this.data.showPanelTitle) return

      if (this.contentObserver != null) {
        this.contentObserver.disconnect()
      }

      const contentObserver = this.createIntersectionObserver({
        thresholds,
        observeAll: true
      })

      this.contentObserver = contentObserver

      contentObserver.relativeTo('.wd-year-panel__container')
      contentObserver.observe('.year', (res) => {
        if (res.boundingClientRect.top <= res.relativeRect.top) {
          this.setData({
            title: formatYearTitle(res.dataset.date)
          })
        }
      })
    },
    scrollIntoView () {
      this.requestAnimationFrame().then(() => {
        let activeDate
        const type = getType(this.data.value)
        if (type === 'array') {
          activeDate = this.data.value[0]
        } else if (type === 'number') {
          activeDate = this.data.value
        }

        if (!activeDate) {
          activeDate = Date.now()
        }

        const years = getYears(this.data.minDate, this.data.maxDate)

        years.some((year, index) => {
          if (compareYear(year, activeDate) === 0) {
            this.setData({
              scrollIntoView: `year${index}`
            })
            return true
          }

          return false
        })
      })
    },
    handleDateChange ({ detail: { value } }) {
      this.$emit('change', {
        value
      })
    }
  }
})