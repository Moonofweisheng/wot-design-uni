/*
 * @Author: weisheng
 * @Date: 2024-10-12 22:09:33
 * @LastEditTime: 2025-09-03 00:00:30
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/docs/.vitepress/theme/index.ts
 * 记得注释
 */
import { h } from 'vue'
import Theme from 'vitepress/theme'
import { useRouter } from 'vitepress'
import './styles/vars.css'
import './styles/custom.css'
import './styles/scrollbar.scss'

import HomeFriendly from './components/HomeFriendly.vue'
import NavBarTitleAfter from './components/NavBarTitleAfter.vue'
import CustomFooter from './components/CustomFooter.vue'
import SvgImage from './components/SvgImage.vue'
import HomeStar from './components/HomeStar.vue'
import ExternalLink from './components/ExternalLink.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 声明百度统计全局变量
declare global {
  interface Window {
    _hmt: any[]
  }
}


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
  enhanceApp({ app, router }) {
    app.component('SvgImage', SvgImage)
    app.component('ExternalLink',ExternalLink)
    app.use(ElementPlus)
    
    // 百度统计路由监听
    if (typeof window !== 'undefined') {
      // 确保百度统计已加载
      const trackPageView = (path: string) => {
        if (window._hmt) {
          window._hmt.push(['_trackPageview', path])
        }
      }
      
      // 监听路由变化
      router.onAfterRouteChanged = (to) => {
        // 延迟执行，确保页面已完全加载
        setTimeout(() => {
          trackPageView(to)
        }, 100)
      }
    }
  },
}
