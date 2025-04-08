import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.json'
import enUS from './en-US.json'
import Locale from '../uni_modules/wot-design-uni/locale'
import WotEnUS from '../uni_modules/wot-design-uni/locale/lang/en-US'

Locale.add({ 'en-US': WotEnUS })

const messages = {
  'zh-CN': {
    ...zhCN
  },
  'en-US': {
    ...enUS
  }
}

// 创建i18n实例
const i18n = createI18n({
  locale: uni.getStorageSync('currentLang') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
  legacy: false
})

Locale.use(i18n.global.locale.value)

uni.setLocale(i18n.global.locale.value)

const originalT = i18n.global.t
i18n.global.t = ((key: string | number, ...args: any[]) => {
  /**
   * 替换字符串中的占位符
   * @param template 模板字符串，如 "Hello {0}, welcome to {1}"
   * @param values 要替换的值数组
   * @returns 替换后的字符串
   */
  function interpolateTemplate(template: string, values: any[]): string {
    return template.replace(/{(\d+)}/g, (_, index) => values[index] ?? '')
  }

  // 处理对象参数场景: t(key, {key1: value1, key2: value2})
  if (args.length === 1 && typeof args[0] === 'object' && !Array.isArray(args[0])) {
    const result = originalT(key, ...args)
    return result
  }

  // 处理数组参数场景: t(key, [arg1, arg2])
  if (args.length === 1 && Array.isArray(args[0])) {
    const result = originalT(key, args[0])
    return interpolateTemplate(result, args[0])
  }

  // 处理可变参数场景: t(key, arg1, arg2, ...)
  if (args.length > 1 && args.every((arg) => typeof arg !== 'object')) {
    return interpolateTemplate(originalT(key, args), args)
  }

  // 处理默认场景: t(key) 或 t(key, defaultMessage) 或 t(key, plural) 等
  const result = originalT(key, ...args)

  return result
}) as typeof i18n.global.t

export default i18n
