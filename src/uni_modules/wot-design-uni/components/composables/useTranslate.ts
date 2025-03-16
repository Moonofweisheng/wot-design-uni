/*
 * @Author: weisheng
 * @Date: 2024-01-25 23:06:48
 * @LastEditTime: 2025-02-14 11:20:02
 * @LastEditors: 810505339
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\composables\useTranslate.ts
 * 记得注释
 */
import { camelCase, getPropByPath, isFunction } from '../common/util'
import Locale from '../../locale'

export const useTranslate = (name?: string) => {
  const prefix = name ? camelCase(name) + '.' : ''
  const translate = (key: string, ...args: unknown[]) => {
    const currentMessages = Locale.messages()
    const message = getPropByPath(currentMessages, prefix + key)
    return isFunction(message) ? message(...args) : message
  }

  return { translate }
}
