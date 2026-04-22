/*
 * @Author: weisheng
 * @Date: 2024-10-12 22:09:33
 * @LastEditTime: 2026-01-03 17:24:50
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
import HomeCases from './components/HomeCases.vue'
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
      // 'home-hero-info-after':()=>h(HomeStar),
      'home-hero-after': () => h(SpecialSponsor),
      'home-features-after': () => [h(HomeFriendly), h(HomeCases)],
      'layout-bottom':() => h(CustomFooter),
      'nav-bar-title-after': () => h(NavBarTitleAfter),
      'aside-outline-after': () => h(WwAds),
    })
  },
  enhanceApp({ app, router }:any) {
    app.component('SvgImage', SvgImage)
    app.component('ExternalLink',ExternalLink)
    app.use(ElementPlus)
    
    if (typeof window !== 'undefined') {
      // Gitee 2025 投票弹窗
      const showVotingNotification = () => {
        const key = 'gitee-vote-2025'
        if (localStorage.getItem(key)) return

        const deadline = new Date('2026-01-10T00:00:00+08:00').getTime()
        const now = Date.now()
        if (now > deadline) return

        ElMessageBox.confirm(
          '朋友们，我正在参加 Gitee 2025 最受欢迎的开源软件投票活动，马上跌出前 3 了😂，不得已加了这个弹框，快来给我投票吧！ <a href="https://gitee.com/activity/2025opensource?ident=IEVXGS" target="_blank" style="color: var(--vp-c-brand);">https://gitee.com/activity/2025opensource?ident=IEVXGS</a>',
          '我们急需你的投票',
          {
            dangerouslyUseHTMLString: true,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            customClass: 'gitee-vote-message-box',
            confirmButtonText: '去投票',
            cancelButtonText: '已投票',
          }
        ).then(() => {
          localStorage.setItem(key, 'true')
          window.open('https://gitee.com/activity/2025opensource?ident=IEVXGS', '_blank')
        }).catch(() => {
          localStorage.setItem(key, 'true')
          window.open('https://gitee.com/activity/2025opensource?ident=IEVXGS', '_blank')
        })
      }

      // 页面加载完成后显示
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showVotingNotification)
      } else {
        showVotingNotification()
      }

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
            const newUrl = `https://v1.wot-ui.cn${window.location.pathname}${window.location.search}${window.location.hash}`
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
      router.onAfterRouteChanged = (to: string) => {
        // 延迟执行，确保页面已完全加载
        setTimeout(() => {
          trackPageView(to)
        }, 100)
      }
    }
  },
}
