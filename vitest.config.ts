/*
 * @Author: weisheng
 * @Date: 2025-04-09 00:02:58
 * @LastEditTime: 2025-04-09 00:11:41
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/vitest.config.ts
 * 记得注释
 */
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'] // 如果需要设置全局测试配置
  }
})
