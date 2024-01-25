import { camelCase, getPropByPath } from '../common/util'
import Locale from '../locale'

export const useTranslate = (name?: string) => {
  const prefix = name ? camelCase(name) + '.' : ''
  const translate = (key: string) => {
    const currentMessages = Locale.messages()
    const messgae = getPropByPath(currentMessages, prefix + key)
    console.log(messgae)
  }

  return { translate }
}
