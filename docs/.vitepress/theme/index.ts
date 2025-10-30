/*
 * @Author: weisheng
 * @Date: 2024-10-12 22:09:33
 * @LastEditTime: 2025-10-30 11:09:04
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
import ExternalLink from './components/ExternalLink.vue'
import WwAds from './components/WwAds.vue'
import SpecialSponsor from './components/SpecialSponsor.vue'
import Banner from './components/Banner.vue'
import ElementPlus, { ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
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
      'layout-top': () => h(Banner),
      'home-hero-info-after':()=>h(HomeStar),
      'home-hero-after': () => h(SpecialSponsor),
      'home-features-after': () => h(HomeFriendly),
      'layout-bottom':() => h(CustomFooter),
      'nav-bar-title-after': () => h(NavBarTitleAfter),
      'aside-outline-after': () => h(WwAds),
    })
  },
  enhanceApp({ app, router }) {
    app.component('SvgImage', SvgImage)
    app.component('ExternalLink',ExternalLink)
    app.use(ElementPlus)
    
    // 站点迁移检测
    if (typeof window !== 'undefined') {
      // 检测是否为旧域名，只在页面首次加载时检测
      const checkSiteMigration = async () => {
        if (window.location.hostname === 'wot-design-uni.pages.dev') {
          try {
            // 使用 Element Plus 的 MessageBox 弹出确认对话框
            await ElMessageBox.confirm(
              '站点已迁移至新域名，为了获得更好的访问体验，建议您跳转到新站点。',
              '站点迁移通知',
              {
                confirmButtonText: '立即跳转',
                cancelButtonText: '稍后再说',
                type: 'warning',
                center: true
              }
            )
            // 用户点击确认后跳转
            // 保持当前路径，只替换域名
            const newUrl = `https://wot-ui.cn${window.location.pathname}${window.location.search}${window.location.hash}`
            window.location.href = newUrl
          } catch {
            // 用户点击取消或关闭对话框，不做任何操作
          }
        }
      }
      
      // 页面加载完成后检测
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkSiteMigration)
      } else {
        checkSiteMigration()
      }
      
      // 百度统计路由监听
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
