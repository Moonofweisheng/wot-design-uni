/*
 * @Author: Trae AI
 * @Date: 2025-03-31 16:28:38
 * @Description: 国际化同步hook，用于处理示例项目和docs项目之间的国际化同步
 */
import { computed, onBeforeMount } from 'vue'
import { Locale } from '../uni_modules/wot-design-uni/locale'
import i18n from '../locale'

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

  uni.setStorageSync('currentLang', locale)

  // 同步组件库语言设置
  if (syncComponentLib) {
    Locale.use(locale)
  }

  return locale
}

/**
 * 初始化语言设置
 * @param defaultLocale 默认语言
 * @param syncComponentLib 是否同步组件库语言设置
 */
function initLocale(defaultLocale: string, syncComponentLib: boolean) {
  const storedLocale = uni.getStorageSync('currentLang') || defaultLocale
  setLocale(storedLocale, syncComponentLib)
}

interface I18nSyncOptions {
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
  const { syncComponentLib = true, defaultLocale = 'zh-CN' } = options || {}
  const currentLang = computed(() => i18n.global.locale.value)
  onBeforeMount(() => {
    initLocale(defaultLocale, syncComponentLib)
  })

  return {
    currentLang,
    setLocale: (locale: string) => setLocale(locale, syncComponentLib),
    supportedLocales: SUPPORTED_LOCALES
  }
}
