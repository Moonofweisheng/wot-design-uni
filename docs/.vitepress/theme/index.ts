/*
 * @Author: weisheng
 * @Date: 2023-07-27 12:36:30
 * @LastEditTime: 2024-02-03 22:00:21
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\docs\.vitepress\theme\index.ts
 * 记得注释
 */
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'
import './styles/custom.css'
import './styles/scrollbar.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import HomeFriendly from './components/HomeFriendly.vue'
import NavBarTitleAfter from './components/NavBarTitleAfter.vue'
import CustomFooter from './components/CustomFooter.vue'
import SvgImage from './components/SvgImage.vue'
import frame from './components/frame.vue'


export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(HomeFriendly),
      'layout-bottom':() => h(CustomFooter),
      'nav-bar-title-after': () => h(NavBarTitleAfter),
    })
  },
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.component('SvgImage', SvgImage)
    app.component('frame', frame)
  },
}
