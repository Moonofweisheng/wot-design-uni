/*
 * @Author: weisheng
 * @Date: 2023-03-21 22:49:24
 * @LastEditTime: 2023-08-14 23:07:46
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\vite.config.ts
 * 记得注释
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  base: './',
  plugins: [uni()]
})
