<!--
 * @Author: weisheng
 * @Date: 2024-10-12 13:07:08
 * @LastEditTime: 2025-10-31 13:47:04
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
import { getSystemInfo } from './uni_modules/wot-design-uni/components/common/util'

// 初始化国际化
const darkMode = useDark()
const { setLocale } = useI18nSync() // 禁用内置的iframe消息监听，使用专门的hook处理

// 使用专门的iframe消息处理hook
useIframeMessage({
  onLocaleChange: (locale) => {
    setLocale(locale)
  },
  onThemeChange: (isDark) => {
    darkMode.setDark(isDark)
  }
})

onThemeChange((option) => {
  darkMode.setDark(option.theme === 'dark')
})

onLaunch(() => {
  const systemInfo = getSystemInfo()
  darkMode.setDark(systemInfo.theme === 'dark')
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
