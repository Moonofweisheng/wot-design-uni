/*
 * @Author: weisheng
 * @Date: 2023-03-21 22:49:24
 * @LastEditTime: 2024-04-09 23:03:26
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/vite.config.ts
 * 记得注释
 */
import { defineConfig } from 'vite'
// #ifdef H5
import viteCompression from 'vite-plugin-compression'
// #endif

import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  base: './',
  plugins: [
    uni(),
    // #ifdef H5
    viteCompression()
    // #endif
  ]
})
