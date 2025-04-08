/*
 * @Author: Trae AI
 * @Date: 2025-03-31 16:28:38
 * @Description: iframe消息处理hook，用于处理示例项目和docs项目之间的通信
 */
import { onMounted } from 'vue'

interface IframeMessageOptions {
  /**
   * 语言变更处理函数
   * @param locale 语言代码
   */
  onLocaleChange?: (locale: string) => void

  /**
   * 主题变更处理函数
   * @param isDark 是否为暗色主题
   */
  onThemeChange?: (isDark: boolean) => void
}

/**
 * iframe消息处理hook
 * @param options 配置选项
 */
export function useIframeMessage(options: IframeMessageOptions = {}) {
  const { onLocaleChange, onThemeChange } = options

  // 支持的语言列表
  const SUPPORTED_LOCALES = [
    'zh-CN',
    'en-US',
    'zh-TW',
    'zh-HK',
    'th-TH',
    'vi-VN',
    'ar-SA',
    'de-DE',
    'es-ES',
    'pt-PT',
    'fr-FR',
    'ja-JP',
    'ko-KR',
    'tr-TR',
    'ru-RU'
  ]

  // 处理接收到的消息
  function handleMessage(event: MessageEvent) {
    // 确保消息来源是父窗口
    if (event.source !== parent) return

    const data = event.data

    // 处理语言切换消息
    if (typeof data === 'string' && SUPPORTED_LOCALES.includes(data)) {
      onLocaleChange?.(data)
    }

    // 处理主题切换消息
    if (typeof data === 'boolean') {
      onThemeChange?.(data)
    }
  }

  // 设置消息监听
  function setupMessageListener() {
    // 仅在H5环境下执行
    // #ifdef H5
    window.addEventListener('message', handleMessage)
    // #endif
  }

  // 移除消息监听
  function removeMessageListener() {
    // 仅在H5环境下执行
    // #ifdef H5
    window.removeEventListener('message', handleMessage)
    // #endif
  }

  onMounted(() => {
    setupMessageListener()
  })

  return {
    setupMessageListener,
    removeMessageListener
  }
}
