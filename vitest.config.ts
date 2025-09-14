/*
 * @Author: weisheng
 * @Date: 2025-04-09 00:02:58
 * @LastEditTime: 2025-07-10 15:33:49
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/vitest.config.ts
 * 记得注释
 */
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vitePluginUniConditionalCompile from './vite-plugins/vite-plugin-uni-conditional-compile'

// 获取当前测试平台
const platform = process.env.UNI_PLATFORM || 'h5'

export default defineConfig({
  plugins: [
    vitePluginUniConditionalCompile({
      platform
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@vite-plugins': resolve(__dirname, './vite-plugins')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      include: [
        // 只包含组件源文件
        'src/uni_modules/wot-design-uni/components/**/*.{vue,ts}'
      ],
      exclude: [
        // 排除不需要测试的文件
        'node_modules/**',
        'tests/**',
        'src/pages/**',
        'src/static/**',
        'dist/**',
        '**/*.js',
        '**/*.d.ts',
        'src/uni_modules/wot-design-uni/components/common/**/*.{vue,ts}'
      ],
      // 当测试单个组件时，不应用全局阈值
      thresholds:
        process.env.COMPONENT_TEST === 'true'
          ? undefined
          : {
              statements: 70,
              branches: 70,
              functions: 70,
              lines: 70
            },
      // 只报告被测试的文件
      all: false
    },
    deps: {
      inline: ['vue-i18n']
    }
  }
})
