/*
 * @Author: Trae AI
 * @Date: 2025-04-22 11:00:00
 * @LastEditTime: 2025-04-22 10:55:35
 * @LastEditors: weisheng
 * @Description: 为JSDOM环境提供Canvas API模拟
 * @FilePath: /wot-design-uni/tests/setup-canvas-mock.ts
 */
import { vi } from 'vitest'

/**
 * 为JSDOM环境设置Canvas API模拟
 * 解决HTMLCanvasElement.prototype.getContext未实现的问题
 */
export function setupCanvasMock() {
  // 创建模拟的2D上下文对象
  const mockCtx = {
    textBaseline: 'alphabetic',
    textAlign: 'start',
    font: '10px sans-serif',
    fillStyle: '#000000',
    translate: vi.fn(),
    rotate: vi.fn(),
    fillText: vi.fn(),
    fillRect: vi.fn(),
    drawImage: vi.fn(),
    restore: vi.fn(),
    save: vi.fn(),
    clearRect: vi.fn(),
    setTransform: vi.fn(),
    scale: vi.fn(),
    getImageData: vi.fn(),
    putImageData: vi.fn()
  }

  // 模拟canvas.toDataURL方法
  const mockToDataURL = vi
    .fn()
    .mockReturnValue('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==')

  // 模拟HTMLCanvasElement.prototype.getContext方法
  if (typeof window !== 'undefined' && window.HTMLCanvasElement) {
    Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
      writable: true,
      value: vi.fn().mockReturnValue(mockCtx)
    })

    // 添加toDataURL方法
    Object.defineProperty(window.HTMLCanvasElement.prototype, 'toDataURL', {
      writable: true,
      value: mockToDataURL
    })
  }

  // 返回模拟对象，以便测试中可以进一步自定义
  return {
    ctx: mockCtx,
    toDataURL: mockToDataURL
  }
}
