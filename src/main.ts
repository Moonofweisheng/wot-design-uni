/*
 * @Author: weisheng
 * @Date: 2023-03-09 19:23:03
 * @LastEditTime: 2024-01-25 23:49:09
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/main.ts
 * 记得注释
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
// #ifdef H5
import '@vant/touch-emulator'
// #endif

import Locale from '@/uni_modules/wot-design-uni/components/locale'

// 引入英文语言包
import zhCN from '@/uni_modules/wot-design-uni/components/locale/lang/zh-CN'

Locale.use('en-US', zhCN)

export function createApp() {
  const app = createSSRApp(App)
  // app.config.warnHandler = () => null
  return {
    app
  }
}
