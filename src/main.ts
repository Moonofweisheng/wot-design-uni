/*
 * @Author: weisheng
 * @Date: 2023-03-09 19:23:03
 * @LastEditTime: 2024-01-26 14:08:43
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\main.ts
 * 记得注释
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
// #ifdef H5
import '@vant/touch-emulator'
// #endif

export function createApp() {
  const app = createSSRApp(App)
  // app.config.warnHandler = () => null
  return {
    app
  }
}
