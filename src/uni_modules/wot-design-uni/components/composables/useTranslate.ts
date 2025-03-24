import { camelCase, getPropByPath, isDef, isFunction } from '../common/util'
import Locale from '../../locale'

export const useTranslate = (name?: string) => {
  const prefix = name ? camelCase(name) + '.' : ''
  const translate = (key: string, ...args: unknown[]) => {
    const currentMessages = Locale.messages()
    const message = getPropByPath(currentMessages, prefix + key)
    return isFunction(message) ? message(...args) : isDef(message) ? message : `${prefix}${key}`
  }
  return { translate }
}
