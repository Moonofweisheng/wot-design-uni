/*
 * @Author: weisheng
 * @Date: 2023-03-09 19:23:03
 * @LastEditTime: 2025-04-08 11:18:04
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/main.ts
 * 记得注释
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import i18n from './locale'
// #ifdef H5
import '@vant/touch-emulator'
// #endif

export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  app.config.globalProperties.$t = i18n.global.t
  return {
    app
  }
}
