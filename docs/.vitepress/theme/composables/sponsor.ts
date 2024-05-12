/*
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2024-05-08 13:23:59
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\docs\.vitepress\theme\composables\sponsor.ts
 * 记得注释
 */
import { ref, onMounted } from 'vue'


const data = ref()

export function useSponsor() {
  onMounted(async () => {
    if (data.value) {
      return
    }
    const result = await fetch('https://wot-sponsors.pages.dev/wot-design-uni.json')
    const json = await result.json()
    data.value = json
  })

  return {
    data,
  }
}



