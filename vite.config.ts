/*
 * @Author: weisheng
 * @Date: 2023-03-21 22:49:24
 * @LastEditTime: 2023-03-29 18:44:48
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\vite.config.ts
 * 记得注释
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  base: './',
  plugins: [uni()]
})
