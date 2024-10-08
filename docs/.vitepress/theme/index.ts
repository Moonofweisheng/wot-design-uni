import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'
import './styles/custom.css'
import './styles/scrollbar.scss'

import HomeFriendly from './components/HomeFriendly.vue'
import NavBarTitleAfter from './components/NavBarTitleAfter.vue'
import CustomFooter from './components/CustomFooter.vue'
import SvgImage from './components/SvgImage.vue'
import HomeStar from './components/HomeStar.vue'
import frame from './components/frame.vue'
import { ElTag, ElLink } from 'element-plus'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-hero-info-after':()=>h(HomeStar),
      'home-features-after': () => h(HomeFriendly),
      'layout-bottom':() => h(CustomFooter),
      'nav-bar-title-after': () => h(NavBarTitleAfter),
    })
  },
  enhanceApp({ app }) {
    app.component('SvgImage', SvgImage)
    app.component('frame', frame)
    app.component('ElTag', ElTag)
    app.component('ElLink', ElLink)
  },
}
