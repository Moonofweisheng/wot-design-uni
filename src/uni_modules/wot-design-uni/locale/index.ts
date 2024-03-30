/*
 * @Author: weisheng
 * @Date: 2024-01-25 23:06:48
 * @LastEditTime: 2024-03-30 11:30:55
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/locale/index.ts
 * 记得注释
 */
import { reactive, ref } from 'vue'
import zhCN from './lang/zh-CN'
import { deepAssign } from '../components/common/util'

type Message = Record<string, any>
type Messages = Record<string, Message>

const lang = ref<string>('zh-CN')
const messages = reactive<Messages>({
  'zh-CN': zhCN
})

export const Locale = {
  messages(): Message {
    return messages[lang.value]
  },

  use(newLang: string, newMessage?: Message) {
    lang.value = newLang
    if (newMessage) {
      this.add({ [newLang]: newMessage })
    }
  },

  add(newMessages: Messages = {}) {
    deepAssign(messages, newMessages)
  }
}

export const useCurrentLang = () => lang

export default Locale
