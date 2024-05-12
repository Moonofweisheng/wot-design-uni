/*
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2024-05-08 13:29:27
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\docs\.vitepress\theme\composables\friendly.ts
 * 记得注释
 */
import { ref, onMounted } from 'vue'

export type FriendlyLink = {
  icon: string
  title: string
  details: string
  link: string
}

const data = ref<FriendlyLink[]>([])

export function useFriendly() {
  onMounted(async () => {
    if (data.value && data.value.length) {
      return
    }
    const result = await fetch('https://wot-sponsors.pages.dev/friendly.json')
    const json = await result.json()
    data.value = json && json.links ? json.links : []
  })

  return {
    data,
  }
}



