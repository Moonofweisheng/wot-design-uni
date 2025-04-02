/*
 * @Author: Trae AI
 * @Date: 2025-03-31 16:28:38
 * @Description: 国际化同步hook，用于处理示例项目和docs项目之间的国际化同步
 */
import { onMounted } from 'vue'
import { useCurrentLang, Locale } from '../uni_modules/wot-design-uni/locale'
import i18n from '../locale'

// 当前语言引用
const currentLang = useCurrentLang()

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

/**
 * 设置语言
 * @param locale 语言代码
 * @param syncComponentLib 是否同步组件库语言设置
 */
function setLocale(locale: string, syncComponentLib: boolean = true) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.warn(`不支持的语言: ${locale}，将使用默认语言 zh-CN`)
    locale = 'zh-CN'
  }

  // 设置uni-app语言
  uni.setLocale(locale)

  // 设置应用语言
  i18n.global.locale.value = locale

  // 存储语言设置
  // #ifdef H5
  process.env.NODE_ENV === 'development' && uni.setStorageSync('currentLang', locale)
  // #endif
  // #ifndef H5
  uni.setStorageSync('currentLang', locale)
  // #endif

  // 同步组件库语言设置
  if (syncComponentLib) {
    Locale.use(locale)
  }

  return locale
}

interface I18nSyncOptions {
  /** 是否监听iframe消息 */
  listenIframeMessage?: boolean
  /** 是否同步组件库语言设置 */
  syncComponentLib?: boolean
  /** 默认语言 */
  defaultLocale?: string
}

/**
 * 国际化同步hook
 * @param options 配置选项
 * @returns 国际化相关方法和状态
 */
export function useI18nSync(options?: I18nSyncOptions) {
  const { listenIframeMessage = true, syncComponentLib = true, defaultLocale = 'zh-CN' } = options || {}

  // 初始化语言设置
  function initLocale() {
    // #ifdef H5
    // 在H5环境下，开发模式使用本地存储的语言，生产模式直接使用默认语言
    process.env.NODE_ENV === 'development'
      ? setLocale(uni.getStorageSync('currentLang') || defaultLocale, syncComponentLib)
      : setLocale(defaultLocale, syncComponentLib)
    // #endif
    // #ifndef H5
    // 在非H5环境下，使用本地存储的语言
    setLocale(uni.getStorageSync('currentLang') || defaultLocale, syncComponentLib)
    // #endif
  }

  // 监听iframe消息
  function setupIframeMessageListener() {
    // 仅在H5环境下且启用了iframe消息监听时执行
    // #ifdef H5
    if (listenIframeMessage) {
      window.addEventListener('message', function (event) {
        if (event.source !== parent) return
        // 处理收到的消息
        if (typeof event.data === 'string' && SUPPORTED_LOCALES.includes(event.data)) {
          // 处理语言切换消息
          setLocale(event.data, syncComponentLib)
        }
      })
    }
    // #endif
  }

  onMounted(() => {
    initLocale()
    setupIframeMessageListener()
  })

  return {
    currentLang,
    setLocale: (locale: string) => setLocale(locale, syncComponentLib),
    supportedLocales: SUPPORTED_LOCALES
  }
}
