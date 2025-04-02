/*
 * @Author: weisheng
 * @Date: 2025-03-31 11:23:58
 * @LastEditTime: 2025-04-02 21:57:47
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/locale/index.ts
 * 记得注释
 */
import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.json'
import enUS from './en-US.json'
import Locale from '../uni_modules/wot-design-uni/locale'
import { useReplacePlaceholders } from '@/hooks/useReplacePlaceholders'

// 合并组件库的语言包和应用的语言包
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
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
  legacy: false
})

Locale.use(i18n.global.locale.value)

uni.setLocale(i18n.global.locale.value)

const { replacePlaceholders } = useReplacePlaceholders()

const originalT = i18n.global.t
i18n.global.t = ((key: string | number, param1?: any, param2?: any) => {
  const result = originalT(key, param1, param2)
  if (Array.isArray(param1)) {
    return replacePlaceholders(result, param1)
  }
  return result
}) as typeof i18n.global.t

export default i18n
