/*
 * @Author: weisheng
 * @Date: 2023-03-21 22:49:24
 * @LastEditTime: 2024-09-23 13:25:53
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\vite.config.ts
 * 记得注释
 */
import { defineConfig } from 'vite'
// #ifdef H5
import viteCompression from 'vite-plugin-compression'
// #endif

import uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'

export default defineConfig({
  base: './',
  plugins: [
    Components(),
    uni(),
    // #ifdef H5
    viteCompression()
    // #endif
  ],
  build: {
    //   关闭生成map文件 可以达到缩小打包体积
    sourcemap: false // 这个生产环境一定要关闭，不然打包的产物会很大
  }
})
