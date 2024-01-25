import { reactive, ref } from 'vue'
import zhCN from './lang/zh-CN'
import { deepMerge } from '../common/util'

type Message = Record<string, any>
type Messages = Record<string, Message>

const lang = ref('zh-CN')
const messages = reactive<Messages>({
  'zh-CN': zhCN
})

export const Locale = {
  messages(): Message {
    return messages[lang.value]
  },

  use(newLang: string, newMessages?: Message) {
    lang.value = newLang
    this.add({ [newLang]: newMessages })
  },

  add(newMessages: Message = {}) {
    deepMerge(messages, newMessages)
  }
}

export const useCurrentLang = () => lang

export default Locale
