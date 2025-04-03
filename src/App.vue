<!--
 * @Author: weisheng
 * @Date: 2024-10-12 13:07:08
 * @LastEditTime: 2025-03-31 15:05:05
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/App.vue
 * 记得注释
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide, onThemeChange } from '@dcloudio/uni-app'
import { useDark } from './store'
import { useI18nSync } from './hooks/useI18nSync'
import { useIframeMessage } from './hooks/useIframeMessage'
import { Locale } from './uni_modules/wot-design-uni/locale'
import enUS from './uni_modules/wot-design-uni/locale/lang/en-US'
Locale.use('en-US', enUS)

const darkMode = useDark()
const { setLocale } = useI18nSync({ listenIframeMessage: false }) // 禁用内置的iframe消息监听，使用专门的hook处理

// 使用专门的iframe消息处理hook
useIframeMessage({
  onLocaleChange: (locale) => {
    setLocale(locale)
    Locale.use(locale)
  },
  onThemeChange: (isDark) => {
    darkMode.setDark(isDark)
  }
})

onThemeChange((option) => {
  darkMode.setDark(option.theme === 'dark')
})

onLaunch(() => {
  const systemInfo = uni.getSystemInfoSync()
  darkMode.setDark(systemInfo.theme === 'dark')
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import '@/iconfont/index.css';

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

page {
  margin: 0;
  padding: 0;
  font-family: San Francisco, Rotobo, arial, PingFang SC, Noto SansCJK, Microsoft Yahei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 13px;
  background: #f8f9fa;
}
</style>
