<script setup lang="ts">
import { onLaunch, onShow, onHide, onThemeChange } from '@dcloudio/uni-app'
import { useDark } from './store'
const darkMode = useDark()

onThemeChange((option) => {
  darkMode.setDark(option.theme === 'dark')
})

onLaunch((ctx) => {
  const systemInfo = uni.getSystemInfoSync()
  darkMode.setDark(systemInfo.theme === 'dark')

  // #ifdef H5

  window.addEventListener('message', function (event) {
    if (event.source !== parent) return
    // 处理收到的消息
    if (typeof event.data === 'boolean') {
      darkMode.setDark(event.data)
    } else {
      darkMode.setDark(false)
    }
  })
  // #endif
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
