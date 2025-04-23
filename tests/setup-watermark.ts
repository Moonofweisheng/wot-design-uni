/*
 * @Author: weisheng
 * @Date: 2025-04-22 10:33:57
 * @LastEditTime: 2025-04-22 10:39:06
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/tests/setup-watermark.ts
 * 记得注释
 */
import { vi } from 'vitest'

// 为watermark组件测试提供canvas.toDataURL方法的模拟
export function setupWatermarkTest() {
  // 模拟canvas对象及其toDataURL方法
  const mockCanvas = {
    toDataURL: vi
      .fn()
      .mockReturnValue('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==')
  }

  // 扩展uni的createOffscreenCanvas方法返回的canvas对象
  const originalCreateOffscreenCanvas = (global as any).uni.createOffscreenCanvas
  ;(global as any).uni.createOffscreenCanvas = vi.fn(({ height, width }) => {
    const canvas = originalCreateOffscreenCanvas({ height, width })
    // 确保canvas对象有toDataURL方法
    return {
      ...canvas,
      toDataURL: mockCanvas.toDataURL
    }
  })

  return mockCanvas
}
