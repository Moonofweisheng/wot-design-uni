import VueComponent from '../common/component'
import base64 from '../common/base64'
import { gradient, context, getType } from '../common/util'

const svgDefineId = context.id++
const svgDefineId1 = context.id++
const svgDefineId2 = context.id++

const icon = {
  'outline' (color = '#4D80F0') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="${svgDefineId}"><stop stop-color="#FFF" offset="0%" stop-opacity="0"/><stop stop-color="#FFF" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${color}"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#${svgDefineId}) " stroke-width="3.5" stroke-linecap="round"/></g></svg>`
  },
  'ring' (color = '#4D80F0', intermediateColor = '#a6bff7') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="${svgDefineId1}" gradientUnits="userSpaceOnUse" x1="50" x2="50" y2="180"><stop offset="0" stop-color="${color}"></stop> <stop offset="1" stop-color="${intermediateColor}"></stop></linearGradient> <path fill="url(#${svgDefineId1})" d="M20 100c0-44.1 35.9-80 80-80V0C44.8 0 0 44.8 0 100s44.8 100 100 100v-20c-44.1 0-80-35.9-80-80z"></path> <linearGradient id="${svgDefineId2}" gradientUnits="userSpaceOnUse" x1="150" y1="20" x2="150" y2="180"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop> <stop offset="1" stop-color="${intermediateColor}"></stop></linearGradient> <path fill="url(#${svgDefineId2})" d="M100 0v20c44.1 0 80 35.9 80 80s-35.9 80-80 80v20c55.2 0 100-44.8 100-100S155.2 0 100 0z"></path> <circle cx="100" cy="10" r="10" fill="${color}"></circle></svg>`
  }
}

VueComponent({
  data: {
    svg: '',
    intermediateColor: '',
    iconSize: '32px'
  },
  props: {
    type: {
      type: String,
      value: 'ring'
    },
    color: {
      type: String,
      value: '#4D80F0',
      observer: 'buildSvg'
    },
    size: {
      type: null,
      value: '32px',
      observer (val) {
        const type = getType(val)

        if (type !== 'string' && (type !== 'number')) {
          console.warn('[wot design] warning(wd-loading): prop size type must be number or string.')
          return
        }

        const iconSize = type === 'string' ? val : (type === 'number' ? val + 'px' : '32px')
        this.setData({ iconSize })
      }
    }
  },
  methods: {
    buildSvg () {
      const { type, color, intermediateColor } = this.data
      let adaptType = 'ring'
      //  2.2.0 版本向下兼容 circle-outline 和 circle-ring;
      if (type === 'circle-outline') {
        adaptType = 'outline'
      } else if (type === 'outline') {
        adaptType = 'outline'
      } else if (type === 'circle-ring') {
        adaptType = 'ring'
      }
      const svg = adaptType === 'ring' ? icon[adaptType](color, intermediateColor) : icon[adaptType](color)
      const svgStr = `"data:image/svg+xml;base64,${base64(svg)}"`
      this.setData({ svg: svgStr })
    }
  },
  created () {
    this.setData({
      intermediateColor: gradient(this.data.color, '#ffffff', 2)[1]
    })
    this.buildSvg()
  }
})