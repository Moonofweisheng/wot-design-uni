/*
 * @Author: weisheng
 * @Date: 2024-10-12 22:09:33
 * @LastEditTime: 2024-11-09 23:03:07
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/docs/.vitepress/theme/index.ts
 * 记得注释
 */
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
import ExternalLink from './components/ExternalLink.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


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
    app.component('ExternalLink',ExternalLink)
    app.use(ElementPlus)
  },
}
