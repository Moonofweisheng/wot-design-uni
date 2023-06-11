import VueComponent from '../common/component'
import base64 from '../common/base64'

const loadingIcon = (color = '#4D80F0', reverse = true) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="a"><stop stop-color="${reverse ? color : '#fff'}" offset="0%" stop-opacity="0"/><stop stop-color="${reverse ? color : '#fff'}" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${reverse ? '#fff' : color}"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#a)" stroke-width="3.5" stroke-linecap="round"/></g></svg>`
}

VueComponent({
  props: {
    plain: Boolean,
    disabled: Boolean,
    round: {
      type: Boolean,
      value: true
    },
    suck: Boolean,
    block: Boolean,
    type: {
      type: String,
      value: 'primary'
    },
    size: {
      type: String,
      value: 'medium'
    },
    icon: String,
    loading: {
      type: Boolean,
      observer: 'buildLoadingSvg'
    },
    loadingColor: String,
    openType: String,
    formType: String,
    hoverStopPropagation: {
      type: Boolean,
      value: false
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    appParameter: String,
    showMessageCard: {
      type: Boolean,
      value: false
    }
  },
  data: {
    hoverStartTime: 20,
    hoverStayTime: 70,
    loadingIconSvg: ''
  },
  methods: {
    handleClick (event) {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit('click', event.detail)
      }
    },
    handleGetuserinfo (event) {
      this.$emit('getuserinfo', event.detail)
    },

    handleConcat (event) {
      this.$emit('contact', event.detail)
    },

    handleGetphonenumber (event) {
      this.$emit('getphonenumber', event.detail)
    },

    handleError (event) {
      this.$emit('error', event.detail)
    },

    handleLaunchapp (event) {
      this.$emit('launchapp', event.detail)
    },

    handleOpensetting (event) {
      this.$emit('opensetting', event.detail)
    },

    buildLoadingSvg () {
      const { loadingColor, type, plain } = this.data
      let color = loadingColor

      if (!color) {
        switch (type) {
        case 'primary':
          color = '#4D80F0'
          break
        case 'success':
          color = '#34d19d'
          break
        case 'info':
          color = '#333'
          break
        case 'warning':
          color = '#f0883a'
          break
        case 'error':
          color = '#fa4350'
          break
        case 'default':
          color = '#333'
          break
        }
      }

      const svg = loadingIcon(color, !plain)
      const svgStr = `"data:image/svg+xml;base64,${base64(svg)}"`
      this.setData({ loadingIconSvg: svgStr })
    }
  }
})